    // Bandwidth Charts 2.
    // Based on Chartjs plugin - http://www.chartjs.org/
	var chartorder = null;
	var orderlabellst=[0];
	var orderdatalst=[0];
	var refreshorderchart = function() {
		
	    var identity = "packet";
		   $.ajax({
		         contentType: "application/json; charset=utf-8",
		         type:"post",
		         url:"ordersize",
		         data:identity,
		         success:function(data){
		        	  //console.log(data);
		              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
					 //dataLst = data;
					 //console.log("dataLst:"+dataLst);
		        	 ShoworderChart(data);

		         },
		         error:function(e){
		               alert("error!!!");
		         },
		   }
		   )
		   setTimeout('refreshorderchart()',2000);
		}
	
	
    var ShoworderChart = function(recvdata) {
        //console.log("ShoworderChart data="+data);
    	if ($('#kt_chart_bandwidth2').length == 0) {
            return ;
        }
    	
    	var siz = recvdata.size;
    	var tim = recvdata.time;
    	var ordr = recvdata.ordercount;
    	$('#order_complete_number').text(ordr);
    	
		console.log("siz="+siz);
		console.log("tim="+tim);
    	orderdatalst.push(siz);
		orderlabellst.push(tim);
		

		if(orderdatalst.length>10){
			orderdatalst.shift();
		}
		if(orderlabellst.length>10){
			orderlabellst.shift();
		}
		
		console.log("order datalst = "+orderdatalst);
		console.log("orfer labellst = "+orderlabellst);
        
        if(!chartorder){
        
        	console.log("ShoworderChart init");
	        var ctx = document.getElementById("kt_chart_bandwidth2").getContext("2d");
	
	        var gradient = ctx.createLinearGradient(0, 0, 0, 240);
	        gradient.addColorStop(0, Chart.helpers.color('#ffefce').alpha(1).rgbString());
	        gradient.addColorStop(1, Chart.helpers.color('#ffd1ce').alpha(0.3).rgbString());
	
	        var config = {
	            type: 'line',
	            data: {
	                labels: orderlabellst,
	                datasets: [{
	                    label: "下行命令队列",
	                    backgroundColor: gradient,
	                    borderColor: KTApp.getStateColor('warning'),
	                    pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointHoverBackgroundColor: KTApp.getStateColor('danger'),
	                    pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
	
	                    //fill: 'start',
	                    data: orderdatalst//[
	                        //10, 14, 12, 16, 9, 11, 13, 9, 13, 15
	                    //]
	                }]
	            },
	            options: {
	                title: {
	                    display: false,
	                },
	                tooltips: {
	                    mode: 'nearest',
	                    intersect: false,
	                    position: 'nearest',
	                    xPadding: 10,
	                    yPadding: 10,
	                    caretPadding: 10
	                },
	                legend: {
	                    display: false
	                },
	                responsive: true,
	                maintainAspectRatio: false,
	                scales: {
	                    xAxes: [{
	                        display: false,
	                        gridLines: false,
	                        scaleLabel: {
	                            display: false,
	                            labelString: 'time'
	                        }
	                    }],
	                    yAxes: [{
	                        display: false,
	                        gridLines: false,
	                        scaleLabel: {
	                            display: false,
	                            labelString: 'count'
	                        },
	                        ticks: {
	                            beginAtZero: true
	                        }
	                    }]
	                },
	                elements: {
	                    line: {
	                        tension: 0.0000001
	                    },
	                    point: {
	                        radius: 4,
	                        borderWidth: 12
	                    }
	                },
	                layout: {
	                    padding: {
	                        left: 0,
	                        right: 0,
	                        top: 10,
	                        bottom: 0
	                    }
	                }
	            }
	        };
	
	        chartorder = new Chart(ctx, config);
	        //return chart;
        }else{
        	chartorder.data.datasets[0].data = orderdatalst;
        	chartorder.data.labels = orderlabellst;
        	chartorder.update();
        	console.log("refreshorderchart update");
        	//return chart;
        }
        
    }
    
    jQuery(document).ready(function() {
    	//dailySales();
    	setTimeout('refreshorderchart()',1000);
    });