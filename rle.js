let fs = require('fs');
let arg = process.argv;
let inText;
let a = 1, i = 0, t = 0;
let line="";
let line2="";
fs.readFile(arg[2], (err, data) => {
	if (err){
		console.error(err);
		return;
	}
	inText = data.toString();
	while (i < inText.length) {
		while (inText.charAt(i) == inText.charAt(i + a))
			a++;
		let t=a;
		while (a > 255) {
			a = a - 255;
			line += "#" + String.fromCharCode(255) + inText.charAt(i);
		}
		if (a > 3) {
			line += "#" + String.fromCharCode(a) + inText.charAt(i);
		}
		if (a <= 3) {
			if (inText.charAt(i) == "#")
				line += "#" + String.fromCharCode(a) + inText.charAt(i)
			else {
				let q = 0;
				while (q < a) {
					line += inText.charAt(i);
					q += 1;
					console.log(a,q);
				}
			}
		}
		i += t;
		a = 1;
	}
	fs.writeFile('input.txt', line, (err) => {
		if (err){
			console.err(err);
			return;
		}
	});
	i=0
	while (i<line.length){
		if (line[i]!="#")  {
			line2+=line[i];
			i+=1;
		}
		else {
			for (j=0;j<line[i+1].charCodeAt(0);j++){
				line2+=line[i+2];
			}
			i+=3;
		}
	}
	fs.writeFile('output.txt', line2, (err) => {
		if (err){
			console.err(err);
			return;
		}
		});
});