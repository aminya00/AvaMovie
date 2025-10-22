import { useContext, useEffect, useState ,lazy,Suspense} from "react";
import "./DashboardComp.css";
// import LicenseTimeComp from "./LicenseTimeComp/LicenseTimeComp";
const LicenseTimeComp = lazy(() => import("./LicenseTimeComp/LicenseTimeComp"));
import { TbWorld } from "react-icons/tb";
import { EnToFaNums } from "../../ulits";
import { authContext } from "../../contextApi";
import { miladiTojalaali } from "../../ulits";

const DashboardComp = () => {
  const AuthContext = useContext(authContext);
  const [userIp, setUserIp] = useState(0);
  const [userLastSeen, setUserLastSeen] = useState(0);

  const getIp = async () => {
    await fetch(`https://geolocation-db.com/json/`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => setUserIp(data.IPv4));
  };
  const lastSeenFetch = async (objectId) => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/39C1A466-FFEA-41A0-A67F-E13B50D9F97D/data/avaUsers/${objectId}`
    )
      .then((res) => res.json())
      .then((useInfo) => setUserLastSeen(useInfo.lastSeen));
  };

  useEffect(() => {
    getIp()
    lastSeenFetch(AuthContext.userInfos.objectId)
  }, []);
  return (
    <div className="dashboard-container"><Suspense>
      <LicenseTimeComp buyLicenseTime={AuthContext.userInfos.buyLicenseTime} licenseType={AuthContext.userInfos.hasLicense&&AuthContext.userInfos.licenseType.urlName} hasLicense={AuthContext.userInfos.hasLicense} userObjectID={AuthContext.userInfos.objectId} setUserInfos={AuthContext.setUserInfos}/>
    </Suspense>
      <div className="dashboard-user-info">
        <div className="dashboard-user-info-item">
          آخرین فعالیت شما: {miladiTojalaali(new Date(userLastSeen))}
        </div>
        <div className="dashboard-user-info-item">
          تاریخ عضویت:{" "}
          {miladiTojalaali(new Date(AuthContext.userInfos.created))}
        </div>
        <div className="dashboard-user-info-item">
          آی‌پی شما: {EnToFaNums(userIp)}
          <TbWorld />
        </div>
      </div>
    </div>
  );
};
export default DashboardComp;
