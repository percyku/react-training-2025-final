import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Modal } from "bootstrap";
import Loading from "../../components/Loading";
import PicModal from "../../components/PicModal";

const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

const Product = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("all");

  const modalRefPic = useRef(null);
  const myModalPic = useRef(null);
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm90JTIwZm91bmR8ZW58MHx8MHx8fDA%3D",
  );

  const getMoreInfo = async (id) => {
    navigate(`/product/${id}`);
    // try {
    //   setIsLoading(true);
    //   const res = await axios.get(
    //     `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/product/${id}`,
    //   );
    //   navigate(`/product/${id}`, { state: { productData: res.data } });
    // } catch (error) {
    //   toast.error(`取得產品資料失敗 ${error}`);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products/all`,
        );

        const result = [
          "all",
          ...new Set(res.data.products.map((item) => item.category)),
        ];
        setCategories(result);
      } catch (error) {
        toast.error(`取得產品資料失敗 ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    getAllProducts();

    const getProudcts = async (page = 1, category) => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products`,
          {
            params: {
              page,
              category: category === "all" ? null : category,
            },
          },
        );
        setProducts(res.data.products);
      } catch (error) {
        toast.error(`取得產品資料失敗 ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    getProudcts(1, currentCategory);

    (async () => {
      // try {
      //   setIsLoading(true);
      //   const res = await axios.get(
      //     `${VITE_APP_API_BASE}/api/${VITE_APP_API_PATH}/products`,
      //   );
      //   setProducts(res.data.products);
      // } catch (error) {
      //   toast.error(`取得產品資料失敗 ${error}`);
      // } finally {
      //   setIsLoading(false);
      // }
    })();
    myModalPic.current = new Modal(modalRefPic.current);
  }, [currentCategory]);

  const getSinglePic = (url) => {
    setPhotoUrl(url);
    if (photoUrl !== "") {
      myModalPic.current.show();
    }
  };

  return (
    <div className="margin-top cart-bg ">
      <Toaster />
      <Loading isLoading={isLoading} />
      <PicModal modalRef={modalRefPic} photoUrl={photoUrl} />
      {/* <div className="row">
        {products?.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.title}
                onClick={() => getSinglePic(product.imageUrl)}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>
                    <del>價格:{product.origin_price} </del>元
                  </strong>
                </p>
                <p className="h4 card-text">
                  <strong>價格:</strong> {product.price} 元
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => getMoreInfo(product.id)}
                >
                  查看更多
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <nav className="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
        <div className="navbar-nav flex-row overflow-auto navbar-custom-scroll">
          {categories.map((category) => (
            <a
              key={category}
              className={`nav-item nav-link text-nowrap px-2 ${category === currentCategory && "active"}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentCategory(category);
              }}
            >
              {category}
              {category === currentCategory && (
                <span className="sr-only"></span>
              )}
            </a>
          ))}
        </div>
      </nav>
      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {/* 產品列表 */}
          {products.map((product) => {
            return (
              <div className="col-md-3" key={product.id}>
                <div className="card border-0 mb-4 position-relative position-relative">
                  <img
                    src={product.imageUrl}
                    className="card-img-top rounded-0"
                    alt="..."
                  />
                  <a href="#" className="text-dark">
                    <i
                      className="far fa-heart position-absolute"
                      style={{ right: "16px", top: "16px" }}
                    ></i>
                  </a>
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-3">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          getMoreInfo(product.id);
                        }}
                      >
                        {product.title}
                      </a>
                    </h4>
                    <p className="card-text text-muted mb-0">
                      {product.description}
                    </p>
                    <p className="text-muted mt-3">NT$ {product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Product;
