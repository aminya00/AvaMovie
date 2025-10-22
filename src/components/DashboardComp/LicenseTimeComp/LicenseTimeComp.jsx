import { useEffect, useState } from "react";
import "./LicenseTimeComp.css";
import jalaali from "jalaali-js";
import Countdown from "react-countdown";
import { EnToFaNums } from "../../../ulits";
import { Gauge, gaugeClasses, useGaugeState } from "@mui/x-charts/Gauge";
import { VscTriangleDown } from "react-icons/vsc";
import { miladiTojalaali } from "../../../ulits";
import { useNavigate } from "react-router-dom";

function GaugePointer() {
  const { valueAngle, outerRadius, innerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + ((outerRadius + innerRadius) / 2) * Math.sin(valueAngle),
    y: cy - ((outerRadius + innerRadius) / 2) * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle
        className="gauge-circle-pointer"
        cx={target.x}
        cy={target.y}
        r={15}
      />
      <circle
        className="gauge-circle-dash"
        cx={cx}
        cy={cy + 7}
        r={92}
        fill="red"
      />
    </g>
  );
}

const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <span className="license-counter-container">
      <span className="license-counter-number">
        {days < 10 ? "۰" : days < 10 ? "۰" : null}
        {EnToFaNums(days)}
        <span className="license-counter-lable">روز</span>
      </span>
      :
      <span className="license-counter-number">
        {hours < 10 && "۰"}
        {EnToFaNums(hours)}
        <span className="license-counter-lable">ساعت</span>
      </span>
      :
      <span className="license-counter-number">
        {minutes < 10 && "۰"}
        {EnToFaNums(minutes)}
        <span className="license-counter-lable">دقیقه</span>
      </span>
      :
      <span className="license-counter-number">
        {seconds < 10 && "۰"}
        {EnToFaNums(seconds)}
        <span className="license-counter-lable">ثانیه</span>
      </span>
    </span>
  );
};

const LicenseTimeComp = ({
  buyLicenseTime,
  licenseType,
  hasLicense,
  userObjectID,
  setUserInfos,
}) => {
  const navigate = useNavigate();
  const time = new Date();
  const [timeRemain, setTimeRemain] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [timePassed, setTimePassed] = useState(0);

  const expiredLicenseFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/39C1A466-FFEA-41A0-A67F-E13B50D9F97D/data/avaUsers/${userObjectID}?loadRelations=licenseType%2Cwatchlist`,
      {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          hasLicense: false,
          buyLicenseTime: 0,
          licenseType: null,
          objectId: userObjectID,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserInfos(data);
        setTimeRemain(0);
        setEndDate(0);
        setTimePassed(0);
      });
  };

  const licenseEndTimeClac = (buyLicenseTime, licenseType) => {
    const licenseTimeDate = new Date(buyLicenseTime);
    let endDateTemp = null;
    let timePassedTemp = time.getTime() - buyLicenseTime;

    switch (licenseType) {
      case "oneYear":
        endDateTemp = licenseTimeDate.setFullYear(
          licenseTimeDate.getFullYear() + 1
        );
        break;
      case "sixMonth":
        endDateTemp = licenseTimeDate.setMonth(licenseTimeDate.getMonth() + 6);
        break;
      case "threeMonth":
        endDateTemp = licenseTimeDate.setMonth(licenseTimeDate.getMonth() + 3);
        break;
      case "oneMonth":
        endDateTemp = licenseTimeDate.setMonth(licenseTimeDate.getMonth() + 1);
        break;
    }
    if (endDateTemp > time.getTime()) {
      setTimeRemain(endDateTemp - time.getTime());
      setEndDate(miladiTojalaali(new Date(endDateTemp)));
      setTimePassed(
        Math.floor((timePassedTemp / (endDateTemp - buyLicenseTime)) * 100)
      );
    } else {
      expiredLicenseFetch();
    }
  };

  useEffect(() => {
    hasLicense && licenseEndTimeClac(buyLicenseTime, licenseType);
  }, []);

  return (
    <div className="license-status-container">
      <Gauge
        cornerRadius="50%"
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            transform: "translate(0px, -15px)",
          },
        }}
        width={275}
        height={165}
        value={timePassed}
        startAngle={-90}
        endAngle={90}
        innerRadius="88%"
        outerRadius="100%"
        text={({ value }) => `%${EnToFaNums(value)}`}
      >
        <GaugePointer />
      </Gauge>
      <div className="license-status-info">
        <div
          className={`license-status-has-license ${hasLicense ? "active" : ""}`}
        >
          {hasLicense ? "فعال" : "غیرفعال"}
          <VscTriangleDown />
        </div>
        <span>اشتراک شما</span>
        {hasLicense && (
          <div className="license-status-end-time">تاریخ انقضا: {endDate}</div>
        )}
      </div>
      {Boolean(timeRemain) && (
        <Countdown
          onComplete={() => {
            expiredLicenseFetch();
          }}
          date={time.getTime() + timeRemain}
          renderer={renderer}
        />
      )}
    </div>
  );
};
export default LicenseTimeComp;
