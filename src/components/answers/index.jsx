import React from 'react';
import TextAnswers from './TextAnswers';

const Answers = ({type, choices, onAnswer}) => {
    return <TextAnswers choices={choices} onAnswer={onAnswer} />
}
 
export default Answers;