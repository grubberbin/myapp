
var Device={
    b_guid:"",pcode:"",b_date:"",b_class:"",b_dep:"",b_bcode:"",icode:"",asign:"",organid:""
    ,init:function (b_guid,pcode,b_date,b_class,b_dep,b_bcode,icode,asign,organid ) {
        this.b_guid=b_guid;
        this.pcode=pcode;
        this.b_date=b_date;
        this.b_dep=b_dep;
        this.b_class=b_class;
        this.b_bcode=b_bcode;
        this.icode=icode;
        this.asign=asign;
        this.organid=organid;
    }
}
Device.MapTable={
    tablename:"device",primarykey:"b_guid"
};

module.exports=Device;