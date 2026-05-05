function ErrorMessage({ message }) {
  return (
    <div className="alert alert-danger error-box" role="alert">
      <h2 className="h5">Something went wrong</h2>
      <p className="mb-0">{message}</p>
    </div>
  );
}

export default ErrorMessage;
