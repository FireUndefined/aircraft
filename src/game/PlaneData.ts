declare type PlaneInfo = {
    planeName: string, //飞机名称
    bulletType: string, //子弹类型
    ultimateSkill: string, //终极技能
    normalSkill: string, //自保技能
    healthPoint: number, //hp
    fireDelay: number //攻击间隔
}

namespace GameData {

    export class PlaneData {
        public static slctPlane: number = 0;

        public static currentEnemy: number = 0;

        public static enemyDict: Object = {};

        public static produce(planeInfo: PlaneInfo): Plane {

            if (GameData.PlaneData.enemyDict[planeInfo.planeName] == null) {
                GameData.PlaneData.enemyDict[planeInfo.planeName] = [];
            }

            let dict: Plane[] = GameData.PlaneData.enemyDict[planeInfo.planeName];
            let enemy: Plane;
            if (dict.length > 0) {
                enemy = dict.pop();
            } else {
                enemy = new Plane(planeInfo);
            }
            return enemy;
        }

        public static reclaim(enenmy: Plane): void {
            let textureName: string = enenmy.planeName;
            if (GameData.PlaneData.enemyDict[textureName] == null) {
                GameData.PlaneData.enemyDict[textureName] = [];
            }

            let dict: Plane[] = GameData.PlaneData.enemyDict[textureName];
            if (dict.indexOf(enenmy) == -1) {
                dict.push(enenmy);
            }
        }

        public static candidatePlane: Array<PlaneInfo> = [
            {
                planeName: 'PitLord',
                bulletType: 'PitLordBullet',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 1000,
                fireDelay: 120
            }
        ];

        public static enemies: Array<PlaneInfo> = [
            {
                planeName: 'red_enemy_01_png',
                bulletType: 'b2_png',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 200,
                fireDelay: 800
            },
            {
                planeName: 'silver_enemy_02_png',
                bulletType: 'b2_png',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 200,
                fireDelay: 800
            },
            {
                planeName: 'blue_enemy_01_png',
                bulletType: 'b2_png',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 200,
                fireDelay: 800
            },
            {
                planeName: 'gold_enemy_01_png',
                bulletType: 'b2_png',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 200,
                fireDelay: 800
            },
            {
                planeName: 'red_enemy_02_png',
                bulletType: 'b2_png',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 200,
                fireDelay: 800
            },
            {
                planeName: 'silver_enemy_03_png',
                bulletType: 'b2_png',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 200,
                fireDelay: 800
            },
            {
                planeName: 'blue_enemy_02_png',
                bulletType: 'b2_png',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 200,
                fireDelay: 800
            },
            {
                planeName: 'gold_enemy_02_png',
                bulletType: 'b2_png',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 200,
                fireDelay: 800
            },
            {
                planeName: 'silver_enemy_01_png',
                bulletType: 'b2_png',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 200,
                fireDelay: 800
            }
        ];

        public static boss: Array<any> = [
            {}
        ]
    }
}
