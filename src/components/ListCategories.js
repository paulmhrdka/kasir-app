import React, { useState, useEffect } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="ml-4" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} />;
};

const ListCategories = ({ changeCategory, chooseCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Col md={2} className="mr-2">
      <h4>
        <strong>Daftar Kategori</strong>
      </h4>
      <hr />
      <ListGroup>
        {categories &&
          categories.map((category) => (
            <ListGroup.Item
              key={category.id}
              onClick={() => changeCategory(category.nama)}
              className={chooseCategory === category.nama && "category-aktif"}
              style={{ cursor: "pointer" }}
            >
              <Icon nama={category.nama} /> <span>{category.nama}</span>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
};

export default ListCategories;
