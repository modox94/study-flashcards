/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
const gameId = window.location.pathname.split('/')[2];
const answerForm = document.getElementById('answer');
const answerInput = document.getElementsByClassName('input__text')[0];
const submitButton = document.getElementsByClassName('input__button')[0];
const questionString = document.getElementById('question');
const homeLink = document.getElementById('home');
const trueAnswer = document.getElementById('true__answer');
const nextButton = document.getElementsByClassName('next__button')[0];

async function start() {
  const response = await fetch('/game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gameId,
    }),
  });

  const { currentGame, currentDeck } = await response.json();

  homeLink.href = `/profile/${currentGame.user}`;

  if (currentGame.counterTrueAnswer.length < currentDeck.cards.length) {
    for (const card of currentDeck.cards) {
      if (!currentGame.counterTrueAnswer.includes(card._id)) {
        questionString.innerText = card.question;
        answerForm.name = card._id;
        break;
      }
    }
  } else {
    window.location.href = `/profile/${currentGame.user}`;
  }
}

function nextQuestion(currentGame, currentDeck) {
  answerInput.className = 'input__text';
  submitButton.className = 'input__button';
  nextButton.className = 'next__button hidden';

  let nextCard =
    currentDeck.cards[Math.floor(Math.random() * currentDeck.cards.length)];

  while (currentGame.counterTrueAnswer.includes(nextCard._id)) {
    const randomIndex = Math.floor(Math.random() * currentDeck.cards.length);
    nextCard = currentDeck.cards[randomIndex];
  }

  questionString.innerText = nextCard.question;
  answerForm.name = nextCard._id;
}

async function callbackAnswer(event) {
  event.preventDefault();
  const currentAnswer = event.target.currentAnswer.value;
  const currentAnswerId = event.target.name;

  submitButton.className = 'input__button hidden';
  answerInput.className = 'input__text hidden';

  const response = await fetch('/game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gameId,
      currentAnswerId,
    }),
  });

  const { currentGame, currentDeck, currentTrueAnswer } = await response.json();

  if (currentTrueAnswer === currentAnswer) {
    currentGame.counterTrueAnswer.push(currentAnswerId);
    if (!currentGame.counterAnswer.includes(currentAnswerId)) {
      currentGame.counterFirstTrueAnswer += 1;
    }
    currentGame.counterAnswer.push(currentAnswerId);
    nextButton.className = 'next__button true';
    answerForm.reset();
  } else {
    currentGame.counterAnswer.push(currentAnswerId);
    nextButton.className = 'next__button false';
    answerForm.reset();
  }

  await fetch('/try', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentGame),
  });

  if (currentGame.counterTrueAnswer.length === currentDeck.cards.length) {
    window.location.href = `/profile/${currentGame.user}`;
    return;
  }

  trueAnswer.innerText = 'Правильный ответ: ' + currentTrueAnswer;

  nextButton.addEventListener('click', () => {
    return nextQuestion(currentGame, currentDeck);
  });
}

start();
answerForm.addEventListener('submit', callbackAnswer);
