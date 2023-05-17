import { useCallback } from "react";
import { graphql } from "../../gql";
import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "../../shared/providers/user-provider";

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

const addToCartMutation = graphql(/* GraphQL */`
  mutation AddProductToCart($productId: Int!) {
    addProductToCart(cartItem: {
      productId: $productId,
      quantity: 1
    }) {
      id
      userId
      items {
      quantity
        product {
          title
          price
        }
      }
    }
  }
`);

function useProduct(productId: number) {
  console.log({ productDetailQuery });
  const { userId } = useUser();
  const { data } = useQuery(productDetailQuery, {
    variables: {
      productId
    }
  });

  const [addToCart, { loading }] = useMutation(addToCartMutation);

  const onAddToCart = useCallback(() => {
    addToCart({
      variables: {
        productId
      },
      context: {
        headers: {
          'Authorization': `Bearer ${userId}`
        }
      }
    })
  }, [addToCart, productId, userId]);

  return {
    product: data?.product,
    onAddToCart,
    isAddingProductToCart: loading
  };
}

export default useProduct;
