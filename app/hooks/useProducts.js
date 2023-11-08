import { useEffect, useState } from "react";
import useApi from "./useApi";

const useProducts = () => {
  const [products, setProducts] = useState([]);

  const { get } = useApi();

  const getAllProducts = () => {
    get("products")
      .then(res => setProducts(res || []))
      // we also cater error here
      .catch(err => setProducts([]))
  }

  const getProductDetail = (id) => {
    return new Promise((resolve, reject) => {
      get(`products/${id}`)
        .then(resolve)
        .catch(reject)
    })
  }

  return {
    products,

    getAllProducts,
    getProductDetail
  }
}

export default useProducts;