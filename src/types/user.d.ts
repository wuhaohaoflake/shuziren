import { ColumnsType } from 'antd/es/table';
export interface IUser {
  userId: string;
  account: string;
  userName: string;
  password: string;
  roleName: string;
  roleList: any[];
  roleIds: string[];
  updateTime: string;
}

export interface ICreateParams {
  account: string;
  password: string;
  roleIds: string[];
  userName: string;
  position: string;
}

export interface IConfig {
  columns: ColumnsType<IUser>;
}
