let instructions = [];
let Arr1 = [10, 9, 8, 7, 6, 1, 2, 3];
countSort(Arr1, instructions);

// let temp = {
//     type: "swapEle",
//     i: i,
//     j: j,
//     shouldSwap: true
// };
// instructions.push(temp);

// let temp = {
//     type: "changeEle",
//     index: k,
//     val: L[i],
// };
// instructions.push(temp);


function countSort(inputArray, instructions) {
    const N = inputArray.length;

    let M = 0;
    for (let i = 0; i < N; i++) {
        M = Math.max(M, inputArray[i]);
    }

    const countArray = new Array(M + 1).fill(0);

    for (let i = 0; i < N; i++) {
        countArray[inputArray[i]]++;
        let temp = {
            type: "swapEle",
            i: i,
            j: -1,
            shouldSwap: false
        };
        instructions.push(temp);
    }

    for (let i = 1; i <= M; i++) {
        countArray[i] += countArray[i - 1];
    }

    const outputArray = new Array(N);
    for (let i = N - 1; i >= 0; i--) {
        outputArray[countArray[inputArray[i]] - 1] = inputArray[i];
        let temp = {
            type: "changeEle",
            index: countArray[inputArray[i]] - 1,
            val: inputArray[i],
        };
        instructions.push(temp);
        countArray[inputArray[i]]--;
    }

    //console.log(outputArray);
    console.log("Num instructions of count sort :" + instructions.length);
    //console.log(instructions);
}

