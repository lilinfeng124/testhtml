    // Bandwidth Charts 2.
    // Based on Chartjs plugin - http://www.chartjs.org/
	var chart = null;
	var labellst=[0];
	var datalst=[0];
	var refreshlogchart = function() {
		
	    var identity = "packet";
		   $.ajax({
		         contentType: "application/json; charset=utf-8",
		         type:"post",
		         url:"logsize",
		         data:identity,
		         success:function(data){
		        	  console.log("logchart="+data);
		              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
					 //dataLst = data;
					 //console.log("dataLst:"+dataLst);
					 ShowChart2(data);

		         },
		         error:function(e){
		               alert("error!!!");
		         },
		   }
		   )
		   setTimeout('refreshlogchart()',2000);
		}
	
	
    var ShowChart2 = function(recvdata) {
    	var siz = recvdata.size;
    	var tim = recvdata.time;
    	var count = recvdata.filecount;
		console.log("siz="+siz);
		console.log("tim="+tim);
    	datalst.push(siz);
		labellst.push(tim);
		

		if(datalst.length>10){
			datalst.shift();
		}
		if(labellst.length>10){
			labellst.shift();
		}
				
		
		$('#kt-widget20_number').text(count);
		
		console.log("datalst = "+datalst);
		console.log("labellst = "+labellst);

    	if ($('#kt_chart_bandwidth1').length == 0) {
            return ;
        }
        
        if(!chart){
        
        	//console.log("ShowChart init ");
	        var ctx = document.getElementById("kt_chart_bandwidth1").getContext("2d");
	
	        var gradient = ctx.createLinearGradient(0, 0, 0, 240);
	        gradient.addColorStop(0, Chart.helpers.color('#ffefce').alpha(1).rgbString());
	        gradient.addColorStop(1, Chart.helpers.color('#ffd1ce').alpha(0.3).rgbString());
	
	        var config = {
	            type: 'line',
	            data: {
	                labels: labellst,
	                datasets: [{
	                    label: "Log日志文件的Map存储",
	                    backgroundColor: gradient,
	                    borderColor: KTApp.getStateColor('success'),
	                    pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointHoverBackgroundColor: KTApp.getStateColor('danger'),
	                    pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
	
	                    //fill: 'start',
	                    data: datalst//[
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
	                            labelString: 'Month'
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
        	chart.data.datasets[0].data = datalst;
        	chart.data.labels = labellst;
        	chart.update();
        	console.log("refreshlogchart update");
        	//return chart;
        }
        
    }
    
    jQuery(document).ready(function() {
    	//dailySales();
    	setTimeout('refreshlogchart()',1000);
    });