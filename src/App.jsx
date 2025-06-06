import { useState, useEffect } from 'react';
import { db } from './data/db';
import Header from './components/Header';
import Guitar from './components/Guitar';


function App() {

  //Usar el Local Storage
  const initialCart =() =>{
    const localStorageCart = localStorage.getItem('cart');
   /* if (localStorageCart) {
      return JSON.parse(localStorageCart)
    }
    else{
      return []
    }*/
    const value = localStorageCart ? JSON.parse(localStorageCart) : []
    return value
  }


  //Obtener datos de la base de datos
  const [data, setData] = useState(db);

  //Definir datos del carrito
  const [cart, setCart] = useState(initialCart());

  //Usar el local storage
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])
  
  //Definir el limite de eliminación
  const MIN_ITEM = 2;

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

    if (itemExists >= 0) {
      //Este elemento existe en el carrito}
      console.log('Actualizando...');
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart)

      //console.log(cart.quantity)
    } else {
      console.log('Agregando...');
      item.quantity = 1;
      setCart([...cart, item]);
      //console.log(cart.quantity)
    }
  }

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity (id){
    const updatedCart = cart.map (item => {
      if(item.id === id){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function reduceQuantity (id){
    const updatedCart = cart.map (item => {
      if(item.id === id && item.quantity >= MIN_ITEM){
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function ereaseCart () {
    setCart([])
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart = {removeFromCart}
        increaseQuantity = {increaseQuantity}
        reduceQuantity = {reduceQuantity}
        ereaseCart = {ereaseCart}
      />
      <main className='container-xl mt-5'>
        <h2 className='text-center'>Nuestra Colección</h2>

        <div className='row mt-5'>
          {data.map((item) => (
            <Guitar
              key={item.id}
              guitar={item}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className='bg-dark mt-5 py-5'>
        <div className='container-xl'>
          <p className='text-white text-center fs-4 mt-4 m-md-0'>
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
