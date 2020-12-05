function urlGenerate(string: string) {
  const splittedString = string.toLowerCase().split(" ");
  const reducer = (acc: string, cur: string) => acc + "-" + cur;
  const url = splittedString.reduce(reducer);
  return url;
}

export const productIdAndNameToPath = (id: string, name: string) => {
  return `/c/${id}/${urlGenerate(name)}`;
};

export const currencyFormatter = (currency: number) => {
  const newFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return newFormat.format(currency);
};
