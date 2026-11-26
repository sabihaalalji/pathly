function ProviderStats({ total, active, expired }) {
const stats = [
{label: "Total Opportunities", value: total, color: "border-[#0F766E]", },
{ label: "Active Opportunities", value: active, color: "border-[#134E4A]", },
{ label: "Expired Opportunities", value: expired, color: "border-[#FB7185]",},
];

return (
<div className="grid grid-cols-3 gap-4">
     {stats.map((stat) => (
        <div key={stat.label} className={`rounded-xl border-l-4 ${stat.color} bg-white p-6 shadow-sm`}>
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          <h3 className="mt-2 text-3xl font-bold text-[#042F2E]"> {stat.value}</h3>
        </div>
      ))}
    </div>
  );
}

export default ProviderStats;