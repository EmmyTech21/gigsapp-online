import stats from '../images/service.png'

export default function Service() {
  return (
    <main className="bg-yellow-400 p-6 ">
        <div className=' flex relative items-center md:mx-28 sm:mx-auto'>
          <div className="w-1/2 md:w-auto p-4 relative z-10" style={{ marginRight: '-100px' }}>
        <div className="bg-white shadow-lg rounded-md  p-6 relative z-20 md:w-auto">
          <h2 className=" font-semibold mb-4 text-3xl">Deliveries</h2>
          <p className="text-gray-700 w-1/2 text-2xl">
            Lorem ipsum dolor sit amet consectetur. Neque tellus ut ullamcorper ornare amet.
          </p>
          <p className="mt-4 text-gray-700 text-2xl w-72">
            Lorem ipsum dolor sit amet consectetur. Neque tellus ut ullamcorper ornare amet.
          </p>
        </div>
      </div>

      {/* This is the image div */}
      <div className=" w-auto">
        <img
          src={stats}
          alt="Delivery person"
          className="rounded-md relative z-0"
        />
      </div>
        </div>

    </main>
  );
}


