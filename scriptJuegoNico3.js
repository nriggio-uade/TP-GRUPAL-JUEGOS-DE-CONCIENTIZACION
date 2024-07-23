const cards = document.querySelectorAll(".card");

let matchedCard = 0;
let cardOne, cardTwo;
let movement = 0;
let disableDeck = false; //para evitar que el usuario clickee otras cards antes que se den vuelta las primeras 2


function flipCard(e){
    let clickedCard = e.target; //obtiene la card clickeada
        if(clickedCard !== cardOne && !disableDeck) {
            clickedCard.classList.add("flip");
            if(!cardOne) {
                //devuelve el valor de cardOne a la carta clickeada
                return cardOne = clickedCard;
            }
            cardTwo = clickedCard;
            disableDeck = true; //deshabilito el tablero para que no clickee el usuario antes de dar vuelta ambas cartas
            let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
            matchCards(cardOneImg,cardTwoImg);
}
}

function matchCards(img1, img2){
    movement++;
    if(img1 === img2){ //si 2 cards son iguales
        matchedCard++; //incremento el valor en 1
        
        if(matchedCard == 8) {
            alert("Ganaste el Juego en "+ movement +" movimientos! Volvé a intentar para mejorar la cantidad de movimientos y tu memoria...y tampoco olvides lo importante que es reducir el consumo de energía no renovable    !!!")
            setTimeout(() => {
                return shuffleCard();
            }, 1000); //llama a reiniciar el juego despues de 5 segundos
            
          }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; //blanqueo el valor de ambas cartas
        return disableDeck = false;
    }
    setTimeout(() => { //agrego la clase shake a ambas cartas despues de 400ms
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => { //le remuevo la clase shake y doy vuelta a ambas cartas despues de 1200ms
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; //blanqueo el valor de ambas cartas
        disableDeck = false;
    }, 1200);

}

function shuffleCard(){ //reinicio el juego
    matchedCard = 0;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; //Creo un array con 8 valores repetidos 1 vez para crear los pares
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); //ordeno la matriz de forma aleatoria
    
    //remuevo la clase "flip" de todas las cartas y les paso un valor aleatorio a cada una
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `img/JuegoNicoRiggio/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });

}

shuffleCard();

cards.forEach(card => { //agregando el evento al hacer click a todas las cards
    card.addEventListener("click", flipCard);
});