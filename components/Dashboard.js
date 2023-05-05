import React from 'react'
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { useSession } from "next-auth/react";
import Player from "./Player";
import { useRecoilState } from "recoil";
import Body from "./Body";
import Right from "./Right";
import styles from '../styles/dashboard.module.css';
import { playingTrackState } from '@/atoms/playerAtom';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Dashboard() {
  const { data: session } = useSession();
  const { accessToken } = session;

  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    setShowPlayer(true);
  }, []);

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <main className={styles.main}>
      <div className={styles.topside}>
        <div classname={styles.sidebar}>
          <Sidebar  />
        </div>
        <div classname={styles.body}>
          <Body chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
        </div>
        <div className={styles.right}>
          <Right chooseTrack={chooseTrack} spotifyApi={spotifyApi} />
        </div>
      </div>
      <div className={styles.botside}>
        {showPlayer && (
          <div className="player">
            <Player accessToken={accessToken} trackUri={playingTrack.uri} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Dashboard;