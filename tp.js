let nbrSteps = 3;

// let chaine = "9A sadkljds SS";

const inputElement = document.getElementById('input_text');

const steps = document.getElementById('steps');

inputElement.addEventListener('input', () => {
    const inputValue = inputElement.value;
    const res = kriptiLa3jab(inputValue, steps.value !== "" ? steps.value : nbrSteps)
    document.getElementById('result_text').innerHTML = res;
});

steps.addEventListener('input', () => {
    const inputValue = inputElement.value;
    const res = kriptiLa3jab(inputValue, steps.value !== "" ? steps.value : nbrSteps)
    document.getElementById('result_text').innerHTML = res;
});

function kriptiLa3jab(chaine, v_steps) {
    let newChaine = "";

    for (let i = 0; i < chaine.length; i++) {
        const charCode = chaine.charCodeAt(i);

        if (charCode >= 65 && charCode <= 90) { // A Z
            newChaine += String.fromCharCode(((charCode - 65) + (v_steps % 26)) + 65);
        } else if (charCode >= 97 && charCode <= 122) { // a z
            newChaine += String.fromCharCode(((charCode - 97) + (v_steps % 26)) + 97);
        } else {
            newChaine += chaine[i];
        }
    }

    return newChaine;
}

// console.log(kriptiLa3jab(chaine, nbrZid))