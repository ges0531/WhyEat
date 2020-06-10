const isLogin = (): boolean => {
  const _id = window.sessionStorage.getItem('id');
  if (_id) {
    return true;
  }
  return false;
};
export {
  isLogin
};