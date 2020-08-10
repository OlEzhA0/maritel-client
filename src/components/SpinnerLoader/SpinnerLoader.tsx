import React from "react";
import "./SpinnerLoader.scss";

export const SpinnerLoader = () => {
  return (
    <div className="SpinnerLoader">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      
    </div>
  );
};
