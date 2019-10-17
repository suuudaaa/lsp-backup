let df = (value, params, beforeDays) => {
  //  根据给定的时间字符串，得到特定的时间
  var dt = new Date(value);
  if (beforeDays) {
    dt.setDate(dt.getDate() - beforeDays);
  }

  //   yyyy-mm-dd
  var y = dt.getFullYear();
  var m = (dt.getMonth() + 1).toString().padStart(2, "0");
  var d = dt
    .getDate()
    .toString()
    .padStart(2, "0");

  if (params.toLowerCase() === "yyyy-mm-dd") {
    return `${y}-${m}-${d}`;
  } else {
    var hh = dt
      .getHours()
      .toString()
      .padStart(2, "0");
    var mm = dt
      .getMinutes()
      .toString()
      .padStart(2, "0");
    var ss = dt
      .getSeconds()
      .toString()
      .padStart(2, "0");

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
};

let nv = value => {
  //替换空值
  return value ? value : `暂无`;
};

export { df,nv };
