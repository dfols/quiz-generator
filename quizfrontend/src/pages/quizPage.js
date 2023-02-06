import React, { useState} from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Navbar from '../Components/navbar/navBarToDash'
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { ReactSession } from 'react-client-session';
import QuizAnswerForm from '../Components/QuizAnswerForm';

function QuizPage() {
    const [value, setValue] = React.useState('');
    const [helperText, setHelperText] = React.useState('Select your answer');

    let currentQuiz = ReactSession.get("currentQuiz")

    const prepareDataList = () =>  {
        let list = []
        for (let i = 0; i < currentQuiz.questions.length; i++) {
            let qId = currentQuiz.questions[i].questionId
            list.push({
                "questionId": currentQuiz.questions[i].questionId,
                "question": currentQuiz.questions[i].question,
                "answers": currentQuiz.questionAnswerMap[qId]})
        }

        console.log("\n\n list: " + JSON.stringify(list)+"\n\n")
        return list
    }

    let quizDisplayList = prepareDataList(currentQuiz);

    const handleSubmit = (event) => {
        event.preventDefault();
        if(value == 2){
            setHelperText('Correct!');
        }
        else{
            setHelperText('Incorrect :(');
        }
      };

    return(
        <div>
            <Navbar />

            <Container sx={{p: 10}}>
                <Paper elevation={10}>
                {
                    quizDisplayList.map((item, index) => (
                    <form onSubmit={handleSubmit}>
                        
                    <FormControl sx={{ m: 3 }} variant="standard">
                        <FormLabel sx={{fontSize: 24}}>{item.question}</FormLabel>
                        <QuizAnswerForm list={item.answers}></QuizAnswerForm>
                    </FormControl>
                    </form>
                ))}
                </Paper>
            </Container>
        </div>
    );
}

export default QuizPage;