import { NavbarComponent, ListCategories, Hasil, Menus } from "./components";
import { Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { API_URL } from "./utils/constants";
import axios from "axios";
import swal from "sweetalert";

function App() {
  const [menus, setMenus] = useState([]);
  const [chooseCategory, setChooseCategory] = useState("Makanan");
  const [keranjangs, setKeranjangs] = useState([]);

  useEffect(() => {
    // menampilkan semua product (componentDidMount)
    axios
      .get(API_URL + "products?category.nama=" + chooseCategory)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // menampilkan hasil pesanan di keranjang
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        setKeranjangs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeCategory = (value) => {
    setChooseCategory(value);
    setMenus([]);
    // menampilkan product berdasarkan category
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        // jika tidak ada product yang sama maka post
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              swal({
                title: "Sukses!",
                text: `Pesanan ${keranjang.product.nama} telah masuk di keranjang.`,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // jika ada product yang sama maka put, update pesanan product yang sama
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses!",
                text: `Pesanan ${keranjang.product.nama} telah masuk di keranjang.`,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          setKeranjangs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [keranjangs]);

  return (
    <div className="App">
      <NavbarComponent />
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={changeCategory}
              chooseCategory={chooseCategory}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjang={keranjangs} />
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
