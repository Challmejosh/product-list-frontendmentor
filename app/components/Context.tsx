'use client'
import { createContext, useEffect, useState } from "react";

// interface Product {
//     image: {
//         thumbnail: string;
//         mobile: string;
//         tablet: string;
//         desktop: string;
//     };
//     name: string;
//     category: string;
//     price: number;
// }
interface CartProduct {
    image: {
        thumbnail: string;
        mobile: string;
        tablet: string;
        desktop: string;
    };
    name: string;
    category: string;
    price: number;
    quantity: number;
}
interface Children {
    children: React.ReactNode;
}
interface Values {
    addCart: (item: CartProduct)=>void,
    removeCart: (item: CartProduct)=>void,
    product: CartProduct[] | null,
    cart: CartProduct[] | null,
    delItem: (item : CartProduct) => void,
    activeItem: string | null,
    confirm: boolean|null;
    submitCart: ()=>void,
    nonConfirm: ()=>void,
    totalAmount: number,
    cartLength: number,
}
const Initials = {
    addCart : ()=>null,
    removeCart : ()=>null,
    product: null,
    cart: null,
    delItem: ()=>null,
    activeItem: null,
    confirm: null,
    submitCart: ()=> null,
    nonConfirm: ()=>null,
    totalAmount: 0,
    cartLength: 0,
}

export const AppContext = createContext<Values>(Initials)
const Context = ({children}: Children) => {
    const [product,setProduct] = useState<CartProduct[] | null>(null);
    const [cart, setCart] = useState<CartProduct[] | null>(null);
    const [activeItem,setActiveItem] = useState<string | null>(null)
    const [confirm,setConfirm] = useState<boolean | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/data.json');
                const data = await res.json();
                setProduct(data.map((item: CartProduct) => item && {...item, quantity: 0}));
            } catch (err) {
                console.log(err);
            }
        };
        setTimeout(()=>{
            fetchData();
        },50)
    }, []);
    
    const addCart = (item: CartProduct) => {
        const check = product?.find((i: CartProduct) => i.name === item.name);
        if (check) {
            const confirm = cart?.find((i: CartProduct) => i.name === item.name);
            if (confirm) {
                const newCart: CartProduct[] = cart!.map((i: CartProduct) =>
                    i.name === confirm.name ? { ...i, quantity: i.quantity + 1 } : i
                );
                const newProduct: CartProduct[] = product!.map((i: CartProduct) =>
                    i.name === confirm.name ? { ...i, quantity: i.quantity + 1 } : i
                );
                setProduct(newProduct)
                setCart(newCart);
            } else {
                const newProduct: CartProduct[] = product!.map(itm => itm.name === item.name ? {...itm, quantity: itm.quantity + 1} : itm )
                setProduct(newProduct)
                setCart([...(cart ?? []), { ...item, quantity: item.quantity + 1 }]);
            }
        }
        setActiveItem(item?.name)
    };
    const removeCart = (item: CartProduct) => {
        const check = product?.find((i: CartProduct) => i.name === item.name);
        if (check) {
            const confirm = cart?.find((i: CartProduct) => i.name === item.name);
            if (confirm) {
                const newCart: CartProduct[] = cart!.map((i: CartProduct) =>
                    i.name === confirm.name ? { ...i, quantity: i.quantity - 1 } : i
                );
                const newProduct: CartProduct[] = product!.map((i: CartProduct) =>
                    i.name === confirm.name ? { ...i, quantity: i.quantity - 1 } : i
                );
                const checkQuantity = newCart?.filter((i: CartProduct) => i.quantity !== 0)
                setProduct(newProduct)
                setCart(checkQuantity);
            } else {
                setCart([...(cart ?? []), { ...item, quantity: 1 }]);
            }
        }
        setActiveItem(item?.name)
    };
    const delItem = (item: CartProduct)=>{
        const check = cart!.filter((i:CartProduct)=> i !== item)
        const newProduct: CartProduct[] = product!.map((i: CartProduct) =>
            i.name === item.name ? { ...i, quantity: 0 } : i
        );
        setProduct(newProduct)
        setCart(check)
    }
    const submitCart = ()=>{
        setConfirm(true)
    }
    const nonConfirm = ()=>{
        // fix this
        const newProduct: CartProduct[] = product!.map((i: CartProduct) =>
            i ? { ...i, quantity: 0 } : i
        );
        setProduct(newProduct)
        setCart(null)
        setActiveItem(null)
        setConfirm(null)
    }
    const totalAmount: number = cart?.reduce((acc, item) =>acc + item.price * item.quantity, 0) || 0;
    const cartLength: number = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
      
    return ( 
        <AppContext.Provider value={{addCart,product,cart,delItem,activeItem,removeCart,confirm,submitCart,nonConfirm,totalAmount,cartLength}}>
            {children}
        </AppContext.Provider>
     );
}
 
export default Context;