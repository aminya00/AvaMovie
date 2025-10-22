import { useState } from "react";

function WithIsShow(Component){
    const newComponent = (props) => {
      
      const [isShowAccardion, setIsShowAccardion] = useState(false);
      const accardionShowHand = () => {
        setIsShowAccardion((prev) => !prev);
      };
    return <Component {...{ isShowAccardion, accardionShowHand }}{...props} />;
  };
  return newComponent;
};

export default WithIsShow;
