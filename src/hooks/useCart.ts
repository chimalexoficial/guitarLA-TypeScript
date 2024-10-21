import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db.js';
import type { Guitar, CartItem } from '../types/index.js';


const useCart = () => {

    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        if (localStorageCart != null) {
            return JSON.parse(localStorageCart);
        } else {
            return [];
        }
    }

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    function addToCart(item: Guitar) {
        const itemExists = cart.findIndex((guitar) => item.id === guitar.id);
        console.log(itemExists);

        if (itemExists >= 0) { // update quantity
            console.log('Already exists');
            if (cart[itemExists].quantity >= MAX_ITEMS) return;
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        } else { // add to cart
            const newItem: CartItem = { ...item, quantity: 1 };
            console.log('Adding...');
            setCart([...cart, newItem]);
        }
    }

    function removeFromCart(id: Guitar['id']) {
        console.log('Removing...');
        console.log(id);
        setCart(cart.filter(item => item.id !== id));
    }

    function increaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item;
        })
        setCart(updatedCart);
    }

    function decreaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        })
        setCart(updatedCart);
    }

    function emptyCart() {
        console.log('cleaning all the items...');
        setCart([]);
    }

    // state 
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        emptyCart,
        isEmpty,
        cartTotal
    }
}

export default useCart;