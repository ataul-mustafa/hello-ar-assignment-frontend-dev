import React, { useState, useRef, useEffect } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Songs.css';
import playIcon from '../../../assets/play.png';
import deleteIcon from '../../../assets/delete.png';
import nextIcon from '../../../assets/next.png';
import previousIcon from '../../../assets/previos.png';
import puaseIcon from '../../../assets/pause.png';
import playSongIcon from '../../../assets/playsong.png';
import uploadIcon from '../../../assets/upload.png'


const popupContentStyle = {
    background: '#ffffff',
    boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    height: '584px',
    width: window.innerWidth <= 768 ? '90%' : '798px',

    '@media (maxWidth: 768px)': {
        width: '90%', // Width for mobile screens
    },
};



const Songs = () => {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [songName, setSongName] = useState('');
    const [songThumbnail, setSongThumbnail] = useState(null);
    const [songFile, setSongFile] = useState(null);
    const [source, setSource] = useState('');
    const [date, setDate] = useState('')


    const [isOpen, setIsOpen] = useState(false);


    const audioRef = useRef(new Audio());

    function getFormattedCurrentDate() {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();

        setDate(`${day}/${month}/${year}`)
        // return `${day}/${month}/${year}`;
    }

    const handleAddSong = (close) => {
        if (songFile && songName && songThumbnail) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSongs([...songs, { url: reader.result, name: songName, thumbnail: songThumbnail }]);
            };
            getFormattedCurrentDate();
            reader.readAsDataURL(songFile);
            setSongName('');
            setSongThumbnail(null);
            setSongFile(null);
            close();
        }
    };

    const playSong = (index) => {
        setCurrentSongIndex(index);
        audioRef.current.src = songs[index].url;
        audioRef.current.play();
        setIsPlaying(true);
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNextSong = () => {
        let nextIndex = currentSongIndex + 1;
        if (nextIndex >= songs.length) {
            nextIndex = 0;
        }
        playSong(nextIndex);
    };

    const handlePreviousSong = () => {
        let prevIndex = currentSongIndex - 1;
        if (prevIndex < 0) {
            prevIndex = songs.length - 1;
        }
        playSong(prevIndex);
    };

    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (e) => {
        const newTime = e.target.value * audioRef.current.duration / 100;
        audioRef.current.currentTime = newTime;
        setSliderValue(e.target.value);
    };

    // Update slider value when the current time of the audio changes
    useEffect(() => {
        const updateSliderValue = () => {
            const newSliderValue = (audioRef.current.currentTime / audioRef.current.duration) * 100 || 0;
            setSliderValue(newSliderValue);
        };

        audioRef.current.addEventListener("timeupdate", updateSliderValue);

        return () => {
            audioRef.current.removeEventListener("timeupdate", updateSliderValue);
        };
    }, []);


    const togglePopup = () => {
        setIsOpen(!isOpen);
    };



    return (
        <div className="song-player">
            <div className="head">
                <span>First-level Menu / </span>
                <span>Second-level Menu / </span>
                <span>Current Page</span>
            </div>
            <div className="heading">
                <h1>Songs</h1>
                <button onClick={togglePopup} className='Popup-add-button'>Add Song</button>
            </div>

            <Popup open={isOpen}
                closeOnDocumentClick
                onClose={togglePopup}
                contentStyle={popupContentStyle}
            >
                {(close) => (
                    <div className="popup-content">
                        <div className='top'>
                            <h1>Add Song</h1>
                            <h1 onClick={close}>X</h1>
                        </div>

                        <div className="separator"></div>

                        <div className="form">
                            <div className="songname">
                                <label>Song Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Song Name"
                                    value={songName}
                                    onChange={(e) => setSongName(e.target.value)}
                                />
                            </div>
                            <div className="UploadSong">
                                <label>Upload Song</label>
                                <input type="file" onChange={(e) => setSongFile(e.target.files[0])} />
                            </div>

                            <div className="soongSource">
                                <label>Song Source</label>
                                <input type="text" onChange={(e)=>{setSource(e.target.value)}} placeholder='Source Song' />
                            </div>

                            <div className="thumbnail">
                                <label>
                                    <img src={uploadIcon} alt="" />
                                    Click to upload profile thumbnail
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setSongThumbnail(reader.result);
                                        };
                                        if (file) {
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>
                            <p>Image has to be of aspect ratio 1:1 with a size of 3000 pixels x 3000 pixels</p>
                        </div>

                        <div className="separator"></div>


                        <div className="btns">
                            <button onClick={close}>Cancel</button>
                            <button className="add-button" onClick={() => { handleAddSong(close) }}>
                                Add Song
                            </button>
                        </div>
                    </div>
                )}
            </Popup>

            <div className="song-list">
                <div className="headingCon">
                <div className="headingss">
                    <div>SONG NAME</div>
                    <div>SOURCE</div>
                    <div>ADDED ON</div>
                </div>
                </div>
                {songs.map((song, index) => (
                    <div key={index} className="song-item">
                        <div className="songName">
                            <img src={song.thumbnail} alt={song.name} className="song-thumbnail" />
                            <span className="song-name">{song.name}</span>
                        </div>
                        <div className="source">{source || 'computer'}</div>
                        <div className='date'>{date || '28/10/2023'}</div>
                        <div className="controlbutton" onClick={() => playSong(index)}>
                            <img src={playIcon} alt="" />
                        </div>
                        <div className="controlButton" onClick={() => setSongs(songs.filter((_, i) => i !== index))}>
                            <img src={deleteIcon} alt="" />
                        </div>
                    </div>
                ))}
            </div>


            {currentSongIndex !== null && (
                <div className="song-controls">
                    <div className="slider-container">
                        <input
                            style={{ width: '100%' }}
                            type="range"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            className="slider"
                            max={100}
                        />
                    </div>
                    <div className="controls">
                        <div className="songnameT">
                            <img src={songs[currentSongIndex].thumbnail} alt={songs[currentSongIndex].name} className="current-thumbnail" />
                            <span className="current-song-name">{songs[currentSongIndex].name}</span>
                        </div>
                        <div className="puasPlay">
                            <div className="control-but" onClick={handlePreviousSong}>
                                <img src={previousIcon} alt="" />
                            </div>
                            <div className="control-but" onClick={handlePlayPause}>
                                
                                <img src={isPlaying ? puaseIcon : playSongIcon} alt="" />
                            </div>
                            <div className="control-but" onClick={handleNextSong}>
                                <img src={nextIcon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Songs;
