import { Outlet } from "react-router-dom";

const WrapperPage = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-[url('/BackgroundImage.png')] bg-cover">
      <div className="flex items-center justify-center w-full py-10 mx-10">
        <div className="flex flex-col items-center justify-between w-full max-w-[90%] bg-extrawhite rounded-3xl p-10 max-h-[600px] h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WrapperPage;
