const baseURL = 'http://localhost:4000/customers';

export async function getAll(setCustomers) {
  const myInit = {
    method: 'GET',
    mode: 'cors',
  };

  try {
    const response = await fetch(baseURL, myInit);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    setCustomers(data);
  } catch (error) {
    alert(error);
  }
}

export async function post(customer, postOpCallback) {
  // Remove id before POSTing new customer to avoid conflicts
  const customerToSend = { ...customer };
  delete customerToSend.id;

  const myInit = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerToSend),
  };

  try {
    const response = await fetch(baseURL, myInit);
    if (!response.ok) {
      throw new Error(`Error posting data: ${response.status}`);
    }
    if (postOpCallback) postOpCallback();
  } catch (error) {
    alert(error);
  }
}

export async function put(id, customer, postOpCallback) {
  const url = `${baseURL}/${id}`;
  const myInit = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  };

  try {
    const response = await fetch(url, myInit);
    if (!response.ok) {
      throw new Error(`Error putting data: ${response.status}`);
    }
    if (postOpCallback) postOpCallback();
  } catch (error) {
    alert(error);
  }
}

export async function deleteById(id, postOpCallback) {
  const url = `${baseURL}/${id}`;
  const myInit = {
    method: 'DELETE',
    mode: 'cors',
  };

  try {
    const response = await fetch(url, myInit);
    if (!response.ok) {
      throw new Error(`Error deleting data: ${response.status}`);
    }
    if (postOpCallback) postOpCallback();
  } catch (error) {
    alert(error);
  }
}
