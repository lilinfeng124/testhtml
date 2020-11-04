			var profitdata=[];
			function ringrefresh() 
			{ 
					var identity = "packet";
				   $.ajax({
				         contentType: "application/json; charset=utf-8",
				         type:"post",
				         url:"testring",
				         data:identity,
				         success:function(data){
				        	  //console.log(data);
				              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
				        	 profitdata = data;
				         },
				         error:function(e){
				               alert("error!!!");
				         },
				   }
				   )
				setTimeout('ringrefresh()',1000); //指定1秒刷新一次    
			} 
var profitShare = function() {        
        if (!KTUtil.getByID('kt_chart_profit_share')) {
            return;
        }

        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
        };

        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [
                        55, 10, 35
                    ],
                    backgroundColor: [
                        KTApp.getStateColor('success'),
                        KTApp.getStateColor('danger'),
                        KTApp.getStateColor('brand')
                    ]
                }],
                labels: [
                    'Angular',
                    'CSS',
                    'HTML'
                ]
            },
            options: {
                cutoutPercentage: 75,
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Technology'
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
                tooltips: {
                    enabled: true,
                    intersect: false,
                    mode: 'nearest',
                    bodySpacing: 5,
                    yPadding: 10,
                    xPadding: 10, 
                    caretPadding: 0,
                    displayColors: false,
                    backgroundColor: KTApp.getStateColor('success'),
                    titleFontColor: '#ffffff', 
                    cornerRadius: 4,
                    footerSpacing: 0,
                    titleSpacing: 0
                }
            }
        };

        var ctx = KTUtil.getByID('kt_chart_profit_share').getContext('2d');
        var myDoughnut = new Chart(ctx, config);
    }
    
 // Class initialization on page load
    jQuery(document).ready(function() {
    	profitShare();
    });