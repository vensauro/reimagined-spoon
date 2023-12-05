import "./styles.css";

export function PageTitle(props) {
  return (
    <div className="page-title-root">
      <div className="page-title-line"></div>
      <p className="page-title-text">{props.children}</p>
      <div className="page-title-line"></div>
    </div>
  );
}
