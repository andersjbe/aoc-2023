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

// console.log(
//   partOne(
//     parse(`
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
// `)
//   )
// )

function lookForSymbol(lines: ReturnType<typeof parse>, l: number, i: number) {
  const rx = /(\d|\.)/
  const chars = [
    lines.at(l - 1)?.charAt(i) || '',
    lines.at(l - 1)?.charAt(i + 1) || '',
    lines.at(l)?.charAt(i + 1) || '',
    lines.at(l + 1)?.charAt(i + 1) || '',
    lines.at(l + 1)?.charAt(i) || '',
    lines.at(l + 1)?.charAt(i - 1) || '',
    lines.at(l)?.charAt(i - 1) || '',
    lines.at(l - 1)?.charAt(i - 1) || ''
  ]
  // console.log({ char: lines.at(l)?.charAt(i), chars })

  for (const c of chars) {
    if (c && !rx.test(c)) return c
  }

  return ''
}

export function partTwo(input: ReturnType<typeof parse>) {}
