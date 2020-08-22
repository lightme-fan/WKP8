// Declaring an empty array of songs
let songs = [];

// value="https://bit.ly/3j9qooh" 

// Grabbing elements
const addSongForm = document.querySelector('form');
const listOfSongs = document.querySelector('.list-song');

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
                <li class="song-details-item"><img src="${song.picture}" alt="${song.title}"></li>
                <li class="song-details-item">
                    <div class="heading">${song.title}</div>
                    <div>${song.style}</div>
                </li>
                <li class="song-details-item">
                    <div class="heading">${song.artist}</div>
                    <div>${song.songLength}</div>
                </li>
                <li class="song-details-item score" value="${song.id}">score: 0</li>
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
    listOfSongs.innerHTML =  html;

}

// Handling click buttons
const handlingClick = (e) => {
    // Incrementing the score by clicking the +1 button

    // Handling the delete song
    console.log(e.target)
    if (e.target.closest('button.delete-btn')) {
        const id = (Number(e.target.value));
        deleteSong(id);
    }

}

// Handling delete song
const deleteSong = (id) => {
    songs = songs.filter(song => song.id !== id);
    listOfSongs.dispatchEvent(new CustomEvent('updatedSong'));
}

// Event listener for the submit form
addSongForm.addEventListener('submit', handlingAddSong);

// Listen for the custom event
listOfSongs.addEventListener('updatedSong', showSongs);

// Event listener for handleClick buttons
listOfSongs.addEventListener('click', handlingClick);