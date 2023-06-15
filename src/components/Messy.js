import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Reaptcha from "reaptcha";
import axios from "axios";
import InlineError from "./common/InlineError";

function Messy() {
  const [error, setError] = useState("");
  const captchaRef = useRef(null);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  return (
    <>
      <form
        className="h-3/4 pt-5 flex flex-col flex-wrap items-center justify-center gap-1.5 text-lg px-2"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          captchaRef.current.execute();
        }}
      >
        <label className="flex flex-col items-center gap-2.5 w-full font-semibold">
          <span className="w-full max-w-xs">Link:</span>
          <input
            type="text"
            title="Podaj adres url (link), który chcesz skrócić"
            className="form-input w-full max-w-xs rounded border-slate-600 focus:border-cyan-600 focus:ring-cyan-600 font-normal"
            {...register("url", {
              required: true,
              pattern:
                /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/,
            })}
          />
          <span className="h-4 text-center text-sm">
            {errors.url?.type === "required" && (
              <InlineError error={"Nie podano linku"} />
            )}
            {errors.url?.type === "pattern" && (
              <InlineError error={"Podany link jest niepoprawny"} />
            )}
            <InlineError error={error} />
          </span>
        </label>
        <Reaptcha
          sitekey={process.env.REACT_APP_SITE_KEY}
          ref={captchaRef}
          size="invisible"
          onVerify={handleSubmit((data) => {
            captchaRef.current.getResponse().then((token) => {
              axios.post("https://tiny.jakubirla.pl/api/recaptcha", { token })
                .then((resp) => {
                  if (resp.data === true) {
                    // poprawnie zweryfikowano
                    axios.post("https://tiny.jakubirla.pl/api/link/link", {
                        link: data.url,
                      })
                      .then((res) => {
                        switch (res.data.error) {
                          case "":
                            navigate(`/tiny/${res.data.content}`);
                            break;
                          case "notALink":
                            setError("Podany link jest niepoprawny");
                            break;
                          default:
                            setError("Coś poszło nie tak... Spróbuj ponownie");
                            break;
                        }
                      })
                      .catch((error) => {
                        setError("Coś poszło nie tak... Spróbuj ponownie");
                      });
                  } else {
                    setError("Nieudana próba weryfikacji... Spróbuj ponownie");
                  }
                })
                .catch(() => {
                  setError("Coś poszło nie tak... Spróbuj ponownie");
                });
            });
          })}
          onError={() => {
            setError("Coś poszło nie tak... Spróbuj ponownie");
          }}
        />
        <input
          type="submit"
          title="Kliknij, by skrócić podany link  "
          className="form-submit max-md:w-full max-md:max-w-xs md:w-36"
          value={"Skróć ten link!"}
        />
      </form>
    </>
  );
}

export default Messy;
