export function parse(input: string) {
  return input.trim().split('\n')
}

export function partOne(input: ReturnType<typeof parse>) {
  // Look for numbers
  // When a number is found, identify the full number
  // Look for adjacent symbols
  // If there is at least one, add the full number to the sum
  let nums = []

  let l = 0
  while (l < input.length) {
    const line = input.at(l)
    if (!line) throw new Error('Bad input')

    let i = 0
    let fullNum = ''
    let hasSymbol = false
    while (i < line.length) {
      const char = line.charAt(i)
      if (/\d/.test(char)) {
        fullNum += char
        if (!hasSymbol) {
          let symbol = lookForSymbol(input, l, i)

          if (symbol.length > 0) {
            hasSymbol = true
          }
        }
        if (hasSymbol && i === line.length - 1) {
          nums.push(parseInt(fullNum))
          hasSymbol = false
          fullNum = ''
        }
      } else if (fullNum.length > 0) {
        if (hasSymbol) {
          nums.push(parseInt(fullNum))
          hasSymbol = false
        }

        fullNum = ''
      }
      i++
    }
    l++
  }

  return nums.reduce((acc, num) => acc + num)
}

console.log(
  partTwo(
    parse(`
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`)
  )
)

function getAdjacentChars(
  lines: ReturnType<typeof parse>,
  l: number,
  i: number
) {
  return [
    lines.at(l - 1)?.charAt(i - 1) || '',
    lines.at(l - 1)?.charAt(i) || '',
    lines.at(l - 1)?.charAt(i + 1) || '',
    lines.at(l)?.charAt(i - 1) || '',
    lines.at(l)?.charAt(i + 1) || '',
    lines.at(l + 1)?.charAt(i - 1) || '',
    lines.at(l + 1)?.charAt(i) || '',
    lines.at(l + 1)?.charAt(i + 1) || ''
  ]
}

function lookForSymbol(lines: ReturnType<typeof parse>, l: number, i: number) {
  const rx = /(\d|\.)/
  const chars = getAdjacentChars(lines, l, i)

  for (const c of chars) {
    if (c && !rx.test(c)) return c
  }

  return ''
}

export function partTwo(input: ReturnType<typeof parse>) {
  const getFullNumber = (l: number, i: number) => {
    let fullNumber = input.at(l)?.charAt(i) || ''
    if (fullNumber === 'X') return ''

    input[l] =
      input[l]?.slice(0, i) + 'X' + input[l]?.slice(i + 1, input[i]?.length)

    let toStart = i,
      toEnd = i

    do {
      if (toEnd >= 0) {
        toEnd += 1
        const endChar = input[l]?.charAt(toEnd) || ''
        if (/\d/.test(endChar)) {
          fullNumber = fullNumber + endChar
          input[l] =
            input[l]?.slice(0, toEnd) + 'X' + input[l]?.slice(toEnd + 1)
        } else {
          toEnd = -1
        }
      }
      if (toStart >= 0) {
        toStart -= 1
        const startChar = input[l]?.charAt(toStart) || ''
        if (/\d/.test(startChar)) {
          fullNumber = startChar + fullNumber
          input[l] =
            input[l]?.slice(0, toStart) + 'X' + input[l]?.slice(toStart + 1)
        } else {
          toStart = -1
        }
      }
    } while (toStart >= 0 || toEnd >= 0)

    return fullNumber
  }

  const lookForNumbers = (l: number, i: number) => {
    const numbers: string[] = []

    const chars = getAdjacentChars(input, l, i)
    chars.forEach((c, j) => {
      if (/\d/.test(c)) {
        switch (j) {
          case 0:
            numbers.push(getFullNumber(l - 1, i - 1))
            break
          case 1:
            numbers.push(getFullNumber(l - 1, i))
            break
          case 2:
            numbers.push(getFullNumber(l - 1, i + 1))
            break
          case 3:
            numbers.push(getFullNumber(l, i - 1))
            break
          case 4:
            numbers.push(getFullNumber(l, i + 1))
            break
          case 5:
            numbers.push(getFullNumber(l + 1, i - 1))
            break
          case 6:
            numbers.push(getFullNumber(l + 1, i))
            break
          case 7:
            numbers.push(getFullNumber(l + 1, i + 1))
            break
        }
      }
    })
    return numbers.filter(n => n)
  }

  let sum = 0
  input.forEach((line, l) => {
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char == '*') {
        const adjNums = lookForNumbers(l, i)
        if (adjNums.length == 2) {
          sum += parseInt(adjNums[0] || '') * parseInt(adjNums[1] || '')
        }
      }
    }
  })
  return sum
}
