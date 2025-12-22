import { User } from "@/types/user";

interface Props {
  users?: User[] | null;
  onSelect: (user: User) => void;
  onToggleActive: (user: User) => void; // Truyền cả user để lấy trạng thái cũ dễ hơn
}

export default function UserTable({ users, onSelect, onToggleActive }: Props) {
  const safeUsers = Array.isArray(users) ? users : [];

  if (safeUsers.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 border mt-3 bg-white rounded">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border mt-3 bg-white shadow-sm rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Full Name</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Role</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          {safeUsers.map((u) => (
            <tr
              key={u.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td
                className="p-3 font-mono text-gray-500 max-w-[100px] truncate"
                title={String(u.id)}
              >
                {u.id}
              </td>
              <td className="p-3 font-medium text-gray-800">{u.fullName}</td>
              <td className="p-3 text-gray-600">{u.email}</td>
              <td className="p-3 capitalize">
                <span className="px-2 py-1 bg-gray-100 rounded text-xs border">
                  {u.role || "user"}
                </span>
              </td>

              <td className="p-3">
                {/* Giả sử active=undefined hoặc true là Active */}
                {u.active !== false ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Inactive
                  </span>
                )}
              </td>

              <td className="p-3 flex items-center gap-2">
                <button
                  onClick={() => onSelect(u)}
                  className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 text-xs font-medium"
                >
                  View
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleActive(u);
                  }}
                  className={`px-3 py-1 rounded text-xs font-medium text-white shadow-sm transition-colors ${
                    u.active !== false
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {u.active !== false ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
