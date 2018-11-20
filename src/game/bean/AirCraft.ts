class AirCraft extends BaseScene {
    private acIndex: number = 0;
    private acData: any = null;
    private ac: egret.Bitmap;

    protected initView() {
        this.acIndex = GameData.AirCraftData.AirCraftSlctIndex;
        this.acData = GameData.AirCraftData.AirCraftCandidate[this.acIndex];
        this.ac = Utils.createBitmapByName(this.acData.name);
        this.ac.x = (Utils.getStageWidth() - this.ac.width) / 2;
        this.ac.y = Utils.getStageHeight() * 0.85;
        this.addChild(this.ac);

        this.ac.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    }

    private onMove(e: egret.TouchEvent): void {
        this.ac.x = e.stageX;
        this.ac.y = e.stageY;
    }
}