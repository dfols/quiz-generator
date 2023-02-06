import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AnswerTable({ list, colNames, component, width = "auto", height = "auto"}) {
    //let keys = getKeysByComponent(component);
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [answerId, setAnswerId] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [answer, setAnswer] = useState(null);

    const onEdit = ({id, currentUnitPrice, anws, correct}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setAnswer(anws)
        setCorrectAnswer(correct)
        setAnswerId(currentUnitPrice);
    }

    const onSave = ({id}) => {
        let newAns = {
            id: id,
            answer: answer,
            correctAnswer: correctAnswer
        }

        //do put call
        if(answer !== undefined || correctAnswer !== undefined){
            axios.put('http://localhost:8080/v1/answer/', newAns)
            .catch(function (error) {
                console.log(error);
            })
            .then((response) => {
                console.log(response.data)
                return response.data;
            });
        } else {
            console.log("new values are undefined!!")
        }

        onCancel();
        window.location.reload();
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setAnswerId(null);
        setCorrectAnswer(null);
        setAnswer(null);
    }

    const onDelete = ({id}) => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })

        let text = "Are you sure you want to delete this Answer?"

        if (window.confirm(text) == true) {
            text = "You pressed OK!";
            axios.delete("http://localhost:8080/v1/answer/"+id)
            .catch(function (error) {
                console.log(error);
            })
            .then((response) => {
                console.log(response.data)
                return response.data;
            });

            window.location.reload()
        }

        setAnswerId(null);
    }
    
    return (
        <div style={{ width: "100%", height: "100%", boxShadow: "6px 6px 12px 6px black", fontSize: "1.6rem" }} className="container">
            <h1 style={{lineHeight: "0px", marginTop: "0px", paddingTop: "60px", paddingBottom: "50px"}}>{component}s:</h1>
            <table cellSpacing="0" 
                style={{ width: "100%", height: height, padding: "10px 15px"}}>
                <thead>
                <tr>
                    <th className={"questionTableth"}>Correct Answer?</th>
                    <th className={"questionTableth"}>Answer</th>
                    <th></th>
                    <th className={"questionTableth"}>Options</th>
                </tr>
                </thead>
                <tbody>
                    {
                        list.map((item) => (
                            <tr key={item.id}>
                                <td className={"questionTableth"}>
                                    {
                                        //inEditMode.status && inEditMode.rowKey === item.id ? (
                                        //    <select id="questionType" value={correctAnswer} name="questionType" 
                                        //    onChange={(event) => setCorrectAnswer(event.target.value)}>
                                        //    <option value={true}>True</option>
                                        //    <option value={false}> False</option>
                                        //    </select>
                                            
                                        //) : 
                                        (
                                            item.correctAnswer
                                        )
                                    }
                                </td>
                                <td className={"questionTableth"}>
                                    {
                                        inEditMode.status && inEditMode.rowKey === item.id ? (
                                            <input value={answer}
                                                onChange={(event) => setAnswer(event.target.value)}
                                            />
                                        ) : (
                                            item.answer
                                        )
                                    }
                                </td>
                                <td></td>
                                <td className={"questionTableth"}>
                                    {
                                        inEditMode.status && inEditMode.rowKey === item.id ? (
                                            <React.Fragment>
                                                <button
                                                    className={"btn-success"}
                                                    onClick={() => onSave({id: item.id})}
                                                >
                                                    Save
                                                </button>

                                                <button
                                                    className={"btn-secondary"}
                                                    style={{marginLeft: 8}}
                                                    onClick={() => onCancel()}
                                                >
                                                    Cancel
                                                </button>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <button
                                                    className={"btn-primary"}
                                                    onClick={() => onEdit({id: item.id, anws: item.answer, correct: item.correctAnswer})}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                className={"btn-deletd"}
                                                onClick={() => onDelete({id: item.id})}
                                                >
                                                Delete
                                                </button>
                                            </React.Fragment>
                                        )
                                    }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AnswerTable