import { Link } from "react-router-dom";
type RegisterFormProps = {
  onCancel?: () => void;
};

function RegisterForm({ onCancel }: RegisterFormProps) {
  return (
    <form>
      <h3 className="card-title text-center mb-4">Sign up</h3>
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">
          Full Name
        </label>
        <input type="name" className="form-control" id="exampleInputName" />
      </div>
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

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck2"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          Check me out
        </label>
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Confirm
          </button>
        </div>
      </div>
      <p>
        do you already have an account? <Link to="/login">Sign in</Link>
      </p>
    </form>
  );
}
export default RegisterForm;
