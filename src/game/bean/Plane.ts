class Plane extends egret.DisplayObjectContainer {

    /** 飞机位图*/
    private planeBmp: egret.Bitmap;

    /** 创建子弹的时间间隔*/
    private fireDelay: number;
    private fireTicker: egret.Timer;

    /** 生命值*/
    private healthPoint: number = 10;

    /** 飞机命名*/
    private planeName: string;

    /** 飞机技能*/
    private normalSkill: string;
    private ultimateSkill: string;

    /** 飞机攻击力*/
    private attack: number;

    public constructor(planeInfo: PlaneInfo) {
        super();

        this.planeName = planeInfo.planeName;
        this.planeBmp = GameUtils.createBitmapByName(planeInfo.planeName);
        this.addChild(this.planeBmp);

        this.fireDelay = planeInfo.fireDelay;
        this.fireTicker = new egret.Timer(planeInfo.fireDelay);
        this.fireTicker.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);

        this.healthPoint = planeInfo.healthPoint;
        this.attack = planeInfo.attack;
        this.normalSkill = planeInfo.normalSkill;
        this.ultimateSkill = planeInfo.ultimateSkill;
    }

    private createBullet(evt: egret.TimerEvent): void {
        this.dispatchEventWith('createBullet');
    }
}