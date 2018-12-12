type PlaneInfo = {
    planeName: string, //飞机名称
    bulletType: string, //子弹类型
    ultimateSkill: string, //终极技能
    normalSkill: string, //自保技能
    healthPoint: number, //hp
    fireDelay: number, //攻击间隔
    hitRect: hitRectType
}
type BulletInfo = {
    bulletName: string,
    attack: number
}

type hitRectType = {
    x: number,
    y: number,
    width: number,
    height: number
}