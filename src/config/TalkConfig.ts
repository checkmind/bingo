/* 
**/
class TalkConfig{
    static taxArr = ['一','二','三','四','五','六','七','八'];
    static lockLabel = '探测器还未到达此区域，未知的世界太危险了，先解锁前面的区域吧';
    static taxLabel = [];
    static propTalk = [ '消灭指定的所有星球类型',
                        '消灭指定星球及其周围的八颗星球',
                        `当前你可以交换任意两个星球的位置，持续${GameConfig.canChangeTime}s`,
                        '当前增加五步，限关卡模式',
                        '使用时间机器，增加10s时间',]
    /* npc台词 */
    static talkInfinite = [{
        type: 1,
        text: '这里是时间模式，你只有100s的时间，人品与技术的双重考验，你只需记住三点：快！快！快！'
    }]
    
    static npcTalk = []
    static failWords = ['失败了？没关系再来一次！？','除了实力还需要运气','宇宙的熵越来越高了，降熵的速度都赶不上增熵了！','运用你的智慧......']
    static setTaxlabel() {
        TalkConfig.npcTalk.map(function(val){
            let arr = ''
            val.forEach(function(talk){
                arr += talk.text +'\n'
            })
            arr = arr.slice(0,90) + '......'
            TalkConfig.taxLabel.push(arr)
        })
        
    }
    public constructor(){
        
    }
}