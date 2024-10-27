
import { Link } from 'react-router-dom';
import '../App.css'
const HeroSection: React.FC = () => (
  <>

 
   <section className="hero-sec h-auto lg:flex pb-10 ">
 
        
    <div className='text-[#b3fbff]  md:pt-28 sm:pt-28 lg:pt-10
    font-extrabold text-6xl mx-24 flex flex-col gap-10  w-1/2'>
    <h1 className=''>Need a hand?</h1>
    <h1>Helpers are just <br /> a tap away</h1>
  
  <button className='mt-12 mb-20'>
    <Link  to='/post' className='text-xl bg-sky-400 rounded-xl p-4 text-white mx-24'>Post a task</Link>

    </button>
    </div>
  
    {/* Search input for desktop */}
        <div className=" lg:flex items-center space-x-4 w-full mr-10">
          <input
            type="text"
            placeholder="Find tasks near you"
            className="border text-3xl px-10 py-10 rounded-full focus:outline-none w-full"
          />
          <button className="bg-blue-500 text-white px-8 py-8 rounded-ss-full">Search</button>
        </div>
    </section>
    </>
);

export default HeroSection;
