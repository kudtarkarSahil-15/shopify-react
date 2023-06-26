import React from 'react'
import {Card, CardBody, CardText, CardTitle, CardImg, Button} from 'reactstrap'

const ItemCard = ({product, addIntoCart}) => {
    return (
        <>
        <Card className="mt-1 mb-2">
            <CardImg top height={150} width={150} alt='product-image' src={product.productImage}/>
            <CardBody className="text-center">
                <CardTitle>
                    {product.productName}
                </CardTitle>
                <CardText className="secondary">
                    Rs.{product.productPrice}
                </CardText>
                <Button className="btn btn-sm" type='button' color='success' onClick={ () => addIntoCart(product) }>
                    Buy Now
                </Button>
            </CardBody>
        </Card>
        </>
    )
}

export default ItemCard