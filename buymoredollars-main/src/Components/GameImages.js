import card1 from "../img/gameImages/card1.png";
import card2 from "../img/gameImages/card2.png";
import card3 from "../img/gameImages/card3.png";
import card4 from "../img/gameImages/card4.png";
import card5 from "../img/gameImages/card5.png";
import cardFrontImg from "../img/gameImages/cardback.png";


// Initial GameImages array
const GameImages = [
    { id: 1, cardBack: card1, cardFront: cardFrontImg, matched: false,match: 1, clicked: false},
    { id: 2, cardBack: card2, cardFront: cardFrontImg, matched: false,match: 2, clicked: false},
    { id: 3, cardBack: card3, cardFront: cardFrontImg, matched: false,match: 3, clicked: false},
    { id: 4, cardBack: card4, cardFront: cardFrontImg, matched: false,match: 4, clicked: false},
    { id: 5, cardBack: card5, cardFront: cardFrontImg, matched: false,match: 5, clicked: false},
    { id: 6, cardBack: card1, cardFront: cardFrontImg, matched: false,match: 1, clicked: false},
    { id: 7, cardBack: card2, cardFront: cardFrontImg, matched: false,match: 2, clicked: false},
    { id: 8, cardBack: card3, cardFront: cardFrontImg, matched: false,match: 3, clicked: false},
    { id: 9, cardBack: card4, cardFront: cardFrontImg, matched: false,match: 4, clicked: false},
    { id: 10, cardBack: card5, cardFront: cardFrontImg, matched: false,match: 5, clicked: false}
];

// Function to shuffle two arrays simultaneously
function shuffleArrays(array1, array2) {
    let currentIndex = array1.length, temp1, temp2, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap it with the current element.
        temp1 = array1[currentIndex];
        array1[currentIndex] = array1[randomIndex];
        array1[randomIndex] = temp1;

        // Swap matching element in the second array.
        temp2 = array2[currentIndex];
        array2[currentIndex] = array2[randomIndex];
        array2[randomIndex] = temp2;
    }

    return [array1, array2];
}

// Shuffle the 'cardBack' and 'match' values while keeping the same IDs
const shuffledArrays = shuffleArrays(GameImages.map(image => image.cardBack), GameImages.map(image => image.match));
const shuffledCardBack = shuffledArrays[0];
const shuffledMatch = shuffledArrays[1];

const shuffledGameImages = GameImages.map((image, index) => ({
  ...image,
  cardBack: shuffledCardBack[index],
  match: shuffledMatch[index]
}));

export default shuffledGameImages;

