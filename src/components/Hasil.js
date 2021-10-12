import React, { useState } from "react";
import { Col, ListGroup, Badge, Row, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import Total from "./Total";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";
import swal from "sweetalert";
import { API_URL } from "../utils/constants";

const Hasil = ({ keranjang, getListKeranjangs }) => {
  const [showModal, setShowModal] = useState(false);
  const [keranjangDetail, setKeranjangDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);

  // event untuk menampilkan modal
  const handleShow = (menu) => {
    setShowModal(true);
    setKeranjangDetail(menu);
    setJumlah(menu.jumlah);
    setKeterangan(menu.keterangan);
    setTotalHarga(menu.total_harga);
  };

  // event untuk menutup modal
  const handleClose = () => {
    setShowModal(false);
  };

  // event untuk menambah jumlah product di modal
  const tambah = () => {
    setJumlah(jumlah + 1);
    setTotalHarga(keranjangDetail.product.harga * (jumlah + 1));
  };

  // event untuk mengurangi jumlah product di modal
  const kurang = () => {
    if (jumlah !== 1) {
      setJumlah(jumlah - 1);
      setTotalHarga(keranjangDetail.product.harga * (jumlah - 1));
    }
  };

  // event untuk keterangan product di modal(textarea)
  const handleChange = (e) => {
    setKeterangan(e.target.value);
  };

  // event untuk submit di modal
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      jumlah: jumlah,
      total_harga: totalHarga,
      product: keranjangDetail.product,
      keterangan: keterangan,
    };
    // menggunakan method put, karena mengupdate data di keranjang
    axios
      .put(API_URL + "keranjangs/" + keranjangDetail.id, data)
      .then((res) => {
        getListKeranjangs();
        swal({
          title: "Sukses Update Pesanan!",
          text: `Pesanan ${data.product.nama} telah di update.`,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };
  // event untuk menghapus pesanan
  const hapusPesanan = (id) => {
    axios
      // delete pesanan, yang diambil ID
      .delete(API_URL + "keranjangs/" + id)
      .then((res) => {
        getListKeranjangs();
        swal({
          title: "Pesanan Telah Dihapus!",
          text: `Pesanan ${keranjangDetail.product.nama} telah di hapus.`,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  return (
    <Col md={3} mt="2">
      <h4>
        <strong>Keranjang Pesanan</strong>
      </h4>
      <hr />
      <Card className="overflow-auto hasil">
        {keranjang.length !== 0 && (
          <ListGroup variant="flush">
            {keranjang.map((menu) => (
              <ListGroup.Item
                className="list-pesanan"
                key={menu.id}
                onClick={() => handleShow(menu)}
              >
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
                    <p style={{ color: "grey" }}>
                      Rp. {numberWithCommas(menu.product.harga)}
                    </p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithCommas(menu.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            {/* kirim semua state dan function menjadi props */}
            <ModalKeranjang
              handleClose={handleClose}
              showModal={showModal}
              keranjangDetail={keranjangDetail}
              jumlah={jumlah}
              keterangan={keterangan}
              tambah={tambah}
              kurang={kurang}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              totalHarga={totalHarga}
              hapusPesanan={hapusPesanan}
            />
          </ListGroup>
        )}
      </Card>
      <Total keranjang={keranjang} />
    </Col>
  );
};

export default Hasil;
