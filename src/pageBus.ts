/* 
**/
class PageBus{
    static pages = [];
    // 页面包含对象
    static contain;
    static nowPage;
    public constructor(){
            
    }
    static init(contain) {
        console.log(contain)
        PageBus.contain = contain;
    }
    static pushPage(page) {
        let had;
        PageBus.pages.map((val,index)=>{
            if(val === page)
                had = true;
        })
        if( had )
            return;
        PageBus.pages.push(page)
        //PageBus.nowPage = page;
    }
    static gotoPage(index) {
        if(!PageBus.nowPage) {
            PageBus.nowPage = PageBus.pages[0];
        }
        console.log(PageBus.contain,PageBus.nowPage)
        PageBus.contain.removeChild(PageBus.nowPage);
        PageBus.contain.addChild(PageBus.pages[index]);
    }
}