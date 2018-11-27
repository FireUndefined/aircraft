class GameController extends egret.DisplayObjectContainer {

    /** 记录触点与player的距离*/
    private offsetX: number = 0;
    private offsetY: number = 0;

    /** 舞台宽高*/
    private stageW: number;
    private stageH: number;

    /** 背景*/
    private bg: BgMap;

    /** player*/
    private player: Plane;
    private playerBullet: Bullet[] = [];

    /** 敌机*/
    private enemies: Plane[] = [];
    private enemiesBullet: Bullet[] = [];

    private _lastTime: number;

    public constructor() {
        super();
        this._lastTime = egret.getTimer();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.initGameScene();
    }

    private initGameScene(): void {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        //背景
        this.bg = new BgMap();
        this.addChild(this.bg);
        this.startGame();
    }

    /** 游戏开始*/
    private startGame() {
        this.bg.start();

        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStartHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);

        let slctPlane: PlaneInfo = GameData.PlaneData.candidatePlane[GameData.PlaneData.slctPlane];
        this.player = new Plane(slctPlane);
        this.player.x = (this.stageW - this.player.width) / 2;
        this.player.y = this.stageH * 0.85;
        this.addChild(this.player);
        this.player.addEventListener('createBullet', this.createBulletHandler, this);
        this.player.fire();

        this.addEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);

        this.createEnemyPlane();
    }

    /** 更新视图*/
    private gameViewUpdate(evt: egret.Event): void {
        let nowTime: number = egret.getTimer();
        let fps: number = 1000 / (nowTime - this._lastTime);
        this._lastTime = nowTime;
        let speedOffset: number = 60 / fps;

        /** 回收player的子弹*/
        let i: number = 0;
        let bullet: Bullet;
        let playerBulletNum: number = this.playerBullet.length;
        for (; i < playerBulletNum; i++) {
            bullet = this.playerBullet[i];
            if (bullet.y < -bullet.height) {
                this.removeChild(bullet);
                GameData.BulletData.reclaim(bullet);
                this.playerBullet.splice(i, 1);
                i--;
                playerBulletNum--;
            }
            bullet.y -= 12 * speedOffset
        }

        //回收飞机，没错，就是这么豪
        let theEnemy: Plane;
        let theEnemyLen: number = this.enemies.length;
        for (i = 0; i < theEnemyLen; i++) {
            theEnemy = this.enemies[i];
            if (theEnemy.y > this.stageH) {
                this.removeChild(theEnemy);
                GameData.PlaneData.reclaim(theEnemy);
                theEnemy.removeEventListener("createBullet", this.createBulletHandler, this);
                theEnemy.cease();
                this.enemies.splice(i, 1);
                i--;
                theEnemyLen--;
            }
            // theEnemy.y += 4 * speedOffset;
        }

        //敌人子弹运动
        var enemyBulletsCount: number = this.enemiesBullet.length;
        for (i = 0; i < enemyBulletsCount; i++) {
            bullet = this.enemiesBullet[i];
            if (bullet.y > this.stage.stageHeight) {
                this.removeChild(bullet);
                GameData.BulletData.reclaim(bullet);
                this.enemiesBullet.splice(i, 1);
                i--;
                enemyBulletsCount--;//数组长度已经改变
            }

            bullet.y += 8 * speedOffset;
        }

        this.gameHitTest();
    }

    /** 碰撞检测*/
    private gameHitTest(): void {
        let i: number, j: number;
        let bullet: Bullet;
        let thePlane: Plane;
        let playerBulletCount: number = this.playerBullet.length;
        let enemyPlaneCount: number = this.enemies.length;
        let enemuBulletsCount: number = this.enemiesBullet.length;

        //消失的飞机与子弹
        let delBullets: Bullet[] = [];
        let delPlanes: Plane[] = [];

        //player子弹
        for (i = 0; i < playerBulletCount; i++) {
            bullet = this.playerBullet[i];
            for (j = 0; j < enemyPlaneCount; j++) {
                thePlane = this.enemies[j];
                if (GameUtils.pixelHitTest(bullet, thePlane, true)) {
                    thePlane.healthPoint -= bullet.attack;

                    if (delBullets.indexOf(bullet) == -1) {
                        delBullets.push(bullet);
                    }
                    if (thePlane.healthPoint <= 0 && delPlanes.indexOf(thePlane) == -1) {
                        delPlanes.push(thePlane);
                    }
                }
            }
        }

        //enemy子弹
        for (i = 0; i < enemuBulletsCount; i++) {
            bullet = this.enemiesBullet[i];
            if (GameUtils.pixelHitTest(bullet, this.player, true)) {
                this.player.healthPoint -= bullet.attack;
                if (delBullets.indexOf(bullet) == -1)
                    delBullets.push(bullet);
            }
        }

        //敌机的撞击
        for (i = 0; i < enemyPlaneCount; i++) {
            thePlane = this.enemies[i];
            if (GameUtils.pixelHitTest(thePlane, this.player, true)) {
                this.player.healthPoint -= 500;
            }
        }

        if (this.player.healthPoint <= 0) {
            this.gameOver();
        } else {
            while (delBullets.length > 0) {
                bullet = delBullets.pop();
                this.removeChild(bullet);
                if (bullet.bulletName == 'PitLordBullet') {
                    this.playerBullet.splice(this.playerBullet.indexOf(bullet), 1)
                } else {
                    this.enemiesBullet.splice(this.enemiesBullet.indexOf(bullet), 1)
                }
                GameData.BulletData.reclaim(bullet);
            }

            while (delPlanes.length > 0) {
                thePlane = delPlanes.pop();
                thePlane.cease();
                thePlane.removeEventListener("createBullet", this.createBulletHandler, this);
                this.removeChild(thePlane);
                this.enemies.splice(this.enemies.indexOf(thePlane), 1);
                GameData.PlaneData.reclaim(thePlane);
            }
        }
    }

    private gameOver() {
        this.bg.paused();

        this.removeEventListener(egret.Event.ENTER_FRAME, this.gameViewUpdate, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStartHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMoveHandler, this);
        this.player.cease();
        this.player.removeEventListener("createBullet", this.createBulletHandler, this);

        console.log('game over');
    }

    /** 创建子弹*/
    private createBulletHandler(evt: egret.Event): void {
        let bullet: Bullet;

        if (evt.target == this.player) {
            let i: number = 0;
            for (; i < 2; i++) {
                bullet = GameData.BulletData.produce(this.player.bulletType);
                bullet.x = i == 0 ? (this.player.x + 30) : (this.player.x + this.player.width - bullet.width - 30);
                bullet.y = this.player.y - 30;
                this.addChildAt(bullet, this.numChildren - 1 - this.enemies.length);
                this.playerBullet.push(bullet);
            }
        } else {
            let theEnemy = evt.target;
            bullet = GameData.BulletData.produce(GameData.PlaneData.enemies[GameData.PlaneData.currentEnemy].bulletType);
            bullet.x = theEnemy.x + (theEnemy.width - bullet.width) / 2;
            bullet.y = theEnemy.y + 20;
            this.addChildAt(bullet, this.numChildren - 1 - this.enemies.length);
            this.enemiesBullet.push(bullet);
        }
    }

    /** 创建敌机*/
    private createEnemyPlane(): void {
        let enemy: Plane = GameData.PlaneData.produce(GameData.PlaneData.enemies[GameData.PlaneData.currentEnemy]);
        enemy.x = 400;
        // (this.stageW - enemy.width) * Math.random();
        enemy.y = 0;
        // -enemy.height;
        this.addChild(enemy);
        enemy.addEventListener('createBullet', this.createBulletHandler, this);
        enemy.fire();
        this.addChildAt(enemy, this.numChildren - 1);
        this.enemies.push(enemy);
    }

    /** 飞机移动*/
    private touchStartHandler(evt: egret.TouchEvent): void {
        this.offsetX = evt.stageX - this.player.x;
        this.offsetY = evt.stageY - this.player.y;
    }

    private touchEndHandler(evt: egret.TouchEvent): void {
        this.offsetX = 0;
        this.offsetY = 0;
    }

    private touchMoveHandler(evt: egret.TouchEvent): void {
        let planeX = evt.stageX - this.offsetX;
        let planeY = evt.stageY - this.offsetY;

        this.player.x = Math.min(Math.max(0, planeX), (this.stageW - this.player.width));
        this.player.y = Math.min(Math.max(0, planeY), (this.stageH - this.player.height));
    }
}