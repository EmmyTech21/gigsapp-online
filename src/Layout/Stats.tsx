const Stats = () => {
  return (
    <div className="bg-[#f8ffdd] flex justify-around py-6 text-2xl">
      <StatItem label="Items delivered" value="15,000 +" />
      <StatItem label="Paintings" value="15,000 +" />
      <StatItem label="Outdoor errands" value="15,000 +" />
      <StatItem label="Homes cleaned" value="15,000 +" />
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="text-center">
    <p className="text-gray-600">{label}:</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);

export default Stats;
