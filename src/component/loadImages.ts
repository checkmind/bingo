/**
 * 这个类用来加载一些资源文件，会返回当前加载进度
 */
class loadImages {
  // 当前加载百分比
  public cont:Number = 0
  public callback:Function
  public totalCont:Number
  // 加载图片列表
  private imgArr:Array<String>
  constructor(callback) {
    this.callback = callback
    this.loadMethod()
  }
  // 加载所有图片
  private loadMethod() {
    this.setImageArr()
    this.totalCont = this.imgArr.length    
    this.imgArr.map(url => {
      this.loadImage(url)
    })
  }
  // 设置图片列表
  private setImageArr() {
    this.imgArr = []
    this.setBingoImage()
    this.setPropImage()
  }
  private setBingoImage() {
    for(let i = 1; i<10; i++) {
      this.imgArr.push(`${GameConfig.domainUrl + i}.png`)
    }
  }
  private setPropImage() {
    GameConfig.helperSrc.map(val=>{
      this.imgArr.push(`${GameConfig.domainUrl + val}.png`)
    })
  }
  private loadImage(url) {
    let imgLoader = new egret.ImageLoader();
    imgLoader.crossOrigin = "anonymous";// 跨域请求
    imgLoader.load(url);// 去除链接中的转义字符‘\’        
    imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
        if(this.cont < this.totalCont) {
          this.cont++
          this.callback()
        }
    }, this);
  }
}