import React from "react";
import Correct from "../img/correct.svg";
import Error from "../img/error.svg";

const UserAlert = ({alert}) => {
  return (
    <div className="fixed bottom-2 right-4 left-4 md:left-auto md:right-2 bg-slate-100 w-11/12 md:w-1/6 h-1/6 z-20 border-2 border-slate-300 flex items-center rounded-2xl">
      <div className="mx-2">
        {alert.error ? (
          <img src={Error} alt="" className="w-20"/>
        ) : (
          <img src={Correct} alt="" className="w-20" />
        )}
      </div>
      <div className="mx-2">
        <p className="uppercase login text-center text-slate-500">{alert.msg}</p>
      </div>
    </div>
  );
};

export default UserAlert;
