import { useCallback } from "react";
import { graphql } from "../../gql";
import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "../../shared/providers/user-provider";
import { useNavigate } from "react-router-dom";

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

const checkoutMutation = graphql(/* GraphQL */`
  mutation CheckoutMutation {
    checkout
  }
`);

function useShopCart() {
  const { userId } = useUser();
  const navigate = useNavigate();

  const { data } = useQuery(shopCartQuery, {
    context: {
      headers: {
        'Authorization': `Bearer ${userId}`
      }
    }
  });

  const [removeCartItem, { loading: removeFromCartLoading }] = useMutation(removeCartItemMutation);
  const [checkout, { loading: checkoutLoading }] = useMutation(checkoutMutation, {
    refetchQueries: [
      'LayoutDataQuery'
    ]
  });

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

  const onCheckout = useCallback(async () => {
    const { data } = await checkout();
    navigate(`/order-confirmation/${data?.checkout}`);
  }, [checkout, navigate]);

  return {
    shopCart: data?.cart,
    onRemoveCartItem,
    isRemovingItemFromCart: removeFromCartLoading,
    onCheckout,
    isCheckingOut: checkoutLoading
  }
};

export default useShopCart;

