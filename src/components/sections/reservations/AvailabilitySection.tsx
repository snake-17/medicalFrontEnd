import CalendarCard from "./CalendarCard";
import ScheduleListCard from "./ScheduleListCard";
import { useState, useEffect } from "react";
import type { Schedule } from "./Schedule";
const API_URL = import.meta.env.VITE_API_URL;

function AvailabilitySection() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    if (!selectedDate) return;

    const fetchAvailability = async () => {
      try {
        const storedData = localStorage.getItem("token");
        if (!storedData) {
          console.warn("No hay token, asegúrate de haber iniciado sesión.");
          return;
        }

        const parsed = JSON.parse(storedData);
        const token = typeof parsed === "object" ? parsed.token : parsed;

        console.log("Revisar: Fecha enviada al API:", selectedDate);

        const response = await fetch(
          `${API_URL}/api/reservations/schedule?date=${selectedDate}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Error en el servidor: código ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setSchedules(data);
        } else {
          console.error("El API no devolvió una lista, devolvió:", data);
          setSchedules([]);
        }
      } catch (error) {
        console.error("Error cargando horarios:", error);
        setSchedules([]);
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  const pick = async (scheduleId: number) => {
    const storedData = localStorage.getItem("token");
    if (!storedData) {
      alert("No hay sesión activa. Por favor, inicia sesión.");
      return;
    }

    try {
      const parsed = JSON.parse(storedData);
      const token = typeof parsed === "object" ? parsed.token : parsed;

      const response = await fetch(`${API_URL}/api/reservations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ scheduleId }),
      });

      if (response.ok) {
        alert("Cita agendada con éxito");
        setSchedules((prevSchedules) =>
          prevSchedules.filter((s) => s.id !== scheduleId),
        );
      } else {
        const errText = await response.text();
        try {
          const errJson = JSON.parse(errText);
          alert(errJson.message || "Error al agendar");
        } catch {
          alert("Error al agendar: " + errText);
        }
      }
    } catch (error) {
      alert("Error de conexión al intentar agendar.");
      console.error("Error en pick:", error);
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
