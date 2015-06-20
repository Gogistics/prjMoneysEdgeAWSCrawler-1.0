var fs = require('fs');

function get_line(filename, line_no, callback) {
    var data = fs.readFileSync(filename, 'utf8');
    var lines = data.split("\n");

    if(+line_no > lines.length){
      throw new Error('File end reached without finding line');
    }
    callback(null, lines[+line_no]);
	
  	var line = lines[0].replace(/"/g, '\\"');
	var data_ary = line.split(',');
	var index = data_ary.indexOf('url');
	//
	lines.forEach(function(elem, ith){
		if(index !== 0){
			elem = elem.replace(/"/g, ' ');
			elem = elem.split(',');
			console.log(elem[index]);
		}
	});
}

get_line('/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/LoanStats3a.csv', 0, function(err, line){
  	/* var data = line.replace(/"/g, '');
	console.log(data);
	data = data.split(',');
	console.log(data);
	console.log(data[data.indexOf('url')]); */
	console.log('done...');
})