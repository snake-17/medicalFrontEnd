type ActionCardProps = {
  title: string;
  description: string;
  buttonText: string;
};

function ActionCard({ title, description, buttonText }: ActionCardProps) {
  return (
    <div className="card shadow">
      <div className="card-body text-center">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-primary">{buttonText}</button>
      </div>
    </div>
  );
}

export default ActionCard;
