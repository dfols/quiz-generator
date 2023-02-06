import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuestionTable({ list, colNames, component, width = "auto", height = "auto"}) {
    //let keys = getKeysByComponent(component);
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [questionId, setQuestionId] = useState(null);
    const [chapterId, setChapterId] = useState(null);
    const [question, setQuestion] = useState(null);
    const [questionType, setQuestionType] = useState(null);
    const [pointValue, setPointValue] = useState(null);

    const onEdit = ({id, type, quest, points}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setQuestion(quest)
        setQuestionType(type)
        setPointValue(points)
        setQuestionId(id);
    }

    const onSave = ({id}) => {
        let newQuestion = {
            questionId: id,
            question: question,
            questionType: questionType,
            pointValue: pointValue <= 0 ? 1:pointValue 
        }

        console.log("new question: " + JSON.stringify(newQuestion));

        //do put call
        if(chapterId !== undefined || question !== undefined || questionType !== undefined){
            axios.put('http://localhost:8080/v1/question/', newQuestion)
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

        window.location.reload();
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setQuestionId(null);
    }

    const onDelete = ({id}) => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })

        let text = "Are you sure you want to delete this Question?"
        if (window.confirm(text) == true) {
            axios.delete("http://localhost:8080/v1/question/"+id)
            .catch(function (error) {
                console.log(error);
            })
            .then((response) => {
                console.log(response.data)
                return response.data;
            });

            window.location.reload()
        } else {
            text = "You canceled!";
            console.log("id: " + id);
        }
        console.log("text: "+text)

        setQuestionId(null);
        console.log("id: " + id);
    }

    return (
        <div style={{ width: "100%", boxShadow: "6px 6px 12px 6px black", fontSize: "1.6rem" }} className="container">
            <h1 style={{lineHeight: "0px", marginTop: "0px", paddingTop: "50px", paddingBottom: "50px"}}>{component}s:</h1>
            <table cellSpacing="0" 
                style={{ width: "100%", height: height, padding: "10px 15px"}}>
                <thead>
                <tr>
                    <th className={"questionTableth"}>Question</th>
                    <th className={"questionTableth"}>Question Type</th>
                    <th className={"questionTableth"}>Point Value</th>
                    <th className={"questionTableth"}>Options</th>
                </tr>
                </thead>
                <tbody>
                    {
                        list.map((item) => (
                            <tr key={item.questionId}>
                                <td className={"questionTableth"}>
                                    {
                                        inEditMode.status && inEditMode.rowKey === item.questionId ? (
                                            <input value={question} placeholder={question}
                                                onChange={(event) => {setQuestion(event.target.value)}}
                                            />
                                        ) : (
                                            item.question
                                        )
                                    }
                                </td>
                                <td className={"questionTableth"}>
                                    {
                                        //inEditMode.status && inEditMode.rowKey === item.questionId ? (
                                         //   <select id="questionType" value={item.questionType} name="questionType" 
                                         //   onChange={(event) => {setQuestionType(event.target.value); item.questionType = event.target.value }}>
                                         //   <option value="True/False">True/False</option>
                                         //</td>   <option value="Multiple Choice">Multiple Choice</option>
                                          //</tr>  </select>
                                        //) : 
                                        (
                                            item.questionType
                                        )
                                    }
                                </td>
                                <td className={"questionTableth"}>
                                    {
                                        inEditMode.status && inEditMode.rowKey === item.questionId ? (
                                            <input value={pointValue}
                                                onChange={(event) => setPointValue(event.target.value)}
                                            />
                                        ) : (
                                            item.pointValue
                                        )
                                    }
                                </td>
                                <td className={"questionTableth"}>
                                    {
                                        inEditMode.status && inEditMode.rowKey === item.questionId ? (
                                            <React.Fragment>
                                                <button
                                                    className={"btn-success"}
                                                    onClick={() => onSave({id: item.questionId, newUnitPrice: questionId})}
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
                                                    onClick={() => onEdit({id: item.questionId, currentUnitPrice: item.unit_price, quest: item.question, type:item.questionType, points:item.pointValue})}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                className={"btn-deletd"}
                                                onClick={() => onDelete({id: item.questionId})}
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

export default QuestionTable