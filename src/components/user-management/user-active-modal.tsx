import clsx from "clsx";
import { InfoModal } from "../ui/info-modal";
import { useState } from "react";
import toast from "../ui/toast";
import { useRouter } from "next/navigation";

interface UserActiveModalProps {
  onClose: () => void;
  token: string;
  merchantId: string;
  id: string;
  active: boolean;
  name: string;
}

const deactivate = async (
  token: string,
  merchantId: string,
  request: {employeeId: string}
) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/deactivate-employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });
    return await response.json()
  } catch (error) {
    throw new Error(String(error))
  }
}

const activate = async (
  token: string,
  merchantId: string,
  request: {employeeId: string}
) => {
  try {
    const response = await fetch(`/api/merchants/${merchantId}/activate-employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });
    return await response.json()
  } catch (error) {
    throw new Error(String(error))
  }
}

export const UserActiveModal = ({
  onClose,
  token,
  merchantId,
  id,
  active,
  name,
}: UserActiveModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const userMessage = (active: boolean, name: string) => {
    if (active) {
      return (
        <p>
          <span className="font-bold">{name}</span> will not be available for
          operations.
        </p>
      );
    } else {
      return (
        <p>
          <span className="font-bold">{name}</span> will be available for
          operations.
        </p>
      );
    }
  };

  const onSubmit = () => {
    setIsLoading(true);

    if (active) {
      deactivate(token, merchantId, {employeeId: id}).then(res => {
        if ("error" in res) {
          toast({
            message: res.message,
            type: "error"
          });
          setIsLoading(false);
        } else {
          toast({
            message: "Employee Deactivated",
            type: "success"
          });
          setIsLoading(false);
          router.refresh();
          onClose()
        }
      })
    } else {
      activate(token, merchantId, {employeeId: id}).then(res => {
        if ("error" in res) {
          toast({
            message: res.message,
            type: "error"
          });
          setIsLoading(false);
        } else {
          toast({
            message: "Employee activated",
            type: "success"
          });
          setIsLoading(false);
          router.refresh();
          onClose()
        }
      })
    }

  }

  return (
    <InfoModal
      title=""
      actionName={active ? "Deactivate" : "Activate"}
      onModalClose={() => onClose()}
      action={() => onSubmit()}
      isLoading={isLoading}
    >
      <div className="flex justify-center items-center">
        <div
          className={clsx(
            "w-[90px] h-[90px] flex items-center justify-center",
            active && "bg-red-500",
            !active && "bg-green-500"
          )}
        >
          {active ? (
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
                  fill="#FF5C5C"
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
          ) : (
            <svg
              width="91"
              height="91"
              viewBox="0 0 91 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_127_40186)">
                <rect
                  x="-37.5391"
                  y="0.855469"
                  width="166.649"
                  height="137.051"
                  fill="#26D159"
                />
                <g clipPath="url(#clip1_127_40186)">
                  <path
                    d="M47.1289 49.5766V62.8066H32.1289C32.1287 60.9149 32.5311 59.0447 33.3094 57.3204C34.0876 55.5961 35.2238 54.0572 36.6426 52.8058C38.0614 51.5544 39.7302 50.6193 41.5382 50.0626C43.3462 49.5058 45.252 49.3402 47.1289 49.5766ZM45.4622 47.8066C39.9372 47.8066 35.4622 43.3316 35.4622 37.8066C35.4622 32.2816 39.9372 27.8066 45.4622 27.8066C50.9872 27.8066 55.4622 32.2816 55.4622 37.8066C55.4622 43.3316 50.9872 47.8066 45.4622 47.8066ZM55.1172 59.33L61.0089 53.4383L63.3672 55.795L55.1172 64.045L49.2239 58.1516L51.5822 55.795L55.1156 59.33H55.1172Z"
                    fill="white"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_127_40186">
                  <rect
                    width="90"
                    height="90"
                    fill="white"
                    transform="translate(0.460938 0.855469)"
                  />
                </clipPath>
                <clipPath id="clip1_127_40186">
                  <rect
                    width="40"
                    height="40"
                    fill="white"
                    transform="translate(25.4609 26.1406)"
                  />
                </clipPath>
              </defs>
            </svg>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold mb-5">
          {active ? "Deactivate Host" : "Activate Host"}
        </h1>
        {userMessage(active, name)}
        <p className="text-sm mt-1">
          Are you sure you want to {active ? "deactivate" : "activate"} this
          host?
        </p>
      </div>
    </InfoModal>
  );
};
