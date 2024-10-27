import React from 'react';
import { Link } from 'react-router-dom';
import headshort from '../images/ser-headshot.png' 
interface TaskCardProps {
  name: string;
  price: string;
  location: string;
  summary: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ name, price, location, summary }) => {
  return (
    <>
   
    <section className="border p-6 rounded-lg h-auto gap-10 shadow-md sm:flex-col items-center flex lg:flex-row justify-between  bg-white">
      <div className="  mx-10 items-center flex-col  w-full">
        <img
          src={headshort}
          alt={name}
          className="rounded-full  h-20 object-cover mr-4"
        />
        <h3 className="font-semibold">{name}</h3>
         </div>
        <div className=' text-2xl leading-10 '>
        <h1 className='text-center p-6 font-bold' >TASK SUMMARY</h1>
        <p className=' '>{summary}</p>
        <Link to="/details" className=' text-center block' >
        <button className="mt-4 bg-sky-400 rounded-full  text-white  py-2 px-4">
            View details
          </button>
        </Link>
      </div>

      <div className=' flex flex-col gap-16 lg:w-full text-2xl'>
        <p className="font-bold">{price}</p>
        <p className=" text-gray-500 text-2xl">{location}</p>
         
      </div>
     
    </section>
  
     </>
  );
};

export default TaskCard;
