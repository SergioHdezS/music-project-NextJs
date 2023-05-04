import { playState, playingTrackState } from '@/atoms/playerAtom';
import React from 'react'
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useRecoilState } from 'recoil';
import styles from '../styles/poster.module.css';

function Poster({ track, chooseTrack }) {
    const [play, setPlay] = useRecoilState(playState);
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

    const handlePlay = () => {
        chooseTrack(track);

        if (track.uri === playingTrack.uri) {
            setPlay(!play);
        }
    };

    return (
        <div 
        className={styles.poster} 
        onClick={handlePlay}
        >
            <img
                src={track.albumUrl}
                alt=""
                className={styles.albumImage}
            />
            <div className={styles.bottom}>
                <div className={styles.icons}>
                    {track.uri === playingTrack.uri && play ? (
                        <BsFillPauseFill className={styles.playIcon} />
                    ) : (
                        <BsFillPlayFill className={styles.pauseIcon} />
                    )}
                </div>

                <div className={styles.songInfo}>
                    <h4 className={styles.title}>{track.title}</h4>
                    <h6>{track.artist}</h6>
                </div>
            </div>
        </div>
    )
}

export default Poster