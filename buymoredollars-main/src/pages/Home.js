import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className='root'>
            <div className="heroBox">
                <img src={require('../img/hero.png')} alt="Hero Image" className='heroImg'></img>
            </div>
            <div className='aboutInfo'>
                <h1>WELCOME TO THE MATCH GAME EXTRAVAGANZA!</h1>
                <p>Prepare for an exhilarating journey of fun and surprises with our Match Game. Whether you're a seasoned gamer or a casual player, everyone's invited to join the excitement. Dive in, match your way to victory, and discover a world of thrilling rewards. Let the match begin!</p>
                <div className='aboutLinks'>
                    <Link to="/form">
                        <img src={require('../img/signplay.png')} alt="Hamburger" className='hamburgerImg'></img>
                    </Link>
                    <Link to="/legal">
                        <div className="learnBox"><p>LEARN<br></br>MORE</p></div>
                    </Link>
                </div>
            </div>
            <div className="redeemBox">
                <h1>Redeem On</h1>
                <div className="redeemItemsBox">
                    <div className="brandBox">
                        <img src={require('../img/tacoraco.png')} alt="Taco Raco"></img>
                        <p className='redeemItems1'>Taco Superstore</p>
                    </div>
                    <div className="brandBox">
                        <img src={require('../img/cabbage.png')} alt="Just Fries"></img>
                        <p className='redeemItems2'>Raw-Cabbage-on-a-stick Hut </p>
                    </div>
                    <div className="brandBox">
                        <img src={require('../img/kicks.png')} alt="Beer4Ever"></img>
                        <p className='redeemItems3'>Fresh Kicks-o-matic</p>
                    </div>
                    <div className="brandBox">
                        <img src={require('../img/wocoburger.png')} alt="Woco-Burger"></img>
                        <p className='redeemItems4'>Glorbotronic Burgers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;