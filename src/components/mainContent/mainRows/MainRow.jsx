import "./MainRow.css";
import { lazy,Suspense } from "react";
// import MianRowHeader from "../mianRowHeader/MainRowHeader";
const MianRowHeader = lazy(() => import("../mianRowHeader/MainRowHeader"));

function MainRow({ children, headerTitle, headerIcon, headerBtnTitle ,mainRowRef,classes,headerBtnLink}) {
  
  return (
    <div className={`main-row-container wide-screen ${classes || ''}`} ref={mainRowRef}>
      <Suspense>
      <MianRowHeader
        headerTitle={headerTitle}
        headerIcon={headerIcon}
        headerBtnTitle={headerBtnTitle}
        headerBtnLink={headerBtnLink}
      />
      </Suspense>
      {children}
    </div>
  );
}
export default MainRow;
