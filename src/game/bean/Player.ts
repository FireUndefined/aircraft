class Player extends egret.DisplayObjectContainer {
    /** 飞机位图*/
    private planeBitmap: egret.Bitmap;

    /** 创建子弹的时间间隔*/
    private fireDelay: number;
    private fireTicker: egret.Timer;

    /** 生命值*/
    public totalHP: number;

    /** 飞机名*/
    public planeName: string;

    /** 飞机技能*/
    public normalSkill: string;
    public ultimateSkill: string;

    /** 碰撞区域*/
    public hitRect: hitRectType;

    public constructor(planeName: string) {
        super();

        let data = GameData.PlaneData[planeName];

        this.planeName = planeName;
        this.planeBitmap = GameUtils.createBitmapByName(planeName);
        this.addChild(this.planeBitmap);

        this.totalHP = data.healthPoint;

        this.normalSkill = data.normalSkill;
        this.ultimateSkill = data.ultimateSkill;

        this.fireDelay = data.fireDelay;
        this.fireTicker = new egret.Timer(data.fireDelay);
        this.fireTicker.addEventListener(egret.TimerEvent.TIMER, this.createBullet, this);

        this.hitRect = data.hitRect;
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