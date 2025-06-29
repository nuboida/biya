import { convertKoboToNaira } from "@/lib/utils";
import { Button } from "../ui/button";

interface WalletBalanceWidgetProps {
  balance: number | string;
  role: string;
}

export const WalletBalanceWidget = ({ balance, role }: WalletBalanceWidgetProps) => {
  return (
    <>
      {typeof balance == "string" ? (
        <div>
          <h1 className="font-medium text-2xl">Wallet</h1>
          <p className="w-[80%] pb-4">
            No wallet has been created. Perform a transaction to activate your wallet.
          </p>
          <Button size="default" className="bg-accent text-white">
            Create Wallet
          </Button>
        </div>
      ) : (
        <div>
        <div className="flex justify-between items-center gap-4">
          <h1 className="font-medium text-2xl">{role === 'Owner' ? "Wallet Balance" : "Total Request Amount"}</h1>
          <div>
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.691406"
                y="0.398438"
                width="30"
                height="30"
                fill="white"
              />
              <g clipPath="url(#clip0_127_35920)">
                <path
                  d="M8.19141 13.1484H22.4414C22.6403 13.1484 22.8311 13.2275 22.9717 13.3681C23.1124 13.5088 23.1914 13.6995 23.1914 13.8984V21.3984C23.1914 21.5974 23.1124 21.7881 22.9717 21.9288C22.8311 22.0694 22.6403 22.1484 22.4414 22.1484H8.94141C8.74249 22.1484 8.55173 22.0694 8.41108 21.9288C8.27042 21.7881 8.19141 21.5974 8.19141 21.3984V13.1484ZM8.94141 8.64844H20.1914V11.6484H8.19141V9.39844C8.19141 9.19953 8.27042 9.00876 8.41108 8.86811C8.55173 8.72746 8.74249 8.64844 8.94141 8.64844ZM17.9414 16.8984V18.3984H20.1914V16.8984H17.9414Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_127_35920">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(6.69141 6.39844)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
          <div>
            <h1 className="text-7xl">
              &#8358;
              <span className="font-mono text-6xl inline-block pl-1">
                {typeof balance !== "number"
                  ? "--"
                  : convertKoboToNaira(balance)}
              </span>
            </h1>
          </div>
        </div>
      )}
    </>
  );
};
