import axios from 'axios';
import shuffle from 'lodash/shuffle';
import he from 'he';

export const fetchQuizQuestions = () => {
  return axios({
    method: 'GET',
    url: 'https://opentdb.com/api.php?amount=10&category=9&type=multiple'
  })
    .then(response => makeQuestions(response.data.results))
    .catch(console.log);
};

const makeQuestions = questions => {
  return questions.map(makeQuestion);
};

const makeQuestion = ({ question, correct_answer, incorrect_answers }) => {
  const correctPosition = Math.floor(Math.random() * 4);
  const correctAnswer = { text: he.decode(correct_answer), correct: true };
  const shuffledAnswers = shuffle([
    { text: he.decode(incorrect_answers[0]), correct: false },
    { text: he.decode(incorrect_answers[1]), correct: false },
    { text: he.decode(incorrect_answers[2]), correct: false }
  ]);

  shuffledAnswers.splice(correctPosition, 0, correctAnswer);

  return {
    question: he.decode(question),
    correctPosition: correctPosition,
    answers: shuffledAnswers
  };
};

export function getMinutesFromMs(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
