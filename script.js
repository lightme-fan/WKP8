// Declaring an empty array of songs
let songs = [];

// Grabbing elements
const addSongForm = document.querySelector('form');
const listOfSongs = document.querySelector('.list-song');
const searchForm = document.querySelector('.search'); 
const resetBtn = document.querySelector('.reset-btn'); 
const inputSearch = document.querySelector('.searching'); 
const selectStyle = document.querySelector('#select-style');


// Handling form sumbit
const handlingAddSong = (e) => {
    e.preventDefault();

    // Grabbing the form by event current targe 
    const form = e.currentTarget;

    // Declaring an object of a new song
    const newSong = {
        title: form.title.value,
        artist: form.artist.value,
        style: form.style.value,
        songLength: form.songLength.value,
        picture: form.picture.value,
        score: 0,
        id: Date.now()

        // score: form.score.value,
    }

    // Pushin the new song object to the empty songs array
    songs.push(newSong);
    listOfSongs.dispatchEvent(new CustomEvent('updatedSong'));
    form.reset();
}

// Showing the new song to the list
const showSongs = () => {
    const html = songs.map(song =>     
        `
        <li class="list-song-item">
            <ul class="song-details">
                <li class="song-details-item"><img class="pic" src="${song.picture}" alt="${song.title}"></li>
                <li class="song-details-item">
                    <div class="heading">${song.title}</div>
                    <div>${song.style}</div>
                </li>
                <li class="song-details-item">
                    <div class="heading">${song.artist}</div>
                    <div>${song.songLength}</div>
                </li>
                <li class="song-details-item score" value="${song.id}">Score: ${song.score}</li>
                <li class="song-details-item score-btn"><button class="add-score-btn" value="${song.id}">+1</button></li>
                <li class="song-details-item remove-btn">
                    <button class="delete-btn" value="${song.id}" aria-label="Delete book ${song.title}">
                        Delete
                    </button>
                </li>
            </ul>
        </li>
        `
    ).join('');
    listOfSongs.innerHTML = html;

}

// Handling click buttons
const handlingClick = (e) => {
    // Incrementing the score by clicking the +1 button
    if (e.target.closest('button.add-score-btn')) {
        const incrementId = Number(e.target.value);
        incrementScore(incrementId);
    }

    // Handling the delete song
    if (e.target.closest('button.delete-btn')) {
        const id = Number(e.target.value);
        deleteSong(id);
    }

}

// Handling increment score
const incrementScore = (id) => {
    // Finding the id
    const addScore = songs.find(song => song.id === id);
    addScore.score = addScore.score + 1;

    // Sort the songs by the highest score
    songs.sort(function(a, b) {
        const anA = a.score;
        const aB = b.score;
        return aB - anA;
    });

    listOfSongs.dispatchEvent(new CustomEvent('updatedSong'));
}

// Handling delete song
const deleteSong = (id) => {
    songs = songs.filter(song => song.id !== id);
    listOfSongs.dispatchEvent(new CustomEvent('updatedSong'));
}

// Filtering songs by search title
const searchByTitle = (e) => {
    const inputResult = e.target.value;
    songs = songs.filter(song => song.title === inputResult);
    listOfSongs.dispatchEvent(new CustomEvent('updatedSong'));
};

// Filter songs by style
const searchByStyle = () => {
    const selectResult = e.target.value;
    songs = songs.filter(song => song.style === selectResult);
    listOfSongs
}

// Reset Button
const handleResetBtnClick = () => {
    searchForm.reset();
    listOfSongs.dispatchEvent(new CustomEvent('updatedSong'));
}

// Click the reset filters button, the filter form is reset, and the list comes back to normal.

// Saving the list of song to the local storage
const startLocalStorage = () => {
    const songList = JSON.parse(localStorage.getItem('songs'));
    if (songList) {
        songs = songList;
    }
    listOfSongs.dispatchEvent(new CustomEvent('updatedSong'));
}

// Updating the local storage
const storingSongToLocalStorage = () => {
    // Stringifying the songs 
    localStorage.setItem('songs', JSON.stringify(songs));
}

// Event listener for the submit form
addSongForm.addEventListener('submit', handlingAddSong);

// Listen for the custom event
listOfSongs.addEventListener('updatedSong', showSongs);

window.addEventListener('DOMContentLoaded', showSongs);

// Listener for the local storage
listOfSongs.addEventListener('updatedSong', storingSongToLocalStorage);

// Listen for search By title
inputSearch.addEventListener('input', searchByTitle);

// Listen for search By style
selectStyle.addEventListener('change', searchByStyle);

// Event for reset button
resetBtn.addEventListener('click', handleResetBtnClick);

// Event listener for handleClick buttons
listOfSongs.addEventListener('click', handlingClick);
