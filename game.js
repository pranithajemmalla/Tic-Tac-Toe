var gameBoard=$('<table id="board"></table>');
var rows=3;
var cols=3;
var turn='X';
var turnCount=0;
var winner='-1';
var moves=new Array(rows*cols);
var currentMove=0;
var latest_move=0;
$(document).ready(function(){

    var startButton=$('#startButton');

    startButton.click(function(){
        $('#player')[0].innerHTML=turn;
        $('#welcomePage').hide()
        $('#gameboard').show()
        initialiseGameBoard();
    });
    $('#forward').click(forward);
    $('#backward').click(backward);

});
var initialiseGameBoard=function( ){

    for(var i=0;i<rows;i++){
        var row=$('<tr></tr>');
        for(var j=0;j<cols;j++){
            var cell=$('<td id="'+(rows*i +(j)+1)+'"></td>');
            cell.click(function(){
                $(this)[0].innerHTML=turn;
                makeMove($(this).attr('id'));
                $('#player')[0].innerHTML=turn;
                turnCount++;
                $(this).off('click');
                if(isGameOver() ||isWon()!='-1' ){

                    $('#gameboard').css('pointer-events','none');
                    displayMessage();
                    $(this).delay(10000).queue(function(){
                        window.location.reload();
                    })

                }
                changeTurn();
            });
            row.append(cell);
        }
        gameBoard.append(row);
    }
    $('#gameboard').append(gameBoard);
};
var changeTurn=function(){
    if(turn=='X') turn='O';
    else turn='X';
}
function isWon(){
    var table=$('#board')[0].children;

    var board=new Array();
    for(var i=0;i<rows;i++){
       var row=new Array();
        for(var j=0;j<cols;j++){

            row.push(table[i].children[j].innerHTML);
        }
        board.push(row);
    }
    if(board[0][0]==board[0][1] && board[0][0]==board[0][2] && board[0][0]!==""){
        winner=board[0][0];
        return winner;
    }
    if(board[0][0]==board[1][1] && board[0][0]==board[2][2] && board[0][0]!==""){
        winner=board[0][0];
        return winner;
    }
    if(board[0][0]==board[1][0] && board[0][0]==board[2][0] && board[0][0]!==""){
        winner=board[0][0];
        return winner;
    }
    if(board[0][2]==board[1][1] && board[1][1]==board[2][0] && board[0][2]!==""){
        winner=board[0][2];
        return winner;
    }if(board[1][1]==board[2][1] && board[1][1]==board[0][1] && board[0][1]!==""){
        winner=board[0][1];
        return winner;
    }if(board[1][0]==board[1][1] && board[1][0]==board[1][2] && board[1][0]!==""){
        winner=board[1][0];
        return winner;
    }
    if(board[2][0]==board[2][1] && board[2][0]==board[2][2] && board[2][0]!==""){
        winner=board[2][0];
        return winner;
    }
    if(board[0][2]==board[1][2] && board[0][2]==board[2][2] && board[0][2]!==""){
        winner=board[0][2];
        return winner;
    }
       return winner;

}
function isGameOver(){
    return turnCount===9;
}
function displayMessage(){
    $('#winMessage').show();
    if(winner!=='-1'){
        $('#endMessage')[0].innerHTML=winner+" WINS";
    }else{
        $('#endMessage')[0].innerHTML="GAME IS DRAW";
    }

}
function makeMove(id){
    moves[currentMove]=id;
    latest_move=currentMove;
    currentMove++;

}
function backward(){
   if(currentMove){
    currentMove--;
    var id = moves[currentMove]
    turnCount--;
    $('#'+id)[0].innerText="";
    $('#'+id).on('click');
    changeTurn();
   }

}
function forward(){
    if(currentMove<=latest_move){
        var id=moves[currentMove];
        currentMove++;
       $('#'+id)[0].innerText=turn;
        changeTurn;
        changeTurn();
    }

    var id=moves[currentMove]
}
