function bubbleSortRecursive(arr, n = arr.length) {
    if (n === 1) return arr;
    
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
    }
    
    return bubbleSortRecursive(arr, n - 1);
}

function urutkanArray(arr) {
    let arrayTerurut = bubbleSortRecursive([...arr]);
    let bilanganGanjil = arrayTerurut.filter(num => num % 2 !== 0).join(", ");
    let bilanganGenap = arrayTerurut.filter(num => num % 2 === 0).join(", ");
    let arrayHasil = arrayTerurut.join(", ");
    
    console.log("Output:");
    console.log("Array:", arrayHasil);
    console.log("Ganjil:", bilanganGanjil);
    console.log("Genap:", bilanganGenap);
}

let arrayInput = [2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11];
urutkanArray(arrayInput);