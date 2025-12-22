import { User } from "../types";

interface Props {
  users?: User[] | null;
  onSelect: (user: User) => void;
  onToggleActive: (user: User) => void;
}

export default function UserTable({ users, onSelect, onToggleActive }: Props) {
  const safeUsers = Array.isArray(users) ? users : [];

  if (safeUsers.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 border mt-3 bg-white rounded dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 transition-colors">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border mt-3 bg-white shadow-sm rounded-lg overflow-hidden text-sm dark:bg-gray-800 dark:border-gray-700 transition-colors">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr className="text-left text-gray-700 dark:text-gray-200">
            <th className="p-3 border-b dark:border-gray-600">ID</th>
            <th className="p-3 border-b dark:border-gray-600">Full Name</th>
            <th className="p-3 border-b dark:border-gray-600">Email</th>
            <th className="p-3 border-b dark:border-gray-600">Role</th>
            <th className="p-3 border-b dark:border-gray-600">Status</th>
            <th className="p-3 border-b dark:border-gray-600">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {safeUsers.map((u) => (
            <tr
              key={u.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <td
                className="p-3 font-mono text-gray-500 max-w-[100px] truncate dark:text-gray-400"
                title={String(u.id)}
              >
                {u.id}
              </td>
              <td className="p-3 font-medium text-gray-800 dark:text-gray-200">
                {u.fullName}
              </td>
              <td className="p-3 text-gray-600 dark:text-gray-400">
                {u.email}
              </td>
              <td className="p-3 capitalize">
                <span className="px-2 py-1 bg-gray-100 rounded text-xs border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                  {u.role || "user"}
                </span>
              </td>

              <td className="p-3">
                {u.active !== false ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    Inactive
                  </span>
                )}
              </td>

              <td className="p-3 flex items-center gap-2">
                <button
                  onClick={() => onSelect(u)}
                  className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded hover:bg-blue-100 text-xs font-medium transition-colors dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/40"
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
                      ? "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
                      : "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500"
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
