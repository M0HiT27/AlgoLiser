export function bubbleSort(mainarr, instructions) {
    let arr = [...mainarr];
    let i, j;
    let n = arr.length;
    var swapped;
    for (i = 0; i < n - 1; i++) {
        swapped = false;
        for (j = 0; j < n - i - 1; j++) {
            let temp = {
                type: "swapEle",
                i: j,
                j: j + 1,
                shouldSwap: false
            };
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                temp.shouldSwap = true;
                swapped = true;
            }
            instructions.push(temp);
        }
        if (swapped === false)
            break;
    }
    console.log("Num of Instructions for bubble sort : " + instructions.length)
}

/*=====================================================================================================*/

export function mergeSort(mainarr, instructions) {
    let arr = [...mainarr];
    mergeSortArr(arr, 0, arr.length - 1);
    function merge(arr, l, m, r) {

        let n1 = m - l + 1;
        let n2 = r - m;


        let L = new Array(n1);
        let R = new Array(n2);


        for (let i = 0; i < n1; i++)
            L[i] = arr[l + i];
        for (let j = 0; j < n2; j++)
            R[j] = arr[m + 1 + j];
        let i = 0;
        let j = 0;
        let k = l;

        while (i < n1 && j < n2) {

            if (L[i] <= R[j]) {
                let temp = {
                    type: "changeEle",
                    index: k,
                    val: L[i],
                };
                instructions.push(temp);
                arr[k] = L[i];
                i++;
            }
            else {
                let temp = {
                    type: "changeEle",
                    index: k,
                    val: R[j],
                };
                instructions.push(temp);
                arr[k] = R[j];
                j++;
            }
            k++;
        }
        while (i < n1) {
            let temp = {
                type: "changeEle",
                index: k,
                val: L[i],
            };
            instructions.push(temp);
            arr[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            let temp = {
                type: "changeEle",
                index: k,
                val: R[j],
            };
            instructions.push(temp);
            arr[k] = R[j];
            j++;
            k++;
        }
    }

    function mergeSortArr(arr, l, r) {
        if (l >= r) {
            return;
        }
        let m = l + parseInt((r - l) / 2);
        mergeSortArr(arr, l, m);
        mergeSortArr(arr, m + 1, r);
        merge(arr, l, m, r);
    }
    console.log("Num instructions for merge sort : " + instructions.length);
}

/*=====================================================================================================*/

export function selectionSort(mainarr, instructions) {
    let n = mainarr.length;
    let arr = [...mainarr];
    let i, j, min_idx;


    for (i = 0; i < n - 1; i++) {
        min_idx = i;

        for (j = i + 1; j < n; j++) {
            let temp = {
                type: "swapEle",
                i: min_idx,
                j: j,
                shouldSwap: false
            };
            instructions.push(temp);
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        [arr[min_idx], arr[i]] = [arr[i], arr[min_idx]];//swapping elements
        let temp = {
            type: "swapEle",
            i: i,
            j: min_idx,
            shouldSwap: true
        };
        instructions.push(temp);
    }

}

/*=====================================================================================================*/

export function quickSort(mainarr, instructions) {
    let arr = [...mainarr];
    quickSortArr(arr, 0, arr.length - 1);

    function partition(arr, low, high) {

        let pivot = arr[high];
        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
                let temp = {
                    type: "swapEle",
                    i: i,
                    j: j,
                    shouldSwap: true
                };
                instructions.push(temp);
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        let temp = {
            type: "swapEle",
            i: i + 1,
            j: high,
            shouldSwap: true
        };
        instructions.push(temp);
        return i + 1;
    }


    function quickSortArr(arr, low, high) {
        if (low < high) {

            let pi = partition(arr, low, high);


            quickSortArr(arr, low, pi - 1);
            quickSortArr(arr, pi + 1, high);
        }
    }
    // console.log(arr);
    console.log("Num instructions for quick sort : " + instructions.length);
    // console.log(instructions);
}

/*=====================================================================================================*/

export function insertionSort(mainarr, instructions) {
    let n = mainarr.length;
    let arr = [...mainarr];
    let i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            let temp = {
                type: "changeEle",
                index: j + 1,
                val: arr[j],
            };
            instructions.push(temp);
            j = j - 1;
        }
        arr[j + 1] = key;
        let temp = {
            type: "changeEle",
            index: j + 1,
            val: key,
        };
        instructions.push(temp);
    }
    // console.log(arr);
    console.log("Num of Instructions for insertion sort : " + instructions.length);
    // console.log(instructions);
}

/*=====================================================================================================*/

export function heapSort(mainarr, instructions) {
    let arr = [...mainarr];

    let N = arr.length;

    for (let i = Math.floor(N / 2) - 1; i >= 0; i--) {
        heapify(arr, N, i);
    }

    for (let i = N - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];//swap
        let temp = {
            type: "swapEle",
            i: 0,
            j: i,
            shouldSwap: true
        };
        instructions.push(temp);
        heapify(arr, i, 0);
    }
    function heapify(arr, N, i) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        if (l < N && arr[l] > arr[largest])
            largest = l;

        if (r < N && arr[r] > arr[largest])
            largest = r;

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]]
            let temp = {
                type: "swapEle",
                i: i,
                j: largest,
                shouldSwap: true
            };
            instructions.push(temp);
            heapify(arr, N, largest);
        }
    }
    //console.log(arr);
    console.log("Num instructions for heap sort : " + instructions.length);
    // console.log(instructions);
}

/*=====================================================================================================*/

export function countSort(inputArray, instructions) {
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

/*=====================================================================================================*/

