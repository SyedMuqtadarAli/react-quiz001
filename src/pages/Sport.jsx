import React, { useState, useEffect } from 'react';
import "../styles/custom.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const questionsData = [
        {
            question: "What is the national sport of Japan?",
            options: ["Baseball", "Judo", "Sumo", "Soccer"],
            correctAnswer: "Sumo"
        },
        {
            question: "Who holds the record for most Olympic medals?",
            options: ["Michael Phelps", "Usain Bolt", "Larisa Latynina", "Simone Biles"],
            correctAnswer: "Michael Phelps"
        },
            {
                question: "What is the national sport of Japan?",
                options: ["Baseball", "Judo", "Sumo", "Soccer"],
                correctAnswer: "Sumo"
            },
            {
                question: "In which sport would you perform a slam dunk?",
                options: ["Football", "Basketball", "Tennis", "Rugby"],
                correctAnswer: "Basketball"
            },
            {
                question: "How many players are there on a standard soccer team?",
                options: ["9", "10", "11", "12"],
                correctAnswer: "11"
            },
            {
                question: "Which country has won the most FIFA World Cups?",
                options: ["Germany", "Brazil", "Argentina", "Italy"],
                correctAnswer: "Brazil"
            },
            {
                question: "Which sport uses a puck instead of a ball?",
                options: ["Cricket", "Ice Hockey", "Basketball", "Tennis"],
                correctAnswer: "Ice Hockey"
            },
            {
                question: "In tennis, what term describes a score of zero?",
                options: ["Love", "Fault", "Ace", "Deuce"],
                correctAnswer: "Love"
            },
            {
                question: "How many rings are there on the Olympic flag?",
                options: ["4", "5", "6", "7"],
                correctAnswer: "5"
            },
            {
                question: "Which country is known as the birthplace of golf?",
                options: ["Ireland", "England", "Scotland", "United States"],
                correctAnswer: "Scotland"
            },
            {
                question: "In cricket, what is the term for dismissing a batsman without scoring any runs?",
                options: ["Run-out", "Duck", "Golden Duck", "Bowled"],
                correctAnswer: "Duck"
            },
            {
                question: "Which sport is associated with the term 'birdie'?",
                options: ["Tennis", "Badminton", "Golf", "Soccer"],
                correctAnswer: "Golf"
            },
            {
                question: "Who holds the record for the most goals scored in a single Premier League season?",
                options: ["Cristiano Ronaldo", "Thierry Henry", "Alan Shearer", "Mohamed Salah"],
                correctAnswer: "Mohamed Salah"
            },
            {
                question: "In which country were the first modern Olympic Games held?",
                options: ["France", "USA", "Greece", "Italy"],
                correctAnswer: "Greece"
            },
            {
                question: "In which sport is the Ryder Cup contested?",
                options: ["Cricket", "Tennis", "Golf", "Rugby"],
                correctAnswer: "Golf"
            },
            {
                question: "What is the term for three consecutive strikes in bowling?",
                options: ["Turkey", "Triple", "Hat-trick", "Strike"],
                correctAnswer: "Turkey"
            },
            {
                question: "Who was known as 'The Greatest' in boxing?",
                options: ["Mike Tyson", "Muhammad Ali", "Floyd Mayweather", "Rocky Marciano"],
                correctAnswer: "Muhammad Ali"
            },
            {
                question: "Which sport uses the term 'home run'?",
                options: ["Cricket", "Baseball", "Basketball", "Rugby"],
                correctAnswer: "Baseball"
            },
            {
                question: "What type of racing is the Tour de France?",
                options: ["Car Racing", "Horse Racing", "Bicycle Racing", "Sailing"],
                correctAnswer: "Bicycle Racing"
            },
            {
                question: "What color jersey does the leader of the Tour de France wear?",
                options: ["Green", "Red", "Yellow", "Blue"],
                correctAnswer: "Yellow"
            },
            {
                question: "What is the maximum score in a single frame of ten-pin bowling?",
                options: ["20", "30", "50", "100"],
                correctAnswer: "30"
            },
            {
                question: "Which country won the 2018 FIFA World Cup?",
                options: ["Germany", "Brazil", "France", "Argentina"],
                correctAnswer: "France"
            }
    
];

const SportPage = () => {
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
            <h1>Test Your Sports IQ</h1>
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

export default SportPage;