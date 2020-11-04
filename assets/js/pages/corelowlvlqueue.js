    // Bandwidth Charts 2.
    // Based on Chartjs plugin - http://www.chartjs.org/
	var lowchart = null;
	var lowlabellst=[0];
	var lowdatalst=[0];
	var coreLowFunc = function() {
		
	    var identity = "packet";
		   $.ajax({
		         contentType: "application/json; charset=utf-8",
		         type:"post",
		         url:"http:///192.168.1.199:8900/core/lowlevel",
		         contentType: "jsonp",
		         data:"",
		         success:function(data){
		        	  console.log("core="+data);
		              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
					 //dataLst = data;
					 //console.log("dataLst:"+dataLst);
		        	  ShowLowChart(data);

		         },
		         error:function(e){
		               console.log("lowlevel error!!!"+e.status);
		         },
		   }
		   )
		   setTimeout('coreLowFunc()',2000);
		}
	
	
    var ShowLowChart = function(recvdata) {
    	var siz = recvdata.length;
    	var tim = recvdata.time;    	
    	var count = recvdata.count;
		console.log("siz="+siz);
		console.log("tim="+tim);
		lowdatalst.push(siz);
		lowlabellst.push(tim);
		

		if(lowdatalst.length>10){
			lowdatalst.shift();
		}
		if(lowlabellst.length>10){
			lowlabellst.shift();
		}
				
		
		$('#low_lvl_count').text(count);
		
		console.log("datalst = "+lowdatalst);
		console.log("labellst = "+lowlabellst);

    	if ($('#low_lvl_history_msg_canvas').length == 0) {
            return ;
        }
        
        if(!lowchart){
        
        	//console.log("ShowChart init ");
	        var ctx = document.getElementById("low_lvl_history_msg_canvas").getContext("2d");
	
	        var gradient = ctx.createLinearGradient(0, 0, 0, 240);
	        gradient.addColorStop(0, Chart.helpers.color('#ffefce').alpha(1).rgbString());
	        gradient.addColorStop(1, Chart.helpers.color('#ffd1ce').alpha(0.3).rgbString());
	
	        var config = {
	            type: 'line',
	            data: {
	                labels: lowlabellst,
	                datasets: [{
	                    label: "低等级消息队列",
	                    backgroundColor: gradient,
	                    borderColor: KTApp.getStateColor('info'),
	                    pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointHoverBackgroundColor: KTApp.getStateColor('danger'),
	                    pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
	
	                    //fill: 'start',
	                    data: lowdatalst//[
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
	                            display: true,
	                            labelString: 'Time'
	                        }
	                    }],
	                    yAxes: [{
	                        display: false,
	                        gridLines: false,
	                        scaleLabel: {
	                            display: true,
	                            labelString: 'Value'
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
	
	        lowchart = new Chart(ctx, config);
	        //return chart;
        }else{
        	console.log("refreshlowchart update start");
        	lowchart.data.datasets[0].data = lowdatalst;
        	lowchart.data.labels = lowlabellst;
        	lowchart.update();
        	console.log("refreshlowchart update");
        	//return chart;
        }
        
    }
    
    jQuery(document).ready(function() {
    	//dailySales();
    	setTimeout('coreLowFunc()',1000);
    });