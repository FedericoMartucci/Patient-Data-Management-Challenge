import { Outlet } from "react-router-dom";

const WrapperPage = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-[url('/BackgroundImage.png')] bg-cover">
      <div className="flex items-center justify-center w-full py-[40px] mx-10">
        <Outlet />
      </div>
    </div>
  );
};

export default WrapperPage;
