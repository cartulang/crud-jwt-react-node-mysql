import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./views/Signup";
import Home from "./views/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isAuth } = useAuth();
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Signup} path="/signup" />
          <ProtectedRoute component={Dashboard} path="/dashboard" />
          <Route component={NotFound} path="*" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
