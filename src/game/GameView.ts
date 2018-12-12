class GameView extends BaseScene {
    public constructor() {
        super();
    }

    private bg: BgMap;
    private enemyController: EnemyController;
    private playerController: PlayerController;

    private _lastTime: number;

    protected init(): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

        this._lastTime = egret.getTimer();

        this.bg = new BgMap();
        this.addChild(this.bg);

        this.enemyController = new EnemyController();
        this.enemyController.x = 0;
        this.enemyController.y = 0;
        this.addChild(this.enemyController);

        this.playerController = new PlayerController();
        this.playerController.x = 0;
        this.playerController.y = 0;
        this.addChild(this.playerController);

        this.startGame();
    }

    private startGame(): void {
        this.bg.start();
        this.enemyController.start();
        this.playerController.start();

        this.touchEnabled = true;

        //更新视图
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);

        //改变玩家位置
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStartHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
    }

    private gameViewUpdate(): void {
        let nowTime: number = egret.getTimer();
        let fps: number = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        let speedOffset: number = 60 / fps;

        let i: number = 0;
        let len: number = this.playerController.playerBullet.length;
        let bullet: Bullet;
        let enemy: Enemy;

        for (; i < len; i++) {
            bullet = this.playerController.playerBullet[i];
            if (bullet.y <= 0) {
                GameUtils.reclaimBullet(bullet);
                this.playerController.removeChild(bullet);
                this.playerController.playerBullet.splice(i, 1);
                len--;
                i--;
            }
            bullet.y -= bullet.my * speedOffset;
        }

        i = 0;
        len = this.enemyController.enemies.length;
        for (; i < len; i++) {
            enemy = this.enemyController.enemies[i];
            if (enemy.y <= enemy.maxY) {
                enemy.y += 4 * speedOffset;
            }
        }

        i = 0;
        len = this.enemyController.enemyBullet.length;
        for (; i < len; i++) {
            bullet = this.enemyController.enemyBullet[i];
            if (bullet.y >= this.stage.stageHeight) {
                GameUtils.reclaimBullet(bullet);
                this.enemyController.removeChild(bullet);
                this.enemyController.enemyBullet.splice(i, 1);
                len--;
                i--;
            }
            bullet.y += bullet.my * speedOffset;
        }

        this.hitTest();
    }

    private hitTest(): void {
        let i: number = 0;
        let len: number;
        let bullet: Bullet;
        let enemy: Enemy;

        len = this.playerController.playerBullet.length;
        let len2 = this.enemyController.enemies.length;
        for (; i < len; i++) {
            bullet = this.playerController.playerBullet[i];
            for (let j = 0; j < len2; j++) {
                enemy = this.enemyController.enemies[j];
                if (GameUtils.rectHitTest(bullet, enemy)) {
                    enemy.reduceHP(bullet.attack);
                    GameUtils.reclaimBullet(bullet);
                    this.playerController.removeChild(bullet);
                    this.playerController.playerBullet.splice(i, 1);
                    len--;
                    i--;
                }

                if (enemy.totalHp <= 0) {
                    GameUtils.reclaimEnemy(enemy);
                    this.enemyController.removeChild(enemy);
                    this.enemyController.enemies.splice(i, 1);
                    len2--;
                    j--;
                }
            }
        }
    }

    /** 改变player的位置*/
    private touchStartHandler(evt: egret.TouchEvent): void {
        this.playerController.setOffset(evt.stageX, evt.stageY)
    }

    private touchEndHandler(evt: egret.TouchEvent): void {
        this.playerController.resetOffset();
    }

    private touchMoveHandler(evt: egret.TouchEvent): void {
        this.playerController.changePosition(evt.stageX, evt.stageY);
    }
}