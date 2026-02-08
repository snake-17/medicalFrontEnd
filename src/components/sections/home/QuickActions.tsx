import ActionCard from "./ActionCard";
function QuickActions() {
  return (
    <div className="container d-flex justify-content-center">
      <ActionCard
        title="take an appointment Alexis"
        description="s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        buttonText="Take an appointment"
        sizeClass="display-6"
      />
      <ActionCard
        title="Your account Alexis"
        description="s simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        buttonText="settings"
        sizeClass="display-6"
      />
    </div>
  );
}
export default QuickActions;
