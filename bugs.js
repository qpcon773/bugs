const request = require("request");
const async = require("async");
const cheerio = require("cheerio");

// const url = ["https://ithelp.ithome.com.tw/users/20107159/ironman/1325"];
const url = ["https://fhy.wra.gov.tw/ReservoirPage_2011/StorageCapacity.aspx"];

async.map(url, getInfo, (err, results) => {
    console.log(results[0]);
});

function getInfo(url, callback) {
    request(url, function (err, res, body) {
        let $ = cheerio.load(body);
        let title = $("title").text().trim()
        let reservoirData = []
        let reservoir = $(".list").find("tr").map((e,i,o)=>{
            if(e != 0 && e != 1 && e != $(".list").find("tr").length - 1){
                reservoirData[e] = {
                    reservoirName : "水庫名稱：" + $(i).find("td").eq(0).text(),
                    reservoirCapacity : "有效容量：" + $(i).find("td").eq(1).text(),
                    reservoirTime : "最後更新：" + $(i).find("td").eq(7).text(),
                    reservoirPercenter : "蓄水量：" + $(i).find("td").eq(10).text(),
                }
            }
            if(e == $(".list").find("tr").length - 1) return reservoirData
        })

        callback(null, {
            title,
            reservoirData,
        });
    });
}

// function getInfo(url, callback) {
//     request(url, function (err, res, body) {
//         var $ = cheerio.load(body);
//         var link = url;
//         var name = $(".profile-header__name").text().trim();
//         var title = $(".qa-list__title--ironman")
//             .text()
//             .trim()
//             .replace(" 系列", "");
//         var joinDays = $(".qa-list__info--ironman span")
//             .eq(0)
//             .text()
//             .replace(/[^0-9]/g, "");
//         var posts = $(".qa-list__info--ironman span")
//             .eq(1)
//             .text()
//             .replace(/[^0-9]/g, "");
//         var subscriber = $(".qa-list__info--ironman span")
//             .eq(2)
//             .text()
//             .replace(/[^0-9]/g, "");
//         var postList = $(".qa-list")
//             .map((index, obj) => {
//                 return {
//                     title: $(obj).find(".qa-list__title").text().trim(),
//                     like: $(obj).find(".qa-condition__count").eq(0).text().trim(),
//                     comment: $(obj).find(".qa-condition__count").eq(1).text().trim(),
//                     view: $(obj).find(".qa-condition__count").eq(2).text().trim(),
//                     date: $(obj).find(".qa-list__info-time").text().trim(),
//                     url: $(obj).find(".qa-list__title a").attr("href").trim(),
//                 };
//             }).get();
//         let allView = $(".profile-header__view-num").text();

//         callback(null, {
//             name,
//             title,
//             link,
//             joinDays,
//             posts,
//             subscriber,
//             postList,
//             allView
//         });
//     });
// }
