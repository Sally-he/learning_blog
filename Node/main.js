// exports.add = function () {
//     let sum = 0,
//         i = 0,
//         args = arguments,
//         l = args.length;
//     while (i < l) {
//         sum += args[i++];
//     }
//     return sum;
// }

// var counter1 = require('./counter');
// var counter2 = require('./counter');

// console.log(counter1.count());
// console.log(counter2.count());
// console.log(counter2.count());



// function copy(src, dst) {
//     fs.createReadStream(src).pipe(fs.createWriteStream(dst));
// }

// function main(argv) {
//     copy(argv[0], argv[1]);
// }
// main(process.argv.slice(2));

// var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);

// // console.log(bin[0]);

// // // var str = bin.toString('utf-8');
// // var sub = bin.slice(2);
// // sub[0] = 0x65;

// // console.log(bin);

// var dup = new Buffer(bin.length);

// bin.copy(dup);
// dup[0] = 0x48;

// console.log(bin);
// console.log(dup);


// var fs = fs.createReadStream(pathname);
// rs.on('data', function (chunk) {
//     rs.pause();
//     doSomething(chunk, function () {
//         rs.resume();
//     });
// });
// rs.on('end', function () {
//     cleanUp();
// });

var fs = require('fs');
function travel(dir, callback, finish) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

travel('/work/study/learning_blog/Node', function (pathname) {
    console.log(pathname);
})