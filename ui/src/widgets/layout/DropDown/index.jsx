import React, { useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ options, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown-trigger ${isOpen ? "open" : ""}`}
        onClick={toggleDropdown}>
        <div className="dropdown-selected-value">
          {selectedOption ? selectedOption : placeholder}
        </div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            {isOpen ? (
              <svg
                height="10"
                width="10"
                viewBox="0 0 10 10"
                className="dropdown-icon">
                <path d="M1 3.5L5 7.5L9 3.5H1Z" fill="#000000" />
              </svg>
            ) : (
              <svg
                height="10"
                width="10"
                viewBox="0 0 10 10"
                className="dropdown-icon">
                <path d="M1 6.5L5 2.5L9 6.5H1Z" fill="#000000" />
              </svg>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
