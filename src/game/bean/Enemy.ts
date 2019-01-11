class Enemy extends egret.DisplayObjectContainer {

    /** 碰撞区域*/
    public hitRect: hitRectType;

    /** 最大高度*/
    public maxY: number;

    /** 血量总数*/
    public totalHp: number;
    private originHp: number;

    /** 血量容器*/
    private hpBitmap: HealthPoint;

    /** 敌机容器*/
    private enemyBitmap: egret.Bitmap;

    /** 攻击间隔*/
    private fireTimer: egret.Timer;

    public constructor(public enemyName: string) {
        super();

        let data = GameData.PlaneData[enemyName];

        this.enemyName = enemyName;
        this.enemyBitmap = GameUtils.createBitmapByName(enemyName);
        this.enemyBitmap.y = 10;
        this.addChild(this.enemyBitmap);

        this.originHp = this.totalHp = data.healthPoint;

        this.hpBitmap = new HealthPoint(this.totalHp, 172, 4);
        this.hpBitmap.x = (this.enemyBitmap.width - 172) / 2;
        this.addChild(this.hpBitmap);
        this.hitRect = data.hitRect;

        this.fireTimer = new egret.Timer(data.fireDelay);
        this.fireTimer.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
    }

    public fire(): void {
        this.fireTimer.start();
    }

    public cease(): void {
        this.fireTimer.stop();
    }

    public reduceHP(num: number): void {
        this.totalHp -= num;
        this.hpBitmap.reduce(num);
    }

    public reset(): void {
        this.totalHp = this.originHp;
        this.hpBitmap.reset();
    }

    private createBullet(evt: egret.TimerEvent): void {
        this.dispatchEventWith('createBullet');
    }
}