import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { PIECES } from './utils/helper';
import React, { useEffect } from 'react';
import clickSound from './sound-effects/click-sound.mp3';

const colAlphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const { ROOK, KNIGHT, BISHOP, QUEEN, KING, PAWN } = PIECES;

// prevent caslting when rook , king has moved once

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
  const [path, setPath] = useState([]) //00, 11, 20
  const [whoMoves, setWhoMoves] = useState('LIGHT')

  const getBoxColor = (colIdx, rowIdx) => {
    const isEven = (n) => n % 2 == 0;
    if(isEven(colIdx + rowIdx)) return 'light'
    else return "dark"
  }

  const onDrag = (e, colIdx, rowIdx, item) => {

    console.log(chessboard[rowIdx][colIdx].type);
    // if(chessboard[rowIdx][colIdx].type != whoMoves) return
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
    setPath([])

    if(chessboard[prevRowIdx][prevColIdx].type != whoMoves) return

    console.log('dropped', movedPiece.name);
    console.log({ colIdx, rowIdx });
    console.log({ prevColIdx, prevRowIdx, movedPiece });

    switch(movedPiece.name.toUpperCase()) {

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
        break;

      case KING.NAME:

        if(movedPiece.type == chessboard[rowIdx][colIdx].type) return

        if(colIdx >= prevColIdx - 1 && colIdx <= prevColIdx + 1 && rowIdx >= prevRowIdx - 1 && rowIdx <= prevRowIdx + 1) console.log('king moves 1')
        else if(Math.abs(rowIdx - prevRowIdx) === 2 || Math.abs(colIdx - prevColIdx) === 2) {
          // if(chessboard[0][3] || chessboard[0][5] || chessboard[7][3] || chessboard[7][5]) return
          console.log('can castle');
          if(rowIdx === 0 && colIdx == 6) {
            if(chessboard[0][5]) return
            changeTurns();
            return setChessboard(prev => {
              const newArr = JSON.parse(JSON.stringify(prev));
              newArr[prevRowIdx][prevColIdx] = '';
              newArr[rowIdx][colIdx] = movedPiece;
              newArr[0][5] = prev[0][7]
              newArr[0][7] = ''
              return newArr
            })
          } else if(rowIdx == 7 && colIdx == 6) {
            if(chessboard[7][5]) return
            changeTurns();
            return setChessboard(prev => {
              const newArr = JSON.parse(JSON.stringify(prev));
              newArr[prevRowIdx][prevColIdx] = '';
              newArr[rowIdx][colIdx] = movedPiece;
              newArr[7][5] = prev[7][7]
              newArr[7][7] = ''
              return newArr
            })
          } else if(rowIdx == 7 && colIdx == 2) {
            if(chessboard[7][2] || chessboard[7][1]) return
            changeTurns();
            return setChessboard(prev => {
              const newArr = JSON.parse(JSON.stringify(prev));
              newArr[prevRowIdx][prevColIdx] = '';
              newArr[rowIdx][colIdx] = movedPiece;
              newArr[7][3] = prev[7][0]
              newArr[7][0] = ''
              return newArr
            })
          } else if(rowIdx == 0 && colIdx == 2) {
            if(chessboard[0][2] || chessboard[0][1]) return
            changeTurns();
            return setChessboard(prev => {
              const newArr = JSON.parse(JSON.stringify(prev));
              newArr[prevRowIdx][prevColIdx] = '';
              newArr[rowIdx][colIdx] = movedPiece;
              newArr[0][3] = prev[0][0]
              newArr[0][0] = ''
              return newArr
            })
          }
          console.log('beyond castle');
        } else return
        break;

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
        // top - pr - diff
        // bot - pr + diff
        // left - pc - diff
        // right - pc + diff
        if(colIdx == prevColIdx || rowIdx == prevRowIdx) {
          console.log("go straight");
          if(colIdx == prevColIdx) {
            if(prevRowIdx < rowIdx) { //bottom
              console.log('bottom');
              let collide = 0;
              for(let n = prevRowIdx + 1; n <= rowIdx; n++) {
                if(collide >= 1) return
                if(chessboard[n][colIdx]) {
                  if(movedPiece.type == chessboard[n][colIdx].type) return
                  if(chessboard[n][colIdx].type != movedPiece.type) collide++
                }
              }
            } else {
              console.log('top');
              let collide = 0;
              for(let n = prevRowIdx - 1; n >= rowIdx; n--) {
                if(collide >= 1) return
                if(chessboard[n][colIdx]) {
                  if(movedPiece.type == chessboard[n][colIdx].type) return
                  if(chessboard[n][colIdx].type != movedPiece.type) collide++
                }
              }
            }

          } else {
            if(prevColIdx < colIdx) {
              let collide = 0;
              for(let n = prevColIdx + 1; n <= colIdx; n++) {
                if(collide >= 1) return
                if(chessboard[rowIdx][n]) {
                  if(movedPiece.type == chessboard[rowIdx][n].type) return
                  if(chessboard[rowIdx][n].type != movedPiece.type) collide++
                }
              }
            } else {
              let collide = 0;
              for(let n = prevColIdx - 1; n >= colIdx; n--) {
                if(collide >= 1) return
                if(chessboard[rowIdx][n]) {
                  if(movedPiece.type == chessboard[rowIdx][n].type) return
                  if(chessboard[rowIdx][n].type != movedPiece.type) collide++
                }
              }
            }
          }


        } else if(Math.abs(rowIdx - prevRowIdx) == Math.abs(colIdx - prevColIdx)) {

          console.log("go diagonally");

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

        } else return;


        // Math.abs(rowIdx - prevRowIdx);
        // Math.abs(colIdx - prevColIdx);
        // if(rowDiff != colDiff) return;

        //diagonally
        // top - left     | row - 1 , col - 1
        // bottom - right | row + 1 , col + 1
        // top - right    | row - 1 , col + 1
        // bottom - left  | row + 1 , col - 1

        break;

      default:
        break;
    }

    const sound = {
      move: clickSound
    };

    const audio = new Audio(sound.move);
    audio?.play();

    function changeTurns() {
      if(chessboard[prevRowIdx][prevColIdx].type == 'LIGHT') setWhoMoves('DARK')
      if(chessboard[prevRowIdx][prevColIdx].type == 'DARK') setWhoMoves('LIGHT')
    };

    changeTurns();

    setChessboard(prev => {
      const newArr = [...prev];
      newArr[prevRowIdx][prevColIdx] = '';
      newArr[rowIdx][colIdx] = movedPiece;
      return newArr
    })
  }

  const onDragOver = (e, colIdx, rowIdx, item) => {
    e.preventDefault();

    // const p = JSON.parse(e.dataTransfer.getData("movedPiece"));
    // const c = +e.dataTransfer.getData("prevColIdx");
    // const r = +e.dataTransfer.getData("prevRowIdx");





    // let x = e.pageX;
    // let y = e.pageY;
    // console.log(x, y);

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



  function fetchPath(r, c, p) {
    console.log('get path');
    console.log(r, c, p);

    if(whoMoves !== p.type) {
      setPath([])
      return
    };
    let moves = []

    switch(p.name.toUpperCase()) {
      case PAWN.NAME:
        if(p.type == "LIGHT") {
          if(r == 6) moves.push(`${r - 2}${c}`)
          if(chessboard[r - 1][c - 1]) moves.push(`${r - 1}${c - 1}`)
          if(chessboard[r - 1][c + 1]) moves.push(`${r - 1}${c + 1}`)
          if(!chessboard[r - 1][c]) moves.push(`${r - 1}${c}`)
        } else {
          if(r == 1) moves.push(`${r + 2}${c}`)
          if(chessboard[r + 1][c - 1]) moves.push(`${r + 1}${c - 1}`)
          if(chessboard[r + 1][c + 1]) moves.push(`${r + 1}${c + 1}`)
          moves.push(`${r + 1}${c}`)
        }
        break;
      case KING.NAME:

        // diagonals
        moves.push(`${r - 1}${c - 1}`)
        moves.push(`${r + 1}${c - 1}`)
        moves.push(`${r - 1}${c + 1}`)
        moves.push(`${r + 1}${c + 1}`)

        //straights
        moves.push(`${r + 1}${c}`)
        moves.push(`${r - 1}${c}`)
        moves.push(`${r}${c + 1}`)
        moves.push(`${r}${c - 1}`)

        moves = moves.map((move, i) => {
          if(chessboard?.[move[0]]?.[move[1]]?.type !== p.type || !chessboard?.[move[0]]?.[move[1]]) return move;
          else return null
        })
        console.log(moves);

        break;

      default:
        moves = [];
        break;
    }



    setPath(moves);
  }


  return (
    <div className="App">
      <h1>{ whoMoves == "LIGHT" ? "White" : "Black" } { "'s Turn" }</h1>
      <div id="chessboard">
        { chessboard.map((row, rowIdx) => <div key={ 'row' + rowIdx } className="row">
          { row.map((col, colIdx) => <React.Fragment
            key={ 'col' + colIdx

            }
          >
            <div
              className={ `column single-square  ${getBoxColor(colIdx, rowIdx)} ${path.includes(rowIdx + '' + colIdx) && "path"} ` }
              onDrop={ (e) => onDrop(e, colIdx, rowIdx, col) }
              onDragOver={ (e) => onDragOver(e, colIdx, rowIdx, col) }
              draggable={ chessboard[rowIdx][colIdx] }
              onDragStart={ (e) => onDrag(e, colIdx, rowIdx, col) }
              onClick={ () => fetchPath(rowIdx, colIdx, col) }
            >
              <div className='box' >
                { rowIdx }{ colIdx }
                {/* { colIdx == 0 && `${8 - rowIdx}` } */ }
                {/* { rowIdx == 7 && `${colAlphabets[colIdx]}` } */ }
              </div>

              { col?.img && <img src={ `${col.img}` } alt={ col.name } /> }

            </div >
          </React.Fragment>) }
        </div>)
        }
      </div >
      <p> 	&lt;/&gt; by Rohan</p>
      <p>*All images used on this site are the property of their respective owners.

      </p>
    </div >
  );
}

export default App;
