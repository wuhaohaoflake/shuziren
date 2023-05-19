import request from '@/utils/request';

export async function fetchResources(params: IGlobalParams) {
  return request.post('/userManage/getResource', {
    data: params,
  });
}
