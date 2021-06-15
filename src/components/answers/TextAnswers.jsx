import React from 'react';

const TextAnswers = ({choices, correctChoice = "Growth & Scale", onAnswer}) => {
    const [selectedChoice, setSelectedChoice] = React.useState(null);

    function handleSelectChoice(choice){
        setSelectedChoice(choice);
        // onAnswer(choice);
    }

    return (
        <div className={`mb-3 px-3 flex flex-col ${selectedChoice && 'pointer-events-none'}`}>
            { choices.map((choice, index) => {
                let statusColor = "";
                if(selectedChoice){
                    let color;
                    
                    if(choice === correctChoice)
                        color = "green";
                    else if(choice === selectedChoice)
                        color = "red";

                    statusColor = !color ? "" : `bg-gradient-to-br from-${color}-300 via-${color}-500 to-${color}-400`;
                }

                return (
                    <button key={index} className={`block mb-3 p-2.5 font-mono text-lg text-center rounded border-2 border-white border-opacity-30 hover:border-opacity-50 hover:bg-white hover:bg-opacity-5 text-white text-opacity-90 hover:text-opacity-100 focus:outline-none ${statusColor}`}
                        onClick={() => handleSelectChoice(choice)}
                    >
                        { choice }
                    </button>
                );
            }) }
        </div>
    );
}
 
export default TextAnswers;