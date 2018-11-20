var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var AirCraft = (function (_super) {
    __extends(AirCraft, _super);
    function AirCraft() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.acIndex = 0;
        _this.acData = null;
        return _this;
    }
    AirCraft.prototype.initView = function () {
        this.acIndex = GameData.AirCraftData.AirCraftSlctIndex;
        this.acData = GameData.AirCraftData.AirCraftCandidate[this.acIndex];
        this.ac = Utils.createBitmapByName(this.acData.name);
        this.ac.x = (Utils.getStageWidth() - this.ac.width) / 2;
        this.ac.y = Utils.getStageHeight() * 0.85;
        this.addChild(this.ac);
        this.ac.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
    };
    AirCraft.prototype.onMove = function (e) {
        this.ac.x = e.stageX;
        this.ac.y = e.stageY;
    };
    return AirCraft;
}(BaseScene));
__reflect(AirCraft.prototype, "AirCraft");
//# sourceMappingURL=AirCraft.js.map