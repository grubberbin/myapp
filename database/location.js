
var Location={
    imei:"",gps:"",lat:"",lng:"",loc_time:"",time:""
    ,init:function (imei,gps,lat,lng,loc_time,time ) {
        this.imei=imei;
        this.gps=gps;
        this.lat=lat;
        this.lng=lng;
        this.loc_time=loc_time;
        this.time=time;
    }
}

Location.MapTable={
    tablename:"tb_gps_loc",primarykey:"id"
};

module.exports=Location;