function CardWelcome() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-5">
        <div className="card shadow" style={{ width: "18rem" }}>
          <div className="card-body text-center">
            <h5 className="card-title">Welcome @user</h5>
            <p className="card-text">Ready to schedule your next session?</p>
            <button type="button" className="btn btn-primary">
              Primary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardWelcome;
