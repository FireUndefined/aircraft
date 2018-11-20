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
        _this.offsetX = 0;
        _this.offsetY = 0;
        return _this;
    }
    AirCraft.prototype.initView = function () {
        var _this = this;
        this.acIndex = GameData.AirCraftData.AirCraftSlctIndex;
        this.acData = GameData.AirCraftData.AirCraftCandidate[this.acIndex];
        this.ac = Utils.createBitmapByName(this.acData.name);
        this.ac.x = (Utils.getStageWidth() - this.ac.width) / 2;
        this.ac.y = Utils.getStageHeight() * 0.85;
        this.ac.touchEnabled = true;
        this.addChild(this.ac);
        this.ac.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            _this.offsetX = e.stageX - _this.ac.x;
            _this.offsetY = e.stageY - _this.ac.y;
        }, this);
        this.ac.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
            _this.offsetX = 0;
            _this.offsetY = 0;
        }, this);
        this.ac.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
            _this.ac.x = e.stageX - _this.offsetX;
            _this.ac.y = e.stageY - _this.offsetY;
            if (_this.ac.x >= Utils.getStageWidth() - _this.ac.width) {
                _this.ac.x = Utils.getStageWidth() - _this.ac.width;
            }
            if (_this.ac.x <= 0)
                _this.ac.x = 0;
            if (_this.ac.y >= Utils.getStageHeight() - _this.ac.height) {
                _this.ac.y = Utils.getStageHeight() - _this.ac.height;
            }
            if (_this.ac.y <= 0)
                _this.ac.y = 0;
        }, this);
    };
    return AirCraft;
}(BaseScene));
__reflect(AirCraft.prototype, "AirCraft");
//# sourceMappingURL=AirCraft.js.map