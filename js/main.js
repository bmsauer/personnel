function load(){
    if (typeof(Storage) !== "undefined") {
	if(localStorage.players){
	    players = JSON.parse(localStorage.players);
	}
	if(localStorage.teams){
	    teams = JSON.parse(localStorage.teams);
	}
    }
}

function save(){
    if (typeof(Storage) !== "undefined") {
	localStorage.players = JSON.stringify(players);
	localStorage.teams = JSON.stringify(teams);
    }
}

function reset_teams(){
    var ok = confirm("Reset teams to default?");
    if(ok === true){
	teams = teams_reset;
	save();
	change_team(current_team);
    }
}

function reset_players(){
    var ok = confirm("Reset players to default?");
    if(ok === true){
	players = players_reset;
	save();
	change_team(current_team);
    }
}
    

function validate(current_team){
    //look for duplicates on teams, highlight yellow
    //look for players stats not ok, highlight red
    var players_copy = [];
    var duplicates = [];
    for(var xx=0; xx<teams[current_team].length; xx++){
	var player_name = teams[current_team][xx][1];
	if(players_copy.indexOf(player_name) >= 0){ //duplicate
	    duplicates.push(player_name);
	}
	else{
	    players_copy.push(player_name);
	}
    }
    var position_list = $(".position-selectbox");
    position_list.each(function(index){
	var selectbox_player = $(this).val();
	if(!selectbox_player){
	    $(this).css("background-color", "white");
	    $(this).css("border", "none");
	}
	else if(duplicates.indexOf(selectbox_player) >= 0){ //duplicate
	    $(this).css("background-color", "yellow");
	    $(this).css("border", "2px solid yellow");
	}
	else if(players[selectbox_player]["status"] == "NOT OK"){
	    $(this).css("background-color", "red");
	    $(this).css("border", "2px solid red");
	}
	else {
	    $(this).css("background-color", "white");
	    $(this).css("border", "none");
	}
    });
}

function player_view(){
    $("#team_list").empty();
    for(var player in players){
	player_info = players[player];
	$("#team_list").append(
	    "<p>" + player + " #: " + player_info["number"] + " TYP: " + player_info["type"] + "</p>",
	    generate_player_status_toggle(player)
	);
    }
}
    
function change_team(team_name){
    //change the view to the team
    //params: team_name (string) : the name of the team to change to
    current_team = team_name;
    $("#team_list").empty();
    for(var xx=0; xx<teams[team_name].length; xx++){
	$("#team_list").append(
	    $("<li>").append(
		generate_player_selectbox(
		    team_name,
		    teams[team_name][xx][0],
		    teams[team_name][xx][1]
		),
		"<b>" + teams[team_name][xx][0] + "</b>"
	    )
	)
    }
    validate(current_team);
}

function generate_player_status_toggle(player_name){
    var toggle = $("<button>");
    toggle.data("player", player_name);
    toggle.html(players[player_name]["status"]);
    if(players[player_name]["status"] == "OK"){
	toggle.css("background-color", "green");
    } else{
	toggle.css("background-color", "red");
    }
    
    toggle.click(function(){
	if(players[$(this).data("player")]["status"] == "OK"){
	    $(this).css("background-color", "red");
	    players[$(this).data("player")]["status"] = "NOT OK";
	} else{
	    $(this).css("background-color", "green");
	    players[$(this).data("player")]["status"] = "OK"
	}
	toggle.html(players[$(this).data("player")]["status"]);
	save();
    });
    return toggle;
}

function generate_player_selectbox(team_name, position_name, player_name){
    //generate a list of players and return select box
    var selectbox = $('<select>');
    var html = "";
    for(var key in players){
	html = html + "<option value='" + key + "'>" + key + "</option>";
    }
    selectbox.html(html);
    selectbox.val(player_name);
    selectbox.data("position", position_name);
    selectbox.data("team", team_name);
    selectbox.addClass("position-selectbox")
    selectbox.change(function(){
	var position_array = teams[$(this).data("team")]
	for(var xx=0; xx<position_array.length; xx++){
	    if(position_array[xx][0] == $(this).data("position")){
		position_array[xx][1] = $(this).val();
	    }
	}
	validate(current_team);
	save();
    });
    return selectbox;
}
    
var teams_reset = {
    "KOR": [
	["LT",""],
	["LG",""],
	["C",""],
	["RG",""],
	["RT",""],
	["LE",""],
	["RE",""],
	["LB",""],
	["RB",""],
	["LR",""],
	["RR",""]
    ],
    "KO" : [
	["1",""],
	["2",""],
	["3",""],
	["4",""],
	["K",""],
	["5",""],
	["6",""],
	["7",""],
	["8",""],
	["9",""],
	["10",""]
	
    ],
    "P" : [
	["LT",""],
	["LG",""],
	["C",""],
	["RG",""],
	["RT",""],
	["LW",""],
	["RW",""],
	["LGU",""],
	["RGU",""],
	["PP",""],
	["P",""]
	
    ],
}
var teams = teams_reset;
	
    
var players_reset = {
    "Baines" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Chapman" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Ricky" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "Meyer" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Aug" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Terry" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Jose" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Zion" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Scooby" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Lawless" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Lanham" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Bryce" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Brady" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Jackson" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Simms" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "Pickle" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "Walpole" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Hughes" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Dy. Davidson" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "Allen" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "Isiah" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Tyler" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Snowden" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Dakotah" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "Casey" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "Kearns" : {
	"status": "OK",
	"number": "1",
	"type": "speed",
    },
    "Ferg" : {
	"status": "OK",
	"number": "1",
	"type": "big speed",
    },
    "Harry" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "D Rock" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "Derrick" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    },
    "Lanter" : {
	"status": "OK",
	"number": "1",
	"type": "big",
    }
    
}
var players = players_reset;

var current_team = "";
    
//---------------------------------------
//---------------------------------------
$(document).ready(function(){
    load();
    current_team = "KOR";
    change_team(current_team);
});
