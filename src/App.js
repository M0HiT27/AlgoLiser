import React from "react";
import Bars from "./components/Bars";
import { bubbleSort, mergeSort, selectionSort, quickSort, insertionSort, heapSort, countSort } from "./sorts/SortAlgos";
const ALGOS = {
  "Bubble Sort": bubbleSort,
  "Count Sort": countSort,
  "Heap Sort": heapSort,
  "Insertion Sort": insertionSort,
  "Merge Sort": mergeSort,
  "Quick Sort": quickSort,
  "Selection Sort": selectionSort,
  //"Radic"
}

var instructions = [];
let shouldStopSort = true;
function stopSort() {
  shouldStopSort = true;
}
function App() {
  const [{ arr, value, hightlightedIndices, arrSize, sortAlgo }, dispatch] = React.useReducer(reducer, { arr: [3, 2, 1], value: false, hightlightedIndices: { i: -1, j: -1, k: -1 }, arrSize: 10, sortAlgo: "Merge Sort" });

  function sorter(arr) {
    // let copyarr = [...arr];
    dispatch({ type: 'sortRunning' })
    shouldStopSort = false;
    // let i=0;
    // let j=i+1;
    const myInterval = setInterval(checker, 500);
    let x = 0;
    function checker() {
      if (shouldStopSort) {
        clearInterval(myInterval);
        dispatch({ type: 'sortHalted' })
        console.log("sorting stopped");
        shouldStopSort = false;
      }
      else if (x >= instructions.length) {
        clearInterval(myInterval);
        dispatch({ type: 'highlightIndex', payload: { i: -1, j: -1 } })
        dispatch({ type: 'sortHalted' });
        console.log('sorting finished');
      }
      else {
        let instr = instructions[x];
        switch (instr.type) {
          case "swapEle": {
            let i = instr.i;
            let j = instr.j;
            // let k = instr.k;
            dispatch({ type: 'highlightIndex', payload: { i: i, j: j } })
            if (instr.shouldSwap) {
              //[copyarr[j], copyarr[i]] = [copyarr[i], copyarr[j]];
              dispatch({ type: 'swapElements', payload: { a: i, b: j } });
            }
            break;
          }
          case "changeEle": {
            dispatch({ type: 'highlightIndex', payload: { i: instr.index, j: -1 } });
            dispatch({ type: 'changeEle', payload: { index: instr.index, val: instr.val } });
            break;
          }
          default: {
            console.log("default hit in sorter");
          }
        }

        x++
      }
    }




    // for(let i=0 ; i<copyarr.length ; i++)
    // {
    //   for(let j=i+1 ; j<copyarr.length ; j++)
    //     {
    //       if(shouldStopSort){
    //         dispatch({type:'sortHalted'})
    //         console.log("sorting stopped");
    //         shouldStopSort=false;
    //       }
    //       else{
    //         if(copyarr[j]<copyarr[i]){
    //           [copyarr[j],copyarr[i]]=[copyarr[i],copyarr[j]];
    //           dispatch({type:'swapElements' , payload:{a:i , b:j}});
    //         }
    //       }
    //     }
    // }
    // function checker()
    // {
    //   console.log('running'+i+" "+j);
    //   if(shouldStopSort){
    //     clearInterval(myInterval);
    //     dispatch({type:'sortHalted'})
    //     console.log("sorting stopped");
    //     shouldStopSort=false;
    //   }else if(i>=copyarr.length){
    //     clearInterval(myInterval);
    //     dispatch({type:'highlightIndex', payload:{i:-1 , j:-1}})
    //     dispatch({type:'sortHalted'});
    //     console.log('sorting finished');
    //   }else if(j===copyarr.length){
    //     i++;
    //     j=i+1;
    //   }
    //   else{
    //     dispatch({type:'highlightIndex', payload:{i:i , j:j}})
    //     if(copyarr[j]<copyarr[i]){
    //       [copyarr[j],copyarr[i]]=[copyarr[i],copyarr[j]];
    //       dispatch({type:'swapElements' , payload:{a:i , b:j}});
    //     }
    //     j++;
    //   }
    // }

  }
  function reducer(state, { type, payload }) {
    switch (type) {
      case 'highlightIndex': {

        return {
          ...state,
          hightlightedIndices: { ...payload }
        }
      }
      case 'sortHalted': {
        return {
          ...state,
          value: false
        }
      }
      case 'sortRunning': {
        let newArr = [...state.arr];
        instructions = [];
        ALGOS[state.sortAlgo](newArr, instructions);
        return {
          ...state,
          value: true
        }
      }
      case "stopSort": {
        if (!shouldStopSort) {
          stopSort();
        }
        return state;
      }
      case "newArr": {
        instructions = [];
        let temparrSize = parseInt(state.arrSize);
        let newArr = Array(temparrSize).fill(1);
        newArr = newArr.map(() => {
          return Math.floor(Math.random() * 10) + 1;
        })
        return {
          ...state,
          arr: [...newArr],
          hightlightedIndices: { i: -1, j: -1, k: -1 }
        }
      }
      case "changeAlgo": {
        return {
          ...state,
          sortAlgo: payload.val
        }
      }
      case 'swapElements': {
        let newArr = [...state.arr];
        [newArr[payload.b], newArr[payload.a]] = [newArr[payload.a], newArr[payload.b]];
        return {
          ...state,
          arr: [...newArr]
        }

      }
      case 'changeEle': {
        let newArr = [...state.arr];
        newArr[payload.index] = payload.val;
        return {
          ...state,
          arr: [...newArr]
        }
      }
      case "changeArrSize": {
        return {
          ...state,
          arrSize: payload.val
        }
      }
      default: {
        console.log("default hit in reducer");
      }
    }
  }
  return (
    <div className="App">
      <div className="controlPanel">
        <button onClick={() => sorter(arr)}>sort</button>
        <button onClick={() => { dispatch({ type: 'stopSort' }) }} style={{ display: value === true ? "inline" : "none" }}>Stop</button>
        <button onClick={() => { dispatch({ type: 'stopSort' }); dispatch({ type: "newArr" }) }}>new arr</button>

        <div>
          <label htmlFor="AlgoList">Choose a sorting Algo:</label>
          <select name="AlgoList" value={sortAlgo} onChange={(value) => dispatch({ type: 'changeAlgo', payload: { val: value.target.value } })} id="cars">
            {
              Object.entries(ALGOS).map(([key, value]) => {
                return <option value={key}>{key}</option>
              })
            }
          </select>
        </div>
        <div>
          <label htmlFor="arrSize">Array Size:</label>
          <input name="arrSize" value={arrSize} onChange={(value) => dispatch({ type: 'changeArrSize', payload: { val: value.target.value } })}></input>
        </div>
      </div>
      <div className="array">
        {arr.map((x, index) => {
          return <Bars index={index} hightlightedIndices={hightlightedIndices} height={x * 50}></Bars>
        })}
      </div>

    </div>
  );
}

export default App;
