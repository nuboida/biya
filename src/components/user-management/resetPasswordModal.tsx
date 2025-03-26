import { useState } from "react";
import { InfoModal } from "../ui/info-modal";
import toast from "../ui/toast";

interface ResetPasswordModalProps {
  onClose: () => void;
  token: string;
  name: string;
  id: string;
  onPassword: (state: string) => void;
}

const resetPassword = async (token: string, id: string) => {
  const response = await fetch(`/api/auth/${id}/reset-employee-password`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const ResetPasswordModal = ({
  onClose,
  token,
  id,
  name,
  onPassword
}: ResetPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    setIsLoading(true);

    resetPassword(token, id).then((res) => {
      if ("error" in res) {
        toast({
          message: res.message,
          type: "error",
        });
        setIsLoading(false);
        onClose();
      } else {
        setIsLoading(false);
        onPassword(res.password);
        onClose();
      }
    });
  };

  return (
    <>
      <InfoModal
        title=""
        actionName="Reset"
        onModalClose={() => onClose()}
        action={() => onSubmit()}
        isLoading={isLoading}
      >
        <div className="flex justify-center items-center">
          <div className="w-[90px] h-[90px] flex items-center justify-center">
            <svg
              width="91"
              height="91"
              viewBox="0 0 91 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_127_39711)">
                <rect
                  x="-37.3672"
                  y="0.857422"
                  width="166.649"
                  height="137.051"
                  fill="#3b1de5"
                />
                <g clipPath="url(#clip1_127_39711)">
                  <path
                    d="M48.9674 49.6101V62.5234H32.3008C32.3003 60.4882 32.7656 58.4799 33.6613 56.6524C34.5569 54.8249 35.859 53.2267 37.4678 51.9802C39.0766 50.7337 40.9494 49.872 42.9427 49.4612C44.936 49.0504 46.9969 49.1013 48.9674 49.6101ZM45.6341 47.5234C40.1091 47.5234 35.6341 43.0484 35.6341 37.5234C35.6341 31.9984 40.1091 27.5234 45.6341 27.5234C51.1591 27.5234 55.6341 31.9984 55.6341 37.5234C55.6341 43.0484 51.1591 47.5234 45.6341 47.5234ZM57.3008 53.5001L60.8358 49.9634L63.1941 52.3218L59.6574 55.8568L63.1941 59.3918L60.8358 61.7501L57.3008 58.2134L53.7658 61.7501L51.4074 59.3918L54.9441 55.8568L51.4074 52.3218L53.7658 49.9634L57.3008 53.5001Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_127_39711">
                  <rect
                    width="90"
                    height="90"
                    fill="white"
                    transform="translate(0.632812 0.857422)"
                  />
                </clipPath>
                <clipPath id="clip1_127_39711">
                  <rect
                    width="40"
                    height="40"
                    fill="white"
                    transform="translate(25.6328 25.8574)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold mb-5">Reset Password</h1>
          <p>
            Are you sure you want to reset{" "}
            <span className="font-semibold">{name}</span> password.
          </p>
        </div>
      </InfoModal>
    </>
  );
};
