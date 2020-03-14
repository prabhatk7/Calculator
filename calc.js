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
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id == 'clear') {
            printHistory('');
            printOutput('');
            evaluated=false;
        }
        else if (this.id == 'backspace') {

            var newOutput = unformate(getOutput());
            newOutput = newOutput.toString();

            if (newOutput) {
                newOutput = newOutput.substring(0, newOutput.length - 1);
                printOutput(newOutput);
            }
        }
        else {
            if (getOutput() != '') {
                let output = getOutput();
                let history = getHistory();
                output = unformate(output);
                history += output;
                if (!evaluated) {
                    if (this.id == '=') {
                        let result = eval(history);
                        printOutput(result);
                        history += '=';
                        printHistory(history);
                        evaluated = true;
                    }
                    else  {
                        history += this.id;
                        printHistory(history);
                        printOutput('');
                    }
                }
                else{
                    printHistory(output+this.id);
                    printOutput('');
                    evaluated=false;
                }
            }
        }


    });
}


var number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        let output = unformate(getOutput());
        if (output != NaN) {
            output += this.id;
            printOutput(output);
            
        }
    });
}
window.addEventListener('keydown', function (e) {
    let output = unformate(getOutput());
    console.log(e.keyCode);
    if (output != NaN) {
        if ((e.keyCode - 95) > 0 && (e.keyCode - 97) < 9) {
            output += (e.keyCode - 96).toString();
            printOutput(output);
            
        }
        if(e.keyCode==107 || e.keyCode==109 || e.keyCode==106 || e.keyCode==111){
            let history=getHistory();
            history+=output;
            history+=String.fromCharCode(e.keyCode-64);
            printHistory(history);
            printOutput('');
            console.log(e.keyCode);
        }
    }
    

}
);


