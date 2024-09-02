import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { PIECES } from './utils/helper';
import { useEffect } from 'react';

const colAlphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const { ROOK, KNIGHT, BISHOP, QUEEN, KING, PAWN } = PIECES;

const initialState = [
  //row 8
  [
    {
      name: ROOK.NAME.toLowerCase(),
      img: ROOK.IMG_DARK,
      type: 'DARK'
    },
    {
      name: KNIGHT.NAME.toLowerCase(),
      img: KNIGHT.IMG_DARK,
      type: 'DARK'
    },
    {
      name: BISHOP.NAME.toLowerCase(),
      img: BISHOP.IMG_DARK,
      type: 'DARK'
    },
    {
      name: QUEEN.NAME.toLowerCase(),
      img: QUEEN.IMG_DARK,
      type: 'DARK'
    },
    {
      name: KING.NAME.toLowerCase(),
      img: KING.IMG_DARK,
      type: 'DARK'
    },
    {
      name: BISHOP.NAME.toLowerCase(),
      img: BISHOP.IMG_DARK,
      type: 'DARK'
    },
    {
      name: KNIGHT.NAME.toLowerCase(),
      img: KNIGHT.IMG_DARK,
      type: 'DARK'
    },
    {
      name: ROOK.NAME.toLowerCase(),
      img: ROOK.IMG_DARK,
      type: 'DARK'
    },
  ],
  //row 7
  [
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_DARK,
      type: 'DARK'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_DARK,
      type: 'DARK'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_DARK,
      type: 'DARK'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_DARK,
      type: 'DARK'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_DARK,
      type: 'DARK'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_DARK,
      type: 'DARK'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_DARK,
      type: 'DARK'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_DARK,
      type: 'DARK'
    },
  ],
  // row 6
  ['', '', '', '', '', '', '', ''],
  // row 5
  ['', '', '', '', '', '', '', ''],
  // row 4
  ['', '', '', '', '', '', '', ''],
  // row 3
  ['', '', '', '', '', '', '', ''],
  // row 2
  [
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: PAWN.NAME.toLowerCase(),
      img: PAWN.IMG_LIGHT,
      type: 'LIGHT'
    },
  ],
  // row 1
  [
    {
      name: ROOK.NAME.toLowerCase(),
      img: ROOK.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: KNIGHT.NAME.toLowerCase(),
      img: KNIGHT.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: BISHOP.NAME.toLowerCase(),
      img: BISHOP.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: QUEEN.NAME.toLowerCase(),
      img: QUEEN.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: KING.NAME.toLowerCase(),
      img: KING.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: BISHOP.NAME.toLowerCase(),
      img: BISHOP.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: KNIGHT.NAME.toLowerCase(),
      img: KNIGHT.IMG_LIGHT,
      type: 'LIGHT'
    },
    {
      name: ROOK.NAME.toLowerCase(),
      img: ROOK.IMG_LIGHT,
      type: 'LIGHT'
    },
  ],
]


function App() {
  // const col = [1, 2, 3, 4, 5, 6, 7, 8];
  // const row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const [chessboard, setChessboard] = useState(initialState)
  const [path, setPath] = useState(null)

  const getBoxColor = (colIdx, rowIdx) => {
    const isEven = (n) => n % 2 == 0;
    if(isEven(colIdx + rowIdx)) return 'light'
    else return "dark"
  }

  const onDrag = (e, colIdx, rowIdx, item) => {
    console.log('dragging');
    console.log(colIdx, rowIdx, item);
    e.dataTransfer.setData("movedPiece", JSON.stringify(item))
    e.dataTransfer.setData("prevColIdx", colIdx)
    e.dataTransfer.setData("prevRowIdx", rowIdx)
  }

  const onDrop = (e, colIdx, rowIdx, item) => {
    // console.log(colIdx, rowIdx, item);

    const movedPiece = JSON.parse(e.dataTransfer.getData("movedPiece"));
    const prevColIdx = +e.dataTransfer.getData("prevColIdx");
    const prevRowIdx = +e.dataTransfer.getData("prevRowIdx");

    console.log('dropped', movedPiece.name);
    console.log({ colIdx, rowIdx });
    console.log({ prevColIdx, prevRowIdx, movedPiece });


    switch(movedPiece.name.toUpperCase()) {
      //PAWN
      case PAWN.NAME:
        if(movedPiece.type == "LIGHT") {
          if(rowIdx == 0) {
            movedPiece.name = QUEEN.NAME
            movedPiece.img = QUEEN.IMG_LIGHT
          }
          if(chessboard[rowIdx][colIdx] && rowIdx == prevRowIdx - 1 && (colIdx == prevColIdx - 1 || colIdx == prevColIdx + 1)) console.log('pawn capture')
          else {
            if(colIdx != prevColIdx) return
            if(rowIdx > prevRowIdx) return
            if((prevRowIdx - rowIdx) > 2) return console.log(1);
            else if((prevRowIdx - rowIdx) == 2 && prevRowIdx == 6) console.log(2);
            else if((prevRowIdx - rowIdx) > 1) return console.log(3);
            if(chessboard[rowIdx][colIdx]) return
          }

        }
        if(movedPiece.type == "DARK") {
          if(rowIdx == 7) {
            movedPiece.name = QUEEN.NAME
            movedPiece.img = QUEEN.IMG_DARK
          }
          if(chessboard[rowIdx][colIdx] && rowIdx == prevRowIdx + 1 && (colIdx == prevColIdx - 1 || colIdx == prevColIdx + 1)) console.log('pawn capture')
          else {
            if(colIdx != prevColIdx) return
            if(rowIdx < prevRowIdx) return
            if((rowIdx - prevRowIdx) > 2) return console.log(1);
            else if((rowIdx - prevRowIdx) == 2 && prevRowIdx == 1) console.log(2);
            else if((rowIdx - prevRowIdx) > 1) return console.log(3);
            if(chessboard[rowIdx][colIdx]) return
          }

        }
        break

      //KNIGHT
      case KNIGHT.NAME:
        if(movedPiece.type == chessboard[rowIdx][colIdx].type) return
        if(prevColIdx == colIdx + 1 && prevRowIdx == rowIdx + 2) console.log('valid move')
        else if(prevColIdx == colIdx - 1 && prevRowIdx == rowIdx + 2) console.log('valid move')
        else if(prevColIdx == colIdx - 2 && rowIdx == prevRowIdx - 1) console.log('valid move')
        else if(prevColIdx == colIdx - 2 && prevRowIdx == rowIdx - 1) console.log('valid move')
        else if(prevColIdx == colIdx - 2 && rowIdx == prevRowIdx + 1) console.log('valid move')
        else if(colIdx == prevColIdx - 2 && rowIdx == prevRowIdx + 1) console.log('valid move')
        else if(colIdx == prevColIdx - 2 && rowIdx == prevRowIdx - 1) console.log('valid move')
        else if(colIdx == prevColIdx + 1 && rowIdx == prevRowIdx + 2) console.log('valid move')
        else if(colIdx == prevColIdx - 1 && rowIdx == prevRowIdx + 2) console.log('valid move')
        else return

      case KING.NAME:
        console.log(colIdx >= prevColIdx - 1, colIdx <= prevColIdx + 1);
        console.log(rowIdx >= prevRowIdx - 1 && rowIdx <= prevRowIdx + 1);
        if(movedPiece.type == chessboard[rowIdx][colIdx].type) return
        if(colIdx >= prevColIdx - 1 && colIdx <= prevColIdx + 1 && rowIdx >= prevRowIdx - 1 && rowIdx <= prevRowIdx + 1) console.log('king moves 1');
        else return


      default:
        break;
    }

    setChessboard(prev => {
      const newArr = [...prev];
      newArr[prevRowIdx][prevColIdx] = '';
      newArr[rowIdx][colIdx] = movedPiece;
      return newArr
    })
  }

  const onDragOver = (e, colIdx, rowIdx, item) => {
    e.preventDefault();
    // console.log('drag over');
    // console.log(colIdx, rowIdx, item);
  }




  return (
    <div className="App">
      <h1>Chessboard</h1>
      <div id="chessboard">
        { chessboard.map((row, rowIdx) => <div className="column">
          { row.map((col, colIdx) => <>
            <div
              className={ `row single-square ${getBoxColor(colIdx, rowIdx)}` }
              onDrop={ (e) => onDrop(e, colIdx, rowIdx, col) }
              onDragOver={ (e) => onDragOver(e, colIdx, rowIdx, col) }
              draggable={ chessboard[rowIdx][colIdx] }
              onDragStart={ (e) => onDrag(e, colIdx, rowIdx, col) }
            >
              <div className='box' >{ 8 - rowIdx }{ colAlphabets[colIdx] }</div>
              <div
                className='square'

              >
                { col.img && <img src={ `${col.img}` } alt={ col.name } /> }
              </div >
            </div >
          </>) }
        </div>)
        }
      </div >
    </div >
  );
}

export default App;
