import { extend } from 'umi-request';
import { message } from 'antd';
import { getCurrentUser, removeCurrentUser } from '@/utils/user';
import { userManageUrl } from '@/utils/itemUrl';
import { API_URL } from './apiurl';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import { Encrypt, Decrypt } from '@/utils/crypto';

const baseURL = REACT_APP_ENV === 'dev' ? '/api' : API_URL;

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或˝维护。',
  504: '网关超时。',
};

const SuccessCode = '10000';

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response | any }) => {
  const { response } = error;
  let errText = '';
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    errText = `${status} ${errorText}`;
  } else if (response && response.msg && response.code) {
    errText = `${response.code}:${response.msg}`;
    //accessId过期和账号多次登录
    if (response.code == '403') {
      message.error('登录信息失效，请返回登录');
    }
  } else if (response && response.msg) {
    errText = `${response.msg}`;
  } else if (response && response.code) {
    errText = `${response.code}`;
  } else if (!response) {
    errText = `网络异常`;
  }
  message.error(`请求错误 ${errText}`);
  return Promise.reject(response || 'Error');
};

const request = extend({});

request.interceptors.request.use((url, options) => {
  let headerObj = {};
  if (localStorage.getItem('token')) {
    headerObj = { Authorization: localStorage.getItem('token') };
  } else {
    message.error('清先登录');
  }
    options.data = {
      ...options.data,
    };
  return {
    url: `${baseURL}${url}`,
    options: {
      ...options,
      // headers: headerObj,
    },
  };
});

request.interceptors.response.use(async response => {
  let data = await response.clone().json();
  if (data && (data.code == 0)) {
    return data;
  } else {
    return errorHandler({ response: data });
  }
});

export default request;
