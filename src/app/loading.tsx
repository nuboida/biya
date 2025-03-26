import { Icons } from "@/components/ui/Icons";

const Loading = () => {
  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 bg-white opacity-40">
      <div className="flex justify-center items-center h-full">
        <Icons.spinner className="w-14 h-14 animate-spin text-blue-800" />
      </div>
    </div>
  );
};

export default Loading;
