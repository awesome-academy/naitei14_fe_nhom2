import { User } from "../types";

interface Props {
  user: User | null;
}

export default function UserDetail({ user }: Props) {
  if (!user) {
    return (
      <div className="p-4 border rounded mt-4 bg-gray-50 text-gray-500 text-center text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 transition-colors">
        Select a user from the table to view details.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded mt-4 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-colors">
      <h2 className="text-lg font-bold mb-4 border-b pb-2 text-gray-800 dark:text-white dark:border-gray-700">
        User Detail #{user.id}
      </h2>

      <div className="space-y-3 text-sm dark:text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <span className="font-semibold text-gray-600 block dark:text-gray-400">
              Full Name:
            </span>
            {user.fullName}
          </p>
          <p>
            <span className="font-semibold text-gray-600 block dark:text-gray-400">
              Email:
            </span>
            {user.email}
          </p>
          <p>
            <span className="font-semibold text-gray-600 block dark:text-gray-400">
              Role:
            </span>
            <span className="capitalize">{user.role}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600 block dark:text-gray-400">
              Joined Date:
            </span>
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-600 block dark:text-gray-400">
              Status:
            </span>
            {user.active !== false ? (
              <span className="text-green-600 font-bold dark:text-green-400">
                Active
              </span>
            ) : (
              <span className="text-red-600 font-bold dark:text-red-400">
                Inactive
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
