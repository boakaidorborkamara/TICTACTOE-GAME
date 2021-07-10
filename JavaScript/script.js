// Global Vriable 
let player_options_section = document.getElementById("player-options-section");
let instructions_section = document.getElementById("instructions-section");
let read_instructions_btn = document.getElementById("read-instructions-btn");
let hide_instructions_btn = document.getElementById("hide-instructions-btn");
let player_name_selection_section = document.getElementById("player-name-selection-section");
console.log(player_name_selection_section);
// let player_x_btn = document.getElementById("player-X");
// let player_o_btn = document.getElementById("player-O");
let one_player_btn = document.getElementById("one-player-btn");
let two_player_btn = document.getElementById("two-player-btn");
let back_btn = document.getElementById("back-btn");
console.log(one_player_btn);
let selected_player_mode = null;

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

function selectPlayerMode(){
    if(player_options_section.style.display !== "none"){
        console.log("working");
        player_options_section.style.display = "none";
        player_name_selection_section.style.display = "flex";
        selectPlayerMode = one_player_btn.innerHTML;
        console.log(selectPlayerMode);
    }
    else
    {
        player_options_section.style.display = "flex";
        player_name_selection_section.style.display = "none";
        selectPlayerMode = null;
        console.log(selectPlayerMode);
    }
}

//envoking hide n show game instructions functions on these button
read_instructions_btn.addEventListener('click', hideAndShowGameInstructions);
hide_instructions_btn.addEventListener('click', hideAndShowGameInstructions);

one_player_btn.addEventListener('click', selectPlayerMode);
two_player_btn.addEventListener('click', selectPlayerMode );
back_btn.addEventListener('click', selectPlayerMode);