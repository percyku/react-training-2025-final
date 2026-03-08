import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currency } from "../../utils/filter";
import { createAsyncDeleteCart } from "../../slice/cartSlice";
const { VITE_APP_API_BASE, VITE_APP_API_PATH } = import.meta.env;

const Cart = () => {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  const delteCart = (id) => {
    console.log(id);
    dispatch(createAsyncDeleteCart(id));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-md-6 bg-white py-5"
          style={{
            minHeight: "min-height: calc(100vh - 56px - 76px)",
          }}
        >
          <div className="d-flex justify-content-between">
            <h2 className="mt-2">Cart Detail</h2>
          </div>

          {carts.map((cart) => {
            return (
              <div className="d-flex mt-4 bg-light" key={cart.id}>
                <img
                  src={cart.product.imageUrl}
                  alt=""
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                  }}
                />
                <div className="w-100 p-3 position-relative">
                  <a
                    href="#"
                    className="position-absolute"
                    style={{
                      top: "16px",
                      right: "16px",
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </a>
                  <p className="mb-0 fw-bold">{cart.product.title}</p>
                  <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>
                    {cart.product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="input-group w-50 align-items-center">
                      <div className="input-group-prepend pe-1">
                        <a href="#">
                          {" "}
                          <i className="fas fa-minus"></i>
                        </a>
                      </div>
                      <input
                        type="text"
                        className="form-control border-0 text-center my-auto shadow-none bg-light px-0"
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                        value="1"
                      />
                      <div className="input-group-append ps-1">
                        <a href="#">
                          <i className="fas fa-plus"></i>
                        </a>
                      </div>
                    </div>
                    <p className="mb-0 ms-auto">NT {cart.product.price}</p>
                    <button
                      type="button"
                      onClick={() => {
                        delteCart(cart.id);
                      }}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <table className="table mt-4 text-muted">
            <tbody>
              <tr>
                <th scope="row" className="border-0 px-0 font-weight-normal">
                  Lorem ipsum
                </th>
                <td className="text-end border-0 px-0">NT$24,000</td>
              </tr>
              <tr>
                <th
                  scope="row"
                  className="border-0 px-0 pt-0 font-weight-normal"
                >
                  Lorem ipsum
                </th>
                <td className="text-end border-0 px-0 pt-0">NT$500</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">Lorem ipsum</p>
            <p className="mb-0 h4 fw-bold">NT$24,500</p>
          </div>
          <a
            href="./checkout.html"
            className="btn btn-dark btn-block mt-4 rounded-0 py-3"
          >
            Lorem ipsum
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
