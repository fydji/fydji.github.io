var listWarriors = document.getElementById('listWarriors');
var levelUp = document.getElementById('levelUp');
var originPage = document.getElementById('originPage');
var nextWarrior = document.getElementById('nextWarrior');
var previosWarrior = document.getElementById('previosWarrior');
var idWarrior = '';
var targetWarrior = '';
var armyList= '';
var countArmyList= '';
var warriorListByParent ='';
var targetWarriorIndex = '';
var sum = '';

if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
  console.log('this is a touch device');
} 
else {
  console.log('this is not a touch device');
  document.body.classList.add('no-touch');
}

function findDataWarrior() {
	return armyArray.filter(function(onlyOne) {
		return onlyOne.id === +idWarrior;
	});
};

function outDataWarrior() {
	$('#warriorSelected').fadeOut('300', function() {
		document.getElementById("warriorSelected").getElementsByTagName("img")[0].src ='avatars/' + targetWarrior[0].image;	
		document.getElementById("warriorSelected").getElementsByTagName("h1")[0].innerHTML =targetWarrior[0].name;		
		document.getElementById("warriorSelected").getElementsByTagName("p")[0].innerHTML = targetWarrior[0].post;
	});
	$('#warriorSelected').fadeIn(5);
};

function getChildList(currentId) {
	return armyArray.filter(function(list) {
		return list.parent === +currentId.id;
	});
};

function getChildCount(object) {
	var listChild = getChildList(object);
	if (listChild.length > 0) {
		sum += listChild.length;
		listChild.forEach(function(item) {
			object = item;
			getChildCount(item);
		});
	};
};

function outArmyList() {
	var out='';
	for (var j = 0;j < armyList.length;j++){
		sum = 0;
		getChildCount(armyList[j]);
		if (sum > 0) {
			out += '<section class="list_item" data-id="' + armyList[j].id + '">' + '<img class="item_img"' + '" src="avatars/' + armyList[j].image + '" />' + '<span class="counter" style="visibility: visible">' + sum +  '</span>' + '<span class="item"><h2 class="item_title">' + armyList[j].name + '</h2>' + '<p class="item_description">' + armyList[j].post + '</p>' + '</section>';
			}
		else {
			out += '<section class="list_item" data-id="' + armyList[j].id + '">' + '<img class="item_img"' + '" src="avatars/' + armyList[j].image + '" />' + '<span class="counter" style="visibility: hidden">' + sum +  '</span>' + '<span class="item"><h2 class="item_title">' + armyList[j].name + '</h2>' + '<p class="item_description">' + armyList[j].post + '</p>' + '</section>';
			}
	}
	$('#listWarriors').fadeOut('300', function() {
		document.getElementById('listWarriors').innerHTML = out; 
		});
	$('#listWarriors').fadeIn(300);
};

listWarriors.onclick = function(event) {
	var target = event.target;
	var targetSection = target.closest('section');
	if (!targetSection) return;
	if (!listWarriors.contains(targetSection)) return;
	idWarrior = targetSection.getAttribute('data-id');
	targetWarrior = findDataWarrior();
	outDataWarrior();
	armyList = getChildList(targetWarrior[0]);
	outArmyList();
	$('#previosWarrior, #nextWarrior').fadeOut('10', function() {
		document.getElementById('previosWarrior').style= "visibility: visible";
		document.getElementById('nextWarrior').style= "visibility: visible";
		document.getElementById('levelUp').style= "visibility: visible";
	});
};

function getOriginPage() {
	$("article").fadeOut('10', function() {
		document.getElementById("warriorSelected").getElementsByTagName("h1")[0].innerHTML = "Galactic Empire";		
		document.getElementById("warriorSelected").getElementsByTagName("p")[0].innerHTML = "Imperial military";
		document.getElementById("warriorSelected").getElementsByTagName("img")[0].src ='avatars/empire.png';
		 });
	$("article").fadeIn(5);
	armyList = getOriginList();
	outArmyList();
	$('#previosWarrior, #nextWarrior').fadeOut('10', function() {
		document.getElementById('previosWarrior').style= "visibility: hidden";
		document.getElementById('nextWarrior').style= "visibility: hidden";
		document.getElementById('levelUp').style= "visibility: hidden";
	});	
};

originPage.onclick = function(event) {
	getOriginPage();
};

levelUp.onclick = function(event) {
	if (targetWarrior[0].parent === undefined) {
		getOriginPage();
		}
	else {
		idWarrior = targetWarrior[0].parent;
		targetWarrior = findDataWarrior();
		outDataWarrior();
		armyList = getChildList(targetWarrior[0]);
		outArmyList()};
};

function getOriginList() {
	return armyArray.filter(function(noParent) {
		return noParent.parent === undefined;
	});
};

function getWarriorListByParent () {
	if (targetWarrior[0].parent === undefined) {
		warriorListByParent = getOriginList();
		}
	else {
		return warriorListByParent = armyArray.filter(function(listW) {
			return listW.parent === +targetWarrior[0].parent;
		});
	}
};

function getWarriorId () {	
	return targetWarriorIndex = warriorListByParent.findIndex(function(warId) {
		return warId.id === +targetWarrior[0].id;
	});
};

nextWarrior.onclick = function(event) {
	getWarriorListByParent ();
	getWarriorId ();
	if ( targetWarriorIndex < warriorListByParent.length - 1) {
		targetWarriorIndex++;}
	else {
		targetWarriorIndex = 0;
	}
	idWarrior = warriorListByParent[targetWarriorIndex].id;
	targetWarrior = findDataWarrior();
	outDataWarrior();
	armyList = getChildList(targetWarrior[0]);
	outArmyList();
};	

previosWarrior.onclick = function(event) {
	getWarriorListByParent ();
	getWarriorId ();
	if ( targetWarriorIndex > 0) {
		targetWarriorIndex--;}
	else {
		targetWarriorIndex = warriorListByParent.length - 1;
	}
	idWarrior = warriorListByParent[targetWarriorIndex].id;
	targetWarrior = findDataWarrior();
	outDataWarrior();
	armyList = getChildList(targetWarrior[0]);
	outArmyList();
};
