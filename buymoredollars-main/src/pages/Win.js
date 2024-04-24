import React, { useState, useEffect } from 'react';

const Win = () => {
    const winState = localStorage.getItem('win');
    if (!winState) {
        window.location.href = '/';
    }

    const [inputValue, setInputValue] = useState('');

    const prizeTable = [10000, 750, 100, 20];
    const prize = prizeTable[Math.floor(Math.random() * prizeTable.length)];

    let balanceAquired = localStorage.getItem("balanceAquired");

    function mathCheck() {
        console.log(inputValue);
        if (inputValue === "7") {
            console.log("Yippy!")
            let secretBox = document.querySelector(".secretBox");
            secretBox.style.display = "block";
            if (balanceAquired === "true") {
                console.log("Nuh Uh");
            } else {
                localStorage.setItem('balance', prize);
                localStorage.setItem('balanceAquired', "true");
            }
        } else {
            console.log("Uh Oh!")
        }
    }

    function closeButton() {
        let secretBox = document.querySelector(".secretBox");
        secretBox.style.display = "none";
    }



    const lastGameTime = localStorage.getItem('lastGameTime');
    const minTimeBetweenGamesWin = 48 * 60 * 60 * 1000;
    let timeLeft = parseInt(lastGameTime, 10) + minTimeBetweenGamesWin - Date.now();

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
            <div className='winPage'>
                <img src={require('../img/win.png')} alt="Win Screen" className='hamburgerImg'></img>
                <h1>Claim your triumph!</h1>
                <p>Congratulations on conquering the Match Game and securing your victory! Redeeming your well-deserved prizes is a breeze. If you've clinched a win, simply answer a skill-testing question to prove your prowess. Your BuyMore Dollars will then be seamlessly added to your account within 6 to 8 weeks from your triumphant moment. </p>
                <div className='mathContainer'>
                    <div className='math'>
                        <p>3 + 4 = </p>
                        <input className='mathValue' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/> 
                        <button onClick={mathCheck}>Submit</button>
                    </div>
                </div>
                <p>Get ready to savor the sweet taste of success - redemption has never been more rewarding!</p>
                <div className='playAgainWin'>
                    <h1>PLAY AGAIN IN :</h1>
                    <h2>{formatTime(remainingTime)}</h2>
                </div>
                <div className="secretBox">
                    <div className="secretInfo">
                        <h1>Thank You for Playing!</h1> <button className="closeSecret" onClick={closeButton}>X</button>
                        <p>Congratulations!  You nailed it! Your answer is spot on! Your BuyMore Dollars will be swiftly added to your account within 6 to 8 weeks from now. Keep up the great work!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Win;