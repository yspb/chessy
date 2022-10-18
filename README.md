# chessy
simple stockfish nodejs client

const test = chessy('/home/yspb/Downloads/stockfish_15_x64')

test.analyze({ 
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  multi: 3,
  depth: 15,
  callback: console.log
})


it returns result as

[
  {
    score: 0.6,
    move: 'd2d4',
    depth: 14,
    pv: 'd2d4 d7d5 c2c4 e7e6 g1f3 g8f6 g2g3 f8b4 c1d2 b4d2 d1d2 h7h6 b1c3 e8g8'
  },
  {
    score: 0.5,
    move: 'c2c4',
    depth: 14,
    pv: 'c2c4 e7e5 g2g3 g8f6 f1g2 b8c6 g1f3 d7d5 c4d5 f6d5 e1g1 f8e7 d2d4 e5e4'
  },
  {
    score: 0.4,
    move: 'e2e4',
    depth: 14,
    pv: 'e2e4 e7e6 d2d4 d7d5 e4e5 c7c5 c2c3 b8c6 g1f3 g8e7 f1d3 e7g6 e1g1 g6h4 f3h4 d8h4'
  }
]
