function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateGoalkeeperSaveChanceB() {
    const goalkeeperSaveChanceB = generateRandomNumber(30, 99) / 100;
    return goalkeeperSaveChanceB;
}
export default  generateGoalkeeperSaveChanceB;