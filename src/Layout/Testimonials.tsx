
const Testimonials = () => {
  return (
    <div className="bg-[#f8ffdd] p-8">
      <h2 className="text-2xl font-bold text-center mb-8">Here’s what customers have to say about Gigs App</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="p-4 rounded-lg flex flex-col items-center gap-5">
            <h3 className="text-lg font-semibold">Abdullahi Al-Mansur</h3>
            <p>⭐⭐⭐⭐⭐</p>
            <p className="text-sm mt-2">
              Lorem ipsum dolor sit amet consectetur. Cum nulla aliquet dictumst at consequat sed non semper. Felis dictum sed auctor volutpat accumsan pellentesque sit. A neque lorem ultricies sit condimentum ultrices egestas laoreet. Aliquam ut tincidunt non est.
            </p>
            <a href="#" className="text-blue-600 mt-2 block">Items Delivery</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
