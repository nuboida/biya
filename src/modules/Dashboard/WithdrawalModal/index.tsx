import React, { ChangeEvent, useContext, useState } from 'react';
import { BiyaInput } from '@/components/BiyaInput';
import { BiyaTextArea } from '@/components/BiyaTextarea';
import Modal from '@/components/modal';
import ToastContext from '@/context/toastContext';
import auth from '@/helpers/auth.helper';
import AuthContext from '@/context/authContext';
import { withdrawFunds } from '../dashboard.api';
import { ErrorResponse, GeneralResponse } from '../dashboard.models';

interface WithdrawalModal {
  onClose: () => void;
}

export const WithdrawalModal: React.FC<WithdrawalModal> = ({onClose}) => {
  const [withdrawPayload, setWithdrawPayload] = useState<{amount: number, reason: string}>({
    amount: 0,
    reason: ''
  });
  const [error, setError] = useState('');
  const toast = useContext(ToastContext);
  const token = auth.isAuthenticated();
  const {merchantId} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWithdrawPayload({...withdrawPayload, [event.target.name]: event.target.value})
  }

  const handleWithdraw = () => {
    setIsLoading(true)

    withdrawFunds(token, merchantId, withdrawPayload).then((res: GeneralResponse | ErrorResponse) => {
      if ('error' in res) {
        toast.error(res.error);
        setIsLoading(false);
        onClose()
      } else {
        toast.success(res.message);
        setIsLoading(false);
        onClose();
      }
    })
  }

  return (
    <>
      <Modal
        title='Withdraw'
        action={() => {handleWithdraw()}}
        actionName='Submit'
        onModalClose={() => onClose()}
        size='large'
        loading={isLoading}
      >
        <div className='px-28 mt-6'>
          <BiyaInput
            name='amount'
            label='Amount'
            onChange={handleChange}
          />
          <BiyaTextArea label='Reason' name='reason' onChange={handleChange} />
        </div>

      </Modal>
    </>
  )
}
