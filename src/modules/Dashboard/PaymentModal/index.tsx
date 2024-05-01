import { BiyaInput } from '@/components/BiyaInput';
import Modal from '@/components/modal';
import React, { ChangeEvent, useContext, useState } from 'react';
import { MerchantPaymentRequest, MerchantPaymentResponse } from '../dashboard.models';
import { merchantRequestPayment } from '../dashboard.api';
import AuthContext from '@/context/authContext';
import ToastContext from '@/context/toastContext';


interface PaymentModalProps {
  onClose: () => void;
}
export const PaymentModal: React.FC<PaymentModalProps> = ({onClose}) => {
  const [paymentCredentials, setPaymentCredentials] = useState<MerchantPaymentRequest>({
    customerId: '',
    amount: 0,
    orderId: '',
  });
  const [error, setError] = useState('');
  const {userToken} = useContext(AuthContext);
  const toast = useContext(ToastContext);


  const handlePayment = () => {
    merchantRequestPayment(paymentCredentials, userToken).then((data: MerchantPaymentResponse) => {
      if(!data) {
        toast.error("Something went wrong, Please try again later");
        onClose()
      } else if(data.status === 'error') {
        toast.error(data.message);
        setPaymentCredentials({...paymentCredentials});
        setError(data.message)
        onClose();
      } else {
        setError('');
        onClose();
      }
    })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentCredentials({...paymentCredentials, [event.target.name]: event.target.value})
  }

  return (
    <>
      <Modal
        title='Merchant Request Payment'
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
