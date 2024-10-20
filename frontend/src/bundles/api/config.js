import { createLoader } from '../components/loader';

export async function postRequest(path, obj) {
  createLoader();
  try {
    let response = await fetch(`http://localhost:3000${path}`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${sessionStorage?.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    } else {
      return data.payload;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getRequest(path) {
  createLoader();
  try {
    let response = await fetch(`http://localhost:3000${path}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${sessionStorage.getItem('token')}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    let data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    } else {
      return data.payload;
    }
  } catch (error) {
    console.log(error.message);
  }
}
