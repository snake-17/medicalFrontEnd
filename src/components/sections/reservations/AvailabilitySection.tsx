import CalendarCard from "./CalendarCard";
import ScheduleListCard from "./ScheduleListCard";
import { useState, useEffect } from "react";
import type { Schedule } from "./Schedule";

function AvailabilitySection() {
  const [myAppointments, setMyAppointments] = useState<Schedule[]>([]);

  // 1. Envolvemos la lógica en un useEffect con dependencia vacía
  useEffect(() => {
    // Definimos la función de carga
    const loadAppointments = () => {
      const mockData: Schedule[] = [
        { id: "1", start: "10:00 AM", end: "10:30 AM", available: false },
        { id: "2", start: "11:00 AM", end: "11:30 AM", available: false },
      ];

      // Solo actualizamos el estado si los datos son diferentes o es la primera carga
      setMyAppointments(mockData);
    };

    loadAppointments();
  }, []);
  const pick = (id: string) => {
    console.log("Editando:", id);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <CalendarCard />
        <ScheduleListCard
          title="Disponibles"
          schedules={myAppointments}
          renderActions={(item: Schedule) => (
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => pick(item.id)}
              >
                Elegir
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
export default AvailabilitySection;
