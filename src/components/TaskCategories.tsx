const categories = [
  { name: 'Repair', icon: '🛠' },
  { name: 'Delivey', icon: '🚚' },
  { name: 'Cleaning', icon: '🧹' },
  { name: 'Home Repairs', icon: '🛋' },
  { name: 'Painting', icon: '🖌' },
  // { name: 'Personal errands', icon: '📃' },

];

const Navbar = () => {
  return (
    <nav className="flex justify-around p-4 bg-blue-50 text-gray-700">
      {categories.map((category) => (
        <Tab key={category.name} icon={category.icon} label={category.name} />
      ))}
    </nav>
  );
};

const Tab = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex flex-col items-center cursor-pointer">
    <div className="text-xl">{icon}</div>
    <span>{label}</span>
  </div>
);

const TaskCategories: React.FC = () => (
  <section className="py-8 bg-[#f1eff2]">
    {/* <h2 className="text-center text-xl font-bold mb-6">Select A Task Category</h2> */}
    <div className="flex justify-around space-x-4 ">
      {categories.map((cat) => (
        <div key={cat.name} className="text-center hover:text-cyan-400">
          <div className="text-3xl mb-2">{cat.icon}</div>
          <div>{cat.name}</div>
        </div>
      ))}
    </div>
  </section>
);

export default TaskCategories;
export { Navbar };
