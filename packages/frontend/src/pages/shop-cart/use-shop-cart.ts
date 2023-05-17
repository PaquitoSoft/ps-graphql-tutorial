import { useCallback } from "react";
import { graphql } from "../../gql";
import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "../../shared/providers/user-provider";

const shopCartQuery = graphql(/* GraphQL */`
  query ShopCartQuery {
    cart {
      id
      totalUnits
      totalAmount
      items {
        quantity
        product {
          id
          title
          price
          image
        }
      }
    }
  }
`);

const removeCartItemMutation = graphql(/* GraphQL */`
  mutation RemoveCartItem($productId: Int!) {
    removeProductFromCart(productId: $productId) {
      id
      totalUnits
      totalAmount
      items {
        quantity
        product {
          id
          title
          price
          image
        }
      }
    }
  }
`);

function useShopCart() {
  const { userId } = useUser();

  const { data } = useQuery(shopCartQuery, {
    context: {
      headers: {
        'Authorization': `Bearer ${userId}`
      }
    }
  });

  const [removeCartItem, { loading }] = useMutation(removeCartItemMutation);

  const onRemoveCartItem = useCallback((productId: number) => {
    removeCartItem({
      variables: {
        productId
      },
      context: {
        headers: {
          'Authorization': `Bearer ${userId}`
        }
      }
    })
  }, [removeCartItem, userId]);

  return {
    shopCart: data?.cart,
    onRemoveCartItem,
    isRemovingItemFromCart: loading
  }
};

export default useShopCart;

