/**
 * @description load map resources
 */
const AK = "hip60fgnwkrLjPT3rjIKFBfAWFUVGVL2";
export default function loadBMap() {
  return new Promise((resolve, reject) => {
    asyncLoadBaiduJs(AK)
      .then(() => {//polymerization API
        resolve();
        return true;
      })
      .catch(err => {
        reject(err);
      });
  });
}
/**
 * @description async load map JS
 */
export function asyncLoadBaiduJs() {
  return new Promise((resolve, reject) => {
    if (typeof BMap !== "undefined") {
      resolve(BMap);
      return true;
    }
    window.onBMapCallback = function() {
      resolve(BMap);
    };
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "http://api.map.baidu.com/api?v=2.0&ak=" +
      AK +
      "&callback=onBMapCallback";
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
/**
 * @description async load JS
 * @param {string} url
 */
export function asyncLoadJs(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
    script.onerror = reject;
  });
}
