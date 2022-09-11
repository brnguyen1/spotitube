import React, {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import '../App.css';

function Callback() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [accessToken, setAccessToken] = useState();
    const queryCode = searchParams.get('code');
    
    // POST query code to get access token
    function postQueryCode(queryCode){
        fetch("http://localhost:8888/access-token", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"queryCode":queryCode}),
        })
    }
    

    // GET access token
    const getAccessToken = () => {
        fetch("http://localhost:8888/access-token")
        .then(res => res.text())
        .then(data => {
            console.log(data);
            setAccessToken(data);
        })
    }
    
    useEffect(() => {
        postQueryCode(queryCode);
        getAccessToken();
    })

    return (
            <div>
                <p>{accessToken}</p>
                <p>{queryCode}</p>
            </div>
      )
}

export default Callback;