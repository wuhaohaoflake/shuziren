import request from '@/utils/request';

interface ILoginParams {
  username: string;
  password: string;
}

export async function fetchAccountLogin(params: ILoginParams) {
  return request.post('/userManage/checkLogin', {
    data: params,
  });
}

export async function fetchAccountLogout(params: IGlobalParams) {
  return request.post('/userManage/logOut', {
    data: params,
  });
}
