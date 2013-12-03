// author: http://habrahabr.ru/post/204628/

function parseString (title) {
	title = title.toLowerCase()
		.replace(/одиннадцать/g, "11##")
		.replace(/двенадцать/g, "12##")
		.replace(/тринадцать/g, "13##")
		.replace(/четырнадцать/g, "14##")
		.replace(/пятнадцать/g, "15##")
		.replace(/шестнадцать/g, "16##")
		.replace(/семнадцать/g, "17##")
		.replace(/восемнадцать/g, "18##")
		.replace(/девятнадцать/g, "19##")
		.replace(/двадцать/g, "20##")
		.replace(/тридцать/g, "30##")
		.replace(/сорок/g, "40##")
		.replace(/пятьдесят/g, "50##")
		.replace(/шестьдесят/g, "60##")
		.replace(/семьдесят/g, "70##")
		.replace(/восемьдесят/g, "80##")
		.replace(/девяносто/g, "90##")
		.replace(/сто/g, "100##")
		.replace(/двести/g, "200##")
		.replace(/триста/g, "300##")
		.replace(/четыреста/g, "400##")
		.replace(/пятьсот/g, "500##")
		.replace(/шестьсот/g, "600##")
		.replace(/семьсот/g, "700##")
		.replace(/восемьсот/g, "800##")
		.replace(/девятьсот/g, "900##")
		.replace(/(один|одну)/g, "1##")
		.replace(/(два|две)/g, "2##")
		.replace(/три/g, "3##")
		.replace(/четыре/g, "4##")
		.replace(/пять/g, "5##")
		.replace(/шесть/g, "6##")
		.replace(/семь/g, "7##")
		.replace(/восемь/g, "8##")
		.replace(/девять/g, "9##")
		.replace(/десять/g, "10##")
		.replace(/ноль/g, "0##")
		.replace(/несколько/g, "3##")

		.replace(/^минут(а|у)/, "1 минута")
		.replace(/^час/, "1 час")
		.replace(/^день/, "1 день")
		.replace(/^недел(я|ю)/, "1 неделя")
		.replace(/^месяц/, "1 месяц")
		.replace(/^год/, "1 год")

		while (tmp = title.match (/(\d+)## (\d+)##/)) {
			title = title.replace (tmp[0], parseInt(tmp[1])+parseInt(tmp[2])+'##');
		}
	
	var answer = "";
	var did = false;
	var mytime = "";
	var mydate = new Date();
	var newdate = new Date();
	
	var d = {
		myhours: 0,
		myminutes: 0,
		mydays: 0,
		mymonth: 0,
		myyears: 0,
		myweek: 0
	};
	

	var pattern = /(\d{1,2}.\d{1,2}.\d{4})/g;
	var matches = title.match(pattern);

	if (matches) {
		pattern = /(\d{1,4})/g;
		
		var matches2 = matches[0].match(pattern);
		newdate.setDate(matches2[0]);
		newdate.setMonth(matches2[1] - 1);
		newdate.setFullYear(matches2[2]);
		answer = matches2[0] + "." + matches2[1] + "." + matches2[2];
		did = true;
	}


	pattern = /(\d{1,2} янв)|(\d{1,2} фев)|(\d{1,2} мар)|(\d{1,2} апр)|(\d{1,2} мая)|(\d{1,2} май)|(\d{1,2} июн)|(\d{1,2} июл)|(\d{1,2} авг)|(\d{1,2} сен)|(\d{1,2} окт)|(\d{1,2} ноя)|(\d{1,2} дек)/g;
	matches = title.match(pattern);

	if (matches) {
		pattern = /(\d{4})/g;
		matches2 = title.match(pattern); //найти год
		pattern = /(янв)|(фев)|(мар)|(апр)|(мая)|(май)|(июн)|(июл)|(авг)|(сен)|(окт)|(ноя)|(дек)/g;
		matches3 = title.match(pattern); //найти месяц
		pattern = /(\d{1,2})/g;
		matches4 = matches[0].match(pattern); //найти дату
		
		if (matches3[0] == "янв") var mymonth = 1;
		if (matches3[0] == "фев") var mymonth = 2;
		if (matches3[0] == "мар") var mymonth = 3;
		if (matches3[0] == "апр") var mymonth = 4;
		if (matches3[0] == "мая") var mymonth = 5;
		if (matches3[0] == "май") var mymonth = 5;
		if (matches3[0] == "июн") var mymonth = 6;
		if (matches3[0] == "июл") var mymonth = 7;
		if (matches3[0] == "авг") var mymonth = 8;
		if (matches3[0] == "сен") var mymonth = 9;
		if (matches3[0] == "окт") var mymonth = 10;
		if (matches3[0] == "ноя") var mymonth = 11;
		if (matches3[0] == "дек") var mymonth = 12;
		
		newdate.setDate(matches4[0]);
		newdate.setMonth(mymonth - 1);

		if (matches2) newdate.setFullYear(matches2[0]);
		answer = matches4[0] + " " + matches3[0];
		did = true;
	}


	pattern = /(вчера)|(позавчера)|(сегодня)|(завтра)|(послезавтра)/g;
	matches = title.match(pattern);

	if (matches) {
		if (matches[0] == "позавчера") var add_days = -2;
		if (matches[0] == "вчера") var add_days = -1;
		if (matches[0] == "сегодня") var add_days = 0;
		if (matches[0] == "завтра") var add_days = +1;
		if (matches[0] == "послезавтра") var add_days = +2;
		newdate.setDate(newdate.getDate() + add_days);
		answer = " + " + matches[0];
		did = true;
	}

	pattern = /(\d{1,2}ч|\d{1,2} ч)|(в \d{1,2}:\d{1,2})|(в\d{1,2}:\d{1,2})|(\d{2} ми)|(\d{2}ми)|(\d{1,2} \d{2}м)|(в \d{1,2})|(в\d{1,2})|(\d{1,2}:\d{1,2})/g;
	matches = title.match(pattern);

	if (matches) {
		if (matches.length == 1) {
			mytime = matches;
		} else {
			mytime = matches.join(" ");
		}
	}


	var matches2 = title.match(/\d{1,4}/g); //все двух-значные цифры
	var plus;

	pattern = /(дней|лет|нед|год|мес|день|дня|час|мин|\d{1,2}м|\d{1,2} м)/g;
	matches = title.match(pattern);

	//если "через 2 часа 30 минут"
	if (((title.indexOf("назад") != -1) || (title.indexOf("через") != -1)) && matches) {
		if (title.indexOf("через") != -1) {
			plus = "+";
		} else {
			plus = "-";
		}	

		if (matches[0] == "час") { //если указаны часы и минуты
			if (matches2) {
				answer = plus;

				if (matches2[0]) {
					answer += matches2[0] + " час.";
					d.myhours = plus + matches2[0];
				}

				if (matches2[1]) {
					answer += " " + matches2[1] + " мин.";
					d.myminutes = plus + matches2[0];
				}

				mytime = ""; //это не время
			}
		}

		if (matches[0] == "мин" || (matches[0][matches[0].length - 1] == "м" && (title.indexOf("мес") == -1))) { //если указаны только минуты
			if (matches2) {
				answer = plus;

				if (matches2[0]) {
					answer += " " + matches2[0] + " minute";
					d.myminutes = plus + matches2[0];
				}

				mytime = ""; //это не время
			}
		}

		if (matches[0] == "нед") { //если указаны только недели
			if (matches2) {
				answer = plus;

				if (matches2[0]) {
					answer += "" + matches2[0] + " нед.";
					d.myweek = plus + matches2[0];
				};
			}

			if (title.indexOf("через нед") != -1) {
				answer = "+ 1 нед.";
				d.myweek = plus + 1
			};
		}

		if (title.indexOf("месяц") != -1) { //если указаны только месяцы
			if (matches2) {
				answer = plus;

				if (matches2[0]) {
					answer += "" + matches2[0] + " мес.";
					d.mymonth = plus + matches2[0];
				};
			}

			if (title.indexOf("через мес") != -1) {
				answer = "+ 1 мес.";
				d.mymonth = plus + 1;
			};
		}

		if ((title.indexOf(" год") != -1) || (title.indexOf(" лет") != -1)) { //если указаны только месяцы
			if (matches2) {
				answer = plus;
				if (matches2[0]) {
					answer += "" + matches2[0] + " год.";
					d.myyears = plus + matches2[0];
				};
			}

			if (title.indexOf("через год") != -1) {
				answer = "+ 1 год.";
				d.myyears = plus + 1;
			};
		}

		if ((title.indexOf(" день") != -1) || (title.indexOf(" дня") != -1) || (title.indexOf(" дней") != -1)) { //если указаны только месяцы
			if (matches2) {
				answer = plus;
				if (matches2[0]) {
					answer += "" + matches2[0] + " дн.";
					d.mydays = plus + matches2[0];
				};
			}

			if (title.indexOf("через год") != -1) {
				answer = "+ 1 дн.";
				d.mydays = plus + 1;
			};
		}
	}

	if (mytime != "") {
		///анализ времени
		pattern = /(в \d{1,2})|(в\d{1,2})|(\d{1,2}:\d{1,2})/g;
		matches = mytime.toString().match(pattern);

		if (matches) {
			need_analyse = mytime.toString().match(/(в \d{1,2} в \d{1,2})|(\d{1,2} \d{1,2}м)|(\d{1,2}ч\d{1,2}м)|(\d{1,2}ч \d{1,2}м)|(\d{1,2}:\d{1,2})/g);
			pattern1 = /(в \d{1,2}:\d{1,2})|(в\d{1,2}:\d{1,2})/g;
			matches1 = mytime.toString().match(pattern1);
			
			if (matches1) need_analyse = false;
			
			if (!need_analyse) {
				mytime = mytime.toString().replace("в ", "").replace("в", "");
				
				if (!matches1) mytime += ":00";
			} else {
				matches3 = mytime.toString().match(/\d{1,4}/g); //все двух-значные цифры
				
				if (matches3) {
					if (matches3.length == 1) mytime = matches3;
				} else {
					mytime = matches3.join(":");
				}
			}
		}
	}

	if (mytime != "") {
		var add = "[" + mytime + "]";
	} else {
		var add = "";
	}

	if ((mytime != "")) {
		if (mytime.toString().match(/\d{1,2}:\d{1,2}/g)) {
			newtime = mytime.toString().split(":");
			mydate.setHours(parseInt(newtime[0]), 10);
			mydate.setMinutes(parseInt(newtime[1], 10));
			mydate.setSeconds(0);
		} else {
			mytime = "";
		}
	}

	if (did) {
		newdate.setHours(mydate.getHours() + parseInt(d.myhours, 10));
		newdate.setMinutes(mydate.getMinutes() + parseInt(d.myminutes, 10));
		newdate.setSeconds(0);
		mydate = newdate;
	} else {
		mydate.setHours(mydate.getHours() + parseInt(d.myhours, 10));
		mydate.setMinutes(mydate.getMinutes() + parseInt(d.myminutes, 10));
		mydate.setSeconds(0);
	}

	mydate.setDate(mydate.getDate() + parseInt(d.mydays, 10) + parseInt(d.myweek * 7, 10));
	mydate.setMonth(mydate.getMonth() + parseInt(d.mymonth, 10));
	mydate.setYear(mydate.getFullYear() + parseInt(d.myyears, 10));
	

	pattern = /(понед)|(вторн)|(сред)|(четв)|(пятн)|(субб)|(воскр)/g;
	matches = title.match(pattern);

	if (matches) {
		week = 0;
		
		if (matches[0] == "понед") week = 1;
		if (matches[0] == "вторн") week = 2;
		if (matches[0] == "сред") week = 3;
		if (matches[0] == "четв") week = 4;
		if (matches[0] == "пятн") week = 5;
		if (matches[0] == "субб") week = 6;
		if (matches[0] == "воскр") week = 7;
		
		if (week != 0) {
			mydate = function (date, day) {
				(day = (Math.abs(+day || 0) % 7) - date.getDay()) < 0 && (day += 7);
				return day && date.setDate(date.getDate() + day), date;
			}(mydate, week);

			answer = matches[0];
		}
	}

	if ((answer == "") && (mytime == "")) mydate = "";

	return {
		title: answer + " " + add,
		date: mydate
	};
}

module.exports = function (string) {
	return parseString (string);
};

