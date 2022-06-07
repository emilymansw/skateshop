import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItemData, ICompletedPartsInfoData } from '../types/product';

interface ICartItemChangePayloadData {
  variantId: number;
  quantity: number;
}

interface IAddBundlePayloadData {
  parts: ICompletedPartsInfoData;
  bundleTotal: number;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [] as ICartItemData[],
    totalQuantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action: PayloadAction<ICartItemData>) => {
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem.variantId === action.payload.variantId
      );
      if (index !== -1) {
        state.cartItems[index].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;
      state.totalQuantity += action.payload.quantity;
    },
    addOneToItem: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem.variantId === action.payload
      );
      state.cartItems[index].quantity += 1;
      state.total += state.cartItems[index].price;
      state.totalQuantity += 1;
    },
    minusOneFromItem: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem.variantId === action.payload
      );
      state.cartItems[index].quantity -= 1;
      state.total -= state.cartItems[index].price;
      state.totalQuantity -= 1;
    },
    changeItemQuantity: (
      state,
      action: PayloadAction<ICartItemChangePayloadData>
    ) => {
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem.variantId === action.payload.variantId
      );
      const quantityChange =
        action.payload.quantity - state.cartItems[index].quantity;
      state.cartItems[index].quantity = action.payload.quantity;
      state.total += state.cartItems[index].price * quantityChange;
      state.totalQuantity += quantityChange;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem.variantId === action.payload
      );
      state.total -=
        state.cartItems[index].price * state.cartItems[index].quantity;
      state.totalQuantity -= state.cartItems[index].quantity;
      state.cartItems = state.cartItems.filter(
        (item) => item.variantId !== action.payload
      );
    },
    addBundle: (state, action: PayloadAction<IAddBundlePayloadData>) => {
      Object.keys(action.payload.parts).forEach((key) => {
        const castKey = key as keyof typeof action.payload.parts;
        const index = state.cartItems.findIndex(
          (cartItem) =>
            cartItem.variantId === action.payload.parts[castKey].variantId
        );
        if (index !== -1) {
          state.cartItems[index].quantity +=
            action.payload.parts[castKey].quantity;
        } else {
          state.cartItems.push(action.payload.parts[castKey]);
        }
      });
      state.totalQuantity += 7;
      state.total += action.payload.bundleTotal;
    },
  },
});

export const {
  addProduct,
  addOneToItem,
  minusOneFromItem,
  changeItemQuantity,
  removeItem,
  addBundle,
} = cartSlice.actions;
export default cartSlice.reducer;
