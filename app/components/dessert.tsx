'use client'

import { useContext } from "react";
import { AppContext } from "./Context";
import Image from "next/image";
import { AnimatePresence,motion } from "framer-motion";
// import { motion } from "framer-motion";

const Dessert = () => {
    const {product,addCart,activeItem,removeCart} = useContext(AppContext)
    console.log(window.innerWidth)
    return ( 
        <AnimatePresence mode="wait">
            <motion.div className=""
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1, delay: 0.5}}
            >

                {product && <h1 className="text-3xl font-bold mb-4">Desserts</h1>}
                <div className="grid sm:grid-cols-2 w-full lg:grid-cols-3 gap-4  ">
                    {product?.map((item,index) => (
                        <AnimatePresence key={index}>
                            <motion.div className="relative flex flex-col gap-8 items-start justify-center " 
                            initial={{opacity: 0,y: -10}}
                            animate={{opacity: 1,y: 0}}
                            exit={{opacity: 0, y: -10}}
                            transition={{duration: index * 0.2,delay: index * 0.2}}
                            >
                                <img className={`${activeItem === item?.name && 'border-[2px] border-[#c73a0f]' } w-full cursor-pointer rounded-lg h-full`} src={item?.image?.desktop} alt="" />
                                {(activeItem !== item?.name || item?.quantity === 0) && <div className={` absolute bottom-26 flex items-center justify-center w-full `}>
                                    <div onClick={()=>{
                                        addCart(item)
                                    }} className="cursor-pointer bg-white py-3 px-5 flex gap-3 items-center justify-center shadow-md border border-[#f4edeb] shadow-[#c9aea6] rounded-full ">
                                        <Image src='/assets/images/icon-add-to-cart.svg' alt="" width={30} height={30} className="font-semibold" />
                                        <p className=" font-bold">Add to Cart</p>
                                    </div>
                                </div>}
                                {activeItem === item?.name && item?.quantity >= 1 &&<div className={` absolute bottom-26 flex items-center justify-center w-full `}>
                                        <div className="w-1/2 bg-[#c73a0f] py-3 px-5 flex gap-3 items-center justify-between shadow-md border border-[#f4edeb] shadow-[#c9aea6] rounded-full ">
                                            <div onClick={()=>removeCart(item)} className="p- flex items-center justify-center rounded-full border border-white cursor-pointer ">
                                                <Image src='/assets/images/icon-decrement-quantity.svg' alt="" className="" width={10} height={10} />
                                            </div>
                                            <p className="">{item?.quantity}</p>
                                            <div onClick={()=>addCart(item)} className="p-1 rounded-full border border-white cursor-pointer ">
                                                <Image src='/assets/images/icon-increment-quantity.svg' alt="" className="" width={10} height={10} />
                                            </div>
                                            
                                        </div>
                                </div>}
                                <div className="flex flex-col leading-[34px] ">
                                    <p className="text-[#ad8985] font-semibold  ">{item?.category}</p>
                                    <p className="font-semibold  ">{item?.name}</p>
                                    <p className="text-[#c73a0f] font-semibold ">${item?.price.toFixed(2)}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
     );
}
 
export default Dessert;