import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/themes/prism-dark.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

function App() {
	const [code, setCode] = useState("");
	const [review, setReview] = useState("");
	const [loading, setLoading] = useState(false);
	const [language, setLanguage] = useState("javascript");
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const detectAndLoadLanguage = async () => {
			const detectedLanguage = hljs.highlightAuto(code).language;
			try {
				await import(`prismjs/components/prism-${detectedLanguage}.js`);
				setLanguage(detectedLanguage);
			} catch (error) {
				console.error(
					`Language ${detectedLanguage} not supported by Prism.js`
				);
				setLanguage("javascript");
			}
		};

		detectAndLoadLanguage();
	}, [code]);

	const handleReview = async () => {
		setLoading(true);
		setReview("");

		try {
			const response = await fetch(
				`${
					import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
				}/ai/get-review`,
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ code, language }),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`HTTP error! status: ${response.status}, message: ${errorText}`
				);
			}

			const data = await response.text();
			setReview(data);
		} catch (error) {
			console.error("Error generating review:", error);
			setReview(
				`Error generating review: ${error.message}. Please try again.`
			);
		} finally {
			setLoading(false);
		}
	};

	const handleHighlight = (code) => {
		return highlight(
			code,
			languages[language] || languages.javascript,
			language
		);
	};

	const handleClearAll = () => {
		setShowModal(true);
	};

	const confirmClearAll = () => {
		setCode("");
		setReview("");
		setShowModal(false);
	};

	const cancelClearAll = () => {
		setShowModal(false);
	};

	return (
		<div className="app">
			<header>
				<h1>Code Review Assistant</h1>
			</header>
			<main>
				<div className="left">
					<div className="editor-container">
						<div className="line-numbers">
							{code.split("\n").map((_, index) => (
								<div key={index} className="line-number">
									{index + 1}
								</div>
							))}
						</div>
						<Editor
							value={code}
							onValueChange={setCode}
							highlight={handleHighlight}
							padding={12}
							placeholder="Type or paste your code here..."
							className="code-editor"
							style={{
								fontFamily: "'JetBrains Mono', monospace",
								fontSize: 14,
							}}
						/>
					</div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									onClick={handleReview}
									disabled={loading}
								>
									{loading
										? "Analyzing Code..."
										: "Get Code Review"}
								</button>
							</TooltipTrigger>
							<TooltipContent side="top">
								<p>Click to generate a review for your code</p>
							</TooltipContent>
						</Tooltip>
						<button
							onClick={handleClearAll}
							disabled={!code && !review}
						>
							Clear All
						</button>
					</TooltipProvider>
				</div>
				<div className="right">
					<div className="review">
						{loading ? (
							<Skeleton count={7} />
						) : (
							<pre>
								{review || "Your code review will appear here"}
							</pre>
						)}
					</div>
				</div>
			</main>
			{showModal && (
				<div className="modal">
					<div className="modal-content">
						<p>Are you sure you want to clear all content?</p>
						<button onClick={confirmClearAll}>Confirm</button>
						<button onClick={cancelClearAll}>Cancel</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
