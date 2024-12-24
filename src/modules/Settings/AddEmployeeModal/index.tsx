import React, { ChangeEvent, useContext, useState } from 'react';
import { BiyaInput } from '@/components/BiyaInput';
import Modal from '@/components/modal';
import { AddEmployeeRequest, GeneralResponse, ErrorResponse } from '../settings.model';
import { addEmployeeRequest } from '../settings.api';
import auth from '@/helpers/auth.helper';
import AuthContext from '@/context/authContext';
import ToastContext from '@/context/toastContext';
import { Dropdown } from '@/components/dropdown';

interface AddEmployeeModalProps {
  onClose: () => void;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({onClose}) => {
  const [employeeCredentials, setEmployeeCredentials] = useState<AddEmployeeRequest>({
    firstName: '',
    lastName: '',
    role: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = auth.isAuthenticated();
  const {merchantId} = useContext(AuthContext);
  const toast = useContext(ToastContext);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmployeeCredentials({...employeeCredentials, [event.target.name]: event.target.value})
  }
  const handleDropdown = (event: ChangeEvent<HTMLSelectElement>) => {
    setEmployeeCredentials({...employeeCredentials, role: event.target.value})
  }
  const handleAddEmployee = () => {
    setIsLoading(true);
    addEmployeeRequest(token, merchantId, employeeCredentials).then((res: GeneralResponse | ErrorResponse) => {
      if ('error' in res) {
        toast.error(res.error);
        setIsLoading(false);
        onClose()
      } else {
        toast.success(res.message);
        setIsLoading(false);
        onClose();
      }
    });
  }

  return (
    <>
      <Modal
        title='Add Employee'
        action={() => handleAddEmployee()}
        actionName='Submit'
        onModalClose={() => onClose()}
        size='large'
        loading={isLoading}
      >
        <div className='px-28 mt-6'>
          <BiyaInput name='firstName' label='First Name' onChange={handleInputChange} />
          <BiyaInput name='lastName' label='Last Name' onChange={handleInputChange} />
          <BiyaInput name='phone' label='Phone' onChange={handleInputChange} />
          {/* <BiyaInput name='role' label='Role' onChange={handleInputChange} /> */}
          {<Dropdown name='role' label='Role' options={[{label: 'Staff', value: 'Staff'}, {label: 'Admin', value: 'Admin'}]} onChange={handleDropdown} />}
        </div>
      </Modal>
    </>
  )
}
