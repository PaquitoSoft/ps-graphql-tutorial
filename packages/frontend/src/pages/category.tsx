import { useParams } from "react-router-dom";
import Layout from "../shared/layout/layout";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";

const categoryDetailQuery = graphql(/* GraphQL */`
  query CategoryDetailQuery($categoryCode: String!) {
    category(categoryCode: $categoryCode) {
      code
      products {
        id
        title
        price
        image
        isPopular
      }
    }
  }
`);

function CategoryPage() {
  const { categoryCode } = useParams();
  const { data } = useQuery(categoryDetailQuery, {
    variables: { categoryCode: categoryCode! }
  });

  return (
    <Layout pageTitle={categoryCode}>
      <h2>Category products: {categoryCode}</h2>
      <pre>
        {JSON.stringify(data?.category.products, null, 2)}
      </pre>
    </Layout>
  );
}

export default CategoryPage;
