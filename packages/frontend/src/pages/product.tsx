/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useParams } from "react-router-dom";
import Layout from "../shared/layout/layout";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";

const productDetailQuery = graphql(/* GraphQL */`
  query ProductDetailQuery($productId: Int!) {
    product(productId: $productId) {
      id
      title
      price
      category
      description
      image
    }
  }
`);

function ProductPage() {
  const { productId } = useParams();
  const { data } = useQuery(productDetailQuery, {
    variables: {
      productId: parseInt(productId!, 10)
    }
  });

  if (!data?.product) return null;

  return (
    <Layout pageTitle={data.product.title}>
      <div className="bg-white">
        <div className="pt-6">
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={data.product.image}
                  alt={data.product.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900"><span className="font-bold">{data.product.price}</span>&nbsp;EUR</p>

              <div className="pt-4">
                <p className="text-base text-gray-900">{data.product.description}</p>
              </div>

              <button
                type="button"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;
