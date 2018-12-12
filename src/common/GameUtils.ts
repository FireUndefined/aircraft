class GameUtils {
    /**
     * 获取舞台高度
     */
    public static getStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    /**
     * 获取舞台宽度
     */
    public static getStageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    /**
     * 获取随机数
     */
    public static getRandomNum(min, max): number {
        return parseInt(Math.random() * (max - min) + min);
    }

    /**
     * 根据name创建一个Bitmap对象
     */
    public static createBitmapByName(name: string): egret.Bitmap {
        let result: egret.Bitmap = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    }

    /**
     * 矩形级碰撞
     */
    public static rectHitTest(target1: any, target2: any): boolean {
        //获取两个对象宽高的一半
        let objHalfW = target1.hitRect.width / 2;
        let objHalfH = target1.hitRect.height / 2;
        let targetHalfW = target2.hitRect.width / 2;
        let targetHalfH = target2.hitRect.height / 2;

        //获取两个对象的中心点
        let objCenterX = target1.x + target1.hitRect.x + objHalfW;
        let objCenterY = target1.y + target1.hitRect.y + objHalfH;
        let targetCenterX = target2.x + target2.hitRect.x + targetHalfW;
        let targetCenterY = target2.y + target2.hitRect.y + targetHalfH;

        //中心点距离小于各自宽高一半之和为矩形碰撞
        return (Math.abs(objCenterX - targetCenterX) <= (objHalfW + targetHalfW) && Math.abs(objCenterY - targetCenterY) <= (objHalfH + targetHalfH));
    }

    /** 对象池*/
    public static cacheDict: Object = {};

    /** 生成*/
    public static produceBullet(bulletName: string, x: number, y: number, mx: number, my: number): Bullet {
        if (GameUtils.cacheDict[bulletName] == null) {
            GameUtils.cacheDict[bulletName] = [];
        }

        let dict: Bullet[] = GameUtils.cacheDict[bulletName];
        let bullet: Bullet;

        if (dict.length > 0) {
            bullet = dict.pop();
            bullet.x = x;
            bullet.y = y;
            bullet.mx = mx;
            bullet.my = my;
        } else {
            bullet = new Bullet(bulletName, x, y, mx, my);
        }

        return bullet;
    }

    public static produceEnemy(enemyName: string, x: number = 0, y: number = 0): Enemy {

        if (GameUtils.cacheDict[enemyName] == null) {
            GameUtils.cacheDict[enemyName] = [];
        }

        let dict: Enemy[] = GameUtils.cacheDict[enemyName];
        let enemy: Enemy;

        if (dict.length > 0) {
            enemy = dict.pop();
            enemy.x = x;
            enemy.y = y;
        } else {
            enemy = new Enemy(enemyName);
        }
        return enemy
    }

    /** 回收*/
    public static reclaimBullet(bullet: Bullet): void {
        let bulletName: string = bullet.bulletName;

        if (GameUtils.cacheDict[bulletName] == null) {
            GameUtils.cacheDict[bulletName] = [];
        }

        let dict: Bullet[] = GameUtils.cacheDict[bulletName];

        if (dict.indexOf(bullet) == -1) {
            dict.push(bullet);
        }
    }

    public static reclaimEnemy(enemy: Enemy): void {
        let enemyName: string = enemy.enemyName;

        if (GameUtils.cacheDict[enemyName] === null) {
            GameUtils.cacheDict[enemyName] = [];
        }

        let dict: Enemy[] = GameUtils.cacheDict[enemyName];

        if (dict.indexOf(enemy) == -1) {
            dict.push(enemy)
        }
    }
}