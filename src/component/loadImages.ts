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
  constructor(imgArr, callback) {
    this.imgArr = imgArr
    this.callback = callback
    this.totalCont = imgArr.length
    this.loadMethod()
  }
  // 加载所有图片
  private loadMethod() {
    this.imgArr.map(url => {
      this.loadImage(url)
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