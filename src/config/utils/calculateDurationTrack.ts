export const calculateDurationTrack = (num: number) => {
    const minutes = Math.floor(num / 60);

    return `${minutes}:${(num - 60 * minutes) < 10 ? `0${num - 60 * minutes}` : num - 60 * minutes}`;
};
