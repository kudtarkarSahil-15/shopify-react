import Axios from "axios";
import React from "react";
//imported Stripe
import StripeCheckout from "react-stripe-checkout";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  CardText,
} from "reactstrap";

const Cart = ({ cartItem, removeItem, buyNow }) => {
  // calc to item in cart
  let amount = 0;
  cartItem.forEach((item) => {
    amount = parseFloat(amount) + parseFloat(item.productPrice);
  });

  const makePayment = async (token) => {
    const body = {
      token,
      cartItem,
    };

    return await Axios.post(`${process.env.REACT_APP_BASE_URL}/payment`, {
      body,
    })
      .then((response) => {
        console.log(response);
        const { status } = response;
        console.log("Status", status);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Container fluid>
        <h2
          className="text-center py-2 my-1"
          style={{ backgroundColor: "#292A2C", color: "white" }}
        >
          CART
        </h2>
        <ListGroup>
          {cartItem.map((item) => (
            <ListGroupItem key={item.id}>
              <Row>
                <Col md={4}>
                  <img
                    src={item.productImage}
                    height="100%"
                    width="100%"
                    alt="product-img"
                  />
                </Col>
                <Col className="text-center">
                  <h5>{item.productName}</h5>
                  <span>{item.productPrice}</span>
                  <br></br>
                  <Button
                    className="btn btn-sm"
                    color="danger"
                    onClick={() => removeItem(item)}
                  >
                    Remove Item
                  </Button>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* if cart is empty, then ?? */}
        {cartItem.length >= 1 ? (
          <Card className="mt-2">
            <CardHeader className="text-center fw-bold">
              Total Amount
            </CardHeader>
            <CardBody>
              <CardText>Total Product in a Cart is {cartItem.length}</CardText>
              <CardText>Total Amount: Rs.{amount}.00</CardText>
            </CardBody>
            <CardFooter className="text-center">
              <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                token={makePayment}
                name="Stripe Payment"
                amount={amount * 100}
              >
                <Button onClick={() => buyNow()} color="success">
                  Pay Here
                </Button>
              </StripeCheckout>
            </CardFooter>
          </Card>
        ) : (
          <>
            <div className="text-center">
              <img
                src='/images/shopcart.png'
                alt="empty-cart"
                height="200px"
                style={{opacity: "0.1"}}
              />
              <h4 className="fw-100">Empty Cart..!!</h4>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Cart;
