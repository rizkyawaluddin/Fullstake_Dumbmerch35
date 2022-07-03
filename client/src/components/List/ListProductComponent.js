import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import DeleteData from "../modal/DeleteData";

import { API } from "../../config/api";

const ListProductComponent = (props) => {
  const navigate = useNavigate();

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    handleShow();
    setIdDelete(id);
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/product/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      // close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  //conver currency
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const handleUpdate = () => {
    navigate("/update-product/" + props.id);
  };

  return (
    <>
      <tr className="align-middle text-center">
        <th scope="row">{`${props.index + 1}`}</th>
        <td>
          <img src={props.image} alt="image-product" className="image-list-product" />
        </td>
        <td> {`${props.title.slice(0, 16)}...`}</td>
        <td>{`${props.desc.slice(0, 16)}`}</td>
        <td>{formatter.format(props.price)}</td>
        <td>{props.stock}</td>
        <td className="text-center">
          <button onClick={handleUpdate} className="btn bg-var-green text-white fw-bold m-1" href="" style={{ width: "6rem" }}>
            Edit
          </button>

          <button to="/delete-product" onClick={() => handleDelete(props.id)} className="btn bg-var-red text-white fw-bold m-1" style={{ width: "6rem" }} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Delete
          </button>
        </td>
      </tr>
      <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
    </>
  );
};

export default ListProductComponent;
