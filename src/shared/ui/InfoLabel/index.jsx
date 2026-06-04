const InfoLabel = ({ icon: Icon, label, value }) => {
  if (!label) {
    return (
      <div className="flex items-center gap-2">
        <Icon className="size-5 text-slate-700" aria-hidden="true" />
        <span className="text-sm font-medium text-slate-400">{value}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon className="size-5 text-slate-700" aria-hidden="true" />
        <div className="text-sm text-slate-700">{label}</div>
      </div>
      <span className="text-sm font-medium text-slate-400">{value}</span>
    </div>
  );
};

export default InfoLabel;
