class AirCraft extends BaseScene {
    private acIndex: number = 0;
    private acData: any = null;
    private ac: egret.Bitmap;

    protected initView() {
        this.acIndex = GameData.AirCraftData.AirCraftSlctIndex;
        this.acData = GameData.AirCraftData.AirCraftCandidate[this.acIndex];
        this.ac = Utils.createBitmapByName(this.acData.name);
        this.ac.touchEnabled = true;
        this.addChild(this.ac);
    }

    public getPlainCenter(): { x: number, y: number } {
        return {
            x: this.ac.x + this.ac.width / 2,
            y: this.ac.y + this.ac.height / 2
        }
    }
}