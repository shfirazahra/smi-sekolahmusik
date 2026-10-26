export default function MemberCard({ member }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-sm">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="h-14 w-14 rounded-full bg-indigo-100 object-cover"
        />
      ) : (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-lg font-bold text-white">
          {member.name[0]}
        </div>
      )}
      <div className="min-w-0">
        <h4 className="truncate text-sm font-bold text-slate-900">{member.name}</h4>
        {member.department && <p className="truncate text-xs font-semibold text-indigo-600">{member.department}</p>}
        <p className="truncate text-xs text-slate-500">{member.city}</p>
      </div>
    </div>
  );
}
