chars = ["園","迎","簡","益","大","诶","比","西","迪","伊","弗","吉","尺",,"杰","开","艾","勒","马","娜"];
allStreams = [];
textCol1 = "#2355dd";
textCol2 = "#e83272";
style = 0;
rainbow = 0;
tgCtrl = 1;
var i = 0;

/* ----- Settings ----- */
// Time Delay between String Spawn
minStringDelay = 100;
maxStringDelay = 300;

// Nr. of Chars for Strings
minStringLength = 4;
maxStringLength = 16;

// Speed of the Char-Strings (Lower = Faster)
minStringSpeed = 1;
maxStringSpeed = 2.5;
/* ----- Settings END ----- */

// Rainbow Color Function
R1 = 255;G1 = 0;B1 = 0;R2 = 0;G2 = 255;B2 = 0;
var c1 = [R1, G1, B1];var c2 = [R2, G2, B2];
function upG() { // Don't even think about it (My RGB Function from: https://codepen.io/Tibixx/pen/VyBJJg)
  if (c1[0] == 255 && c1[1] < 255 && c1[2] == 0){c1[1] += 1;
  }if (c1[0] > 0 && c1[1] == 255 && c1[2] == 0){c1[0] -= 1;
  }if (c1[0] == 0 && c1[1] == 255 && c1[2] < 255){c1[2] += 1;
  }if (c1[0] == 0 && c1[1] > 0 && c1[2] == 255){c1[1] -= 1;
  }if (c1[0] < 255 && c1[1] == 0 && c1[2] == 255){c1[0] += 1;
  }if (c1[0] == 255 && c1[1] == 0 && c1[2] > 0){c1[2] -= 1;
  }if (c2[0] == 255 && c2[1] < 255 && c2[2] == 0){c2[1] += 1;
  }if (c2[0] > 0 && c2[1] == 255 && c2[2] == 0){c2[0] -= 1;
  }if (c2[0] == 0 && c2[1] == 255 && c2[2] < 255){c2[2] += 1;
  }if (c2[0] == 0 && c2[1] > 0 && c2[2] == 255){c2[1] -= 1;
  }if (c2[0] < 255 && c2[1] == 0 && c2[2] == 255){c2[0] += 1;
  }if (c2[0] == 255 && c2[1] == 0 && c2[2] > 0){c2[2] -= 1;}
  
  var col1 = "rgb(" + c1.toString() + ")";
  var col2 = "rgb(" + c2.toString() + ")";
  textCol1 = col1;
  textCol2 = col2;
}

// Create a String with random Chars
function matrixString(){
  ranTime = Math.floor(Math.random() * maxStringDelay + minStringDelay);
  ranLen = Math.floor(Math.random() * maxStringLength + minStringLength);
  leftPos = Math.floor(Math.random() * $("#text-output").width() + 0);
  // leftPosRounded = Math.round(Math.floor(Math.random() * $("#text-output").width() + 0) / 30) * 30;
  
  singleStream = [];
  for(j=0; j<ranLen;j++){
    ranChar = Math.floor(Math.random() * chars.length + 0);
    singleStream[j] = chars[ranChar];
  }
  
  // 2 different Nodes for the Colors
  if($(".matrixString").length % 2 == 0){
    $("#text-output").append("<div style='color:" + textCol1 + "; text-shadow: 0px 0px 15px " + textCol1 + ", 0px 0px 10px " + textCol1 + ", 0px 0px 5px " + textCol1 + "; top:-500px; left:" + leftPos + "px' class='matrixString ms-col1'>" + singleStream.join("") + "</div>");
  } else {
    $("#text-output").append("<div style='color:" + textCol2 + "; text-shadow: 0px 0px 15px " + textCol2 + ", 0px 0px 10px " + textCol2 + ", 0px 0px 5px " + textCol2 + "; top:-500px; left:" + leftPos + "px' class='matrixString ms-col2'>" + singleStream.join("") + "</div>");
  }
  
  // Remove the finished Strings
  $('.matrixString').each(function(i, obj) {
    if($(this).offset().top > 1500){
      $(this).remove();
    }
  });
  
  // Recursive Function Call with a randomized Delay
  setTimeout(function() {
    i++;
    // Make sure there are not too many Nodes
    if ($(".matrixString").length < 200) {
      matrixString();
    } else {
      $(".matrixString:lt(2)").remove();
      matrixString();
    }
  }, ranTime);
  
  // Animate the Strings
  minStringSpeed2 = minStringSpeed * 10000; maxStringSpeed2 = maxStringSpeed * 10000;
  ranSpeed = Math.floor(Math.random() * maxStringSpeed2 + minStringSpeed2);
  $(".matrixString").animate({ "top": "1500px" }, ranSpeed );
}
matrixString();

// The Style-Swap Logic
$("#swap").click(function(){
  if(style == 0){ // Default Style
    $(this).text("Default Style");
    $("#cp-bg").fadeOut(300);
    chars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
    textCol1 = "#42f45f";
    textCol2 = "#42f45f";
    style = 1;
  } else { // Cyberpunk Matrix
    $(this).text("Cyberpunk Style");
    $("#cp-bg").fadeIn(300);
    chars = ["園","迎","簡","益","大","诶","比","西","迪","伊","弗","吉","尺",,"杰","开","艾","勒","马","娜"];
    textCol1 = "#2355dd";
    textCol2 = "#e83272";
    style = 0;
  }
});

// Rainbow Mode Logic
$("#rainbow").click(function(){
  if(rainbow == 0){
    $(this).text("Rainbow Mode: ON");
    intervalId = setInterval(upG, 100);
    rainbow = 1;
  } else {
    $(this).text("Rainbow Mode: OFF");
    clearInterval(intervalId);
    if(style == 1){
      textCol1 = "#42f45f";
      textCol2 = "#42f45f";
    } else {
      textCol1 = "#2355dd";
      textCol2 = "#e83272";
    }
    rainbow = 0;
  }
});

// Toggle the Controls
tgCtrl = 1;
$("#toggleControls").click(function(){
  if(tgCtrl == 1){
    $("#controls").animate({"height": "24px", "width": "24px"}, 200);
    tgCtrl = 0;
  } else {
    $("#controls").animate({"height": "100px", "width": "200px"}, 200);
    tgCtrl = 1;
  }
});