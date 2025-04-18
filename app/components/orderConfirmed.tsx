'use client'
import { useContext } from "react"
import { AppContext } from "./Context"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"

const OrderConfirm = () => {
    const {cart,nonConfirm,totalAmount} = useContext(AppContext)
    return ( 
        <AnimatePresence mode="wait">
            <motion.div className="fixed top-5 z-10 flex flex-col gap-3 items-start justify-center shadow-lg bg-white w-full p-8 rounded-lg md:w-[500px] "
            initial={{y: -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: -100, opacity: 0}}
            transition={{duration: 1, delay: 0.2}}
            >
                <Image className="" src='/assets/images/icon-order-confirmed.svg' width={50} height={50} alt="" />
                <h1 className="text-3xl font-bold w-full mb-4 ">Order Confirmed </h1>
                <p className="text-[#c9aea6] w-full ">We hope you enjoy your food!</p>
                <div className="bg-[#f4edeb] w-full rounded-md p-3 ">
                    <div className="overflow-y-scroll [&::-webkit-scrollbar]:hidden scrollbar w-full h-[200px] ">
                        {cart && cart.map((item, index) => (
                            <div key={index} className="flex gap-3 items-center justify-between mb-4 p-4 border-b border-b-[#c9aea6] ">
                                <div className="flex flex-col gap-2 items-start justify-center ">
                                    <p className="font-semibold">{item?.name}</p>
                                    <div className="flex gap-3 items-center justify-center ">
                                        <p className="text-[#c73a0f]">{item?.quantity}x</p>
                                        <div className="flex items-center justify-center gap-2">
                                            <p className="text-[#87635a] ">@ ${item?.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex cursor-pointer items-center justify-center  ">
                                    <p className="font-semibold text-[#260f08] "> ${item?.price * item?.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full items-center justify-between p-3 ">
                        <p className="">Order Total</p>
                        <p className="font-semibold text-3xl">${totalAmount.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center w-full ">
                    <div onClick={nonConfirm} className="bg-[#c73a0f] w-full rounded-full px-5 py-3 flex items-center justify-center cursor-pointer ">
                        <p className="text-white">Start New Order</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default OrderConfirm;