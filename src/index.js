import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Create } from "./components/Create.tsx";
import { ShowQR } from "./components/ShowQR";
import { Decode } from "./components/Decode";
import "./App.scss";

const Four = () => {
  return (
    <p className="text-white text-center p-5">
      <span className="h1">404!</span> There is nothing here{" "}
      <Link to="/">continue home.</Link>
    </p>
  );
};

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Create />} />
      <Route path="/show-qr/:value" element={<ShowQR />} />
      <Route path="/decode/:value" element={<Decode />} />
      <Route path="*" element={<Four />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
