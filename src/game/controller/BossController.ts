class BossController extends BaseScene {

    /** 子弹数组*/
    public dotBullet: Bullet[] = [];
    public starBullet: Bullet[] = [];

    /** 血条*/
    private hpInstance: HealthPoint;
    public totalHP: number = 3600;

    /** boss*/
    public bossInstance: Boss;

    /** boss运动的x轴长度*/
    private allTrackLen: number;
    private halfTrackLen: number;

    /** star子弹出现的位置*/
    private rayPosition: any[] = [
        {x: 104, y: 130, deg: -30},
        {x: 118, y: 92, deg: -20},
        {x: 155, y: 98, deg: -10},
        {x: 182, y: 98, deg: 10},
        {x: 251, y: 92, deg: 20},
        {x: 267, y: 130, deg: 30}
    ];

    public constructor() {
        super()
    }

    protected init() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

        this.bossInstance = new Boss();
        this.bossInstance.x = (GameUtils.getStageWidth() - this.bossInstance.width) / 2;
        this.bossInstance.y = 60;

        this.hpInstance = new HealthPoint(this.totalHP);
        this.hpInstance.x = (this.stage.stageWidth - this.hpInstance.width) / 2;
        this.hpInstance.y = 20;
    }

    public start(): void {
        this.addChild(this.hpInstance);
        this.addChild(this.bossInstance);

        this.bossInstance.addEventListener('createDotBullet', this.status1, this);
        this.bossInstance.fireDot();

        this.move();
    }

    public changeForm(): void {
        this.stop();
        this.bossInstance.ceaseDot();
        this.bossInstance.changeForm();
        this.bossInstance.dotFireTicker.delay = 1000;
        this.bossInstance.removeEventListener('createDotBullet', this.status1, this);
        this.bossInstance.addEventListener('createDotBullet', this.status2, this);
        this.bossInstance.addEventListener('createStarBullet', this.status3, this);
        this.bossInstance.fireDot();
        this.bossInstance.fireStar();
        this.play();
    }

    public reduceHP(num: number): void {
        this.totalHP -= num;
        this.hpInstance.reduce(num);
        this.bossInstance.reduceHP(num);
    }

    public fire(): void {
        this.bossInstance.fireDot();
        this.bossInstance.fireStar();
    }

    public cease(): void {
        this.bossInstance.ceaseDot();
        this.bossInstance.ceaseStar();
    }

    /** 运动*/
    public move(): void {
        this.allTrackLen = this.stage.stageWidth - this.bossInstance.movemorphological.width;
        this.halfTrackLen = this.allTrackLen / 2;

        egret.Tween
            .get(this.bossInstance, {
                loop: true
            })
            .to({
                x: 0
            }, 2000)
            .wait(600)
            .to({
                x: this.halfTrackLen
            }, 2000)
            .wait(1200)
            .to({
                x: this.allTrackLen
            }, 2000)
            .wait(600)
            .to({
                x: this.halfTrackLen
            }, 2000)
            .wait(1200);
    }

    public stop(): void {
        egret.Tween.removeTweens(this.bossInstance);
    }

    public play(): void {
        this.move();
    }

    public reduce(num: number): void {
        this.totalHP -= num;
        this.hpInstance.reduce(num);
    }

    /** 子弹弹道*/
    private status1(evt: egret.Event): void {
        let target = evt.target;
        let bullet: Bullet;
        let i: number = 0;
        for (; i < 6; i++) {
            let delimiter: number = i >= 3 ? 5 : 0;
            let lr: number = i >= 3 ? 1 : 0;
            bullet = GameUtils.produceBullet(
                'dot_png',
                target.x + 68 + 94 * lr,
                200,
                i - delimiter,
                5
            );
            this.addChild(bullet);
            this.dotBullet.push(bullet);
        }
    }

    private status2(evt: egret.Event): void {
        let target = evt.target;
        let bullet: Bullet;
        let i: number = 0;
        for (; i < 6; i++) {
            bullet = GameUtils.produceBullet(
                'dot_png',
                target.x + target.width * global.Math.random(),
                140 + 110 * global.Math.random(),
                0,
                5
            );
            this.addChild(bullet);
            this.dotBullet.push(bullet);
        }
    }

    private status3(evt: egret.Event): void {
        let target = evt.target;
        let bullet: Bullet;
        let i: number = 0;
        for (; i < 6; i++) {
            let position = this.rayPosition[i];
            bullet = GameUtils.produceBullet(
                'star_png',
                target.x + position.x,
                target.y + position.y,
                5 * Math.sin(position.deg),
                5
            );
            this.addChild(bullet);
            this.starBullet.push(bullet);
        }
    }
}