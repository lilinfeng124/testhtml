    // Bandwidth Charts 2.
    // Based on Chartjs plugin - http://www.chartjs.org/
	var chart = null;
	var refreshanglechart = function() {
		
	    var identity = "packet";
		   $.ajax({
		         contentType: "application/json; charset=utf-8",
		         type:"post",
		         url:"anglechart",
		         data:identity,
		         success:function(data){
		        	  //console.log(data);
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
		   setTimeout('refreshanglechart()',20000);
		}
	
	
    var ShowChart2 = function(data) {
        console.log("ShowChart2 data="+data);
    	if ($('#kt_chart_bandwidth2').length == 0) {
            return ;
        }
        
        if(!chart){
        
        	console.log("ShowChart2 init");
	        var ctx = document.getElementById("kt_chart_bandwidth2").getContext("2d");
	
	        var gradient = ctx.createLinearGradient(0, 0, 0, 240);
	        gradient.addColorStop(0, Chart.helpers.color('#ffefce').alpha(1).rgbString());
	        gradient.addColorStop(1, Chart.helpers.color('#ffd1ce').alpha(0.3).rgbString());
	
	        var config = {
	            type: 'line',
	            data: {
	                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
	                datasets: [{
	                    label: "完成的命令数量",
	                    backgroundColor: gradient,
	                    borderColor: KTApp.getStateColor('warning'),
	                    pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
	                    pointHoverBackgroundColor: KTApp.getStateColor('danger'),
	                    pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
	
	                    //fill: 'start',
	                    data: data//[
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
        	chart.data.datasets[0].data = data;
        	chart.update();
        	console.log("refreshanglechart update");
        	//return chart;
        }
        
    }
    
    jQuery(document).ready(function() {
    	//dailySales();
    	setTimeout('refreshanglechart()',1000);
    });