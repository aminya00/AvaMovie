import "./LicensesComp.css";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { FaCar } from "react-icons/fa6";
import { MdOutlineDirectionsBoat } from "react-icons/md";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { EnToFaNums } from "../../ulits";

const LicensesComp = () => {
  const [licensesState, setLicensesState] = useState([]);
  const licensesIcons = [
    <FaMotorcycle />,
    <FaCar />,
    <MdOutlineDirectionsBoat />,
    <HiOutlineRocketLaunch />,
  ];

  const licensesFetch = async () => {
    await fetch(
      `https://api.backendless.com/109E00A4-6C60-46C2-B765-D3E4EC4C8CC4/39C1A466-FFEA-41A0-A67F-E13B50D9F97D/data/licenses`
    )
      .then((res) => res.json())
      .then((licenses) => setLicensesState(licenses.toSorted((a,b)=>a.id-b.id)));
  };
  const offPriceCalc=(realPrice,offPercent)=>{
   let offPrice=realPrice*(100-offPercent)/100
   return Math.floor(offPrice/1000)*1000
  }

  useEffect(() => {
    licensesFetch();
  }, []);
  return (
    <>
      {Boolean(licensesState.length) && (
        <div className="user-panel-buy-license-container">
          <div className="user-panel-buy-license-title">
            تعرفه‌های حساب کاربری ویژه
            <span>
              (با تهیه اشتراک ویژه از تمامی امکانات وبسایت بهره ببرید)
            </span>
          </div>
          <div className="user-panel-buy-license-flag">
            اشتراک شش ماهه ۵ درصد و یکساله ۱۵ درصد تخفیف دارد
          </div>
          <div className="user-panel-buy-license-boxes-container ">
            {licensesState.map((license,index) => (
              <div className="user-panel-buy-license-box" key={license.id}>
                <div className="user-panel-buy-license-box-content">
                  {licensesIcons[index]}
                  <span className="user-panel-buy-license-box-content-title">
                   {license.title}
                  </span>
                  <div className="user-panel-buy-license-box-price">
                    {
                        <span className="user-panel-buy-license-box-off-price">
                            {

                        Boolean(license.offPercent)?
                        <>
                      {EnToFaNums(license.price.toLocaleString())}{" "}
                      <span className="user-panel-box-toman-sign">تومان</span>
                        </>
                        :
                        <div className="empty-box"></div>
                            }
                    </span>
                    }
                    <span className="user-panel-buy-license-box-real-price">
                    {Boolean(license.offPercent)?EnToFaNums(offPriceCalc(license.price,license.offPercent).toLocaleString()):EnToFaNums(license.price.toLocaleString())}{" "}
                      <span className="user-panel-box-toman-sign">تومان</span>
                    </span>
                  </div>
                </div>
                <div className="user-panel-buy-license-box-btn-container">
                  <div className="user-panel-buy-license-box-btn">
                    خرید اشتراک
                    <FaArrowLeft />
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      )}
    </>
  );
};

export default LicensesComp;
