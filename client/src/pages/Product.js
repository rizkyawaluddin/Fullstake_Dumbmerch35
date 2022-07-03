import { React, useState, useEffect } from "react";
import imgEmpty from "../assets/static/media/empty.svg";
import ProductCard from "../components/card/ProductCard";
import Navbar from "../components/navbar/Navbar";

// useQuery dan api
// import { useQuery } from "react-query";
import { API } from "../config/api";

const Product = () => {
  const title = "Shop";
  document.title = "Dumbmers | " + title;

  // const [selectCategory, setSelectCategory] = useState()
  // const [showProduct,setShowProducts] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get("/products");
      setProducts(response.data.data);
    };
    fetchData();
  }, []);

  // console.log(products)
  // // source:  https://stackoverflow.com/questions/70265468/best-way-to-group-an-array-with-property-of-object-and-how-to-render-the-result
  // const categoryProducts = products.reduce((acc, product) => {
  //   const categoryIndex = acc.findIndex((item) => item.name == product.categories);
  //   if (categoryIndex > -1) {
  //     acc[categoryIndex].products.push(product);
  //   } else {
  //     acc.push({ name: product.category, products: [product] });
  //   }
  //   return acc;
  // }, []);

  // useEffect(() => {
  //   if (selectCategory) {
  //     const filterProduct = products.filter((data) => data.category === selectCategory);
  //     setShowProducts(filterProduct);
  //   } else {
  //     setShowProducts(products);
  //   }
  // }, [selectCategory, products]);

  const changeCategory = (e) => {
    const value = e.target.value;
    // setSelectCategory(value);
    console.log(value);
  };

  return (
    <>
      <Navbar />
      <div className="container mb-lg-0 mb-5">
        <div className="d-flex align-items-center">
          <p className="text-var-red fw-bold mt-4 fs-4">Product</p>
          {/* <Form.Select onChange={changeCategory} value={selectCategory} aria-label="Select" className="form-select-category bg-var-dark-gray text-white ms-auto">
            <option value="">All</option>
            {categoryProducts.map((data, index) => {
              return (
                <option key={index} value={data.name}>
                  {data.name}
                </option>
              );
            })}
          </Form.Select> */}
        </div>

        {products?.length !== 0 ? (
          <div className="products d-flex flex-wrap gap-3 mt-4 justify-content-md-start justify-content-center">
            {products?.map((item, index) => (
              <ProductCard key={index} id={item.id} title={item.name} desc={item.desc} price={item.price} image={item.image} stock={item.qty} />
            ))}
          </div>
        ) : (
          <div className="text-center ">
            <img src={imgEmpty} style={{ width: "40%" }} alt="empty"/>
            <div className="mt-4">No Data Product</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
