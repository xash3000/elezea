# ELEZEA

An interactive web application that inspires creativity by showing random images and letting users write descriptions. Users receive AI-powered feedback on their writing, including scores, corrections, and suggestions to improve their language skills.

---

## Features

* **Random Image Generation**: Fetches inspiring images from a backend API.
* **Writing Area**: Users describe the image in their own words.
* **Real-time Feedback**: AI evaluates the text and provides detailed corrections and suggestions.
* **Edit and Retry**: Users can edit their submissions based on feedback and resubmit.
* **Responsive UI**: Clean and intuitive design for seamless user experience.

---

## Tech Stack

* **Frontend**: Next.js, React, Tailwind CSS
* **Backend**: ASP.NET Core Web API with SQLite database
* **AI Evaluation**: Natural language processing for feedback and scoring
* **API Proxy**: Next.js API routes proxy requests securely to backend

---

## Getting Started

### Prerequisites

* Node.js (v16 or higher)
* .NET 7 SDK
* SQLite

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/xash3000/elezea](https://github.com/xash3000/elezea)
    ```

2.  Setup backend:
    * Navigate to the backend folder.
    * Configure the `appsettings.json` file with your SQLite connection string and gemini api key.
    * Run the backend server:
        ```bash
        dotnet run
        ```

3.  Setup frontend:
    * Navigate to the frontend folder.
    * Install dependencies:
        ```bash
        npm install
        ```
    * Start the development server:
        ```bash
        npm run dev
        ```

4.  Open your browser and visit `http://localhost:3000` to use the app.

---

## Usage

1.  Click **Generate New Scene** to load a random image.
2.  Write a description in the text area.
3.  Click **Submit for Feedback** to get AI-powered evaluation.
4.  Review the score, corrections, and suggestions.
5.  Use the **Edit Your Description** button to revise and resubmit.
