class GameController extends egret.DisplayObjectContainer {

    /** 记录触点与player的距离*/
    private offsetX: number = 0;
    private offsetY: number = 0;

    /** 舞台宽高*/
    private stageW: number;
    private stageH: number;

    /** 背景*/
    private bg: BgMap;

    /** player*/
    private player: Plane;

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.initGameScene();
    }

    private initGameScene(): void {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        //背景
        this.bg = new BgMap();
        this.addChild(this.bg);

        this.startGame();
    }

    /** 游戏开始*/
    private startGame() {
        this.bg.start();

        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStartHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);

        let slctPlane: PlaneInfo = GameData.PlaneData.candidatePlane[GameData.PlaneData.slctPlane];
        this.player = new Plane(slctPlane);
        this.player.x = (this.stageW - this.player.width) / 2;
        this.player.y = this.stageH * 0.85;
        this.addChild(this.player);
    }

    private touchStartHandler(evt: egret.TouchEvent): void {
        this.offsetX = evt.stageX - this.player.x;
        this.offsetY = evt.stageY - this.player.y;
    }

    private touchEndHandler(evt: egret.TouchEvent): void {
        this.offsetX = 0;
        this.offsetY = 0;
    }

    private touchMoveHandler(evt: egret.TouchEvent): void {
        let planeX = evt.stageX - this.offsetX;
        let planeY = evt.stageY - this.offsetY;

        this.player.x = Math.min(Math.max(0, planeX), this.stageW - this.player.width);
        this.player.y = Math.min(Math.max(0, planeY), this.stageH - this.player.height);
    }
}