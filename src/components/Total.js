import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { useHistory } from "react-router";

const Total = ({ keranjang }) => {
  // menggunakan useHistory hooks
  const history = useHistory();

  // melakukan penjumlahan semua item yang masuk dikeranjang
  const totalBayar = keranjang.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  // submitTotalBayar akan dijalankan jika totalBayar tidak berisi 0 dan button diklick
  const submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: keranjang,
    };
    // mengirim data keranjang ke pesanan
    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      // menggunakan variabel pada useHistory
      history.push("/success");
    });
  };

  return (
    <div className="fixed-bottom">
      <Row>
        <Col md={{ span: 3, offset: 9 }} className="px-4">
          <h5>
            Total Harga :{" "}
            <strong style={{ float: "right" }}>
              Rp. {numberWithCommas(totalBayar)}
            </strong>
          </h5>
          {/* pengkondisian Button, jika totalBayar 0 maka button disabled, jika tidak maka button bisa diklik */}
          {totalBayar === 0 ? (
            <Button
              variant="primary"
              size="md"
              className="float-right my-2 mb-3"
              style={{ width: "100%" }}
              disabled
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              className="float-right my-2 mb-3"
              style={{ width: "100%" }}
              onClick={() => submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Total;
