//запускаем функцию ожидания конца загрузки страницы
document.addEventListener('DOMContentLoaded', function () {
// Create a list that holds all of your cards*/
let cardbase = ['RUSSIA','SPAIN','USA','UK','GERMANY','JAPAN','BRAZIL','CANADA',
             'CHINA','FRANCE','GREECE','INDIA','ITALY','MEXICO','PERU','POLAND'];
let cardslice =[];
let cards =[];
let order  = [];
let opencards =0;
let steps = 0;
let starttime = 0;
let finishtime = 0;
let startclock =0;
let time = '00:00';
let clocktimer;
let star = '&#9733; &#9733; &#9733;';
document.getElementById("steps").value = steps;
const table = document.getElementsByClassName('container');
const oldcards = document.getElementsByClassName('deck');
const res = document.getElementById('restart');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//Function gives time in secs
function showTime(){
  if (starttime===0){
    starttime =performance.now();
    time = '00:00';
    startclock = 1;
    timer();
    document.getElementById('time').innerHTML = time;
  }
  else{
    if(order.length === 15){
    finishtime =performance.now();
    time = (finishtime-starttime);
    startclock = 0;
    clearInterval(clocktimer);
    openCongrads();}
    else if((performance.now()-starttime)>3600000){
      startclock = 0;
      clearInterval(clocktimer);
      time = 'More 1 hour';
      document.getElementById('time').innerHTML = time;
    }
  }
}
const timer = () => {
   clocktimer = setInterval(function() {
      time = performance.now()-starttime;
      if(time != document.getElementById('time').innerHTML){
         document.getElementById('time').innerHTML = msToTime(time);}
    }, 1000);
}
//Formated time value
function msToTime(duration) {
  let s = parseInt((duration / 1000) % 60);
  let  m = parseInt((duration / (1000 * 60)) % 60);
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
  return  m + ":" + s ;
}
// Create stars depends of steps
const stars = () => {
  if((steps*2 + 16 -order.length) < 28){
    star = `&#9733; &#9733; &#9733;`;
  }
  else if ((steps*2 + 16 -order.length) < 38) {
    star = '&#9733; &#9733;';
  }
  else {
    star = '&#9733;';
  }
  if(star != document.getElementById('star').innerHTML){
    document.getElementById('star').innerHTML = star;
 }
}
const respondToTheClick = (evt) => {
  showTime();
  stars();
    if (steps != document.getElementById('steps').innerHTML){
    document.getElementById('steps').innerHTML = steps;}
  if (evt.target.className === "card"){
    let y = evt.target.id;
    order.push(y);
      if (opencards === 0){
        steps += 1;
        evt.target.className = "card show";
        opencards = cards[y];
        evt.target.removeEventListener('click', respondToTheClick);
      }
      else {
        if (opencards === cards[y]){
           evt.target.className = "card show";
           opencards = 0;
           evt.target.removeEventListener('click', respondToTheClick);
        }
        else{
        evt.target.className = "card show";
        setTimeout(()=>  evt.target.className = "card", 599);
        order.pop(y);
        console.log(String(order[order.length - 1]));
        document.getElementById(String(order[order.length - 1])).addEventListener('click', respondToTheClick);
        opencards = 0;
        const del = document.getElementById(order.pop(y));
        setTimeout(() => del.className = "card", 799);
      }
    }
  }
  console.log('opencards '+ opencards);
  console.log('order '+ order);
}
function shuffleCards(cardbase){
   shuffle(cardbase);
   cardslice = cardbase.slice(0,8);
   cards.push( ...cardslice );
   cards.push( ...cardslice );
   shuffle(cards);
   return cards;
}
// Create new cards on the table
const newCards = () => {
  const newcards = document.createElement('ul');
  const ccards = document.getElementById('shadows');
  newcards.className = "deck";
  let i = 0;
  for (var card of cards){
      const newCard = document.createElement('li');
      newCard.className = "card match" ;
      newCard.id = 'p'+i;
      newcards.appendChild(newCard);
      const newFigure = document.createElement('figure');
      const newImg = document.createElement('img');
      const newCountry = document.createElement('figcaption');
      newCountry.textContent =`${cards[i]}`;
      newImg.setAttribute('src', `img/${cards[i]}.png`);
      newImg.setAttribute('alt', `${cards[i]}`);
      newCard.appendChild(newFigure);
      newFigure.appendChild(newImg);
      newFigure.appendChild(newCountry);
      const newCCard = document.createElement('li');
      newCCard.className = "card";
      newCCard.id = i;
      newCCard.addEventListener('click', respondToTheClick);
      ccards.appendChild(newCCard);
      i += 1;
    }
  const parentDiv = oldcards[0].parentNode;
  parentDiv.replaceChild(newcards, oldcards[0]);
}
const restartGame = () => {
  cards = [];
  shuffleCards(cardbase);
  steps = 0;
  time = '00:00';
  star = '&#9733; &#9733; &#9733;';
  order  = [];
  opencards = 0;
  starttime = 0;
  finishtime =0;
  startclock = 0;
  clearInterval(clocktimer);
  document.getElementById('time').innerHTML = time;
  document.getElementById('steps').innerHTML = steps;
  document.getElementById('star').innerHTML = star;
  const paras = document.getElementsByClassName('card');
  while(paras[0]) {paras[0].parentNode.removeChild(paras[0]);}
  newCards();
}
const openCongrads = () => {
  const fonbox =  document.createElement('div');
  fonbox.id = 'layer3';
  table[0].appendChild(fonbox);
  const fon = document.createElement('div');
  fonbox.appendChild(fon);
  fon.id = 'fon';
  const popbox =  document.createElement('div');
  popbox.id = 'layer4';
  popbox.className = 'popup';
  table[0].appendChild(popbox);
  popbox.innerHTML =`<div id="congrad">
    <div id = finish> <img src='img/finish.png' alt = 'congadulations!'></img></div>
    <div  id=finishtext> <h6 id=text></h6></div>
     </div>
     <button id='button'>New Game</button>`;
  const button = document.getElementById('button');
  const text = document.getElementById('text');
  text.innerHTML = 'Congratulation!!!<br>Your time: '+ msToTime(time) +' min:sec<br>Steps :'+(steps+1)+'<br>'+star;
  button.addEventListener('click', closeCongrads);
}
const closeCongrads = () => {
  const fonbox =  document.getElementById('layer3');
  const popbox =  document.getElementById('layer4');
  fonbox.remove();
  popbox.remove();
  restartGame();
}
shuffleCards(cardbase);
newCards();
document.getElementById('time').innerHTML = time;
document.getElementById('star').innerHTML = star;
document.getElementById('steps').innerHTML = steps;
res.addEventListener('click', restartGame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 })
