import Button from "../../shared/button/button";
import Layout from "../../shared/layout/layout";
import Loading from "../../shared/loading/loading";
import CartItem from "./cart-item";
import useShopCart from "./use-shop-cart";

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

function ShopCartPage() {
  const { shopCart } = useShopCart();

  if (!shopCart) {
    return (
      <Layout pageTitle="">
        <Loading />
      </Layout>
    );
  }

  console.log({ shopCart });

  return (
    <Layout pageTitle="Shop Cart">
      <>
        <div className="mt-8">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {shopCart.items.map(cartItem => (
                <CartItem key={cartItem?.product.id} item={cartItem} />
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p className="text-right">
              <span className="font-bold text-xl">{shopCart.totalAmount}</span>&nbsp;EUR
              <div className="mt-0.5 font-normal text-sm text-gray-500">
                <span>{shopCart.totalUnits}</span>&nbsp;units
              </div>
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => false}>
              Checkout
            </Button>
          </div>
        </div>
      </>
    </Layout>
  );
}

export default ShopCartPage;
