import { Outlet, Link } from "react-router-dom";

function hamburger() {
    let hamburgerIcon = document.getElementById("myLinks");
    if (hamburgerIcon.style.display === "block") {
        hamburgerIcon.style.display = "none";
    } else {
        hamburgerIcon.style.display = "block";
    }
}
function closeNav() {
    let hamburgerIcon = document.getElementById("myLinks");
    hamburgerIcon.style.display = "none";
}

const Layout = () => {

    let value = localStorage.getItem('balance');

    return (
        <>
            <nav>
                <div className="logoBox">
                    <Link to="/"  onClick={closeNav}>
                        <img src={require('../img/logo.png')} alt="Logo Image" className='logoImg'></img>
                    </Link>
                </div>
                <div className="hamburgerBox" onClick={hamburger}>
                    <img src={require('../img/hamburger.png')} alt="Hamburger" className='hamburgerImg'></img>
                </div>
                <div id="myLinks">
                    <Link to="/form" onClick={closeNav}>
                        Sign-up
                    </Link>
                    <Link to="/play" onClick={closeNav}>
                        Play
                    </Link>
                    <Link to="/legal" onClick={closeNav}>
                        Legal
                    </Link>
                    <a>Balance: <span className="greenSpan">{value}</span></a>
                </div>
            </nav>
        <Outlet />
        <footer>
            <p>@ALL RIGHTS RESERVED</p>
        </footer>
    </>
    )
};

export default Layout;