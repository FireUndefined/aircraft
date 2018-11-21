class BgScene extends BaseScene {

    public isRunning: boolean = false;
    private bg: egret.Bitmap;
    private speed: number = 10;
    private $height: number = Utils.getStageHeight();

    protected initView() {
        this.bg = Utils.createBitmapByName('game_bg', 'jpg');
        this.bg.width = Utils.getStageWidth();
        this.bg.height = this.$height * 2;
        this.bg.fillMode = egret.BitmapFillMode.REPEAT;
        this.bg.y = -this.$height;
        this.bg.cacheAsBitmap = true;
        this.addChild(this.bg);
    }

    public running(): void {
        this.bg.y += this.speed;

        if (this.bg.y > 0) {
            this.bg.y = -this.$height;
        }
    }

    public run(): void {
        this.isRunning = true;
        this.bg.addEventListener(egret.Event.ENTER_FRAME, this.running, this);
    }

    public pause(): void {
        this.isRunning = false;
        this.bg.removeEventListener(egret.Event.ENTER_FRAME, this.running, this);
    }

    public getSpeed(): number {
        return this.speed
    }

    public setSpeed(num: number) {
        this.speed = num;
    }
}