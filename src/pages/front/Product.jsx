import img_1 from "../../assets/images/index/map-1.png";

import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncAddCart } from "../../slice/cartSlice";
import {
  createAsyncGetAllProducts,
  createAsyncGetProducts,
} from "../../slice/productSlice";
import Pagination from "../../components/Pagination";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isCartLoading = useSelector((state) => state.cart.isLoading);
  const isProductLoading = useSelector((state) => state.product.isLoading);
  const products = useSelector((state) => state.product.products);
  const pagination = useSelector((state) => state.product.pagination);
  const categories = useSelector((state) => state.product.categories);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    dispatch(createAsyncGetAllProducts());
    dispatch(
      createAsyncGetProducts({
        page: 1,
        category: currentCategory,
      }),
    );
  }, [currentCategory]);

  const handleAddCart = (id, qty = 1) => {
    dispatch(createAsyncAddCart({ id, qty }));
  };

  const changePage = useCallback((e, page) => {
    e.preventDefault();

    dispatch(
      createAsyncGetProducts({
        page: page,
        category: currentCategory,
      }),
    );
  }, []);

  const getMoreInfo = async (id) => {
    navigate(`/product/${id}`);
  };

  // const getAllProducts = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products/all`,
  //     );

  //     // console.log(res.data);

  //     const result = [
  //       "all",
  //       ...new Set(res.data.products.map((item) => item.category)),
  //     ];
  //     setCategories(result);
  //   } catch (error) {
  //   } finally {
  //   }
  // };

  // const getProudcts = async (page = 1, category) => {
  //   try {
  //     const res = await axios.get(
  //       `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products`,
  //       {
  //         params: {
  //           page,
  //           category: category === "all" ? null : category,
  //         },
  //       },
  //     );
  //     // console.log(res.data);
  //     setProducts(res.data.products);
  //     setPagiantion(res.data.pagination);
  //   } catch (error) {
  //   } finally {
  //   }
  // };
  return (
    <>
      <div className="margin-top travel-bg ">
        <section className="index-inspire ">
          <div className="container py-10 py-lg-11">
            <div className="row justify-content-between align-items-center">
              <div className="col-12 col-lg-5">
                <h3 className="text-primary mb-7 text-start">
                  今年旅行的 <br />
                  靈感地圖
                </h3>

                <div className="d-flex overflow-x-auto mb-7">
                  {categories.map((category) => {
                    return (
                      <button
                        key={category}
                        type="button"
                        className={`rounded rounded-3 py-2 px-5  me-2 flex-shrink-0 ${category === currentCategory ? "btn btn-primary" : "btn btn-light"}`}
                        // className="btn btn-primary rounded rounded-3 py-2 px-5 flex-shrink-0"
                        disabled={isCartLoading || isProductLoading}
                        onClick={() => {
                          setCurrentCategory(category);
                        }}
                      >
                        {category === "all" ? "全部" : category}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="col-12 col-lg-5 d-flex justify-content-lg-end">
                <div>
                  <p className="text-primary">
                    來自旅人搜尋、收藏與討論最多的目的地排行榜， <br />
                    一場風格與故事感兼具的靈感旅行，就從這裡開始。
                  </p>
                </div>
              </div>
            </div>

            <div className="row pt-11">
              {/* <div className="col-md-6 mb-7">
                <div className="card bg-white rounded-5 p-7 flex-shrink-0 position-relative ">
                  <button
                    type="button"
                    className="btn border-0  position-absolute top-10 start-90 translate-middle-y z-1"
                  >
                    <span className="material-icons-outlined align-bottom">
                      shopping_cart
                    </span>
                  </button>

                  <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-lg-5 mb-2 mb-lg-0">
                      <img
                        src={img_1}
                        className="w-100 object-fit-cover rounded-4 d-block border"
                        alt="map-1"
                      />
                    </div>
                    <div className="col-12 col-lg-7">
                      <div className="d-lg-flex flex-lg-wrap h-100 text-primary">
                        <div className="mb-2 d-block">
                          <button
                            type="button"
                            className="btn btn-primary-10 rounded rounded-3 py-2 px-5 flex-shrink-0"
                          >
                            亞洲
                          </button>
                        </div>

                        <h2 className="text-start">走進四季交織的文化時</h2>
                        <p className="text-start mb-7 line-clamp-2">
                          穿過紅葉與古寺的交錯，感受從櫻花盛開到秋楓染紅的日式浪漫。
                        </p>

                        <div className="mb-2 d-lg-flex align-items-lg-center justify-content-center mb-7">
                          <button
                            type="button"
                            className="btn btn-primary-10 rounded rounded-3 py-2 px-5 flex-shrink-0 me-4"
                          >
                            建議
                          </button>
                          <p className="text-start line-clamp-2">
                            賞楓最佳時間是 11 月中旬，推薦清水寺和南禪寺一帶 🍁
                          </p>
                        </div>
                        <a
                          href="#"
                          className="btn btn-primary-120 w-100 rounded-pill d-flex justify-content-between align-items-center py-5"
                        >
                          立即探索
                          <span className="material-icons-outlined rounded-circle bg-white text-primary p-1 align-bottom ms-2">
                            arrow_forward
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {products.map((product) => {
                return (
                  <div className="col-md-6 mb-7" key={product.id}>
                    <div className="card bg-white rounded-5 p-7 flex-shrink-0 position-relative ">
                      <button
                        type="button"
                        className="btn border-0 d-none d-lg-block position-absolute top-10 start-90 translate-middle-y z-1"
                        disabled={isCartLoading || isProductLoading}
                        onClick={() => handleAddCart(product.id)}
                      >
                        <span className="material-icons-outlined align-bottom">
                          shopping_cart
                        </span>
                      </button>

                      <button
                        type="button"
                        className="btn border-0  d-lg-none position-absolute top-10 start-80 translate-middle-y z-1"
                        disabled={isCartLoading || isProductLoading}
                        onClick={() => handleAddCart(product.id)}
                      >
                        <span className="material-icons-outlined align-bottom">
                          shopping_cart
                        </span>
                      </button>

                      <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-lg-5 mb-2 mb-lg-0">
                          <img
                            src={product.imageUrl}
                            className="w-100 object-fit-cover rounded-4 d-block border"
                            alt="map-1"
                          />
                        </div>
                        <div className="col-12 col-lg-7">
                          <div className="d-lg-flex flex-lg-column justify-content-lg-start h-100 text-primary">
                            <div className="mb-2 text-start">
                              <button
                                type="button"
                                className="btn btn-primary-10 rounded rounded-3 py-2 px-5 flex-shrink-0"
                              >
                                {product.category}
                              </button>
                            </div>

                            <h2 className="text-start"> {product.title}</h2>

                            <p className="text-start mb-7 line-clamp-2">
                              {product.description}
                              {product.description}
                              {product.description}
                            </p>

                            <div className="mb-2 d-lg-flex  justify-content-center  align-items-lg-center justify-content-lg-start mb-7">
                              <button
                                type="button"
                                className="btn btn-primary-10 rounded rounded-3 py-2 px-5 flex-shrink-0 me-4 "
                              >
                                建議
                              </button>
                              <p className="text-start line-clamp-2">
                                {product.content}
                                {product.content}
                                {product.content}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary-120 w-100 rounded-pill d-flex justify-content-between align-items-center py-5"
                              disabled={isCartLoading || isProductLoading}
                              onClick={() => getMoreInfo(product.id)}
                            >
                              立即探索
                              <span className="material-icons-outlined rounded-circle bg-white text-primary p-1 align-bottom ms-2">
                                arrow_forward
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <div className="d-flex justify-content-center">
          <Pagination
            pagination={pagination}
            changePage={changePage}
            loadingProductId={null}
          />
        </div>
      </div>
    </>
  );
};

export default Product;
