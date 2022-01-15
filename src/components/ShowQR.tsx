import { Link, useNavigate, useParams } from "react-router-dom";
import { useQR } from "../hooks/useQR";

export const ShowQR = () => {
  const params = useParams();
  const navigate = useNavigate();

  const qr = useQR(params.value as string);

  return (
    <main className="container mt-3">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div className="card bg-white mb-3">
            <div className="card-body p-0">
              <qr.Element />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <ul className="list-inline">
          <li className="list-inline-item">
            <Link className="back" to="/">
              Create new
            </Link>
          </li>
          <li className="list-inline-item">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => navigate(qr.path)}
            >
              Decode
            </button>
          </li>
        </ul>
      </div>
    </main>
  );
};
