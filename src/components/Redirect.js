import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faArrowRotateRight,
  faMagnifyingGlass,
  faQuestion,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Error from "./common/Error";

function Redirect() {
  const hash = useParams();
  const [elements, setElements] = useState(<></>);
  let timer = useRef(null);

  useEffect(() => {
    axios.post("https://tiny.jakubirla.pl/api/hash/hash", { hash: hash.h })
      .then((res) => {
        if (res.data.error === "unknownHash")
          setElements(
            <Error
              par={{
                icon1: faMagnifyingGlass,
                icon2: faArrowLeft,
                text1: "Nieprawidłowy link",
                text2: "Sprawdź poprawność wpisanego adresu",
                text3: "Powrót do strony głównej",
              }}
              to={"/"}
            />
          );
        else if (res.data.error === "dbConnection")
          throw new Error("dbConnection");
        else {
          clearTimeout(timer.current);
          setElements(
            <>
              <h2
                style={{ "text-wrap": "balance" }}
                className="font-semibold text-center max-lg:text-xl lg:text-2xl"
              >
                Dziękujemy za korzystanie z naszego serwisu
              </h2>
              <span className="flex flex-col items-center">
                <span className="text-center max-lg:text-lg">
                  Następuje przekierowanie do strony:
                </span>
                <span className="text-cyan-600 max-lg:font-semibold px-2 xl:px-6 text-center break-all max-lg:text-normal overflow-hidden max-md:max-h-72">
                  {res.data.content}
                </span>
              </span>
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="animate-spin text-6xl mt-6 text-cyan-700"
              />
            </>
          );
          timer.current = setTimeout(() => {
            window.location.replace(res.data.content);
          }, 3 * 1000);
        }
      })
      .catch(() =>
        setElements(
          <Error
            par={{
              icon1: faQuestion,
              icon2: faArrowRotateRight,
              text1: "Coś poszło nie tak",
              text2: "Spróbuj ponownie",
              text3: "Odśwież stronę",
            }}
            to={window.location.href}
          />
        )
      );
  }, [hash]);

  return (
    <div className="h-full w-max:h-3/4 flex flex-col gap-6 justify-center items-center lg:text-xl">
      {elements}
    </div>
  );
}

export default Redirect;
