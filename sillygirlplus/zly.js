/**
 * @version v1.0.0
 * @rule 变量转换
 * @create_at 2022-11-13 13:00:54
 * @title 变量转换
 * @description 编辑：GOLU&py leaf
 * @author CNY&Yi Leven
 */
// 变量转换（写轮眼）v10.15

// [rule: raw export .*="([^"]+)"]
// [rule:[\s\S]*https://\S+\.isvjcloud\.com/\S+[\s\S]*]
// [rule:[\s\S]*https://\S+\.isvjd\.com/\S+[\s\S]*]
// [rule:[\s\S]*https://\S+\.jd\.com/\S+[\s\S]*]
// [priority: 6666666]优先级

/*
变量转换写轮眼 v10.15【旧版傻妞插件】
1、CNY可实现变量名称的转换，以适应不同作者的脚本各变量监控（只写了部分，其它有需要的自己抄代码改吧）；
2、GOlU整合了Yi Leven白眼的代码实现链接转码 与指定群组通知py leaf 仅添加内容
3、脚本放入傻妞replies插件目录，重启傻妞；
4、傻妞监控的优先级更高，正则会优先傻妞监控，然后再匹配此插件；

注：
1、本脚本大部分代码是【抄袭】各位大佬的，让我改的乱七八糟，凑合能用。
2、仅支持旧版傻妞，新版傻妞不支持！！！！！有需要自己改，我不会！
3、除非有错误，否则后续应该也不会更新，需要的自己改代码！


#######添加了多中变量之间的互转
#######修正了部分bug，改名为写轮眼多位大佬作品
#######添加了链接直接转变量，并可指定qq群运行通知
#######修复了傻妞可能出现的死循环大bug！！！
#######添加至2022年9月27日保护环境的变量！！！
#######代码后面的注释我复制粘贴的，懒得改了，名称对应不上，不用管它！！！
#######因为是我自己在用的插件，有些转换不一定合你心意，个别不是保护环境的。自己动手改改吧！！！

*/
const config = [
    {
        "name": "cjhy幸运抽大奖通用活动",
        "url": "https://cjhy-isv.isvjcloud.com/wxDrawActivity/",
        "id": "jd_cjhy_wxDrawActivity_Id"
    },
    {
        "name": "lzkj幸运抽大奖通用活动",
        "url": "https://lzkj-isv.isvjcloud.com/lzclient/",
        "id": "jd_lzkj_wxDrawActivity_Id"
    },
    {
        "name": "lzkj幸运抽大奖",
        "url": "https://lzkj-isv.isvjd.com/wxDrawActivity/",
        "id": "jd_lzkj_wxDrawActivity_Id"
    },
    {
        "name": "lzkj幸运抽大奖",
        "url": "https://lzkj-isv.isvjcloud.com/wxDrawActivity/",
        "id": "jd_lzkj_wxDrawActivity_Id"
    },
    {
        "name": "lzkj幸运抽大奖",
        "url": "https://lzkj-isv.isvjcloud.com/lzclient/",
        "id": "jd_lzkj_wxDrawActivity_Id"
    },
    {
        "name": "cjhy加购物车抽奖",
        "url": "https://cjhy-isv.isvjcloud.com/wxCollectionActivity/",
        "id": "jd_cjhy_wxCollectionActivityId"
    },
    {
        "name": "cjhy加购物车抽奖",
        "url": "https://cjhy-isv.isvjd.com/wxCollectionActivity/",
        "id": "jd_cjhy_wxCollectionActivityId"
    },
    {
        "name": "lzkj加购物车抽奖",
        "url": "https://lzkj-isv.isvjd.com/wxCollectionActivity/",
        "id": "jd_lzkj_wxCollectionActivityId"
    },
    {
        "name": "lzkj加购物车抽奖",
        "url": "https://lzkj-isv.isvjcloud.com/wxCollectionActivity/",
        "id": "jd_lzkj_wxCollectionActivityId"
    },
    {
        "name": "cj组队瓜分",
        "url": "https://cjhydz-isv.isvjcloud.com/wxTeam/",
        "id": "jd_cjhy_activityId"
    },
    {
        "name": "让福袋飞",
        "url": "https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/",
        "id": "jd_wxUnPackingActivity_activityId"
    },
    {
        "name": "lzkj店铺礼包",
        "url": "https://lzkj-isv.isvjcloud.com/wxShopGift/",
        "id": "jd_lzkj_wxShopGift_ids"
    },
    {
        "name": "lzkj店铺礼包",
        "url": "https://lzkj-isv.isvjd.com/wxShopGift/",
        "id": "jd_lzkj_wxShopGift_ids"
    },
    {
        "name": "秒拼手速",
        "url": "https://lzkjdz-isv.isvjcloud.com/wxSecond/",
        "id": "jd_wxSecond_activityId"
    },
    {
        "name": "cjhy店铺礼包",
        "url": "https://cjhy-isv.isvjcloud.com/wxShopGift/",
        "id": "jd_cjhy_wxShopGift_ids"
    },
    {
        "name": "cjhy知识超人",
        "url": "https://cjhy-isv.isvjcloud.com/wxKnowledgeActivity/",
        "id": "jd_cjhy_wxKnowledgeActivity_activityId"
    },
    {
        "name": "lzkj知识超人",
        "url": "https://lzkj-isv.isvjcloud.com/wxKnowledgeActivity/",
        "id": "jd_cjhy_wxKnowledgeActivity_activityId"
    },
    {
        "name": "lzkj盖楼有礼",
        "url": "https://lzkj-isv.isvjcloud.com/wxBuildActivity/",
        "id": "jd_cjhy_wxKnowledgeActivity_activityId"
    },
    {
        "name": "LZ店铺通用游戏任务kr",
        "url": "https://lzkj-isv.isvjcloud.com/wxgame/",
        "id": "jd_wxgame_activityId"
    },
    {
        "name": "LZ店铺通用游戏任务",
        "url": "https://lzkj-isv.isvjd.com/wxgame/",
        "id": "jd_wxgame_activityId"
    },
    {
        "name": "cj生日有礼",
        "url": "https://cjhy-isv.isvjcloud.com/mc/wxMcLevelAndBirthGifts/",
        "id": "jd_wxBirthGiftsId"
    },
    {
        "name": "购物车锦鲤通用活动",
        "url": "https://lzkjdz-isv.isvjd.com/wxCartKoi/cartkoi/",
        "id": "jd_wxCartKoi_activityId"
    },
    {
        "name": "购物车锦鲤通用活动",
        "url": "https://lzkjdz-isv.isvjcloud.com/wxCartKoi/",
        "id": "jd_wxCartKoi_activityId"
    },
    {
        "name": "lzkj游戏活动",
        "url": "https://lzkj-isv.isvjcloud.com/wxGameActivity/",
        "id": "jd_lzkj_wxGameActivity_activityId"
    },
    {
        "name": "lzkj游戏活动",
        "url": "https://lzkj-isv.isvjd.com/wxGameActivity/",
        "id": "jd_lzkj_wxGameActivity_activityId"
    },
    {
        "name": "cjhy游戏活动",
        "url": "https://cjhy-isv.isvjcloud.com/wxGameActivity/",
        "id": "jd_cjhy_wxGameActivity_activityId"
    },
    {
        "name": "cjhy游戏活动",
        "url": "https://cjhy-isv.isvjcloud.com/wxGameActivity/",
        "id": "jd_cjhy_wxGameActivity_activityId"
    },
    {

    }
]

function main() {

    var jcode = GetContent();
    var jcode2 = param(1);
    if (jcode.indexOf("https")!==-1 && jcode.indexOf("activityId")!==-1){
        let jcode3 = jcode.match(/https:\/\/[0-9a-zA-Z-&?=\/\.]+/g)[0];
        let index = parse_url(jcode3);
        if (index!==undefined){
            let name = config[index]["name"];
            let value = config[index]["id"];
            let activity_id = jcode.match(/activityId=([0-9a-z]+)/)[1];
            let content = `export ${value}="${activity_id}"`;
            sendText(content);
            push({
                imType:"tg",//发送到指定渠道,如qq,wx,必须有
                userID:"",//groupCode不为0时为@指定用户,可选
                groupCode:"-834608129",//可选
                content:`#变量转换-无变量链接#  ${name}\n${content}`,//发送消息
            });
            breakIn(content);
            sleep(2000);
            return;
        }else {
            let content = `#变量转换-无变量链接#  未添加此变量~~\n\n${jcode}`;
            sendText(content);
            push({
                imType:"tg",//发送到指定渠道,如qq,wx,必须有
                userID:"",//groupCode不为0时为@指定用户,可选
                groupCode:"-834608129",//可选
                content:`${content}`,//发送消息
            });
        }

    }
    jcode2 = jcode2.replace(/\n/g, '');     //去掉换行，防止有些人或频道瞎搞变量

    if (jcode.indexOf("export") != -1) {                                                                                            //变量转换

        if (jcode.indexOf("#变量转换#") != -1) {                                                                                            //"#写轮眼#"检测到是自己生成变量时，跳出。防无限循环。不要在此发送消息
            return;
        }


        //变量转换
        if(jcode.indexOf("export SHARE_ACTIVITY_ID=") != -1 && jcode.indexOf("export jd_wxShareActivity_activityId=") == -1) {                //量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export SHARE_ACTIVITY_ID\=\"[^\"]*)\"?.*/g,"$1\"");                                          //获取完整变量
            ex = "#写轮眼# 分享有礼(环境保护)\n" + ex.replace(/SHARE_ACTIVITY_ID/g,"jd_wxShareActivity_activityId");                                                             //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                           //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
         }else if(jcode.indexOf("export jd_fxyl_activityId=") != -1 && jcode.indexOf("export jd_wxShareActivity_activityId=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_fxyl_activityId\=\"[^\"]*)\"?.*/g,"$1\"");                                          //获取完整变量
            ex = "#写轮眼# 分享有礼(环境保护)\n" + ex.replace(/jd_fxyl_activityId/g,"jd_wxShareActivity_activityId");                                                             //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                         //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
         }else if(jcode.indexOf("export M_WX_ADD_CART_URL=") != -1 && jcode.indexOf("export jd_wxCollectionActivity_activityUrl=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export M_WX_ADD_CART_URL\=\"[^\"]*)\"?.*/g,"$1\"");                                          //获取完整变量
            ex = "#写轮眼# 加购有礼(KR)\n" + ex.replace(/M_WX_ADD_CART_URL/g,"jd_wxCollectionActivity_activityUrl");                                                             //替换变量名称
            sendText(ex);
            breakIn(ex);
            sleep(2000);                                                                                                                //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
         }else if(jcode.indexOf("export jd_txzj_activityUrl=") != -1 && jcode.indexOf("export jd_cart_item_activityUrl=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_txzj_activityUrl\=\"[^\"]*)\"?.*/g,"$1\"");                                          //获取完整变量
            ex = "#写轮眼# 加购有礼(KR)\n" + ex.replace(/jd_txzj_activityUrl/g,"jd_cart_item_activityUrl");                                                             //替换变量名称
            sendText(ex);
            breakIn(ex);
            sleep(2000);                                                                                                                //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;

         }if(jcode.indexOf("export M_WX_LUCK_DRAW_URL=") != -1 && jcode.indexOf("export LUCK_DRAW_URL=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export M_WX_LUCK_DRAW_URL\=\"[^\"]*)\"?.*/g,"$1\"");                                          //获取完整变量
            ex = "#写轮眼# 幸运抽奖(KR)\n" + ex.replace(/M_WX_LUCK_DRAW_URL/g,"LUCK_DRAW_URL");                                                             //替换变量名称
            sendText(ex);
            breakIn(ex);   
            sleep(2000);                                                                                                          //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
         }else if(jcode.indexOf("export jd_lotteryId=") != -1 && jcode.indexOf("export JD_Lottery=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_lotteryId\=\"[^\"]*)\"?.*/g,"$1\"");                                                 //获取完整变量
            ex = "#写轮眼# joy抽奖机通用(环境保护)\n" + ex.replace(/jd_lotteryId/g,"JD_Lottery");                                                             //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
         }else if(jcode.indexOf("export jd_lotteryId=") != -1 && jcode.indexOf("export JD_Lottery=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_lotteryId\=\"[^\"]*)\"?.*/g,"$1\"");                                                 //获取完整变量
            ex = "#写轮眼# joy抽奖机通用(环境保护)\n" + ex.replace(/jd_lotteryId/g,"JD_Lottery");                                                             //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                           //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export WXGAME_ACT_ID=") != -1 && jcode.indexOf("export jd_wxgame_activityId=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_wxgame_activityId\=\"[^\"]*)\"?.*/g,"$1\"");                                                  //获取完整变量
            ex = "#写轮眼# LZ店铺通用游戏任务(kr)\n" + ex.replace(/WXGAME_ACT_ID/g,"jd_wxgame_activityId");                                                             //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export jd_wdzfd_activityId=") != -1 && jcode.indexOf("export jd_wdz_openLuckBag_activityId=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_wdzfd_activityId\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# 微定制-开福袋(环境保护)\n" + ex.replace(/jd_wdzfd_activityId/g,"jd_wdz_openLuckBag_activityId");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                             //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export jd_wxShopGiftId=") != -1 && jcode.indexOf("export jd_lzkj_wxShopGift_ids=") == -1) {                //
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_wxShopGiftId\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# lzkj店铺礼包(环境保护)\n" + ex.replace(/jd_wxShopGiftId/g,"jd_lzkj_wxShopGift_ids");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export PKC_TXGZYL=") != -1 && jcode.indexOf("export jd_lzkj_wxShopGift_ids=") == -1) {                //特效关注有礼
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export PKC_TXGZYL\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# lzkj店铺礼包(环境保护)\n" + ex.replace(/PKC_TXGZYL/g,"jd_lzkj_wxShopGift_ids");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export yhyauthorCode=") != -1 && jcode.indexOf("export jd_inv_authorCode=") == -1) {                //邀好友赢大礼
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export yhyauthorCode\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# 邀好友赢大礼(船长)\n" + ex.replace(/yhyauthorCode/g,"jd_inv_authorCode");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export prodev_code=") != -1 && jcode.indexOf("export jd_inv_authorCode=") == -1) {                //邀好友赢大礼
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export prodev_code\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# 邀好友赢大礼(船长)\n" + ex.replace(/prodev_code/g,"jd_inv_authorCode");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export jd_cjhy_completeInfoActivity_Ids=") != -1 && jcode.indexOf("export jd_wxCompleteInfoId=") == -1) {                //
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_cjhy_completeInfoActivity_Ids\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# 完善信息(船长)\n" + ex.replace(/jd_cjhy_completeInfoActivity_Ids/g,"jd_wxCompleteInfoId");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export jd_wxMcLevelAndBirthGifts_activityId=") != -1 && jcode.indexOf("export jd_wxBirthGiftsId=") == -1) {                //完善信息
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_wxMcLevelAndBirthGifts_activityId\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼#  生日礼包(船长)\n" + ex.replace(/jd_wxMcLevelAndBirthGifts_activityId/g,"jd_wxBirthGiftsId");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export jd_cjhy_wxMcLevelAndBirthGifts_ids=") != -1 && jcode.indexOf("export jd_wxBirthGiftsId=") == -1) {                //完善信息
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_wxBirthGiftsId\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼#  生日礼包(船长)2\n" + ex.replace(/jd_cjhy_wxMcLevelAndBirthGifts_ids/g,"jd_wxBirthGiftsId");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export jd_cjwxKnowledgeActivity_activityId=") != -1 && jcode.indexOf("export jd_cjhy_wxKnowledgeActivity_activityId=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_cjwxKnowledgeActivity_activityId\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# cjhy知识超人(环境保护)\n" + ex.replace(/jd_cjwxKnowledgeActivity_activityId/g,"jd_cjhy_wxKnowledgeActivity_activityId");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export jd_wxKnowledgeActivity_activityId=") != -1 && jcode.indexOf("export jd_lzkj_wxKnowledgeActivity_activityId=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_wxKnowledgeActivity_activityId\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# lzkj知识超人(环境保护)\n" + ex.replace(/jd_wxKnowledgeActivity_activityId/g,"jd_lzkj_wxKnowledgeActivity_activityId");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export jd_wxShopFollowActivity_activityId=") != -1 && jcode.indexOf("export jd_lzkj_wxShopFollowActivity_activityId=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_wxShopFollowActivity_activityId\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# lzkj关注店铺有礼(环境保护)\n" + ex.replace(/jd_wxShopFollowActivity_activityId/g,"jd_lzkj_wxShopFollowActivity_activityId");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("export jd_wxBuildActivity_activityId=") != -1 && jcode.indexOf("export jd_lzkj_wxBuildActivity_activityId=") == -1) {                //变量名称转换
            ex = jcode.replace(/\n/g, '');                                                                                          //去除换行，否则下面提取变量会出错(其实也可以用下面幸运抽奖的方法匹配变量值 =param(1)的方法更简洁)
            ex = ex.replace(/.*(export jd_wxBuildActivity_activityId\=\"[^\"]*)\"?.*/g,"$1\"");                                               //获取完整变量
            ex = "#写轮眼# lzkj盖楼有礼(环境保护)\n" + ex.replace(/jd_wxBuildActivity_activityId/g,"jd_lzkj_wxBuildActivity_activityId");                                                //替换变量名称
            sendText(ex);
            breakIn(ex);                                                                                                            //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
            return;
        }else if(jcode.indexOf("M_WX_LUCK_DRAW_URL=") != -1){
            ex=jcode2.replace(/.*export M_WX_LUCK_DRAW_URL\=\"([^\"]*)\"?.*/g,"$1");                                                //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxDrawActivity_Id=") == -1){
				ex="#写轮眼# lzkj幸运抽奖(环境保护)\n" + "export jd_lzkj_wxDrawActivity_Id=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}else if(ex.indexOf("cjhy") != -1 && jcode.indexOf("export jd_cjhy_wxDrawActivity_Id=") == -1){
				ex="#写轮眼# cjhy幸运抽奖(环境保护)\n" + "export jd_cjhy_wxDrawActivity_Id=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        }else if(jcode.indexOf("LUCK_DRAW_URL=") != -1){
            ex=jcode2.replace(/.*export LUCK_DRAW_URL\=\"([^\"]*)\"?.*/g,"$1");                                                //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxDrawActivity_Id=") == -1){
				ex="#写轮眼# lzkj幸运抽奖(环境保护)\n" + "export jd_lzkj_wxDrawActivity_Id=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}else if(ex.indexOf("cjhy") != -1 && jcode.indexOf("export jd_cjhy_wxDrawActivity_Id=") == -1){
				ex="#写轮眼# cjhy幸运抽奖(环境保护)\n" + "export jd_cjhy_wxDrawActivity_Id=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        } else if (jcode.indexOf("M_WX_ADD_CART_URL=") != -1) {
            ex = jcode2.replace(/.*export M_WX_ADD_CART_URL\=\"([^\"]*)\"?.*/g, "$1");                                                //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
            activityId = ex.replace(/.*activityId\=([^\&]*)\&?.*/g, "$1");
            if (ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxCollectionActivityId=") == -1) {
                ex = "#写轮眼# lzkj加购抽奖\n" + "export jd_lzkj_wxCollectionActivityId=\"" + activityId + "\"";
                sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
            } else if (ex.indexOf("cjhy") != -1 && jcode.indexOf("export jd_cjhy_wxCollectionActivityId=") == -1) {
                ex = "#写轮眼# cjhy加购抽奖\n" + "export jd_cjhy_wxCollectionActivityId=\"" + activityId + "\"";
                sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
            }
            return;
        } else if (jcode.indexOf("jd_wxCollectionActivity_activityUrl=") != -1) {
            ex = jcode2.replace(/.*export jd_wxCollectionActivity_activityUrl\=\"([^\"]*)\"?.*/g, "$1");                              //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
            activityId = ex.replace(/.*activityId\=([^\&]*)\&?.*/g, "$1");
            if (ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxCollectionActivityId=") == -1) {
                ex = "#写轮眼# lzkj加购抽奖\n" + "export jd_lzkj_wxCollectionActivityId=\"" + activityId + "\"";
                sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
            } else if (ex.indexOf("cjhy") != -1 && jcode.indexOf("export jd_cjhy_wxCollectionActivityId=") == -1) {
                ex = "#写轮眼# cjhy加购抽奖\n" + "export jd_cjhy_wxCollectionActivityId=\"" + activityId + "\"";
                sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
            }
            return;
        } else if (jcode.indexOf("jd_wxCollectionActivityUrl=") != -1) {
            ex = jcode2.replace(/.*export jd_wxCollectionActivityUrl\=\"([^\"]*)\"?.*/g, "$1");                              //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
            activityId = ex.replace(/.*activityId\=([^\&]*)\&?.*/g, "$1");
            if (ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxCollectionActivityId=") == -1) {
                ex = "#写轮眼# lzkj加购抽奖\n" + "export jd_lzkj_wxCollectionActivityId=\"" + activityId + "\"";
                sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
            } else if (ex.indexOf("cjhy") != -1 && jcode.indexOf("export jd_cjhy_wxCollectionActivityId=") == -1) {
                ex = "#写轮眼# cjhy加购抽奖\n" + "export jd_cjhy_wxCollectionActivityId=\"" + activityId + "\"";
                sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
            }
            return;
        }else if(jcode.indexOf("M_WX_FANS_DRAW_URL=") != -1){
            ex=jcode2.replace(/.*export M_WX_FANS_DRAW_URL\=\"([^\"]*)\"?.*/g,"$1");                                                //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_wxFansInterActionActivity_activityId=") == -1){
				ex="#写轮眼#粉丝互动(环境保护)\n" + "export jd_wxFansInterActionActivity_activityId=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        }else if(jcode.indexOf("wxCartKoi_activityUrl=") != -1){
            ex=jcode2.replace(/.*export wxCartKoi_activityUrl\=\"([^\"]*)\"?.*/g,"$1");                                                //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_wxCartKoi_activityId=") == -1){
				ex="#写轮眼#购物车锦鲤(环境保护)\n" + "export jd_wxCartKoi_activityId=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);       
                sleep(2000);                                                                                                     //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        }else if(jcode.indexOf("M_WX_SECOND_DRAW_URL=") != -1){
            ex=jcode2.replace(/.*export M_WX_SECOND_DRAW_URL\=\"([^\"]*)\"?.*/g,"$1");                                                //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_wxSecond_activityId=") == -1){
				ex="#写轮眼#秒拼手速(环境保护)\n" + "export jd_wxSecond_activityId=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        }else if(jcode.indexOf("M_WX_FOLLOW_DRAW_URL=") != -1){
            ex=jcode2.replace(/.*export M_WX_FOLLOW_DRAW_URL\=\"([^\"]*)\"?.*/g,"$1");                                                //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxShopFollowActivity_activityId=") == -1){
				ex="#写轮眼# lzkj关注店铺有礼(环境保护)\n" + "export jd_lzkj_wxShopFollowActivity_activityId=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}else if(ex.indexOf("cjhy") != -1 && jcode.indexOf("export jd_cjhy_wxShopFollowActivity_activityId=") == -1){
				ex="#写轮眼# cjhy关注店铺有礼(环境保护)\n" + "export jd_cjhy_wxShopFollowActivity_activityId=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        }else if(jcode.indexOf("jd_wxShopFollowActivity_activityUrl=") != -1){
            ex=jcode2.replace(/.*export jd_wxShopFollowActivity_activityUrl\=\"([^\"]*)\"?.*/g,"$1");                              //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxShopFollowActivity_activityId=") == -1){
				ex="#写轮眼# lzk关注店铺有礼(环境保护)\n" + "export jd_lzkj_wxShopFollowActivity_activityId=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}else if(ex.indexOf("cjhy") != -1 && jcode.indexOf("export jd_cjhy_wxShopFollowActivity_activityId=") == -1){
				ex="#写轮眼# cjhy关注店铺有礼(环境保护)\n" + "export jd_cjhy_wxShopFollowActivity_activityId=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        }else if(jcode.indexOf("M_WX_BUILD_DRAW_URL=") != -1){
            ex=jcode2.replace(/.*export M_WX_BUILD_DRAW_URL\=\"([^\"]*)\"?.*/g,"$1");                              //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxBuildActivity_activityId=") == -1){
				ex="#写轮眼# lzjk盖楼有礼(环境保护)\n" + "export jd_lzkj_wxBuildActivity_activityId=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        }else if(jcode.indexOf("M_WX_SHOP_GIFT_URL=") != -1){
            ex=jcode2.replace(/.*export M_WX_SHOP_GIFT_URL\=\"([^\"]*)\"?.*/g,"$1");                              //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxShopGift_ids=") == -1){
				ex="#写轮眼# lzkj店铺礼包(环境保护)\n" + "export jd_lzkj_wxShopGift_ids=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}else if(ex.indexOf("cjhy") != -1 && jcode.indexOf("export jd_cjhy_wxShopGift_ids=") == -1){
				ex="#写轮眼# cjhy店铺礼包(环境保护)\n" + "export jd_cjhy_wxShopGift_ids=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        }else if(jcode.indexOf("jd_wxShopGift_activityUrl=") != -1){
            ex=jcode2.replace(/.*export jd_wxShopGift_activityUrl\=\"([^\"]*)\"?.*/g,"$1");                              //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkj") != -1 && jcode.indexOf("export jd_lzkj_wxShopGift_ids=") == -1){
				ex="#写轮眼# lzkj店铺礼包(环境保护)\n" + "export jd_lzkj_wxShopGift_ids=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}else if(ex.indexOf("cjhy") != -1 && jcode.indexOf("export jd_cjhy_wxShopGift_ids=") == -1){
				ex="#写轮眼# cjhy店铺礼包(环境保护)\n" + "export jd_cjhy_wxShopGift_ids=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
        }else if(jcode.indexOf("M_WX_COLLECT_CARD_URL=") != -1){
            ex=jcode2.replace(/.*export M_WX_COLLECT_CARD_URL\=\"([^\"]*)\"?.*/g,"$1");                              //获取原变量内的url地址，注意是jcode2=param(1),也可以用上面分享在礼的方法
			activityId=ex.replace(/.*activityId\=([^\&]*)\&?.*/g,"$1");
			if(ex.indexOf("lzkjdz") != -1 && jcode.indexOf("export jd_wxCollectCard_activityId=") == -1){
				ex="#写轮眼# 集卡抽奖(环境保护)\n" + "export jd_wxCollectCard_activityId=\"" + activityId + "\"";
				sendText(ex);
                breakIn(ex);                                                                                                        //没它的话，傻妞监控不到-_-，流下了没技术的眼泪
                return;
			}
            return;
            }
            return;
        } else {
            return;
        }
        return;   //未匹配到需要转换的变量时，直接跳出。不要在此发送消息
    }

// 链接解析
function parse_url(link){
    for (let i=0;i<config.length;i++){
        if (link.indexOf(config[i]["url"])!==-1){
            return i;
        }
    }
}

(function run(){
    main();
})()
