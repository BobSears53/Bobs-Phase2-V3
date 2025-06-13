import React, { useState, useEffect } from 'react';
import { getAll, post, put, deleteById } from './restdb.js';
import CustomerList from './Components/CustomerList.js';
import CustomerAddUpdateForm from './Components/CustomerAddUpdateForm.js';
import './App.css';

function log(message, ...optionalParams) {
  console.log(message, ...optionalParams);
}

export default function App() {
  const blankCustomer = { id: -1, name: '', email: '', password: '' };
  const [customers, setCustomers] = useState([]);
  const [formObject, setFormObject] = useState(blankCustomer);

  // state to track when data changes
  const [dataChange, setDataChange] = useState(0);

  useEffect(() => {
    log('in getCustomers()');
    getAll(setCustomers);
  }, [dataChange]); // runs on dataChange

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
    const postOpCallback = () => {
      setFormObject(blankCustomer);
      setDataChange((prev) => prev + 1); // trigger reload
    };
    if (formObject.id >= 0) {
      deleteById(formObject.id, postOpCallback);
    } else {
      setFormObject(blankCustomer);
    }
    log('in onDeleteClick()');
  };

  const onSaveClick = () => {
    const mode = formObject.id >= 0 ? 'Update' : 'Add';
    log('in onSaveClick(), mode:', mode);

      // Validation: check for empty fields
  if (!formObject.name.trim() || !formObject.email.trim() || !formObject.password.trim()) {
    alert('Please fill in all fields: Name, Email, and Password.');
    return; // stop save if validation fails
  }

    const postOpCallback = () => {
      setFormObject(blankCustomer);
      setDataChange((prev) => prev + 1); // trigger reload
    };   

    if (mode === 'Add') {
      post(formObject, postOpCallback);
    } else if (mode === 'Update') {
      put(formObject.id, formObject, postOpCallback);
    }
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
