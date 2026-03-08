import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createAsyncGetCart } from "../slice/cartSlice";

const Header = () => {
  const carts = useSelector((state) => state.cart.carts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createAsyncGetCart());
  }, [dispatch]);

  const handleActvie = ({ isActive }) => {
    return isActive ? "nav-link ps-0 active-link" : "nav-link ps-0";
  };

  const handleIconActvie = ({ isActive }) => {
    return isActive ? "nav-link ps-0 active-link" : "nav-link ps-0";
  };
  return (
    <div className="bg-white sticky-top">
      <div className="container">
        <nav className="navbar px-0 navbar-expand-lg navbar-light bg-white">
          <NavLink
            className="navbar-brand position-absolute"
            href="./index.html"
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
          >
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse bg-white custom-header-md-open"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className={handleActvie} to="/product">
                  產品列表
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={handleActvie} to="product/id">
                  精選推薦
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="d-flex">
            {/* <a href="#">
              <i className="bi bi-heart-fill me-5"></i>
            </a> */}
            <NavLink to="cart" className=" position-relative">
              <i className="bi bi-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {carts.length}
              </span>
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
