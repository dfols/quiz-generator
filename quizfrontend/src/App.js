/* eslint-disable no-unused-vars */

import './App.css';
import UserCreationPage from './pages/userCreationPage';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage'
import Footer from './Components/footer/footer'
import Form from "./pages/notQuestionCreation"
import SubjectCreation from "./pages/subjectCreation"
import QuestionManagement from "./pages/questionManagement"
import ChapterManagement from "./pages/chapterManagement"
import QuestionCreation from "./pages/questionCreation"
import Success from "./pages/success"
import Dashboard from "./pages/dashboard";
import QuizScore from "./pages/quizScore";
import SubjectPage from "./pages/subjectPage";
import QuizPage from "./pages/quizPage";
import QuizCreation from "./pages/quizGeneration";
import { useState } from 'react';
import { ReactSession } from 'react-client-session';

function App() {
  ReactSession.setStoreType("localStorage"); 
  return (
    <div className="App"> 
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/Dashboard" element={<Dashboard />}/>
          <Route path="/notcreatequestion" element={<Form />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/createuser" element={<UserCreationPage />}/>
          <Route path="/createsubject" element={<SubjectCreation />}/>
          <Route path="/quizscore" element={<QuizScore />}/>
          <Route path="/subjectpage" element={<SubjectPage />}/>
          <Route path="/createquestion" element={<QuestionCreation />}/>
          <Route path="/questionManagement" element={<QuestionManagement/>}/>
          <Route path="/success" element={<Success />}/>
          <Route path="/subjectpage" element={<SubjectPage />}/>
          <Route path="/questionManagement" element={<QuestionManagement />}/>
          <Route path="/createQuiz" element={<QuizCreation />}/>
          <Route path="/chapterManagement" element={<ChapterManagement />}/>
          <Route path="/quizPage" element={<QuizPage />}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
