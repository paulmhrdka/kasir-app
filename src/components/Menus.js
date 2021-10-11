import React from "react";
import { Card, Col } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} sm={6} className="mb-4">
      <Card className="shadow" style={{height: "18em"}} onClick={() => masukKeranjang(menu)}>
        <Card.Img
          variant="top"
          src={"images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar}
        />
        <Card.Body>
          <Card.Title>
            <strong>{menu.nama}</strong> ({menu.kode})
          </Card.Title>
          <Card.Text>Rp. {numberWithCommas(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
