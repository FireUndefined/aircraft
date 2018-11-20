import tr = egret.sys.tr;

class BgScene extends BaseScene {

    private isRunning: boolean = false;
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
        this.running();
    }

    public running(): void {
        this.bg.addEventListener(egret.Event.ENTER_FRAME, function () {

            if (this.isRunning) {
                this.bg.y += this.speed;

                if (this.bg.y > 0) {
                    this.bg.y = -this.$height;
                }
            }
        }, this);
    }

    public run(): void {
        this.isRunning = true;
    }

    public pause(): void {
        this.isRunning = false;
    }

    public getSpeed(): number {
        return this.speed
    }

    public setSpeed(num: number) {
        this.speed = num;
    }
}