import { useContext } from "react";
import UserContext from "../context/UserContext";

const Repositories = function () {
  const { repositories = [] } = useContext(UserContext);
  console.log(repositories);
  return (
    <div>
      <p className="font-bold text-base my-5">Repositories:</p>
      <ul className="px-8">
        {repositories.map((repo, index) => {
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
    </div>
  );
};

export default Repositories;
