class Boss extends egret.DisplayObjectContainer {

    private totalHP: number = 3600;

    public hitRect: hitRectType;

    /** boss滴样子*/
    private morphological1: egret.Bitmap;
    private morphological2: egret.Bitmap;
    public movemorphological: egret.Bitmap;

    /** boss开火*/
    public dotFireTicker: egret.Timer;
    public starFireTicker: egret.Timer;

    public constructor() {
        super();

        this.morphological1 = GameUtils.createBitmapByName('creature_form_01_png');
        this.addChild(this.morphological1);
        this.movemorphological = this.morphological1;

        this.dotFireTicker = new egret.Timer(1600);
        this.dotFireTicker.addEventListener(egret.TimerEvent.TIMER, this.createDotBullet, this);

        this.starFireTicker = new egret.Timer(1500);
        this.starFireTicker.addEventListener(egret.TimerEvent.TIMER, this.createStarBullet, this);

        this.hitRect = {
            x: 0,
            y: 0,
            width: this.movemorphological.width,
            height: this.movemorphological.height
        };
    }

    private createDotBullet(evt: egret.TimerEvent): void {
        this.dispatchEventWith('createDotBullet');
    }

    private createStarBullet(evt: egret.TimerEvent): void {
        this.dispatchEventWith('createStarBullet');
    }

    public fireDot(): void {
        this.dotFireTicker.start();
    }

    public fireStar(): void {
        this.starFireTicker.start();
    }

    public ceaseDot(): void {
        this.dotFireTicker.stop();
    }

    public ceaseStar(): void {
        this.starFireTicker.stop();
    }

    public changeForm(): void {
        this.removeChild(this.morphological1);
        this.morphological2 = GameUtils.createBitmapByName('creature_form_02_png');
        this.addChild(this.morphological2);
        this.movemorphological = this.morphological2;
        this.hitRect = {
            x: 0,
            y: 0,
            width: this.movemorphological.width,
            height: this.movemorphological.height
        }
    }

    public reduceHP(num: number): void {
        this.totalHP -= num;
    }
}
