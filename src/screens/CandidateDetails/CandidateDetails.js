import React from "react";
import { AppContext } from "../../App";
import "./candidateDetails.css";

export const CandidateDetails = ({ match, history }) => {
  return (
    <AppContext.Consumer>
      {({
        getCandidateData,
        loading,
        toggleShortlistCandidate,
        toggleRejectCandidate,
      }) =>
        loading ? (
          <>Loading...</>
        ) : (
          <div className="candidate-details">
            <div className="candidate-details-title">
              <h1>Candidate Details</h1>
            </div>
            <div className="candidate-details-info">
              <div className="candidate-details-info-image">
                <img
                  src={
                    getCandidateData(match.params.id) &&
                    getCandidateData(match.params.id).Image
                  }
                  alt="Candidate Image"
                />
              </div>
              <div className="candidate-details-info-data">
                <h2>
                  Name :{" "}
                  {getCandidateData(match.params.id) &&
                    getCandidateData(match.params.id).name}
                </h2>
                <br />
                <button
                  className="btn btn-success"
                  onClick={() => {
                    toggleShortlistCandidate(match.params.id);
                    history.push("/");
                  }}
                >
                  Shortlist
                </button>
                <button
                  className="btn btn-danger mar-l-10"
                  onClick={() => {
                    toggleRejectCandidate(match.params.id);
                    history.push("/");
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )
      }
    </AppContext.Consumer>
  );
};
