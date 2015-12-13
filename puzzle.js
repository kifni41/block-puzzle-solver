/*
* Puzzle.js
* Author : Kifni Taufik D <kifnitaufik.gmail.com>
*/

function Puzzle(state, zero_idx, path, parent){
	this.state = state;
	this.zero_idx = zero_idx;
	this.path = path;
	this.parent = parent;
}


function solve_ucs (initial_state, goal_state) {
	var start = new Date().getTime();
	console.log('lets solve this puzzle : ucs');
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

		var initial = new Puzzle(initial_state.slice(),initial_state.indexOf(0),"",null);
		moves.push(initial);
		var queue = new PriorityQueue();
		queue.pushe(0,0);
		var visited = [initial_state.toString()];
		var idx = 0;
		var directions = ['left','right','up','down'];

		console.log(moves);

		while(found == -1){
			current_index =queue.pope();
			idx++;
			//console.log(idx);
			//console.log(moves[current_index]);
			//console.log(visited);
			for (var i = 0; i < directions.length; i++) {
				//console.log('#'+directions[i]);
				new_puzzle = action(moves[current_index],directions[i]);
				if(new_puzzle != null && visited.indexOf(new_puzzle.state.toString()) == -1 ){
					visited.push(new_puzzle.state.toString());
					new_puzzle.parent = current_index;
					moves.push(new_puzzle);
					if(new_puzzle.state.toString() === goal_state.toString()){
						found = moves.length-1;
					}else{
						queue.pushe(moves.length-1,idx);
					}


				}
			};
			// if(idx == 100){
			// 	found = "nyerah";
			// 	break;
			// }
		}
		//console.log(visited);
		var end = new Date().getTime();
		var time = end - start;
		console.log('Execution time: ' + (time/1000) +'seconds');
		console.log('visited = '+visited.length);
		console.log('moves = ' +moves.length);
		console.log('found = ' +found);
		console.log(moves[found]);


	}
}

function action(puzzle,dir)
{
	//console.log(puzzle);
	//console.log('#'+dir);
	n_state = puzzle.state.slice();
	//n_path = puzzle.path.slice();
	mod = puzzle.zero_idx % 3;
	div = parseInt(puzzle.zero_idx/3);
	//console.log('#mod='+mod+'#div='+div);
	if(dir == 'left' && mod != 0){
		new_zero = puzzle.zero_idx - 1;
	}
	else if(dir == 'right' && mod !=2){
		new_zero = puzzle.zero_idx + 1;
	}
	else if(dir == 'up' && div !=0){
		new_zero = puzzle.zero_idx - 3;
	}
	else if(dir == 'down' && div !=2){
		new_zero = puzzle.zero_idx + 3;
	}else{
		return null;
	}
	n_state = swap(n_state, puzzle.zero_idx,new_zero );
	//n_path.push(dir);
	n_puzzle = new Puzzle(n_state,new_zero, puzzle.path+"|"+dir, null);
	//console.log(n_puzzle);
	return n_puzzle;
}

function swap(p_state, old_zero, new_zero)
{
	p_state[old_zero] = p_state[new_zero];
	p_state[new_zero] = 0;

	return p_state;
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