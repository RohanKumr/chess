import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { PIECES } from './utils/helper';
import React, { useEffect } from 'react';

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

        // if (movedPiece.type == 'LIGHT' && rowIdx == 7 && colIdx == 6 ) {
        //   console.log(object);
        // }
        // if (movedPiece.type == 'DARK' && rowIdx ==  && colIdx == 6 ) {

        // }
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
        break;

      case KING.NAME:

        if(movedPiece.type == chessboard[rowIdx][colIdx].type) return
        if(colIdx >= prevColIdx - 1 && colIdx <= prevColIdx + 1 && rowIdx >= prevRowIdx - 1 && rowIdx <= prevRowIdx + 1) console.log('king moves 1');
        else return

      case ROOK.NAME:
        if(movedPiece.type == chessboard[rowIdx][colIdx].type) return
        // only allow straight lines else invalid
        if(rowIdx == prevRowIdx) {
          // rows are same check diff for columns
          console.log('rows equal', colIdx, prevColIdx);
          if(colIdx < prevColIdx) {
            // left | row , col - 1
            let collide = 0;
            for(let index = prevColIdx - 1; index >= colIdx; index--) {
              if(collide >= 1) return
              if(movedPiece.type == chessboard[rowIdx][index].type) return
              if(chessboard[rowIdx][index].type && chessboard[rowIdx][index].type != movedPiece.type) collide++
            }
          } else {
            // right | row, col + 1
            console.log("col > prevColIdx");
            let collide = 0;
            for(let index = prevColIdx + 1; index <= colIdx; index++) {
              if(collide >= 1) return
              if(movedPiece.type == chessboard[rowIdx][index].type) return
              if(chessboard[rowIdx][index].type && chessboard[rowIdx][index].type != movedPiece.type) collide++
            }
          }
        } else if(colIdx == prevColIdx) {
          // columns are same check diff for columns
          console.log('columns equal', rowIdx, prevRowIdx);

          if(rowIdx < prevRowIdx) {
            // up | col , row - 1
            console.log("row < prevRow", prevRowIdx, rowIdx);
            let collide = 0;
            for(let index = prevRowIdx - 1; index >= rowIdx; index--) {
              console.log(index, colIdx);
              if(collide >= 1) return
              if(movedPiece.type == chessboard[index][colIdx].type) return
              if(chessboard[index][colIdx].type && chessboard[index][colIdx].type != movedPiece.type) collide++
            }
          } else {
            //down | col, row + 1
            console.log('row > prevRow');
            let collide = 0;
            for(let index = prevRowIdx + 1; index <= rowIdx; index++) {
              console.log(index, collide, chessboard[index][colIdx].type);
              if(collide >= 1) return
              if(movedPiece.type == chessboard[index][colIdx].type) return
              if(chessboard[index][colIdx].type && chessboard[index][colIdx].type != movedPiece.type) collide++
            }
          }
        } else return
        break

      case BISHOP.NAME:
        // top - left     | row - 1 , col - 1
        // bottom - right | row + 1 , col + 1
        // top - right    | row - 1 , col + 1
        // bottom - left  | row + 1 , col - 1

        // Checking if we are moving diagonally.
        const rowDiff = Math.abs(rowIdx - prevRowIdx);
        const colDiff = Math.abs(colIdx - prevColIdx);
        if(rowDiff != colDiff) return;

        if(rowIdx < prevRowIdx && colIdx < prevColIdx) {
          console.log('top - left');
          let collide = 0;

          for(let n = 1; n <= prevRowIdx - rowIdx; n++) {
            const r = prevRowIdx - n;
            const c = prevColIdx - n;
            console.log(r, c);

            if(collide >= 1) return
            if(chessboard[r][c]) {
              if(movedPiece.type == chessboard[r][c].type) return
              if(chessboard[r][c].type && chessboard[r][c].type != movedPiece.type) collide++
            }
          }
        } else if(rowIdx > prevRowIdx && colIdx > prevColIdx) {
          console.log('bottom - right')
          let collide = 0;


          for(let n = 1; n <= rowIdx - prevRowIdx; n++) {
            const r = prevRowIdx + n;
            const c = prevColIdx + n;
            console.log(r, c);

            if(collide >= 1) return
            if(chessboard[r][c]) {
              if(movedPiece.type == chessboard[r][c].type) return
              if(chessboard[r][c].type && chessboard[r][c].type != movedPiece.type) collide++
            }
          }


        } else if(rowIdx < prevRowIdx && colIdx > prevColIdx) {
          console.log('top - right')
          let collide = 0;

          for(let n = 1; n <= prevRowIdx - rowIdx; n++) {
            const r = prevRowIdx - n;
            const c = prevColIdx + n;
            console.log(r, c);

            if(collide >= 1) return
            if(chessboard[r][c]) {
              if(movedPiece.type == chessboard[r][c].type) return
              if(chessboard[r][c].type && chessboard[r][c].type != movedPiece.type) collide++
            }
          }

        } else if(rowIdx > prevRowIdx && colIdx < prevColIdx) {
          console.log('bottom - left')
          let collide = 0;

          for(let n = 1; n <= rowIdx - prevRowIdx; n++) {
            const r = prevRowIdx + n;
            const c = prevColIdx - n;
            console.log(r, c);

            if(collide >= 1) return
            if(chessboard[r][c]) {
              if(movedPiece.type == chessboard[r][c].type) return
              if(chessboard[r][c].type && chessboard[r][c].type != movedPiece.type) collide++
            }
          }

        } else {
          console.log('else ');
          return
        }
        break;
      case QUEEN.NAME:
        console.log('moved queen');
        break;


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

  useEffect(() => {
    let king = 0;
    let winner;

    chessboard.forEach((row, r) => {
      row.forEach((piece, c) => {
        if(piece?.name?.toUpperCase() == KING.NAME) {
          king++
          winner = piece.type;
        }
      })
    })

    if(king == 1) alert(`${winner} wins!`)
  }, [chessboard])



  return (
    <div className="App">
      <h1>Chessboard</h1>
      <div id="chessboard">
        { chessboard.map((row, rowIdx) => <div key={ 'row' + rowIdx } className="column">
          { row.map((col, colIdx) => <React.Fragment
            key={ 'col' + colIdx }
          >
            <div
              className={ `row single-square ${getBoxColor(colIdx, rowIdx)}` }
              onDrop={ (e) => onDrop(e, colIdx, rowIdx, col) }
              onDragOver={ (e) => onDragOver(e, colIdx, rowIdx, col) }
              draggable={ chessboard[rowIdx][colIdx] }
              onDragStart={ (e) => onDrag(e, colIdx, rowIdx, col) }
            >
              <div className='box' >{ rowIdx }{ colIdx } { 8 - rowIdx }{ colAlphabets[colIdx] }</div>
              <div
                className='square'

              >
                { col.img && <img src={ `${col.img}` } alt={ col.name } /> }
              </div >
            </div >
          </React.Fragment>) }
        </div>)
        }
      </div >
    </div >
  );
}

export default App;
