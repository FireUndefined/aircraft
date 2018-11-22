namespace GameData {
    export class AirCraftData {
        public static AirCraftSlctIndex: number = 0;

        public static AirCraftCandidate: Array<any> = [
            {
                name: 'aircraft_01',
                type: 'png',
                classify: 'craft_name_01'
            }
        ];

        public static EnemyCandidate: Array<any> = [
            {
                name: '',
                type: '',
                classify: ''
            }
        ];
    }

    export class BulletsData extends egret.Bitmap {

        public static cacheDict: Object = {};

        /*** 生成 ***/
        public static produce(textureName: string): GameData.BulletsData {
            if (GameData.BulletsData.cacheDict[textureName] == null) {
                GameData.BulletsData.cacheDict[textureName] = [];
            }

            let dict: GameData.BulletsData[] = GameData.BulletsData.cacheDict[textureName];
            let bullet: GameData.BulletsData;

            if (dict.length > 0) {
                bullet = dict.pop();
            }
            else {
                bullet = new GameData.BulletsData(RES.getRes(textureName), textureName);
            }

            return bullet;
        }

        /*** 回收 ***/
        public static reclaim(bullet: GameData.BulletsData): void {
            let textureName: string = bullet.textureName;

            if (GameData.BulletsData.cacheDict[textureName] == null){
                GameData.BulletsData.cacheDict[textureName] = [];
            }

            let dict: GameData.BulletsData[] = GameData.BulletsData.cacheDict[textureName];

            if (dict.indexOf(bullet) == -1) dict.push(bullet);
        }
    }
}