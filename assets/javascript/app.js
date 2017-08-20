function show(elementID) {
    var ele = document.getElementById(elementID);
    if (!ele) {
        alert("no such element");
        return;}
    var pages = document.getElementsByClassName('page');
    for(var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
    ele.style.display = 'block';
};

$(document).ready(function(){

	var timer = 121;
	var interval;

	var correct = 0;
	var incorrect = 0;
	var unanswered = 0;
	var answers = [];

	$(".start").on("click", run);

	function run() {
		interval = setInterval(decrement, 1000);
	};

	function decrement() {
		timer--;

		$("#timer").html(timer);

		if(timer === 0) {
			clearInterval(interval);
			timer = 121;
			show('Page3');
			addTotals();
			answers = [];
			$(".totalCorrect").html(correct);
			$(".totalIncorrect").html(incorrect);
			$(".totalUnanswered").html(unanswered);
		};
	};

	function getUserAnswers() {
		$('input[type="radio"]').each(function(){
			if ($(this).is(':checked')) {
				var userAnswer = $(this).attr('value');
				answers.push(userAnswer);
			} else {
				answers.push(undefined);
			}
		});
	};

	function addTotals() {
		for (var i = 0; i < answers.length; i++) {
			if (answers[i] === 'correct') {
				correct += 1;
			} else if (answers[i] === 'incorrect') {
				incorrect += 1;
			} else {
				unanswered = (answers.length/4) - (correct + incorrect)
			}
		};
	};

	$('.done').on("click", function() {
		clearInterval(interval);
		timer = 121;
		getUserAnswers();
		addTotals();
		answers = [];
		$(".totalCorrect").html(correct);
		$(".totalIncorrect").html(incorrect);
		$(".totalUnanswered").html(unanswered);
	});

	$('.restart').on("click", function() {
		$('input[type="radio"]').prop('checked', false);
		correct = 0;
		incorrect = 0;
		unanswered = 0;
	});

});


