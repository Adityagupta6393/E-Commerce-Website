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
      <h1 className="text-3xl font-bold mb-8">
        Users
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t"
              >
                <td className="p-4">{user.name}</td>

                <td>{user.email}</td>

                <td>
                  {user.phoneNumber || "-"}
                </td>

                <td>
                  {user.userRole === 1
                    ? "Admin"
                    : "Customer"}
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
    </div>
  );
}

export default Users;