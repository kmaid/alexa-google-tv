declare class SinricPro {
  constructor(
    appkey: string,
    deviceids: string[],
    secretKey: string,
    restoreStates: boolean
  );
  getSecretKey: () => string;
  setSecretKey: (key: string) => void;
}

export type Power = "On" | "Off";
export type MediaControl = "play" | "pause" | "rewind"; // This is inconsistent. Alexa title cases values and sinric lowercases.

export interface Callbacks {
  setPowerState?: (string, power: Power) => void;
  setVolume?: (string, number) => void;
  adjustVolume?: (string, string) => void;
  setMute?: (string, string) => void;
  selectInput?: (string, string) => void;
  mediaControl?: (string, data: MediaControl) => void;
  skipChannels?: (string, string) => void;
  changeChannel?: (string, string) => void;
  onDisconnect?: () => void;
}

export const startSinricPro: (test: SinricPro, callbacks: Callbacks) => void;
