class TaxButton extends eui.Component{
    public constructor(){
        super();
    }

    public labelDisplay:eui.Label;
    public labelDisplay2:eui.Label;
    private _label:string = "";
    private _label2:string = "";
    public get label():string{
        return this._label;
    }
    public get label2():string{
        return this._label2;
    }

    public set label(value:string){
        this._label = value;
        if(this.labelDisplay){
            this.labelDisplay.text = value;
        }
    }
    public set label2(value:string){
        this._label2 = value;
        if(this.labelDisplay2){
            this.labelDisplay2.text = value;
        }
    }

    protected childrenCreated():void{
        super.childrenCreated();
        if(this.labelDisplay){
            this.labelDisplay.text = this._label;
        }
    }
}