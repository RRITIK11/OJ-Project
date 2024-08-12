"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserInterface } from "@/models/user.model";
import { formatDistanceToNow } from "date-fns";

function Page() {
  const [usersData, setUsersData] = useState<UserInterface[]>([]);
  const [roleChanges, setRoleChanges] = useState<{ [key: string]: { isAdmin: boolean; isModerator: boolean } }>({});

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/admin/users");
      setUsersData(response.data.allUser);

      // Initialize roleChanges state with the existing roles of users
      const initialRoleChanges = response.data.allUser.reduce((acc: any, user: any) => {
        acc[user._id] = { isAdmin: user.roles.isAdmin, isModerator: user.roles.isModerator };
        return acc;
      }, {});
      setRoleChanges(initialRoleChanges);
      toast.success("Users fetched successfully");
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast.error(
        "Failed to fetch users: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteHandler = async (username: string) => {
    await toast.promise(axios.post("/api/admin/users/delete", { username }), {
      loading: "Deleting user...",
      success: "User deleted successfully",
      error: "Deletion failed",
    });
    fetchUsers();
  };

  const roleChangeHandler = async (userId: string, isAdmin: boolean, isModerator: boolean) => {
    await toast.promise(
      axios.post("/api/admin/users/role", { userId, isAdmin, isModerator }),
      {
        loading: "Changing role...",
        success: "Role changed successfully",
        error: "Role update failed",
      }
    );
    fetchUsers();
  };

  const handleRoleChange = (userId: string, role: string, isChecked: boolean) => {
    setRoleChanges(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [role]: isChecked,
      }
    }));
  };

  const saveChanges = (userId: string) => {
    const { isAdmin, isModerator } = roleChanges[userId] || { isAdmin: false, isModerator: false };
    roleChangeHandler(userId, isAdmin, isModerator);
  };

  return (
    <div className="bg-[#40534C] flex flex-col grow rounded-xl overflow-hidden w-4/5 mx-auto mb-4">
      <header className="text-xl text-center bg-[#1A3636] p-2">
        All Users
      </header>
      <header className="text-md font-bold bg-[#d6bd98] p-2 flex border-b-2 border-[#677D6A] text-black">
        <div className="w-[5%] flex items-center justify-center">S.No</div>
        <div className="w-[25%] flex items-center justify-center">Username</div>
        <div className="w-[25%] flex items-center justify-center">E-mail</div>
        <div className="w-[15%] flex items-center justify-center">First Name</div>
        <div className="w-[15%] flex items-center justify-center">Last Name</div>
        <div className="w-[15%] flex items-center justify-center">Created At</div>
        <div className="w-[15%] flex items-center justify-center">Updated At</div>
        <div className="w-[10%] flex items-center justify-center">Admin</div>
        <div className="w-[10%] flex items-center justify-center">Moderator</div>
        <div className="w-[10%] flex items-center justify-center">Save</div>
        <div className="w-[10%] flex items-center justify-center">Delete</div>
      </header>
      <div className="grow overflow-y-auto">
        <div className="h-full flex flex-col">
          {usersData?.map((user: any, index: number) => {
            const createdAt = new Date(user.createdAt);
            const updatedAt = new Date(user.updatedAt);
            const createdAtFormatted = formatDistanceToNow(createdAt, { addSuffix: true });
            const updatedAtFormatted = formatDistanceToNow(updatedAt, { addSuffix: true });

            return (
              <div
                className="flex mx-4 text-sm gap-2 border-b-[1px] border-[#677D6A] items-center p-1"
                key={user._id}
              >
                <div className="w-[5%] text-center">{index + 1}</div>
                <div className="w-[25%] truncate text-center">{user.username}</div>
                <div className="w-[25%] truncate text-center">{user.email}</div>
                <div className="w-[15%] text-center">{user.firstname || "-"}</div>
                <div className="w-[15%] text-center">{user.lastname || "-"}</div>
                <div className="w-[15%] text-center">{createdAtFormatted}</div>
                <div className="w-[15%] text-center">{updatedAtFormatted}</div>
                <div className="w-[10%] flex justify-center">
                  <input
                    className="w-5 h-5"
                    type="checkbox"
                    checked={roleChanges[user._id]?.isAdmin ?? user.roles.isAdmin}
                    onChange={(e) => handleRoleChange(user._id, 'isAdmin', e.target.checked)}
                  />
                </div>
                <div className="w-[10%] flex justify-center">
                  <input
                    className="w-5 h-5"
                    type="checkbox"
                    checked={roleChanges[user._id]?.isModerator ?? user.roles.isModerator}
                    onChange={(e) => handleRoleChange(user._id, 'isModerator', e.target.checked)}
                  />
                </div>
                <div className="w-[10%] flex justify-center">
                  <button
                    className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:bg-[#2A4C4C] hover:font-bold"
                    onClick={() => saveChanges(user._id)}
                  >
                    Save
                  </button>
                </div>
                <div className="w-[10%] flex justify-center">
                  <button
                    className="bg-[#1A3636] p-1 px-4 rounded-xl text-white hover:bg-[#2A4C4C] hover:font-bold"
                    onClick={() => deleteHandler(user.username)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Page;
