import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListProductComponent from "../components/List/ListProductComponent";
import NavbarAdmin from "../components/navbar/NavbarAdmin";
import imgEmpty from "../assets/static/media/empty.svg";


import { API } from "../config/api";

const ProductAdmin = () => {
  const navigate = useNavigate();
  const title = "Product Admin";
  document.title = "Dumbmers | " + title;

  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/products");
      setProducts(response.data.data);
    };
    fetchData();
  }, []);

  const addProduct = () => {
    navigate("/add-product");
  };


  return (
    <>
      <NavbarAdmin />
      <div className="container mt-5 mb-5">
        <div className="d-flex">
          <h4>List Product</h4>
          <button onClick={addProduct} className="btn bg-var-dark-gray text-white ms-auto px-4">
            Add
          </button>
        </div> 
        {products?.lenght !== 0 ? (
          <table className="table table-dark table-striped mt-3 ">
            <thead>
              <tr className="text-center">
                <th scope="col">No</th>
                <th scope="col">Photo</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Desc</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => {
                return <ListProductComponent key={index} index={index} id={item.id} title={item.name} desc={item.desc} price={item.price} image={item.image} stock={item.qty} />;
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center mt-5">
            <img src={imgEmpty} style={{ width: "50%" }} alt="empty" />
            <div className="mt-4">No Data Product</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductAdmin;
