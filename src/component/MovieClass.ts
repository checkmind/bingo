/* 
    道具类
**/
class MovieClass extends egret.Sprite{
    private image:egret.Bitmap = new egret.Bitmap();
    private img;
    public width:number;
    public height:number;
    private role:egret.MovieClip;
    private movieName;
    private rotate;
    public constructor(x,y,width,height,movieName,rotate:any){
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.movieName = movieName
        this.rotate = rotate
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
        this.role =  new egret.MovieClip(mcDataFactory.generateMovieClipData(this.movieName));
        this.role.width = this.width
        this.role.height = this.height
        this.role.scaleX = this.role.scaleY = .5;
        this.role.x = -this.width/2;
        this.role.y = -this.height/2;
        this.role.rotation = this.rotate
        this.role.frameRate = 60;
        this.addChild(this.role);
    }
    public playMovie() {
        this.role.gotoAndPlay(0, 1);
        this.role.addEventListener(egret.Event.COMPLETE, function (e:egret.Event):void {
            if(this.parent)
                this.parent.removeChild(this)
        }, this);
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
        let url = GameConfig.domainUrl + this.movieName + '.png'
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";// 跨域请求
        imgLoader.load(url);// 去除链接中的转义字符‘\’        
        imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
            if (evt.currentTarget.data) {
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;
                self._mcTexture = texture
                check() 
                console.log(texture)
            }
        }, this);
        
        RES.getResByUrl(GameConfig.domainUrl + this.movieName+'.json',(ev)=>{
            this._mcData = ev;
            this.initMovieClip();
            check();
        },this,'json');
        
    }
}