import { Asset } from 'expo-asset';

export type Sound = {
    name: string;
    image: any;
    sounds: AudioName[];
}
export type AudioName = {
    name: string;
    audio: Asset;
    image: any;
}
