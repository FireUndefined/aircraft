class SceneController {
    private static _stage: egret.DisplayObjectContainer; //场景容器

    private static bgScene: BgScene; //背景容器
    private static acInstance: AirCraft; //飞机
    private static offsetX: number = 0;
    private static offsetY: number = 0;

    public static setStage(stage: egret.DisplayObjectContainer) {
        this._stage = stage;
    }

    public static initGame() {
        this.bgScene = new BgScene();
        this._stage.addChild(this.bgScene);
        this.bgScene.run();

        this.acInstance = new AirCraft();
        this._stage.addChild(this.acInstance);
        this.acInstance.x = (Utils.getStageWidth() - this.acInstance.width) / 2;
        this.acInstance.y = Utils.getStageHeight() * 0.85;
        this.acInstance.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (evt: egret.TouchEvent) => {
            this.offsetX = evt.stageX - this.acInstance.x;
            this.offsetY = evt.stageY - this.acInstance.y;
        }, this);
        this.acInstance.addEventListener(egret.TouchEvent.TOUCH_MOVE, (evt: egret.TouchEvent) => {
            let planeX = evt.stageX - this.offsetX;
            let planeY = evt.stageY - this.offsetY;
            planeX = Math.min(Math.max(0, planeX), Utils.getStageWidth() - this.acInstance.width);
            planeY = Math.min(Math.max(0, planeY), Utils.getStageHeight() - this.acInstance.height);
            this.acInstance.x = planeX;
            this.acInstance.y = planeY;
        }, this);
        this.acInstance.addEventListener(egret.TouchEvent.TOUCH_END, (evt: egret.TouchEvent) => {
            this.offsetX = 0;
            this.offsetY = 0;
        }, this);
    }

    public static gameViewUpdate() {

    }
}