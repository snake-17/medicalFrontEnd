function CalendarCard() {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Selecciona una fecha</h5>
          <input
            type="date"
            className="form-control"
            defaultValue="2026-01-23"
          />
          <p className="form-text mt-2 text-muted">
            Consulta los horarios disponibles para agendar.
          </p>
        </div>
      </div>
    </div>
  );
}
export default CalendarCard;
