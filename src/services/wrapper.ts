import { getCurrentUser } from '@/utils/user';

export enum ResType {
  'creator' = 1,
  'modifier' = 2,
}

export default function(data: any, type: ResType) {
  if (!type) return data;
  const user = getCurrentUser();
  if (type == ResType.creator) {
    data.creator = user.userId;
  }
  if (type == ResType.modifier) {
    data.modifier = user.userId;
  }
  return data;
}
