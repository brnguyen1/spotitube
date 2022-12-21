import { spotifyLogOut, youtubeLogOut } from "../functions/authentication";

function Header() {
    function logOut() {
        spotifyLogOut();
        youtubeLogOut();
        location.href = "/"
    }
    return (
        <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
            <button className="" onClick={() => logOut()}>Log Out</button>
        </nav>
    )
}

export default Header;