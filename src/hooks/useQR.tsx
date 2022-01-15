import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { UseQRHook } from "./types";

const defaultOptions = {
  scale: 5,
};

export const useQR: UseQRHook = (value: string, options) => {
  const path = `/decode/${encodeURIComponent(value || "")}`;
  const url = `${window.location.origin}${path}`;

  const [error, setError] = useState(false);
  const [qr, setQR] = useState(
    "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
  );

  const Element = ({ ...props }) =>
    error ? <>{value}</> : <img src={qr} alt={url} {...props} />;

  useEffect(() => {
    QRCode.toDataURL(url, {
      ...defaultOptions,
      ...options,
    })
      .then(setQR)
      .catch(() => {
        setError(true);
      });
  }, [url, options]);

  return {
    qr,
    url,
    path,
    error,
    Element,
  };
};
