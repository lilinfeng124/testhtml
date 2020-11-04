var tableitem1 = null;
var tableitem2 = null;
var tableitem3 = null;
var tableitem4 = null;

var label;
var labellst1 = [];
var labellst2 = [];
var labellst3 = [];
var labellst4 = [];

var datalst1 = [];
var datalst2 = [];
var datalst3 = [];
var datalst4 = [];

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

var refreshtable = function() {
	
    var identity = "packet";
	   $.ajax({
	         contentType: "application/json; charset=utf-8",
	         type:"post",
	         url:"threadstatus",
	         data:identity,
	         success:function(data){
	        	  console.log("data"+data);
	              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);

				 //label = data.label;
				 //console.log("label:"+label);
	        	 
	        	 var dataLst = data.status;
				 //console.log("dataLst:"+dataLst);
				 //console.log("dataLst[0]"+dataLst[0]);
				 showtablewave(dataLst);

	         },
	         error:function(e){
	               alert("error!!!");
	         },
	   }
	   )
	   setTimeout('refreshtable()',2000);
	}

	function showtablewave(dataLst){
		console.log("dataLst = "+dataLst);
		console.log("data.time="+dataLst.time);
		
		labellst1.push(dataLst[0].time);
		if(labellst1.length>10){
			labellst1.shift();
		}

		labellst2.push(dataLst[1].time);
		if(labellst2.length>10){
			labellst2.shift();
		}

		labellst3.push(dataLst[2].time);
		if(labellst3.length>10){
			labellst3.shift();
		}

		labellst4.push(dataLst[3].time);
		if(labellst4.length>10){
			labellst4.shift();
		}
		
		//console.log("dataLst[0].runcount="+dataLst[0].runcount);
		datalst1.push(dataLst[0].runcount);
		if(datalst1.length>10){
			datalst1.shift();
		}
		//console.log("dataLst[1].runcount="+dataLst[1].runcount);
		datalst2.push(dataLst[1].runcount);
		if(datalst2.length>10){
			datalst2.shift();
		}
		
		datalst3.push(dataLst[2].runcount);
		if(datalst3.length>10){
			datalst3.shift();
		}
		//console.log("dataLst[1].runcount="+dataLst[1].runcount);
		datalst4.push(dataLst[3].runcount);
		if(datalst4.length>10){
			datalst4.shift();
		}

		// Init chart instances
		$('#threa_name1').text(dataLst[0].name);
		$('#threa_name2').text(dataLst[1].name);
		$('#threa_name3').text(dataLst[2].name);
		$('#threa_name4').text(dataLst[3].name);
		
		$('#threa_desc1').text(dataLst[0].desc);
		$('#threa_desc2').text(dataLst[1].desc);
		$('#threa_desc3').text(dataLst[2].desc);
		$('#threa_desc4').text(dataLst[3].desc);
		
		$('#thread_value1').text(dataLst[0].datacount);
		$('#thread_value2').text(dataLst[1].datacount);
		$('#thread_value3').text(dataLst[2].datacount);
		$('#thread_value4').text(dataLst[3].datacount);
		
		$('#thread_status1').text(dataLst[0].status);
		$('#thread_status2').text(dataLst[1].status);
		$('#thread_status3').text(dataLst[2].status);
		$('#thread_status4').text(dataLst[3].status);
		
		$('#thread_totalcount1').text(dataLst[0].totalcount);
		$('#thread_totalcount2').text(dataLst[1].totalcount);
		$('#thread_totalcount3').text(dataLst[2].totalcount);
		$('#thread_totalcount4').text(dataLst[3].totalcount);
		
		tableitem1 = _initSparklineChart(tableitem1,$('#thread_run_per_time1'), labellst1,datalst1, KTApp.getStateColor('success'), 2);
		tableitem2 = _initSparklineChart(tableitem2,$('#thread_run_per_time2'), labellst2,datalst2, KTApp.getStateColor('danger'), 2);
		tableitem3 = _initSparklineChart(tableitem3,$('#thread_run_per_time3'), labellst3,datalst3, KTApp.getStateColor('warning'), 2);
		tableitem4 = _initSparklineChart(tableitem4,$('#thread_run_per_time4'), labellst4,datalst4, KTApp.getStateColor('success'), 2);
	}

// Class initialization on page load
jQuery(document).ready(function() {
	//dailySales();
	setTimeout('refreshtable()',1000);
});