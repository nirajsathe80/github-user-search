import { useContext } from "react";
import UserContext from "../context/UserContext";
import Repositories from "./repositories";

const UserProfile = () => {
  const { users, error, pagination, repositories } = useContext(UserContext);
  const { start, end } = pagination;

  if (error)
    return (
      <div className="text-2xl font-semibold text-center my-10 ">{error}</div>
    );

  return (
    <div className="flex flex-wrap gap-6 items-center justify-center my-10">
      {users &&
        users.slice(start, end).map((user, index) => {
          const {
            name,
            created_at,
            public_repos,
            followers,
            following,
            avatar_url,
            login,
            html_url,
            bio,
            location,
            twitter_username,
            blog,
            user_view_type,
          } = user ?? {};

          const details = [
            {
              title: "Repos",
              count: public_repos ? public_repos : 0,
            },
            {
              title: "Followers",
              count: followers ? followers : 0,
            },
            {
              title: "Following",
              count: following ? following : 0,
            },
          ];

          const joinedDate = created_at
            ? new Date(created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : null;

          const links = [
            {
              icon: <i className="fa-solid fa-location-pin"></i>,
              value: location ? location : "Not available",
            },
            {
              icon: <i className="fa-brands fa-twitter"></i>,
              value: twitter_username ? twitter_username : "Not available",
            },
            {
              icon: <i className="fa-solid fa-link"></i>,
              value: blog ? blog : "Not available",
            },
            {
              icon: <i className="fa-solid fa-user"></i>,
              value: user_view_type ? user_view_type : "Private",
            },
          ];

          return (
            <div
              className="flex sm:gap-6 gap-3 p-5 rounded-lg bg-white shadow-md w-[90vw] md:w-[70vw] lg:w-[50vw] max-w-[500px] text-[hsl(217,20%,51%)]"
              key={index}
            >
              <div>
                <img
                  src={avatar_url}
                  className="rounded-[50%] max-h-[100px]"
                  alt={login}
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col sm:flex-row  justify-between mb-6 text-base">
                  <div>
                    <p className="text-xl font-bold pb-1">
                      {name ? name : null}
                    </p>
                    <a
                      href={html_url}
                      className="text-blue-400"
                      target="_blank"
                    >
                      @{login}
                    </a>
                  </div>

                  {joinedDate ? <p>Joined {joinedDate}</p> : <></>}
                </div>
                <div className="mb-4">
                  {bio ? bio : "This Profile has no bio"}
                </div>
                <div className="bg-[hsl(227,100%,98%)] sm:p-4 p-2 flex justify-around items-center rounded-lg">
                  {details.map((detail, index) => {
                    return (
                      <div className="text-center" key={index}>
                        <p className="sm:text-base text-sm  text-[hsl(217,35%,45%)]">
                          {detail.title}
                        </p>
                        <p className="font-semibold sm:text-sm text-xs">
                          {detail.count}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 my-4">
                  {links.map((link, index) => {
                    return (
                      <div key={index} className="flex gap-2 items-center">
                        <span>{link.icon}</span>
                        <span>{link.value}</span>
                      </div>
                    );
                  })}
                </div>
                {repositories && repositories.length > 0 ? (
                  <Repositories />
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserProfile;
