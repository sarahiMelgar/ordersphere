function StatCard({
  icon,
  title,
  value,
  subtitle
}) {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        shadow-sm
        border
        border-slate-200
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h2 className="text-5xl font-bold mt-2 text-slate-800">
            {value}
          </h2>

          <p className="text-green-500 text-sm mt-2">
            {subtitle}
          </p>

        </div>

        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-orange-100
            flex
            items-center
            justify-center
            text-2xl
          "
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

export default StatCard;