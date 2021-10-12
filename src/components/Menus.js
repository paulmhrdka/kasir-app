import React from "react";
import { Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} sm={6} className="mb-4">
      <Card
        className="shadow card-menu"
        onClick={() => masukKeranjang(menu)}
      >
        <Card.Img
          variant="top"
          src={"images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar}
        />
        <Card.Body>
          <Card.Title>
            <strong>{menu.nama}</strong>
          </Card.Title>
          <Card.Text style={{ color: "grey" }}>
            Rp. {numberWithCommas(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
