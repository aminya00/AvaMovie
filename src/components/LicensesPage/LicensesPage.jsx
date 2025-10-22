import "./LicensesPage.css";
import { lazy, Suspense } from "react";
// import NavBar from "../header/navBar/NavBar";
const NavBar = lazy(() => import("../header/navBar/NavBar"));
// import MainFooter from "../footer/mainFooter/MainFooter";
const MainFooter = lazy(() => import("../footer/mainFooter/MainFooter"));
// import MobileFooter from "../footer/mobileFooter/MobileFooter";
const MobileFooter = lazy(() => import("../footer/mobileFooter/MobileFooter"));
// import LicensesComp from "../LicensesComp/LicensesComp";
const LicensesComp = lazy(() => import("../LicensesComp/LicensesComp"));

const LicensesPage = () => {
  return (
    <>
      <Suspense>
        <NavBar />
      </Suspense>
      <div className="license-page-container wide-screen">
        {" "}
        <Suspense>
          <LicensesComp />{" "}
        </Suspense>
      </div>{" "}
      <Suspense>
        <MainFooter />{" "}
      </Suspense>{" "}
      <Suspense>
        <MobileFooter />{" "}
      </Suspense>
    </>
  );
};

export default LicensesPage;
