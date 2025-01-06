import React, { ChangeEvent, useContext, useState } from 'react';
import { BiyaInput } from '@/components/BiyaInput';
import { BiyaTextArea } from '@/components/BiyaTextarea';
import Modal from '@/components/modal';
import ToastContext from '@/context/toastContext';
import auth from '@/helpers/auth.helper';
import AuthContext from '@/context/authContext';
import { withdrawFunds } from '../dashboard.api';
import { ErrorResponse, GeneralResponse } from '../dashboard.models';
import { Dropdown } from '@/components/dropdown';

interface WithdrawalModal {
  onClose: () => void;
  banks: {bankCode: string, bankName: string}[];
  accounts: {_id: string; accountNumber: string, bankCode: string}[];
}

export const WithdrawalModal: React.FC<WithdrawalModal> = ({onClose, banks, accounts}) => {
  const [withdrawPayload, setWithdrawPayload] = useState<{amount: number, reason: string, accountId: string}>({
    amount: 0,
    reason: '',
    accountId: ''
  });
  const [error, setError] = useState('');
  const toast = useContext(ToastContext);
  const token = auth.isAuthenticated();
  const {merchantId} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const getlabel = (banks: any, account: any) => {
    const bankLabel = banks.map((bank: any) => {
      if (bank.bankCode === account.bankCode ) {
        return `${bank.bankName}: ${account.accountNumber}`
      } else {
        return ''
      }
    });
    return bankLabel
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWithdrawPayload({...withdrawPayload, [event.target.name]: event.target.value})
  }

  const handleDropdown = (event: ChangeEvent<HTMLSelectElement>) => {
    setWithdrawPayload({...withdrawPayload, accountId: event.target.value})
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
          <Dropdown name='account' label='Account' options={
            accounts.map((account) => {
              return {
                label: getlabel(banks, account),
                value: account._id
              }
            })
          }
          onChange={handleDropdown}
          />
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
