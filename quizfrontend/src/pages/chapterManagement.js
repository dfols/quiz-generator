import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Components/navbar/navBar"
import chapterSubjectProfile from '../Components/userSession/chapterSubjectProfile';
import UserProfile from '../Components/userSession/UserProfile';
import Container from '@mui/material/Container';


function ChapterManagement() { 
    const subjectId = chapterSubjectProfile.getSubjectId() !== 0 ? chapterSubjectProfile.getSubjectId() : 1;
    const [, setSubjects] = useState({});
    const [allSubjects, setAllSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [currentSubjectId, setCurrentSubjectId] = useState("");
    const [, setCurrentChapterId] = useState(""); 
   
    async function getAllSubjects(){
        await axios.get('http://localhost:8080/v1/subject/subjects/' + UserProfile.getUsername())
        .catch(function (error) {
            console.log(error);
         })
        .then((response) => {   
            setAllSubjects(response.data.map(item =>({subjectName: item.subjectName, subjectId: item.subjectId})));
            return response.data;
        });
    }

    async function getSubjects(){
        await axios.get('http://localhost:8080/v1/subject/' + subjectId)
        .catch(function (error) {
            console.log(error);
         })
        .then((response) => {
            setCurrentSubjectId(response.data.subjectId);
            setSubjects({subjectName: response.data.subjectName, subjectId: response.data.subjectId});
            getAllChapters(response.data.subjectId);
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
            setCurrentChapterId(response.data.chapterId)
            setChapters(response.data.map(item =>({chapterTitle: item.chapterTitle, chapterId: item.chapterId})));
            return response.data;
        });
    }

    useEffect(async () => {
        await getAllSubjects()
    }, []);

    useEffect(async () => {
        await getSubjects()
    }, []);

    useEffect(async () => {
        await getAllChapters(currentSubjectId)
    }, []);
    function handleSubjectDropDownChange(evt) {
       setCurrentSubjectId(evt.target.value);
       getAllChapters(evt.target.value);
    }
    const storeChapterInfo = (chapterId) => { 
        chapterSubjectProfile.setSubjectId(currentSubjectId);
        chapterSubjectProfile.setChapterId(chapterId);  
        window.location.href="/questionManagement"  
  }
 

    return (

        <div className="LandingPage">
        <Navbar/>
        <div className='main' >
        <h1>Chapter Management</h1>
        <div style={{padding: "75px", paddingTop: "15px"}}>
        <select id="subjectDropdown" onChange={handleSubjectDropDownChange}>
                { allSubjects.map(({ subjectName, subjectId }) => (
            currentSubjectId == subjectId ?  <option value={subjectId} selected>{subjectName} Id:{subjectId} </option>:  <option value={subjectId} >{subjectName} Id:{subjectId}</option>
                   
                ))}
            </select> 
        {chapters.map(({ chapterTitle, chapterId }) => (
               <><p>  {chapterTitle}  </p><button onClick={() => storeChapterInfo(chapterId)}>Manage Questions</button></>
                ))} 
        </div>
        </div>
    </div>
       
     
    );
    
}

    
    export default ChapterManagement;