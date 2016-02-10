$(document).ready(function(){
  window.minesweeper.addGrid();
  window.minesweeper.render();
  window.minesweeper.addMines();
});

window.minesweeper = window.minesweeper || {};

window.minesweeper.render = function(){
  $('section').append('<div id=menubar></div>')
  $('#menubar').append('<button id=displaymenu onclick=window.minesweeper.displaymenu()>Game</button>');
  $('section').append('<ul id=menu><li>Reset</li><li>Settings</li></ul>'); 
  $('section').append('<div id=mainbar><div id=flagleft class=infobox></div><div id=smile></div><div id=time class=infobox></div>'); 
  $('section').append('<div id=board></div>'); 
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


window.minesweeper.addGrid = function() {
  gridHeight = 10;
  gridWidth = 10; 
  minesNumber = 10;
  grid = [];
  flagLeft = 10;
  gridMines = [];

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
  $('#board').append("<div class=row id="+index+"></div>");
});

window.minesweeper.render.addCell = (function(i,j,val) {
  $('#'+i+'').append("<div id="+i+j+" class='cell cell-no-"+j+"' onclick=window.minesweeper.check("+i+","+j+")>"+val+"</div>"); 
});

window.minesweeper.addMines = (function() {
arrayMines = [];

  for ( var i = 0; arrayMines.length < minesNumber; i++) {
     first = Math.floor((Math.random() * 9) );  
     second = Math.floor((Math.random() * 9) );  
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
   document.getElementById(''+i+''+j+'').innerHTML = "<p>&#128163;</p>";
   document.getElementById(''+i+''+j+'').style.background = '#E4E4E4'
   document.getElementById(''+i+''+j+'').className += " checked" 
  }
  else if ( gridMines[i][j] == 0)  {
    arrayCheck = [];
    arrayCheck.push(i,j); 
    window.minesweeper.checkEMPTY(arrayCheck, arrayCheck);
    document.getElementById(''+i+''+j+'').style.background = '#E4E4E4'
    document.getElementById(''+i+''+j+'').className += " checked" 
  }
  else {
    document.getElementById(''+i+''+j+'').style.background = '#E4E4E4'
    document.getElementById(''+i+''+j+'').innerHTML = "<p>"+gridMines[i][j]+"</p>";
    document.getElementById(''+i+''+j+'').className += " checked" 
  };
  
});

window.minesweeper.createMinesGrid = (function() {
   for ( var i = 0; i < gridHeight; i++) {
    for ( var j = 0; j < gridWidth; j++) {
      minesTouched = 0;   
      window.minesweeper.checkUP(i,j);
      window.minesweeper.checkDOWN(i,j);
      window.minesweeper.checkLEFT(i,j);
      window.minesweeper.checkRIGHT(i,j);
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
  if ( i == 9 ) {
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
  if ( j == 9 ) {
    return;
  } else {
    if ( gridMines[i][j+1] == "m"    ) {
      minesTouched ++;
    };
  }
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
  globalArray = arr.slice(0);
  window.minesweeper.checkemptyup(globalArray); 
  window.minesweeper.checkemptydown(globalArray);
  window.minesweeper.checkemptyleft(globalArray); 
  window.minesweeper.checkemptyright(globalArray); 
});

window.minesweeper.checkemptyup = (function(array) {

  localArr = array.slice(0);

  for ( var i = 0; i < localArr.length; i += 2 ) {
    if ((localArr[i]) > 0) { 
      // up
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
    if ((localArr[i]) < 9) { 
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
    if ((localArr[i+1]) < 9) { 
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
