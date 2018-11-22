class Bullet extends egret.Bitmap {

    public constructor(public bulletName: string) {
        super(RES.getRes(bulletName));
        this.bulletName = bulletName;
    }
}