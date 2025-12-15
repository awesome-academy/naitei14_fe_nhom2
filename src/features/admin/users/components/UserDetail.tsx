import React from "react";
import { User } from "../types";

interface Props {
  user: User | null;
}

export default function UserDetail({ user }: Props) {
  if (!user) {
    return (
      <div className="p-4 border rounded mt-4 bg-gray-50 text-gray-500 text-center text-sm">
        Select a user from the table to view details.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded mt-4 bg-white shadow-sm">
      <h2 className="text-lg font-bold mb-4 border-b pb-2 text-gray-800">
        User Detail #{user.id}
      </h2>

      <div className="space-y-3 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p>
            <span className="font-semibold text-gray-600 block">
              Full Name:
            </span>
            {user.fullName}
          </p>
          <p>
            <span className="font-semibold text-gray-600 block">Email:</span>
            {user.email}
          </p>
          <p>
            <span className="font-semibold text-gray-600 block">Role:</span>
            <span className="capitalize">{user.role}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-600 block">
              Joined Date:
            </span>
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <span className="font-semibold text-gray-600 block">Status:</span>
            {user.active !== false ? (
              <span className="text-green-600 font-bold">Active</span>
            ) : (
              <span className="text-red-600 font-bold">Inactive</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
