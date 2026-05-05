import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <h1>Page not found</h1>
      <p className="text-muted">
        The page you are looking for does not exist in this newsroom.
      </p>
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
