import React, { useState, useEffect } from "react";
import { questions } from "./questions";

const QuizApp = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
	const [yesAnswers, setYesAnswers] = useState(0);
	const [score, setScore] = useState(0);
	const [quizState, setquizState] = useState("started"); // Either state possible started and ended
	const [allScores, setAllScores] = useState([]);

	const averageScore =
		allScores.length > 0
			? allScores.reduce(
					(accumulator, currentValue) => accumulator + currentValue
			  ) / allScores.length
			: 0;
	const handleAnswer = (answer) => {
		let currentScore = 0;

		if (answer === "yes") {
			currentScore = yesAnswers + 1;
			setYesAnswers(currentScore);

			console.log(currentScore);
		}

		// Calculate score
		const newScore = (100 * currentScore) / currentQuestionIndex;
		setScore(newScore);
		console.log(newScore);

		if (currentQuestionIndex <= Object.keys(questions).length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			// Save new scores to localStorage
			localStorage.setItem("scores", JSON.stringify(allScores));
			setAllScores([...allScores, newScore]);
			setquizState("ended");
		}
	};

	const handleClearScores = () => {
		localStorage.removeItem("scores");
		setScore(0);
		setAllScores([]);
	};

	const handelRestart = () => {
		setCurrentQuestionIndex(1);
		setScore(0);
		setYesAnswers(0);

		setquizState("started");
	};

	useEffect(() => {
		const prevScores = JSON.parse(localStorage.getItem("scores")) || [];
		setAllScores(prevScores);
	}, []);

	return (
		<div>
			<h1>Quiz App</h1>

			<div>
				{quizState === "ended" ? (
					<p>Ended</p>
				) : (
					<div>
						<h2>Question {currentQuestionIndex}</h2>
						<p>{questions[currentQuestionIndex]}</p>
						<button onClick={() => handleAnswer("yes")}>Yes</button>
						<button onClick={() => handleAnswer("no")}>No</button>
					</div>
				)}
				<h3>Score: {score.toFixed(2)}</h3>
				<h3>Average Score: {averageScore.toFixed(2)}</h3>
				<button onClick={handelRestart}>Restart</button>
				<button onClick={handleClearScores}>Clear Scores</button>
			</div>
		</div>
	);
};

export default QuizApp;
