import React from "react";
import { Pagination } from "react-bootstrap";

export default function pagination({ page, setPage, hasNextPage }) {
  const navigate = (amount) => {
    setPage((prevPage) => prevPage + amount);
  };

  return (
    <Pagination>
      {page !== 1 ? (
        <Pagination.Prev onClick={() => navigate(-1)}></Pagination.Prev>
      ) : (
        ""
      )}

      {page !== 1 && (
        <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>
      )}

      {page > 2 && <Pagination.Ellipsis />}
      {page > 2 ? (
        <Pagination.Item onClick={() => navigate(-1)}>
          {page - 1}
        </Pagination.Item>
      ) : (
        ""
      )}

      <Pagination.Item active>{page}</Pagination.Item>

      {hasNextPage && (
        <Pagination.Item onClick={() => navigate(+1)}>
          {page + 1}
        </Pagination.Item>
      )}

      {hasNextPage && (
        <Pagination.Next onClick={() => navigate(+1)}></Pagination.Next>
      )}
    </Pagination>
  );
}
