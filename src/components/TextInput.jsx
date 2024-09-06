// Reusable TextInput Component with className Prop
const TextInput = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  className = "",
}) => (
  <div className={`w-[45%] ${className}`}>
    <label className="block text-lg mb-2 flex items-center">
      {Icon && <Icon className="text-[#8811d8] mr-1" />}
      <span>{label}</span>
    </label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-300"
    />
  </div>
);

export default TextInput;
