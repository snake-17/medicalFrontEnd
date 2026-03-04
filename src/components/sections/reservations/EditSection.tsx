import { useState, useEffect } from "react";
import type { Schedule } from "./Schedule";
import ScheduleListCard from "./ScheduleListCard";
import CalendarCard from "./CalendarCard";

function EditSection() {
  const [myAppointments, setMyAppointments] = useState<Schedule[]>([]);
  // Estado para controlar qué cita se está editando
  const [editingAppointmentId, setEditingAppointmentId] = useState<
    number | null
  >(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Estados para la búsqueda de NUEVOS horarios (reutilizados)
  const [availableSchedules, setAvailableSchedules] = useState<Schedule[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  // 1. Efecto para cargar los NUEVOS horarios cuando el usuario elige fecha al editar
  useEffect(() => {
    if (!selectedDate) return;
    const fetchNewSchedules = async () => {
      const response = await fetch(`${API_URL}/schedule?date=${selectedDate}`);
      const data = await response.json();
      setAvailableSchedules(data);
    };
    fetchNewSchedules();
  }, [selectedDate]);

  // 2. Función para GUARDAR los cambios (El PUT/PATCH a tu API)
  const handleUpdate = async (newScheduleId: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${API_URL}/appointments/${editingAppointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ scheduleId: newScheduleId }),
        },
      );

      if (response.ok) {
        const updatedAppointment = await response.json(); // La cita con el nuevo horario

        // Magia de React: Actualizamos solo la cita que cambió
        setMyAppointments(
          myAppointments.map((appointment) =>
            appointment.id === editingAppointmentId
              ? updatedAppointment
              : appointment,
          ),
        );

        alert("Cita reprogramada!");
        setEditingAppointmentId(null); // Esto nos regresa a la lista
      }
    } catch (error) {
      console.error("Error al actualizar", error);
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
          {/* REUTILIZAMOS TUS COMPONENTES */}
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

  // Si no estamos editando, mostramos la lista normal que ya tenías
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
