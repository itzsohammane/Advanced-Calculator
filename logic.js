const display = document.getElementById('display');

let historyList = [];

// Load history on start
window.onload = function() {
    historyList = JSON.parse(localStorage.getItem("calcHistory")) || [];
    updateHistory();
};

//Add numbers and operators to the display

function appendValue(value){
    display.value += value;
}

//Clears the entire display

function clearDisplay(){
    display.value = '';
}

//Clears the last typed digit

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

//Calculates the matheathetical expression

function calculate() {
    let display = document.getElementById("display");

    try {
        let expression = display.value;
        let result = eval(expression);

        if (!isFinite(result)) {
            throw Error();
        }

        // Store history
        historyList.push(expression + " = " + result);

        // Limit history to 10 items
        if (historyList.length > 14) {
            historyList.shift();
        }

        localStorage.setItem("calcHistory", JSON.stringify(historyList));

        display.value = result;

        updateHistory();

    } catch {
        display.value = "Error";
    }
}

// Update history UI
function updateHistory() {
    let historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";

    for (let i = historyList.length - 1; i >= 0; i--) {
        let item = document.createElement("div");
        item.textContent = historyList[i];
        item.className = "history-item";

        // Click to reuse
        item.onclick = function() {
            document.getElementById("display").value =
                historyList[i].split(" = ")[0];
        };

        historyDiv.appendChild(item);
    }
}

function clearhistory() {
    if (confirm("Are you sure you want to clear history?")) {
        historyList = [];
        localStorage.removeItem("calcHistory");
        updateHistory();
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    let key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        appendValue(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        event.preventDefault();
        backspace();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

