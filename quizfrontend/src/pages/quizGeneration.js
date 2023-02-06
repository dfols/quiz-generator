import React, { setState, useState, useEffect } from 'react';
import axios from 'axios';
import UserProfile from '../Components/userSession/UserProfile';
import Navbar from '../Components/navbar/navBar';
import Box from '@mui/material/Box';
import { ReactSession } from 'react-client-session';

function QuizGeneration() {
    const [state, setState] = useState({
        fromChapter: "",
        toChapter: "",
        questionNumber: ""
      });

    const [subjects, setSubjects] = useState([]);
    const [currentSubjectId, setCurrentSubjectId] = useState("");
    const [fromChapter, setFromChapter] = useState("");
    const [toChapter, setToChapter] = useState("");
    const [questionNumber, setQuestionNumber] = useState("");

    function handleFromChapterChange(evt) {
        setFromChapter(evt.target.value);
    }

    function handleToChapterChange(evt) {
        setToChapter(evt.target.value);
    }

    function handleQuestionNumberChange(evt) {
        setQuestionNumber(evt.target.value);
    }

    async function getAllSubjects(){
        await axios.get('http://localhost:8080/v1/subject/subjects/' + UserProfile.getUsername())
        .catch(function (error) {
            console.log(error);
         })
        .then((response) => {
            setCurrentSubjectId(response.data[0].subjectId);
            setSubjects(response.data.map(item =>({subjectName: item.subjectName, subjectId: item.subjectId})));
            return response.data;
        });
    }

    async function generateQuiz(){
        let request = {
            subjectId: currentSubjectId,
            fromChapter: fromChapter,
            toChapter: toChapter,
            numberOfQuestions: questionNumber
        }

        console.log("request: " + request);
        console.log("subjectId: " + currentSubjectId)

        let quizData = await axios.post("http://localhost:8080/v1/quiz", request)
        .catch(function (error){
            console.log(error);
        })
        .then((response) => {
            console.log(response.data);
            return response.data;
        });

        ReactSession.set("currentQuiz", quizData);
        window.location.replace("/quizPage");
    }

    useEffect(async () => {
        await getAllSubjects()
    }, []);

    function handleSubjectDropDownChange(evt) {
        console.log(evt.target.value);
        setCurrentSubjectId(evt.target.value);
    }

    function resetForm() {
        setFromChapter("");
        setToChapter("");
        setQuestionNumber("")
        window.location.reload ()
    }

    return (
        <div>
           
            <Navbar/>
         
             <Box>
             <div style={{borderColor: "white", borderWidth: 3,}} id="login-form" className="formComponent">
             <h3>Generate Quiz</h3>
                    <h3>Subject Name:</h3>
                    <select id="subjectDropdown" onChange={handleSubjectDropDownChange}>
                        {subjects.map(({ subjectName, subjectId }) => (
                            <option value={subjectId} >{subjectName}</option>
                        ))}
                    </select>
                       <label>
                           <h3>From Chapter #</h3>
                           <input type="number" name="fromChapter" onChange={handleFromChapterChange} required/>
                        </label>
                   
                       <label>
                           <h3>To Chapter #</h3> 
                           <input type="number" name="toChapter" onChange={handleToChapterChange} required/>
                       </label>

                       <label>
                           <h3>Number of Questions:</h3> 
                           <input type="number" name="questionNumber" onChange={handleQuestionNumberChange} required/>
                       </label>
                   <div className="creation-button-container">
                     <button onClick={generateQuiz}>Generate</button>
                   </div>
                   <div className="creation-button-container">
                     <button onClick={resetForm}>Cancel</button>
                   </div>
             </div>
             </Box>
             
           </div>
         
       );

}

export default QuizGeneration;