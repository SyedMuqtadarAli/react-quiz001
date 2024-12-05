import React, { useState, useEffect } from 'react';
import "../styles/custom.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const questionsData = [
        {
            question: "Which animal is known to sleep for up to 22 hours a day?",
            options: ["Sloth", "Lion", "Koala", "Bat"],
            correctAnswer: "Koala"
        },
        {
            question: "Which fruit is known as the 'king of fruits' due to its strong smell?",
            options: ["Durian", "Mango", "Papaya", "Banana"],
            correctAnswer: "Durian"
        },
        {
            question: "What is the only country to have a flag that is not a rectangle?",
            options: ["Nepal", "Vatican City", "Japan", "Switzerland"],
            correctAnswer: "Nepal"
        },
        {
            question: "Which planet in our solar system has the most moons?",
            options: ["Mars", "Earth", "Jupiter", "Saturn"],
            correctAnswer: "Jupiter"
        },
        {
            question: "What is the longest word in the English language?",
            options: ["Pneumonoultramicroscopicsilicovolcanoconiosis", "Supercalifragilisticexpialidocious", "Antidisestablishmentarianism", "Floccinaucinihilipilification"],
            correctAnswer: "Pneumonoultramicroscopicsilicovolcanoconiosis"
        },
        {
            question: "Which animal can hold its breath the longest?",
            options: ["Whale", "Elephant", "Shark", "Crocodile"],
            correctAnswer: "Crocodile"
        },
        {
            question: "Which is the smallest bone in the human body?",
            options: ["Stapes", "Femur", "Radius", "Tibia"],
            correctAnswer: "Stapes"
        },
        {
            question: "Which country invented ice cream?",
            options: ["Italy", "China", "USA", "France"],
            correctAnswer: "China"
        },
        {
            question: "Which fruit floats on water due to its fibrous husk?",
            options: ["Coconut", "Apple", "Orange", "Peach"],
            correctAnswer: "Coconut"
        },
        {
            question: "Which animal can change its gender during its lifetime?",
            options: ["Fish", "Frog", "Lizard", "Rabbit"],
            correctAnswer: "Fish"
        },
        {
            question: "Which animal is known to have a memory span of several years?",
            options: ["Elephant", "Dog", "Horse", "Cat"],
            correctAnswer: "Elephant"
        },
        {
            question: "Which body part is the most flexible in the human body?",
            options: ["Neck", "Tongue", "Fingers", "Arms"],
            correctAnswer: "Tongue"
        },
        {
            question: "Which animal can see ultraviolet light?",
            options: ["Honeybee", "Bat", "Dog", "Cat"],
            correctAnswer: "Honeybee"
        },
        {
            question: "What animal is capable of regenerating its limbs?",
            options: ["Starfish", "Lizard", "Axolotl", "Octopus"],
            correctAnswer: "Axolotl"
        },
        {
            question: "Which famous landmark is known as the 'Eighth Wonder of the World'?",
            options: ["Great Wall of China", "Colosseum", "Machu Picchu", "Taj Mahal"],
            correctAnswer: "Machu Picchu"
        },
        {
            question: "What is the most commonly stolen food in the world?",
            options: ["Cheese", "Bread", "Chocolate", "Bananas"],
            correctAnswer: "Cheese"
        },
        {
            question: "Which country has the most pyramids in the world?",
            options: ["Egypt", "Mexico", "Sudan", "Peru"],
            correctAnswer: "Sudan"
        },
        {
            question: "Which bird is known for its bright, colorful feathers and its ability to mimic human speech?",
            options: ["Parrot", "Eagle", "Ostrich", "Peacock"],
            correctAnswer: "Parrot"
        },
        {
            question: "Which animal is capable of producing its own light?",
            options: ["Firefly", "Jellyfish", "Anglerfish", "All of the above"],
            correctAnswer: "All of the above"
        },
        {
            question: "Which animal's heart is the size of a basketball?",
            options: ["Blue Whale", "Elephant", "Horse", "Lion"],
            correctAnswer: "Blue Whale"
        }     
];
const FunFactPage = () =>{
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
            <h1>Test Your Fun-Fact IQ</h1>
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

export default FunFactPage;