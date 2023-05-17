import { ShopCartItem } from "../../gql/graphql";

type TCartItemProps = {
  item: ShopCartItem;
};

function CartItem({ item }: TCartItemProps) {
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={`/product/${item.product.id}`}>{item.product.title}</a>
            </h3>
            <p className="ml-4">{item.product.price}&nbsp;<span className="text-xs">EUR</span></p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {item.quantity}</p>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-400"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
