import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux";
import { reset } from "../redux/cart/cart-slice";
import { userLogout } from "../redux/users/login-slice";

const Header = () => {
  const { userInfo } = useAppSelector((state) => state.login);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(userLogout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        sticky="top"
        bg="white"
        className="shadow px-0 py-3"
      >
        <div className="container-xl">
          {/* Navbar toggle */}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {/* Collapse */}
          <Navbar.Collapse id="responsive-navbar-nav">
            {/* Nav */}

            {/* Right navigation */}

            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <Link
                  className="nav-icon position-relative text-decoration-none"
                  to="/cart"
                >
                  <i className="fa fa-fw fa-cart-arrow-down text-dark me-2 "></i>
                  <span
                    style={{ backgroundColor: "#763f98" }}
                    className="position-absolute top-0 left-100 translate-middle badge rounded-pill  text-white"
                  >
                    {cartItems.length}
                  </span>
                </Link>
              </div>

              <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  style={{ backgroundColor: "#763f98" }}
                  className="btn btn-primary btn-sm text-white p-2 me-3 ms-5 "
                >
                  Login
                </Nav.Link>
              </div>
              <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Nav.Link
                  as={NavLink}
                  to="/detail"
                  style={{ backgroundColor: "#763f98" }}
                  className="btn btn-primary btn-sm text-white p-2 me-3 ms-5 "
                >
                  Detail
                </Nav.Link>
              </div>
              {/* <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Nav.Link
                  as={NavLink}
                  to="/home"
                  style={{ backgroundColor: "#763f98" }}
                  className="btn btn-primary btn-sm text-white p-2 me-3 ms-5 "
                >
                  Products
                </Nav.Link>
              </div> */}
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
