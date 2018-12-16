function hideAll(){
	document.getElementById("home").style.display = "none";
    document.getElementById("transposer").style.display = "none";
    document.getElementById("notes").style.display = "none";
    document.getElementById("help").style.display = "none";
}

function showOnly(idVal){
	hideAll();
	document.getElementById(idVal).style.display = "block";
}

function transposeTab(){
    var tab = document.getElementById("tranTab").value;
	var num = document.getElementById("tranNum").value;
    
    var tabRows = tab.split("\n");
    var output = "<div class='tab'>";
    
    tabRows = tabRows.filter(function(value){return value.length > 0;});
    for(i = 0; i < tabRows.length; i++) {
		tabRows[i] = tabRows[i].trim();
	}
    
    tabRows = transposer(tabRows,num);
    for(i = 0; i < tabRows.length; i++) {
		output += tabRows[i]+"<br>";
	}
    
    document.getElementById("tranResArea").innerHTML = output+"</div>";
}

function transposer(arr,num){

    num = parseInt(num);
    stringNumber = arr.length;
    totalRows = arr[0].length;
    skipFlag = false;
    caseVal = -1;
    
    rowFlags = [];
    for (var i = 0; i < stringNumber; i++) {
        rowFlags.push(-99);
    }
    modRows = [];
    for (var i = 0; i < stringNumber; i++) {
        modRows.push(-99);
    }
    defaultState = rowFlags.slice();
    
    retArr = [];
    for (var i = 0; i < stringNumber; i++) {
        retArr.push("");
    }
    
    for(i = 0; i < totalRows; i++){
        for(j = 0; j<stringNumber; j++){
            c = arr[j][i];
            d = arr[j][i+1];
            if (c >= '0' && c <= '9'){
                if(d >= '0' && d <= '9'){
                    rowFlags[j] = parseInt(c)*10+parseInt(d);
                }
                else{
                    rowFlags[j] = parseInt(c);
                }
            }
            else{
                rowFlags[j] = c;
            }
        }
        
        for(j = 0; j<stringNumber; j++){
            if(Number.isInteger(rowFlags[j])){
                newVal = (rowFlags[j] + num);
                if(newVal >= 0){
                    modRows[j] = newVal.toString();
                }
                else{
                    modRows[j] = "?"
                }
                rowFlags[j] = (rowFlags[j]).toString();
            }
            else{
                modRows[j] = rowFlags[j];
            }
        }
        
        caseVal = -1;
        
        for(j = 0; j<stringNumber; j++){
            if(rowFlags[j].length == modRows[j].length && rowFlags[j].length == 1){
                caseVal = Math.max(caseVal,0);
            }
            else if(rowFlags[j].length < modRows[j].length){
                caseVal = Math.max(caseVal,1);
            }
            else{
                caseVal = 2;
            }
        }
        
        if (caseVal == 0){
            for(j = 0; j<stringNumber; j++){
                retArr[j] += modRows[j];
            }
        }
        else{
            for(j = 0; j<stringNumber; j++){
                if(modRows[j].length == 2){
                    retArr[j] += modRows[j];
                }
                else{
                    retArr[j] += modRows[j] + '-';
                }
            }
        }
        if(caseVal == 2){
            i++;
        }
        

    }
    return retArr;
}

function noteTab(){
    var tab = document.getElementById("noteTabArea").value;
    
    var tabRows = tab.split("\n");
    var output = "<div class='tab'>";
    
    tabRows = tabRows.filter(function(value){return value.length > 0;});
    for(i = 0; i < tabRows.length; i++) {
		tabRows[i] = tabRows[i].trim();
	}
    tabRows = noter(tabRows);
    for(i = 0; i < tabRows.length; i++) {
		output += tabRows[i]+"<br>";
	}
    
    document.getElementById("noteResArea").innerHTML = output+"</div>";
}

function noteShift(start,current){
    start = start.charAt(0).toUpperCase() + start.slice(1);
    var dict = {
        "Ab": "G#",
        "Bb": "A#",
        "Cb": "B",
        "Db": "C#",
        "Eb": "D#",
        "Fb": "E",
        "Gb": "F#",
    };
    vals = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
    init = vals.indexOf(start);
    if (init == -1){
        init = vals.indexOf(dict[start]);
    }
    return vals[(init + current)%12];
    
}

function noter(arr){

    stringNumber = arr.length;
    totalRows = arr[0].length;
    skipFlag = false;
    caseVal = -1;
    noteStarts = []
    for (var i = 0; i < stringNumber; i++) {
        noteStarts.push(arr[i][0]);
    }
    for (var i = 0; i < stringNumber; i++) {
        if(arr[i][1] == "b" || arr[i][1] == "#"){
            noteStarts[i]+=arr[i][1];
        }
    }
    
    rowFlags = [];
    for (var i = 0; i < stringNumber; i++) {
        rowFlags.push(-99);
    }
    modRows = [];
    for (var i = 0; i < stringNumber; i++) {
        modRows.push(-99);
    }
    defaultState = rowFlags.slice();
    
    retArr = [];
    for (var i = 0; i < stringNumber; i++) {
        retArr.push("");
    }
    
    for(i = 0; i < totalRows; i++){
        for(j = 0; j<stringNumber; j++){
            c = arr[j][i];
            d = arr[j][i+1];
            if (c >= '0' && c <= '9'){
                if(d >= '0' && d <= '9'){
                    rowFlags[j] = parseInt(c)*10+parseInt(d);
                }
                else{
                    rowFlags[j] = parseInt(c);
                }
            }
            else{
                rowFlags[j] = c;
            }
        }
        
        for(j = 0; j<stringNumber; j++){
            if(Number.isInteger(rowFlags[j])){
                newVal = noteShift(noteStarts[j],rowFlags[j]);
                modRows[j] = newVal;
                
                rowFlags[j] = (rowFlags[j]).toString();
            }
            else{
                modRows[j] = rowFlags[j];
            }
        }
        
        caseVal = -1;
        
        for(j = 0; j<stringNumber; j++){
            if(rowFlags[j].length == modRows[j].length && rowFlags[j].length == 1){
                caseVal = Math.max(caseVal,0);
            }
            else if(rowFlags[j].length < modRows[j].length){
                caseVal = Math.max(caseVal,1);
            }
            else{
                caseVal = 2;
            }
        }
        
        if (caseVal == 0){
            for(j = 0; j<stringNumber; j++){
                retArr[j] += modRows[j];
            }
        }
        else{
            for(j = 0; j<stringNumber; j++){
                if(modRows[j].length == 2){
                    retArr[j] += modRows[j];
                }
                else{
                    retArr[j] += modRows[j] + '-';
                }
            }
        }
        if(caseVal == 2){
            i++;
        }
        

    }
    return retArr;
}



function mainLoad(){
    
}
