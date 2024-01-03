const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input');
const display_result = document.querySelector(".display .result");

let input = "";
for (let key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
        if (value == "clear") {
            input="";
            display_input.innerHTML = "";
            display_result.innerHTML = "";
        } else if (value == "backspace") {
            input = input.slice(0, input.length - 1);
            display_input.innerHTML = fixInput(input);
        } else if (value == "=") {
            let result = eval(prepInput(input));
            display_result.innerHTML = fixOutput(result);
        } else if (value == "brackets") {
            if (input.indexOf("(") == -1 || 
                input.indexOf("(") != -1 && 
                input.indexOf(")") != -1 && 
                input.lastIndexOf("(") < input.lastIndexOf(")")) {
                input += "(";
            } else if (
                input.indexOf("(") != -1 && 
                input.indexOf(")") == -1 ||
                input.indexOf("(")!= -1 && 
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")")) {
                input += ")";
            }
            display_input.innerHTML = fixInput(input);
        } else {
            if (verifyInput(value)) {
                input += value;
                display_input.innerHTML = fixInput(input);
            }
        }
    });
}

function fixInput(input) {
    let input_arr = input.split("");
    let input_arr_len = input_arr.length;

    for (let i = 0; i < input_arr_len; i++) {
        if (input_arr[i] == "*") {
          input_arr[i] = ` <span class="operator">x</span> `;
        } else if (input_arr[i] == "/") {
          input_arr[i] = ` <span class="operator">÷</span> `;
        } else if (input_arr[i] == "+") {
          input_arr[i] = ` <span class="operator">+</span> `;
        } else if (input_arr[i] == "-") {
          input_arr[i] = ` <span class="operator">-</span> `;
        } else if (input_arr[i] == "(") {
          input_arr[i] = `<span class="brackets">(</span>`;
        } else if (input_arr[i] == ")") {
          input_arr[i] = `<span class="brackets">)</span>`;
        } else if (input_arr[i] == "%") {
          input_arr[i] = `<span class="percent">%</span>`;
        }
    }
    return input_arr.join("");
}

function fixOutput(result) {
    let result_str = result.toString();
    let decimal = result_str.split(".")[1];
    result_str = result_str.split(".")[0];
    let result_arr = result_str.split("");

    if (result_arr.length > 3) {
        for (let i = result_arr.length - 3; i > 0; i -= 3) {
            result_arr.splice(i, 0, ",")
        }
    }

    if (decimal) {
        result_arr.push(".");
        result_arr.push(decimal);
    }
    return result_arr.join("");
}

function verifyInput(value) {
    let prev_input = input.slice(-1);
    let operators =["+", "-", "/", "*"];
    
    if (value == "." && prev_input == ".") {
        return false;
    } 
    if (value == "%" && prev_input == "%") {
      return false;
    } 
    if (operators.includes(value) && 
    operators.includes(prev_input)) {
        return false;
    }
    return true;
}

function prepInput(input) {
    let input_arr = input.split("");
    for (let i = 0; i < input_arr.length; i++) {
        if (input_arr[i] == "%") {
            input_arr[i] = "/100"
        }
    }
    let j = 0;
    while (input_arr[j] == "0") {
        input_arr[j] = "";
        j++;
    }
    return input_arr.join("");
}
