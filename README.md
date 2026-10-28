# QuizMaster

QuizMaster is a React/Vite frontend with an Express API that generates quizzes using Gemini.

## Run locally

1. Install frontend dependencies with `npm ci`.
2. Install backend dependencies with `npm --prefix backend ci`.
3. Create `backend/.env` and set `GEMINI_API_KEY` to your Gemini API key.
4. Start the API with `npm --prefix backend start`.
5. In another terminal, start the frontend with `npm run dev`.

The Vite development server proxies `/api` requests to the local backend on port 5000.

## Deploy to Render

This repository includes a Render Blueprint in `render.yaml`. In Render, create a new Blueprint from this repository and set `GEMINI_API_KEY` when prompted. Render builds the frontend and backend into one web service; Express serves the built frontend and API on the same origin.

Keep the Gemini API key in Render's environment settings. Do not put it in frontend environment variables or commit it to the repository. The `/api/health` endpoint is used for the deployment health check.
