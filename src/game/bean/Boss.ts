class Boss extends egret.Bitmap implements Pixel {
    public constructor(public bossName: string) {
        super(RES.getRes(bossName));
        this.bossName = bossName;
    }

    getBoundsPixels(x: number, y: number, width: number, height: number): number[] {
        return this.texture.getPixels(x, y, width, height);
    }

    getTexture(): egret.Texture {
        return this.texture;
    }
}