function getHistory() {
    return document.getElementById("history-value").innerText;
}

function printHistory(num) {
        document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    if (num=='') {
        document.getElementById("output-value").innerText = num;
    }
    else {
        document.getElementById("output-value").innerText = formatted(num);
    }
}


function formatted(num) {
    var n = Number(num);
    var m = n.toLocaleString("en");
    return m;
}

function unformate(num) {
    return Number(num.replace(/,/g, ""));
}

var evaluated=false;
var operator = document.getElementsByClassName("operator");

function clearScreen(){
    printHistory('');
    printOutput('');
    evaluated = false;
}

function backspace(){
    if(!evaluated){
        var newOutput = unformate(getOutput());
        newOutput = newOutput.toString();
        if (newOutput) {
            newOutput = newOutput.substring(0, newOutput.length - 1);
            printOutput(newOutput);
        }
    }
}

function numPressed(num){
    let output = unformate(getOutput());
    if (output != NaN && !evaluated) {
        output += num;
        printOutput(output);
    }
}

function evaluate(){
    if (getOutput() != '' && !evaluated) {
        let history = getHistory();
        history += unformate(getOutput());
        
        let result = eval(history);
        printOutput(result);
        history += '=';
        printHistory(history);
        evaluated = true;
    }
}

function operation(op){
    if (getOutput() != '') {
        let output = getOutput();
        let history = getHistory();
        output = unformate(output);
        history += output;
        if (!evaluated) {
            history += op;
            printHistory(history);
            printOutput(''); 
        }
        else{
            printHistory(output+op);
            printOutput('');
            evaluated=false;
        }
    }
}

for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == 'clear') {
            clearScreen()
        }
        else if (this.id == 'backspace') {
            backspace();
        }
        else if(this.id == '='){
            evaluate();
        }
        else{
            operation(this.id);
        }
    });
    operator[i].addEventListener('keydown', function(e) {
        e.preventDefault();
    });
}


var number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function (e) {
        numPressed(this.id);
    });
    number[i].addEventListener('keydown',function(e) {
        e.preventDefault();
    });
}

window.addEventListener('keydown', function (e) {
    let output = unformate(getOutput());
    if (output != NaN) {
        if ((e.keyCode - 95) > 0 && (e.keyCode - 97) < 9) {
            let num = (e.keyCode - 96).toString();
            numPressed(num);
        }
        if(e.keyCode==107 || e.keyCode==109 || e.keyCode==106 || e.keyCode==111){
            let op = String.fromCharCode(e.keyCode-64);
            operation(op);
        }
        if(e.keyCode==13 || e.keyCode == 187){
            evaluate();
        }
        if(e.keyCode == 8){
            backspace();
        }
        if(e.keyCode == 46){
            clearScreen();
        }
    }
}
);


