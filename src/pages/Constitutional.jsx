import React, { useState, useEffect } from 'react';
import "../styles/custom.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const questionsData = [
        {
            question: "Who is considered the 'Father of the Constitution' of the United States?",
            options: ["George Washington", "James Madison", "Benjamin Franklin", "Thomas Jefferson"],
            correctAnswer: "James Madison"
        },
        {
            question: "Which amendment to the U.S. Constitution abolished slavery?",
            options: ["13th Amendment", "14th Amendment", "15th Amendment", "16th Amendment"],
            correctAnswer: "13th Amendment"
        },
        {
            question: "What is the supreme law of the land in the United States?",
            options: ["The Declaration of Independence", "The Constitution", "The Bill of Rights", "The Federalist Papers"],
            correctAnswer: "The Constitution"
        },
        {
            question: "What year was the U.S. Constitution signed?",
            options: ["1776", "1781", "1787", "1791"],
            correctAnswer: "1787"
        },
        {
            question: "Which amendment to the U.S. Constitution gave women the right to vote?",
            options: ["15th Amendment", "17th Amendment", "19th Amendment", "21st Amendment"],
            correctAnswer: "19th Amendment"
        },
        {
            question: "Which article of the U.S. Constitution outlines the powers of the executive branch?",
            options: ["Article I", "Article II", "Article III", "Article IV"],
            correctAnswer: "Article II"
        },
        {
            question: "Who was the first U.S. president to be impeached?",
            options: ["Abraham Lincoln", "Andrew Johnson", "Richard Nixon", "Bill Clinton"],
            correctAnswer: "Andrew Johnson"
        },
        {
            question: "What is the primary function of the U.S. Supreme Court?",
            options: ["Enforcing laws", "Writing laws", "Interpreting laws", "Creating laws"],
            correctAnswer: "Interpreting laws"
        },
        {
            question: "What does the 'Bill of Rights' consist of?",
            options: ["Amendments to the Constitution", "Articles of Confederation", "Presidential orders", "Court decisions"],
            correctAnswer: "Amendments to the Constitution"
        },
        {
            question: "Which amendment to the U.S. Constitution guarantees freedom of speech?",
            options: ["First Amendment", "Second Amendment", "Fifth Amendment", "Eighth Amendment"],
            correctAnswer: "First Amendment"
        },
        {
            question: "How many justices are there in the U.S. Supreme Court?",
            options: ["7", "9", "11", "13"],
            correctAnswer: "9"
        },
        {
            question: "Which document serves as the foundation of the U.S. government?",
            options: ["The Magna Carta", "The Declaration of Independence", "The U.S. Constitution", "The Articles of Confederation"],
            correctAnswer: "The U.S. Constitution"
        },
        {
            question: "Which branch of government is responsible for making laws?",
            options: ["Executive", "Legislative", "Judicial", "Federal"],
            correctAnswer: "Legislative"
        },
        {
            question: "The 'separation of powers' principle in the U.S. Constitution divides government into how many branches?",
            options: ["Two", "Three", "Four", "Five"],
            correctAnswer: "Three"
        },
        {
            question: "Which amendment to the U.S. Constitution gave African Americans the right to vote?",
            options: ["13th Amendment", "14th Amendment", "15th Amendment", "16th Amendment"],
            correctAnswer: "15th Amendment"
        },
        {
            question: "What is the purpose of the U.S. Senate?",
            options: ["To propose laws", "To confirm appointments", "To enforce laws", "All of the above"],
            correctAnswer: "All of the above"
        },
        {
            question: "How often are U.S. presidential elections held?",
            options: ["Every 2 years", "Every 4 years", "Every 6 years", "Every 8 years"],
            correctAnswer: "Every 4 years"
        },
        {
            question: "Which president signed the Emancipation Proclamation into law?",
            options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "Franklin D. Roosevelt"],
            correctAnswer: "Abraham Lincoln"
        },
        {
            question: "What year was the U.S. Constitution ratified?",
            options: ["1776", "1789", "1791", "1800"],
            correctAnswer: "1789"
        },
        {
            question: "Which group has the power to override a presidential veto?",
            options: ["The Supreme Court", "The Senate", "The House of Representatives", "Congress"],
            correctAnswer: "Congress"
        }
          
];
const ConstitutionalPage = () =>{
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
            <h1>Test Your Constitutional IQ</h1>
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

export default ConstitutionalPage;