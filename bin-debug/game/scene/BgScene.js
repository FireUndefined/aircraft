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
var BgScene = (function (_super) {
    __extends(BgScene, _super);
    function BgScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRunning = false;
        _this.speed = 10;
        return _this;
    }
    BgScene.prototype.initView = function () {
        this.bg = Utils.createBitmapByName('game_bg', 'jpg');
        this.bg.width = Utils.getStageWidth();
        this.bg.height = Utils.getStageHeight() * 2;
        this.bg.fillMode = egret.BitmapFillMode.REPEAT;
        this.bg.y = -Utils.getStageHeight();
        this.addChild(this.bg);
    };
    BgScene.prototype.running = function () {
        this.bg.y += this.speed;
        if (this.bg.y > Utils.getStageHeight()) {
            this.bg.y = 0;
        }
    };
    BgScene.prototype.run = function () {
    };
    BgScene.prototype.pause = function () {
    };
    BgScene.prototype.getSpeed = function () {
        return this.speed;
    };
    BgScene.prototype.setSpeed = function (num) {
        this.speed = num;
    };
    return BgScene;
}(BaseScene));
__reflect(BgScene.prototype, "BgScene");
//# sourceMappingURL=BgScene.js.map