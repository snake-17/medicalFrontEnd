import CalendarCard from "./CalendarCard";
import ScheduleListCard from "./ScheduleListCard";
import { useState, useEffect } from "react";
import type { Schedule } from "./Schedule";

function AvailabilitySection() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailability = async () => {
      try {
        const response = await fetch(
          `${API_URL}/schedule?date=${selectedDate}`,
        );
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error("Error cargando horarios", error);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  const pick = async (scheduleId: number) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ scheduleId }),
      });

      if (response.ok) {
        alert("Cita agendada con éxito");

        setSchedules(schedules.filter((s) => s.id !== scheduleId));
      } else {
        const err = await response.json();
        alert(err.message || "Error al agendar");
      }
    } catch (error) {
      alert("Error de conexión");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <CalendarCard onDateChange={setSelectedDate} />
        <ScheduleListCard
          title={`Disponibles para ${selectedDate}`}
          schedules={schedules}
          renderActions={(item: Schedule) => (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => pick(item.id)}
            >
              Elegir
            </button>
          )}
        />
      </div>
    </div>
  );
}
export default AvailabilitySection;
