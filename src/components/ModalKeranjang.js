import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faTrash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetail,
  keterangan,
  jumlah,
  tambah,
  kurang,
  handleSubmit,
  handleChange,
  totalHarga,
  hapusPesanan,
}) => {
  if (keranjangDetail) {
    return (
      <Modal show={showModal} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>{keranjangDetail.product.nama}</strong>{" "}
            <span style={{ color: "grey" }}>
              (Rp. {numberWithCommas(keranjangDetail.product.harga)})
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Total Harga : </Form.Label>
              <p style={{ color: "grey" }}>
                (Rp. {numberWithCommas(totalHarga)})
              </p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jumlah Pesanan : </Form.Label>
              <br />
              <Button variant="primary" size="sm" onClick={() => kurang()}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <strong className="mx-2">{jumlah}</strong>
              <Button variant="primary" size="sm" onClick={() => tambah()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Keterangan: </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="(Pedas,Tidak Pakai Bawang,dll)..."
                style={{ height: "100px" }}
                value={keterangan}
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              <FontAwesomeIcon icon={faCheckCircle} /> Simpan
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
