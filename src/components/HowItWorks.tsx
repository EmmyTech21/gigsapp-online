import howitwork from '../images/howit-work.png'

const HowItWorks: React.FC  = () => {
  return (
     <main className='bg-yellow-300 p-6 '> 
    <div className="flex flex-col md:flex-row mx-auto relative p-8 items-center justify-around">
     

     
      <div className="md:w-1/2 p-4 bg-white rounded-lg shadow mx-auto relative z-10">
        <h2 className="text-xl font-bold mb-4">How it works</h2>
        <div className="list-decimal p-6 relative z-20 ml-20">
          <p className="mb-6 ">
  <span className='bg-[#b2fbff] p-4 rounded-full mr-2  text-2xl'>1</span><strong>Post Your Task:</strong> Simply tell us what you need, and we’ll help you find the right person nearby.
          </p>
          <p className="mb-6">
            <span className='bg-[#ffeb50] p-4 mr-2 rounded-full'>1</span><strong>Find Your Helper:</strong> We’ll connect you with trusted helpers who can get your job done.
          </p>
          <p>
             <span className='bg-[#b2fbff] p-4 mr-2  rounded-full'>1</span> <strong>Pay with Ease:</strong> Negotiate, track their progress, and pay securely when you’re satisfied.
          </p>
        </div>
      </div>
      <div className="md:w-1/ mx-auto">
        <img src={howitwork} alt="How it works" className="rounded-lg shadow relative z-0" />
      </div>
    
    </div>
       </main>
  );
};

export default HowItWorks;
