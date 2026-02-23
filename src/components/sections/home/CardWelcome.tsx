import ActionCard from "./ActionCard";
import { useNavigate } from "react-router-dom";
function CardWelcome() {
  const navigate = useNavigate();
  return (
    <ActionCard
      title="Welcome Alexis"
      description="Ready to schedule your next session?"
      buttonText="sign in"
      sizeClass="display-3"
      onAction={() => navigate("/login")}
    />
  );
}

export default CardWelcome;
