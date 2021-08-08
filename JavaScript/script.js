// section containing options for game mode, either to play the computer or another human
let player_options_section = document.getElementById("player-options-section");

//the btn that enable player select one player option which make them to play the computer
let one_player_btn = document.getElementById("one-player-btn");

//the btn that enable player select two player option which make them to play another human
let two_player_btn = document.getElementById("two-player-btn");

// the btn that take you back to section containing the player section 
let back_btn = document.getElementById("back-btn");

// section containing the game instructions 
let instructions_section = document.getElementById("instructions-section");

// the btn that enable you to read the instructions 
let read_instructions_btn = document.getElementById("read-instructions-btn");

// the btn that enable you hide the game instructions after reading
let hide_instructions_btn = document.getElementById("hide-instructions-btn");

// section containing options for players names 
let player_name_selection_section = document.getElementById("player-name-selection-section");

//player X
let player_one = document.getElementById("player-X");

// player O 
let player_two = document.getElementById("player-O");


// section for players to play the game 
let game_board = document.getElementById("game-board");

let all_boxes = document.querySelectorAll(".box");
console.log(all_boxes);

//stores the game mode the user selected, either to play computer or another human
let selected_player_mode = null;



function executeGame(){
    //show game instructions
    read_instructions_btn.addEventListener('click', hideAndShowGameInstructions);

    //hide game instructions
    hide_instructions_btn.addEventListener('click', hideAndShowGameInstructions);

    //select single player mode
    one_player_btn.addEventListener('click', selectPlayerMode);

    //select two player mode
    two_player_btn.addEventListener('click', selectPlayerMode );

    //go back to home
    back_btn.addEventListener('click', selectPlayerMode);

    //select prefer name, either X or O
    player_one.addEventListener("click", selectPlayerName);
    player_two.addEventListener("click", selectPlayerName);
    
}

// this function hide and show the game instructions
function hideAndShowGameInstructions(){
    if(player_options_section.style.display !== "none"){
        player_options_section.style.display = "none";
        instructions_section.style.display = "flex";
        
    }
    else if(instructions_section.style.display === "flex"){
        instructions_section.style.display = "none";
        player_options_section.style.display = "flex";
    } 
}

//enable user to select if they want to play the computer or another human
function selectPlayerMode(e){
    if(player_options_section.style.display !== "none"){
        console.log("working");
        player_options_section.style.display = "none";
        player_name_selection_section.style.display = "flex";
        selected_player_mode = e.target.innerText;
        console.log(selected_player_mode);
    }
    else
    {
        player_options_section.style.display = "flex";
        player_name_selection_section.style.display = "none";
        selected_player_mode = null;
        console.log(selected_player_mode);
    }
}

// enable user to select prefer name by clicking X or O 
function selectPlayerName(e){
    // current name that the user selected 
    let clicked_name = e.target.innerText;

    // give the clicked name to player name and the unclicked name to player two 
    if(clicked_name === "X"){
        player_one = clicked_name;
        player_two = "O";
    }
    else if(clicked_name === "O"){
        player_one = clicked_name;
        player_two = "X";
    }
    hidePlayerNameSection();
}

//hide the section containing the Player names options
function hidePlayerNameSection(){
    player_name_selection_section.style.display =  "none";
    game_board.style.display = "grid";
}

function humanPlay(){
    all_boxes.forEach((box)=>{
        box.addEventListener("click", (e)=>{
            let box_selected_by_human = e.target;
            console.log("human selected box", box_selected_by_human.innerText)
            box_selected_by_human.innerHTML = player_one;
            
            setTimeout(() => {
                computerPlay();
            }, 2000);
            
        })
    })  
}
humanPlay();

function computerPlay(){
    let index_of_box_selected_by_computer = Math.floor(Math.random() * 9);
    let box_selected_by_computer = all_boxes[index_of_box_selected_by_computer]; 
    box_selected_by_computer.innerHTML = player_two;
    console.log("computer selected box", index_of_box_selected_by_computer);
}

// function playGame(){
//     console.log("play game fnx is running");
//     humanPlay();
//     // setTimeout(() => {
//     //     computerPlay();
//     // }, 2000);
    
// }



//envoking game executer function
executeGame();


