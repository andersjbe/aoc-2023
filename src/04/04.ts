export function parse(input: string) {
  return input
    .trim()
    .split('\n')
    .map(line =>
      (line.split(':')[1] || '').split(' | ').reduce(
        (acc, list, i) => {
          const nums = new Set(
            list
              .split(' ')
              .filter(n => n)
              .map(n => parseInt(n))
          )
          if (i == 0) acc.winning = nums
          acc.received = nums
          return acc
        },
        { winning: new Set(), received: new Set() } as {
          winning: Set<number>
          received: Set<number>
        }
      )
    )
}

export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, card) => {
    let matches = 0
    card.winning.forEach(num => {
      if (card.received.has(num)) {
        matches += 1
      }
    })
    if (matches === 0) return acc
    const score = 2 ** (matches - 1)

    return acc + score
  }, 0)
}

// console.log(
//   partOne(
//     parse(`
// Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
// Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
// Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
// Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
// Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
// Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
// `)
//   )
// )

export function partTwo(input: ReturnType<typeof parse>) {}
