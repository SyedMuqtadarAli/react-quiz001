import React, { useState, useEffect } from 'react';
import "../styles/custom.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const questionsData = [
        {
            question: "What is the largest land animal on Earth?",
            options: ["African Elephant", "Giraffe", "Hippopotamus", "Rhino"],
            correctAnswer: "African Elephant"
        },
        {
            question: "Which tree is known for producing acorns?",
            options: ["Oak", "Pine", "Maple", "Birch"],
            correctAnswer: "Oak"
        },
        {
            question: "What is the process by which plants make their own food using sunlight?",
            options: ["Respiration", "Germination", "Photosynthesis", "Digestion"],
            correctAnswer: "Photosynthesis"
        },
        {
            question: "Which animal is known for changing color to blend into its surroundings?",
            options: ["Chameleon", "Lion", "Penguin", "Tiger"],
            correctAnswer: "Chameleon"
        },
        {
            question: "What is the tallest tree species on Earth?",
            options: ["Sequoia", "Redwood", "Pine", "Oak"],
            correctAnswer: "Redwood"
        },
        {
            question: "Which planet is known as the 'Blue Planet'?",
            options: ["Mars", "Earth", "Neptune", "Jupiter"],
            correctAnswer: "Earth"
        },
        {
            question: "What is the primary source of energy for the Earth?",
            options: ["Moon", "Sun", "Ocean", "Wind"],
            correctAnswer: "Sun"
        },
        {
            question: "Which is the fastest land animal?",
            options: ["Cheetah", "Lion", "Antelope", "Horse"],
            correctAnswer: "Cheetah"
        },
        {
            question: "Which ocean is the largest?",
            options: ["Atlantic", "Pacific", "Indian", "Arctic"],
            correctAnswer: "Pacific"
        },
        {
            question: "Which bird is known for its impressive migratory journey?",
            options: ["Eagle", "Penguin", "Swallow", "Parrot"],
            correctAnswer: "Swallow"
        },
        {
            question: "What is the deepest part of the ocean called?",
            options: ["Mariana Trench", "Great Barrier Reef", "Coral Sea", "Bermuda Triangle"],
            correctAnswer: "Mariana Trench"
        },
        {
            question: "Which animal has the longest lifespan?",
            options: ["Tortoise", "Whale", "Elephant", "Human"],
            correctAnswer: "Tortoise"
        },
        {
            question: "Which is the largest type of bear?",
            options: ["Grizzly", "Polar", "Panda", "Black Bear"],
            correctAnswer: "Polar"
        },
        {
            question: "What type of tree produces maple syrup?",
            options: ["Birch", "Oak", "Maple", "Pine"],
            correctAnswer: "Maple"
        },
        {
            question: "What is the term for animals that are active during the night?",
            options: ["Diurnal", "Nocturnal", "Crepuscular", "Vocal"],
            correctAnswer: "Nocturnal"
        },
        {
            question: "Which rainforest is the largest in the world?",
            options: ["Amazon", "Congo", "Southeast Asian", "Daintree"],
            correctAnswer: "Amazon"
        },
        {
            question: "Which flower is known as the symbol of peace?",
            options: ["Rose", "Daisy", "Poppy", "Lotus"],
            correctAnswer: "Poppy"
        },
        {
            question: "What is the largest species of shark?",
            options: ["Great White", "Whale Shark", "Hammerhead", "Tiger Shark"],
            correctAnswer: "Whale Shark"
        },
        {
            question: "Which element is essential for plant growth?",
            options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"],
            correctAnswer: "Nitrogen"
        },
        {
            question: "What is the term for a group of lions?",
            options: ["Herd", "Pack", "Pride", "Troop"],
            correctAnswer: "Pride"
        }    
];
const NaturePage = () =>{
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
            <h1>Test Your Nature IQ</h1>
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

export default NaturePage;