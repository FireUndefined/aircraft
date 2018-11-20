class AirCraft extends BaseScene {
    private acIndex: number = 0;
    private acData: any = null;
    private ac: egret.Bitmap;

    private offsetX: number = 0;
    private offsetY: number = 0;

    protected initView() {
        this.acIndex = GameData.AirCraftData.AirCraftSlctIndex;
        this.acData = GameData.AirCraftData.AirCraftCandidate[this.acIndex];
        this.ac = Utils.createBitmapByName(this.acData.name);
        this.ac.x = (Utils.getStageWidth() - this.ac.width) / 2;
        this.ac.y = Utils.getStageHeight() * 0.85;
        this.ac.touchEnabled = true;
        this.addChild(this.ac);

        this.ac.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            this.offsetX = e.stageX - this.ac.x;
            this.offsetY = e.stageY - this.ac.y;
        }, this);

        this.ac.addEventListener(egret.TouchEvent.TOUCH_END, (e: egret.TouchEvent) => {
            this.offsetX = 0;
            this.offsetY = 0;
        }, this);

        this.ac.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e: egret.TouchEvent) => {
            this.ac.x = e.stageX - this.offsetX;
            this.ac.y = e.stageY - this.offsetY;

            if (this.ac.x >= Utils.getStageWidth() - this.ac.width) {
                this.ac.x = Utils.getStageWidth() - this.ac.width;
            }

            if (this.ac.x <= 0) this.ac.x = 0;

            if (this.ac.y >= Utils.getStageHeight() - this.ac.height) {
                this.ac.y = Utils.getStageHeight() - this.ac.height;
            }

            if (this.ac.y <= 0) this.ac.y = 0;
        }, this);
    }
}