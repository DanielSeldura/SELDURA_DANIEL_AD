var number = 6;

function isPrime(num) {
    for (var i = 2; i < num; i++)
        if (num % i === 0) return false;
    return num > 1;
}

console.log(`${number} is a prime number? ${isPrime(number)}`);