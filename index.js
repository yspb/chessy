import { spawn } from 'child_process'
import { EOL } from 'os'

const chessy = (path) => {
  let globs = {
    best: []
  }

  const analyze = ({ fen, multi = 3, depth = null, callback = null } = {}) => {
    globs.order = fen.split(' ')[1]
    globs.multi = multi
    globs.callback = callback
    globs.best = []

    proc.stdin.write(`stop${EOL}`)
    proc.stdin.write(`isready${EOL}`)
    proc.stdin.write(`position fen ${fen}${EOL}`)
    proc.stdin.write(`isready${EOL}`)
    proc.stdin.write(`setoption name MultiPV value ${multi}${EOL}`)
    proc.stdin.write(`isready${EOL}`)

    if (depth) proc.stdin.write(`go depth ${depth}${EOL}`)
      else proc.stdin.write(`go${EOL}`)
  }

  const stop = () => proc.stdin.write(`stop${EOL}`)

  const quit = () => proc.stdin.write(`quit${EOL}`)

  const parse = res => {
    if (res.includes('readyok')) {
      globs.best = []
      return
    }

    res = res.split('\n')
    .filter(item => item.includes('seldepth'))
    .filter(item => !item.includes('lowerbound'))
    .filter(item => !item.includes('upperbound'))
    .map(str => {
      let depth = str.split(' depth ')[1].split(' ')[0].trim() * 1
      let score = str.split(' score ')[1].split('nodes')[0].trim()
      let pv = str.split(' pv ')[1].trim()
      let move = pv.split(' ')[0]

      if (score.includes('mate')) {
        let value = score.split('mate')[1] * 1
        if (value > 0) score = 10000 - value
          else score = -10000 - value
      }
        else score = score.split('cp')[1] * 1

      if (globs.best.map(item => item.move).includes(move)) {
        globs.best = globs.best.filter(item => item.move !== move)
      }
      globs.best.push({ score, move, depth, pv })

      globs.best = globs.best
      .filter(item => item.depth >= depth - 1)
      .sort((a, b) => b.score - a.score)
      .slice(0, globs.multi)
    })

    const out = globs.best.map(item => {
      let buf = Object.assign({}, item)
      if (buf.score > 9900) buf.score = `win in ${10000 - buf.score}`
        else if (buf.score < -9900) {
          buf.score = `lose in ${10000 - Math.abs(buf.score)}`
        }
          else {
            if (globs.order === 'b') buf.score = -buf.score
            buf.score = (Math.round(buf.score * 1) * 0.01).toFixed(1) * 1
          }

      return buf
    })
    
    if (out.length && (typeof globs.callback === 'function')) {
      globs.callback(out)
    }
  }

  const proc = spawn(path)
  proc.stdout.setEncoding('utf8')
  proc.stdin.write(`uci${EOL}`)
  proc.stdout.on('data', parse)

  return { analyze, stop, quit }
}

export { chessy }
