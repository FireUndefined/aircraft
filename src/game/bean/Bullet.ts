class Bullet extends egret.Bitmap {
    /** 子弹攻击力*/
    public attack: number;

    public hitRect: hitRectType = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    public constructor(
        public bulletName: string,
        x: number = 0,
        y: number = 0,
        public mx: number,
        public my: number
    ) {
        super(RES.getRes(bulletName));

        this.bulletName = bulletName;
        this.x = x;
        this.y = y;
        this.mx = mx;
        this.my = my;
        this.attack = GameData.BulletData[bulletName].attack;

        this.hitRect.x = this.hitRect.y = 0;
        this.hitRect.width = this.width;
        this.hitRect.height = this.height;
    }
}