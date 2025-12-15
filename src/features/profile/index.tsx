import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProfileForm from "./components/ProfileForm";

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Cần đăng nhập
          </h1>
          <p className="text-gray-600">
            Vui lòng đăng nhập để xem và chỉnh sửa hồ sơ.
          </p>
        </div>
      </div>
    );
  }

  // Check if the userId from URL matches the current user's ID
  if (userId !== user.id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không có quyền truy cập
          </h1>
          <p className="text-gray-600">
            Bạn chỉ có thể xem hồ sơ của chính mình.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white max-w-6xl mx-auto rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Hồ sơ cá nhân
              </h1>
              <p className="text-gray-600 text-lg">
                Cập nhật thông tin cá nhân của bạn
              </p>
            </div>
          </div>
        </div>

        <ProfileForm />
      </div>
    </div>
  );
};

export default ProfilePage;
