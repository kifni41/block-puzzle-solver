/*
* Puzzle.js
* Author : Kifni Taufik D <kifnitaufik.gmail.com>
*/

function Puzzle(state, path){
	this.state = state;
	this.path = path;
}

function solveBFS (initial_state, goal_state) {
	var start = new Date().getTime();
	console.log('Lets solve this puzzle : BFS');
	console.log('initial = ' +initial_state);
	console.log('goal = ' +goal_state);
	//check if initial state = goal state, no need to solve !
	if(initial_state.toString() === goal_state.toString())
	{
		var data = {
			'success'	: 0,
			'message' 	: "Already Solved! Initial State = Goal !"
		};
	}
	else{
		var found = -1;
		var moves = [];
		//put first state to moves

		var initial = new Puzzle(initial_state.slice(),"");
		moves.push(initial);
		var queue = [0];
		var visited = [initial_state.toString()];
		var directions = ['left','right','up','down'];

		while(found == -1){
			current_index =queue.shift();
			var zero_idx = moves[current_index].state.indexOf(0);
			for (var i = 0; i < directions.length; i++) {
				//console.log('#'+directions[i]);
				new_puzzle = action(moves[current_index],directions[i],zero_idx);
				if(new_puzzle != null && visited.indexOf(new_puzzle.state.toString()) == -1 ){
					visited.push(new_puzzle.state.toString());
					new_puzzle.parent = current_index;
					moves.push(new_puzzle);
					if(new_puzzle.state.toString() === goal_state.toString()){
						found = moves.length-1;
					}else{
						queue.push(moves.length-1);
					}
				}
			};
			//break;
		}
		var end = new Date().getTime();
		var time = end - start;

		var solution = moves[found].path.split('#');
		solution.shift(); //remove the first empty array

		var data = {
			'success'	: 1,
			'message' 	: "Puzzle Solved !",
			'time'		: (time/1000),
			'visited'	: moves.length,
			'solution'	: solution
		};
	}

	return data;
}

function solveAStar(initial_state, goal_state) {
	var start = new Date().getTime();
	//console.log('Lets solve this puzzle : A*');
	//console.log('initial = ' +initial_state);
	//console.log('goal = ' +goal_state);
	//check if initial state = goal state, no need to solve !
	if(initial_state.toString() == goal_state.toString())
	{
		var data = {
			'success'	: 0,
			'message' 	: "Already Solved! Initial State = Goal !"
		};
	}
	else{
		var found = -1;
		var moves = [];
		//put first state to moves

		var initial = new Puzzle(initial_state.slice(),"");
		moves.push(initial);
		var queue = new PriorityQueue();
		queue.pushe(0,0);
		var visited = [initial_state.toString()];
		var idx = 0;
		var directions = ['left','right','up','down'];

		while(found == -1){
			current_index =queue.pope();
			idx++;
			var zero_idx = moves[current_index].state.indexOf(0);
			for (var i = 0; i < directions.length; i++) {
				//console.log('#'+directions[i]);
				new_puzzle = action(moves[current_index],directions[i],zero_idx);
				if(new_puzzle != null && visited.indexOf(new_puzzle.state.toString()) == -1 ){
					visited.push(new_puzzle.state.toString());
					new_puzzle.parent = current_index;
					moves.push(new_puzzle);
					if(new_puzzle.state.toString() == goal_state.toString()){
						found = moves.length-1;
					}else{
						//cost = step to current state + distance from state to goal
						var cost = idx + distanceToGoal(new_puzzle.state,goal_state) ;
						queue.pushe(moves.length-1,cost);
					}
				}
			};
			//break;
		}
		var end = new Date().getTime();
		var time = end - start;

		var solution = moves[found].path.split('#');
		solution.shift(); //remove the first empty array
		var data = {
			'success'	: 1,
			'message' 	: "Puzzle Solved !",
			'time'		: (time/1000),
			'visited'	: moves.length,
			'solution'	: solution
		};
	}
	return data;
}

function distanceToGoal(state, goal_state)
{
	// console.log('distanceToGoal...');
	// console.log(state);
	// console.log(goal_state);
	var distance =0;
	var zipped = state.map(function (e, i) {
		   			return [state[i], goal_state[i]];
				});
	for (var i = 0; i < zipped.length; i++) {
		// console.log(zipped[i]);
		// console.log(zipped[i][0]%3);
		// console.log(parseInt(zipped[i][0]/3));
		// console.log(zipped[i][1]%3);
		// console.log(parseInt(zipped[i][1]/3));
		// console.log('manhattan='+manhattanDistance( (zipped[i][0]%3), (parseInt(zipped[i][0]/3)) , (zipped[i][1]%3) , (parseInt(zipped[i][1]/3)) ));
		distance +=manhattanDistance( (zipped[i][0]%3), (parseInt(zipped[i][0]/3)) , (zipped[i][1]%3) , (parseInt(zipped[i][1]/3)) );
	};
	//console.log('total distance = '+distance);
	return distance;
}

function manhattanDistance (x1, y1, x2, y2) {
	return Math.abs(x1 - x2) + Math.abs(y1 -y2);
}

function action(puzzle,dir,zero_idx)
{
	//console.log(puzzle);
	//console.log('#'+dir);
	//n_state = puzzle.state.slice();
	// mod = zero_idx % 3;
	// div = parseInt(zero_idx/3);
	//console.log('#mod='+mod+'#div='+div);
	// if(dir == 'left' && mod != 0){
	// 	new_zero = zero_idx - 1;
	// }
	// else if(dir == 'right' && mod !=2){
	// 	new_zero = zero_idx + 1;
	// }
	// else if(dir == 'up' && div !=0){
	// 	new_zero = zero_idx - 3;
	// }
	// else if(dir == 'down' && div !=2){
	// 	new_zero = zero_idx + 3;
	// }else{
	// 	return null;
	// }
	// n_state = swap(n_state, zero_idx,new_zero );
	n_state = moveState(puzzle.state, dir);
	if(n_state){
		n_path = puzzle.path +"#"+dir;
		n_puzzle = new Puzzle(n_state, n_path);
		//console.log(n_puzzle);
		return n_puzzle;
	}else{
		return null;
	}

}

function moveState(state, dir)
{
	var zero_idx = state.indexOf(0);
	n_state = state.slice();
	mod = zero_idx % 3;
	div = parseInt(zero_idx/3);
	//console.log('#mod='+mod+'#div='+div);
	if(dir == 'left' && mod != 0){
		new_zero = zero_idx - 1;
	}
	else if(dir == 'right' && mod !=2){
		new_zero = zero_idx + 1;
	}
	else if(dir == 'up' && div !=0){
		new_zero = zero_idx - 3;
	}
	else if(dir == 'down' && div !=2){
		new_zero = zero_idx + 3;
	}else{
		return null;
	}
	n_state = swap(n_state, zero_idx,new_zero );
	return n_state;
}

function swap(p_state, old_zero, new_zero)
{
	p_state[old_zero] = p_state[new_zero];
	p_state[new_zero] = 0;
	return p_state;
}

/*
* PRIORITY QUEUE
* Author : GRIFFnDOOR
* https://jsfiddle.net/GRIFFnDOOR/r7tvg/
* modified by : Kifni Taufik Darmawan
*/

function Node (data, priority) {
    this.data = data;
    this.priority = priority;
}
Node.prototype.toString = function(){return this.priority}

// takes an array of objects with {data, priority}
function PriorityQueue (arr) {
    this.heap = [null];
    if (arr) for (i=0; i< arr.length; i++)
        this.push(arr[i].data, arr[i].priority);
}

PriorityQueue.prototype = {
    pushe: function(data, priority) {
        var node = new Node(data, priority);
        this.bubble(this.heap.push(node) -1);      
    },
    
    // removes and returns the data of highest priority
    pope: function() {
        var topVal = this.heap[1].data;
        //this.heap[1] = this.heap.pop();
        //this.sink(1); 
        this.heap.splice(1,1);
        return topVal;
    },
    
    // bubbles node i up the binary tree based on
    // priority until heap conditions are restored
    bubble: function(i) {
        while (i > 1) { 
            var parentIndex = i >> 1; // <=> floor(i/2)
            
            // if equal, no bubble (maintains insertion order)
            if (!this.isHigherPriority(i, parentIndex)) break;
            
            this.swap(i, parentIndex);
            i = parentIndex;
    }   },
        
    // does the opposite of the bubble() function
    // sink: function(i) {
    //     while (i*2 < this.heap.length) {
    //         // if equal, left bubbles (maintains insertion order)
    //         var leftHigher = !this.isHigherPriority(i*2 +1, i*2);
    //         var childIndex = leftHigher? i*2 : i*2 +1;
            
    //         // if equal, sink happens (maintains insertion order)
    //         if (this.isHigherPriority(i,childIndex)) break;
            
    //         this.swap(i, childIndex);
    //         i = childIndex;
    // }   },
        
    // swaps the addresses of 2 nodes
    swap: function(i,j) {
        var temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    },
        
    // returns true if node i is higher priority than j
    isHigherPriority: function(i,j) {
    	// console.log('#i='+i +'#j='+j);
    	// console.log(this.heap[i]);
    	// console.log(this.heap[j]);
        return this.heap[i].priority < this.heap[j].priority;
    }
}