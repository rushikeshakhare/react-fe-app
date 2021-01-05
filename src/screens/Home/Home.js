import React from "react";
import { AppContext } from "../../App";
import { UserCard } from "../../components";
import "./home.css";

export const Home = ({ history }) => {
  return (
    <AppContext.Consumer>
      {({ candidates, searchCandidatesByQuery }) => (
        <div className="home-screen">
          <div className="home-screen-search">
            <input
              type="text"
              className="input-control"
              placeholder="Search Candidates"
              onChange={(e) => searchCandidatesByQuery(e.target.value)}
            />
            <div className="home-screen-actions">
              <button
                className="btn btn-success"
                onClick={() => history.push("/shortlisted")}
              >
                Shortlisted
              </button>
              <button
                className="btn btn-danger mar-l-10"
                onClick={() => history.push("/rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="home-screen-content">
            {candidates.map(({ Image: image, name, id }) => (
              <UserCard
                navigateToRoute={history.push}
                key={id}
                image={image}
                name={name}
                id={id}
              />
            ))}
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
};
