const Button = ({ onClick, children, className = "" }) => (
  <button
    className={`border-gray-300 w-full bg-[#8811d8] text-white rounded-lg py-1 active:bg-[#9a36de] ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
