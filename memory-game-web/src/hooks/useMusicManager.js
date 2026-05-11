import { useEffect, useRef, useState, useCallback } from 'react';

// All available music tracks in the Musicas_No_Copyright folder
const MUSIC_TRACKS = [
  '/Items_Jogo/Musicas_No_Copyright/ASMR Ambient Sad Relaxing by unfeel [No Copyight Music]  ice.mp3',
  '/Items_Jogo/Musicas_No_Copyright/Chill Stylish Technology by unfeel [No Copyright Music]  Stay By Me.mp3',
  '/Items_Jogo/Musicas_No_Copyright/Cinematic Chill Drone by Infraction [No Copyright Music]  Sky Blue (1).mp3',
  '/Items_Jogo/Musicas_No_Copyright/Sad Cinematic Documentary Music by Infraction [No Copyright Music]  Planet.mp3',
];

/**
 * Picks a random track from the pool, avoiding the one that just played.
 */
function pickRandom(lastIndex) {
  if (MUSIC_TRACKS.length <= 1) return 0;
  let idx;
  do {
    idx = Math.floor(Math.random() * MUSIC_TRACKS.length);
  } while (idx === lastIndex);
  return idx;
}

/**
 * Music manager that plays a random playlist of background tracks,
 * matching the Kivy MusicManager behavior (random, auto-advance, volume, enable/disable).
 * Persists playback across route changes via a module-level Audio singleton.
 */

// Module-level singleton
let currentAudio = null;
let currentTrackIndex = -1;

export function useMusicManager(settings) {
  const [isPlaying, setIsPlaying] = useState(false);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  const playNextTrack = useCallback(() => {
    // Stop any currently playing track
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.removeEventListener('ended', playNextTrack);
      currentAudio = null;
    }

    if (!settingsRef.current?.music) {
      setIsPlaying(false);
      return;
    }

    const nextIndex = pickRandom(currentTrackIndex);
    currentTrackIndex = nextIndex;
    currentAudio = new Audio(MUSIC_TRACKS[nextIndex]);
    const mv = settingsRef.current.masterVolume !== undefined ? settingsRef.current.masterVolume : 1.0;
    const v = settingsRef.current.musicVolume !== undefined ? settingsRef.current.musicVolume : 0.5;
    currentAudio.volume = Math.pow(v * mv, 2);
    currentAudio.addEventListener('ended', playNextTrack);

    const playPromise = currentAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(error => {
          console.warn("Autoplay prevented or audio load failed. Waiting for user interaction.", error);
          setIsPlaying(false);
        });
    }
  }, []);

  useEffect(() => {
    if (settings?.music) {
      // Update volume on existing audio
      if (currentAudio) {
        const mv = settings.masterVolume !== undefined ? settings.masterVolume : 1.0;
        const v = settings.musicVolume !== undefined ? settings.musicVolume : 0.5;
        currentAudio.volume = Math.pow(v * mv, 2);
      }
      // Start playing if not already
      if (!currentAudio || currentAudio.paused) {
        playNextTrack();
      }
    } else {
      // Music disabled — stop
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.removeEventListener('ended', playNextTrack);
        currentAudio = null;
      }
      setIsPlaying(false);
    }
  }, [settings?.music, settings?.musicVolume, settings?.masterVolume, playNextTrack]);

  // Cleanup only on full unmount (app close)
  useEffect(() => {
    return () => {
      // Don't clean up on route changes — only on app unmount
    };
  }, []);

  return { isPlaying };
}
