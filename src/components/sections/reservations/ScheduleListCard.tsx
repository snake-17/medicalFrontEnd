import type { Schedule } from "./Schedule";

interface ScheduleListCardProps {
  title: string;
  schedules: Schedule[];
  renderActions?: (item: Schedule) => React.ReactNode;
}

function ScheduleListCard({
  title,
  schedules,
  renderActions,
}: ScheduleListCardProps) {
  return (
    <div className="col-md-8">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">{title}</h5>
        </div>

        <div className="card-body p-0">
          <div className="list-group list-group-flush">
            {schedules.length === 0 && (
              <div className="list-group-item text-center text-muted p-3">
                No hay horarios disponibles
              </div>
            )}

            {schedules.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center p-3"
              >
                <div>
                  <span
                    className={`badge me-2 ${
                      item.available
                        ? "bg-success-subtle text-success border border-success-subtle"
                        : "bg-secondary-subtle text-secondary border border-secondary-subtle"
                    }`}
                  >
                    {item.available ? "Libre" : "Ocupado"}
                  </span>

                  <strong>
                    {item.start} - {item.end}
                  </strong>
                </div>

                {renderActions && renderActions(item)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleListCard;
