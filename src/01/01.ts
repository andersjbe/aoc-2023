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

export function partTwo(input: ReturnType<typeof parse>) {}
