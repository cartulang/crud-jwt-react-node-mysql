import { useState } from "react";
import { Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import { signup } from "../api/userApi";
import { Redirect, useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {
  const [userCrendetials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const { isAuth } = useAuth();

  const validateInput = () => {
    if (!isEmail(userCrendetials.email)) {
      setError("Please enter a valid email.");
      return true;
    }

    if (userCrendetials.password === null || userCrendetials.password === "") {
      setError("Please enter your password.");
      return true;
    }

    if (userCrendetials.password.length < 8) {
      setError("Password must be at least 8 characters");
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
      const response = await signup(userCrendetials);
      if (response.status !== 201) {
        setError("Email already exist.");
        setIsLoading(false);
        return;
      }
      alert("Account created!");
      history.push("/");
      history.go(0);
    } catch (error) {
      setError("Something went wrong.");
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  if (isAuth) return <Redirect to="/dashboard" />;

  return (
    <section className="d-flex flex-column align-items-center">
      <h1>Sign up</h1>
      {error && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form
        className="w-25 my-4"
        style={{ minWidth: "300px" }}
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          type="email"
          name="email"
          id="email"
          value={userCrendetials.email}
          className="form-control"
          placeholder="Email"
          onChange={e =>
            setUserCredentials({ ...userCrendetials, email: e.target.value })
          }
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          id="password"
          value={userCrendetials.password}
          className="form-control my-2"
          placeholder="Password"
          onChange={e =>
            setUserCredentials({ ...userCrendetials, password: e.target.value })
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
          Already have an account? click <Link to="/">here</Link> to Log in.
        </p>
      </div>
    </section>
  );
};

export default Signup;
