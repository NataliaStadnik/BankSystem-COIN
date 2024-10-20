import { getRequest } from './config';

export async function getAccounts() {
  return await getRequest('/accounts');
}

export async function getOneAccount(id) {
  return await getRequest(`/account/${id}`);
}

export async function allCurrencies() {
  return await getRequest(`/all-currencies`);
}

export async function myCurrencies() {
  return await getRequest(`/currencies`);
}

export async function getBanks() {
  return await getRequest(`/banks`);
}
