export type Track = {
    id: number;
    artistId: number;
    audioPath: string;
    imagePath: string;
    name: string;
    artist: {
        id: number;
        name: string;
    }
}