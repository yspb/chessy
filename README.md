# chessy

Simple as a stick, stockfish nodejs client without spawning multiple os processes, crushing, memory leaking and so on.<br>

You can push new fen any time without waiting for engine search to complete.<br>

You can create as many instances of stockfish engine as you want.<br>

Install
-------------------------

Through npm with `npm install chessy`<br>

You also need stockfish binary from https://stockfishchess.org/download/linux/

Example with depth
-------------------------

      import chessy from './chessy'

      /*
        fen = string in chess position format (there is no fen validation in code!)
        multi = how many move lines to explore
        depth = the number of half moves (a move made by one side) the engine looks ahead
        callback = function called on every portion of results from engine
      */

      const test = chessy('/home/yspb/Downloads/stockfish_15_x64')
      
      test.analyze({ 
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        multi: 1,
        depth: 15,
        callback: console.log
      })
      
      //output example
      
      /*
      
      [ { score: 0.3, move: 'e2e4', depth: 1, pv: 'e2e4' } ]
      [ { score: 1.6, move: 'c2c4', depth: 4, pv: 'c2c4' } ]
      [ { score: 1.6, move: 'c2c4', depth: 4, pv: 'c2c4' } ]
      [ { score: 0.4, move: 'e2e4', depth: 6, pv: 'e2e4 c7c5 c2c3 b8c6' } ]
      ...
      
      */

Example without depth
-------------------------

      import chessy from './chessy'

      //if depth is not specified, engine will be in infinite search mode
      
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
