class Plane extends egret.DisplayObjectContainer implements Pixel {

    /** 飞机位图*/
    private planeBmp: egret.Bitmap;

    /** 创建子弹的时间间隔*/
    private fireDelay: number;
    private fireTicker: egret.Timer;

    /** 生命值*/
    public healthPoint: number = 10;

    /** 飞机命名*/
    public planeName: string;

    /** 飞机技能*/
    public normalSkill: string;
    public ultimateSkill: string;

    /** 飞机攻击力*/
    public attack: number;

    /** 飞机子弹类型*/
    public bulletType: string;

    public constructor(planeInfo: PlaneInfo) {
        super();

        this.planeName = planeInfo.planeName;
        this.planeBmp = GameUtils.createBitmapByName(planeInfo.planeName);
        this.addChild(this.planeBmp);

        this.healthPoint = planeInfo.healthPoint;
        this.attack = planeInfo.attack;
        this.normalSkill = planeInfo.normalSkill;
        this.ultimateSkill = planeInfo.ultimateSkill;
        this.bulletType = planeInfo.bulletType;

        this.fireDelay = planeInfo.fireDelay;
        this.fireTicker = new egret.Timer(planeInfo.fireDelay);
        this.fireTicker.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);
    }

    public getBoundsPixels(x: number, y: number, width: number, height: number): number[] {
        return this.planeBmp.texture.getPixels(x, y, width, height);
    }

    public fire(): void {
        this.fireTicker.start();
    }

    public cease(): void {
        this.fireTicker.stop();
    }

    private createBullet(evt: egret.TimerEvent): void {
        this.dispatchEventWith('createBullet');
    }
}