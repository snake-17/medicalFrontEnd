import { useState, useEffect } from "react";
import type { Schedule } from "./Schedule";
import ScheduleListCard from "./ScheduleListCard";

function EditSection() {
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
  }, []); // <--- El array vacío es VITAL para que solo corra UNA vez

  const handleEdit = (id: string) => {
    console.log("Editando:", id);
  };

  const handleDelete = (id: string) => {
    // Para evitar problemas de renderizado, usamos la versión funcional de setState
    setMyAppointments((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <div className="container mt-4">
      {/* Si myAppointments está vacío, podrías mostrar un spinner o mensaje */}
      {myAppointments.length === 0 ? (
        <div className="text-center">Cargando citas...</div>
      ) : (
        <ScheduleListCard
          title="Mis Citas"
          schedules={myAppointments}
          renderActions={(item: Schedule) => (
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handleEdit(item.id)}
              >
                Editar
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(item.id)}
              >
                Eliminar
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
}

export default EditSection;
