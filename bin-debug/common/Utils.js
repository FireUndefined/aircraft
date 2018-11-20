var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    /**
     * 获取舞台高度
     */
    Utils.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    /**
     * 获取舞台宽度
     */
    Utils.getStageWidth = function () {
        return egret.MainContext.instance.stage.stageWidth;
    };
    /**
     * 根据name创建一个Bitmap对象
     */
    Utils.createBitmapByName = function (name, type) {
        if (type === void 0) { type = 'png'; }
        var result = new egret.Bitmap();
        result.texture = RES.getRes(name + '_' + type);
        return result;
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
//# sourceMappingURL=Utils.js.map