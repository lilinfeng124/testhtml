			var coreonline=0;
			var coreoffline=0;
			var animation = true;
			var mycoreDoughnut = null;
			function devicestatusrefresh() 
			{ 
					var identity = "packet";
				   $.ajax({
				         contentType: "application/json; charset=utf-8",
				         type:"post",
				         url:"http:///49.91.240.239:28900/core/devicestatus",
				         data:identity,
				         success:function(data){
				        	  //console.log(data);
				              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
				        	 coreonline = data.online;
				        	 //console.log("profitname="+profitname);
				        	 coreoffline = data.offline;
				        	 //console.log("profitdata="+profitdata);
				        	 //console.log("animation="+animation);
				        	 devicestatus();
							 if(animation==true){
								   animation=false;
						           console.log("change animation to "+animation);
							   }
				         },
				         error:function(e){
				               console.log("devicestatus error!!!"+e.status);
				         },
				   }
				   )

				setTimeout('devicestatusrefresh()',10000); //指定10秒刷新一次    
			} 
var devicestatus = function() {        
        if (!KTUtil.getByID('dev_online_status')) {
        	console.log("dev_online_status is here");
            return;
        }
        console.log("dev_online_status is here");
        var dev1=KTUtil.getByID('online_device');
        if(dev1){
        	dev1.innerHTML="有心跳装置 "+coreonline;
        }
        var dev2=KTUtil.getByID('offline_device');
        if(dev2){
        	dev2.innerHTML="无心跳装置 "+coreoffline;
        }

        var packetcount=KTUtil.getByID('packet_count');

        	console.log("packetcount");
        	var count = coreonline+coreoffline;
        	packetcount.innerHTML=count;

        
        
        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
        };

        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [coreonline,coreoffline],
                    backgroundColor: [
                        KTApp.getStateColor('success'),
                        KTApp.getStateColor('danger')
                    ]
                }],
                labels: ['在线装置','离线装置']//[
                    //'Angular',
                    //'CSS',
                    //'HTML'
                //]
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
                    text: '有心跳的装置占比'
                },
                animation: {
                    animateScale: animation,
                    animateRotate: animation
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

        var ctx = KTUtil.getByID('dev_online_status').getContext('2d');
        if(!mycoreDoughnut){
        	console.log("init myDoughnut");
        	mycoreDoughnut = new Chart(ctx, config);
        }else{
        	console.log("myDoughnut setConfig");
        	
        	mycoreDoughnut.data.datasets[0].data = [coreonline,coreoffline];
        	mycoreDoughnut.update({
			    duration: 800
			});
        }
    }
    
 // Class initialization on page load
    jQuery(document).ready(function() {
    	//profitShare();
    	setTimeout('devicestatusrefresh()',1000);
    });