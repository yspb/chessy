# chessy

Simple as a stick, stockfish nodejs client without spawning multiple os processes, crushing, memory leaking and so on.
You can push new fen any time without waiting for engine search complete.
You can create as many instances of stockfish engine as you want.

Install
-------------------------

Through npm with `npm install chessy`
You also need stockfish binary from https://stockfishchess.org/download/linux/

Example with depth
-------------------------

import chessy from chessy

/*
  fen = string in chess position format (there is no fen validation in code)
  multi = how many move lines to explore
  depth = the number of half moves (a move made by one side) the engine looks ahead
  callback = function called on every portion of results from engine
*/

const test = chessy('/home/yspb/Downloads/stockfish_15_x64')

test.analyze({ 
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  multi: 2,
  depth: 15,
  callback: console.log
})

//output example

/*

[
  {
    score: 0.4,
    move: 'e2e4',
    depth: 12,
    pv: 'e2e4 c7c5 g1f3 d7d6 f1b5 b8d7 e1g1 a7a6 b5d7 c8d7 d2d4 c5d4 e4e5 d6e5'
  },
  {
    score: 0.4,
    move: 'g1f3',
    depth: 12,
    pv: 'g1f3 d7d5 d2d4 g8f6 c2c4 e7e6 g2g3 c7c6 f1g2 d5c4 e1g1 b7b5'
  }
]

*/

Example without depth
-------------------------

//if depth is not specified, then engine will be in infinite search mode

const test2 = chessy('/home/yspb/Downloads/stockfish_15_x64')

test2.analyze({ 
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  multi: 5,
  callback: console.log
})

setTimeout(() => {
  test2.stop()
  test2.quit()
}, 10000)

Licence
-------------------------
MIT
