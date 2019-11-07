export const getToken = () => {
  return 'bearer ' + localStorage.getItem('local-jwt');
};