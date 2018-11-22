declare type PlaneInfo = {
    planeName: string,
    bulletType: string,
    ultimateSkill: string,
    normalSkill: string,
    healthPoint: number,
    attack: number,
    fireDelay: number
}

namespace GameData {

    export class PlaneData {
        public static slctPlane: number = 0;

        public static candidatePlane: Array<PlaneInfo> = [
            {
                planeName: 'PitLord',
                bulletType: 'b1',
                ultimateSkill: '',
                normalSkill: '',
                healthPoint: 10,
                attack: 10,
                fireDelay: 100
            }
        ]
    }
}
