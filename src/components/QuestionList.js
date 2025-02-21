import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(resp => resp.json())
      .then(data => setQuestions(data))
  }, [])

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem key={question.id} question={question} questions={questions} setQuestions={setQuestions} />)}</ul>
    </section>
  );
}

export default QuestionList;
