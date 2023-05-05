import { playState, playingTrackState } from '@/atoms/playerAtom';
import React from 'react'

import { useRecoilState } from "recoil";
import styles from '../styles/recentlyPlayed.module.css';

function RecentlyPlayed({ track, chooseTrack }) {
    const [play, setPlay] = useRecoilState(playState);
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

    const handlePlay = () => {
        chooseTrack(track);

        if (track.uri === playingTrack.uri) {
            setPlay(!play);
        }
    };
    

    return (
        <div className={styles.song} onClick={handlePlay}>
            <img
                src={track.albumUrl}
                alt=""
                className={styles.albumImage}
            />
            <div>
                <h4 className={styles.title}>
                    {track.title}
                </h4>
                <p className={styles.artist}>
                    {track.artist}
                </p>
            </div>
        </div>
    );
}

export default RecentlyPlayed;