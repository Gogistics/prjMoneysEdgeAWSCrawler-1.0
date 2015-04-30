/* required modules */
var fs = require('fs'), 
    csv = require('fast-csv'),
	async = require('async');

/* file paths */
var csv_files = ["/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/LoanStats3a.csv",
				"/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/LoanStats3b.csv",
				"/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/LoanStats3c.csv"];
function parse_files(){
	async.eachSeries(csv_files,
					function(filename, callback){
						fs.readFile(filename, function(err, content){
							if(!err){
								console.log('-*-');
								console.log(content);
								console.log('-*-');
							};
			
							// callback
							callback(err);
						});
					},
					function(err){
						console.log('=*=');
						console.log('done with new parser');
						console.log('=*=');
					});
};
parse_files();
/* end of new parser */



/* old simple parser for single file */
var csvReadStream = fs.createReadStream("/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/LoanStats3a.csv");

var csvWriteStream = csv.createWriteStream({ headers : true }),
    csvWritableStream = fs.createWriteStream("/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/parsedLoanStats3a.csv");
csvWritableStream.on("finish", function(){
	console.log("done with writable stream.");
});
csvWriteStream.pipe(csvWritableStream);

/* readable stream */
var count = 0, keys,
	addr_state_index, current_addr_state,
	numbers_of_loan,
	annual_inc_index, current_annual_inc,
	loan_amnt_index, current_loan_amnt,
	manipulated_obj = {};
var csvReadableStream = csv()
    .on("data", function(data){
		if(count === 0){
			keys = data;
		}else{
			// get addr_state
			addr_state_index = keys.indexOf("addr_state");
			current_addr_state = data[addr_state_index];
			// get annual inc
			annual_inc_index = keys.indexOf("annual_inc");
			current_annual_inc = data[annual_inc_index];
			// get loan amnt
			loan_amnt_index = keys.indexOf("loan_amnt");
			current_loan_amnt = data[loan_amnt_index];
			if(current_addr_state !== undefined && current_addr_state !== "" && !(current_addr_state in manipulated_obj)){
				manipulated_obj[current_addr_state] = { addr_state : current_addr_state, numbers_of_loan : 1, total_annual_inc : Number(current_annual_inc), total_loan_amnt : Number(current_loan_amnt)};
			}else if(current_addr_state !== undefined && current_addr_state !== ""){
				manipulated_obj[current_addr_state].numbers_of_loan += 1;
				manipulated_obj[current_addr_state].total_annual_inc += Number(current_annual_inc);
				manipulated_obj[current_addr_state].total_loan_amnt += Number(current_loan_amnt);
			}
		}
		count += 1;
    })
    .on("end", function(){
         console.log("done");
		 for (var key in manipulated_obj) {
		   	if (manipulated_obj.hasOwnProperty(key)) {
		     	csvWriteStream.write(manipulated_obj[key]);
		   	}
		 }
		 csvWriteStream.end();
    });
 
csvReadStream.pipe(csvReadableStream);
