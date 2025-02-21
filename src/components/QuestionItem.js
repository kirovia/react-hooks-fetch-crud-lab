import React from "react";

function QuestionItem({ question, questions, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(e) {
    fetch(`http://localhost:4000/questions/${question.id}`, {method: 'DELETE'})
      .then(resp => resp.json())
      .then(() => {
        const newQuestions = questions.filter(item => item.id === question.id ? false : true)
        setQuestions(newQuestions)
      })
  }

  function handleChange(e) {
    const newIndex = e.target.value
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        correctIndex: newIndex
      })
    })
      .then(resp => resp.json())
      .then(updatedItem => {
        const updatedItems = questions.map(item => updatedItem.id === item.id ? updatedItem : item)
        setQuestions(updatedItems)
      })
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
