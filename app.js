// select elements
const inputSongTitle = document.querySelector("#input-song-title");
const searchSong = document.querySelector("#search-song");
const searchResults = document.querySelector(".search-results");
// API
const API = "https://api.lyrics.ovh/";

// click to search
searchSong.addEventListener("click", function () {
  searchResults.innerHTML = "";
	const suggestionFor = inputSongTitle.value;
	fetch(`${API}suggest/${suggestionFor}`)
		.then((res) => res.json())
		.then((data) => {
      const songs = data.data;
			for (let i = 0; i < 10; i++) {
				const song = songs[i];
				// get song title
				const songTitle = song.title;
				// get artist name
				const artistName = song.artist.name;
				// show results
				const songContainer = document.createElement("div");
				songContainer.innerHTML = `<div class="songWithLyrics">
             <div class="single-result row align-items-center my-3 p-3">
               <div class="col-md-9">
                 <h3 class="lyrics-name">${songTitle}</h3>
                 <p class="author lead">Album by <span>${artistName}</span></p>
               </div>
               <div class="col-md-3 text-md-right text-center">
                 <button class="get-lyrics btn btn-success" onclick="showLyrics(this)">Get Lyrics</button>
               </div>
             </div>
           </div>`;
				searchResults.appendChild(songContainer);
			}
		});
});

function showLyrics(e) {
	const songContainer = e.parentElement.parentElement.parentElement;
	// lyric's name
	const lyricsName = songContainer.querySelector(".lyrics-name").innerText;
	const lyricsNameInURL = encodeURIComponent(lyricsName.trim());
	// author's name
	const authorsName = songContainer.querySelector(".author span").innerText;
	const authorsNameInURL = encodeURIComponent(authorsName.trim());
	// get lyrics
	fetch(`${API}v1/${authorsNameInURL}/${lyricsNameInURL}`)
		.then((res) => res.json())
		.then((lyrics) => {
			const currentSongLyric = lyrics.lyrics;
			const lyricsContainer = document.createElement("div");
			lyricsContainer.innerHTML = `<div class="single-lyric text-center">
           <h2 class="text-success mb-4">${authorsName} - ${lyricsName}</h2>
           <pre class="lyric text-white">${currentSongLyric}</pre>
         </div>`;

			songContainer.appendChild(lyricsContainer);
		});
}

// get lyrics
// fetch(`${API}v1/${artistNameInURL}/${songTitleInURL}`)
//   .then((res) => res.json())
//   .then((lyrics) => {

//     const currentSongLyric = lyrics.lyrics;

//   });

// const getSongLyrics = (song) => {
//   // song title
//   const songTitle = song.title;
//   const songTitleInURL = encodeURIComponent(songTitle.trim());
//   // artist name
//   const artistName = song.artist.name;
//   const artistNameInURL = encodeURIComponent(artistName.trim());
//   // get lyrics
//   fetch(`${API}v1/${artistNameInURL}/${songTitleInURL}`)
//     .then((res) => res.json())
//     .then((lyrics) => {

//     });
// }
