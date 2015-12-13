/*
* Puzzle.js
* Author : Kifni Taufik D <kifnitaufik.gmail.com>
*/


function solve_bfs (initial_state, goal_state) {
	var start = new Date().getTime();
	console.log('lets solve this puzzle');
	console.log('initial = ' +initial_state);
	console.log('goal = ' +goal_state);
	//check if initial state = goal state, no need to solve !
	if(initial_state.toString() === goal_state.toString())
	{
		console.log('already solved dude!!');
	}
	else{
		var found = -1;
		var moves = [];
		//put first state to moves
		var initial = {
			'action' : 'start',
			'state' : initial_state.slice(),
			'parent' :null,
			'children' :  []
		};
		moves.push(initial);
		var queue = [0];
		var visited = [initial_state.toString()];
		var solution = null;
		var idx = 0;

		while(found == -1){
			current_index = queue[0];
			queue.shift();
			//left
			left_move = swap_left(moves[current_index].state);
			if(left_move){
				//skip if generated move on visited array
				if(visited.indexOf(left_move.toString()) == -1){
					visited.push(left_move.toString());
					new_child = {'action' : 'left', 'state' : left_move.slice(),'parent' : current_index,'children' :[] };
					moves.push(new_child);
					moves[current_index].children.push(moves.length-1);
					if(left_move.toString() === goal_state.toString())
						found = moves.length-1;
					else
						queue.push(moves.length-1);
				}
			}

			//right
			right_move = swap_right(moves[current_index].state);
			if(right_move){
				//skip if generated move on visited array
				if(visited.indexOf(right_move.toString()) == -1){
					visited.push(right_move.toString());
					new_child = {'action' : 'right', 'state' : right_move.slice(),'parent' : current_index,'children' :[] };
					moves.push(new_child);
					moves[current_index].children.push(moves.length-1);
					if(right_move.toString() === goal_state.toString())
						found = moves.length-1;
					else
						queue.push(moves.length-1);
				}
			}
			//up_move
			up_move = swap_up(moves[current_index].state);
			if(up_move){
				if(visited.indexOf(up_move.toString()) == -1){
					visited.push(up_move.toString());
					new_child = {'action' : 'up', 'state' : up_move.slice(),'parent' : current_index,'children' :[] };
					moves.push(new_child);
					moves[current_index].children.push(moves.length-1);
					if(up_move.toString() === goal_state.toString())
						found = moves.length-1;
					else
						queue.push(moves.length-1);
				}
			}

			//down
			down_move = swap_down(moves[current_index].state);
			if(down_move){
				if(visited.indexOf(down_move.toString()) == -1){
					visited.push(down_move.toString());
					new_child = {'action' : 'down', 'state' : down_move.slice(),'parent' : current_index,'children' :[] };
					moves.push(new_child);
					moves[current_index].children.push(moves.length-1);
					if(down_move.toString() === goal_state.toString())
						found = moves.length-1;
					else
						queue.push(moves.length-1);
				}
			}
			idx++;
		}
		var end = new Date().getTime();
		var time = end - start;
		console.log('Execution time: ' + (time/1000) +'seconds');
		console.log('visited = '+visited.length);
		console.log('moves = ' +moves.length);
		console.log('found = ' +found);
		if(found != "nyerah"){
			console.log(moves[found]);
			var rampung = 0;
			var idx = found;
			var solution = [];
			while(!rampung){
				solution.push(moves[idx].action);
				if(moves[idx].parent != null){
					idx = moves[idx].parent;
				}else{
					rampung =1;
				}
				

			}
			console.log(solution.reverse());
		}
		

		//console.log(moves);

	}
}

function solve_ucs (initial_state, goal_state) {
	var start = new Date().getTime();
	console.log('lets solve this puzzle');
	console.log('initial = ' +initial_state);
	console.log('goal = ' +goal_state);
	//check if initial state = goal state, no need to solve !
	if(initial_state.toString() === goal_state.toString())
	{
		console.log('already solved dude!!');
	}
	else{
		var found = -1;
		var moves = [];
		//put first state to moves
		var initial = {
			'action' : 'start',
			'state' : initial_state.slice(),
			'parent' :null,
			'children' :  []
		};
		moves.push(initial);
		var queue = new PriorityQueue();
		queue.pushe(0,0);
		var visited = [initial_state.toString()];
		var solution = null;
		var idx = 0;

		while(found == -1){
			idx++;
			//console.log('heap_length=' +queue.heap.length);
			//console.log(idx);
			//console.log(queue);
			current_index =queue.pope();
			//left
			left_move = swap_left(moves[current_index].state);
			if(left_move){
				//skip if generated move on visited array
				if(visited.indexOf(left_move.toString()) == -1){
					visited.push(left_move.toString());
					new_child = {'action' : 'left', 'state' : left_move.slice(),'parent' : current_index,'children' :[] };
					moves.push(new_child);
					//moves[current_index].children.push(moves.length-1);
					if(left_move.toString() === goal_state.toString())
						found = moves.length-1;
					else
						queue.pushe(moves.length-1,idx);
				}
			}
			// console.log('after left');
			//right
			right_move = swap_right(moves[current_index].state);
			if(right_move){
				//skip if generated move on visited array
				if(visited.indexOf(right_move.toString()) == -1){
					visited.push(right_move.toString());
					new_child = {'action' : 'right', 'state' : right_move.slice(),'parent' : current_index,'children' :[] };
					moves.push(new_child);
					//moves[current_index].children.push(moves.length-1);
					if(right_move.toString() === goal_state.toString())
						found = moves.length-1;
					else
						queue.pushe(moves.length-1,idx);
				}
			}
			// console.log('after right');
			//up_move
			up_move = swap_up(moves[current_index].state);
			if(up_move){
				if(visited.indexOf(up_move.toString()) == -1){
					visited.push(up_move.toString());
					new_child = {'action' : 'up', 'state' : up_move.slice(),'parent' : current_index,'children' :[] };
					moves.push(new_child);
					//moves[current_index].children.push(moves.length-1);
					if(up_move.toString() === goal_state.toString())
						found = moves.length-1;
					else
						queue.pushe(moves.length-1,idx);
				}
			}
			// console.log('after up');
			//down
			down_move = swap_down(moves[current_index].state);
			if(down_move){
				if(visited.indexOf(down_move.toString()) == -1){
					visited.push(down_move.toString());
					new_child = {'action' : 'down', 'state' : down_move.slice(),'parent' : current_index,'children' :[] };
					moves.push(new_child);
					//moves[current_index].children.push(moves.length-1);
					if(down_move.toString() === goal_state.toString())
						found = moves.length-1;
					else
						queue.pushe(moves.length-1,idx);
				}
			}
			// console.log('after down');
			
			if(idx == 55000){

				break;
			}
		}
		var end = new Date().getTime();
		var time = end - start;
		console.log('Execution time: ' + (time/1000) +'seconds');
		console.log('visited = '+visited.length);
		console.log('moves = ' +moves.length);
		console.log('found = ' +found);
		if(found != "nyerah"){
			console.log(moves[found]);
			var rampung = 0;
			var idx = found;
			var solution = [];
			while(!rampung){
				solution.push(moves[idx].action);
				if(moves[idx].parent != null){
					idx = moves[idx].parent;
				}else{
					rampung =1;
				}
				

			}
			console.log(solution.reverse());
		}
	}
}

//swap blank box to right
function swap_right(state)
{
	var r_state = state.slice();
	null_index = r_state.indexOf(0);
	//only possible on left & middle (horizontal)
	if(null_index != 2 && null_index != 5 && null_index !=8){
		r_state[null_index] = r_state[null_index+1];
		r_state[null_index+1] = 0;
		return r_state;
	}else{
		return null;
	}
}

//swap blank box to left
function swap_left(state)
{
	var l_state = state.slice();
	null_index = l_state.indexOf(0);
	//swap right only possible on right & middle (horizontal)
	if(null_index != 0 && null_index != 3 && null_index !=6){
		l_state[null_index] = l_state[null_index-1];
		l_state[null_index-1] = 0;
		return l_state;
	}else{
		return null;
	}
}

//swap blank box to up side
function swap_up(state)
{
	var u_state = state.slice();
	null_index = u_state.indexOf(0);
	//only possible on bottom & middle (vertical)
	if(null_index != 0 && null_index != 1 && null_index !=2){
		u_state[null_index] = u_state[null_index-3];
		u_state[null_index-3] = 0;
		return u_state;
	}else{
		return null;
	}
}

//swap blank box to down side
function swap_down(state)
{
	var d_state = state.slice();
	null_index = d_state.indexOf(0);
	//only possible on top & middle (vertical)
	if(null_index != 6 && null_index != 7 && null_index !=8){
		d_state[null_index] = d_state[null_index+3];
		d_state[null_index+3] = 0;
		return d_state;
	}else{
		return null;
	}
}

/*
* PRIORITY QUEUE
* Author : janogonzalez
* https://github.com/janogonzalez/priorityqueuejs
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
    	// console.log('pop');
    	// var aa = this.heap.slice();
    	// console.log('heap_length='+aa.length);
    	// console.log(aa);
        var topVal = this.heap[1].data;
        //console.log('topVal='+topVal);
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
    sink: function(i) {
        while (i*2 < this.heap.length) {
            // if equal, left bubbles (maintains insertion order)
            var leftHigher = !this.isHigherPriority(i*2 +1, i*2);
            var childIndex = leftHigher? i*2 : i*2 +1;
            
            // if equal, sink happens (maintains insertion order)
            if (this.isHigherPriority(i,childIndex)) break;
            
            this.swap(i, childIndex);
            i = childIndex;
    }   },
        
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