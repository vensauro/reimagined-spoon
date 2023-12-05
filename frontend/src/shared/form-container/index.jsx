import "./styles.css";

export function FormContainer({ title, children }) {
  return (
    <div className="form-main-container ">
      <section className="form-section-container">
        <div className="form-container-title">
          <p>{title}</p>
          <div className="form-container-line" />
        </div>
        {children}
      </section>
    </div>
  );
}
