class GameView extends BaseScene {
    public constructor() {
        super();
    }

    /** 页面元素*/
    private bg: BgMap;
    private enemyController: EnemyController;
    private playerController: PlayerController;
    private bossController: BossController;

    /** 上一帧时间*/
    private _lastTime: number;

    /** 出现敌机的批次*/
    public enemyBatch: number = 4;
    private bossTiming: boolean = false;
    private bossIsLaunch: boolean = false;
    private bossIsChangeFrom: boolean = false;

    /** 加载音频**/
    private sound: egret.Sound = new egret.Sound();

    protected init(): void {
        let self = this;

        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

        this._lastTime = egret.getTimer();

        this.bg = new BgMap();
        this.addChild(this.bg);

        this.enemyController = new EnemyController(this.enemyBatch);
        this.enemyController.x = 0;
        this.enemyController.y = 0;
        this.addChild(this.enemyController);

        this.bossController = new BossController();
        this.bossController.x = 0;
        this.bossController.y = 0;
        this.addChild(this.bossController);

        this.playerController = new PlayerController();
        this.playerController.x = 0;
        this.playerController.y = 0;
        this.addChild(this.playerController);

        this.startGame();

        this.sound.addEventListener(egret.Event.COMPLETE, function loadOver(event: egret.Event) {

            console.log("loaded success!");
        }, this);
        this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event: egret.IOErrorEvent) {
            console.log("loaded error!");
        }, this);
        this.sound.load("resource/assets/music/the_golden_armada.mp3");

        /*** 暂时加一个玩玩***/
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            self.sound.play();
        }, this);
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

        if (this.enemyController.getRemainBatch() <= 0 && !this.bossIsLaunch) {
            this.bossTiming = true;
            this.bossController.start();
            this.bossIsLaunch = true;
        }

        if (this.bossTiming) {
            this.bossViewUpdate(speedOffset);
        } else {
            this.enemyViewUpdate(speedOffset);
        }
    }

    /** 更改boss形态*/
    private changeForm() {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.bossController.cease();
        this.bossController.changeForm();
        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.bossController.fire();
    }

    /** 更新boss视图*/
    private bossViewUpdate(speedOffset) {
        let i: number = 0;
        let len: number = this.playerController.playerBullet.length;
        let bullet: Bullet;

        for (; i < len; i++) {
            bullet = this.playerController.playerBullet[i];
            if (bullet.y <= 0) {
                GameUtils.reclaimBullet(bullet);
                this.playerController.playerBullet.splice(i, 1);
                this.playerController.removeChild(bullet);
                len--;
                i--;
            }
            bullet.y -= bullet.my * speedOffset;
        }

        i = 0;
        len = this.bossController.dotBullet.length;
        for (; i < len; i++) {
            bullet = this.bossController.dotBullet[i];
            if (bullet.x < 0 || bullet.x > this.stage.stageWidth || bullet.y > this.stage.stageHeight || bullet.y < 0) {
                this.bossController.removeChild(bullet);
                GameUtils.reclaimBullet(bullet);
                this.bossController.dotBullet.splice(i, 1);
                i--;
                len--;
            }
            bullet.x += bullet.mx * speedOffset;
            bullet.y += bullet.my * speedOffset;
        }

        i = 0;
        len = this.bossController.starBullet.length;
        for (; i < len; i++) {
            bullet = this.bossController.starBullet[i];
            if (bullet.x <= 0 || (bullet.x >= (this.stage.stageWidth - bullet.width))) {
                bullet.mx = -bullet.mx;
            }

            if (bullet.y > this.stage.stageHeight || bullet.y < 0) {
                this.bossController.removeChild(bullet);
                GameUtils.reclaimBullet(bullet);
                this.bossController.starBullet.splice(i, 1);
                i--;
                len--;
            }
            bullet.x += bullet.mx * speedOffset;
            bullet.y += bullet.my * speedOffset;
        }

        if (this.bossController.totalHP <= 1800 && !this.bossIsChangeFrom) {
            this.changeForm();
            this.bossIsChangeFrom = true;
        }

        this.bossHitTest();
    }

    private bossHitTest() {
        let delPlayerBullet: Bullet[] = [];

        let i: number = 0;
        let len: number = this.playerController.playerBullet.length;
        let bullet: Bullet;
        let bossInstance = this.bossController.bossInstance;

        for (; i < len; i++) {
            bullet = this.playerController.playerBullet[i];
            if (GameUtils.rectHitTest(bullet, bossInstance)) {
                this.bossController.reduceHP(bullet.attack);
                if (delPlayerBullet.indexOf(bullet) === -1) {
                    delPlayerBullet.push(bullet);
                }
            }
        }

        while (delPlayerBullet.length > 0) {
            let delBullet = delPlayerBullet.pop();
            this.playerController.removeChild(delBullet);
            this.playerController.playerBullet.splice(this.playerController.playerBullet.indexOf(delBullet), 1);
            GameUtils.reclaimBullet(delBullet);
        }
    }

    /** 更新敌机视图*/
    private enemyViewUpdate(speedOffset) {
        let i: number = 0;
        let len: number = this.playerController.playerBullet.length;
        let bullet: Bullet;
        let enemy: Enemy;

        for (; i < len; i++) {
            bullet = this.playerController.playerBullet[i];
            if (bullet.y <= 0) {
                GameUtils.reclaimBullet(bullet);
                this.playerController.playerBullet.splice(i, 1);
                this.playerController.removeChild(bullet);
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
                this.enemyController.enemyBullet.splice(i, 1);
                this.enemyController.removeChild(bullet);
                len--;
                i--;
            }
            bullet.y += bullet.my * speedOffset;
        }

        this.enemyHitTest();
    }

    private enemyHitTest(): void {
        let delPlayerBullet: Bullet[] = [];
        let delEnemies: Enemy[] = [];
        let delEnemyBullet: Bullet[] = [];

        let i: number = 0;
        let len: number = this.playerController.playerBullet.length;
        let bullet: Bullet;
        let enemy: Enemy;

        let j: number = 0;
        let len2: number = this.enemyController.enemies.length;

        for (; i < len; i++) {
            bullet = this.playerController.playerBullet[i];

            for (; j < len2; j++) {
                enemy = this.enemyController.enemies[j];
                if (GameUtils.rectHitTest(bullet, enemy)) {
                    enemy.reduceHP(bullet.attack);
                    if (delPlayerBullet.indexOf(bullet) === -1) {
                        delPlayerBullet.push(bullet);
                    }
                    if (enemy.totalHp <= 0 && delEnemies.indexOf(enemy) === -1) {
                        delEnemies.push(enemy);
                    }
                }
            }
        }

        while (delEnemies.length > 0) {
            let delE = delEnemies.pop();
            this.enemyController.removeChild(delE);
            this.enemyController.enemies.splice(this.enemyController.enemies.indexOf(delE), 1);
            this.enemyController.clearEnemy(delE);
            delE.reset();
            GameUtils.reclaimEnemy(delE);
        }

        while (delPlayerBullet.length > 0) {
            let delBullet = delPlayerBullet.pop();
            this.playerController.removeChild(delBullet);
            this.playerController.playerBullet.splice(this.playerController.playerBullet.indexOf(delBullet), 1);
            GameUtils.reclaimBullet(delBullet);
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