"use client";

import { useState } from "react";
import { ResetPasswordModal } from "./resetPasswordModal";
import { PasswordInfoModal } from "./passwordInfoModal";

interface ResetPasswordButtonProps {
  token: string;
  employeeId: string;
  name: string;
}

export const ResetPasswordButton = ({
  token,
  employeeId,
  name,
}: ResetPasswordButtonProps) => {
  const [resetModal, setResetModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [newPassword, setnewPassword] = useState('')

  return (
    <>
      {resetModal && (
        <ResetPasswordModal
          onClose={() => setResetModal(false)}
          token={token}
          id={employeeId}
          name={name}
          onPassword={(isNew) => {
            setnewPassword(isNew);
            setPasswordModal(true)
          }}
        />
      )}
      {passwordModal && (
        <PasswordInfoModal
          onClose={() => setPasswordModal(false)}
          password={newPassword}
        />
      )}
      <button
        className="text-red-800"
        onClick={() => {
          setResetModal(true);
        }}
      >
        Reset Password
      </button>
    </>
  );
};
