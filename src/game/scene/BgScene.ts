class BgScene extends BaseScene {

    private isRunning: boolean = false;

    protected initView() {
        let bg: egret.Bitmap = Utils.createBitmapByName('game_bg');

        this.addChild(bg);
    }

    public run(): void {

    }

    public paused(): void {

    }
}