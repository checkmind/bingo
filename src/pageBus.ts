/* 
**/
class PageBus{
    static pages = {};
    // 页面包含对象
    static contain;
    static nowPage;
    public constructor(){
            
    }
    static init(contain) {
        console.log(contain)
        PageBus.contain = contain;
    }
    static pushPage(Obj:{router:string,page:any}) {
        console.log(PageBus.pages,Obj);
        if(PageBus.pages[Obj.router])
            return;
        PageBus.pages[Obj.router] = Obj;
    }
    static gotoPage(router) {
        if(!PageBus.nowPage) {
            console.log(PageBus.pages['index'])
            PageBus.nowPage = PageBus.pages['index'];
        }
        console.log(PageBus.contain,PageBus.nowPage)
        PageBus.contain.removeChild(PageBus.nowPage['page']);
        PageBus.contain.addChild(PageBus.pages[router]['page']);
        PageBus.nowPage = PageBus.pages[router]
    }
}