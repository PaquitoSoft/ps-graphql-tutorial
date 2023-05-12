import { ReactNode } from "react";
import { useQuery } from "@apollo/client";

import Header from "./header";
import { graphql } from "../../gql";

type TLayoutProps = {
  pageTitle?: string,
  children: ReactNode,
}

const layoutDataQuery = graphql(/* GraphQL */`
  query LayoutDataQuery {
    categories {
      code
    }
  }
`);

function Layout(props: TLayoutProps) {
  const { data } = useQuery(layoutDataQuery);

  return (
    <>
      <Header categories={data?.categories || []} />

      {
        Boolean(props.pageTitle) &&
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{props.pageTitle}</h1>
          </div>
        </header>
      }

      <main>
        <div className="max-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {props.children}
        </div>
      </main>
    </>
  )
}

export default Layout;
