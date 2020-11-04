	var dataLst = [];
	var componentchart = null;
    var getComonentValue = function() {
        if ($('#kt_chart_revenue_change').length == 0) {
            return;
        }else{
        	$('#kt_chart_revenue_change').empty();
        	$('#kt_chart_revenue_change svg').remove();
        }
        
        var identity = "packet";
	   $.ajax({
	         contentType: "application/json; charset=utf-8",
	         type:"post",
	         url:"testcomponent",
	         data:identity,
	         success:function(data){
	        	  //console.log(data);
	              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
				 dataLst = data;
	        	 ShowComponent();

	         },
	         error:function(e){
	               alert("error!!!");
	         },
	   }
	   )

	   setTimeout('getComonentValue()',5000);
	}
	
    var ShowComponent = function() {
    //if(!componentchart){
    //    componentchart = new Morris.Donut({
                Morris.Donut({
	            element: 'kt_chart_revenue_change',
	            data: [{
	                    label: dataLst[0].name,
	                    value: dataLst[0].value
	                },
	                {
	                    label: dataLst[1].name,
	                    value: dataLst[1].value
	                },
	                {
	                    label: dataLst[2].name,
	                    value: dataLst[2].value
	                }
	            ],
	            colors: [
	                KTApp.getStateColor('success'),
	                KTApp.getStateColor('danger'),
	                KTApp.getStateColor('brand')
	            ],
	        });
        //}else{
        //	componentchart.data[0].value = dataLst[0].value;
        //	componentchart.data[1].value = dataLst[1].value;
        //	componentchart.data[2].value = dataLst[2].value;
       // 	componentchart.update();
       // }
       //}
    }
    
         // Class initialization on page load
    jQuery(document).ready(function() {
    	//revenueChange();
    	setTimeout('getComonentValue()',1000);
    });