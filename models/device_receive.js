
var  device_location = require('../models/mysqlHandle');

var dev_location ={};

dev_location.showIndex =function (req,res,next) {
    res.render('device', { title: 'Device' });
}


dev_location.locationHandle=function (req,res,next) {

    var data = req.body;
    var device_data = JSON.stringify(data);
    // console.log(data);
    var substr = device_data.match(/&(\S*)#/)[1];

    var gps_data = substr.split(',');
    //console.log(fin_data);
    logger.info("收到原始数据为----"+ gps_data )
    //定位类型 1为GPS 0为基站
    logger.info("定位方式： "+ gps_data[0]+" 终端IMEI："+gps_data[1]+" 定位时间："+gps_data[2]+" 纬度："+gps_data[3]+
        " 经度："+gps_data[4]+" 速度："+gps_data[5]+" 方向："+gps_data[6]+" 卫星数量："+gps_data[7]+" 里程："+gps_data[8]
        +" gps有效状态："+gps_data[9]);

    //将收到的数据存入数据库
    device_location.savedata(gps_data,function(err,data){
        if(err) {
            console.log(err);
            return;
        }else{
            console.log(data);
        }
    });
    //logger.info(data);
    res.end(device_data);
}

module.exports= dev_location;
