import styles from './styles.css';
import { useState } from 'react';
import { useClient } from '@next/react-sdk'; // Certifique-se de ter '@next/react-sdk' instalado

const Menu = ({ pizzas }) => {
  useClient(); // Marque o componente como um Componente do Cliente

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (pizza) => {
    const existingPizzaIndex = cart.findIndex((item) => item.id === pizza.id);
    if (existingPizzaIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingPizzaIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
    setTotalPrice(totalPrice + pizza.price);
  };
  
  const removeFromCart = (pizzaId) => {
    const pizzaToRemove = cart.find((item) => item.id === pizzaId);
    if (pizzaToRemove) {
      if (pizzaToRemove.quantity > 1) {
        const updatedCart = cart.map((item) =>
          item.id === pizzaId ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
      } else {
        const updatedCart = cart.filter((item) => item.id !== pizzaId);
        setCart(updatedCart);
      }
      setTotalPrice(totalPrice - pizzaToRemove.price);
    }
  };

  return (
    <div>
         useClient();
      <h1>Menu de Pizzas</h1>
      <div className={styles.menuContainer}>
        {pizzas.map((pizza) => (
          <div key={pizza.id} className={styles.pizzaCard}>
            <img src={pizza.image} alt={pizza.name} />
            <h2>{pizza.name}</h2>
            <p>Preço: R${pizza.price.toFixed(2)}</p>
            <div className={styles.quantityControls}>
              <button onClick={() => removeFromCart(pizza.id)}>-</button>
              <span>{(cart.find((item) => item.id === pizza.id) || {}).quantity || 0}</span>
              <button onClick={() => addToCart(pizza)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.cartContainer}>
        <h2>Carrinho</h2>
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <p>{item.name}</p>
              <p>Quantidade: {item.quantity}</p>
            </div>
          ))}
        </div>
        <div className={styles.cartTotal}>
          <p>Total: R${totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
     useClient();
  const response = await fetch('http://localhost:3000'); // Added 'http://' to the URL
  const pizzas = await response.json();

  return {
    props: {
      pizzas,
    },
  };
}

export default Menu;
