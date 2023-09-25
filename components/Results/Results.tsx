import { useMemo } from "react";
import { useGlobalProvider } from "hooks";
import { View } from "types";

export const Results = () => {
  const { userAnswers, results, onSetView } = useGlobalProvider();

  const correctAnswers = useMemo(() => {
    const correctAnswersArr = results.map((result) => result.correct_answer.trim());
    return userAnswers.reduce((previous, current, index) => {
      return correctAnswersArr[index] === current.trim() ? previous + 1 : previous;
    }, 0);
  }, [userAnswers, results]);

  return (
    <div>
      <h1 className="is-size-4 mb-4">Your Results: {`${correctAnswers}/${results.length}`}</h1>
      <div>
      {((correctAnswers/results.length)>=0.5)
        ?(
          <div>
          <h1 className="is-size-4 mb-4">YOU PASSED! CONGRATULATIONS!</h1>
          <img src = "happy.gif"></img>
          </div>

         ) : (
          <div>
          <h1 className="is-size-4 mb-4">YOU FAILED! WORK ON YOUR TRIVIA!</h1>
          <img src = "sad.gif"></img>
          </div>
         ) }</div>
      {results.map((result, index) => {
        const isCorrect = result.correct_answer.trim() === userAnswers[index];
        
        return (
          
          <article className={`message ${isCorrect ? 'is-success' : 'is-danger'} mb-4`} key={index}>
            <div className="message-header">
              <p dangerouslySetInnerHTML={{ __html: result.question }} />
            </div>
            <div id = 'cor' className="message-body">
              <p>Your Answer: {userAnswers[index]}</p>
              {!isCorrect && <p>Correct Answer: {result.correct_answer}</p>}
            </div>
          </article>
        );
      })}
      <div className="is-flex is-align-items-center is-justify-content-center py-3">
        <button id = 'bt2' type="button" className="button mx-2" onClick={() => onSetView(View.Quiz)}>Redo</button>
        <button id = 'bt2' type="button" className="button mx-2" onClick={() => onSetView(View.Create)}>New Quiz</button>
      </div>
    </div>
  );
};