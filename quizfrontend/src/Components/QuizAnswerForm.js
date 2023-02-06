import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

function QuizAnswerForm({ list, width = "auto", height = "auto"}) {
    const [value, setValue] = React.useState('');
    const [helperText, setHelperText] = React.useState('Select your answer');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
      }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(list[value].correctAnswer){
            setHelperText('Correct!');
        }
        else{
            setHelperText('Incorrect :(');
        }
      };

    return (
        <><>
            {list.map((item, index) => (
                <><form onSubmit={handleSubmit}></form><RadioGroup
                    name="question"
                    value={value}
                    onChange={handleRadioChange}>
                    <FormControlLabel sx={{ color: "black" }}
                        value={index} control={<Radio />} label={<Box component="div" fontSize={15}>
                            {item.answer /* [0].answer */}
                        </Box>} />
                </RadioGroup></>
            ))}</><FormHelperText>
                {helperText}
            </FormHelperText><Button sx={{ mt: 1, mr: 1 }} type="submit" onClick={handleSubmit} variant="outlined">
                Check Answer
            </Button></>
    )

}

export default QuizAnswerForm