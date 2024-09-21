import cover from "../img/thanksgiving-country-dinner-background.jpg";
import FeaturedCard from "./FeaturedCard";

const HeroSec = () => {
  return (
    <div
      className="bg-gradient-to-r from-[#F79420] to-[#FDD950] py-12 lg:py-12"
     
    >
      <div className="container mx-auto px-5 max-w-7xl w-auto">
        {/* Hero Title */}
        <h2 className="text-xl font-bold text-headline mb-6 lg:text-4xl">
          Featured Sweepstakes
        </h2>

        <div className="flex flex-col lg:flex-row gap-1">
          {/* Left Section - Larger */}
          <div
            className="relative bg-white flex flex-col justify-center p-6 lg:w-[65%] w-full shadow-lg"
            style={{
              backgroundImage: `url(${cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              // width: "65%", 
            }}
          >
            <div>
            

              <div className="text-lg w-full space-y-6  text-headline lg:text-5xl font-extrabold">
              <div className="font-semibold text-sm ">
                <span className="bg-[#ffffffd0]  p-2 text-lg">Featured</span>
              </div>
                <h3 className="">
                  <span className="bg-[#fffd]">Win $10,000 for</span>
                </h3>
                <h3 className="mb-2">
                  <span className="bg-[#fffd]">Thanksgiving</span>
                </h3>
                <h3 className="mb-2">
                  <span className="bg-[#fffd]">Essentials 2023!</span>
                </h3>
              </div>
            </div>

            <button className="text-start text-primary mt-10 font-medium">
              <span className="bg-[#ffffffd1] p-4">Read more</span>
            </button>
          </div>

          {/* Right Section - Smaller */}
          <div className="grid lg:grid-cols-1 md:grid-cols-2 lg:gap-1 gap-3 lg:w-[35%] w-full" >
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSec;
