const clientID = "3697fc9376ac46d3aadda4301036d7a1";
const redirectURI = `${window.location.protocol}//${window.location.host}`;
// const redirectURI = "http://localhost:3000"

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else if (!accessTokenMatch || !expiresInMatch) {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    async search(term) { 
        //Spotify.getAccessToken();
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
                    
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    async savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) {
            return
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` }
        let userID;

        return fetch(`https://api.spotify.com/v1/me`, {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;

            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
             {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ name: name })
            }).then(response => response.json()
            ).then(jsonResponse => {
               const playlistID = jsonResponse.id;

               return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, 
               {
                  headers: headers,
                  method: "POST",
                  body: JSON.stringify({ uris: trackURIs })
              })
  
            })

        })

        
    }
};


export default Spotify;