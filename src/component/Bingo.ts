/* 
**/
class Bingo extends egret.Sprite{
    public width:number = GameBody.childW;
    public height:number = GameBody.childH;
    public type
    public parents:GameBody
    public colors = [0x1ca5fc,0x295c9d,0x990000,0x7f0000]
    private choosed
    // 切图
    public img
    public rect
    /**
     * 锁，在元素被清除或者要改变为其他元素的时候，需要判断锁
     */
    private lock = false
    public constructor(x: number, y: number, type: number, parent){
        super();
        this.x = x*(this.width);
        this.y = y*(this.height);
        this.parents = parent
        this.type = type;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawDoors,this);
    }
    private drawDoors(){
        this.addImage();
    }
    /**
     * 选择框
     */
    private async addRect(){
        this.rect =await GameConfig.createBitmapByName("rect.png");
        this.rect.width = this.width;
        this.rect.height = this.height;
        this.addChild(this.rect);
    }
    /**
     * 增加贴图
     */
    private async addImage(){
        if(this.type>=100) {
            this.img =await GameConfig.createBitmapByName("100.png");            
        } else {
            this.img =await GameConfig.createBitmapByName((this.type+1)+".png");    
        }
        this.img.width = this.width;
        this.img.height = this.height;
        this.img.anchorOffsetX = this.width/2
        this.img.anchorOffsetY = this.width/2
        this.img.x = this.img.width/2;
        this.img.y = this.img.width/2;
        this.addChild(this.img);
    }
    private nowDrak:Boolean = false;
    /**
     * 星球变黑
     */
    public async beDark() {
        let ran = Math.floor(Math.random()*10);
        // 变换为黑色球的几率
        if( ran === 5 && !this.nowDrak) {
            this.img.$parent && this.removeChild(this.img);
            this.img = await GameConfig.createBitmapByName("dark.png");
            this.img.width = this.width;
            this.img.height = this.height;
            this.nowDrak = true;
            this.addChild(this.img);
            return false;
        }
        this.removeChild(this.img);
        this.nowDrak = false;
        this.addImage();
    }
    /**
     * 变黑几率
     */
    public canClear() {
        let ran = Math.floor(Math.random()*10);
        // 变换为黑色球的几率
        console.log(ran)
        if( ran > 7) {
            return true
        }
        return false
    }
    /**
     * 变成其他的星球
     */
    public async beType(type) {
        // 如果已经要清除了就不能进行下一步了
        if(this.lock) {
            return
        }
        this.changeBiong(()=>{
            if(this.img.parent)
                this.removeChild(this.img);
            this.type = type;
            this.addImage();
        })
    }
    private changeBiong(fn) {
        let sky = this.img
        let iDirection:number = 1;
        let funcChange = ():void=>{
            sky.rotation += 6 * iDirection;
        }
        egret.Tween.get( sky, { onChange:funcChange, onChangeObj:sky } )
            .to( {}, this.parents.speed, egret.Ease.sineIn ).call(fn);
    }
    /**
     * 
     * @param fn 清除前动画，回调
     */
    private async addBlackHole(fn) {
        if(!this.img)
            return;
        if(this.img.parent)
            this.removeChild(this.img)
        let sky:any = await GameConfig.createBitmapByName("blackhole.png");
        sky.width = this.width;
        sky.height = this.height;
        sky.anchorOffsetX = this.width/2
        sky.anchorOffsetY = this.width/2
        sky.x = sky.width/2;
        sky.y = sky.width/2;
        var funcChange = ():void=>{
            sky.rotation += 6 * iDirection;
            if(sky.scaleX>0.1){
                sky.scaleX -= 0.01;
                sky.scaleY -= 0.01;
            }
        }
        var iDirection:number = 1;  
        this.addChild(sky);
        let self = this;
        egret.Tween.get( sky, { onChange:funcChange, onChangeObj:sky } )
            .to( {}, self.parents.speed, egret.Ease.sineIn ).call(fn);
    }
    /**
     * 清除
     */
    public killSelf() {
        this.lock = true
        return new Promise((resolve)=>{
            this.addBlackHole(()=>{
                this.$parent && this.$parent.removeChild(this);
                resolve();
            })
        })
    }
    /**
     * 和某个方向相邻元素交换位置
     * @param direction 方向
     */
    public moveToDirection(direction) {

        let that = this;
        
        return new Promise((resolve)=>{
            let fn = () => {
                that.removeChoosed();
                resolve(true);
            }
            switch(direction) {
                case 1:
                    egret.Tween.get( this ).to( {x:this.x,y:this.y-this.height}, this.parents.speed, egret.Ease.sineIn ).call(fn);
                    break;
                case 2:
                    egret.Tween.get( this ).to( {x:this.x+this.width,y:this.y}, this.parents.speed, egret.Ease.sineIn ).call(fn);
                    break;
                case 3:
                    egret.Tween.get( this ).to( {x:this.x,y:this.y+this.height}, this.parents.speed, egret.Ease.sineIn ).call(fn);
                    break;
                default:
                    egret.Tween.get( this ).to( {x:this.x-this.width,y:this.y}, this.parents.speed, egret.Ease.sineIn ).call(fn);
                    break;
            }
        });
    }
    /**
     * 往下挪动
     * @param j 纵坐标
     */
    public moveToBottom(j:number) {
        /*** 本示例关键代码段开始 ***/
        let distance = j * (this.height)
        egret.Tween.get( this )
            .to( {x:this.x,y:distance}, this.parents.speed, egret.Ease.sineIn );
    }
    public moveToSet(x,y) {
        y = y * (this.height)
        x = x * (this.width)
        egret.Tween.get( this )
            .to( {x,y}, this.parents.speed, egret.Ease.sineIn );
    }
    public chooseBingo() {
        if( this.choosed ) {
            this.removeChoosed();
            return;
        }
        this.addRect();
        this.choosed = true;
    }
    public removeChoosed() {
        if( !this.choosed )
            return;
        if(this.rect.$parent)
            this.removeChild(this.rect)
        this.choosed = false;
    }
}