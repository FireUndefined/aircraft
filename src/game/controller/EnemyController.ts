class EnemyController extends BaseScene {

    /** 敌机*/
    public enemies: Enemy[] = [];

    /** 子弹*/
    public enemyBullet: Bullet[] = [];

    /** 创建敌机*/
    private enemyCreator: egret.Timer;

    /** 是否继续产生敌机*/
    private continueCreate: boolean = false;

    /** 颜色*/
    private colorArray = [
        'red_enemy_01_png',
        'silver_enemy_02_png',
        'blue_enemy_01_png',
        'gold_enemy_01_png',
        'red_enemy_02_png',
        'silver_enemy_03_png',
        'blue_enemy_02_png',
        'gold_enemy_02_png',
        'silver_enemy_01_png'
    ];

    public constructor() {
        super();
    }

    protected init() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

        this.enemyCreator = new egret.Timer(6000);
        this.enemyCreator.addEventListener(egret.TimerEvent.TIMER, this.fallEnemy, this);
    }

    public start() {
        this.continueCreate = true;
        this.createEnemy();
    }

    public paused() {
        this.continueCreate = false;
    }

    private createEnemy(): void {
        for (let i = 0; i < 3; i++) {
            let enemy = GameUtils.produceEnemy(this.colorArray[GameUtils.getRandomNum(0, 9)]);
            enemy.x = GameData.PlaneData.enemyPostion[i].x;
            enemy.maxY = GameData.PlaneData.enemyPostion[i].maxY;
            enemy.addEventListener('createBullet', this.createBullet, this);
            enemy.fire();
            this.addChild(enemy);
            this.enemies.push(enemy);
        }

        this.enemyCreator.start();
    }

    private fallEnemy(): void {
        let self = this;
        self.enemyCreator.stop();

        for (let i = 0; i < this.enemies.length; i++) {
            let enemy: Enemy = self.enemies[i];
            enemy.removeEventListener('createBullet', self.createBullet, this);
            enemy.cease();
            egret.Tween
                .get(enemy)
                .to({
                    y: self.stage.stageHeight + enemy.height
                }, 3000)
                .call(function () {
                    GameUtils.reclaimEnemy(enemy);
                    self.removeChild(enemy);

                    let idx: number;
                    if ((idx = self.enemies.indexOf(enemy)) !== -1) {
                        self.enemies.splice(idx, 1);
                    }
                    if (self.enemies.length <= 0) {
                        //当敌机数组为空时，判断是否需要继续出现敌机
                        if (self.continueCreate) {
                            self.createEnemy();
                        } else {

                        }
                    }
                });
        }
    }

    private createBullet(evt: egret.Event): void {
        let enemy = evt.target;
        let i: number = 0;
        for (; i < 2; i++) {
            let bullet: Bullet = GameUtils.produceBullet('b2_png', enemy.x + (i == 0 ? 38 : 124), enemy.y + 70, 0, 6);
            this.addChildAt(bullet, this.numChildren - 1 - this.enemies.length);
            this.enemyBullet.push(bullet);
        }
    }
}