import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { usersAPI } from "../../services/userServices";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await usersAPI();
      // usersAPI returns response.data which might be the array or an object containing data
      const userList = Array.isArray(data) ? data : data.data || [];
      setUsers(userList);
    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
     
      
      <div className="flex-grow container mx-auto px-4 py-8 mt-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Link 
            to="/add-user" 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
          >
            <FaPlus /> Add New User
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading users...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-800 text-gray-400 uppercase text-sm">
                  <tr>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Emp ID</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img 
                          src={user.coverImage || "/assets/notfound.webp"} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium">{user.name}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{user.role || "-"}</td>
                      <td className="px-6 py-4 text-gray-300">{user.email}</td>
                      <td className="px-6 py-4 text-gray-300">{user.emp_id || "-"}</td>
                      <td className="px-6 py-4 text-center">
                        <Link 
                          to={`/edit-user/${user._id}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors mr-2"
                          title="Edit User"
                        >
                          <FaEdit size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-10 text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserManagement;
