class HealthPoint extends egret.DisplayObjectContainer implements IHealthPoint {

    /** 血条背景*/
    private behind: egret.Shape;

    /** 血条前景*/
    private previous: egret.Shape;

    /** 每点血量的长度*/
    private eachHPLength: number;

    /** 总血量*/
    private totalHP: number;
    private dynamicHP: number;

    /** 血条长度*/
    private hpWidth: number;

    /** 血条宽度*/
    private hpHight: number;

    public constructor(
        hp: number,
        width: number = 600,
        height: number = 10
    ) {
        super();

        this.dynamicHP = this.totalHP = hp;

        this.hpHight = height;
        this.hpWidth = width;

        this.eachHPLength = hp / width;

        this.behind = new egret.Shape();
        this.behind.graphics.beginGradientFill(egret.GradientType.LINEAR, [0xcc7832, 0xffb36e], [1, 1], [0, 255]);
        this.behind.graphics.drawRect(0, 0, width, height);
        this.behind.graphics.endFill();
        this.addChild(this.behind);

        this.previous = new egret.Shape();
        this.addChild(this.previous);
    }

    public reset(): void {
        this.dynamicHP = this.totalHP;
        this.previous.graphics.clear();
    }

    public reduce(num: number): void {
        if (this.dynamicHP <= 0) return;

        this.dynamicHP -= num;

        let dynamicLength = (this.totalHP - this.dynamicHP) / this.eachHPLength;

        this.previous.graphics.clear();
        this.previous.graphics.beginFill(0x000000);
        this.previous.graphics.drawRect(this.hpWidth - dynamicLength, 0, dynamicLength, this.hpHight);
        this.previous.graphics.endFill();
    }
}