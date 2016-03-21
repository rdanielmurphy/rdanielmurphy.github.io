var faces = [];

//--- ADD FACES HERE --- 
faces.push({"image" : "face1", "dragon" : "1", "nest" : "2", "next" : ["face6", "face7", "face8", "face9", "face10"]});
faces.push({"image" : "face2", "dragon" : "1", "nest" : "3", "next" : ["face1", "face5", "face7", "face9", "face2"]});
faces.push({"image" : "face3", "dragon" : "2", "nest" : "4", "next" : ["face2", "face4", "face1", "face16", "face16"]});
faces.push({"image" : "face4", "dragon" : "2", "nest" : "5", "next" : ["face3", "face3", "face10", "face15", "face14"]});
faces.push({"image" : "face5", "dragon" : "2", "nest" : "1", "next" : ["face4", "face16", "face13", "face14", "face15"]});
faces.push({"image" : "face6", "dragon" : "3", "nest" : "2", "next" : ["face5", "face16", "face11", "face13", "face1"]});
faces.push({"image" : "face7", "dragon" : "3", "nest" : "3", "next" : ["face10", "face13", "face15", "face12", "face11"]});
faces.push({"image" : "face8", "dragon" : "3", "nest" : "4", "next" : ["face16", "face11", "face16", "face10", "face7"]});
faces.push({"image" : "face9", "dragon" : "5", "nest" : "1", "next" : ["face16", "face12", "face9", "face11", "face15"]});
faces.push({"image" : "face10", "dragon" : "1", "nest" : "1", "next" : ["face12", "face15", "face1", "face6", "face13"]});
faces.push({"image" : "face11", "dragon" : "1", "nest" : "2", "next" : ["face11", "face10", "face2", "face7", "face14"]});
faces.push({"image" : "face12", "dragon" : "2", "nest" : "2", "next" : ["face10", "face9", "face3", "face8", "face15"]});
faces.push({"image" : "face13", "dragon" : "3", "nest" : "4", "next" : ["face9", "face8", "face4", "face9", "face16"]});
faces.push({"image" : "face14", "dragon" : "1", "nest" : "3", "next" : ["face8", "face7", "face6", "face10", "face1"]});
faces.push({"image" : "face15", "dragon" : "5", "nest" : "3", "next" : ["face7", "face6", "face5", "face11", "face12"]});
faces.push({"image" : "face16", "dragon" : "1", "nest" : "3", "next" : ["face9", "face1", "face2", "face15", "face6"]});
//--- STOP ADDING FACES ---

var firstFaces = [];
firstFaces.push(faces[0]);
firstFaces.push(faces[1]);
firstFaces.push(faces[2]);
firstFaces.push(faces[3]);
firstFaces.push(faces[4]);