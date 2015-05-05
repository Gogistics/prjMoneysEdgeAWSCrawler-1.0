/* required modules */
var fs = require('fs'), 
    csv = require('fast-csv'),
	async = require('async');

/* file paths */
var csv_files = ["/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/RejectStatsA.csv",
				"/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/RejectStatsB.csv"];
/* end of new parser */

/* prototype two */
function parser_two(){
	async.forEach(csv_files, function (item, callback){ 
	    console.log(item); // print the key
	    callback(); // tell async that the iterator has completed

	}, function(err) {
	    console.log('iterating done');
	});
}
/* end */

/* node.js parser for multiple files with async */
GLOBAL.async_parser = GLOBAL.async_parser || {};
GLOBAL.async_parser.csvWritableStream = fs.createWriteStream("/var/www/prjTheEdge-Beta-1.0/media/static/frontend/files/lending_club/parsedRejectResult.csv");
GLOBAL.async_parser.csvWritableStream.on("finish", function(){
	console.log("finish parsing the file...")
});
GLOBAL.async_parser.csvWriteStream = csv.createWriteStream({ headers : true });
GLOBAL.async_parser.count = 0, GLOBAL.async_parser.ith_file = 0;
GLOBAL.async_parser.keys = [];
GLOBAL.async_parser.manipulated_obj = {};
GLOBAL.async_parser.csvWriteStream.pipe(GLOBAL.async_parser.csvWritableStream);
GLOBAL.async_parser.parse_files = function (arg_files){
										async.forEach(arg_files, function(file_path, callback){
											var csvReadStream = fs.createReadStream(file_path);
											// start to parse data
											var csvReadableStream = csv()
												.on("data", function(data){
													if(GLOBAL.async_parser.count === 0 || (JSON.stringify(data) === JSON.stringify(GLOBAL.async_parser.keys))){
														GLOBAL.async_parser.keys = data;
													}else{
														GLOBAL.async_parser.state_index = GLOBAL.async_parser.keys.indexOf("State");
														GLOBAL.async_parser.current_state = data[GLOBAL.async_parser.state_index];
													
														// get annual inc
														GLOBAL.async_parser.amount_requested_index = GLOBAL.async_parser.keys.indexOf("Amount Requested");
														GLOBAL.async_parser.current_amount_requested = data[GLOBAL.async_parser.amount_requested_index];
													
														// get loan amnt
														GLOBAL.async_parser.debt_to_income_ratio_index = GLOBAL.async_parser.keys.indexOf("Debt-To-Income Ratio");
														GLOBAL.async_parser.debt_to_income_ratio = data[GLOBAL.async_parser.debt_to_income_ratio_index];
														
														// get date
														GLOBAL.async_parser.date_index = GLOBAL.async_parser.keys.indexOf("Application Date");
														GLOBAL.async_parser.date = data[GLOBAL.async_parser.date_index];
														
														if( new Date(GLOBAL.async_parser.date).valueOf() < new Date("2013-11-5").valueOf() ){
															console.log(GLOBAL.async_parser.date + "FICO");
														}else{
															console.log(GLOBAL.async_parser.date + "VANTAGE");
														}
														
														//
														var temp_debt_to_inc_ratio = Number(GLOBAL.async_parser.debt_to_income_ratio.slice(0, -1));
														if( GLOBAL.async_parser.current_state !== undefined &&
															GLOBAL.async_parser.current_state !== "" &&
															GLOBAL.async_parser.current_state === GLOBAL.async_parser.current_state.toUpperCase() &&
															!(GLOBAL.async_parser.current_state in GLOBAL.async_parser.manipulated_obj) &&
															temp_debt_to_inc_ratio >= 0){
																GLOBAL.async_parser.manipulated_obj[GLOBAL.async_parser.current_state] = { state : GLOBAL.async_parser.current_state,
																																			numbers_of_loan : 1,
																																			amount_requested : Math.round(Number(GLOBAL.async_parser.current_amount_requested)),
																																			debt_to_income_ratio : Math.round(Number(GLOBAL.async_parser.debt_to_income_ratio.slice(0, -1)))};
														}else if(GLOBAL.async_parser.current_state !== undefined &&
																GLOBAL.async_parser.current_state !== "" &&
																GLOBAL.async_parser.current_state === GLOBAL.async_parser.current_state.toUpperCase() &&
																temp_debt_to_inc_ratio >= 0){
																	GLOBAL.async_parser.manipulated_obj[GLOBAL.async_parser.current_state].numbers_of_loan += 1;
																	GLOBAL.async_parser.manipulated_obj[GLOBAL.async_parser.current_state].amount_requested += Math.round(Number(GLOBAL.async_parser.current_amount_requested));
																	GLOBAL.async_parser.manipulated_obj[GLOBAL.async_parser.current_state].debt_to_income_ratio += Math.round(Number(GLOBAL.async_parser.debt_to_income_ratio.slice(0, -1)));
														}
													}
													
													// count iteration
													GLOBAL.async_parser.count += 1;
												})
												.on("end", function(){
										   			// close readable stream
													GLOBAL.async_parser.ith_file += 1;
													if(GLOBAL.async_parser.ith_file === csv_files.length){
												   		for (var key in GLOBAL.async_parser.manipulated_obj) {
												   		   	if (GLOBAL.async_parser.manipulated_obj.hasOwnProperty(key)) {
												   		     	GLOBAL.async_parser.csvWriteStream.write(GLOBAL.async_parser.manipulated_obj[key]);
												   		   	}
												   		}
											            console.log("end readable stream ; current count:" + GLOBAL.async_parser.count);
														console.log(JSON.stringify(GLOBAL.async_parser.manipulated_obj));
													}
												});
												
												// start to parse file
												csvReadStream.pipe(csvReadableStream);
										}, function(err){
											console.log("done with parsing files");
											if(err){
												console.log(err);
											}else{
												GLOBAL.async_parser.csvWriteStream.end();
												console.log(JSON.stringify(GLOBAL.async_parser.manipulated_obj));
											}
										});
									}

// start to parse
GLOBAL.async_parser.parse_files(csv_files);
/* end of parser */
