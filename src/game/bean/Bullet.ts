class Bullet extends egret.Bitmap implements Pixel {

    public constructor(public bulletName: string) {
        super(RES.getRes(bulletName));
        this.bulletName = bulletName;
    }

    public getBoundsPixels(x: number, y: number, width: number, height: number): number[] {
        return this.texture.getPixels(x, y, width, height);
    }
}