export const classList = (o: { [key: string]: any }) => {
  return Object.keys(o).reduce((a, c) => {
    if (o[c]) {
      a += " " + c;
    }
    return a;
  }, "");
};
