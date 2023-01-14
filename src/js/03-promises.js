// import dependencies

import Notiflix from 'notiflix';

// refs

const formRefs = document.querySelector('.form');

// add event listener on submit 

formRefs.addEventListener('submit', onSubmitForm);

// fn to create promise

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(objectPromise);
    }
    reject(objectPromise);
  });
}

// fn for on submit form

function onSubmitForm(e) {

  e.preventDefault();

  let delay = Number(e.currentTarget.delay.value);
  let delayStep = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayStep + delay}ms`, { useIcon: false });
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayStep + delay}ms`, { useIcon: false });
        }, delay);
      });
    delay += delayStep;
  }
}

