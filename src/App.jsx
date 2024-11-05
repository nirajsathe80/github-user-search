import { useContext } from "react";
import Search from "./components/Search";
import UserProfile from "./components/UserProfile";
import UserContext from "./context/UserContext";
import Loader from "./components/loader";
import Pagination from "./components/pagination";

const App = () => {
  const {
    loading,
    users,
    handlePaginationPageClick,
    pagination,
    handleSearch,
  } = useContext(UserContext);

  const { currentPage } = pagination;
  const totalPages = Math.floor(users?.length / 4);

  return (
    <div className="w-screen min-h-screen bg-[#d3d3ff] font-serif pb-28 px-4">
      <p className="text-2xl text-center py-6">Github User Search</p>
      <Search
        onSearchClick={handleSearch}
        placeholder={"Enter Github UserName"}
        buttonText={"Search"}
        onEnterKey={handleSearch}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <UserProfile />
          <Pagination
            end={totalPages}
            start={1}
            onPageClick={handlePaginationPageClick}
            selectedPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default App;
