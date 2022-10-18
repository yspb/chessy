# chessy
simple stockfish nodejs client


const test = chessy('/home/yspb/Downloads/stockfish_15_x64')

test.analyze({ 
  fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  multi: 3,
  depth: 15,
  callback: console.log
})
