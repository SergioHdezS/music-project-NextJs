import React, { useState } from 'react'
import { ImHeadphones } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { useRecoilState } from 'recoil';
import { playState, playingTrackState } from '@/atoms/playerAtom';
import styles from '../styles/track.module.css';

function Track({ track, chooseTrack }) {
    const [hasLiked, setHasLiked] = useState(false);
    const [play, setPlay] = useRecoilState(playState);
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

    const handlePlay = () => {
        chooseTrack(track);

        if (track.uri === playingTrack.uri) {
            setPlay(!play);
        }
    };

    return (
        <div className={styles.song}>
            <div className={styles.songInfo}>
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

            <div className={styles.icons}>
                <div className={styles.headphonesIcon}>
                    <ImHeadphones className={styles.headphones} />
                    <h4 className={styles.popularity}>{track.popularity}</h4>
                </div>
                <div className={styles.iconsContainer}>
{/*                     <AiFillHeart
                        className={`text-xl ml-3 icon ${hasLiked ? "text-[#1ED760]" : "text-[#868686]"
                            }`}
                        onClick={() => setHasLiked(!hasLiked)}
                    /> */}
                    {track.uri === playingTrack.uri && play ? (
                        <>
                            <div
                                className={styles.play}
                                onClick={handlePlay}
                            >
                                <BsFillPauseFill className={styles.playIcon} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className={styles.pause}
                                onClick={handlePlay}
                            >
                                <BsFillPlayFill className={styles.pauseIcon} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Track