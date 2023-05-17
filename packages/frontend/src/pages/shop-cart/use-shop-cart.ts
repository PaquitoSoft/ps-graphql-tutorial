import { useCallback } from "react";
import { graphql } from "../../gql";
import { DocumentNode, useMutation, useQuery } from "@apollo/client";
import { useUser } from "../../shared/providers/user-provider";

const shopCartQuery = graphql(/* GraphQL */`
  query ShopCartQuery {
    cart {
      id
      userId
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


// const removeCartItemMutation = graphql(/* GraphQL */`
//   mutation RemoveCartItem($productId: Int!) {
//     removeProductFromCart(cartItem: {
//       productId: $productId
//     }) {
//       id
//       userId
//       quantity
//       items {
//         product {
//           id
//           title
//         }
//       }
//     }
//   }
// `);

function useShopCart() {
  const { userId } = useUser();
  console.log({ shopCartQuery });
  const { data } = useQuery(shopCartQuery, {
    context: {
      headers: {
        'Authorization': `Bearer ${userId}`
      }
    }
  });

  return {
    shopCart: data?.cart
  }
};

export default useShopCart;

