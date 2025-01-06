import React, { useContext, useEffect, useRef, useState } from 'react';
import { getBanks, getMerchant, getMerchantAccounts, getRoles } from './settings.api';
import auth from '@/helpers/auth.helper';
import AuthContext from '@/context/authContext';
import { ErrorResponse, GetMerchantResponse, RolesResponse } from './settings.model';
import ToastContext from '@/context/toastContext';
import { BiyaButton } from '@/components/BiyaButton';
import { AddEmployeeModal } from './AddEmployeeModal';
import { RemoveEmployeeModal } from './RemoveEmployeeModal';
import { DropdownProps } from '@/components/models/dropdown.models';
import ValidateBankModal from './ValidateBankModal';

const Settings = () => {

  const [merchant, setMerchant] = useState<GetMerchantResponse>({
    id: '',
    merchantId: 0,
    businessName: '',
    employees: []
  });
  const token = auth.isAuthenticated();
  const {merchantId} = useContext(AuthContext);
  const toast = useContext(ToastContext);
  const [merchantLoading, setMerchantLoading] = useState<boolean>(false);
  const [owner, setOwner] = useState({})
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState<boolean>(false);
  const [showBankValidateModal, setShowValidateModal] = useState<boolean>(false);
  const [employeeToRemove, setEmployeeToRemove] = useState<{fullName: string, employeeId: number}>({
    fullName: '',
    employeeId: 0
  });
  const [showRemoveModal, setRemoveModal] = useState<boolean>(false);
  const [roles, setRoles] = useState<RolesResponse[]>([]);
  const abortControllerRef = useRef(new AbortController());
  const [keyValue, setKeyValue] = useState<number>(0);
  const [error, setError] = useState('');
  const [bankOptions, setBankOptions] = useState<{label: string, value: string}[]>([]);
  const [merchantAccounts, setMerchantAccounts] = useState<{accountNumber: string, bankCode: string}[]>([]);

  const filterRoles = (id: string) => {
    return roles.filter(role => id === role.employee)[0]?.role
  }

  useEffect(() => {
    getMerchant(token, merchantId, abortControllerRef.current.signal).then((res: GetMerchantResponse | ErrorResponse) => {
      setMerchantLoading(true);
      if ('error' in res) {
        setError(res.error);
        setMerchantLoading(false);
      } else {
        setMerchant(res);
        setKeyValue(prev => prev + 1);
        setMerchantLoading(false);
      }
    });

    getRoles(token, merchantId).then((res: RolesResponse[] | ErrorResponse) => {
      if ('error' in res) {
        toast.error(res.error)
      } else {
        setRoles(res)
      }
    });

    getBanks(token).then((res) => {
      if ('error' in res) {
        toast.error(res.error)
      } else {
       const bankValues =  res.data.map((bank: any) => {
          return {
            label: bank.name,
            value: bank.code
          }
        });
        setBankOptions(bankValues);
      }
    });

    getMerchantAccounts(token, merchantId).then((res) => {
      if ('error' in res) {
        toast.error(res.error)
      } else {
        setMerchantAccounts(res.accounts);
      }
    })

  }, [toast]);

  if (error) {
    return <>
      <div>
        <h1>User not Authorised to access this page.</h1>
      </div>
    </>
  } else {
    return (
      <>
      {showAddEmployeeModal && <AddEmployeeModal onClose={() => setShowAddEmployeeModal(false)} />}
      {showRemoveModal && <RemoveEmployeeModal onClose={() => setRemoveModal(false)} employeeId={employeeToRemove.employeeId} fullName={employeeToRemove.fullName} />}
      {showBankValidateModal && <ValidateBankModal onClose={() => setShowValidateModal(false)} banks={bankOptions} />}

        <div className='flex justify-end mt-20 mb-2 gap-2'>
          <div>
            <BiyaButton label='Add Account' onClick={() => setShowValidateModal(true)} />
          </div>
          <div>
            <BiyaButton label='Add Employee' onClick={() => setShowAddEmployeeModal(true)} />
          </div>
        </div>
        <div>
          <h1 className='text-lg font-semibold'>Merchant Accounts</h1>
          <ul>
            {
              merchantAccounts.map((account, i) => (
                <li key={i} className='mb-4'>
                  <h6 className='leading-normal text-sm'>
                    {bankOptions.map((bank) => {
                      if (bank.value === account.bankCode) {
                        return bank.label;
                      }
                    })}
                  </h6>
                  <span>
                    {account.accountNumber}
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="dashboard lg:col-span-7 row-span-1 rounded border border-stroke px-8 pb-5 pt-7 2xl:col-span-8">
          <ul className="flex flex-col pl-0 mb rounded-lg">
            {
              merchant.employees.map((employee, i) => {
                if ( filterRoles(employee.id) && filterRoles(employee.id) === "Owner") {
                 return (
                  <div key={i} className='pt-12 mb-12'>
          <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <div className="border-b px-4 pb-6">
                  <div className="text-center my-4">
                    <div className='h-32 w-32 rounded-full border-4 border-white mx-auto my-4 bg-black'></div>
                      <div className="py-2">
                          <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{`${employee.firstName} ${employee.lastName}`}</h3>
                          <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                              <svg className="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                  <path className=""
                                      d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                              </svg>
                              Owner
                          </div>
                      </div>
                  </div>
                  <div className="flex gap-2 px-2 items-center">
                      <button className="flex-1 rounded-full bg-primary text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                          Edit
                      </button>
                  </div>
              </div>
          </div>
        </div>
                 )
                } else {
                  return (
                    <li key={keyValue + i} className="relative flex p-6 mb-2 border-0 rounded-t-inherit rounded-xl bg-gray-50">
                      <div className="flex flex-col">
                        <h6 className="mb-4 leading-normal text-sm">{`${employee.firstName} ${employee.lastName}`}</h6>
                        <span className='mb-2 leading-tight text-xs'>Employee Id: <span className='font-semibold text-slate-700 sm:ml-2'>{employee.employeeId}</span></span>
                        <span className='mb-2 leading-tight text-xs'>Email Address: <span className='font-semibold text-slate-700 sm:ml-2'>{employee.email ? employee.email : ''}</span></span>
                        <span className='mb-2 leading-tight text-xs'>Telephone: <span className='font-semibold text-slate-700 sm:ml-2'>{employee.phone}</span></span>
                        <span className='mb-2 leading-tight text-xs'>Role: <span className='font-semibold text-slate-700 sm:ml-2'>{
                          roles.length !== 0 &&
                          /* `${roles.filter(role => employee.id === role.employee)[0].role}` */
                          (filterRoles(employee.id))
                          }</span></span>
                      </div>

                      <div className='ml-auto text-right flex items-center'>
                        <a className="relative z-10 inline-block px-4 py-3 mb-0 font-bold text-center text-transparent uppercase align-middle transition-all border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-150 bg-gradient-to-tl from-rose-600 to-rose-400 hover:scale-102 active:opacity-85 bg-x-25 bg-clip-text" onClick={() => {
                          setEmployeeToRemove({
                            fullName: `${employee.firstName} ${employee.lastName}`,
                            employeeId: Number(employee.employeeId)
                          })
                          setRemoveModal(true)
                        }
                          }>
                          <svg width="30px" height="30px" viewBox="0 0 1024 1024" fill="red" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill="" /><path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill="" />
                          </svg>
                        </a>
                      </div>
                    </li>
                  )
                }
            }
            )
            }
          </ul>
        </div>
      </>
    )
  }


}

export default Settings;
