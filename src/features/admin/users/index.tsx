import { useEffect, useState } from "react";
import { usersApi } from "./api";
import { User } from "./types";
import UserTable from "./components/UserTable";
import UserDetail from "./components/UserDetail";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<User | null>(null);

  const refresh = async () => {
    const data = await usersApi.getAll();
    setUsers(data);

    if (selected) {
      const updatedUser = data.find((u) => u.id === selected.id);
      setSelected(updatedUser || null);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleToggleActive = async (user: User) => {
    const newStatus = !(user.active !== false);

    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, active: newStatus } : u))
    );

    if (selected?.id === user.id) {
      setSelected((prev) => (prev ? { ...prev, active: newStatus } : null));
    }

    try {
      await usersApi.updateActive(user.id, newStatus);
    } catch (err) {
      console.error("Failed to toggle user status", err);
      alert("Update failed, reverting changes...");
      await refresh();
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-sm border m-4 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          User Management
        </h1>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition text-sm font-medium dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Refresh List
        </button>
      </div>

      <UserTable
        users={users}
        onSelect={setSelected}
        onToggleActive={handleToggleActive}
      />

      <UserDetail user={selected} />
    </div>
  );
}
