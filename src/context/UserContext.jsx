/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    start: 0,
    end: 4,
    selectedPage: 1,
  });

  const fetchUser = async (username) => {
    setLoading(true);
    try {
      setError("");
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUsers([userResponse.data]);
      setPagination((prev) => ({
        ...prev,
        start: 0,
        end: 6,
        selectedPage: 1,
      }));
    } catch (err) {
      setError("User not found");
      console.log("Error", err);
      setUsers(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationPageClick = function (page) {
    const start = 4 * (page - 1);
    const end = 4 * (page - 1) + 4;
    setPagination((prev) => ({
      ...prev,
      start,
      end,
      selectedPage: page,
    }));
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      setError("");
      const response = await axios.get("https://api.github.com/users");
      setUsers(response.data);
    } catch (error) {
      setError("Failed to Users");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        fetchUser,
        error,
        loading,
        pagination,
        handlePaginationPageClick,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
