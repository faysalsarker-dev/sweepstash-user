const Card = () => {
    return (
      <div className="bg-white rounded-md shadow-lg ">
        {/* Image Section */}
        <div>
          <img
            src="https://sweepstash.volstrek.com/wp-content/uploads/wolverine-world-wide-merrell-x-jeep-sweepstakes.webp"
            alt="Sweepstakes"
            className="w-full object-cover"
          />
        </div>
  
        {/* Text Content */}
        <div className="p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Win a $10,000 Ashley Furniture shopping spree!
          </h3>
          <button className="text-activeLink underline underline-offset-4 font-extrabold">
            Read more
          </button>
        </div>
      </div>
    );
  };
  
  export default Card;
  