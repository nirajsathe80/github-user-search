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
    currentPage: 1,
  });
  const [repositories, setRepositories] = useState([]);

  const fetchUser = async (username) => {
    setLoading(true);
    try {
      setError("");
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );

      setUsers([userResponse.data]);
      setRepositories(reposResponse.data);
      setPagination((prev) => ({
        ...prev,
        start: 0,
        end: 6,
        currentPage: 1,
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
      currentPage: page,
    }));
  };

  const handleSearch = (username) => {
    if (username.trim()) fetchUser(username);
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
        repositories,
        handleSearch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
