import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { Container, Row, Col} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';

import Product from './components/Products';
import Cart from './components/Cart';

function App() {

  const [cartItem, setCartItem] = useState([])
  // const [productS, setProductS] = useState({
  //   name: "Laptop Dell",
  //   price: 10,
  //   productBy: "Dell"
  // })

  const addItem = item => {

    //find match
    const isAlreadyAdded = cartItem.findIndex((array) => {
      return item.id === array.id;
    })

    //if it is present into cart, send toast msg
    if(isAlreadyAdded !== -1) {
      toast("already into cart..!!", {
        type: "error"
      });
      return;
    }
    // if it is not in the cart, add into cart 
    setCartItem([...cartItem, item])
  }

  const buyNow = () => {
    //make it cart empty..
    setCartItem([])

    toast("Purchasing..!!", {
      type: "success"
    })
  }

  const removeItem = item => {
    setCartItem(cartItem.filter(singleItem => singleItem.id !== item.id))
  }


  return (
    <>
    <Container fluid>
      <>
      <h2 className='text-center mt-2 py-2'
      style={{backgroundColor: '#EBECEE', width: "100%", fontStyle: 'italic'}}
      >React Shopify</h2>
      </>
      <ToastContainer />
      <Row>
        <Col md={8}>
          <Product addInCart={addItem}/>
        </Col>
        <Col md={4}>
          <Cart cartItem={cartItem} removeItem={removeItem} buyNow={buyNow}/>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
