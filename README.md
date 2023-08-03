# alexa-google-tv

Skill to use Alexa to control Google TV.

# Requirements

- Google TV with Developer mode enabled (eg Chromecast with Google TV)
- TV with HDMI-CEC
- Server on 24/7 same network as Chromecast with Docker
- Free https://sinric.pro/ account

# How it works

The Alexa Sinric Pro skill will forward Alexa API calls to the Alexa Chromecast docker container. The docker container will interpret these calls and forward them as button presses via Android Debug Bridge to Google TV.

# Utterances

```
Power:
	Alexa, Turn on the tv

Playback:
	Alexa, fast forward on tv.
	Alexa, go forward on tv.
	Alexa, pause tv.
	Alexa, resume tv.
	Alexa, play tv.
	Alexa, previous on tv.
	Alexa, rewind on tv.
	Alexa, start over on tv.
	Alexa, stop tv.

Volume control:
	Alexa, set the volume of tv to fifty.
	Alexa, turn the volume down tv by twenty.
	Alexa, mute tv.
	Alexa, unmute tv.
```

# Installation

To be written. There are issues with making this as reusable as possible. stack.env specifically.

# FAQ

Q: Why does volume go to zero and then what i set?
A: I haven't found a way to find the current volume level so i reduce it by 50 and then incriment it to the requested volume
