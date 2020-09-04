import React, { useState } from "react";
import useFetchJobs from "./useFetchJobs";
import { Container } from "react-bootstrap";
import Job from "../src/job";
import Loading from "../src/loading";
import Pagination from "../src/pagination";
import SearchForm from "../src/searchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const handleParamChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPage(1);
    setParams((prevParams) => {
      return {
        ...prevParams,
        [name]: value
      };
    });
  };

  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
  return (
    <Container className="my-5">
      <h1 style={{ textAlign: "center" }}>FIND JOBS ON GITHUB</h1>
      <SearchForm onParamsChange={handleParamChange} params={params} />
      <Pagination
        className="mb-4"
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      />
      {loading && <Loading />}
      {error && <h1>error...Try refreshing</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      <Pagination
        className="mt-4"
        page={page}
        setPage={setPage}
        hasNextPage={hasNextPage}
      />
    </Container>
  );
}

export default App;
