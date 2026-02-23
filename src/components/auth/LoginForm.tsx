import { Link } from "react-router-dom";
type LoginFormProps = {
  onCancel?: () => void;
};
function LoginForm({ onCancel }: LoginFormProps) {
  return (
    <form>
      <h3 className="card-title text-center mb-4">Sign up</h3>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="d-flex justify-content-between mt-4">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Confirm
        </button>
      </div>
      <p>
        don't have an account yet? <Link to="/register">Sign up</Link>
      </p>
    </form>
  );
}
export default LoginForm;
