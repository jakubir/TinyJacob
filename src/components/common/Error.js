import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Error({ par, to }) {
  return (
    <>
      <FontAwesomeIcon icon={par.icon1} className="text-cyan-600 text-5xl"/>
      <span className="flex flex-col gap-2 items-center px-2">
        <h2 className="max-lg:text-xl lg:text-2xl font-semibold">{par.text1}</h2>
        <span style={{"text-wrap":"balance"}} className="text-center w-fit max-lg:text-lg">{par.text2}</span>
      </span>
      <Link
        className="text-cyan-600 hover:text-cyan-700 font-semibold max-lg:text-lg text-center"
        onClick={() => {
          window.location.replace(to);;
        }}
      >
        <FontAwesomeIcon icon={par.icon2}/>
        {" " + par.text3}
      </Link>
    </>
  );
}
