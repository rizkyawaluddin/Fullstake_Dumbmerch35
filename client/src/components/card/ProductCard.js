import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const ProductCard = (props) => {
  const convertRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  return (
    <>
      <div className="card-product">
        <Link to={`/detail-product/${props.id}`} style={{ textDecoration: "none" }}>
          <Card className="bg-var-dark text-light" style={{ width: "13rem" }}>
            <Card.Img variant="top" src={props.image} className="image-product" />
            <Card.Body>
              <Card.Title className="text-var-red">{`${props.title.slice(0, 16)}`}</Card.Title>
              <span>{`${convertRupiah.format(props.price)}`}</span>
              <br/>
              <span>Stock : {props.stock}</span>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
