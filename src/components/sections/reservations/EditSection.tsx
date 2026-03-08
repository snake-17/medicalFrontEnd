import { useState, useEffect } from "react";
import type { Schedule } from "./Schedule";
import ScheduleListCard from "./ScheduleListCard";
import CalendarCard from "./CalendarCard";

const API_URL = import.meta.env.VITE_API_URL;

function EditSection() {
  const [myAppointments, setMyAppointments] = useState<Schedule[]>([]);
  const [editingAppointmentId, setEditingAppointmentId] = useState<
    number | null
  >(null);
  const [availableSchedules, setAvailableSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Reutilizamos nuestra función a prueba de balas para el token
  const getCleanToken = () => {
    const storedData = localStorage.getItem("token");
    if (!storedData) return null;
    try {
      const parsed = JSON.parse(storedData);
      if (parsed && typeof parsed === "object") {
        return parsed.token || null;
      }
      return parsed;
    } catch {
      return storedData;
    }
  };

  // 1. EL EFECTO FALTANTE: Cargar "Mis Citas" al abrir la sección
  useEffect(() => {
    const fetchMyAppointments = async () => {
      const token = getCleanToken();
      if (!token) return;

      try {
        // OJO: Asegúrate de que esta URL es la correcta en tu API para ver las citas del usuario
        const response = await fetch(
          `${API_URL}/api/reservations/appointments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setMyAppointments(data);
        } else {
          console.error("Error al traer citas:", response.status);
        }
      } catch (error) {
        console.error("Error de red cargando mis citas:", error);
      }
    };

    fetchMyAppointments();
  }, []); // El array vacío asegura que solo se ejecute al entrar a la sección

  // 2. Efecto para cargar los NUEVOS horarios cuando el usuario elige fecha al editar
  useEffect(() => {
    if (!selectedDate) return;

    const fetchNewSchedules = async () => {
      const token = getCleanToken();
      if (!token) return;

      try {
        // CORREGIDO: URL completa y headers de ngrok/token
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

        if (response.ok) {
          const data = await response.json();
          setAvailableSchedules(data);
        }
      } catch (error) {
        console.error("Error cargando nuevos horarios:", error);
      }
    };

    fetchNewSchedules();
  }, [selectedDate]);

  // 3. Función para GUARDAR los cambios (PUT/PATCH)
  const handleUpdate = async (newScheduleId: number) => {
    const token = getCleanToken();
    if (!token) return;

    try {
      // CORREGIDO: URL completa y headers de ngrok
      const response = await fetch(
        `${API_URL}/api/reservations/appointments/${editingAppointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ scheduleId: newScheduleId }),
        },
      );

      if (response.ok) {
        const updatedAppointment = await response.json();

        // Actualizamos la lista local
        setMyAppointments(
          myAppointments.map((appointment) =>
            appointment.id === editingAppointmentId
              ? updatedAppointment
              : appointment,
          ),
        );

        alert("¡Cita reprogramada!");
        setEditingAppointmentId(null);
      } else {
        const errorData = await response.text();
        alert("Error al reprogramar: " + errorData);
      }
    } catch (error) {
      console.error("Error al actualizar", error);
      alert("Error de conexión al actualizar");
    }
  };

  // RENDERIZADO CONDICIONAL
  if (editingAppointmentId) {
    return (
      <div className="container mt-4">
        <h3>Reprogramar Cita #{editingAppointmentId}</h3>
        <button
          className="btn btn-link mb-3"
          onClick={() => setEditingAppointmentId(null)}
        >
          ← Volver atrás
        </button>

        <div className="row">
          <CalendarCard onDateChange={setSelectedDate} />
          <ScheduleListCard
            title="Selecciona el nuevo horario"
            schedules={availableSchedules}
            renderActions={(item) => (
              <button
                className="btn btn-success btn-sm"
                onClick={() => handleUpdate(item.id)}
              >
                Confirmar Cambio
              </button>
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <ScheduleListCard
        title="Mis Citas"
        schedules={myAppointments}
        renderActions={(item) => (
          <button
            className="btn btn-warning btn-sm"
            onClick={() => setEditingAppointmentId(item.id)}
          >
            Editar
          </button>
        )}
      />
    </div>
  );
}

export default EditSection;
