/* 
    道具类
**/
class MonsterClass extends egret.Sprite{
    private image:egret.Bitmap = new egret.Bitmap();
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
      //  this.addBlackShape();
        this.load(this.initMovieClip);
    }   

    // 阴影
    private async addBlackShape() {
      this.img = await this.createBitmapByName("monster.gif")
      this.img.width = 100
      this.img.height = 100
      
      // 深度放到最大
      this.img.x = Math.floor(Math.random()*1000)*2 / 2;
      this.img.y = this.y;
      this.addChild(this.img);
      this.moveRandom();
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
        let loader = new egret.URLLoader()
         loader.addEventListener(egret.Event.COMPLETE, function loadOver(e) {
            var loader = e.currentTarget;
            self._mcTexture = loader.data;    
            console.log('纹理集')
            console.log(this._mcTexture)
            check();       
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        var request:egret.URLRequest = new egret.URLRequest(GameConfig.domainUrl+'monster.png');
        loader.load(request);
        RES.getResByUrl('monster_json',(ev)=>{
            this._mcData = ev;
            this.initMovieClip();
            check();
        },this,RES.ResourceItem.TYPE_JSON);
        
    }
    private async createBitmapByName(name: string) {
        let url = GameConfig.domainUrl+name;
        var image = new eui.Image();
        egret.ImageLoader.crossOrigin = "anonymous"
        image.source = url;
        return image;
    }
}