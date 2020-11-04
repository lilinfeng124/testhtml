var tableitem1 = null;
var tableitem2 = null;
var tableitem3 = null;
var tableitem4 = null;
var tableitem5 = null;
var tableitem6 = null;
var tableitem7 = null;
var tableitem8 = null;

var _initSparklineChart = function(tableitem, src, data, color, border) {
        if (src.length == 0) {
            return;
        }
        if(tableitem==null){
        	console.log("_initSparklineChart init");
        var config = {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
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
	         url:"tableshow",
	         data:identity,
	         success:function(data){
	        	  //console.log(data);
	              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
				 dataLst = data;
				 console.log("dataLst:"+dataLst);
				 showtablewave();

	         },
	         error:function(e){
	               alert("error!!!");
	         },
	   }
	   )
	   setTimeout('refreshtable()',20000);
	}

	function showtablewave(){
		
		// Init chart instances
		console.log("dataList[0]"+dataLst[0]);
		tableitem1 = _initSparklineChart(tableitem1,$('#kt_chart_sales_by_apps_1_1'), dataLst[0], KTApp.getStateColor('success'), 2);
		tableitem2 = _initSparklineChart(tableitem2,$('#kt_chart_sales_by_apps_1_2'), dataLst[1], KTApp.getStateColor('danger'), 2);
		tableitem3 = _initSparklineChart(tableitem3,$('#kt_chart_sales_by_apps_1_3'), dataLst[2], KTApp.getStateColor('success'), 2);
		tableitem4 = _initSparklineChart(tableitem4,$('#kt_chart_sales_by_apps_1_4'), dataLst[3], KTApp.getStateColor('warning'), 2);
	
		tableitem5 = _initSparklineChart(tableitem5,$('#kt_chart_sales_by_apps_2_1'), dataLst[4], KTApp.getStateColor('danger'), 2);
		tableitem6 = _initSparklineChart(tableitem6,$('#kt_chart_sales_by_apps_2_2'), dataLst[5], KTApp.getStateColor('dark'), 2);
		tableitem7 = _initSparklineChart(tableitem7,$('#kt_chart_sales_by_apps_2_3'), dataLst[6], KTApp.getStateColor('brand'), 2);
		tableitem8 = _initSparklineChart(tableitem8,$('#kt_chart_sales_by_apps_2_4'), dataLst[7], KTApp.getStateColor('info'), 2);
	}

// Class initialization on page load
jQuery(document).ready(function() {
	//dailySales();
	setTimeout('refreshtable()',1000);
});