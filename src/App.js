import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from './memdb.js';
import CustomerList from './Components/CustomerList';
import CustomerAddUpdateForm from './Components/CustomerAddUpdateForm';
import './App.css';

function log(message) {
  console.log(message);
}

export default function App() {
  const blankCustomer = { id: -1, name: '', email: '', password: '' };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    log('in getCustomers()');
    setCustomers(getAll());
  };

  const handleListClick = (item) => {
    if (formObject.id === item.id) {
      setFormObject(blankCustomer);
    } else {
      setFormObject(item);
    }
    log('in handleListClick()');
  };

  const handleInputChange = (event) => {
    log('in handleInputChange()');
    const { name, value } = event.target;
    setFormObject((prev) => ({ ...prev, [name]: value }));
  };

  const onCancelClick = () => {
    log('in onCancelClick()');
    setFormObject(blankCustomer);
  };

  const onDeleteClick = () => {
    if (formObject.id >= 0) {
      deleteById(formObject.id);
      getCustomers();
    }
    setFormObject(blankCustomer);
    log('in onDeleteClick()');
  };

  const onSaveClick = () => {
    const mode = formObject.id >= 0 ? 'Update' : 'Add';
    log('in onSaveClick(), mode:', mode);
    if (mode === 'Add') {
      post(formObject);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
    }
    getCustomers();
    setFormObject(blankCustomer);
  };

  const mode = formObject.id >= 0 ? 'Update' : 'Add';

  return (
    <div>
      <CustomerList
        customers={customers}
        selectedCustomerId={formObject.id}
        onSelectCustomer={handleListClick}
      />
      <CustomerAddUpdateForm
        formObject={formObject}
        mode={mode}
        onInputChange={handleInputChange}
        onCancelClick={onCancelClick}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
      />
    </div>
  );
}
