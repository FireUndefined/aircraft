namespace GameData {

    export class BulletData {

        public static cacheDict: Object = {};

        /** produce*/
        public static produce(bulletName: string): Bullet {
            if (GameData.BulletData.cacheDict[bulletName] == null) {
                GameData.BulletData.cacheDict[bulletName] = [];
            }

            let dict: Bullet[] = GameData.BulletData.cacheDict[bulletName];
            let bullet: Bullet;

            if (dict.length > 0) {
                bullet = dict.pop();
            } else {
                bullet = new Bullet(bulletName);
            }

            return bullet
        }

        /** recycle*/
        public static reclaim(bullet: Bullet): void {
            let bulletName: string = bullet.bulletName;

            if (GameData.BulletData.cacheDict[bulletName] == null) {
                GameData.BulletData.cacheDict[bulletName] = [];
            }

            let dict: Bullet[] = GameData.BulletData.cacheDict[bulletName];

            if (dict.indexOf(bullet) == -1) {
                dict.push(bullet);
            }
        }

        /** bullet*/
        public static bulletData: Object = {
            b1: {
                attack: 10
            },
            b2: {
                attack: 10
            }
        }

    }
}