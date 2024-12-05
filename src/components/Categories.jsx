import React, { useState } from 'react';
import BoxComponent from './Box'; // Import the BoxComponent
import "../styles/Categories.css";

import Sports from "../images/sport.jpg";
import Nature from "../images/nature.jpg";
import Historial from "../images/historical.jpg";
import FunFact from "../images/funFact.jpg";
import Education from "../images/education.jpg";
import Constitution from "../images/constitution.jpg";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { title: 'General Knowledge', path: '/general', image: Education, intro: 'Test your knowledge with fun educational quizzes.' },
    { title: 'Sport', path: '/sport', image: Sports, intro: 'Challenge yourself with sports-related quizzes.' },
    { title: 'Nature', path: '/nature', image: Nature, intro: 'Explore the wonders of nature through quizzes.' },
    { title: 'Historical', path: '/historical', image: Historial, intro: 'Dive into history and test your historical knowledge.' },
    { title: 'Fun Fact', path: '/funFact', image: FunFact, intro: 'Discover intriguing fun facts with our quizzes.' },
    { title: 'Constitution', path: '/constitutional', image: Constitution, intro: 'Learn about the constitution and test your knowledge with quizzes.' },
  ];

  // Filter categories based on the search term
  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="categories-container">
      <input
        type="text"
        className="search-bar" // Add this class for styling
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="card-container"> {/* Wrap the BoxComponents in a card container */}
        {filteredCategories.map((category, index) => (
          <BoxComponent 
            key={index} 
            title={category.title} 
            path={category.path} 
            image={category.image} 
            intro={category.intro} 
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;