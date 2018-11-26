interface Pixel {
    x: number,
    y: number,
    width: number,
    height: number,

    getBoundsPixels(x: number, y: number, width: number, height: number): number[]
}