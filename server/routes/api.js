var express = require('express');
var router = express.Router();

const welcomeMsg = '歡迎光臨方方ㄉ窩, 今天開學ㄌ\\^O^/';
let data = [
    {
        id: 0,
        userName: '方方',
        time: '2008/9/1, 20:30',
        content: welcomeMsg,
        reply: [
            {
                userName: '方方',
                time: '2008/9/1, 20:38',
                content: '禁止髒話&人身攻擊，火星文4ㄎ1ㄉㄛ~~',
            },
            {
                userName: '爆氣流星斬',
                time: '2008/9/1, 20:38',
                content: '勁舞ＩＤ： 戀★〞天空♀\n\n性別： 女\n\n及時通： qazwsx123\n\n興趣： 勁舞辣\n\n想對公會說的話： 請尼咘要離開我好咘好',
            },
        ]
    },
    {
        id: 1,
        userName: 'pp',
        time: '2008/9/1, 21:13',
        content: 'deadline deadline\nhot line 掛掉 總是line都line不到人\ni feel like 海馬瀨人\nwhy 因為找不到遊戲的罩門',
        reply: []
    }
]

router.get('/', function(req, res, next) {
    res.json(data);
});

router.post('/comments', function(req, res, next) {
    const post = req.body;
    const date = new Date();
    const time = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`;
    const newdata = {
        id: post.countId,
        userName: post.inputUsrName,
        time: time,
        content: post.inputMsg,
        reply: []
    };
    data = data.concat(newdata);
    res.send(newdata);
});

router.post('/comments/:idx', function(req, res, next) {
    const idx = parseInt(req.params.idx, 10);
    console.log(idx);
    console.log(req.params.idx);
    const post = req.body;
    console.log(post);
    const date = new Date();
    const time = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`;
    const newdata = {
        userName: post.name,
        time: time,
        content: post.content,
    };
    data[idx].reply = data[idx].reply.concat(newdata);
    res.send(newdata);
})

module.exports = router;