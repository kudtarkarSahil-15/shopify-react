import React, { useEffect, useState } from "react";
import { Container, Col, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import axios from "axios";

import ItemCard from "./ItemCard";

const Product = ({ addInCart }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getProduct = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_PRODUCT_API}`);

    const allProdDetail = data.map((item) => ({
      id: item.id,
      productName: item.name,
      productPrice: item.price,
      productImage: item.image,
    }));

    setProducts(allProdDetail);
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Container fluid>
        <Row>
          {currentItems.map((product) => (
            <Col md={4} key={product.id}>
              <ItemCard product={product} addIntoCart={addInCart} />
            </Col>
          ))}
        </Row>
        <div style={{ display: "flex", justifyContent: "center"}}>
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index} active={index + 1 === currentPage}> 
              <PaginationLink onClick={() => handlePageClick(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
        </div>
      </Container>
    </>
  );
};

export default Product;
