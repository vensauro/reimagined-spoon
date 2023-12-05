import "./styles.css";
export function Input({ label, ...rest }) {
  return (
    <div className="input-container">
      <p>{label}</p>
      <input {...rest} />
    </div>
  );
}
