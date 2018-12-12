class BossController extends BaseScene {

    public dotBullet: Bullet[] = [];
    public starBullet: Bullet[] = [];

    public constructor() {
        super()
    }

    protected init() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
    }


}