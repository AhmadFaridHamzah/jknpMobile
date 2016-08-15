$(document).on("pagecreate","#pagesolat",function(){

   $.ajax({
       url:'http://api.kayrules.com/solatjakim/times/today.json',
       dataType:"json",
       data:{"zone":"PLS01","format":"12-hour"},
       type:"GET",
       //contentType:'application/json',
       success:function(data){
         console.log(data.prayer_times.isyak);

         var isyak=data.prayer_times.isyak;



          $.each(data.prayer_times,function(i,item){

             // console.log(item);

             $("#"+i).html(item);

             $("#waktusolat").append("<tr><td>"+i+" </td><td>"+item+"</td></tr>");




          });




       },
       error:function(err){
       	console.log(err);
       },

   });

});