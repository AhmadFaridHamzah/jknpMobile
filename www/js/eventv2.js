$(document).on("pageshow","#pagesolat",function(){
	if(MyWaktuSolat.checkSource() == "local"){
		if(!MyWaktuSolat.getDisplayStatus()){
			console.log("local");
			var waktuSolatLocal = MyWaktuSolat.getLocal();
			MyWaktuSolat.displayWaktuSolat(waktuSolatLocal);
		}else{
			console.log("no update");
		}
	}else{
		console.log("online")
		MyWaktuSolat.setWaktuSolat();
	}
});

var MyWaktuSolat = {
	checkSource: function(){
		var date = new Date();
		var month = (date.getMonth() + 1) < 10?"0"+(date.getMonth() + 1):(date.getMonth() + 1);
		var today = date.getDate() + '-' + month + '-' +  date.getFullYear();

		var waktuSolatLocal = MyWaktuSolat.getLocal();

		console.log("Today:"+today);

		if(waktuSolatLocal != ""){
			if(waktuSolatLocal.start!=today){
				return "online";
			}else{
				return "local";
			}
		}else
			return "online";
	},
	setWaktuSolat: function(){
		$this = this;
		$.ajax({
	       url:'http://api.kayrules.com/solatjakim/times/today.json',
	       dataType:"json",
	       data:{"zone":"PLS01","format":"12-hour"},
	       type:"GET",
	       //contentType:'application/json',
	       success:function(data){
	         console.log(data);
	       	$this.displayWaktuSolat(data);
	       	$this.setLocal(data);

	       },
	       error:function(err){
	       	console.log(err);
	       },

	   });
	},
	displayWaktuSolat: function(data){
		$.each(data.prayer_times,function(i,item){
             $("#"+i).html(item);
             $("#waktusolat").append("<tr><td>"+i+" </td><td>"+item+"</td></tr>");
          });

		this.bDisplay = 1;
	},
	getLocal: function(){
		if (typeof(Storage) !== "undefined") {
		    var data = localStorage.getItem("waktuSolat");
		    if(data != null)
		    	return $.parseJSON(data);
		    else
		    	return "";
		} else {
		    return "";
		}
	},
	setLocal: function(data){
		if (typeof(Storage) !== "undefined") {
			var data = JSON.stringify(data)
			localStorage.setItem("waktuSolat", data);
		    return 1;
		} else {
		    return 0;
		}
	},
	getDisplayStatus:function(){
		if(typeof this.bDisplay !== "undefined")
			return this.bDisplay;
		else
			return 0;
	}
}