// select elements
const inputSongTitle = document.querySelector("#input-song-title");
const searchSong = document.querySelector("#search-song");
const searchResults = document.querySelector(".search-results");
const songLyrics = document.querySelector(".song-lyrics");
// API
const API = "https://api.lyrics.ovh/";

// click to search
searchSong.addEventListener("click", (e) => {
	e.preventDefault();
	const suggestionFor = inputSongTitle.value;

	showResults(suggestionFor);
});

const showResults = (searchValue) => {
	fetch(`${API}suggest/${searchValue}`)
		.then((res) => res.json())
		.then((data) => {
			displayData(data);
		});
};

const displayData = (data) => {
	const songs = data.data;
	searchResults.innerHTML = "";
	searchResults.style.display = "block";
	songLyrics.style.display = "none";

	songs.slice(0, 10).map((song) => {
		const songTitle = song.title;
		const artistName = song.artist.name;
		const songLogo = song.album.cover_medium;
		const artistLogo = song.artist.picture_small;

		searchResults.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
	                                <div class="col-md-9">
		                                <div class="row">
			                                <div class="col-md-2">
				                                <img class="song-logo" src="${songLogo}">
			                                </div>
			                                <div class="col-md-10">
				                                <h2 class="song-title">${songTitle}</h2>
                                        <p class="artist-name lead">
                                          <img class="artist-logo" src="${artistLogo}">
                                          <span>${artistName}</span>
                                        </p>
                                      </div>
                                    </div>
		                              </div>
	                                <div class="col-md-3 text-md-right text-center">
	                              	  <h1 class="get-lyrics btn btn-success" onclick="showLyrics(this)">Get Lyrics</h1>
	                                </div>
                                </div>`;
	});
};

const showLyrics = (e) => {
	const songContainer = e.parentElement.parentElement;
	const songTitle = songContainer.querySelector(".song-title").innerText;
	const artistName = songContainer.querySelector(".artist-name span").innerText;
	// get lyrics
	getLyrics(artistName, songTitle);
};

const getLyrics = (artist, title) => {
	const artistInURL = encodeURIComponent(artist.trim());
	const titleInURL = encodeURIComponent(title.trim());

	fetch(`${API}v1/${artistInURL}/${titleInURL}`)
		.then((res) => res.json())
		.then((lyrics) => {
			const currentSongLyrics = lyrics.lyrics;
			songLyrics.innerHTML = `<div class="single-lyric text-center">
                                <h2 class="close-lyrics" onclick="closeLyrics()">&#10005</h2>
                                <h2 class="text-success mb-4">${artist} - ${title}</h2>
                                <pre class="lyric text-white">${currentSongLyrics}</pre>
                              </div>`;
		});

	searchResults.style.display = "none";
	songLyrics.style.display = "block";
};

const closeLyrics = () => {
	songLyrics.innerHTML = "";
	searchResults.style.display = "block";
};
