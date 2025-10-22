import "./HeaderBtn.css";

function HeaderBtn({ btnValue, addClassBtn }) {
  return (
    <div className={`header-btn-Container ${addClassBtn}`}>{btnValue}</div>
  );
}
export default HeaderBtn;
