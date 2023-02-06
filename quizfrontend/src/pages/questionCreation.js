import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../Components/navbar/navBar';
import UserProfile from '../Components/userSession/UserProfile';

function QuestionCreation() {
    const [state, setState] = useState({
        question: "",
        subjectId: null,
        chapterId: null,
        questionType: "True/False",
        correct: "",
        first: "",
        second: "",
        third: "",
        trueFalse: null,
        pointValue: 0,
      });
      function handleChange(evt) {
        const value = evt.target.value;

        setState({
          ...state,
          [evt.target.name]: value
        });
      } 
      function handleSubmit(evt){
        evt.preventDefault();
      
      const question = {
        question: state.question,
        chapterId:  state.chapterId,
        questionType: state.questionType,
        pointValue: state.pointValue <= 0 ? 1: state.pointValue 
      };
        axios.post('http://localhost:8080/v1/question', question) 
      .then((response) => {
        if(state.questionType === "True/False"){
        const trueFalse = {
          correctAnswer: 1,
          answer: state.trueFalse,
          question: {questionId: response.data.questionId}
        };
        const trueFalse2 = {
          correctAnswer: 0,
          answer: (state.trueFalse === "true" ? "false" : "true"),
          question: {questionId: response.data.questionId}
        };
          axios.all([
            axios.post('http://localhost:8080/v1/answer', trueFalse),
            axios.post('http://localhost:8080/v1/answer', trueFalse2),
          ])
          .then((response) => {
            window.location.reload(false);
            window.location.href="/success"
          })
          .catch(err => {
            alert("question successful");
            if (err.response) {
              alert("error: 'Error when creating answer: \n status: 'BAD_REQUEST'")
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            } else if (err.request) {
              alert("Either no response was received, or a request was never sent.");
              console.log(err.request);
            } else {
              alert("Something went wrong creating question. Please try again.")
            }
          })} else{
            const answer1 = {
              answer: state.first,
              correctAnswer: false,
              question: {questionId: response.data.questionId}
            };
            const answer2 = {
              answer: state.second,
              correctAnswer: false,
              question: {questionId: response.data.questionId}
            };
            const answer3 = {
              answer: state.third,
              correctAnswer: false,
              question: {questionId: response.data.questionId}
            };
            const correct = {
              answer: state.correct,
              correctAnswer: true,
              question: {questionId: response.data.questionId}
            };
            axios.all([
              axios.post('http://localhost:8080/v1/answer', correct),
              axios.post('http://localhost:8080/v1/answer', answer1),
              axios.post('http://localhost:8080/v1/answer', answer2),
              axios.post('http://localhost:8080/v1/answer', answer3),
            ])
            .then(axios.spread(() => {
      
              window.location.reload(false);
              window.location.href="/success"
            }))
             .catch(err => {
            alert("question successful");
              if (err.response) {
                alert("error: '2Error when creating question: \n status: 'BAD_REQUEST'")
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
              } else if (err.request) {
                alert("2Either no response was received, or a request was never sent.");
                console.log(err.request);
              } else {
                alert("Something went wrong creating question. Please try again.")
              }
            })}

      })
      .catch(err => {
        if (err.response) {
          alert("error: 'Error when creating question: \n status: 'BAD_REQUEST'")
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          console.log(err.response.headers);
        } else if (err.request) {
          alert("Either no response was received, or a request was never sent.");
          console.log(err.request);
        } else {
          alert("Something went wrong creating question. Please try again.")
        }
      })

    }
    
      const [subject, setSubject] = useState([]);
      useEffect(() => {
        axios.get("http://localhost:8080/v1/subject/subjects/" + UserProfile.getUsername())
            .then(response => {
              setSubject(response.data.map(item =>({subjectName: item.subjectName, subjectId: item.subjectId})));
              
            }).catch(err => {
              if (err.response) {
                alert("error: 'Error when retrieving questions: status: 'BAD_REQUEST'")
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
              } else if (err.request) {
                alert("Either no response was recieved, or a request was never sent.");
                console.log(err.request);
              }
            })
          .catch(err => console.log(err))
    
    }, []);
        
      const [chapter, setChapter] = useState([]);
      useEffect(() => {
        if(state.subjectId){
        axios.get("http://localhost:8080/v1/chapter/chapters/" + state.subjectId)
            .then(response => {
              setChapter(response.data.map(item =>({chapterTitle: item.chapterTitle, chapterId: item.chapterId})));
            }).catch(err => {
              if (err.response) {
                alert("error: 'Error when retrieving questions: status: 'BAD_REQUEST'")
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
              } else if (err.request) {
                alert("Either no response was recieved, or a request was never sent.");
                console.log(err.request);
              }
            })
          .catch(err => console.log(err))
          }
    }, [state]);        

    return (
      <div>
        
        <Navbar/>
      
      <form style={{borderColor: "white", borderWidth: 3,}} id="login-form" onSubmit={handleSubmit} className="formComponent">
              <h3>Create Question</h3>
                    <label>
                        <h3>Question:</h3>
                        <input type="text" name="question" placeholder="Enter question" onChange={handleChange} required/>
                    </label>
                        <h3>Subject: </h3>
                        <select id="subjectId" value={state.subjectId} name="subjectId" onChange={handleChange}>
                        <option>Select a subject</option>
                        {subject.map(({ subjectName, subjectId }) => (
        <option value={subjectId} >{subjectName}</option>
                        ))}
                        </select>
                  
                       <h3>Chapter:</h3> 
                      
                        <select id="chapterId" value={state.chapterId} name="chapterId" onChange={handleChange}>
                        <option>Select a chapter</option>
                     {chapter.map(({ chapterTitle, chapterId }) => (
        <option value={chapterId} >{chapterTitle}</option>
                        ))}
                        </select>
                       

                        <h3>Question Type:</h3> 
                        <select id="questionType" value={state.questionType} name="questionType" onChange={handleChange}>
                        <option value="True/False">True/False</option>
                        <option value="Multiple Choice">Multiple Choice</option>
                        </select>
                    
                        { state.questionType === "Multiple Choice" ?  <>
                    <label><h3>Correct Answer:</h3>
                      <input type="text" name="correct" placeholder="Enter answer" onChange={handleChange} required/>
                  </label>
                    <label>
                        {state.questionType === "True/False" ? <h3>False:</h3> : <h3>First Wrong Answer:</h3>}
                        <input type="text" name="first" placeholder="Enter answer" onChange={handleChange} required/>
                    </label><label>
              <h3>Second Wrong Answer:</h3>
              <input type="text" name="second" placeholder="Enter answer" onChange={handleChange} required />
            </label><label>

                <h3>Third Wrong Answer:</h3>
                <input type="text" name="third" placeholder="Enter answer" onChange={handleChange} required />
              </label></> : 

              <div className='makeInlineQuestionCreation'><input type="radio" onChange={handleChange} id="true" name="trueFalse" value="true" />
              <label for="true">True </label>
              <input type="radio" id="false" name="trueFalse" value="false" onChange={handleChange}/>
              <label for="false">False</label>
              </div>
              }
              <label>
                        <h3> Point value:</h3> 
                        <input type="number" name="pointValue" placeholder="Point value" onChange={handleChange} required/>
                    </label>
                <div className="creation-button-container">
                  <button onClick={()=> {/*window.location.reload(false);*/ window.location.href="/dashboard"}}>Cancel</button>
                    <input type="submit" id="button"/>
                </div>
            </form>
      </div>
      
    );
  }
  
  export default QuestionCreation;
  
  