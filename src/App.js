import React, { useState } from 'react';
import Map from './Map';
import Question from './components/question';
import questions from "./sample-questions";

function App() {
  const [answers, setAnswers] = useState([null, null, null, null]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameStarted, setGameStarted] = useState(false);
  let timer = React.createRef();
  let startTime = React.createRef();
  let counterRef = React.createRef(20);
  
  let currentIndex = answers.findIndex(a => a == null);
  if(currentIndex === -1)
    currentIndex = answers.length - 1;

  const correctAnswers = answers.filter((a, i) => a === questions[i].answer);
  const score = correctAnswers.length;

  React.useEffect(() => {
    console.log("Time left chagnged: ", timeLeft, counterRef);
    startTimer();
  }, [])

  React.useEffect(() => {
    if(counterRef.current == null){
      counterRef.current = 20;
    }
  }, [counterRef]);

  function answerQuestion(answer, index){
    setAnswers(
      answers.map((a, i) => {
        if(i === index)
          return answer;

        return a;
      })
    );

    setTimeout(() => {
      setTimeLeft(20);
      counterRef.current = 20;
      startTimer();
    }, 2000);
  }

  function startTimer(){
    startTime.current = new Date();

    timer.current = setInterval(() => {
      counterRef.current = counterRef.current - 1;
      setTimeLeft(counterRef.current - (1/10000000000));

      if(counterRef.current <= 0){
        clearInterval(timer.current);
        setTimeLeft(0);

        let nextIndex = answers.findIndex(a => a == null);
        if(nextIndex === -1)
          nextIndex = answers.length - 1;
          
        answerQuestion("", nextIndex);
      }
    }, 1000);
  }
  
  return (
    <div className="flex h-screen bg-primary text-white relative">
      <div className="pointer-events-none mr-56 z-10 absolute inset-0 bg-gradient-to-r from-primary via-primary"></div>

      <div className="z-20 w-3/5 flex flex-col relative">
        <div className={`h-1 rounded-r-full absolute top-16 mt-1 inset-x-0 bg-gradient-to-r from-red-500 to-green-500 overflow-hidden`}>
          <div className="backdrop-filter backdrop-saturate-0 backdrop-invert-0 h-full absolute right-0"
            style={{width: `${((20 - timeLeft) * 100 / 20)}%` }}
          ></div>
        </div>

        <div className="tracking-wider flex items-center justify-between px-3 py-4">
          <h3 className="logo ml-2 text-2xl font-bold mb-0.5 text-white">
            triviators
          </h3>

          <span className="text-xs bg-white bg-opacity-10 flex items-center rounded py-0.5 px-2.5 border border-white border-opacity-25 mr-6">
            <span className="mr-1 font-semibold text-xs uppercase tracking-widest opacity-90">Time Left:</span>
            <span className="logo font-semibold text-base">{parseInt(timeLeft)}</span>
          </span>

          <span className="text-xs bg-white bg-opacity-10 flex items-center rounded py-0.5 px-2.5 border border-white border-opacity-25">
            <span className="mr-1 font-semibold text-xs uppercase tracking-widest opacity-90">Score:</span>
            <span className="logo font-semibold text-base">{score}</span>
          </span>
        </div>

        <div className="flex-1 flex">
          {
            questions.map((q, index) => {
              const i = index + 1;
              const offsetX = Math.min(i * 3, 10) + "px";
              const offsetY = Math.min(i * 3, 10) + "px";

              return (
                <div className="absolute inset-0 max-w-lg mx-auto flex flex-col items-center justify-center"
                  key={index}
                  style={{
                    transform: `translate3d(${offsetX},${offsetY},0)`, 
                    zIndex: questions.length - index
                  }}
                >
                  <Question
                    {...q}
                    open={currentIndex <= index}
                    index = { index + 1 }
                    label = { `${index + 1} of ${questions.length}` }
                    // status = { !answers[index] ? null : answers[index] === q.answer }
                    onAnswer={a => answerQuestion(a, index)}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
      <div className="-ml-64 flex-1">
        <div className="h-full overflow-hidden sborder-4 border-white border-opacity-40 relative">
          <div className="absolute inset-0">
            <Map details={questions[currentIndex].mapData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
