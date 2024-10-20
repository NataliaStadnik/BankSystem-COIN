const valid = require('card-validator');

export const targetCards = [
  'visa',
  'mastercard',
  'american-express',
  'jcb',
  'unionpay',
  'maestro',
  'mir',
  'hiper',
  'hipercard',
  'elo',
];

export function cardValidation(inputCard) {
  const inputs = document.getElementsByClassName('order__input');
  const div = document.getElementsByClassName('card-type')[0];
  try {
    const numberValidation = valid.number(inputCard);
    const type = numberValidation.card?.type;

    if (numberValidation.isPotentiallyValid) {
      inputs[0].classList.add('correct-form');
      if (targetCards.includes(type)) {
        div.style.backgroundImage = `url('../assets/img/${type}.svg')`;
      } else {
        div.style.backgroundImage = `none`;
      }
    } else {
      inputs[0].classList.remove('correct-form');
    }

    if (inputCard.length === 0) {
      inputs[0].classList?.remove('correct-form');
    }
  }
  catch(err) {
    console.log(err.message)
  }
}

export function addCardInTable(numberCard) {
  try {
    const numberValidation = valid.number(numberCard);
    const type = numberValidation.card?.type;
    if (targetCards.includes(type)) {
      return `body__img--${type}`;
    } else {
      return '';
    }
  }
  catch(err) {
    console.log(err.message)
  }
}
