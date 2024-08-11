# Quiz Architect

Quiz Architect is a web-based quiz application that allows users to create, customize, and take quizzes. The application supports both text and image-based quiz questions, providing a flexible platform for learning, assessment, and entertainment. Users can build quizzes with multiple choice questions, track quiz statistics, and view results immediately after completing a quiz.

## Features

- **User Authentication**: Users can sign up and log in to save and manage their quizzes.
- **Quiz Creation**: Create quizzes with multiple choice questions. Each question can have text or image-based answers.
- **Quiz Management**: Edit and delete existing quizzes.
- **Responsive Design**: The application is fully responsive and works across all device sizes.
- **Real-time Timer**: Each quiz has a built-in timer that counts down, adding an element of challenge.
- **Result Tracking**: Users can view their results immediately after completing a quiz, including the number of correct and incorrect answers.
- **Data Persistence**: Quiz data is stored in MongoDB, ensuring that quizzes and results are saved even after a session ends.

## Tech Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Cloud Storage**: Firebase Storage for image uploads
- **Hosting**: Vercel
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or hosted)
- Firebase project with storage and authentication enabled
- Vercel account (for deployment)
- APPS SCRIPT CODE FOR GOOGLE SHEETS INTEGRATION: see googleSheets.txt

### Installation

1. **Clone the repository**:
 
   git clone https://github.com/your-username/quiz-architect.git
   cd quiz-architect
   

2. **Install dependencies**:

   npm install
   

3. **Configure environment variables**:
   Create a `.env.local` file in the root directory and add the following environment variables:

   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
   MONGO_URL=your-mongodb-connection-string
  

4. **Run the application**:
   npm run dev

5. **Open the application**:
   Visit `http://localhost:3000` in your browser to start using the application.

### Deployment

1. **Deploy to Vercel**:
   - Push your changes to your GitHub repository.
   - Go to Vercel and link your GitHub repository.
   - Configure the environment variables in Vercel.
   - Deploy your application with one click.

## Usage

### Creating a Quiz

1. Log in to the application.
2. Navigate to the "Create Quiz" section.
3. Enter the quiz title and select an icon.
4. Add your questions. For each question, you can choose between text-based or image-based choices.
5. Save the quiz.

### Taking a Quiz

1. Browse the available quizzes.
2. Click "Play" on the quiz you want to take.
3. Answer each question before the timer runs out.
4. Submit the quiz to see your score.

### Managing Quizzes

1. Log in to your account.
2. Navigate to "My Quizzes".
3. Click on the quiz you want to edit or delete.
4. Modify the quiz or remove it entirely from your account.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs, features, or improvements.

## Contact

For any inquiries, please reach out at venkateshbijukumar@gmail.com.

