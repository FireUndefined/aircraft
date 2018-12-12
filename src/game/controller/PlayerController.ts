class PlayerController extends BaseScene {

    public playerBullet: Bullet[] = [];

    /** 触点偏移坐标*/
    private offsetX: number;
    private offsetY: number;

    /** 玩家*/
    private player: Player;
    private totalHP: number;
    private hp: HealthPoint;

    public constructor() {
        super()
    }

    protected init(): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

        this.player = new Player('PitLord');
        this.addChild(this.player);
        this.player.addEventListener('createBullet', this.createBullet, this);
        this.player.y = 1100;
        this.player.x = (this.stage.stageWidth - this.player.width) / 2;

        this.totalHP = this.player.totalHP;
        this.hp = new HealthPoint(this.totalHP);
        this.hp.x = (this.stage.stageWidth - this.hp.width) / 2;
        this.hp.y = 1300;
        this.addChild(this.hp);
    }

    public start(): void {
        this.player.fire();
    }

    public fire(): void {
        this.player.fire();
    }

    public cease(): void {
        this.player.cease();
    }

    public changePosition(x: number, y: number): void {
        let planeX = x - this.offsetX;
        let planeY = y - this.offsetY;

        this.player.x = Math.min(Math.max(0, planeX), (this.stage.stageWidth - this.player.width));
        this.player.y = Math.min(Math.max(0, planeY), (this.stage.stageHeight - this.player.height));
    }

    public setOffset(x: number, y: number): void {
        this.offsetX = x - this.player.x;
        this.offsetY = y - this.player.y;
    }

    public resetOffset(): void {
        this.offsetX = 0;
        this.offsetY = 0;
    }

    /** 发射子弹*/
    private createBullet(evt: egret.Event): void {
        let player = evt.target;
        let i: number = 0;
        for (; i < 2; i++) {
            let bullet: Bullet = GameUtils.produceBullet('PitLordBullet', player.x + (i == 0 ? 32 : 138), player.y - 20, 0, 10);
            this.addChild(bullet);
            this.playerBullet.push(bullet);
        }
    }
}