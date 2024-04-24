import { useState, useEffect } from "react";
import shuffledGameImages from "../Components/GameImages";

const Tile = ({ timer, setTimer, flippedCount, setFlippedCount }) => {
    const [clickedTiles, setClickedTiles] = useState(Array(shuffledGameImages.length).fill(false));
    const [cardCount, setCardCount] = useState(0);
    const [matchArray, setMatchArray] = useState([]);
    const [isClickable, setIsClickable] = useState(true);
    useEffect(() => {
        const lastGameTime = localStorage.getItem('lastGameTime');
        const minTimeBetweenGamesWin = 48 * 60 * 60 * 1000;
        const minTimeBetweenGamesLose = 24 * 60 * 60 * 1000;
        const loseState = localStorage.getItem('lose');
        const winState = localStorage.getItem('win');

        if (loseState === 'true') {
            if (lastGameTime && new Date().getTime() - parseInt(lastGameTime) < minTimeBetweenGamesLose) {
                setIsClickable(false);
            }
        }

        if (winState === 'true') {
            if (lastGameTime && new Date().getTime() - parseInt(lastGameTime) < minTimeBetweenGamesWin) {
                setIsClickable(false);
            }
        }
    }, []);

    const handleFlip = (id) => {
        if (isClickable && cardCount < 2 && !clickedTiles[id - 1]) {
            const updatedClickedTiles = [...clickedTiles];
            updatedClickedTiles[id - 1] = true;
            setClickedTiles(updatedClickedTiles);
            setCardCount(cardCount + 1);
            setMatchArray(prevMatchArray => [...prevMatchArray, shuffledGameImages[id - 1].match]);
        }
    };

    useEffect(() => {
        if (cardCount === 2) {
            setIsClickable(false);
            checkMatch();
            setCardCount(0);
        }
    }, [cardCount]);

    const checkMatch = () => {
        console.log(matchArray);
        if (matchArray.length === 2 && matchArray[0] === matchArray[1]){
            console.log("match")
            setTimeout(() => {
                setMatchArray([]);
                setIsClickable(true);
            }, 1000);
            setFlippedCount(flippedCount + 1);
        } else {
            setTimeout(() => {
                const updatedClickedTiles = [...clickedTiles];
                updatedClickedTiles.fill(false);
                setClickedTiles(updatedClickedTiles);
                setMatchArray([]);
                setIsClickable(true);
                setFlippedCount(0);
            }, 1000);
        }
    };

    return (
        <>
            {shuffledGameImages.map((image) => (
                <div key={image.id} className="tile" onClick={() => handleFlip(image.id)}>
                    <img src={clickedTiles[image.id - 1] ? image.cardBack : image.cardFront} alt={`Tile ID: ${image.id}`} />
                </div>
            ))}
        </>
    );
};

export default Tile;
