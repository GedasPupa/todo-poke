export const DateConverter = (d: number) => {
  let date = new Date(d);
  let year: string | number = date.getFullYear();
  let month: string | number = date.getMonth() + 1;
  let dt: string | number = date.getDate();
  let hr: string | number = date.getHours();
  let mn: string | number = date.getMinutes();
  let sc: string | number = date.getSeconds();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hr < 10) {
    hr = "0" + hr;
  }
  if (mn < 10) {
    mn = "0" + mn;
  }
  if (sc < 10) {
    sc = "0" + sc;
  }

  return year + "-" + month + "-" + dt + " " + hr + ":" + mn + ":" + sc;
};
