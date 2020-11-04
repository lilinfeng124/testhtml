    // Bandwidth Charts 2.
    // Based on Chartjs plugin - http://www.chartjs.org/
	var chart = null;
	var msglabellst=[0];
	var msgdatalst=[0];
	var coreMsgFunc = function() {
		
	    var identity = "packet";
		   $.ajax({
		         contentType: "application/json; charset=utf-8",
		         type:"post",
		         url:"http:///192.168.1.199:8900/core/msgqueue",
		         contentType: "jsonp",
		         data:"",
		         success:function(data){
		        	  console.log("core="+data);
		              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
					 //dataLst = data;
					 //console.log("dataLst:"+dataLst);
		        	  ShowMsgChart(data);

		         },
		         error:function(e){
		               console.log("core msgqueue error!!!"+e.message);
		         },
		   }
		   )
		   setTimeout('coreMsgFunc()',2000);
		}
	
	
    var ShowMsgChart = function(recvdata) {
    	var siz = recvdata.length;
    	var tim = recvdata.time;    	
    	var count = recvdata.count;
		console.log("siz="+siz);
		console.log("tim="+tim);
    	msgdatalst.push(siz);
		msglabellst.push(tim);
		

		if(msgdatalst.length>10){
			msgdatalst.shift();
		}
		if(msglabellst.length>10){
			msglabellst.shift();
		}
				
		
		$('#mqtt_history_msg_count').text(count);
		
		console.log("datalst = "+msgdatalst);
		console.log("labellst = "+msglabellst);

    	if ($('#mqtt_history_msg_canvas').length == 0) {
            return ;
        }
        
        if(!chart){
        
        	//console.log("ShowChart init ");
	        var ctx = document.getElementById("mqtt_history_msg_canvas").getContext("2d");
	
	        var gradient = ctx.createLinearGradient(0, 0, 0, 240);
	        gradient.addColorStop(0, Chart.helpers.color('#ffefce').alpha(1).rgbString());
	        gradient.addColorStop(1, Chart.helpers.color('#ffd1ce').alpha(0.3).rgbString());
	
	        var config = {
	            type: 'line',
	            data: {
	                labels: msglabellst,
	                datasets: [{
	                    label: "mqtt消息队列中报文数量",
	                    backgroundColor: gradient,
	                    borderColor: KTApp.getStateColor('success'),
	                    pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointHoverBackgroundColor: KTApp.getStateColor('danger'),
	                    pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
	
	                    //fill: 'start',
	                    data: msgdatalst//[
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
	
	        chart = new Chart(ctx, config);
	        //return chart;
        }else{
        	console.log("refreshlogchart update start");
        	chart.data.datasets[0].data = msgdatalst;
        	chart.data.labels = msglabellst;
        	chart.update();
        	console.log("refreshlogchart update");
        	//return chart;
        }
        
    }
    
    jQuery(document).ready(function() {
    	//dailySales();
    	setTimeout('coreMsgFunc()',1000);
    });