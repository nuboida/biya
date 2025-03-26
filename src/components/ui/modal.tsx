import { cn } from "@/lib/utils";
import { Icons } from "./Icons";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  action?: () => void;
  onModalClose: () => void;
  actionName?: string;
  isLoading?: boolean;
}

export function Modal({
  children,
  className,
  title,
  subtitle,
  action,
  actionName = "Submit",
  onModalClose,
  isLoading,
  disabled = false,
  ...props
}: ModalProps) {
  return (
    <div className={cn("fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm flex z-40", className)} {...props}>
      <div className="fixed p-4 w-full max-w-2xl max-h-full z-50 2xl:top-[22%] 2xl:left-[32%] lg:top-[5%] lg:left-[25%]">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal"
                    onClick={onModalClose}
                  >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                      </svg>
                      <span className="sr-only">Close modal</span>
                  </button>
                  {subtitle && <p className="m-0 mt-3 text-base">{subtitle}</p>}
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                { children }
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={disabled}
                onClick={action}
                >{
                  isLoading ? (<Icons.spinner className="h-4 w-4 animate-spin"/>) : actionName
                }</button>
              </div>
          </div>
      </div>
    </div>
  )
}
