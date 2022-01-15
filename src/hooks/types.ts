export type UseQROut = {
  qr: string;
  url: string;
  path: string;
  error: boolean;
  Element: (props: any) => JSX.Element;
};

export type UseQROptions = {
  [key: string]: any;
};

export type UseQRHook = (value: string, options?: UseQROptions) => UseQROut;
