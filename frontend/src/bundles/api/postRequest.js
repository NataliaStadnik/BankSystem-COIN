import { postRequest } from './config';

export async function loginInApp(obj) {
  return await postRequest('/login', obj);
}

export async function createAccount() {
  return await postRequest('/create-account', {});
}

export async function transferFunds(obj) {
  return await postRequest('/transfer-funds', obj);
}

export async function buyCurrency(obj) {
  return await postRequest('/currency-buy', obj);
}
