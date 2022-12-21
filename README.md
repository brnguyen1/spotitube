# spotitube

## Initializing backend and client
  cd into client and run
  ### npm install
  repeat for the backend

## Environment Variables
  Create a ```.env``` file in the ```/backend``` folder and the ```/client``` folder and put in the respective values:
  
  Backend ```.env```
```
SPOTIFY_CLIENT_ID = <Provided spotify client ID>
SPOTIFY_CLIENT_SECRET = <Provided spotify client secret>
SPOTIFY_REDIRECT_URI = <Provided spotify redirect uri>
FRONTEND = <Client host url>
YOUTUBE_CLIENT_ID = <Provided youtube client ID>
YOUTUBE_CLIENT_SECRET = <Provided youtube client secret>
YOUTUBE_REDIRECT_URI = <Provided youtube redirect uri>
SESSION_SECRET = <Session Secret determined by developer>
```
For local development front end should be ```http://127.0.0.1:5173/```
 
  Frontend ```.env```
  ```
  VITE_BACKEND = <Backend host url>
  VITE_FRONTEND = <Client host url>
  ```
For local development frontend should be ```http://127.0.0.1:5173/``` and backend should be ```http://localhost:8888/''''

## Starting backend
  cd into backend folder and run following command:
  ### npm start
  
## Starting client
  cd into client and run following command:
  ### npm run dev
