import React from "react";
import "../components/NewDiv.css";

interface cell {
  currentNumber?: number; //значение ячейки
  beginX: number; // left ячейки
  beginY: number; // top ячейки
  endX?: number; //конечная точка рамки по оси Х
  endY?: number; //конечная точка рамки по оси Y
  width?: number; //ширина рамки
  height?: number; //высота рамки
  isUnderline?: boolean;
  pos?: number; // признак выделенности ячейки стиль
}

interface IFieldProps {}

interface IFieldState {
  isClicked?: boolean; //флаг клика
  downActive: boolean; //флаг нажатия на ячейку
  cells: cell[];
  Compare: { LESS_THAN: -1; BIGGER_THAN: 1 }; //массив ячеек
}

let search: any;
let first = 0; //left endpoint
let last = 14; //right endpoint
let found = false;

export default class Field extends React.Component<IFieldProps, IFieldState> {
  constructor(props: IFieldProps) {
    super(props);
    this.state = {
      isClicked: false,
      downActive: false,
      cells: [],
      Compare: {
        LESS_THAN: -1,
        BIGGER_THAN: 1,
      },
    };
  }
  rendering() {
    let array = [];
    for (let i = 0; i < 15; i++) {
      array[i] = {
        currentNumber: Math.floor(Math.random() * 100),
        beginX: i * 50 + 300,
        beginY: 200,
        width: 20,
        height: 20,
        pos: i,
      };
    }
    this.setState({ cells: array });
  }

  changePlace() {
    let i = 0;
    let flag = 0;
    let stop = 1;
    this.bubbleSort(i, this.state.cells, flag, stop);
  }

  renderingSlow(arr: any) {
    this.setState({ cells: arr });
  }

  increment(i: any) {
    i++;
  }

  binarySearch(value: any, list: any, first: any, last: any, found: any) {
    for (let i = 0; i < 14; i++) {
      let element = document.querySelector(`.element${i}`);
      (element! as HTMLElement).style.backgroundColor = "white";
    }

    if (found === false && first <= last) {
      for (let i = first; i < last; i++) {
        let element = document.querySelector(`.element${i}`);
        (element! as HTMLElement).style.backgroundColor = "blue";
      }

      let position = -1;
      let found = false;
      let middle;
      middle = Math.floor((first + last) / 2);
      let element = document.querySelector(`.element${middle}`);
      (element! as HTMLElement).style.backgroundColor = "red";
      if (list[middle].currentNumber == value) {
        found = true;
        position = middle;
      } else if (list[middle].currentNumber > value) {
        //if in lower half
        last = middle - 1;
        setTimeout(() => {
          this.binarySearch(value, list, first, last, found);
          console.log("pause");
        }, 2000);
      } else {
        //in in upper half
        first = middle + 1;
        setTimeout(() => {
          this.binarySearch(value, list, first, last, found);
          console.log("pause");
        }, 2000);
      }
    }
  }

  bubbleSort(i: any, arr: any, flag: any, stop: any) {
    if (stop < 28) {
      let elements = document.querySelectorAll(".element");
      elements.forEach((el) => {
        (el! as HTMLElement).style.backgroundColor = "white";
      });
      let arr2 = arr;
      let j = i + 1;
      let element = document.querySelector(`.element${i}`);
      let element2 = document.querySelector(`.element${j}`);
      if (j < 14) {
        (element! as HTMLElement).style.backgroundColor = "green";
        (element2! as HTMLElement).style.backgroundColor = "green";
      }
      if (i < 14 && flag < 14) {
        if (arr2[i].currentNumber > arr2[j].currentNumber) {
          stop = 1;
          (element! as HTMLElement).style.backgroundColor = "black";
          (element2! as HTMLElement).style.backgroundColor = "black";
          let a = arr2[i].beginX;
          let b = arr2[i].beginY;
          let c = arr2[j].beginX;
          let v = arr2[j].beginY;
          let d = arr2[i].currentNumber;
          arr2[i].beginX = a;
          arr2[i].beginY = b;
          arr2[i].currentNumber = arr2[j].currentNumber;
          arr2[j].beginX = c;
          arr2[j].beginY = v;
          arr2[j].currentNumber = d;
          console.log(arr[i], arr[j]);
          setTimeout(() => {
            this.bubbleSort(j, arr2, flag, stop);
            console.log("pause");
          }, 500);
        } else {
          stop++;
          console.log("net");
          setTimeout(() => {
            this.bubbleSort(j, arr2, flag, stop);
            console.log("pause");
          }, 500);
        }
      } else {
        i = 0;
        j = 0;
        if (flag < 14 && flag === 0) {
          setTimeout(() => {
            this.bubbleSort(j, arr2, flag, stop);
            console.log("pause");
          }, 500);
        }
      }

      this.setState({ cells: arr2 });
    }
  }

  componentDidMount() {
    console.log(this.state.cells);
    this.rendering();
  }

  render() {
    return (
      <>
        <div className="NewDiv">
          <header className="App-header">
            <p>Сортировка массива и поиск элемента</p>
          </header>
          <div className="field">
            <div className="element_container">
              {this.state.cells.map((cell, i) => {
                return (
                  <>
                    <div
                      className={`element element${i}`}
                      style={{
                        top: cell.beginY,
                        left: cell.beginX,
                        width: cell.width,
                        height: cell.height,
                      }}
                    >
                      <p className="number">{cell.currentNumber}</p>
                    </div>
                  </>
                );
              })}
            </div>
            <button className="button" onClick={this.changePlace.bind(this)}>
              Поменять местами
            </button>
            <button
              className="button"
              onClick={() => {
                this.binarySearch(
                  prompt("введите число для поиска", search as any),
                  this.state.cells,
                  first,
                  last,
                  found
                );
              }}
            >
              Выполнить поиск
            </button>
            <p>Черные квадраты обозначают пару, элементы которой будут меняться. Если цвет зеленый, то элементы пропускаются. Красный цвет означает искомое число</p>
          </div>
        </div>
      </>
    );
  }
}
