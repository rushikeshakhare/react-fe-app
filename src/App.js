import React, { createContext, useReducer, useEffect } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import {
  Home,
  CandidateDetails,
  CandidateListRejected,
  CandidateListShortlisted,
} from "./screens";
import "./App.css";

export const AppContext = createContext();

const initialState = {
  loading: false,
  candidates: [],
  error: null,
  allCandidates: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CANDIDATES": {
      return {
        ...state,
        loading: true,
        candidates: [],
      };
    }
    case "FETCH_CANDIDATES_SUCCESS": {
      const modCandidates = action.response.map((candidate) => ({
        ...candidate,
        shortlisted: false,
        rejected: false,
      }));
      return {
        ...state,
        loading: false,
        candidates: modCandidates,
        allCandidates: modCandidates,
      };
    }
    case "FETCH_CANDIDATES_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case "SEARCH_CANDIDATES_BY_QUERY": {
      return {
        ...state,
        loading: false,
        candidates: action.response,
      };
    }
    case "UPDATE_CANDIDATES": {
      return {
        ...state,
        loading: false,
        candidates: action.response,
        allCandidates: action.response,
      };
    }
    default: {
      return state;
    }
  }
};

function App() {
  const [{ candidates, allCandidates, loading }, dispatch] = useReducer(
    appReducer,
    initialState
  );

  useEffect(() => {
    dispatch({
      type: "FETCH_CANDIDATES",
    });
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json"
    )
      .then((response) => response.json())
      .then((response) =>
        dispatch({
          type: "FETCH_CANDIDATES_SUCCESS",
          response,
        })
      )
      .catch((error) =>
        dispatch({
          type: "FETCH_CANDIDATES_ERROR",
          error,
        })
      );
  }, []);

  const searchCandidatesByQuery = (searchQuery) => {
    const filteredCandidates = allCandidates.filter((candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    dispatch({
      type: "SEARCH_CANDIDATES_BY_QUERY",
      response: filteredCandidates,
    });
  };

  const getCandidateData = (canId) => {
    return allCandidates.find(({ id }) => id === canId);
  };

  const toggleShortlistCandidate = (id) => {
    const modifiedCandidates = allCandidates.map((candidate) => {
      if (candidate.id === id)
        return {
          ...candidate,
          shortlisted: !candidate.shortlisted,
        };
      else return candidate;
    });
    dispatch({
      type: "UPDATE_CANDIDATES",
      response: modifiedCandidates,
    });
  };

  const toggleRejectCandidate = (id) => {
    const modifiedCandidates = allCandidates.map((candidate) => {
      if (candidate.id === id)
        return {
          ...candidate,
          rejected: !candidate.rejected,
        };
      else return candidate;
    });
    dispatch({
      type: "UPDATE_CANDIDATES",
      response: modifiedCandidates,
    });
  };

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          candidates,
          allCandidates,
          loading,
          searchCandidatesByQuery,
          getCandidateData,
          toggleRejectCandidate,
          toggleShortlistCandidate,
        }}
      >
        <div className="App-title">
          <h1> HERE JOBS </h1>{" "}
        </div>{" "}
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Home} />{" "}
            <Route
              path="/shortlisted"
              exact
              component={CandidateListShortlisted}
            />{" "}
            <Route path="/rejected" exact component={CandidateListRejected} />{" "}
            <Route path="/:id" exact component={CandidateDetails} />{" "}
          </Switch>{" "}
        </HashRouter>{" "}
      </AppContext.Provider>{" "}
    </div>
  );
}

export default App;
