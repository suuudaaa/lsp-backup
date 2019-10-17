/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
import QS from "qs";
import store from "../store/index";

if (location.hostname === "localhost") {
  axios.defaults.baseURL = process.env.API_HOST_DEV;
} else if (location.hostname === "10.8.8.49") {
  axios.defaults.baseURL = process.env.API_HOST_TEST;
} else if (
  location.hostname === "lsp.lordstar.com.cn" ||
  location.hostname === "192.168.100.100"
) {
  axios.defaults.baseURL = process.env.API_HOST_PROD;
}
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/application/json;charset=UTF-8';
// 请求拦截器
axios.interceptors.request.use(
  config => {
    const token = store.state.token || window.localStorage.getItem("token");
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  }
);

axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.headers.servertoken) {
        if (response.headers.servertoken == "token is null.") {
          $Vue.prototype.$message({
            message: "你未登录或登录已过期，请重新登录",
            type: "error"
          });
          localStorage.removeItem("token");
          setTimeout(() => {
            Router.replace({
              path: "/login",
              query: {
                redirect: Router.currentRoute.fullPath
              }
            });
          }, 1000);
        }
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // case 401:
        //   $Vue.prototype.$message({
        //     message: "你未登录或登录已过期，请重新登录",
        //     type: "error"
        //   });
        //   localStorage.removeItem("token");
        //   setTimeout(() => {
        //     Router.replace({
        //       path: "/login",
        //       query: {
        //         redirect: Router.currentRoute.fullPath
        //       }
        //     });
        //   }, 1000);
        //   break;
        case 404:
          $Vue.prototype.$message({
            message: "请求不存在",
            type: "error"
          });
          break;
        default:
          $Vue.prototype.$message({
            message: error,
            type: "error"
          });
      }
      return Promise.reject(error.response);
    }
  }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
// params类型传参
export function post1(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${url}?`, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

// 文件 导出
export const fileOut1 = (url, params) => {
  return axios.request({
    url: url,
    method: "post",
    data: QS.stringify(params),
    responseType: "blob"
  });
};
