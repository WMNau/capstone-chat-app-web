import React from "react";
import PropTypes from "prop-types";

import { Form, InputGroup } from "react-bootstrap";

const FormField = ({
  name,
  type,
  placeholder,
  value,
  info,
  error,
  prepend,
  append,
  onChange,
}) => {
  return (
    <Form.Group controlId={name}>
      {prepend && (
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>{prepend}</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </InputGroup>
      )}
      {append && (
        <InputGroup>
          <Form.Control
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          <InputGroup.Append>
            <InputGroup.Text>{append}</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      )}
      {!append && !prepend && (
        <Form.Control
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {!error && info && <Form.Text className="text-muted">{info} </Form.Text>}
      {error && <Form.Text className="text-danger">* {error} </Form.Text>}
    </Form.Group>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  prepend: PropTypes.object,
  append: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default FormField;
