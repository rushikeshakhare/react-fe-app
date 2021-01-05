import React from "react";
import { AppContext } from "../../App";
import "./candidateList.css";

export const CandidateListRejected = ({ history }) => {
  return (
    <AppContext.Consumer>
      {({ allCandidates }) => (
        <>
          <br />
          <h1>Rejected Candidates</h1>
          <div className="candidate-list">
            {allCandidates
              .filter((candidate) => candidate.rejected)
              .map(({ Image, name, id }) => (
                <div
                  className="user-card"
                  key={id}
                  onClick={() => history.push(`/${id}`)}
                >
                  <div className="user-card-image">
                    <img src={Image} alt="" />
                  </div>
                  <h4 className="user-card-name"> {name} </h4>
                </div>
              ))}
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
};
