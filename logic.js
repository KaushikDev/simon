var arrBtnIds=["btnRed", "btnGreen", "btnBlue", "btnYellow", "btnPink", "btnGray"];
var rand;
var playAICount=1;
var playHumanCount=0;
var playAIArray=[];
var playHumanArray=[];
var buttonPressed=0;
var clickedId="";
var flag;
var score;
var t, t1, t2;

function init(){
// document.getElementById("btnBlue").disabled= true;
// document.getElementById("btnRed").disabled= true;
// document.getElementById("btnGreen").disabled= true;
// document.getElementById("btnYellow").disabled= true;
document.getElementById("finalMsg").innerHTML="SIMON GAME";

document.getElementById("scoreInput").innerHTML="SCORE : --";
document.getElementById("scoreInput").disabled=true;
document.getElementById("btnStart").innerHTML="Start";

arrBtnIds=["btnRed", "btnGreen", "btnBlue", "btnYellow"];
rand=0;
playAICount=1;
playHumanCount=0;
playAIArray=[];
playHumanArray=[];
buttonPressed=0;
clickedId="";
flag=false;
clearInterval(t);
clearInterval(t1);
}

function start(){

if(document.getElementById("btnStart").innerHTML==="Start"){
document.getElementById("btnBlue").disabled= false;
document.getElementById("btnRed").disabled= false;
document.getElementById("btnGreen").disabled= false;
document.getElementById("btnYellow").disabled= false;
document.getElementById("btnStart").innerHTML="Stop";
document.getElementById("finalMsg").innerHTML="LEVEL : 1";
document.getElementById("scoreInput").disabled=false;
document.getElementById("scoreInput").innerHTML="SCORE : 00";
playAIArray=[];
playHumanArray=[];
playAI();
}
else if(document.getElementById("btnStart").innerHTML==="Stop"){
init();
}

else if(document.getElementById("btnStart").innerHTML==="Restart"){
init();
}


}

function rules(){
//document.getElementById("btnStrict").style.background="orange";
}

function playAI(){
playAIArray=[];
if(playAICount===10){
console.log("game over");
document.getElementById("finalMsg").innerHTML="Hello Genius !! Now prove you're God !!";
document.getElementById("btnStart").click();
}
else
console.log("now AI's turn to play");
sequence(playAICount, function(){
 console.log('playAIArray is : ');
console.log(playAIArray);
playHuman();
});
}


function waitForHumanToClick(val, callback){
var x=0;
t = setInterval(function(){
console.log("waiting for user to click the damn button");
if(buttonPressed===1){ //change this condition to acknowledge button press

playHumanArray.push(clickedId);
x++;
buttonPressed=0;
console.log("x : " + x);
console.log("buttonPressed : "+buttonPressed);
if(x >= val){
clearInterval(t);
callback && callback();
}
}
 },(500));
} 

function playHuman(){
playHumanArray=[];
buttonPressed=0;
console.log("now human's turn to play");
waitForHumanToClick(playAICount,  function(){
test();
});
}

function test(){
console.log("playAIArray length is : "+playAIArray.length);
console.log('playAIArray is : ');
console.log(playAIArray);
console.log("playHumanArray length is : "+playHumanArray.length);
console.log("playHumanArray is : ");
console.log(playHumanArray);
for(var i=0;i<playAIArray.length;i++){
if(playAIArray[i]===playHumanArray[i]){
flag=true;
}
else{
flag=false;
}
}
console.log("compare flag is :" + flag);
if((playHumanArray.length===playAIArray.length) && (flag===true)){
console.log("round # "+playAICount+" clear. Proceed to next round"); // feed scoring here
document.getElementById("finalMsg").innerHTML="LEVEL : " + (playAICount+1);
document.getElementById("scoreInput").innerHTML="SCORE : "+(playAICount*5);
playAICount++;
playAI();
}
else if((playHumanArray.length===playAIArray.length) && (flag!=true)){
console.log("human loses"); //feed losing buzzer here
document.getElementById("finalMsg").innerHTML="GAME OVER";
var audio = document.getElementById("audio5");
       audio.play();
// document.getElementById("scoreInput").innerHTML='--';
document.getElementById("btnStart").innerHTML="Restart";
}
}

function sequence(val, callback){
//works like charm inside this // comment
var counter=0;
t1 = setInterval(function(){
rand=getRandomBtnId(0,3);
document.getElementById(arrBtnIds[rand]).click();

playAIArray.push(arrBtnIds[rand]);
counter++;
buttonPressed=0;
if(counter>=val){ //changed 10 to i
clearInterval(t1);
callback && callback();
}
    },(1000));   //sequence will run a bit slow i.e. every 2500 milliseconds, it will be reduuced after every 4 sequences i.e. 5th sequence will be faster, 9th will be fastest. 
// charming code ;)
}

function getRandomBtnId(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
}

function highlightFor(id,color,seconds){
 buttonPressed=1;
 clickedId=id;
 console.log(clickedId);
    var element = document.getElementById(id);
    var origcolor = element.style.backgroundColor;
    element.style.backgroundColor = color;
	//
	switch(id){
	case "btnRed":
	var audio = document.getElementById("audio1");
       audio.play();
	   break;
	case "btnGreen":
	var audio = document.getElementById("audio2");
       audio.play();
	   break;
	   case "btnBlue":
	var audio = document.getElementById("audio3");
       audio.play();
	   break;
	   case "btnYellow":
	var audio = document.getElementById("audio4");
       audio.play();
	   break;
   
	}
	//
    t2 = setTimeout(function(){
       element.style.backgroundColor = origcolor;
    },(seconds*1000));
}
