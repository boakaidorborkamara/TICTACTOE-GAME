// global variables 
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

//all the boxes on the game board
let all_boxes = document.querySelectorAll(".box");
console.log(all_boxes);

let first_player_name_in_score_board = document.getElementById("first-player-name-in-score-board");

let second_player_name_in_score_board = document.getElementById("second-player-name-in-score-board");

//btn to enable user reset the game
let reset_game_btn = document.getElementById("reset-btn");

//btn to enable user play another set of game without reseting previous game info
let play_again_btn = document.getElementById("play-agian-btn");

//storing first player score
let first_player_score = 0;

//storing second player score
let second_player_score = 0;

//stores the game mode the user selected, either to play computer or another human
let selected_player_mode = null;

//keep track of the available empty box left
let box_counter = 9;

let player_tern = 1;



function executeGame(){
    //show game instructions
    read_instructions_btn.addEventListener('click', hideAndShowGameInstructions);

    //hide game instructions
    hide_instructions_btn.addEventListener('click', hideAndShowGameInstructions);

    //select single player mode
    one_player_btn.addEventListener('click', selectPlayerMode);

    //select two player mode
    two_player_btn.addEventListener('click', selectPlayerMode );

    //costumize player name in score board section base upon the player mode
    player_one.addEventListener("click", costumizePlayerScoreBaseOnGameMode);
    player_two.addEventListener("click", costumizePlayerScoreBaseOnGameMode);

    //go back to home
    back_btn.addEventListener('click', selectPlayerMode);

    //select prefer name, either X or O
    player_one.addEventListener("click", selectPlayerName);
    player_two.addEventListener("click", selectPlayerName);
    
    //enable both players to play each other
    humanPlay();

    //erasing every save info about previous game and setting everything over
    reset_game_btn.addEventListener("click", resetGame);

    //enable game to be play again saving previous score
    play_again_btn.addEventListener("click", playGameAgain);


    // code for two human mode 
    // humanTwoPlay();
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

// allow human to play by selecting a box 
function humanPlay(){
    // make human player the first active player 
    first_player_name_in_score_board.style.borderBottom = "1px dotted orange";

    //track if human has win or not
    let win_status = checkIfPlayerOneWin();

    // enable human to click in every empty box 
    all_boxes.forEach((box)=>{
        box.addEventListener("click", (e)=>{
            if(selected_player_mode === "PLAY COMPUTER")
            {
                //box selected by human
                let box_selected_by_human = e.target;

                //keep track if it is the computer tern or not
                let computer_tern = false;

                //visually notify the user that it is human tern by hightlighting the score
                highlightActivePlayerScore();

                //update win status on every click human execute
                win_status = checkIfPlayerOneWin();


                // check if the selected box has already been played in, before occupying
                if(checkIfBoxIsFilled(box_selected_by_human) === 0 && win_status === 1){
                    console.log("human selected box", box_selected_by_human.innerText)
                    box_selected_by_human.innerHTML = player_one;
                    box_selected_by_human.style.color = "orange";

                    //keep checking if human has won after every click executed
                    checkIfPlayerOneWin();
                    // reduce box counter to indicate the amount of box left 
                    box_counter--


                    win_status = checkIfPlayerOneWin();

                    // notify computer to play 
                    computer_tern = true;
                }
                else if(checkIfBoxIsFilled(box_selected_by_human) === 1)
                {
                    alert("Box is already occupy");
                    computer_tern = false;
                }
                else if(win_status === 0){
                    alert("GAMEOVER");
                }
                
                
                //check if game is tie
                if(box_counter === 0 && win_status === 1){
                    alert("GAME TIE")
                }

                
                //increment score
                if(win_status === 0){
                    first_player_score++
                    // console.log("first player score is now" , first_player_score);
                    incrementScore(first_player_score,first_player_name_in_score_board, "HUMAN");
                }


                // allow computer to play few second after human has played 
                if(computer_tern === true && win_status === 1 && box_counter > 1 && selected_player_mode === "PLAY COMPUTER"){
                    setTimeout(() => {
                        computerPlay();
                    }, 2000);
                    console.log("computer just played")
                }
            }
            
        })
    })  
}

//enable the computer to play against human by selecting a box
function computerPlay(){

    //hightlight computer score one it tern reaches
    highlightActivePlayerScore();

    //generated index of the box that computer want to play in
    let index_of_box_selected_by_computer = Math.floor(Math.random() * 9);

    // current box selected by the computer 
    let box_selected_by_computer = all_boxes[index_of_box_selected_by_computer]; 

    // check if the box selected by computer is not already occupied 
    if(checkIfBoxIsFilled(box_selected_by_computer) === 1 ){
       
        // keep selecting another box if the current selected box is already occupy 
        while(checkIfBoxIsFilled(box_selected_by_computer) === 1 && box_counter > 1)
        {
            //generate another random number
            index_of_box_selected_by_computer = Math.floor(Math.random() * 9);
            box_selected_by_computer = all_boxes[index_of_box_selected_by_computer]; 
        }
        
        // fill empty box with the name of the computer 
        box_selected_by_computer.innerHTML = player_two;
        
    }
    else if(checkIfBoxIsFilled(box_selected_by_computer) === 0)
    {
        box_selected_by_computer.innerHTML = player_two;
    }

    

    console.log("box selected by computer", box_selected_by_computer);
    console.log("box selected by computer innerText", box_selected_by_computer.innerText);
    console.log("player two name", player_two);
    box_selected_by_computer.style.color = "white";
    //reduce box counter to indicate the amount of box left
    box_counter--
    console.log("box counter is now", box_counter);

    let computer_win_status = checkIfPlayerTwoWin();
    console.log("computer win status is now" , computer_win_status);
    console.log("player two name is ", player_two);
    checkIfPlayerTwoWin();

    //increment score
    if(computer_win_status === 0){
        second_player_score++
        // console.log("first player score is now" , first_player_score);
        incrementScore(second_player_score , second_player_name_in_score_board, "COMPUTER");
    }
   
}

//check if the box to be play in is already occupy or not
function checkIfBoxIsFilled(selected_box){
    if(selected_box.innerText === "X" || selected_box.innerText === "O"){
        return 1;
    }
    else
    {
        return 0;
    }
}

//costumize the name of player 1 and 2 if the user is playing the computer
function costumizePlayerScoreBaseOnGameMode(){
    if(selected_player_mode === "PLAY COMPUTER"){
        first_player_name_in_score_board.innerText = "HUMAN : " + first_player_score;
        second_player_name_in_score_board.innerText = "COMPUTER : " + second_player_score;
    }
}

// highlight player score if it is their time to play 
function highlightActivePlayerScore(){
    

    if(first_player_name_in_score_board.style.borderBottom === "1px dotted orange")
    {
        first_player_name_in_score_board.style.borderBottom = "none";
        second_player_name_in_score_board.style.borderBottom = "1px dotted white";
    }
    else if(second_player_name_in_score_board.style.borderBottom === "1px dotted white")
    {
        first_player_name_in_score_board.style.borderBottom = "1px dotted orange";
        second_player_name_in_score_board.style.borderBottom = "none";
    }
}

//check if the first player has win the game
function checkIfPlayerOneWin(){
    //status that indicate if player one has won or not
    let player_one_win_status = 1;

    if(all_boxes[0].innerText === player_one && all_boxes[1].innerText === player_one && all_boxes[2].innerText === player_one)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 0 || i === 1 || i === 2 ){
                all_boxes[i].style.backgroundColor = "orange";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }
        player_one_win_status = 0;
    }
    else if(all_boxes[3].innerText === player_one && all_boxes[4].innerText === player_one && all_boxes[5].innerText === player_one)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 3 || i === 4 || i === 5 ){
                all_boxes[i].style.backgroundColor = "orange";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }
        player_one_win_status = 0;
    }
    else if(all_boxes[6].innerText === player_one && all_boxes[7].innerText === player_one && all_boxes[8].innerText === player_one)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 6 || i === 7 || i === 8 ){
                all_boxes[i].style.backgroundColor = "orange";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }
        player_one_win_status = 0;
    }
    else if(all_boxes[0].innerText === player_one && all_boxes[4].innerText === player_one && all_boxes[8].innerText === player_one)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 0 || i === 4 || i === 8 ){
                all_boxes[i].style.backgroundColor = "orange";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }
        player_one_win_status = 0;
    }
    else if(all_boxes[2].innerText === player_one && all_boxes[4].innerText === player_one && all_boxes[6].innerText === player_one)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 2 || i === 4 || i === 6 ){
                all_boxes[i].style.backgroundColor = "orange";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }
        player_one_win_status = 0;
    }
    else if(all_boxes[0].innerText === player_one && all_boxes[3].innerText === player_one && all_boxes[6].innerText === player_one)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 0 || i === 3 || i === 6 ){
                all_boxes[i].style.backgroundColor = "orange";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }
        player_one_win_status = 0;
    }
    else if(all_boxes[1].innerText === player_one && all_boxes[4].innerText === player_one && all_boxes[7].innerText === player_one)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 1 || i === 4 || i === 7 ){
                all_boxes[i].style.backgroundColor = "orange";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }
        player_one_win_status = 0;
    }
    else if(all_boxes[2].innerText === player_one && all_boxes[5].innerText === player_one && all_boxes[8].innerText === player_one)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 2 || i === 5 || i === 8 ){
                all_boxes[i].style.backgroundColor = "orange";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }
        player_one_win_status = 0;
    }

    return player_one_win_status;
}

//check if the second player has win the game
function checkIfPlayerTwoWin(){
    //status that indicate if player one has won or not
    let player_two_win_status = 1;
    // if(all_boxes[0].innerText === player_two){
    //     player_two_win_status = 0;
    // }

    if(all_boxes[0].innerText === player_two && all_boxes[1].innerText === player_two && all_boxes[2].innerText === player_two)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 0 || i === 1 || i === 2 ){
                all_boxes[i].style.backgroundColor = "white";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }

        player_two_win_status = 0;
        
    }
    else if(all_boxes[3].innerText === player_two && all_boxes[4].innerText === player_two && all_boxes[5].innerText === player_two)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 3 || i === 4 || i === 5 ){
                all_boxes[i].style.backgroundColor = "white";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }

        player_two_win_status = 0;
    }
    else if(all_boxes[6].innerText === player_two && all_boxes[7].innerText === player_two && all_boxes[8].innerText === player_two)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 6 || i === 7 || i === 8 ){
                all_boxes[i].style.backgroundColor = "white";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }

        player_two_win_status = 0;
    }
    else if(all_boxes[0].innerText === player_two && all_boxes[4].innerText === player_two && all_boxes[8].innerText === player_two)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 0 || i === 4 || i === 8 ){
                all_boxes[i].style.backgroundColor = "white";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }

        player_two_win_status = 0;
    }
    else if(all_boxes[2].innerText === player_two && all_boxes[4].innerText === player_two && all_boxes[6].innerText === player_two)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 2 || i === 4 || i === 6 ){
                all_boxes[i].style.backgroundColor = "white";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }

        player_two_win_status = 0;
    }
    else if(all_boxes[0].innerText === player_two && all_boxes[3].innerText === player_two && all_boxes[6].innerText === player_two)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 0 || i === 3 || i === 6 ){
                all_boxes[i].style.backgroundColor = "white";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }

        player_two_win_status = 0;
    }
    else if(all_boxes[1].innerText === player_two && all_boxes[4].innerText === player_two && all_boxes[7].innerText === player_two)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 1 || i === 4 || i === 7 ){
                all_boxes[i].style.backgroundColor = "white";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }

        player_two_win_status = 0;
    }
    else if(all_boxes[2].innerText === player_two && all_boxes[5].innerText === player_two && all_boxes[8].innerText === player_two)
    {
        for(let i = 0; i < all_boxes.length; i++){
            if(i === 2 || i === 5 || i === 8 ){
                all_boxes[i].style.backgroundColor = "white";
                all_boxes[i].style.color = "rgb(27, 20, 20)";
            }
        }

        player_two_win_status = 0;
    }

    // player_two_win_status = 0;
    console.log("computer win status", player_two_win_status);
    //increment score
    if(player_two_win_status === 0){
        incrementScore(second_player_score, second_player_score);
        // alert("compter win");
    }
    return player_two_win_status;
}

// increment score each time human a player win 
function incrementScore(player_score , player_score_board_name, customize_name){
    console.log("first player score is now" , player_score);
    player_score_board_name.innerText = customize_name + " : " + player_score;
    console.log("current score", player_score);
    console.log(player_score_board_name);

}


//enable user to play another game after a player has won
function playGameAgain(){
    console.log("play game again fnx is running");
    // take game board to default with the number in each bord 
    for(let i = 0; i < all_boxes.length; i++){
        all_boxes[i].innerText = i;
        all_boxes[i].style.color = "rgb(32, 23, 23)";
        all_boxes[i].style.backgroundColor = "rgb(27, 20, 20)";
    }

    //reset the box counter
    box_counter = 9;
    console.log("counter has been reset to ", box_counter);
}

//enable user to reset the game to default, erasing every save information about previous game
function resetGame(){
    window.location.reload();
}




// code for two human to play each other in PLAY HUMAN mode
//allow human player human to play by selecting a box
function humanOnePlay(){

    //track if human has win or not
    let human_one_win_status = checkIfPlayerOneWin();
    console.log("at top human one win status", human_one_win_status);

        all_boxes.forEach((box)=>{
            box.addEventListener("click", (e)=>{
                if(player_tern === 1 && selected_player_mode === "PLAY HUMAN")
                {

                    console.log("Human one code is running");
                    //box selected by human
                    let box_selected_by_human_one = e.target;
        
                    //visually notify the user that it is human tern by hightlighting the score
                    highlightActivePlayerScore();
        
                    //update win status on every click human execute
                    player_two_win_status = checkIfPlayerOneWin();
        
                
    
                    // check if the selected box has already been played in, before occupying
                    if(checkIfBoxIsFilled(box_selected_by_human_one) === 0 && human_one_win_status === 1){
                        console.log("human one win status", human_one_win_status);
                        console.log("human selected box", box_selected_by_human_one.innerText)
                        box_selected_by_human_one.innerHTML = player_one;
                        box_selected_by_human_one.style.color = "orange";
        
                        //keep checking if human has won after every click executed
                        checkIfPlayerOneWin();
                        // reduce box counter to indicate the amount of box left 
                        box_counter--
        
        
                        player_two_win_status = checkIfPlayerOneWin();
                    }
                    else if(checkIfBoxIsFilled(box_selected_by_human) === 1)
                    {
                        alert("Box is already occupy in human one fnx");
                    }
                    else if(player_two_win_status === 0){
                        alert("GAMEOVER");
                    }
                    
                    //check if game is tie
                    if(box_counter === 0 && player_two_win_status === 1){
                        alert("GAME TIE")
                    }
        
                    
                    //increment score
                    if(human_one_win_status === 0){
                        first_player_score++
                        // console.log("first player score is now" , first_player_score);
                        incrementScore(first_player_score,first_player_name_in_score_board, "FIRST PLAYER");
                    }

                    // notify human player two to play 
                    player_tern = 2;
                    console.log("player tern is now", player_tern);

                }
            })
        })  
    

    
    
}

//allow human player two to play by selecting a box
function humanTwoPlay(){

    //track if human has win or not
    let human_two_win_status ;

        all_boxes.forEach((box)=>{
            box.addEventListener("click", (e)=>{
                if(player_tern === 2 && selected_player_mode === "PLAY HUMAN")
                {

                    console.log("Human two code is running");
                    //box selected by human
                    let box_selected_by_human_two = e.target;
        
                    //visually notify the user that it is human tern by hightlighting the score
                    highlightActivePlayerScore();
        
                    //on every click done by human player two, check if player two win
                    human_two_win_status = checkIfPlayerTwoWin();
        
                
    
                    // check if the selected box has not been played in, before playing in it
                    if(checkIfBoxIsFilled(box_selected_by_human_two) === 0 && human_two_win_status === 1){
                        console.log("human two win status", human_two_win_status);
                        console.log("human selected box", box_selected_by_human_two.innerText)
                        box_selected_by_human_two.innerHTML = player_two;
                        box_selected_by_human_two.style.color = "white";
        
                        //keep checking if human has won after every click executed
                        checkIfPlayerTwoWin();
                        // reduce box counter to indicate the amount of box left 
                        box_counter--
        
        
                        player_two_win_status = checkIfPlayerOneWin();

                        // notify player one to play 
                        player_tern = 1;
                        console.log("player tern is now", player_tern);
                    }
                    else if(checkIfBoxIsFilled(box_selected_by_human_two) === 1)
                    {
                        alert("Box is already occupy in player two fnx");
                    }
                    else if(player_two_win_status === 0){
                        alert("GAMEOVER");
                    }
                    
                    //check if game is tie
                    if(box_counter === 0 && player_two_win_status === 1){
                        alert("GAME TIE")
                    }
        
                    
                    //increment score
                    if(human_two_win_status === 0){
                        second_player_score++
                        // console.log("first player score is now" , first_player_score);
                        incrementScore(first_player_score,first_player_name_in_score_board, "SECON PLAYER");
                    }

                    

                }
            })
        })  
    

    
    
}

// humanOnePlay();
// humanTwoPlay();






//envoking game executer function
executeGame();


