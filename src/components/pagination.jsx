/* eslint-disable react/prop-types */
import { useMemo } from "react";

const Pagination = function ({ start, end, onPageClick, selectedPage }) {
  const createArray = function () {
    const newArray = [];
    for (let i = start; i <= end; i++) {
      newArray.push(i);
    }
    return newArray;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const pageArray = useMemo(createArray, [selectedPage, end]);

  return (
    <nav aria-label="Page navigation example" className="flex justify-center">
      <ul className="inline-flex -space-x-px text-base h-10">
        {pageArray.map((page) => {
          return (
            <li
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300  cursor-pointer ${
                selectedPage === page
                  ? "text-blue-400 bg-gray-400 font-semibold"
                  : "hover:text-gray-700 hover:bg-gray-100"
              }`}
              key={page}
              onClick={() => onPageClick(page)}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
