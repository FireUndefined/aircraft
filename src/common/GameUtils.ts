type rect = {
    x: number, y: number, width: number, height: number
}

class GameUtils {
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
    public static createBitmapByName(name: string): egret.Bitmap {
        let result: egret.Bitmap = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    }

    /**
     * 像素级碰撞
     */
    public static pixelHitTest(object: Pixel, target: Pixel, pixelFlag?: boolean): boolean {
        //获取两个对象宽高的一半
        let objHalfW = object.width / 2;
        let objHalfH = object.height / 2;
        let targetHalfW = target.width / 2;
        let targetHalfH = target.height / 2;

        //获取两个对象的中心点
        let objCenterX = object.x + objHalfW;
        let objCenterY = object.y + objHalfH;
        let targetCenterX = target.x + targetHalfW;
        let targetCenterY = target.y + targetHalfH;

        //中心点距离小于各自宽高一半之和为矩形碰撞
        if (Math.abs(objCenterX - targetCenterX) <= (objHalfW + targetHalfW) &&
            Math.abs(objCenterY - targetCenterY) <= (objHalfH + targetHalfH)) {
            //如果pixel = true
            if (pixelFlag) {
                //获取相交区域
                let intersect: rect = this.getIntersect(object, target);

                //获取相交区域的像素
                let bound01Pixels: number[] = object.getBoundsPixels(
                    Math.abs(object.x - intersect.x),
                    Math.abs(object.y - intersect.y),
                    intersect.width,
                    intersect.height
                );
                let bound02Pixels: number[] = target.getBoundsPixels(
                    Math.abs(target.x - intersect.x),
                    Math.abs(target.y - intersect.y),
                    intersect.width,
                    intersect.height
                );

                //遍历
                for (let i = 3; i < bound01Pixels.length; i += 4) {
                    if (bound01Pixels[i] >= 50 && bound02Pixels[i] >= 50) {
                        return true
                    }
                }

            } else {
                return true
            }
        }

        return false;
    }

    private static getIntersect(bound1: Pixel, bound2: Pixel): rect {

        let intersect: rect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };

        intersect.x = Math.max(bound1.x, bound2.x);
        intersect.y = Math.max(bound1.y, bound2.y);
        intersect.width = Math.min((bound1.x + bound1.width) - intersect.x, (bound2.x + bound2.width) - intersect.x);
        intersect.height = Math.min((bound1.y + bound1.height) - intersect.y, (bound2.y + bound2.height) - intersect.y);

        return intersect;
    }
}