import React, { useState, useEffect } from 'react';

const Lose = () => {
    const loseState = localStorage.getItem('lose');
    if (!loseState) {
        window.location.href = '/';
    }

    const lastGameTime = localStorage.getItem('lastGameTime');
    const minTimeBetweenGamesLose = 24 * 60 * 60 * 1000;
    let timeLeft = parseInt(lastGameTime, 10) + minTimeBetweenGamesLose - Date.now();

    const [remainingTime, setRemainingTime] = useState(timeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                } else {
                    return prevTime - 1000;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (time) => {
        const hours = Math.floor(time / (60 * 60 * 1000)).toString().padStart(2, '0');
        const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000)).toString().padStart(2, '0');
        const seconds = Math.floor((time % (60 * 1000)) / 1000).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className='root'>
            <div className='losePage'>
                <img src={require('../img/lose.png')} alt="Lose Screen" className='hamburgerImg'></img>
                <h1>Oops, not a match!</h1>
                <p>Better luck next time! You've just played the Match Game, so you'll need to wait until your cooldown period ends. Hang tight and get ready to jump back into the fun for another shot at victory!</p>
                <p>For consolation coupon winners, rejoice as your $2.00 off any purchase over $50 at Raw-Cabbage-on-a-stick Hut is ready to enhance your next experience. </p>
                <h1>Code: SFA-413-F21</h1>
                <div className='playAgainLose'>
                    <h1>PLAY AGAIN IN :</h1>
                    <h2 className='timeLeftLose'>{formatTime(remainingTime)}</h2>
                </div>
            </div>
        </div>
    );
}

export default Lose;
