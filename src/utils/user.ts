interface IUser {
  accessId: string;
  accessKey: string;
  orRemember?: any;
  userId: string;
  userName: string;
}

export function getCurrentUser() {
  const user = localStorage.getItem('user');
  if (!user || user == 'undefined' || user == 'null') {
    return null;
  } else {
    return user && user != 'undefined' && JSON.parse(user);
  }
}

export function setCurrentUser(user: IUser) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function removeCurrentUser() {
  localStorage.removeItem('user');
}
