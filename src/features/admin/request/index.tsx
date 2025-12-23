import { useEffect, useState } from "react";
// SỬA IMPORT: Trỏ về file api cục bộ
import { requestApi } from "./api";
import { Request } from "./types";

export default function RequestPage() {
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await requestApi.getAll();
      setData(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error("Failed to load request", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDecision = async (id: number | string, accepted: boolean) => {
    try {
      await requestApi.updateStatus(id, accepted);
      load();
    } catch (error) {
      alert("Error updating request: " + error);
    }
  };

  const handleReset = async (id: number | string) => {
    if (!window.confirm("Reset this request to initial state?")) return;

    try {
      await requestApi.reset(id);
      load();
    } catch (error) {
      alert("Error resetting request: " + error);
    }
  };

  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="p-4 bg-white rounded shadow-sm border m-4 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Customer Requests
        </h1>
        <button
          onClick={load}
          className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition text-sm font-medium dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Refresh Data
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Loading data...
        </div>
      ) : safeData.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded border border-dashed dark:border-gray-700">
          No requests found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left dark:text-gray-300">
            <thead className="bg-gray-100 text-gray-700 uppercase font-semibold dark:bg-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3 border-b dark:border-gray-600">ID</th>
                <th className="p-3 border-b dark:border-gray-600">User</th>
                <th className="p-3 border-b dark:border-gray-600">Email</th>
                <th className="p-3 border-b dark:border-gray-600">Request</th>
                <th className="p-3 border-b dark:border-gray-600">Created</th>
                <th className="p-3 border-b text-center dark:border-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {safeData.map((f) => (
                <tr
                  key={f.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b last:border-0 dark:border-gray-700"
                >
                  <td className="p-3 font-mono text-gray-500 dark:text-gray-400">
                    {f.id}
                  </td>
                  <td className="p-3 font-medium text-gray-800 dark:text-gray-200">
                    {f.userName}
                  </td>
                  <td className="p-3 text-blue-600 dark:text-blue-400">
                    {f.email}
                  </td>

                  <td
                    className="p-3 max-w-xs truncate text-gray-600 dark:text-gray-300"
                    title={f.message}
                  >
                    {f.message}
                  </td>

                  <td className="p-3 text-gray-500 dark:text-gray-400">
                    {new Date(f.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center space-x-2 whitespace-nowrap">
                    {!f.replied ? (
                      <>
                        <button
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition shadow-sm dark:bg-green-600 dark:hover:bg-green-500"
                          onClick={() => handleDecision(f.id, true)}
                        >
                          Accept
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition shadow-sm dark:bg-red-600 dark:hover:bg-red-500"
                          onClick={() => handleDecision(f.id, false)}
                        >
                          Deny
                        </button>
                      </>
                    ) : (
                      <span
                        className={`font-bold px-2 py-1 rounded text-xs uppercase ${
                          f.accepted
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {f.accepted ? "Accepted" : "Denied"}
                      </span>
                    )}

                    <button
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition shadow-sm ml-2 dark:bg-gray-600 dark:hover:bg-gray-500"
                      onClick={() => handleReset(f.id)}
                    >
                      Reset
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
