import { Navigate, useLocation } from "react-router-dom";
import { useMemo, useEffect, useState } from 'react';
import { getSpotifyAccessToken, getYoutubeAccessToken } from "../functions/api";

function Token(props) {
    const [auth, setAuth] = useState(false)
    const { search } = useLocation();

    let query = useMemo(() => new URLSearchParams(search), [search]);


    useEffect(() => {
        if (props.type === "spotify") {
            getSpotifyAccessToken(query.get("code"));
        }
        else if (props.type === "youtube") {
            getYoutubeAccessToken(query.get("code"));
        }
        setAuth(sessionStorage.getItem("spotifyAccessToken") && sessionStorage.getItem("youtubeAccessToken"));
    }, [query])

    return (
        <>
            {auth ? < Navigate to='/playlists' /> : <Navigate to='/' />}
        </>
    )

}

export default Token;