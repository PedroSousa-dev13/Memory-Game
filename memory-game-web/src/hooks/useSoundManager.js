import { useCallback, useMemo } from 'react';
import { useTranslation } from '../utils/translations';

/**
 * Manages game sound effects. Dynamically selects the correct audio folder
 * based on the active theme (animals vs numbers) and handles B&W filename mapping.
 */
export function useSoundManager(settings = {}, activeTheme) {
  const { 
    audioAssist = false, 
    sfx = true, 
    sfxVolume = 1.0, 
    uiSounds = true,
    uiVolume = 1.0,
    masterVolume = 1.0, 
    language = 'pt' 
  } = settings;
  const theme = activeTheme || settings.theme || 'baralho_animais';
  const { t } = useTranslation(language);

  // Helper for game effects (win, matching)
  const playSfx = useCallback((filePath) => {
    if (!sfx) return;
    try {
      const audio = new Audio(filePath);
      audio.volume = Math.pow(sfxVolume * masterVolume, 2);
      audio.play().catch(() => {});
    } catch {}
  }, [sfx, sfxVolume, masterVolume]);

  // Helper for UI elements (buttons)
  const playUiSfx = useCallback((filePath) => {
    if (!uiSounds) return;
    try {
      const audio = new Audio(filePath);
      audio.volume = Math.pow(uiVolume * masterVolume, 2);
      audio.play().catch(() => {});
    } catch {}
  }, [uiSounds, uiVolume, masterVolume]);

  const playFlip = useCallback(() => {
    // User requested no sound for turning cards
  }, []);

  const playMatch = useCallback(() => {
    if (audioAssist) {
      try {
        window.speechSynthesis.cancel(); 
        const msg = new SpeechSynthesisUtterance(t('matchFound'));
        msg.lang = language === 'en' ? 'en-US' : 'pt-PT';
        msg.rate = 1.1;
        window.speechSynthesis.speak(msg);
      } catch {}
    }
  }, [audioAssist, language, t]);

  const playMismatch = useCallback(() => {}, []);

  const playWin = useCallback(() => {
    playSfx('/Items_Jogo/audios_wav_animais/win.wav');
  }, [playSfx]);

  const playCardSound = useCallback((imageKey) => {
    if (!audioAssist) return; 
    
    try {
      let soundName = imageKey.replace('.png', '').replace('_B&W', '');
      if (theme.includes('baralho_animais')) {
        soundName = soundName.toLowerCase();
        const translatedName = t(soundName);
        
        window.speechSynthesis.cancel(); 
        const msg = new SpeechSynthesisUtterance(translatedName);
        msg.lang = language === 'en' ? 'en-US' : 'pt-PT';
        msg.rate = 1.1;
        msg.volume = sfxVolume * masterVolume; // Voice scaled by SFX volume
        window.speechSynthesis.speak(msg);
      } else if (theme.includes('baralho_numeros')) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(soundName);
        msg.lang = language === 'en' ? 'en-US' : 'pt-PT';
        msg.rate = 1.1;
        msg.volume = sfxVolume * masterVolume;
        window.speechSynthesis.speak(msg);
      }
    } catch (e) {}
  }, [audioAssist, theme, sfxVolume, masterVolume, language, t]);

  const playClick = useCallback(() => {
    playUiSfx('/Items_Jogo/audios_wav_animais/button_press.wav');
  }, [playUiSfx]);

  return useMemo(() => ({ 
    playFlip, 
    playMatch, 
    playMismatch, 
    playWin, 
    playCardSound,
    playClick
  }), [playFlip, playMatch, playMismatch, playWin, playCardSound, playClick]);
}
