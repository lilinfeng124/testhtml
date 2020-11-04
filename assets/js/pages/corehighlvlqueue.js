    // Bandwidth Charts 2.
    // Based on Chartjs plugin - http://www.chartjs.org/
	var highchart = null;
	var highlabellst=[0];
	var highdatalst=[0];
	var coreHighFunc = function() {
		
	    var identity = "packet";
		   $.ajax({
		         contentType: "application/json; charset=utf-8",
		         type:"post",
		         url:"http://49.91.240.239:28900/core/highlevel",
		         contentType: "jsonp",
		         data:"",
		         success:function(data){
		        	  console.log("core="+data);
		              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
					 //dataLst = data;
					 //console.log("dataLst:"+dataLst);
		        	  ShowHighChart(data);

		         },
		         error:function(e){
		        	 console.log("core highlevel error!!!"+e.message);
		         },
		   }
		   )
		   setTimeout('coreHighFunc()',2000);
		}
	
	
    var ShowHighChart = function(recvdata) {
    	var siz = recvdata.length;
    	var tim = recvdata.time;    	
    	var count = recvdata.count;
		console.log("siz="+siz);
		console.log("tim="+tim);
		highdatalst.push(siz);
    	highlabellst.push(tim);
		

		if(highdatalst.length>10){
			highdatalst.shift();
		}
		if(highlabellst.length>10){
			highlabellst.shift();
		}
				
		
		$('#high_lvl_count').text(count);
		
		console.log("datalst = "+highdatalst);
		console.log("labellst = "+highlabellst);

    	if ($('#high_lvl_history_msg_canvas').length == 0) {
            return ;
        }
        
        if(!highchart){
        
        	//console.log("ShowChart init ");
	        var ctx = document.getElementById("high_lvl_history_msg_canvas").getContext("2d");
	
	        var gradient = ctx.createLinearGradient(0, 0, 0, 240);
	        gradient.addColorStop(0, Chart.helpers.color('#ffefce').alpha(1).rgbString());
	        gradient.addColorStop(1, Chart.helpers.color('#ffd1ce').alpha(0.3).rgbString());
	
	        var config = {
	            type: 'line',
	            data: {
	                labels: highlabellst,
	                datasets: [{
	                    label: "高等级消息队列",
	                    backgroundColor: gradient,
	                    borderColor: KTApp.getStateColor('warning'),
	                    pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointHoverBackgroundColor: KTApp.getStateColor('danger'),
	                    pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
	
	                    //fill: 'start',
	                    data: highdatalst//[
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
	
	        highchart = new Chart(ctx, config);
	        //return chart;
        }else{

        	highchart.data.datasets[0].data = highdatalst;
        	highchart.data.labels = highlabellst;
        	highchart.update();

        	//return chart;
        }
        
    }
    
    jQuery(document).ready(function() {
    	//dailySales();
    	setTimeout('coreHighFunc()',1000);
    });