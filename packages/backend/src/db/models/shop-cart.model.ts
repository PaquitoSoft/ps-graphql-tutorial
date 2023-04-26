import mongoose, { Schema } from "mongoose";

export type TDBShopCart = {
  id: string;
  userId: string;
  items: {
    quantity: number;
    product: {
      id: number;
      title: string;
      price: number;
      image: string;
    };
  }[];
  totalUnits: number;
  totalAmount: number;
};

const ShopCartItemSchema = new Schema(
  {
    quantity: { type: Number, default: 0 },
    product: {
      id: Number,
      title: String,
      price: Number,
      image: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const ShopCartSchema = new Schema({
  userId: String,
  items: [ShopCartItemSchema]
});

ShopCartSchema.virtual('totalUnits').get(function(this) {
	const total = this.items.reduce((acc, item) => {
		return acc + item.quantity;
	}, 0);
	return total;
});

ShopCartSchema.virtual('totalAmount').get(function(this) {
	const total = this.items.reduce((acc, item) => {
		return acc + item.product.price * item.quantity;
	}, 0).toFixed(0);
	return total;
});

export default mongoose.model<TDBShopCart>('ShopCart', ShopCartSchema);
