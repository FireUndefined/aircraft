var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData;
(function (GameData) {
    var AirCraftData = (function () {
        function AirCraftData() {
        }
        AirCraftData.AirCraftSlctIndex = 0;
        AirCraftData.AirCraftCandidate = [
            {
                name: 'aircraft_01',
                type: 'png',
                classify: 'craft_name_01'
            }
        ];
        return AirCraftData;
    }());
    GameData.AirCraftData = AirCraftData;
    __reflect(AirCraftData.prototype, "GameData.AirCraftData");
})(GameData || (GameData = {}));
//# sourceMappingURL=GameData.js.map