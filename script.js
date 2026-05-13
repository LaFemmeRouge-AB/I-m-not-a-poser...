async function searchArtist() {
    const artistName = document.getElementById('artist-input').value.trim();
    if (!artistName) {
        alert("Please enter a name");
        return;
    }

    try {
        const response = await fetch (
            `https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=song&limit=25`
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            throw new Error("Artist not found");
        }
        const tracks = data.results;
        const topTracks = tracks.slice(0,3)
        const nicheTracks = tracks.slice(20, 50).sort(() => 0.5 - Math.random()).slice(0, 3);

        displayResults(artistName, topTracks, nicheTracks);
    
    } catch (err) {
        console.error(err);
        alert("Could not find artist.");
    }
}

function displayResults(artist, topTracks, nicheTracks) {
    const resultsDiv = document.getElementById('results');

    let html = `
        <div class="results-box">
            <h2 class="artist-name">${artist}</h2>

            <h3> Top 3 Songs </h3>
            <ul>
    `;

    topTracks.forEach(track => {
        html += `<li>${track.trackName}</li>`;
    });

    html += `
            </ul>

            <h3> Lesser Known Songs </h3>
            <ul>
    `;

    nicheTracks.forEach(track => {
        html += `<li>${track.trackName}</li>`;
    });

    html += `
            </ul>
        </div>
    `;

    resultsDiv.innerHTML = html;
}

async function playTopSong(artistName) {
    const term = encodeURIComponent(artistName);
    const url = `https://apple.com{term}&entity=song&limit=1`;

    try {
        const response = await fetch(url)
        const data = await response.json();
    } catch (error) {
        console.error("Error with song playing:", error);
    }
}

playTopSongs(artistName)

async function showArtistPicture(artistName) {

    const url = `https://apple.com{encodeURIComponent(artistName)}&entity=album&limit=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.results.length > 0) {
            let imageUrl = data.results[0].artwork.Url100;
            imageUrl = imageUrl.replace('100x100bb', '500x500bb');
            document.getElementById('artist-image').src = imageUrl;
        } else {
            console.log("No image found.");
        }
    } catch (error) {
        console.error("Error fetching from iTunes API:", error);
    }
}

document.getElementById('artist-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchArtist();
    }
});

document.getElementById('artist-name').onclick, function() {
    var query = artist-name.innerText;
    var url = "https://www.google.com/search?q=" + encodeURIComponent(query);
    window.open(url, '_blank');
}
