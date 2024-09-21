import Card from "../../component/Card";
import HeroSec from "../../component/HeroSec";


const Home = () => {
    return (
        <div>
            <HeroSec/>
            <section className="md:px-4 max-w-6xl mx-auto">
                <h3 className="text-4xl font-bold my-8 ">
                Latest Sweepstakes
                </h3>
                <div className="grid md:grid-cols-3">
<div className="col-span-2 grid md:grid-cols-2 grid-cols-1 gap-3">
<Card/>
<Card/>
<Card/>
<Card/>
<Card/>
<Card/>
<Card/>
<Card/>

<div className="col-span-2 flex justify-center items-center my-4">
    <button className="">see all </button>
</div>


</div>
<div></div>
                </div>
            </section>
        </div>
    );
};

export default Home;