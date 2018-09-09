/* 
    道具类
**/
class MonsterClass extends egret.Sprite{
    private img;
    public width:number;
    public height:number;
    private role:egret.MovieClip;
    public constructor(x,y,width,height){
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.drawProps,this);
    }
    private async drawProps(){
        this.load(this.initMovieClip);
    }   
    private moveRandom() {
        let fn = ()=>{
            let random = Math.floor(Math.random()*1000)*2;
            egret.Tween
            .get(this.role)
            .to( this.generateStyle(), 10*random, egret.Ease.sineIn ).call(()=>{
                if(GameConfig.state ===0 || GameConfig.state ===2) {
                    return;
                }
                fn();
            });
        }
        fn();
    }
    private ran(end,start) {
		return Math.floor(Math.random()*(end-start)+start)
    }
    private generateStyle() {
        let minWidth = 100;
        let maxWidth = 300;
        let height = this.ran(maxWidth,minWidth) 
        let width = height;
        
        let maxX = this.width-width;
        let maxY = this.height-height;
        let minX = this.x;
        let minY = this.y-200;
        
        let x = this.ran(maxX,minX);
        let y = this.ran(maxY,minY);
        return {
            x,y,width,height
        }
    }
    private _mcData;
    private _mcTexture;
    private initMovieClip():void {
        /*** 本示例关键代码段开始 ***/
        console.log(this._mcData,this._mcTexture)
        var mcDataFactory = new egret.MovieClipDataFactory(this._mcData, this._mcTexture);
        
        this.role =  new egret.MovieClip(mcDataFactory.generateMovieClipData("monster"));
        this.role.x = this.generateStyle().x;
        this.role.y = this.generateStyle().y;
        this.role.frameRate = 5;
        this.addChild(this.role);
        this.role.gotoAndPlay(0,-1);
        this.moveRandom();
    }
    protected async load(callback) {
        var count:number = 0;
        var self = this;
        var check = function () {
            count++;
            if (count == 2) {
                callback.call(self);
            }
        }
        let url = GameConfig.domainUrl + 'monster.png'
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";// 跨域请求
        imgLoader.load(url);// 去除链接中的转义字符‘\’        
        imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
            if (evt.currentTarget.data) {
                egret.log("加载头像成功: " + evt.currentTarget.data);
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                self._mcTexture = texture
                check() 
                console.log(texture)
            }
        }, this);
        RES.getResByUrl('monster_json',(ev)=>{
            this._mcData = ev;
            check();
        },this,RES.ResourceItem.TYPE_JSON);
        
    }
    private createBitmapByName(name: string, callback) {
        let url = GameConfig.domainUrl+name;
        var image = new eui.Image();
        image.addEventListener(egret.Event.COMPLETE, function(ev) {
            console.log('callback')
            callback(image)
        }, image)
        image.source = url;        
        egret.ImageLoader.crossOrigin = "anonymous"        
        return image
    }
}