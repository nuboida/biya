import { BiyaInput } from '@/components/BiyaInput';
import Modal from '@/components/modal';
import React, { ChangeEvent, useContext, useState } from 'react';
import { ErrorResponse, GeneralResponse, RefundCustomerResponse } from '../../Dashboard/dashboard.models';
import AuthContext from '@/context/authContext';
import ToastContext from '@/context/toastContext';
import auth from '@/helpers/auth.helper';
import { refundCustomerRequest } from '../dashboard.api';


interface RefundCustomerModalProps {
  onClose: () => void;
  orderId: string;
  customer: string;
  amount: number;
}

export const RefundCustomerModal: React.FC<RefundCustomerModalProps> = ({onClose, orderId, customer, amount}) => {
  const [refundAmount, setRefundAmount] = useState<number>(0);
  const [error, setError] = useState('');
  const toast = useContext(ToastContext);
  const token = auth.isAuthenticated();
  const {merchantId} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRefund = () => {
    try {
      let refundCredential = {
        orderId,
        customerId: customer,
        amount: refundAmount
      }

      refundCustomerRequest(token, merchantId, refundCredential).then((res: GeneralResponse | ErrorResponse) => {
        setIsLoading(true);
        if ('error' in res) {
          toast.error(res.error);
          setIsLoading(false);
          onClose();
        } else {
          toast.success(res.message);
          setIsLoading(false);
          onClose();
        }
      })

    } catch (error) {
      console.log(error);
      onClose();
    }
  }


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRefundAmount(Number(event.target.value))
    if (refundAmount > amount) {
      setError("Refund amount should not be greater than request amount");
    } else {
      setError('');
    }
  }

  return (
    <>
      <Modal
        title='Refund Customer'
        action={() => {handleRefund()}}
        actionName='Submit'
        onModalClose={() => onClose()}
        size='large'
        loading={isLoading}
        disabled={!!error}
      >
        <div className='px-28 mt-6'>
          <BiyaInput
          name='amount'
          label='Amount'
          onChange={handleChange}
          error={error}
          />
        </div>

      </Modal>
    </>
  )
}

