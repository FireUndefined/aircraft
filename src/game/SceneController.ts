class SceneController {
    private _stage: egret.DisplayObjectContainer; //场景容器

    private bgScene: BgScene; //背景容器

    public static sceneController: SceneController;

    public static get instance() {
        if (!this.sceneController) {
            this.sceneController = new SceneController();
        }

        return this.sceneController;
    }

    public constructor() {
        this.bgScene = new BgScene();
    }

    public setStage(stage: egret.DisplayObjectContainer) {
        this._stage = stage;
    }

    public static initGame() {
        let stage: egret.DisplayObjectContainer = this.instance._stage;
        stage.addChild(this.instance.bgScene);
    }

}