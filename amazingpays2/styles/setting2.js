$(document).ready(function(){
	$(".dropdown img.flag").addClass("flagvisibility");

    $(".dropdown dt a").click(function() {
        $(".dropdown dd ul").toggle();
    });
                
    $(".dropdown dd ul li a").click(function() {
        var text = $(this).html();
        $(".dropdown dt a").html(text);
        $(".dropdown dd ul").hide();
    });
    $(document).bind('click', function(e) {
        var $clicked = $(e.target);
        if (! $clicked.parents().hasClass("dropdown"))
            $(".dropdown dd ul").hide();
    });


    $("#flagSwitcher").click(function() {
        $(".dropdown img.flag").toggleClass("flagvisibility");
    });
    var modal = document.getElementById('myModal2');
	var img_clk = document.getElementById('img_clk');
	var modalImg = document.getElementById("img01");
	img_clk.onclick = function(){
	    modal.style.display = "block";
	    modalImg.src = "styles/images/ct-img2.png";
	}
	wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100,
        callback:     function(box) {
          console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
      }
    );
    wow.init();


	$('.selMonth').change(function(){
		var plan = $('.selMonth').val();
		console.log(plan);
		if(plan == 3){
			var percent 	= [3];
			var minMoney 	= [10];
			var maxMoney	= [100];
			var day         = [1];
		}
		if (plan == 4) {
			var percent 	= [4];
			var minMoney 	= [10];
			var maxMoney	= [1000];
			var day         = [35];
		}
		if (plan == 10) {
			var percent 	= [10];
			var minMoney 	= [10];
			var maxMoney	= [100];
			var day         = [11];
		}

		$("#amount1").val(minMoney[0]);

		function calc(){
			money = parseFloat($("#amount1").val());
			// days = parseFloat($("#days").val());
			days = 1;
				
			// if(days < 1 || isNaN(days) == true){
			// 	days = 1;
			// }
			id = -1;
			var length = percent.length;
			var i = 0;
			do {
				if(minMoney[i] <= money && money <= maxMoney[i]){
					id = i;
					i = i + length;
				}
				i++
			}
			while(i < length)
				
				if(id != -1){
					profitDaily = money / 100 * percent[id];
					profitDaily = profitDaily.toFixed(8);
					profitHourly = profitDaily / 24;
					profitHourly = profitHourly.toFixed(8);
					profitWeekly = profitDaily * 7;
					profitWeekly = profitWeekly.toFixed(8);
					profitMonthly = profitDaily * 30;
					profitMonthly = profitMonthly.toFixed(8);
					profitTotal = profitDaily * day[id];
					profitTotal = profitTotal.toFixed(8);
					netProfit = money / 100 * percent[id] * day[id] + money;
					netProfit = netProfit.toFixed(8);
					console.log(netProfit);

					if(money < minMoney[id] || isNaN(money) == true){
						$("#profitHourly").text("Error!");
						$("#profitDaily").text("Error!");
						$("#profitWeekly").text("Error!");
						$("#profitMonthly").text("Error!");
						$("#net").text("Error!");
						$("#total").text("Error!");
						if($("#selected_plan").length){
							$("#selected_plan").text("Error!");
							$("#percentHourly").text("Error!");
						}
					} else {
						$("#profitHourly").text(profitHourly + " BTC");
						$("#profitDaily").text(profitDaily + " BTC");
						$("#profitWeekly").text(profitWeekly + " BTC");
						$("#profitMonthly").text(profitMonthly + " BTC");
						$("#net").text(profitTotal + " BTC");
						$("#total").text(netProfit + " BTC");
						if($("#selected_plan").length){
							$("#selected_plan").text($(".plan .boxs:eq(" + id + ") .percent").text());
							$("#percentHourly").text($(".plan .boxs:eq(" + id + ") .text").text());
						}
					}
				} else {
					$("#profitHourly").text("Error!");
					$("#profitDaily").text("Error!");
					$("#profitWeekly").text("Error!");
					$("#profitMonthly").text("Error!");
					$("#net").text("Error!");
					$("#total").text("Error!");
					if($("#selected_plan").length){
							$("#selected_plan").text("Error!");
							$("#percentHourly").text("Error!");
						}
				}
			}
			if($("#amount1").length){
				calc();
			}
			$("#amount1").keyup(function(){
				calc();
			});

	});
});