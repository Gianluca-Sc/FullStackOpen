import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div className="mt-2">
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.showButton}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button className="mt-2 btn-danger" onClick={toggleVisibility}>
          {props.hideButton}
        </Button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  showButton: PropTypes.string.isRequired,
  hideButton: PropTypes.string.isRequired,
};

export default Togglable;
