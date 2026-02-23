import { useNavigate } from "react-router-dom";
import AuthCard from "../auth/AuthCard";
import LoginForm from "../auth/LoginForm";
function Login() {
  const navigate = useNavigate();

  return (
    <AuthCard>
      <LoginForm onCancel={() => navigate("/")} />
    </AuthCard>
  );
}

export default Login;
