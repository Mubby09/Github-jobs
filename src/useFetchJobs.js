import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "MAKE_REQUEST",
  GET_DATA: "GET_DATA",
  ERROR: "ERROR"
};

const base_url =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

// https://cors-anywhere.herokuapp.com

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST: {
      return {
        ...state,
        loading: true,
        jobs: []
      };
    }
    case ACTIONS.GET_DATA: {
      return {
        ...state,
        loading: false,
        jobs: action.payload.jobs
      };
    }

    case ACTIONS.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: []
      };
    }

    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, {
    jobs: [],
    loading: true,
    error: false
  });

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(base_url, {
        cancelToken: cancelToken.token,
        params: { markdown: true, page: page, ...params }
      })
      .then((res) =>
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
      )
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    return () => {
      cancelToken.cancel();
    };
  }, [params, page]);

  return state;
}
