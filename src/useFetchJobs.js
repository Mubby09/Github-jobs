import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  MAKE_REQUEST: "MAKE_REQUEST",
  GET_DATA: "GET_DATA",
  ERROR: "ERROR",
  UPDATE_HAS_NEXT_PAGE: "UPDATE_HAS_NEXT_PAGE "
};

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
    case ACTIONS.UPDATE_HAS_NEXT_PAGE: {
      return {
        ...state,
        hasNextPage: action.payload.hasNextPage
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

  // https://cors-anywhere.herokuapp.com

  const base_url =
    "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

  useEffect(() => {
    let cancelToken1 = axios.CancelToken.source();
    dispatch({ type: ACTIONS.MAKE_REQUEST });
    axios
      .get(base_url, {
        cancelToken: cancelToken1.token,
        params: { markdown: true, page: page, ...params }
      })
      .then((res) =>
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
      )
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    let cancelToken2 = axios.CancelToken.source();
    axios
      .get(base_url, {
        cancelToken2: cancelToken2.token,
        params: { markdown: true, page: page, ...params }
      })
      .then((res) =>
        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 }
        })
      )
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
}
