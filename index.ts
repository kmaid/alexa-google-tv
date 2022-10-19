import { SinricPro, startSinricPro } from "sinricpro";
import {
  CHROMECAST_IP,
  SINRIC_APP_KEY,
  SINRIC_APP_SECRET,
  SINRIC_DEVICE_ID,
} from "./config";
import { Adb, KeyCodes } from "@devicefarmer/adbkit";

//https://github.com/sinricpro/sample_messages

const sinricpro = new SinricPro(
  SINRIC_APP_KEY,
  [SINRIC_DEVICE_ID],
  SINRIC_APP_SECRET,
  false
);

const adbClient = Adb.createClient({});

const deviceClient = adbClient
  .connect(CHROMECAST_IP, 5555)
  .then((deviceId) => adbClient.getDevice(deviceId));

const pressKeys = async (keys: KeyCodes[]) => {
  const device = await deviceClient;
  return device.shell(
    keys.map((keyCode) => `input keyevent ${keyCode}`).join(" && ")
  );
};
const shell = (command: string) =>
  deviceClient
    .then((device) => device.shell(command))
    .then(Adb.util.readAll)
    .then((buffer) => buffer.toString().trim());

startSinricPro(sinricpro, {
  setPowerState: async (deviceid, data) => {
    console.log("setPowerState", deviceid, data);
    const isAwake =
      (await shell(`dumpsys activity | grep -c "mWakefulness=Asleep"`)) === "0"; //0 if the tv is awake and a 1 if it's asleep
    const requestedState = data === "On";
    console.log("requestedState", requestedState, "isAwake", isAwake);
    if (requestedState !== isAwake) {
      await pressKeys([KeyCodes["KEYCODE_POWER"]]);
    }
    return true;
  },
  setVolume: async (deviceid, data) => {
    console.log("setVolume", deviceid, data);
    await pressKeys([
      ...Array.from({ length: 45 }).map(() => KeyCodes["KEYCODE_VOLUME_DOWN"]),
      ...Array.from({ length: data }).map(() => KeyCodes["KEYCODE_VOLUME_UP"]),
    ]);
    return true;
  },
  adjustVolume: (deviceid, data) => {
    console.log("adjustVolume", deviceid, data);
    return true;
  },
  setMute: async (deviceid, data) => {
    console.log("setMute", deviceid, data);
    await pressKeys([KeyCodes["KEYCODE_VOLUME_MUTE"]]);
    return true;
  },
  mediaControl: async (deviceid, data) => {
    console.log("mediaControl", deviceid, data);
    switch (data.toLowerCase()) {
      case "play":
      case "pause":
        await pressKeys([KeyCodes["KEYCODE_MEDIA_PLAY_PAUSE"]]);
        break;
      case "stop":
        await pressKeys([KeyCodes["KEYCODE_MEDIA_STOP"]]);
        break;
    }
    return true;
  },
  onDisconnect: () => {
    console.log("Connection closed");
  },
});
