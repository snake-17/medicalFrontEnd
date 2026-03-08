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
        // 1. Sacamos el token igual que en la función pick
        const storedData = localStorage.getItem("token");
        if (!storedData) {
          console.warn("No hay token, no se pueden pedir los horarios.");
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
              Authorization: `Bearer ${token}`, // Enviamos el pasaporte
              "ngrok-skip-browser-warning": "true", // El truco mágico para saltar la alerta de ngrok
            },
          },
        );

        if (!response.ok) {
          // Si el backend da error (ej. 401 o 403), lo atrapamos antes de hacer .json()
          throw new Error(`Error en el servidor: código ${response.status}`);
        }

        // Aquí ya estamos seguros de que pasamos ngrok y el backend nos aceptó
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
        },
        body: JSON.stringify({ scheduleId }),
      });

      if (response.ok) {
        alert("Cita agendada con éxito");
        setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
      } else {
        const err = await response.json();
        alert(err.message || "Error al agendar");
      }
    } catch (error) {
      alert("Error en la operación");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <CalendarCard onDateChange={setSelectedDate} />

        <ScheduleListCard
          title={`Disponibles para ${selectedDate || "seleccionar fecha"}`}
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
