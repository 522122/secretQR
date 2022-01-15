import { FormEvent, RefObject, useEffect, useRef } from "react";
import { AES } from "crypto-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { classList } from "../functions";

export const Create = () => {
  const [wasValidated, setWasValidated] = useState(false);
  const navigate = useNavigate();
  const messageRef: RefObject<any> = useRef();
  const secretRef: RefObject<any> = useRef();

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const encrypt = AES.encrypt(
      messageRef.current.value,
      secretRef.current.value
    );
    navigate(`/show-qr/${encodeURIComponent(encrypt.toString())}`);
  };

  return (
    <form
      onInvalid={() => setWasValidated(true)}
      onSubmit={(e) => handleSubmit(e)}
      className={classList({
        container: true,
        "mt-3": true,
        "was-validated": wasValidated,
      })}
    >
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card bg-light">
            <div className="card-body">
              <input
                ref={secretRef}
                type="password"
                placeholder="Secret"
                className="form-control"
                required
              />

              <div className="mt-3">
                <textarea
                  ref={messageRef}
                  rows={15}
                  className="form-control"
                  required
                ></textarea>

                <button className="btn btn-lg btn-dark mt-3 w-100">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
