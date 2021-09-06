for (var x = 1; x <= 10; x++) {
    var string = '';
    for (var y = 1; y <= 10; y++) {
        string += `${x*y}\t`;
    }
    console.log(string);
}