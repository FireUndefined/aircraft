class Utils {
    /**
     * 获取舞台高度
     */
    public static getStageHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    /**
     * 获取舞台宽度
     */
    public static getStageWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    /**
     * 根据name创建一个Bitmap对象
     */
    public static createBitmapByName(name: string, type: string = 'png'): egret.Bitmap {
        let result: egret.Bitmap = new egret.Bitmap();
        result.texture = RES.getRes(name + '_' + type);
        return result;
    }
}