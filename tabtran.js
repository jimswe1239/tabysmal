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

    tabRows = transposer(tabRows,num);
    for(i = 0; i < Math.min(tabRows.length,6); i++) {
		output += tabRows[i]+"<br>";
	}
    
    document.getElementById("tranResArea").innerHTML = output+"</div>";
}

function transposer(arr,num){

    num = parseInt(num);
    stringNumber = arr.length;
    rowFlags = [];
    skipFlags = [];
    for (var i = 0; i < stringNumber; i++) {
        skipFlags.push(false);
    }
    for (var i = 0; i < stringNumber; i++) {
        rowFlags.push(-99);
    }
    defaultState = rowFlags;
    retArr = [];    
    for (var i = 0; i < stringNumber; i++) {
        retArr.push("");
    }
    totalRows = arr[0].length;
    
    var noDash = skipFlags.slice();
    for(i = 0; i < totalRows; i++){
        for(j = 0; j<stringNumber; j++){
            if (!skipFlags[j]){
                c = arr[j][i];
                d = arr[j][i+1];
                if (c >= '0' && c <= '9'){
                    if(d >= '0' && d <= '9'){
                        rowFlags[j] = parseInt(c)*10+parseInt(d);
                        skipFlags[j] = true;
                    }
                    else{
                        rowFlags[j] = parseInt(c);
                    }
                }
                else{
                    rowFlags[j] = c;
                }
            }
            else{
                rowFlags[j] = '';
                skipFlags[j] = false;
            }
        }
        delayDash = noDash.slice();
        for(j = 0; j<stringNumber; j++){
            if (Number.isInteger(rowFlags[j]) && rowFlags[j] > -1){
                result = rowFlags[j] + num;
                retArr[j] += result>=0?result:"?";
                if ((rowFlags[j] > 9) && (result < 10)){
                    retArr[j] += '-';
                }
                else if ((rowFlags[j] < 10) && (result > 9)){
                    noDash[j] = true;
                    for (var y = j; y < noDash.length; y++){
                        if (Number.isInteger(rowFlags[y])){
                            noDash[y] = true;
                        }
                        if(rowFlags[y]<10){
                            delayDash[y] = true;
                        }
                    }
                    for(var x = 0; x < noDash.length; x++){
                        if (!noDash[x]){
                            delayDash[x] = false;
                            retArr[x] += '-';
                            noDash[x] = false;
                        }
                    }
                }
                
            }
            else{
                retArr[j] += rowFlags[j];
            }
        }
        for(var x = 0; x < delayDash.length;x++){
            if(delayDash[x]){
                retArr[x] += "-"
            }
        }
        noDash = skipFlags.slice();

    }
    return retArr;
}


function mainLoad(){
    
}
