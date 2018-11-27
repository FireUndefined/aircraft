class Bullet extends egret.Bitmap implements Pixel {

    /** 子弹攻击力*/
    public attack: number;

    public constructor(public bulletName: string) {
        super(RES.getRes(bulletName));
        this.bulletName = bulletName;
        this.attack = GameData.BulletData.bulletData[bulletName];
    }

    public getBoundsPixels(x: number, y: number, width: number, height: number): number[] {
        return this.texture.getPixels(x, y, width, height);
    }
}