import React, { useState, useEffect } from 'react';
import "../styles/custom.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const questionsData = [
    {
        question: "What is the capital city of Japan?",
        options: ["Seoul", "Beijing", "Tokyo", "Osaka"],
        correctAnswer: "Tokyo"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Homer"],
        correctAnswer: "William Shakespeare"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Mount Kilimanjaro"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "Which country is famous for the Great Barrier Reef?",
        options: ["Australia", "United States", "Brazil", "India"],
        correctAnswer: "Australia"
    },
    {
        question: "What is the smallest country in the world by population?",
        options: ["Vatican City", "Monaco", "Nauru", "San Marino"],
        correctAnswer: "Vatican City"
    },
    {
        question: "Which chemical element has the symbol 'O'?",
        options: ["Oxygen", "Osmium", "Ozone", "Olivine"],
        correctAnswer: "Oxygen"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correctAnswer: "Nile River"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Oxygen", "Hydrogen", "Nitrogen", "Helium"],
        correctAnswer: "Hydrogen"
    },
    {
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "James Watt"],
        correctAnswer: "Alexander Graham Bell"
    },
    {
        question: "Which animal is known for its ability to change colors?",
        options: ["Chameleon", "Elephant", "Giraffe", "Lion"],
        correctAnswer: "Chameleon"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "Which country is the largest producer of coffee in the world?",
        options: ["Colombia", "Brazil", "Vietnam", "Ethiopia"],
        correctAnswer: "Brazil"
    },
    {
        question: "Which human organ is capable of regenerating tissue?",
        options: ["Heart", "Liver", "Lungs", "Kidney"],
        correctAnswer: "Liver"
    },
    {
        question: "Which planet is the hottest in our solar system?",
        options: ["Mercury", "Venus", "Mars", "Jupiter"],
        correctAnswer: "Venus"
    },
    {
        question: "Which language is most commonly spoken in Brazil?",
        options: ["Spanish", "Portuguese", "French", "Italian"],
        correctAnswer: "Portuguese"
    },
    {
        question: "Who is known as the 'Father of the Nation' in India?",
        options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Mahatma Gandhi", "Bhagat Singh"],
        correctAnswer: "Mahatma Gandhi"
    },
    {
        question: "Which continent is known as the 'Dark Continent'?",
        options: ["Asia", "Africa", "South America", "Europe"],
        correctAnswer: "Africa"
    }
];

const GeneralPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const navigate = useNavigate();

    // Shuffle and select 10 random questions on component mount
    useEffect(() => {
        const shuffledQuestions = questionsData.sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuestions(shuffledQuestions);
    }, []);

    // Handle selecting an answer
    const handleAnswerSelect = (option) => {
        if (!questions.length) return; // Ensure questions are loaded
        setSelectedAnswer(option);
        const isCorrect = option === questions[currentQuestion].correctAnswer;
        if (isCorrect) {
            setScore(score + 1);
            toast.success("Correct!", { autoClose: 800 });
        } else {
            toast.error("Wrong answer!", { autoClose: 800 });
        }
    };

    // Handle moving to the next question
    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null); // Reset answer for the new question
        } else {
            setQuizFinished(true); // Mark quiz as finished
        }
    };

    // Handle moving to the previous question
    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(null); // Reset answer for the new question
        }
    };

    // Navigate to Home Page
    const goToHome = () => {
        navigate('/');
    };

    return (
        <div className="page">
            <ToastContainer />
            <h1>Test Your General Knowledge IQ</h1>
            {!quizFinished ? (
                questions.length ? (
                    <div className="question-container">
                        <h2>Question {currentQuestion + 1} of {questions.length}</h2>
                        <p>{questions[currentQuestion].question}</p>
                        <div className="options">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option ${selectedAnswer === option ? 'selected' : ''}`}
                                    onClick={() => handleAnswerSelect(option)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="navigation-buttons">
                            <button onClick={prevQuestion} disabled={currentQuestion === 0}>Previous</button>
                            <button onClick={nextQuestion} disabled={selectedAnswer === null}>Next</button>
                        </div>
                    </div>
                ) : (
                    <p>Loading questions...</p>
                )
            ) : (
                <div className="result-container">
                    <h2>Quiz Complete!</h2>
                    <p>Your Score: {score} / {questions.length}</p>
                    <button onClick={goToHome}>Go to Home</button>
                </div>
            )}
        </div>
    );
};

export default GeneralPage;