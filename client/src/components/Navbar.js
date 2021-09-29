import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, isAuth, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid w-75">
        <Link className="navbar-brand" to="/">
          Todo App
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              {isAuth ? (
                <span className="nav-link">{user.email}</span>
              ) : (
                <Link className="nav-link" to="/">
                  Log in
                </Link>
              )}
            </li>
            <li className="nav-item">
              {isAuth ? (
                <button className="btn btn-danger" onClick={logout}>
                  Log out
                </button>
              ) : (
                <Link className="nav-link" to="/signup">
                  Sign up
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
