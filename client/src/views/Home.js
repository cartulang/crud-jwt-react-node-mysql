import { Link } from "react-router-dom";
import { login } from "../api/userApi";
import { useState } from "react";
import isEmail from "validator/lib/isEmail";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const { isAuth, setIsAuth, setUser } = useAuth();

  const validateInput = () => {
    if (!isEmail(userCredentials.email)) {
      setError("Please enter valid email.");
      return true;
    }

    if (userCredentials.password === "" || userCredentials.password === null) {
      setError("Please enter your password.");
      return true;
    }

    return false;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (validateInput()) return;

    try {
      setError("");
      setIsLoading(true);
      const response = await login(userCredentials);

      if (response.status === 400) {
        setError("Incorrect email or password.");
        setIsLoading(false);
        return;
      }

      if (response.status === 500) {
        setError("Error loggin in.");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setIsAuth(true);
      setUser(response.data);
      history.push("/dashboard");
      history.go(1);
    } catch (error) {
      setError("Error logging in.");
      setIsLoading(false);
    }
  };

  if (isAuth) return <Redirect to="/dashboard" />;

  return (
    <section className="d-flex flex-column align-items-center">
      <h1>Log in</h1>
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form
        className="w-25 my-4"
        style={{ minWidth: "300px" }}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          id="email"
          className="form-control"
          placeholder="Email"
          autoComplete="off"
          onChange={e =>
            setUserCredentials({
              ...userCredentials,
              email: e.target.value,
            })
          }
        />
        <input
          type="password"
          name="password"
          id="password"
          className="form-control my-2"
          placeholder="Password"
          onChange={e =>
            setUserCredentials({
              ...userCredentials,
              password: e.target.value,
            })
          }
        />
        <button
          className={`btn btn-primary w-100 ${isLoading ? "disabled" : ""}`}
        >
          Sign up
        </button>
      </form>
      <div>
        <p>
          Don't have an account? click <Link to="/signup">here</Link> to Sign
          up.
        </p>
      </div>
    </section>
  );
};

export default Home;
