export function parse(input: string) {
  const lines = input.trim().split('\n')
  const gameSets: Record<
    number,
    { red: number; blue: number; green: number }[]
  > = {}
  return lines.reduce((acc, line) => {
    const [game, sets] = line.split(': ')
    if (!game || !sets) throw new Error('error parsing game')
    const gameNumber = parseInt(game?.split(' ').at(1) || '')
    acc[gameNumber] = []

    sets.split('; ').forEach(set => {
      const cubesQty = {
        red: 0,
        blue: 0,
        green: 0
      }
      set.split(', ').map(cube => {
        const [qty, color] = cube.split(' ')
        if (!qty || !color) throw new Error('error parsing game')

        switch (color) {
          case 'red':
            cubesQty.red = parseInt(qty)
            break
          case 'blue':
            cubesQty.blue = parseInt(qty)
            break
          case 'green':
            cubesQty.green = parseInt(qty)
            break
        }
      })

      acc[gameNumber]?.push(cubesQty)
    })

    return acc
  }, gameSets)
}

export function partOne(input: ReturnType<typeof parse>) {
  const bag = {
    red: 12,
    green: 13,
    blue: 14
  }
  return Object.entries(input)
    .filter(([set, cubeSets]) => {
      return cubeSets.every(
        cubes =>
          cubes.red <= bag.red &&
          cubes.green <= bag.green &&
          cubes.blue <= bag.blue
      )
    })
    .reduce((acc, set) => {
      return acc + parseInt(set[0])
    }, 0)
}
// console.log(
//   partTwo(
//     parse(`
// Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
// `)
//   )
// )

export function partTwo(input: ReturnType<typeof parse>) {
  let sum = 0
  Object.values(input).forEach(game => {
    let red = 1,
      blue = 1,
      green = 1
    game.forEach(set => {
      if ((set.red ?? 0) > red) red = set.red
      if ((set.green ?? 0) > green) green = set.green
      if ((set.blue ?? 0) > blue) blue = set.blue
    })
    sum += red * blue * green
  })
  return sum
}
