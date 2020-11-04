			var barname=[];
			var bardata=[];
			var barmaxdata=[];
			var barchart = null;
			function barrefresh() 
			{ 
					var identity = "packet";
				   $.ajax({
				         contentType: "application/json; charset=utf-8",
				         type:"post",
				         url:"PacketPerHour",
				         data:identity,
				         success:function(data){
				        	  //console.log(data);
				              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
				        	 barname = data.namelst;
				        	 console.log("barname="+barname);
				        	 bardata = data.valuelst;
				        	 console.log("bardata="+bardata);
							 barmaxdata = data.maxvaluelst;
				        	 console.log("bardata="+bardata);
				        	 dailySales();

				         },
				         error:function(e){
				               alert("error!!!");
				         },
				   }
				   )

				setTimeout('barrefresh()',5000);
			} 
    var dailySales = function() {
        var chartContainer = KTUtil.getByID('kt_chart_daily_sales');

        if (!chartContainer) {
            return;
        }
        if(!barchart){
        	console.log("barchart init");
        var chartData = {
            labels: barname,//["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "Label 6", "Label 7", "Label 8", "Label 9", "Label 10", "Label 11", "Label 12", "Label 13", "Label 14", "Label 15", "Label 16"],
            datasets: [{
                //label: 'Dataset 1',
                backgroundColor: KTApp.getStateColor('success'),
                data: bardata//[
                    //15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20, 15, 10, 15, 20
                //]
            }, {
                //label: 'Dataset 2',
                backgroundColor: '#f3f3fb',
                data: barmaxdata//[
                    //15, 20, 25, 30, 25, 20, 15, 20, 25, 30, 25, 20, 15, 10, 15, 20
                //]
            }]
        };

        var config = {
            type: 'bar',
            data: chartData,
            options: {
                title: {
                    display: false,
                },
                tooltips: {
                    intersect: false,
                    mode: 'nearest',
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10
                },
                legend: {
                    display: false
                },
                responsive: true,
                maintainAspectRatio: false,
                barRadius: 4,
                scales: {
                    xAxes: [{
                        display: false,
                        gridLines: false,
                        stacked: true
                    }],
                    yAxes: [{
                        display: false,
                        stacked: true,
                        gridLines: false
                    }]
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                }
            }
        };

        	barchart = new Chart(chartContainer,config);
        }else{
            console.log("barchart update");
        	barchart.data.datasets[0].data = bardata;
        	barchart.data.datasets[1].data = barmaxdata;
        	barchart.update({
			    duration: 800
			});
        }
    }
     // Class initialization on page load
    jQuery(document).ready(function() {
    	//dailySales();
    	setTimeout('barrefresh()',1000);
    });