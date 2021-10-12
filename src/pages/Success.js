import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";

function Success() {
  // masuk ke Sukses Page = semua item di keranjang akan terhapus.
  useEffect(() => {
    // get semua item di keranjang
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        // berhasil, method delete untuk menghapus semua item di keranjang. menggunakan map karena json-server tidak bisa delete all
        const keranjangs = res.data;
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mt-4 text-center">
      <Image src="images/sukses.png" height="300"></Image>
      <h2>Pemesanan Sukses!</h2>
      <p>
        Terimakasih telah memesan. Tunggu pelayan mengantarkan pesanan Anda!
      </p>
      <p>Terimakasih.</p>
      <Button className="btn-ToHome" as={Link} to="/">
        Kembali
      </Button>
    </div>
  );
}

export default Success;
