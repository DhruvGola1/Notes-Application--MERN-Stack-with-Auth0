import { Link } from "react-router-dom";
import "../styles/Auth.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>Oops! That page doesn't exist.</p>
      <Link to="/">Go to Login</Link>
    </div>
  );
};

export default NotFound;
