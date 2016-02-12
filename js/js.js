$(document).ready(function(){
  window.minesweeper.setlvl("init");
  window.minesweeper.addGrid();
  window.minesweeper.render();
  window.minesweeper.addMines();
  window.minesweeper.timer();
});

window.minesweeper = window.minesweeper || {};

window.minesweeper.timer = function(){
  time  ++;
  document.getElementById('time').innerHTML = '<p>'+time+'</p>';
   timer =  window.setTimeout(window.minesweeper.timer, 1000);
}; 

window.minesweeper.render = function(){
  $('section').append('<div id=menubar></div>')
  $('#menubar').append('<button id=displaymenu onclick=window.minesweeper.displaymenu()>Game</button>');
  $('section').append('<ul id=menu><li onclick=window.minesweeper.reset()>Reset</li><li onclick=window.minesweeper.settings()  >Settings</li></ul>'); 
  $('section').append('<div id=mainbar><div id=flagleft class=infobox></div><div id=smile onclick=window.minesweeper.reset()></div><div id=time class=infobox></div>'); 
  $('section').append('<div id=board></div>'); 
  $('section').append('<div id=settings><button onclick=window.minesweeper.setlvl("easy")>EASY</button><button onclick=window.minesweeper.setlvl("medium")>MEDIUM</button><button onclick=window.minesweeper.setlvl("hard")>HARD</button></div>');
  document.getElementById('smile').innerHTML = '<p>&#x263a;</p>';
  $('section').append('<div id=fail><p>GAME OVER</p></div>');

  document.getElementById('flagleft').innerHTML = '<p>'+flagLeft+'</p>';


  $(function() {
    $( "#menu" ).menu();
  });

  $('#grid').empty();
  grid.forEach(window.minesweeper.render.addRow);


  for ( var i = 0; i < gridHeight; i++) {
    for ( var j = 0; j < gridWidth; j++) {
      window.minesweeper.render.addCell(i,j,grid[i][j]); 
    };
  };

};

window.minesweeper.displaymenu = function(){
  $('#menu').toggle()
};

window.minesweeper.reset = function(){
  $('section').empty();
  flagLeft = gridHeight;
  clearTimeout(timer);
  window.minesweeper.addGrid();
  window.minesweeper.render();
  window.minesweeper.addMines();
  window.minesweeper.timer();
  $('.cell').css("width", ""+100/gridHeight+"%");
  $('.row').css("height", ""+100/gridHeight+"%");
  $('.row').css("font-size", ""+100/gridHeight/2+"vh");

};

window.minesweeper.settings = function() {
  $('#settings').toggle();
  $('#menu').toggle()
};

window.minesweeper.setlvl = function(level) {
  if ( level == "init") {
    gridHeight = 10;
    gridWidth = 10; 
    minesNumber = 10;
    flagLeft = 10; 
    $('.cell').css("width", "10%");
    $('.row').css("height", "10%");
  } else if ( level == "easy" ) {
    gridHeight = 10;
    gridWidth = 10; 
    minesNumber = 10;
    flagLeft = 10; 
    reset();
  } else if ( level == "medium" ) {
    gridHeight = 15;
    gridWidth = 15; 
    minesNumber = 25;
    flagLeft = 15; 
    $('.cell').css("width", "5%");
    $('.row').css("height", "5%");
    reset();
  } else if ( level == "hard" ) {
    gridHeight = 30;
    gridWidth = 30; 
    minesNumber = 50;
    flagLeft = 50; 
    $('.cell').css("width", "2%");
    $('.row').css("height", "2%");
    reset();
  };
  
  reset = function() {
    $('#settings').toggle();
    $('#menu').toggle()
    window.minesweeper.reset();
  };
};

window.minesweeper.addGrid = function() {
  grid = [];
  gridMines = [];
  time = 0;

  for ( var i = 0; i < gridHeight; i++) {
    grid.push([]);
    gridMines.push([]);
   for ( var j = 0; j < gridWidth; j++) {
      grid[i].push("");
      gridMines[i].push("");
    }
  }
  
};

window.minesweeper.render.addRow = (function(element, index, array) {
  $('#board').append("<div class=row id=row-"+index+"></div>");
});

window.minesweeper.render.addCell = (function(i,j,val) {
  $('#row-'+i+'').append("<div id="+i+'x'+j+" class='cell cell-no-"+j+"' onclick=window.minesweeper.check("+i+","+j+")>"+val+"</div>"); 
});

window.minesweeper.addMines = (function() {
arrayMines = [];

  for ( var i = 0; arrayMines.length < minesNumber; i++) {
     first = Math.floor((Math.random() * gridHeight) );  
     second = Math.floor((Math.random() * gridHeight) );  
    if ( arrayMines.join('x').includes(''+first+','+second+'') ) {
      i--;
    }
    else  {
      arrayMines.push([]);
      arrayMines[i].push(first,second);
      gridMines[first][second] = "m";
      console.log(arrayMines[i]);
    };
    
  }
    console.log(arrayMines.join("x"));
  window.minesweeper.createMinesGrid();
});

window.minesweeper.check = (function(i,j) {
  if ( arrayMines.join('x').includes(''+i+','+j+'') ) {
    document.getElementById(''+i+'x'+j+'').innerHTML = "<p>&#128163;</p>";
    document.getElementById(''+i+'x'+j+'').style.background = '#E4E4E4';
    document.getElementById(''+i+'x'+j+'').className += " checked";
    window.minesweeper.gameover("fail");
  }
  else if ( gridMines[i][j] == 0)  {
    arrayCheck = [];
    arrayCheck.push(i,j); 
    window.minesweeper.checkEMPTY(arrayCheck, arrayCheck);
    document.getElementById(''+i+'x'+j+'').style.background = '#E4E4E4'
    document.getElementById(''+i+'x'+j+'').className += " checked" 
  }
  else {
    document.getElementById(''+i+'x'+j+'').style.background = '#E4E4E4'
    document.getElementById(''+i+'x'+j+'').innerHTML = "<p>"+gridMines[i][j]+"</p>";
    document.getElementById(''+i+'x'+j+'').className += " checked" 
  };
  
   window.minesweeper.checkWin();  

});

window.minesweeper.createMinesGrid = (function() {
   for ( var i = 0; i < gridHeight; i++) {
    for ( var j = 0; j < gridWidth; j++) {
      minesTouched = 0;   
      window.minesweeper.checkUP(i,j);
      window.minesweeper.checkDOWN(i,j);
      window.minesweeper.checkLEFT(i,j);
      window.minesweeper.checkRIGHT(i,j);
      window.minesweeper.checkEDGES(i,j);
      if ( gridMines[i][j] == "m" ) {
      } else {
        gridMines[i][j] = minesTouched;
      };
    };
  };
});

window.minesweeper.checkUP = (function(i,j) {
  if ( i == 0 ) {
    return;
  } else {
    if ( gridMines[i-1][j] == "m"    ) {
      minesTouched ++;
    };
  }
});

window.minesweeper.checkDOWN = (function(i,j) {
  if ( i == gridHeight - 1) {
    return;
  } else {
    if ( gridMines[i+1][j] == "m"    ) {
      minesTouched ++;
    };
  }
});

window.minesweeper.checkLEFT = (function(i,j) {
  if ( j == 0 ) {
    return;
  } else {
    if ( gridMines[i][j-1] == "m"    ) {
      minesTouched ++;
    };
  }
});

window.minesweeper.checkRIGHT = (function(i,j) {
  if ( j == gridHeight -1 ) {
    return;
  } else {
    if ( gridMines[i][j+1] == "m"    ) {
      minesTouched ++;
    };
  }
});

window.minesweeper.checkEDGES = (function(i,j) {
  if ( i == 0 || j == 0 ) { //up-left
  } else {
    if ( gridMines[i-1][j-1] == "m"    ) {
      minesTouched ++;
    };
  };

  if ( i == 0 || j == gridHeight-1 ) { //up-right
  } else {
    if ( gridMines[i-1][j+1] == "m"    ) {
      minesTouched ++;
    };
  };

  if ( i == gridHeight-1 || j == gridHeight-1 ) { //down-right
  } else {
    if ( gridMines[i+1][j+1] == "m"    ) {
      minesTouched ++;
    };
  };

  if ( i == gridHeight-1 || j == 0 ) { //down-left
  } else {
    if ( gridMines[i+1][j-1] == "m"    ) {
      minesTouched ++;
    };
  };
});

$(document).on("contextmenu", ".cell", (function(event) {
    console.log(this);
    var clickId = this.getAttribute("id"); 
    console.log(clickId);
    $('#'+clickId+'').toggleClass('flag');
    console.log(this.getAttribute('class').includes('flag'));

    if ( this.getAttribute('class').includes('flag') && !this.getAttribute('class').includes('checked')) {
      flagLeft --
    } else if ( !this.getAttribute('class').includes('flag') && !this.getAttribute('class').includes('checked')) {
      flagLeft ++
    };
    document.getElementById('flagleft').innerHTML = '<p>'+flagLeft+'</p>'
    return false;
}));

window.minesweeper.checkEMPTY = (function(arr, tempArr) {
  tempArray = tempArr.slice(0); 
  tempArray2 = tempArr.slice(0); 
  tempArray.push("x");
  globalArray = arr.slice(0);

  localArr = arr.slice(0);
  window.minesweeper.checkEMPTY2(localArr);  

  for ( var i = 0; i < tempArray2.length; i = i+2 ) {
    document.getElementById(''+tempArray2[i]+'x'+tempArray2[i+1]+'').style.background = '#E4E4E4'
    document.getElementById(''+tempArray2[i]+'x'+tempArray2[i+1]+'').className += " checked" 
    document.getElementById(''+tempArray2[i]+'x'+tempArray2[i+1]+'').innerHTML = "<p>"+gridMines[(tempArray2[i])][tempArray2[i+1]]+"</p>";
    if ( $('#'+tempArray2[i]+'x'+tempArray2[i+1]+'').attr('class').includes('flag') ) {
      flagLeft ++;
      document.getElementById('flagleft').innerHTML = '<p>'+flagLeft+'</p>'
    }
  };
});

window.minesweeper.checkEMPTY2 = (function(localArr){
length = localArr.length 
console.log(localArr);
  if ( localArr[0] > 0 ) {
    if ( Number.isInteger(gridMines[(localArr[0])-1][localArr[1]]) && !tempArray.join('').includes(''+(localArr[0]-1)+''+localArr[1]+'') ) {
      if (gridMines[(localArr[0])-1][localArr[1]] == 0 ) {
        tempArray.push(localArr[0]-1,localArr[1], "x");
        tempArray2.push(localArr[0]-1,localArr[1]);
        localArr.push(localArr[0]-1,localArr[1]);
      } else {
        tempArray.push(localArr[0]-1,localArr[1], "x");
        tempArray2.push(localArr[0]-1,localArr[1]);
      };
    };
  }; 

  if (  localArr[0] < gridHeight-1 ) {
    if ( Number.isInteger(gridMines[(localArr[0])+1][localArr[1]]) && !tempArray.join('').includes(''+(localArr[0]+1)+''+localArr[1]+'') )  {
      if (gridMines[(localArr[0])+1][localArr[1]] == 0 ) {
        tempArray.push(localArr[0]+1,localArr[1], "x");
        tempArray2.push(localArr[0]+1,localArr[1]);
        localArr.push(localArr[0]+1,localArr[1]);
      } else {
        tempArray.push(localArr[0]+1,localArr[1], "x");
        tempArray2.push(localArr[0]+1,localArr[1]);
      };
    };
  }; 

  if ( localArr[1] > 0 ) {
    if ( Number.isInteger(gridMines[localArr[0]][(localArr[1])-1]) &&  !tempArray.join('').includes(''+(localArr[0])+''+(localArr[1]-1)+'') )  {
      if (gridMines[(localArr[0])][localArr[1]-1] == 0 ) {
        tempArray.push(localArr[0],localArr[1]-1, "x");
        tempArray2.push(localArr[0],localArr[1]-1);
        localArr.push(localArr[0],localArr[1]-1);
      } else {
        tempArray.push(localArr[0],localArr[1]-1, "x");
        tempArray2.push(localArr[0],localArr[1]-1);
      };
    };
  };

  if ( localArr[1] < gridHeight-1 ) { 
    if ( Number.isInteger(gridMines[localArr[0]][(localArr[1])+1]) &&  !tempArray.join('').includes(''+(localArr[0])+''+(localArr[1]+1)+'') ) {
      if (gridMines[(localArr[0])][localArr[1]+1] == 0 ) {
        tempArray.push(localArr[0],localArr[1]+1, "x");
        tempArray2.push(localArr[0],localArr[1]+1);
        localArr.push(localArr[0],localArr[1]+1);
      } else {
        tempArray.push(localArr[0],localArr[1]+1, "x");
        tempArray2.push(localArr[0],localArr[1]+1);
      };
    };
  }; 

  localArr.splice(0,2);
  if (localArr.length > 0 ) {
    window.minesweeper.checkEMPTY2(localArr);  
  };
});
 /*
window.minesweeper.checkemptyup = (function(array) {

  localArr = array.slice(0);

  for ( var i = 0; i < localArr.length; i += 2 ) {
    if ((localArr[i]) > 0) { 
      if ( gridMines[(localArr[i])-1][localArr[i+1]] == 0 ) {
        if ( tempArray.join('x').includes(''+(localArr[i])-1+','+localArr[i+1]+'') ) {
          console.log('broked');
          break;
        } else {
          tempArray.push(localArr[i]-1,localArr[i+1]);
          localArr.push(localArr[i]-1,localArr[i+1]);
          console.log('arrelseUP',localArr.length, localArr);
          document.getElementById(''+localArr[i]-1+''+localArr[i+1]+'').style.background = '#E4E4E4'
          document.getElementById(''+localArr[i]-1+''+localArr[i+1]+'').className += " checked" 
          localArr.splice(0,2);
        };
      }  else if ( gridMines[(localArr[i])-1][localArr[i+1]] > 0 && gridMines[(localArr[i])-1][localArr[i+1]] < 5 )  {
        document.getElementById(''+localArr[i]-1+''+localArr[i+1]+'').style.background = '#E4E4E4'
        document.getElementById(''+localArr[i]-1+''+localArr[i+1]+'').className += " checked" 
        document.getElementById(''+localArr[i]-1+''+localArr[i+1]+'').innerHTML = "<p>"+gridMines[(localArr[i])-1][localArr[i+1]]+"</p>";
        localArr.splice(0,2);
      };  
    } else {
        localArr.splice(0,2);
    };  
  };

  if ( localArr.length > 0 ) {
    window.minesweeper.checkemptyup(localArr);
  };
});

window.minesweeper.checkemptydown = (function(array) {

  localArr = array.slice(0);

  for ( var i = 0; i < localArr.length; i += 2 ) {
    if ((localArr[i]) < gridHeight - 1) { 
      if ( gridMines[(localArr[i])+1][localArr[i+1]] == 0 ) {
        if ( tempArray.join('x').includes(''+(localArr[i])+1+','+localArr[i+1]+'') ) {
          console.log('broked');
          break;
        } else {
          tempArray.push(localArr[i]+1,localArr[i+1]);
          localArr.push(localArr[i]+1,localArr[i+1]);
          console.log('arrelseDOWN',localArr.length, localArr);
          console.log(localArr[i],localArr[i+1]);
          console.log(document.getElementById(localArr[i]+1+''+localArr[i+1]));
          document.getElementById(localArr[i]+1+''+localArr[i+1]).style.background = '#E4E4E4'
          document.getElementById(localArr[i]+1+''+localArr[i+1]).className += " checked" 
          localArr.splice(0,2);
        };
      }  else if ( gridMines[(localArr[i])+1][localArr[i+1]] > 0 && gridMines[(localArr[i])+1][localArr[i+1]] < 5 )  {
        document.getElementById(localArr[i]+1+''+localArr[i+1]).style.background = '#E4E4E4'
        document.getElementById(localArr[i]+1+''+localArr[i+1]).className += " checked" 
        document.getElementById(localArr[i]+1+''+localArr[i+1]).innerHTML = "<p>"+gridMines[(localArr[i])+1][localArr[i+1]]+"</p>";
        localArr.splice(0,2);
      };  
    } else {
        localArr.splice(0,2);
    };  
  };

  if ( localArr.length > 0 ) {
    window.minesweeper.checkemptydown(localArr);
  };
});

window.minesweeper.checkemptyleft = (function(array) {
  localArr = array.slice(0);
  console.log('left', tempArray, localArr);
  for ( var i = 0; i < localArr.length; i += 2 ) {
    if ((localArr[i+1]) > 0) { 
      if ( gridMines[localArr[i]][(localArr[i+1])-1] == 0 ) {
        if ( tempArray.join('x').includes(''+localArr[i]+','+localArr[i+1]-1+'') ) {
          console.log('broked');
          localArr.splice(0,2);
          break;
        } else {
          tempArray.push(localArr[i],localArr[i+1]-1);
          localArr.push(localArr[i],localArr[i+1]-1);
          console.log('arrelseDOWN',localArr.length, localArr);
          console.log(localArr[i],localArr[i+1]);
          console.log(document.getElementById(localArr[i]+''+localArr[i+1]-1));
          document.getElementById(localArr[i]+''+(localArr[i+1]-1)).style.background = '#E4E4E4'
          document.getElementById(localArr[i]+''+(localArr[i+1]-1)).className += " checked 1" 
          localArr.splice(0,2);
        };
      }  else if ( gridMines[localArr[i]][(localArr[i+1])-1] > 0 && gridMines[localArr[i]][(localArr[i+1])-1] < 5 )  {
        document.getElementById(localArr[i]+''+(localArr[i+1]-1)).style.background = '#E4E4E4'
        document.getElementById(localArr[i]+''+(localArr[i+1]-1)).className += " checked 2" 
        document.getElementById(localArr[i]+''+(localArr[i+1]-1)).innerHTML = "<p>"+gridMines[localArr[i]][localArr[i+1]-1]+"</p>";
        localArr.splice(0,2);
      };  
    } else {
        localArr.splice(0,2);
    };  
  };

  if ( localArr.length > 0 ) {
    window.minesweeper.checkemptyleft(localArr);
  };
});

window.minesweeper.checkemptyright = (function(array) {
  localArr = array.slice(0);
  console.log('right', tempArray, localArr);
  for ( var i = 0; i < localArr.length; i += 2 ) {
    if ((localArr[i+1]) < gridHeight - 1) { 
      if ( gridMines[localArr[i]][(localArr[i+1])+1] == 0 ) {
        if ( tempArray.join('x').includes(''+localArr[i]+','+localArr[i+1]+1+'') ) {
          console.log('broked');
          localArr.splice(0,2);
          break;
        } else {
          tempArray.push(localArr[i],localArr[i+1]+1);
          localArr.push(localArr[i],localArr[i+1]+1);
          console.log('arrelseDOWN',localArr.length, localArr);
          console.log(localArr[i],localArr[i+1]);
          console.log(document.getElementById(localArr[i]+''+localArr[i+1]+1));
          document.getElementById(localArr[i]+''+(localArr[i+1]+1)).style.background = '#E4E4E4'
          document.getElementById(localArr[i]+''+(localArr[i+1]+1)).className += " checked" 
          localArr.splice(0,2);
        };
      }  else if ( gridMines[localArr[i]][(localArr[i+1])+1] > 0 && gridMines[localArr[i]][(localArr[i+1])+1] < 5 )  {
        document.getElementById(localArr[i]+''+(localArr[i+1]+1)).style.background = '#E4E4E4'
        document.getElementById(localArr[i]+''+(localArr[i+1]+1)).className += " checked" 
        document.getElementById(localArr[i]+''+(localArr[i+1]+1)).innerHTML = "<p>"+gridMines[localArr[i]][localArr[i+1]+1]+"</p>";
        localArr.splice(0,2);
      };  
    } else {
        localArr.splice(0,2);
    };  
  };

  if ( localArr.length > 0 ) {
    window.minesweeper.checkemptyright(localArr);
  };
});
*/

window.minesweeper.gameover = function(status) {
  $('#fail').toggle();
  if ( status == "fail" ) {
    document.getElementById('smile').innerHTML = '<p>&#9760;</p>';
  } else {
    document.getElementById('fail').innerHTML = '<p>You won!</p>';
    document.getElementById('smile').innerHTML = '<p>&#9996;</p>';
  };
};

window.minesweeper.checkWin = function() {
checkedFields = 0;

  for ( var i = 0; i < gridHeight; i++) {
    for ( var j = 0; j < gridWidth; j++) {
      if ( gridMines[i][j] != "m" && $('#'+i+'x'+j+'').attr('class').includes('checked') ) {
        checkedFields++;         
      };
    };
  };

  if ( checkedFields == ( gridHeight * gridHeight)  - minesNumber ) {
    window.minesweeper.gameover("win"); 
  };
};

    
