LEFT=37;
RIGHT=39;
UP=38;
DOWN=40;

var score = 0;

var high_score = 0;

var snake = {
	body:[[15,1],[15,2],[15,3]],
	direction: 'r'	
}

var food = {
	position: [15,1]

}

function foodPlacement(){
	food.position = [Math.floor(Math.random()*19),Math.floor(Math.random()*19)];
	while($(`#x${food.position[0]}y${food.position[1]}`).css('background-color')==='rgb(0, 128, 0)'){
		food.position = [Math.floor(Math.random()*19),Math.floor(Math.random()*19)];
	}

	$(`#x${food.position[0]}y${food.position[1]}`).append("<div id = 'food'></div>");
}

function hitFood(){
	var hit = false;
	if((snake.body[snake.body.length-1][0]===food.position[0])&&(snake.body[snake.body.length-1][1]===food.position[1])){
		hit = true;
	}
	return hit;
}

function moveFood(){
	if(hitFood()===true){
		$('#food').remove();
		foodPlacement();
		updateScore();
	}
}

function checkIfArrayIsUnique(arr) {
    var map = {}, i, size;

    for (i = 0, size = arr.length; i < size; i++){
        if (map[arr[i]]){
            return false;
        }

        map[arr[i]] = true;
    }
    return true;
}

function grid(x,y){
	for(i=0;i<y;i++){
		for(j=0;j<x;j++){
			$('#content').append(`<div class = box id = x${i}y${j}></div>`);

		}
	}
}

function drawSnake(){
	for(i=0;i<snake.body.length;i++){
		$(`#x${snake.body[i][0]}y${snake.body[i][1]}`).css("background-color","#008000");
	}
	
}

function selfIntersection(){
	game_over = false;
	if(checkIfArrayIsUnique(snake.body)===false){
		game_over = true;
	}

	return game_over;
}

function hitBorder(){
		game_over = false;
		if(snake.body[snake.body.length-1][0]>19 || snake.body[snake.body.length-1][1]>19 || snake.body[snake.body.length-1][0]<0 || snake.body[snake.body.length-1][1]<0){
			game_over = true;
		} 
		return game_over;
}

function updateScore(){
	score+=snake.body.length-1;
	$('#score').text(`Score: ${score}`);
}

function moveSnake(){

	interval = setInterval(move,90);

	current_move = 'r'

	$(document).keydown(function(event){
	  if (event.which === RIGHT && current_move !== 'l') {
	    snake.direction = 'r';
	    current_move = 'r';
	  } else if (event.which === LEFT && current_move !== 'r') {
	    snake.direction = 'l';
	    current_move = 'l';
	  } else if (event.which === UP && current_move !== 'd') {
	    snake.direction = 'u';
	    current_move = 'u';
	  } else if (event.which === DOWN && current_move !== 'u') {
	    snake.direction = 'd';
	    current_move = 'd';
	  }
	});

	function move(){
		switch(current_move){
			case 'r':
				snake.body.push([snake.body[snake.body.length-1][0],snake.body[snake.body.length-1][1]+1])
				if(hitFood()===false){
					$(`#x${snake.body[0][0]}y${snake.body[0][1]}`).css("background-color", "white");
					snake.body.shift();
				}
				drawSnake()
				break;
			case 'l':
				snake.body.push([snake.body[snake.body.length-1][0],snake.body[snake.body.length-1][1]-1])
				if(hitFood()===false){
					$(`#x${snake.body[0][0]}y${snake.body[0][1]}`).css("background-color", "white");
					snake.body.shift();
				}
				drawSnake()
				break;
			case 'u':
				snake.body.push([snake.body[snake.body.length-1][0]-1,snake.body[snake.body.length-1][1]])
				if(hitFood()===false){
					$(`#x${snake.body[0][0]}y${snake.body[0][1]}`).css("background-color", "white");
					snake.body.shift();
				}
				drawSnake()
				break;
			case 'd':
				snake.body.push([snake.body[snake.body.length-1][0]+1,snake.body[snake.body.length-1][1]])
				if(hitFood()===false){
					$(`#x${snake.body[0][0]}y${snake.body[0][1]}`).css("background-color", "white");
					snake.body.shift();
				}
				drawSnake()
				break;
		}

		moveFood();

		if(hitFood===true){
			updateScore();
		}

		if(selfIntersection()===true){
			clearInterval(interval);
			alert("You ran into yourself!");
			var r = confirm("would you like to play again?");
			if (r === true){
				if(score >high_score){
					high_score = score;
					$('#highscore').text(`High Score: ${high_score}`)
				}
				reloadGame();
				playGame();
			}
		}

		if(hitBorder()===true){
			clearInterval(interval);
			alert("You hit the wall!");
			var r = confirm("would you like to play again?");
			if (r === true){
				if(score >high_score){
					high_score = score;
					$('#highscore').text(`High Score: ${high_score}`);
				}
				reloadGame();
				playGame();
			}
		}
	}
}

function reloadGame(){
	$('.box').remove();
	snake.body = [[15,1],[15,2],[15,3]];
	snake.direction = 'r';
	score = 0;
	$('#score').text('Score: 0');
}

function playGame(){
	grid(20,20);
	drawSnake();
	foodPlacement();
	moveSnake();
}

$(document).ready(function(){
	grid(20,20);
	$('#play').click(function(){
		reloadGame();
		playGame();
	});
});

