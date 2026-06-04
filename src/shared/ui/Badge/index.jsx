const Badge = ({ children, className = '' }) => {
  return (
    <span className={`rounded-full bg-emerald-50 px-4 py-2 text-sm text-lime-700 ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
