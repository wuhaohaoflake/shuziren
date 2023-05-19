import { ColumnsType } from 'antd/es/table';
export interface IRole {
  roleId: string;
  roleName: string;
  description: string;
  modifierAccount: string;
  updateTime: any[];
}

export interface ICreateParams {
  roleName: string;
  description: string;
  resourceIds: string[];
}

export interface IUpdateParams extends ICreateParams {
  roleId: string;
}

export interface IConfig {
  columns: ColumnsType<IRole>;
}
