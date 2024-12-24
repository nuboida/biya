import Modal from '@/components/modal';
import React, { useContext, useState } from 'react';
import { removeEmployee } from '../settings.api';
import auth from '@/helpers/auth.helper';
import AuthContext from '@/context/authContext';
import { ErrorResponse, GeneralResponse } from '../settings.model';
import ToastContext from '@/context/toastContext';

interface RemoveEmployeeModalProps {
  onClose: () => void;
  employeeId: number;
  fullName: string;
}

export const RemoveEmployeeModal: React.FC<RemoveEmployeeModalProps> = ({onClose, employeeId, fullName}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = auth.isAuthenticated();
  const {merchantId} = useContext(AuthContext);

  const toast = useContext(ToastContext);

  const handleRemoveEmployee = () => {
    setIsLoading(true);
    removeEmployee(token, merchantId, employeeId).then((res: GeneralResponse | ErrorResponse) => {
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
      title='Remove Employee'
      action = {() => handleRemoveEmployee()}
      actionName='Remove'
      onModalClose={() => onClose()}
      loading={isLoading}
      >
        <div className='px-28 mt-6'>
          <h1 className='font-bold'>Are you sure you want to remove {fullName}?</h1>
        </div>
      </Modal>
    </>
  )
}
