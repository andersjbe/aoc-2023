// The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

export function parse(input: string) {
  return input.trim().split('\n')
}

export function partOne(input: ReturnType<typeof parse>) {
  let sum = 0
  for (const line of input) {
    let s = ''
    let leftIdx = 0
    let rightIdx = line.length - 1
    while (leftIdx >= 0 || rightIdx >= 0) {
      if (leftIdx != -1) {
        const c = line.charAt(leftIdx)
        if (/\d/.test(c)) {
          s = c + s
          leftIdx = -1
        } else {
          leftIdx++
        }
      }
      if (rightIdx != -1) {
        const c = line.charAt(rightIdx)
        if (/\d/.test(c)) {
          s = s + c
          rightIdx = -1
        } else {
          rightIdx--
        }
      }
    }
    const num = parseInt(s)
    sum += num
  }
  return sum
}

export function partTwo(input: ReturnType<typeof parse>) {
  const startingChars = /(e|f|n|o|s|t|z)/
  const endingChars = /(e|n|o|r|t|x)/

  let sum = 0
  for (const line of input) {
    let s = ''
    let leftIdx = 0
    let rightIdx = line.length - 1
    while (leftIdx >= 0 || rightIdx >= 0) {
      if (leftIdx != -1) {
        const c = line.charAt(leftIdx)
        if (startingChars.test(c)) {
          const len = s.length
          s = matchStartingChar(leftIdx, line) + s
          if (s.length > len) leftIdx = -1
          else leftIdx++
        } else if (/\d/.test(c)) {
          s = c + s
          leftIdx = -1
        } else {
          leftIdx++
        }
      }
      if (rightIdx != -1) {
        const c = line.charAt(rightIdx)
        if (endingChars.test(c)) {
          const len = s.length
          s = s + matchEndingChar(rightIdx, line)
          if (s.length > len) rightIdx = -1
          else rightIdx--
        } else if (/\d/.test(c)) {
          s = s + c
          rightIdx = -1
        } else {
          rightIdx--
        }
      }
    }
    const num = parseInt(s)
    sum += num
  }
  return sum
}

function matchStartingChar(i: number, line: string) {
  switch (line[i]) {
    case 'e':
      if (line.slice(i, i + 5) == 'eight') return '8'
      break
    case 'f':
      if (line.slice(i, i + 4) == 'four') return '4'
      if (line.slice(i, i + 4) == 'five') return '5'
      break
    case 'n':
      if (line.slice(i, i + 4) == 'nine') return '9'
      break
    case 'o':
      if (line.slice(i, i + 3) == 'one') return '1'
      break
    case 's':
      if (line.slice(i, i + 3) == 'six') return '6'
      if (line.slice(i, i + 5) == 'seven') return '7'
      break
    case 't':
      if (line.slice(i, i + 3) == 'two') return '2'
      if (line.slice(i, i + 5) == 'three') return '3'
      break
    case 'z':
      if (line.slice(i, i + 4) == 'zero') return '0'
      break
  }
  return ''
}

function matchEndingChar(i: number, line: string) {
  switch (line[i]) {
    case 'e':
      if (line.slice(i - 2, i + 1) == 'one') return '1'
      if (line.slice(i - 4, i + 1) == 'three') return '3'
      if (line.slice(i - 3, i + 1) == 'five') return '5'
      if (line.slice(i - 3, i + 1) == 'nine') return '9'
      break
    case 'n':
      if (line.slice(i - 4, i + 1) == 'seven') return '7'
      break
    case 'o':
      if (line.slice(i - 3, i + 1) == 'zero') return '0'
      if (line.slice(i - 2, i + 1) == 'two') return '2'
      break
    case 'r':
      if (line.slice(i - 3, i + 1) == 'four') return '4'
      break
    case 't':
      if (line.slice(i - 4, i + 1) == 'eight') return '8'
      break
    case 'x':
      if (line.slice(i - 2, i + 1) == 'six') return '6'
      break
  }
  return ''
}
