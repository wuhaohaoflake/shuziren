//role
import request from '@/utils/request';
import wrapper, { ResType } from './wrapper';

export async function fetchList(params: any) {
  return request.post('/roleManage/roleList', {
    data: params,
  });
}

export async function fetchInsert(params: any) {
  return request.post('/roleManage/insertRole', {
    data: wrapper(wrapper(params, ResType.creator), ResType.modifier),
  });
}

export async function fetchUpdate(params: any) {
  return request.post('/roleManage/updateRole', {
    data: wrapper(params, ResType.modifier),
  });
}

export async function fetchDelete(params: any) {
  return request.post('/roleManage/deleteRole', {
    data: wrapper(params, ResType.modifier),
  });
}

export async function fetchRoleDetail(params: any) {
  return request.post('/roleManage/roleDetail', {
    data: params,
  });
}

export async function fetchResouceTree(params: any) {
  return request.post('/resourceManage/resourceTreeList', {
    data: params,
  });
}
