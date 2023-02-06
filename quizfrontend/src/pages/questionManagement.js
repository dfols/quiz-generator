import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import UserProfile from '../Components/userSession/UserProfile';
import Navbar from '../Components/navbar/navBar';
import Table from '../Components/table';
import TableTwo from '../Components/QuestionTable';
import AnswerTable from '../Components/AnswerTable';
import chapterSubjectProfile from '../Components/userSession/chapterSubjectProfile'
function QuestionManagement() {
    const [questionDisplayList, setQuestionDisplayList] = useState([]);
    const [questionDropdownList, setQuestionDropdownList] = useState([]);
    const [answerDisplayList, setAnswerDisplayList] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [currentSubjectId, setCurrentSubjectId] = useState(""); //chapterSubjectProfile.setCurrentSubjectId()
    const [currentChapterId, setCurrentChapterId] = useState(""); 

    async function getAllQuestions(chapterId){
        let QandAs = await axios.get('http://localhost:8080/v1/question/all/' + UserProfile.getUsername())
        .catch(function (error) {
            console.log(error);
         })
        .then((response) => {
            return response.data;
        });

        //reset list values
        await setQuestionDropdownList([]);
        await setQuestionDisplayList([]);
        await setAnswerDisplayList([]);

        let questionList = []
        let initialQuestionId = QandAs[0].question.questionId;
        let retrievedQuestionId = 0;

        for(let i = 0; i < QandAs.length; i++){
            
            if (chapterId === undefined) {
                setCurrentChapterId(QandAs[i].question.chapterId)
                chapterId = QandAs[i].question.chapterId;
            }

            if(chapterId == QandAs[i].question.chapterId){
                questionList.push(QandAs[i].question);
               
            } else {
                retrievedQuestionId = null;
            }
        }

        let a = []
      
        await setQuestionDropdownList(questionList);
      
         if(retrievedQuestionId == 0){
            
            await setQuestionDisplayList([await getQuestionById(initialQuestionId)]);
            a = await getAnswersByQuestionId(initialQuestionId);
        } else if(retrievedQuestionId != null){
            
            await setQuestionDisplayList([await getQuestionById(retrievedQuestionId)]);
            a = await getAnswersByQuestionId(retrievedQuestionId);
        }
        //This pretty much rewrites the above. It might mess something up.
        await setQuestionDisplayList([await getQuestionById(questionList[0].questionId)]);
        a = await getAnswersByQuestionId(questionList[0].questionId);

        await setAnswerDisplayList(convertAnswerArray(a));
        chapterSubjectProfile.setSubjectId(0);
        chapterSubjectProfile.setChapterId(0);
    }

    async function getAllSubjects(){
        await axios.get('http://localhost:8080/v1/subject/subjects/' + UserProfile.getUsername())
        .catch(function (error) {
            console.log(error);
         })
        .then((response) => {
            if(chapterSubjectProfile.getSubjectId() !== 0){
                setCurrentSubjectId(chapterSubjectProfile.getSubjectId());
                getAllChapters(chapterSubjectProfile.getSubjectId());
            }else{ 
                setCurrentSubjectId(response.data[0].subjectId);
                getAllChapters(response.data[0].subjectId);
            }
              
            setSubjects(response.data.map(item =>({subjectName: item.subjectName, subjectId: item.subjectId})));
            return response.data;
        });
    }

    async function getAllChapters(subId){
        console.log("subject id: " + subId)
        await axios.get("http://localhost:8080/v1/chapter/chapters/" + subId)
        .catch(function (error) {
            console.log(error);
        })
        .then((response) => {
            if(chapterSubjectProfile.getChapterId() !== 0){
                setCurrentChapterId(chapterSubjectProfile.getChapterId());
                getAllQuestions(chapterSubjectProfile.getChapterId());
            }else{ 
                setCurrentChapterId(response.data[0].chapterId)
                getAllQuestions(response.data[0].chapterId);
            }
            setChapters(response.data.map(item =>({chapterTitle: item.chapterTitle, chapterId: item.chapterId})));
            
            return response.data;
        });
    }

    async function getQuestionById(questionId){
        return axios.get('http://localhost:8080/v1/question/' + parseFloat(questionId))
        .catch(function (error) {
            console.log(error);
         })
        .then((response) => {
            return response.data;
        });
    }

    async function getAnswersByQuestionId(questionId){
        return axios.get('http://localhost:8080/v1/answer/answers/' + parseFloat(questionId))
        .catch(function (error) {
            console.log(error);
         })
        .then((response) => {
            return response.data;
        });
    }

    useEffect(async () => {
        await getAllSubjects()
    }, []);

    useEffect(async () => {
        await getAllChapters(currentSubjectId)
    }, []);

    useEffect(async () => {
        await getAllQuestions(currentChapterId)
    }, []);

    function handleSubjectDropDownChange(evt) {
        setCurrentSubjectId(evt.target.value);
        getAllChapters(evt.target.value);
    }

    function handleChapterDropDownChange(evt) {
        setCurrentChapterId(evt.target.value);
        getAllQuestions(evt.target.value);
    }

    async function handleQuestionDropDownChange(evt) {
        let q = [await getQuestionById(evt.target.value)];
        setQuestionDisplayList(q);

        let a = await getAnswersByQuestionId(evt.target.value);
        setAnswerDisplayList(convertAnswerArray(a));
    }

    function convertAnswerArray(ans){
        let ansList = []
        
        for(let i = 0; i < ans.length; i++){
            let data = {
                "id": ans[i].id,
                "correctAnswer": ans[i].correctAnswer.toString(),
                "answer": ans[i].answer
            }
            ansList.push(data);
        }
        return ansList;
    }

    
    //current table wont work with structure, change that
    const colNames = ["Question Id", "Chapter Id", "Question", "Question Type", "Options", ]
    const colTwoNames = ["Answer Id", "Correct Answer?", "Answer", "Options", ]
      
return (
    <div className="LandingPage">
        <Navbar/>
        <Box><div style= {{paddingTop: "5rem", paddingLeft: "30rem", paddingRight: "30rem", paddingBottom: "10rem"}}>
            
            <select id="subjectDropdown" onChange={handleSubjectDropDownChange}>
                
                {subjects.map(({ subjectName, subjectId }) => (
            currentSubjectId == subjectId ?  <option value={subjectId} selected>{subjectName} </option>:  <option value={subjectId} >{subjectName} </option>
                   
                ))}
            </select>
            <select id="chapterDropdown" onChange={handleChapterDropDownChange}>
                {chapters.map(({ chapterTitle, chapterId }) => (       
            currentChapterId == chapterId ?  <option value={chapterId} selected>{chapterTitle} </option>:  <option value={chapterId} >{chapterTitle} </option>
                ))}
            </select>
            <select id="questionDropdown" onChange={handleQuestionDropDownChange}>
                {questionDropdownList.map(({ question, questionId }) => (
                    <option value={questionId} >{question}</option>
                ))}
            </select>
            <TableTwo list={questionDisplayList} component={"Question"}></TableTwo>
            <AnswerTable list={answerDisplayList} component={"Answer"}></AnswerTable>
        </div></Box>
        
    </div>
    )
};  
  export default QuestionManagement;