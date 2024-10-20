export function setLocalStorage(value) {
  if (localStorage.getItem('account') === null) {
    localStorage.setItem('account', JSON.stringify([value]));
  } else {
    const localStor = JSON.parse(localStorage.account);
    localStor.push(value);
    const set = new Set(localStor);
    localStorage.account = JSON.stringify(set);
  }
}
