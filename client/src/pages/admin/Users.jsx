import { useEffect, useState } from "react";

import { getAllUsers } from "../../api/userApi";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getAllUsers();

    if (res.Users) {
      setUsers(res.Users);
    }
  };

  return (
    <div>

      <div className="mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold">
          Users
        </h1>

        <p className="text-gray-500 mt-1">
          Manage registered users
        </p>

      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">

        <table className="w-full min-w-[750px]">

          <thead className="bg-gray-100">
            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="text-left">
                Email
              </th>

              <th className="text-left">
                Phone
              </th>

              <th className="text-left">
                Role
              </th>

              <th className="text-left">
                Joined
              </th>

            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.phoneNumber || "-"}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.userRole === 1
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.userRole === 1
                      ? "Admin"
                      : "Customer"}
                  </span>
                </td>

                <td>
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">

        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-sm p-5"
          >

            <div className="flex justify-between items-start gap-4">

              <div className="min-w-0">

                <h2 className="font-bold text-lg">
                  {user.name}
                </h2>

                <p className="text-gray-600 text-sm mt-1 break-all">
                  {user.email}
                </p>

              </div>

              <span
                className={`shrink-0 px-3 py-1 rounded-full text-xs ${
                  user.userRole === 1
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {user.userRole === 1
                  ? "Admin"
                  : "Customer"}
              </span>

            </div>

            <div className="border-t mt-4 pt-4 space-y-2 text-sm">

              <p>
                <span className="font-semibold">
                  Phone:
                </span>{" "}
                {user.phoneNumber || "-"}
              </p>

              <p>
                <span className="font-semibold">
                  Joined:
                </span>{" "}
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Users;