var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
**/
var GameConfig = (function () {
    function GameConfig() {
    }
    /* 即使不能消除也能交换顺序 */
    GameConfig.canChange = false;
    /* 消除的行列 */
    GameConfig.row = 7;
    GameConfig.col = 7;
    /* 当前步数 */
    GameConfig.stepOnoff = true;
    GameConfig.maxStep = 20;
    /* 星球种类 */
    GameConfig.bingosMax = 8;
    GameConfig.taxArr = ['一', '二', '三', '四', '五', '六', '七', '八'];
    GameConfig.taxLabel = ['第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的',
        '第一宇宙很强的'];
    /* npc台词 */
    GameConfig.npcTalk = [
        [{
                type: 1,
                text: '救世主，你醒了，我在这里等你很久了......'
            }, {
                type: 2,
                text: '爱因斯坦？什么？？什么救世主，我正打《星球大爆炸》就突然被屏幕吸到这里来了，怎么回事儿？？？'
            }, {
                type: 1,
                text: "\u4F60\u5148\u542C\u6211\u6162\u6162\u9053\u6765\uFF0C\u6211\u4EEC\u7684\u4EEA\u8868\u76D1\u6D4B\u5230\u6700\u8FD1\u6709\u4E9B\u5B87\u5B99\u7684\u71B5\u8D8A\u6765\u8D8A\u9AD8\uFF0C\u4E0D\u6E05\u695A\u4EC0\u4E48\u539F\u56E0\u3002\u5982\u679C\u71B5\u7EE7\u7EED\u8FD9\u6837\u589E\u52A0\u4E0B\u53BB\uFF0C\u6050\u6015\u8FD9\u4E9B\u5B87\u5B99\u4F1A\u8FDB\u5165\u4E00\u4E2A\u6B7B\u5BC2\u7684\u6C38\u6052\u72B6\u6001\u3002"
            }, {
                type: 2,
                text: '什么？？什么熵？什么死寂？听上去很“玄幻啊”!?'
            }, {
                type: 1,
                text: '哦，我有些唐突了，你还只是个初中生，熵是衡量物质的混乱程度，对比星球而言就是星球的混乱程度，宇宙在不断膨胀，星球之间的距离一直在增加，熵也在增加。'
            }, {
                type: 1,
                text: '当宇宙中的熵达到极限大时，一切运动就会中止，这个完全静止的状态就称为死寂。如果宇宙进入了死寂状态，那生物也就不存在了。'
            }, {
                type: 2,
                text: '你，你是什么人！告诉我这些干什么！？还有，我为什么出现在这里？'
            }, {
                type: 1,
                text: '其实我不是爱因斯坦，用你们的话讲，我们是外星高级文明，维度也高过人类，通过脑电波在和你对话，你所处的这个地方也是我干扰你的脑电波臆造出来的。'
            }, {
                type: 1,
                text: '虽然我们的维度高过人类，但我们的文明发展的代价是熵的剧增，对于降低熵的思维没有三维低等文明活跃。因此在你们网络上发布了这款星球大爆炸游戏...'
            }, {
                type: 2,
                text: '等等！你不会要说我是被游戏筛选出来的吧！'
            }, {
                type: 1,
                text: '（思索一会儿......）先别说了，前面的全息屏幕熟悉吧，将相同的星球聚集在一起，让我看看你的实力吧。'
            },]
    ];
    GameConfig.nowTax = 0;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map