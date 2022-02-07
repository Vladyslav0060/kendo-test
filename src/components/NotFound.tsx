import { useLocation, Link } from "react-router-dom";
const NotFound: React.FC = () => {
  const location = useLocation();
  return (
    <div className="wrapper">
      <div className="content">
        <h3>
          Page <code>{location.pathname}</code> not found
        </h3>
        <span>
          Return to{" "}
          <Link to="/" className="link-decorated">
            homepage
          </Link>
        </span>
      </div>
    </div>
  );
};
export default NotFound;
