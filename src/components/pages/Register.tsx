import { useNavigate } from "react-router-dom";
import AuthCard from "../auth/AuthCard";
import RegisterForm from "../auth/RegisterForm";
function Register() {
  const navigate = useNavigate();
  return (
    <AuthCard>
      <RegisterForm onCancel={() => navigate("/")} />
    </AuthCard>
  );
}

export default Register;
