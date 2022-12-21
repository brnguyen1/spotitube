import { Navigate, useLocation } from "react-router-dom";
import { useMemo, useEffect } from 'react';
import { getSpotifyAccessToken } from "../functions/api";

function Token(props) {
    const { search } = useLocation();

    let query = useMemo(() => new URLSearchParams(search), [search]);

    useEffect(() => {
        getSpotifyAccessToken(query.get("code"))
    }, [query])

    return (
        <>
            {props.type === "spotify" ? < Navigate to='/playlists' /> : null}
        </>
    )

}

export default Token;