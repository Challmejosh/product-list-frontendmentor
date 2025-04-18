'use client'
import { useContext } from "react";
import Cart from "./components/cart";
import Dessert from "./components/dessert";
import OrderConfirm from "./components/orderConfirmed";
import { AppContext } from "./components/Context";

export default function Home() {
                        
  const {confirm,product} = useContext(AppContext)
  return (
    <div className="relative w-full p-5 bg-[#f4edeb] flex gap-5 flex-col md:flex-row items-center md:items-start justify-center">
      {!product && <div className="text-3xl font-bold h-screen mb-4"></div>}
      {
        product &&
      <>
        <Dessert />
        <Cart />
        {confirm && <OrderConfirm />}
      </>
      }
    </div>
  );
}
