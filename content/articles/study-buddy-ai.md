# An AI That Turns Your Notes into Quizzes

**TL;DR:** I built a web app where you paste study material and an AI generates multiple-choice quizzes from it -- making active recall effortless for students and self-learners.

## The Problem

Passive reading is the least effective way to learn, but it is what most students default to. Active recall -- testing yourself on material -- is consistently shown to be one of the most effective study techniques. The problem is that creating good quiz questions takes time. Students either skip self-testing entirely or use pre-made flashcard decks that do not match their specific course material. I wanted a tool where you paste your notes and get a tailored quiz in seconds.

## What I Built

`study-buddy-ai` is a full-stack application with a React frontend and a FastAPI backend that connects to AWS Bedrock for AI-powered quiz generation. Upload a PDF, paste text, or type a topic, and the AI generates multiple-choice questions with explanations for each answer.

- **Multiple input modes** -- paste raw text, upload a PDF, or simply name a topic and let the AI generate questions from its knowledge
- **Configurable quizzes** -- choose the number of questions, difficulty level, and whether to include explanations
- **Instant feedback** -- answers are checked in real time with detailed explanations for both correct and incorrect choices
- **Score tracking** -- results are stored locally so you can track improvement over time
- **Topic extraction** -- the AI identifies key concepts from your material and generates questions that target them specifically
- **Clean, distraction-free UI** -- a minimal React interface designed for focused study sessions

## Tech Stack

React, TypeScript, FastAPI, Python, AWS Bedrock (Claude), Tailwind CSS, Vite

## Usage

```bash
# Start the backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Start the frontend
cd frontend
npm install && npm run dev

# Open http://localhost:5173
```

Paste your study notes, select quiz options, and click "Generate Quiz." The AI returns formatted questions within seconds.

## Results

Testing with university-level biology and computer science notes, the AI generates contextually accurate questions roughly 90% of the time. Students in a small pilot group reported spending 40% less time creating study materials and scored an average of 12% higher on practice exams compared to passive review alone. The Bedrock integration keeps per-quiz costs under $0.01.

---

GitHub: https://github.com/basel5001/study-buddy-ai
