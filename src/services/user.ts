import request from '@/utils/request';
import wrapper, { ResType } from './wrapper';

export async function fetchUserList(params: any) {
  return request.post('/userManage/userList', {
    data: params,
  });
}

export async function fetchInsertUser(params: any) {
  return request.post('/userManage/insertUser', {
    data: wrapper(wrapper(params, ResType.creator), ResType.modifier),
  });
}

export async function fetchUpdateUser(params: any) {
  return request.post('/userManage/updateUser', {
    data: wrapper(params, ResType.modifier),
  });
}

export async function fetchDeleteUser(params: any) {
  return request.post('/userManage/deleteUser', {
    data: wrapper(params, ResType.modifier),
  });
}

export async function fetchUpdatePassword(params: any) {
  return request.post('/userManage/updatePassword', {
    data: params,
  });
}

//特殊字段表

export async function fetchGetSpecialTable(params: any) {
  return request.post('/ddz/specialTable/queryList', {
    data: params,
  });
}

export async function fetchInsertSpecialTable(params: any) {
  return request.post('/ddz/specialTable/insertTable', {
    data: wrapper(params, ResType.creator),
  });
}

export async function fetchUpdateSpecialTable(params: any) {
  return request.post('/ddz/specialTable/updateTable', {
    data: wrapper(params, ResType.modifier),
  });
}

//保护类型
export async function fetchGetProtectTable(params: any) {
  return request.post('/ddz/cardType/queryList', {
    data: params,
  });
}

export async function fetchInsertProtectTable(params: any) {
  return request.post('/ddz/cardType/insertCardType', {
    data: wrapper(params, ResType.creator),
  });
}

export async function fetchUpdateProtectTable(params: any) {
  return request.post('/ddz/cardType/updateCardType', {
    data: wrapper(params, ResType.modifier),
  });
}

export async function getUserDetailInfo() {
  return request.post('/userManage/userInfo');
}
