var height = 6;
for (var i = 1; i <= height; i++) {
    var string = '';
    var j = i;
    while (j) {
        string += '*';
        j--;
    }
    console.log(string);
}