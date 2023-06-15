import React from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

function Tiny() {
  const hash = useParams();
  const link = "https://tiny.jakubirla.pl/" + hash.h;

  return (
    <div className="h-3/4 flex flex-col gap-3 max-lg:gap-7 justify-center items-center lg:text-2xl max-lg:text-lg px-2">
      <h2 className="font-semibold max-lg:text-xl">Twój skrócony link to:</h2>
      <span className="max-lg:flex max-lg:flex-col max-lg:gap-7">
        <Link
          className="text-cyan-600 hover:text-cyan-700 border-2 lg:border-r-0 rounded-l-md py-2 pl-2.5 pr-3.5 w-full max-w-xs break-all"
          to={"/" + hash.h}
          title="Kliknij, by zostać przekierowanym"
          target={"_blank"}
        >
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="max-lg:hidden"
          />{" "}
          <span className="underline">{link}</span>
        </Link>
        <button
          className="bg-cyan-600 hover:bg-cyan-700 text-slate-50 font-semibold rounded-md lg:rounded-l-none py-2.5 px-3 max-lg:w-full max-lg:max-w-xs"
          title="Kliknij, aby skopiować"
          onClick={() => {
            navigator.clipboard.writeText(link);
          }}
        >
          <FontAwesomeIcon icon={faCopy} className="max-lg:hidden" />
          <span className="lg:hidden">Skopiuj!</span>
        </button>
      </span>
    </div>
  );
}

export default Tiny;
