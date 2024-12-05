import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Box.css"; // Ensure you have the styles imported

const BoxComponent = ({ title, path, image, intro }) => {
  return (
    <div className="card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{intro}</p>
      <Link to={path} className="play-button"> {/* Link for Play Quiz button */}
        Play Quiz
      </Link>
    </div>
  );
};

export default BoxComponent;