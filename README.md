# chessy

Simple as a stick, stockfish nodejs client without spawning multiple os processes, crushing, memory leaking and so on.<br>

You can push new fen any time without waiting for engine search to complete.<br>

You can create as many instances of stockfish engine as you want.<br>

Install
-------------------------

Through git with `git clone https://github.com/yspb/chessy.git`<br>

You also need stockfish binary from https://stockfishchess.org/download/linux/

Example with depth
-------------------------
```javascript
      import chessy from './chessy/index.js'

      /*
        fen = string in chess position format (there is no fen validation in the code!)
        multi = how many move lines to explore
        depth = the number of half moves (a move made by one side) the engine looks ahead
        callback = function called on every portion of results from engine
      */

      //path to the stockfish binary
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
      [ { score: 0.4, move: 'e2e4', depth: 15, pv: 'e2e4 c7c5 g1f3 d7d6 f1b5 c8d7 b5d7 b8d7 e1g1 g7g6 f1e1 g8f6' } ]
      
      */
```

Example without depth
-------------------------
```javascript
      import chessy from './chessy/index.js'

      //if depth is not specified, engine will be in infinite search mode
      
      //path to the stockfish binary
      const test2 = chessy('/home/yspb/Downloads/stockfish_15_x64')
      
      test2.analyze({ 
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        multi: 3,
        callback: console.log
      })
      
      setTimeout(() => {
        test2.stop()
        test2.quit()
      }, 10000)
 ```

Licence
-------------------------
MIT
