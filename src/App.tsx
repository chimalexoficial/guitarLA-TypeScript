import './App.css';
import Header from './components/Header';
import Guitar from './components/Guitar';
import useCart from './hooks/useCart';

function App() {
    console.log('From App');

    const {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        emptyCart,
        isEmpty,
        cartTotal
    } = useCart();

    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                emptyCart={emptyCart}
                isEmpty={isEmpty}
                cartTotal={cartTotal}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Our Collection</h2>

                <div className="row mt-5">
                    {
                        data.map((guitar) => (
                            <Guitar
                                key={guitar.id}
                                guitar={guitar}
                                cart={cart}
                                addToCart={addToCart} />
                        ))
                    }
                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - All rights reserved</p>
                </div>
            </footer>
        </>
    )
}

export default App;



// // state
// useEffect(() => {
//     console.log('Listening auth');
// }, [auth]) // if empty, just once is executed

// setTimeout(() => {
//     setAuth(true)
// }, 3000);
