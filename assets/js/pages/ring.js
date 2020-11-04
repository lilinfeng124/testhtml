			var profitname=[];
			var profitdata=[];
			var animation = true;
			var myDoughnut = null;
			function ringrefresh() 
			{ 
					var identity = "packet";
				   $.ajax({
				         contentType: "application/json; charset=utf-8",
				         type:"post",
				         url:"PacketType",
				         data:identity,
				         success:function(data){
				        	  //console.log(data);
				              //alert("success!!!first:"+data.first+" second:"+data.second+" third:"+data.third);
				        	 profitname = data.namelst;
				        	 console.log("profitname="+profitname);
				        	 profitdata = data.valuelst;
				        	 console.log("profitdata="+profitdata);
				        	 //console.log("animation="+animation);
				        	 profitShare();
							 if(animation==true){
								   animation=false;
						           console.log("change animation to "+animation);
							   }
				         },
				         error:function(e){
				               alert("error!!!");
				         },
				   }
				   )

				setTimeout('ringrefresh()',10000); //指定10秒刷新一次    
			} 
var profitShare = function() {        
        if (!KTUtil.getByID('kt_chart_profit_share')) {
        	console.log("kt_chart_profit_share is here");
            return;
        }
        console.log("kt_chart_profit_share is here");
        var dev1=KTUtil.getByID('devicetype1');
        if(dev1&&profitname.length>0){
        	dev1.innerHTML=profitdata[0]+" "+profitname[0];
        }
        var dev2=KTUtil.getByID('devicetype2');
        if(dev2&&profitname.length>1){
        	dev2.innerHTML=profitdata[1]+" "+profitname[1];
        }
        var dev3=KTUtil.getByID('devicetype3');
        if(dev3&&profitname.length>2){
        	dev3.innerHTML=profitdata[2]+" "+profitname[2];
        }
        var packetcount=KTUtil.getByID('packet_count');
        if(packetcount&&profitdata[0]&&profitdata[1]&&profitdata[2]){
        	console.log("packetcount");
        	var count = 0;
        	if(profitdata[0])
        	{
        		count += profitdata[0];
        	}
        	
        	if(profitdata[1])
        	{
        		count += profitdata[1];
        	}
        	if(profitdata[2])
    		{
        		count += profitdata[2];
    		}
        	
        	packetcount.innerHTML=count;
        }else{
        	console.log("!packetcount");
        }
        
        
        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
        };

        var config = {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: profitdata,
                    backgroundColor: [
                        KTApp.getStateColor('success'),
                        KTApp.getStateColor('danger'),
                        KTApp.getStateColor('brand')
                    ]
                }],
                labels: profitname//[
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
                    text: '命令类型'
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

        var ctx = KTUtil.getByID('kt_chart_profit_share').getContext('2d');
        if(!myDoughnut){
        	console.log("init myDoughnut");
        	myDoughnut = new Chart(ctx, config);
        }else{
        	console.log("myDoughnut setConfig");
        	myDoughnut.data.datasets[0].data = profitdata;
        	myDoughnut.update({
			    duration: 800
			});
        }
    }
    
 // Class initialization on page load
    jQuery(document).ready(function() {
    	//profitShare();
    	setTimeout('ringrefresh()',1000);
    });