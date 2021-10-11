import React from "react";
import { Col, ListGroup, Badge, Row } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Hasil = ({ keranjang }) => {
  return (
    <Col md={3} mt="2">
      <h4>
        <strong>Hasil</strong>
      </h4>
      <hr />
      {keranjang.length !== 0 && (
        <ListGroup variant="flush">
          {keranjang.map((menu) => (
            <ListGroup.Item>
              <Row>
                <Col xs={2}>
                  <h4>
                    <Badge pill bg="success">
                      {menu.jumlah}
                    </Badge>
                  </h4>
                </Col>
                <Col>
                  <h5>{menu.product.nama}</h5>
                  <p>Rp. {numberWithCommas(menu.product.harga)}</p>
                </Col>
                <Col>
                  <strong className="float-right">
                    Rp. {numberWithCommas(menu.total_harga)}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default Hasil;
