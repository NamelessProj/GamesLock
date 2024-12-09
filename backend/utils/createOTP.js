const createOTP = (numOfDigits=6) => {
    const digits = numOfDigits > 6 ? 5 : numOfDigits - 1; // Limit the number of digits to 6. And soustract 1
    const addNum = Math.pow(10, digits); // Calculate the minimum number to be added to the random number. If numOfDigits = 6 then addNum = 100000
    const multiplyNum = Math.pow(10, digits) * 9; // Calculate the maximum number to be multiplied to the random number. If numOfDigits = 6 then multiplyNum = 900000
    return Math.floor(addNum + Math.random() * multiplyNum).toString(); // Generate a random number with a fixed number of digits and return it as a string
}

module.exports = {
    createOTP
}