class BgMap extends BaseScene {
    /** 位图容器*/
    private bgMap: egret.Bitmap;

    /** 舞台宽高*/
    private stageW: number;
    private stageH: number;

    /** 滚动速度*/
    private speed: number = 10;

    public constructor() {
        super();
    }

    protected init(evt: egret.Event): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;

        this.bgMap = GameUtils.createBitmapByName('game_bg_jpg');
        this.bgMap.x = 0;
        this.bgMap.y = -this.stageH;
        this.bgMap.height = this.stageH * 2;
        this.bgMap.fillMode = egret.BitmapFillMode.REPEAT;
        this.addChild(this.bgMap);
    }

    private running(): void {
        this.bgMap.y += this.speed;

        if (this.bgMap.y >= 0) this.bgMap.y = -this.stageH;
    }

    public start(): void {
        this.bgMap.removeEventListener(egret.Event.ENTER_FRAME, this.running, this);
        this.bgMap.addEventListener(egret.Event.ENTER_FRAME, this.running, this);
    }

    public paused(): void {
        this.bgMap.removeEventListener(egret.Event.ENTER_FRAME, this.running, this);
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    public getSpeed(): number {
        return this.speed;
    }
}