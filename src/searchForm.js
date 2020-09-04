import React from "react";
import { Form, Col } from "react-bootstrap";

export default function searchForm({ params, onParamsChange }) {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            onChange={onParamsChange}
            value={params.description}
            name="description"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            onChange={onParamsChange}
            value={params.location}
            name="location"
          ></Form.Control>
        </Form.Group>

        <Form.Group as={Col} xs="auto" className="ml-2">
          <Form.Check
            type="checkbox"
            onChange={onParamsChange}
            value={params.full_time}
            name="full_time"
            id="full_time"
            label=" Full Time Jobs"
            className="mb-2 "
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
