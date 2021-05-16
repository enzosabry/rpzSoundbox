import {Audio} from "expo-av";

export type Sound = {
    name: string;
    image: any;
    sounds: AudioName[];
}
export type AudioName = {
    name: string;
    audio: Audio.Sound;
    image: any;
}
