import React, { useState, useEffect } from 'react';
import "../styles/custom.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const questionsData = [
        {
            question: "Who was the first president of the United States?",
            options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
            correctAnswer: "George Washington"
        },
        {
            question: "What year did the Titanic sink?",
            options: ["1912", "1898", "1923", "1905"],
            correctAnswer: "1912"
        },
        {
            question: "In which year did World War I begin?",
            options: ["1912", "1914", "1916", "1918"],
            correctAnswer: "1914"
        },
        {
            question: "What ancient civilization built the pyramids of Giza?",
            options: ["Roman", "Greek", "Egyptian", "Mesopotamian"],
            correctAnswer: "Egyptian"
        },
        {
            question: "Who was the famous queen of ancient Egypt?",
            options: ["Cleopatra", "Nefertiti", "Hatshepsut", "Maat"],
            correctAnswer: "Cleopatra"
        },
        {
            question: "What year did the Berlin Wall fall?",
            options: ["1963", "1989", "1991", "1975"],
            correctAnswer: "1989"
        },
        {
            question: "Which country was the first to land a man on the moon?",
            options: ["USA", "Russia", "China", "India"],
            correctAnswer: "USA"
        },
        {
            question: "Who wrote the Declaration of Independence?",
            options: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
            correctAnswer: "Thomas Jefferson"
        },
        {
            question: "Who was the first emperor of China?",
            options: ["Shihuangdi", "Li Shimin", "Kublai Khan", "Zhao Kuangyin"],
            correctAnswer: "Shihuangdi"
        },
        {
            question: "What year did the Roman Empire fall?",
            options: ["476 AD", "395 AD", "500 AD", "400 AD"],
            correctAnswer: "476 AD"
        },
        {
            question: "Which war was fought between the North and South regions of the United States?",
            options: ["Civil War", "Revolutionary War", "World War I", "World War II"],
            correctAnswer: "Civil War"
        },
        {
            question: "Who was the famous leader of the Mongol Empire?",
            options: ["Kublai Khan", "Genghis Khan", "Tamerlane", "Khan Baba"],
            correctAnswer: "Genghis Khan"
        },
        {
            question: "What was the name of the ship that brought the Pilgrims to America in 1620?",
            options: ["Mayflower", "Endeavour", "Beagle", "Santa Maria"],
            correctAnswer: "Mayflower"
        },
        {
            question: "Which battle was the turning point in the American Civil War?",
            options: ["Battle of Gettysburg", "Battle of Antietam", "Battle of Fort Sumter", "Battle of Bunker Hill"],
            correctAnswer: "Battle of Gettysburg"
        },
        {
            question: "Who was the first woman to fly solo across the Atlantic Ocean?",
            options: ["Amelia Earhart", "Harriet Quimby", "Bessie Coleman", "Jacqueline Cochran"],
            correctAnswer: "Amelia Earhart"
        },
        {
            question: "Which country was ruled by Napoleon Bonaparte?",
            options: ["Spain", "Italy", "France", "Germany"],
            correctAnswer: "France"
        },
        {
            question: "In which city did the first modern Olympic Games take place in 1896?",
            options: ["Paris", "Athens", "London", "Berlin"],
            correctAnswer: "Athens"
        },
        {
            question: "Who was the longest-reigning monarch in British history before Queen Elizabeth II?",
            options: ["Queen Victoria", "King George III", "King Henry VIII", "Queen Elizabeth I"],
            correctAnswer: "Queen Victoria"
        },
        {
            question: "What famous event took place on December 7, 1941?",
            options: ["D-Day", "Attack on Pearl Harbor", "Assassination of Kennedy", "End of World War II"],
            correctAnswer: "Attack on Pearl Harbor"
        },
        {
            question: "What was the first country to grant women the right to vote?",
            options: ["USA", "New Zealand", "UK", "Canada"],
            correctAnswer: "New Zealand"
        }    
];
const HistoricalPage = () =>{
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
        if (option === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
            toast.success("Correct!",{autoClose:800});
        } else {
            toast.error("Wrong answer!",{autoClose:800});
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
            <h1>Test Your Historical IQ</h1>
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

export default HistoricalPage;