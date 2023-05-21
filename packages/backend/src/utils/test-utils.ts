import { rest } from "msw";
import { mockServer } from "../mocks/server";
import { DocumentNode } from "graphql";

const baseUrl = process.env.ECOMMERCE_API_BASE_URL;

type TMockRequestParams = {
  url: string;
  statusCode?: number;
  responseData?: unknown;
}

export function mockRestRequest({
  url,
  statusCode = 200,
  responseData = {}
}: TMockRequestParams) {
  mockServer.use(
    rest.get(`${baseUrl}${url}`, (_req, res, ctx) => {
      return res(
        ctx.status(statusCode),
        ctx.json(responseData)
      )
    })
  );
}

type TSendFakeGraphqlRequest = {
  document: DocumentNode;
};
export function sendFakeGraphqlRequest({
  document
}: TSendFakeGraphqlRequest) {
  return global.__graphqlExecutor({
    document
  });
}
