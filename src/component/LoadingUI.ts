//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.createView,this);

    }

    private textField: egret.TextField;
    private progress;
    private stoneBar
    private stone
    private maskBack:egret.Shape;
    private createView() {
        this.addBack();
        this.addBar();
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = this.stage.stageHeight/2 + 60;
        this.textField.width = 480;
        this.textField.x = this.stage.stageWidth/2 - 480/2;
        this.textField.height = 29;
        this.textField.textAlign = "center";
        // #a31818
    }
    private async addBar() {
        this.addStoneBar();
        this.addStone();
    }
    private async addStone() {
        // if(this.stone)
        //     this.removeChild(this.stone);
        this.stone = await this.getUrl("stone.png");
        this.stone.width  = 314;
        this.stone.height = 29;
        this.stone.x = this.stage.stageWidth/2 - this.stone.width/2-5;
        this.stone.y = this.stage.stageHeight/2 - this.stone.height/2;
        this.addChild(this.stone);
        this.stone.mask = this.addMask(0,0)
    }
    private addBack() {
        let back = new egret.Shape();
        back.graphics.beginFill(0x666666);
        back.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight);
        back.graphics.endFill();
        this.addChild(back);
    }
    private addMask(width,height) {
        //画一个遮罩正方形
        if(this.maskBack){
            this.removeChild(this.maskBack)
            this.maskBack = null;
        }
        this.maskBack = new egret.Shape();
        this.maskBack.graphics.beginFill(0x1c1833,1);
        this.maskBack.graphics.drawRect(this.stone.x,this.stone.y,width,height);
        this.maskBack.graphics.endFill();
        
        this.addChild(this.maskBack);
        return this.maskBack;
    }
    private async addStoneBar() {
        this.stoneBar = await this.getUrl("stoneBar.png");
        this.stoneBar.width = 374;
        this.stoneBar.height = 48;
        this.stoneBar.x = this.stage.stageWidth/2 - this.stoneBar.width/2;
        this.stoneBar.y = this.stage.stageHeight/2 - this.stoneBar.height/2;
        this.addChild(this.stoneBar)
    }
    private getUrl(url) {
        var textTrue =new egret.Texture()
        let il:egret.ImageLoader = new egret.ImageLoader();
        il.crossOrigin = 'anonymous'
        il.load(GameConfig.domainUrl+url);
        return new Promise((resolve)=>{
            il.once(egret.Event.COMPLETE, (event)=>{
                var imageLoader = <egret.ImageLoader>event.currentTarget;
                let texture = new egret.Texture();
                texture._setBitmapData(imageLoader.data);
                var bmp = new egret.Bitmap(texture);
                resolve(bmp);
            },false);
        })
    }
    public onProgress(current: number, total: number): void {
        let price = 314 / total;
        if(this.stone){
            this.stone.mask = this.addMask((current+1)*price,29)
        }
        console.log(price)
        console.log(current)
        console.log(this.stone)
        let num = Math.floor(((current+1)/total)*100);
        if(num>100)
            num = 100;
        this.textField.text = `正在搬运星球: ${num}%`;
    }
}
