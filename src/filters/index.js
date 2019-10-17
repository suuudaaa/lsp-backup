exports.formatMoney = val => {
  if (val) {
    val = Number(val);
    return "￥ " + val.toFixed(2);
  }
};

exports.intFormat = val => {
  if (!val) return "0";
  let intPart = parseInt(val) || 0;
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  return intPartFormat;
};
