class BgScene extends BaseScene {

    private isRunning: boolean = false;
    private bg: egret.Bitmap;
    private speed: number = 10;

    protected initView() {
        this.bg = Utils.createBitmapByName('game_bg', 'jpg');
        this.bg.width = Utils.getStageWidth();
        this.bg.height = Utils.getStageHeight() * 2;
        this.bg.fillMode = egret.BitmapFillMode.REPEAT;
        this.bg.y = -Utils.getStageHeight();
        this.addChild(this.bg);
    }

    public running(): void {
        this.bg.y += this.speed;

        if (this.bg.y > Utils.getStageHeight()) {
            this.bg.y = 0;
        }
    }

    public run(): void {

    }

    public pause(): void {

    }

    public getSpeed(): number {
        return this.speed
    }

    public setSpeed(num: number) {
        this.speed = num;
    }
}