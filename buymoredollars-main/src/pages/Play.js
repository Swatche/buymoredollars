import Tile from "../Components/Tile";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Play = () => {

    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = '/form';
    }

    const [timer, setTimer] = useState(20);
    const [flippedCount, setFlippedCount] = useState(0);

    useEffect(() => {

        const loseState = localStorage.getItem('lose');
        const winState = localStorage.getItem('win');
        
        if (winState === "true" || loseState === "true") {
            document.querySelector('.playButton').style.display = 'none';
        } else {
            document.querySelector('.modalTimer').style.display = 'none';
        }



        let intervalId;

        const startInterval = () => {
            document.querySelector('.gameModal').style.display = 'none';
            intervalId = setInterval(() => {
                setTimer(timer => {
                    console.log('Timer:', timer);
                    if (timer === 0) {
                        clearInterval(intervalId);
                        window.location.href = '/lose';
                        localStorage.setItem('lastGameTime', new Date().getTime());
                        localStorage.setItem('lose', true);
                        return 0;
                    }
                    return timer - 1;
                });
            }, 1000);
        };

        let startButton = document.querySelector(".playButton");

        startButton.addEventListener("click", startInterval);


        if (flippedCount === 5) {
            clearInterval(intervalId);
            window.location.href = '/win';
            localStorage.setItem('lastGameTime', new Date().getTime());
            localStorage.setItem('win', true);
        } 

        const lastGameTime = localStorage.getItem('lastGameTime');
        const minTimeBetweenGamesWin = 48 * 60 * 60 * 1000;
        const minTimeBetweenGamesLose = 24 * 60 * 60 * 1000;
        
        if (loseState === 'true') {
            if (lastGameTime && new Date().getTime() - parseInt(lastGameTime) < minTimeBetweenGamesLose) {
                clearInterval(intervalId);
            } else if (lastGameTime && new Date().getTime() - parseInt(lastGameTime) > minTimeBetweenGamesLose) {
                localStorage.removeItem('lose');
                localStorage.removeItem('lastGameTime');
            }
        }



        if (winState === 'true') {
            if (lastGameTime && new Date().getTime() - parseInt(lastGameTime) < minTimeBetweenGamesWin) {
                const timeLeft = minTimeBetweenGamesWin - (new Date().getTime() - parseInt(lastGameTime));
                console.log(`Please wait ${Math.ceil(timeLeft / (60 * 1000))} minutes before playing again.`);
                clearInterval(intervalId);
            } else if (lastGameTime && new Date().getTime() - parseInt(lastGameTime) > minTimeBetweenGamesWin) {
                localStorage.removeItem('win');
                localStorage.removeItem('lastGameTime');
                localStorage.setItem('balanceAquired', "false");
            }
        }

    }, [flippedCount]);


    const loseState = localStorage.getItem('lose');
    const winState = localStorage.getItem('win');
    let minTimeBetweenGames;

    if (winState === "true") {
        minTimeBetweenGames = 48 * 60 * 60 * 1000;
    } else if (loseState === "true") {
        minTimeBetweenGames = 24 * 60 * 60 * 1000;
    }

    const lastGameTime = localStorage.getItem('lastGameTime');
    let timeLeft = parseInt(lastGameTime, 10) + minTimeBetweenGames - Date.now();

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
           
        <section className="instructions">
            <h1>Instructions</h1>
            <p className="introText">Step into the thrill of the BuyMore Dollars Match Game – a high-speed challenge with 10 vibrant tiles awaiting your magic touch. Your mission? Make a lightning-fast five matches within a heart-pounding 20-second countdown.</p>
            <p className="introText">If you need to check again, Here is a link to our <Link to="/legal"><span className="greenSpan">Terms and Conditions.</span></Link></p>


            <table>
  <tbody>
    <tr>
      <td><h2>PRIZE AMOUNT</h2></td>
      <td><h2>WINNINGS</h2></td>
    </tr>
    <tr>
      <td><p>1</p></td>
      <td><p>10,000</p></td>
    </tr>
    <tr>
      <td><p>5</p></td>
      <td><p>750</p></td>
    </tr>
    <tr>
      <td><p>10</p></td>
      <td><p>100</p></td>
    </tr>
    <tr>
      <td><p>100</p></td>
      <td><p>20</p></td>
    </tr>
  </tbody>
</table>

        </section>
            
        <section className="gameBoard">
            <div className="gameModal">
                <div className="modalTimer">
                    <h1>{formatTime(remainingTime)}</h1>
                </div>
                <button className="playButton">Start Now</button>
            </div>
            <div className="timer">
                <h2 id="timerValue">{timer}</h2>
            </div>

            <div className="gameCards">
                <Tile timer={timer} setTimer={setTimer} flippedCount={flippedCount} setFlippedCount={setFlippedCount} />            
            </div>
        </section>
            
        </div>
    );
}
export default Play;