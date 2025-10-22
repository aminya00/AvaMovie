import "./MobileFooterMenu.css";

function MobileFooterMenu({ icon, title, dispatchFunc, dispatchData }) {
  return (
    <div
      className="mobile-footer-menu"
      onMouseEnter={(e) => {
        dispatchFunc({ ...dispatchData, isHover: true });
      }}
      onMouseLeave={(e) => {
        dispatchFunc({ ...dispatchData, isHover: false });
      }}
    >
      {icon}
      <span className="mobile-footer-title">{title}</span>
    </div>
  );
}

export default MobileFooterMenu;
