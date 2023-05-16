/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from "react-router-dom";
import Layout from "../../shared/layout/layout";
import { graphql } from "../../gql";
import { useQuery } from "@apollo/client";
import ProductCard from "./product-card";
import Loading from "../../shared/loading/loading";

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

  if (!data?.category) {
    return (
      <Layout pageTitle="">
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout pageTitle={categoryCode}>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {
          data?.category.products?.map(product =>
            <ProductCard
              key={product.id}
              product={product}
              categoryCode={categoryCode!}
            />
          )
        }
      </div>
    </Layout>
  );
}

export default CategoryPage;
