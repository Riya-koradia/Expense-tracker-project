export const mode = "local";
let domain = "";

switch (mode) {
  case "ip":
    domain = "http://10.10.83.8:8000/";
    break;
  case "local":
    domain = "http://localhost:8000/";
    break; 
  default:
    domain = "http://localhost:8000/";
}

export default {
  root: domain,
  signIn: `${domain}api/v1/auth/login`,
  resetToken: `${domain}api/v1/auth/resetToken`,
  resetPass: `${domain}api/v1/auth/reset-pass`,
  userAndSystemFetchByToken: `${domain}api/v1/user/fetch-by-token`,
  ModulesPermission: `${domain}api/v1/user/change-module-permission`,

  
  UserCreateApi: `${domain}api/v1/user/create`,
  UserFetchByIdApi: `${domain}api/v1/user/fetch-by-id`,
  UserUpdateApi: `${domain}api/v1/user/update`,
  UserFetchApi: `${domain}api/v1/user/fetch`,
  UserDelete: `${domain}api/v1/user/delete`,
 
  AddExpenseApi: `${domain}api/v1/expense/create`,
  FetchExpenseApi: `${domain}api/v1/expense/fetch`,
  FetchExpenseByIdApi: `${domain}api/v1/expense/fetch-by-id`,
  UpdateExpenseApi: `${domain}api/v1/expense/update`,
  DeleteExpenseApi: `${domain}api/v1/expense/delete`,
  getUserStatisticsApi: `${domain}api/v1/expense/user-statistics`,

  CreateCategoryApi: `${domain}api/v1/category/create`,
  FetchCategoryApi: `${domain}api/v1/category/fetch`,
  FetchCategoryByIdApi: `${domain}api/v1/category/by-id`,
  DeleteCategoryApi: `${domain}api/v1/category/delete`,
  UpdateCategoryApi: `${domain}api/v1/category/update`,

};
