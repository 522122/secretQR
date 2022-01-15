import { AES, enc } from "crypto-js";
import { FormEvent, RefObject, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { classList } from "../functions";

const SecretForm = (props: any) => {
  const [wasValidated, setWasValidated] = useState(false);

  const secretRef: RefObject<any> = useRef();

  useEffect(() => {
    secretRef.current.focus();
  });

  return (
    <form
      onInvalid={() => setWasValidated(true)}
      onSubmit={(e) => props.onSubmit(secretRef.current.value)(e)}
      className={classList({
        row: true,
        "justify-content-center": true,
        "was-validated": wasValidated,
      })}
    >
      <div className="col-lg-6 mb-3">
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
              <button className="btn btn-lg w-100 btn-dark">Decode</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export const Decode = () => {
  const params = useParams();

  const [decodedValue, setDecodedValue] = useState("");

  const handleSubmit = (secret: string) => (e: FormEvent) => {
    e.preventDefault();
    const decrypt = AES.decrypt(decodeURIComponent(params.value || ""), secret);
    try {
      setDecodedValue(decrypt.toString(enc.Utf8));
    } catch (e) {
      setDecodedValue("");
    }
  };

  return (
    <main className="container mt-3">
      {decodedValue ? (
        <div className="row justify-content-center">
          <pre className="col-lg-6">
            <div className="card bg-light">
              <div className="card-body">{decodedValue}</div>
            </div>
          </pre>
        </div>
      ) : (
        <SecretForm onSubmit={handleSubmit} />
      )}
      <div className="text-center">
        <ul className="list-inline">
          <li className="list-inline-item">
            <Link className="back" to="/">
              Create new
            </Link>
          </li>
          <li className="list-inline-item">
            <Link
              className="back"
              to={`/show-qr/${encodeURIComponent(params.value || "")}`}
            >
              Show QR code
            </Link>
          </li>
          {decodedValue && (
            <li className="list-inline-item">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => setDecodedValue("")}
              >
                Lock
              </button>
            </li>
          )}
        </ul>
      </div>
    </main>
  );
};
