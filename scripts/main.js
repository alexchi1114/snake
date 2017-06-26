LEFT=37;
RIGHT=39;
UP=38;
DOWN=40;

var snake = {
	body:[[15,1],[15,2],[15,3],[15,4],[15,5],[15,6],[15,7],[15,8]],
	direction: 'r'	
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
		$(`#x${snake.body[i][0]}y${snake.body[i][1]}`).css("background-color","red");
	}
	
}

function gameOver(){
		game_over = false;
		if(snake.body[snake.body.length-1][0]>29 || snake.body[snake.body.length-1][1]>29 || snake.body[snake.body.length-1][0]<0 || snake.body[snake.body.length-1][1]<0){
			game_over = true;
		} else if(checkIfArrayIsUnique(snake.body)===false){
			game_over = true;
		}

		return game_over;
	}

function moveSnake(){

	setInterval(move,100);

	current_move = ''

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
				$(`#x${snake.body[0][0]}y${snake.body[0][1]}`).css("background-color", "white")
				snake.body.shift()
				drawSnake()
				break;
			case 'l':
				snake.body.push([snake.body[snake.body.length-1][0],snake.body[snake.body.length-1][1]-1])
				$(`#x${snake.body[0][0]}y${snake.body[0][1]}`).css("background-color", "white")
				snake.body.shift()
				drawSnake()
				break;
			case 'u':
				snake.body.push([snake.body[snake.body.length-1][0]-1,snake.body[snake.body.length-1][1]])
				$(`#x${snake.body[0][0]}y${snake.body[0][1]}`).css("background-color", "white")
				snake.body.shift()
				drawSnake()
				break;
			case 'd':
				snake.body.push([snake.body[snake.body.length-1][0]+1,snake.body[snake.body.length-1][1]])
				$(`#x${snake.body[0][0]}y${snake.body[0][1]}`).css("background-color", "white")
				snake.body.shift()
				drawSnake()
				break;
		}

		if(gameOver()===true){
			alert("You lose!");
			prompt("would you like to play again?");
		}
	}







}

$(document).ready(function(){
	grid(30,30);
	drawSnake();
	moveSnake();
});