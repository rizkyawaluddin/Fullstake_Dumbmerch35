import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "../components/navbar/NavbarAdmin";

import { API } from "../config/api";

const AddProductAdmin = () => {
  const navigate = useNavigate();

  const title = "Product Admin";
  document.title = "Dumbmers | " + title;

  const [categories, setCategories] = useState([]); // Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); // For image preview
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  }); // store product data

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem !== id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(form);

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as Object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      console.log(formData.data)

      // Insert Product Data
      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/product-admin");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <NavbarAdmin />
      <div className="container">
        <form onSubmit={handleSubmit} className="mt-3">
          <h5 className="text-start mb-4">Add Product</h5>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                  marginBlock: "1rem",
                }}
                alt={preview}
              />
            </div>
          )}

          <div class="mb-3">
            <input id="upload" type="file" name="image" onChange={handleChange} hidden required />
            <label htmlFor="upload" className="btn bg-var-red text-white">
              Upload Image
            </label>
          </div>
          <div className="input-group mb-3">
            <input type="text" placeholder="Nama Product" name="name" onChange={handleChange} className="form-control bg-var-dark text-white border-form" />
          </div>
          <div className="input-group mb-3">
            <textarea className="form-control bg-var-dark text-white border-form" placeholder="Description" name="desc" onChange={handleChange} rows="5"></textarea>
          </div>

          <div className="input-group mb-3">
            <input type="number" placeholder="Price" name="price" onChange={handleChange} className="form-control bg-var-dark text-white border-form" />
          </div>
          <div className="input-group mb-3">
            <input type="number" placeholder="Stock" name="qty" onChange={handleChange} className="form-control bg-var-dark text-white border-form" />
          </div>

          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-secondary mb-1" style={{ fontSize: "15px" }}>
              Category
            </div>
            {categories.map((item, index) => (
              <label className="checkbox-inline me-4" key={index}>
                <input type="checkbox" value={item.id} onClick={handleChangeCategoryId} /> {item.name}
              </label>
            ))}
          </div>

          <button type="submit" className="btn bg-var-green text-white fw-bold container mt-3">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProductAdmin;
