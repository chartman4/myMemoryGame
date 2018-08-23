import React from "react";
import PropTypes from "prop-types";
import "./TryCounter.css";

const TryCounter = ({ tryCounter }) => (
  <div className="counter-container">
    <div className="counter-div">Number of Tries: {tryCounter}</div>
  </div>
);

TryCounter.propTypes = {
  tryCounter: PropTypes.number.isRequired
};

export default TryCounter;
