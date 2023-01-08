import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const prevClick = () => {
    setPage((prev) => prev - 1);
  };

  const nextClick = () => {
    setPage((prev) => prev + 1);
  };

  //   const pageClick = (index) => {
  //     setPage();
  //   }

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();

    console.log(response);
    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <div className="product__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <h3>{prod.title}</h3>
              </div>
            );
          })}
        </div>
      )}

      <div className="pagination">
        {/* {console.log([...Array(products.length/10)]) }   */}
        {/* if products are 30 -> 30/10 = 3 pages are required. So, array of 3 elements is formed.  */}

        <span
          className={page === 1 ? "inactive" : "active"}
          onClick={prevClick}
        >
          ◀️
        </span>
        {[...Array(products.length / 10)].map((_, index) => {
          return (
            <span
              className={page == index + 1 && "active-page-num"}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </span>
          );
        })}
        <span
          className={page === products.length / 10 ? "inactive" : "active"}
          onClick={nextClick}
        >
          ▶️
        </span>
      </div>
    </div>
  );
};

export default Home;
