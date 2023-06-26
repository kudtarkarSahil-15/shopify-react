import React, { useEffect, useState } from "react"
import {Container, Col, Row } from 'reactstrap'
import axios from "axios"

import ItemCard from "./ItemCard"

const Product = ({addInCart}) => {

    const [products, setProduct] = useState([])

    const getProduct = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_PRODUCT_API}`);

        const allProdDetail = data.map(item => (
            {
                id: item.id,
                productName: item.name,
                productPrice: item.price,
                productImage: item.image
            }
        ))

        setProduct(allProdDetail)
    }

    useEffect(() => {
        getProduct()
    // eslint-disable-next-line 
    }, [])

    return (
        <>
            <Container fluid>
                <Row>
                    {products.map(product => (
                        <Col md={4} key={product.id}>
                                {/* <img src={product.productImage} alt="" height="150" width="150" />
                                <h6>{product.productName}</h6>
                                <h6>Rs.{product.productPrice}</h6>
                                <button>Buy Now</button> */}
                                <ItemCard product={product} addIntoCart={addInCart}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Product