## Features
- View and create discussion threads
- Add and delete replies to threads
- Database with SQLite
### Frontend
- React
- React Router
- Context API
### Backend
- Express.js
- SQLite database
- Better-sqlite3

## Install Required Tools

Copy and paste these commands in your terminal:

```bash
# 1. Install or update Homebrew
# 2. Install Node.js and npm (or upgrade if already installed)
brew install node || brew upgrade node

# 3. Verify installation
node -v   # Should show v16 or higher
npm -v    # Should show v8 or higher
```
## Installation
2. Install dependencise
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```
## Running the Application (Development Mode)

1. Start the Backend Server:
```bash
cd backend
npm start
```
The backend will run on `http://localhost:3001`

2. In a new terminal, start the Frontend Development Server:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/threads` - Get all threads
- `GET /api/threads/:id` - Get a specific thread with replies
- `POST /api/threads` - Create a new thread
- `DELETE /api/threads/:id` - Delete a thread
- `POST /api/threads/:threadId/replies` - Add a reply to a thread
- `DELETE /api/threads/replies/:id` - Delete a reply
