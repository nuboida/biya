import { BiyaInput } from '@/components/BiyaInput';
import Modal from '@/components/modal';
import React, { ChangeEvent, useContext, useState } from 'react';
import { RefundCustomerRequest, RefundCustomerResponse } from '../dashboard.models';
import { refundCustomer } from '../dashboard.api';
import AuthContext from '@/context/authContext';
import ToastContext from '@/context/toastContext';


interface RefundCustomerModalProps {
  onClose: () => void;
}

export const RefundCustomerModal: React.FC<RefundCustomerModalProps> = ({onClose}) => {
  const [refundCredentials, setRefundCredentials] = useState<RefundCustomerRequest>({
    customerId: '',
    amount: 0,
    orderId: '',
  });
  const [error, setError] = useState('');
  const {userToken} = useContext(AuthContext);
  const toast = useContext(ToastContext);


  const handlePayment = () => {
    refundCustomer(refundCredentials, userToken).then((data: RefundCustomerResponse) => {
      if(!data) {
        toast.error("Something went wrong, Please try again later");
        onClose()
      } else if(data.status === 'error') {
        toast.error(data.message);
        setRefundCredentials({...refundCredentials});
        setError(data.message)
        onClose();
      } else {
        setError('');
        onClose();
      }
    })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRefundCredentials({...refundCredentials, [event.target.name]: event.target.value})
  }

  return (
    <>
      <Modal
        title='Refund Customer'
        action={() => handlePayment()}
        actionName='Submit'
        onModalClose={() => onClose()}
        size='large'
      >
        <div className='px-28 mt-6'>
          <BiyaInput name='customerId' label='Customer ID' onChange={handleChange}/>
          <BiyaInput name='amount' label='Amount' onChange={handleChange}/>
          <BiyaInput name='orderId' label='Order ID' onChange={handleChange}/>
        </div>
      </Modal>
    </>
  )
}
