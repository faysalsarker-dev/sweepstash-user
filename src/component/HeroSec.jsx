import cover from "../img/thanksgiving-country-dinner-background.jpg";

const HeroSec = () => {
  return (
    <div
      className="bg-gradient-to-r from-[#F79420] to-[#FDD950] py-12 lg:py-12"
      style={{ minHeight: "calc(100vh - 212px)" }}
    >
      <div className="container mx-auto px-5 max-w-7xl">
        {/* Hero Title */}
        <h2 className="text-xl font-bold text-headline mb-6 lg:text-4xl">
          Featured Sweepstakes
        </h2>

        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Left Section */}
          <div
            className="relative bg-white space-y-4 pr-7 flex flex-col py-8 rounded-lg shadow-lg mb-6 lg:mb-8 lg:w-3/4 lg:mx-auto lg:p-10"
            style={{
              backgroundImage: `url(${cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <span className="bg-[#fff9] px-2 py-1 font-semibold text-sm  rounded-lg">
              Featured
            </span>
            <div className="text-lg w-full  text-headline lg:text-5xl font-extrabold">
              <h3 className="bg-[#fffd]  py-1 mb-2">
               Win $10,000 for </h3>  <h3 className="mb-2 bg-[#fffd]  py-1 " >Thanksgiving</h3> <h3  
                className="bg-[#fffd]  py-1 mb-2">Essentials 2023!</h3>
              
            </div>
            <button className="text-start text-primary bg-[#fff9] px-3 py-2  font-medium">
              Read more
            </button>
          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-4">
            {/* Each smaller content box */}
            <div className="bg-white p-4 rounded-lg shadow-lg lg:w-full lg:p-6">
              <p className="text-lg text-gray-700 font-semibold lg:text-xl">
                Win Your Trip to see Barry Manilow!
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg lg:w-full lg:p-6">
              <p className="text-lg text-gray-700 font-semibold lg:text-xl">
                Win $1,000 Visa Gift Card to spend towards your holiday party!
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg lg:w-full lg:p-6">
              <p className="text-lg text-gray-700 font-semibold lg:text-xl">
                Win a 2023 Jeep Rubicon!
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg lg:w-full lg:p-6">
              <p className="text-lg text-gray-700 font-semibold lg:text-xl">
                Win a custom Ford F250 Truck and a lot more!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSec;
