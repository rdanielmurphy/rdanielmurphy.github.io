var sourceOfDrag = undefined;
var currentItems = [];
var facesMap = {};
var currentScore = 0;
var faceInNest = undefined;
var faceInDragon = undefined;

function dragStart(ev) {
   ev.dataTransfer.effectAllowed='move';
   ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
   ev.dataTransfer.setDragImage(ev.target,0,0);
   sourceOfDrag = ev.target.getAttribute('index');
            
   return true;
}
         
function dragEnterNest(ev) {
   event.preventDefault();
   return true;
}        
function dragOverNest(ev) {
   event.preventDefault();
   return true;
}     
function dragDropNest(ev) {
   addScore(currentItems[sourceOfDrag].nest);
   addFaceToNest(currentItems[sourceOfDrag]);

   return false;
}
function dragEnterDragon(ev) {
   event.preventDefault();
   return true;
}        
function dragOverDragon(ev) {
   event.preventDefault();
   return true;
}     
function dragDropDragon(ev) {
   addScore(currentItems[sourceOfDrag].dragon);
   addFaceToDragon(currentItems[sourceOfDrag]);

   return false;
}

window.onload = function() {
   setOriginialState();

   $(".dot").click(function(){
      var index = $(this).attr('index');

      var items = [];
      for (var i = 0; i < currentItems[index].next.length; i++)
         items.push(facesMap[currentItems[index].next[i]]);
      setItems(items);
   });
};

function setOriginialState() {
   setItems(firstFaces);

   //make faces map
   for (var i = 0; i < faces.length; i++)
      facesMap[faces[i].image] = faces[i];
};

function setItems(items) {
   currentItems = items;

   setBackground(currentItems[0], '#firstdot');
   setBackground(currentItems[1], '#seconddot');
   setBackground(currentItems[2], '#thirddot');
   setBackground(currentItems[3], '#fourthdot');
   setBackground(currentItems[4], '#fifthdot');
};

function setBackground(item, dot) {
   if (item != faceInDragon && item != faceInNest)
      $(dot).css('background-image', "url('../nestdragongame/faces/" + item.image + ".png')");
   else
      $(dot).css('background-image', "");
}

function addScore(newScore) {
   currentScore += parseInt(newScore);

   $("#score").text(currentScore);
}

function addFaceToNest(face) {
   faceInNest = face;
   $('#nest-face').css('background-image', "url('../nestdragongame/faces/" + faceInNest   .image + ".png')");
   resetCarousel();
}

function addFaceToDragon(face) {
   faceInDragon = face;
   $('#dragon-face').css('background-image', "url('../nestdragongame/faces/" + faceInDragon.image + ".png')");
   resetCarousel();
}

function resetCarousel() {
   setItems(currentItems);
   console.log("RESET");
}
