import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Pagination from "./pagination";

const Repositories = function () {
  const [paginationDetails, setPaginationDetails] = useState({
    start: 0,
    end: 6,
    selectedPage: 1,
  });
  const { start, end, selectedPage } = paginationDetails;
  const { repositories = [] } = useContext(UserContext);

  const totalPages = Math.floor(repositories.length / 6);

  const handlePaginationPageClick = (page) => {
    const start = 6 * (page - 1);
    const end = 6 * (page - 1) + 6;
    setPaginationDetails((prev) => ({
      ...prev,
      start,
      end,
      selectedPage: page,
    }));
  };

  return (
    <div>
      <p className="font-bold text-base my-5">Repositories:</p>
      <ul className="pb-6 min-h-[200px]">
        {repositories.slice(start, end).map((repo, index) => {
          return (
            <li
              key={index}
              className="mb-2 cursor-pointer text-blue-500 truncate"
            >
              <a href={repo.html_url} target="_blank">
                {" "}
                {repo?.name}
              </a>
            </li>
          );
        })}
      </ul>
      <Pagination
        start={1}
        end={totalPages}
        onPageClick={handlePaginationPageClick}
        selectedPage={selectedPage}
        className="!justify-start"
      />
    </div>
  );
};

export default Repositories;
