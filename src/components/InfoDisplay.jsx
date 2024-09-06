const InfoDisplay = ({ label, icon: Icon, value, className = "" }) => (
  <div className={`w-[45%] flex flex-col items-center ${className}`}>
    <p className="text-lg self-start flex items-center">
      {Icon && <Icon className="text-[#8811d8] mr-1" />}
      <span>{label}</span>
    </p>
    <span className="text-[#8811d8] font-medium w-full p-2 border border-gray-300 rounded-lg mt-2">
      {value}
    </span>
  </div>
);

export default InfoDisplay;
