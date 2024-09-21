const FeaturedCard = () => {
  return (
    <div className="flex md:flex-row flex-col items-center  shadow-md md:overflow-hidden lg:w-[410px]   mx-auto   lg:h-[110px]">
      <div className="md:w-[40%] w-full h-full ">
        <img
          src="https://sweepstash.volstrek.com/wp-content/uploads/wolverine-world-wide-merrell-x-jeep-sweepstakes.webp"
          alt="Visa Gift Card Giveaway"
          className="object-fill w-full h-full"
        />
      </div>
      <div className="p-4 md:w-[60%] w-full h-full bg-white">
        <span className="border border-gray-300 text-gray-600 px-2 py-1 text-xs font-semibold mb-2 inline-block">
          Featured
        </span>
        <h2 className="text-sm sm:text-base lg:text-sm font-semibold text-gray-800">
          Win $1,000 Visa Gift Card to spend towards your holiday party!
        </h2>
      </div>
    </div>
  );
};

export default FeaturedCard;
