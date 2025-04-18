'use client'

import { useContext } from "react";
import { AppContext } from "./Context";
import Image from "next/image";
import { AnimatePresence,motion } from "framer-motion";

const Cart = () => {
    const {cart,delItem,submitCart,totalAmount,cartLength} = useContext(AppContext)
    return ( 
        <AnimatePresence mode="wait">
            <motion.div className="w-full md:w-[800px] bg-white rounded-2xl p-5"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1 , delay: 0.5}}
            >
                <h1 className="text-3xl font-bold mb-4 text-[#c73a0f] ">Your Cart ({ cartLength }) </h1>
                <div className="h-[300px] overflow-y-scroll [&::-webkit-scrollbar]:hidden ">
                    <AnimatePresence>
                        {(!cart || cart.length === 0) && (
                            <motion.div className="flex flex-col items-center justify-center"
                            initial={{opacity: 0}}
                            animate={{opacity: 1,transition:{duration: 0.6}}}
                            exit={{opacity: 0,
                            transition:{duration: 0.8}
                            }}
                            >
                                <Image src='/assets/images/illustration-empty-cart.svg' alt="" width={150} height={150} className=" object-cover" />
                                <p className="text-lg text-[#87635a] font-semibold ">Your added items will appear here </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Cart */}
                    <AnimatePresence>
                        {cart && cart.length >= 1 &&
                        <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1,transition:{duration: 1 , delay: 0.7}}}
                        exit={{opacity: 0,
                        transition:{duration: 0.5 }
                        }}>
                        {cart.map((item, index) => (
                            <AnimatePresence key={index}>
                                <motion.div className="flex gap-3 items-center justify-between mb-4 p-4 border-b border-b-[#c9aea6] "
                                initial={{opacity: 0}}
                                animate={{opacity: 1,transition:{duration: index * 0.2}}}
                                exit={{opacity: 0,
                                transition:{duration: 0.5,delay: 1}
                                }}
                                >
                                    <div className="flex flex-col gap-2 items-start justify-center ">
                                        <p className="font-semibold">{item?.name}</p>
                                        <div className="flex gap-3 items-center justify-center ">
                                            <p className="text-[#c73a0f]">{item?.quantity}x</p>
                                            <div className="flex items-center justify-center gap-2">
                                                <p className="text-[#87635a] ">@ ${item?.price.toFixed(2)}</p>
                                                <p className="font-semibold text-[#260f08] "> $ {(item?.price * item?.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div onClick={()=>delItem(item)} className="flex cursor-pointer items-center justify-center  ">
                                        <div className="p-1 border border-[#87635a] rounded-full  ">
                                            <Image src='/assets/images/icon-remove-item.svg' alt='' width={10} height={10} className="cursor-pointer" />
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            ))}
                        </motion.div>}
                    </AnimatePresence>
                </div>
                {/* Last Part */}
                <AnimatePresence>
                    {cart && cart.length >= 1 &&<motion.div className="flex flex-col gap-3 items-center justify-center w-full "
                    initial={{opacity: 0}}
                    animate={{opacity: 1,transition:{duration: 1 , delay: 0.7}}}
                    exit={{opacity: 0,
                    transition:{duration: 0.5}
                    }}
                    >
                        <div className="flex w-full items-center justify-between p-3 ">
                            <p className="">Order Total</p>
                            <p className="font-semibold text-3xl">${totalAmount?.toFixed(2)}</p>
                        </div>
                        <div className="bg-[#f4edeb] w-full gap-3 rounded-lg p-3 flex items-center justify-center ">
                            <Image src='/assets/images/icon-carbon-neutral.svg' alt='' width={20} height={20} className="" />
                            <p className="">This is a <strong className="">carbon-neutral</strong> delivery </p>
                        </div>
                        <div onClick={submitCart} className="bg-[#c73a0f] w-full rounded-full px-5 py-3 flex items-center justify-center cursor-pointer ">
                            <p className="text-white">Confirm Order</p>
                        </div>
                    </motion.div>}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default Cart;