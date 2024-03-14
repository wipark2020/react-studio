import "./App.css";
import { useEffect, useState } from "react";
import bakeryData from "./assets/bakery-data.json";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */

  // make a state variable to hold the data
  const [data, setData] = useState(bakeryData);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // run when this component is first loaded
  const loadData = () => {
    setData(bakeryData);
  }

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    let total = 0;
    for (let item of cart) {
      total += item.price;
    }
    setCartTotal(total);
  }, [cart]);

  const addToCart = (item) => {
    console.log('adding to cart:', item.name, item.price)

    setCart(prev_cart =>
      [...prev_cart, {name: item.name, price: item.price}])
  }

  const buildElements = () => {
    const jsxlist = bakeryData.map((item, index) => (
      <div key={index} onClick={() => addToCart(item)} className="BakeryItem">
        <img src={item.image} alt={item.name}/>
        <p><b>{item.name}</b></p>
        <p>{item.description}</p>
        <p>${item.price}</p>
      </div>
    ));
    
    return jsxlist;
  }

  const showCart = () => {
    if (cart.length === 0) {
      console.log('cart is empty')
      return <p>Cart is empty</p>
    }

    const jsxlist = cart.map((item, index) => {
      return <p key={index} > {item.name} $ {item.price}</p>
    })

    return jsxlist;
  }

  return (
    <div className="App">
      <h1>Will's Bakery</h1> 
      <div className="BakeryItems">
        {buildElements()}
      </div>
      <div>
        <h2>Cart</h2>
        {showCart()}
        <p><b>Total: ${cartTotal.toFixed(2)}</b></p>
      </div>
    </div>
  );
}

export default App;