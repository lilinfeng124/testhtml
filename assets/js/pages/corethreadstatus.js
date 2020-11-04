var coretableitem1 = null;
var coretableitem2 = null;


//var label;
var corelabellst1 = [];
var corelabellst2 = [];

var coredatalst1 = [];
var coredatalst2 = [];


var _initSparklineChart = function(tableitem, src, label, data, color, border) {
        if (src.length == 0) {
            return;
        }
        if(tableitem==null){
        	console.log("_initSparklineChart init");
        var config = {
            type: 'line',
            data: {
                labels: label,//["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
                datasets: [{
                    label: "",
                    borderColor: color,
                    borderWidth: border,

                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 12,
                    pointBackgroundColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                    pointBorderColor: Chart.helpers.color('#000000').alpha(0).rgbString(),
                    pointHoverBackgroundColor: KTApp.getStateColor('danger'),
                    pointHoverBorderColor: Chart.helpers.color('#000000').alpha(0.1).rgbString(),
                    fill: false,
                    data: data,
                }]
            },
            options: {
                title: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                    intersect: false,
                    mode: 'nearest',
                    xPadding: 10,
                    yPadding: 10,
                    caretPadding: 10
                },
                legend: {
                    display: false,
                    labels: {
                        usePointStyle: false
                    }
                },
                responsive: true,
                maintainAspectRatio: true,
                hover: {
                    mode: 'index'
                },
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
                    point: {
                        radius: 4,
                        borderWidth: 12
                    },
                },

                layout: {
                    padding: {
                        left: 0,
                        right: 10,
                        top: 5,
                        bottom: 0
                    }
                }
            }
        };

        tableitem = new Chart(src, config);
        }else{
        	tableitem.data.datasets[0].data=data;
        	tableitem.update({
        	    duration: 10000,
        	    easing: 'easeOutBounce'
        	});
        }
        return tableitem;//new Chart(src, config);
    }

var corerefreshthreadtable = function() {
	
    var identity = "packet";
	   $.ajax({
	         contentType: "application/json; charset=utf-8",
	         type:"post",
	         url:"http:///49.91.240.239:8900/core/threadstatus",
	         data:identity,
	         success:function(data){
	        	  console.log("data"+data);
	              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);

				 //label = data.label;
				 //console.log("label:"+label);
	        	 
	        	  showthreadtable(data);

	         },
	         error:function(e){
	               console.log("core threadstatus error!!!"+e.status);
	         },
	   }
	   )
	   setTimeout('corerefreshthreadtable()',2000);
	}

	function showthreadtable(dataLst){
		console.log("dataLst = "+dataLst);
		console.log("dataLst.time="+dataLst.time);
		corelabellst1.push(dataLst.time);
		if(corelabellst1.length>10){
			corelabellst1.shift();
		}
		console.log("dataLst.time="+dataLst.time);
		corelabellst2.push(dataLst.time);
		if(corelabellst2.length>10){
			corelabellst2.shift();
		}

		//console.log("dataLst[0].runcount="+dataLst[0].runcount);
		coredatalst1.push(dataLst.recvperruncount);
		if(coredatalst1.length>10){
			coredatalst1.shift();
		}

		coredatalst2.push(dataLst.saveperruncount);
		if(coredatalst2.length>10){
			coredatalst2.shift();
		}	

		// Init chart instances
		$('#threa_name1').text("接收线程");
		$('#threa_name2').text("处理线程");

		
		$('#threa_desc1').text("收取MQTT消息");
		$('#threa_desc2').text("处理数据包");

		
		$('#thread_per_time1').text(dataLst.recvpercount);
		$('#thread_per_time2').text(dataLst.savepercount);

		
		$('#thread_status1').text(dataLst.threadstatus);
		$('#thread_status2').text(dataLst.threadstatus);

		
		$('#thread_total_count1').text(dataLst.recvcount);
		$('#thread_total_count2').text(dataLst.savecount);

		
		coretableitem1 = _initSparklineChart(coretableitem1,$('#thread_canvas1'), corelabellst1,coredatalst1, KTApp.getStateColor('success'), 2);
		coretableitem2 = _initSparklineChart(coretableitem2,$('#thread_canvas2'), corelabellst2,coredatalst2, KTApp.getStateColor('danger'), 2);


	}

// Class initialization on page load
jQuery(document).ready(function() {
	//dailySales();
	setTimeout('corerefreshthreadtable()',1000);
});