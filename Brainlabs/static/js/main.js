window.onload = function() {

	fetchTasks()
	var countries_cities_cache;
	var randomNumber;
	var randomContry;
	var randomCity;
	var attempt;
	var result;
	var history = [];

	async function fetchTasks() {
		const res = await fetch("https://countriesnow.space/api/v0.1/countries/capital");
		const data = await res.json();
		countries_cities_cache = data.data;
		resetGuesser();
	}

	function resetGuesser() {
		randomNumber = Math.floor(Math.random() * 251);
		randomContry = countries_cities_cache[randomNumber].name;
		randomCity = countries_cities_cache[randomNumber].capital;

		var country_h1 = document.getElementById('country');
		country_h1.innerHTML = randomContry;
		document.getElementById("answer").value = "";
	}

	function updateHistory() {
		var history_list = document.getElementById('history');
		var li = document.createElement("li");
		li.textContent = `${result} - Country: ${randomContry}, City: ${randomCity}`;
		history_list.appendChild(li);
	}

	var submit_btn = document.getElementById('submit');
	submit_btn.addEventListener('click', function() {
		attempt = document.getElementById("answer").value;
		var formatted_attempt = attempt.toLowerCase();
		var answer = randomCity.toLowerCase();

		var error_popup = document.getElementById('error');
		var correct_popup = document.getElementById('correct');
		var incorrect_popup = document.getElementById('incorrect');

		if (formatted_attempt) {
			if (formatted_attempt == answer) {
				result = "Correct";
				correct_popup.innerHTML = `That is correct, well done!`;
				correct_popup.classList.remove("d-none");
				setTimeout(() => {
					correct_popup.classList.add("d-none");
				}, 5000);
			} else {
				result = "Incorrect";
				incorrect_popup.innerHTML = `${attempt} is incorrect, the correct answer is ${randomCity}. Better luck next time!`;
				incorrect_popup.classList.remove("d-none");
				setTimeout(() => {
					incorrect_popup.classList.add("d-none");
				}, 5000);
			}
			updateHistory()
			resetGuesser();
		} else {
			error_popup.innerHTML = `Please enter a city name to continue`;
			error_popup.classList.remove("d-none");
			setTimeout(() => {
				error_popup.classList.add("d-none");
			}, 5000);
		}
	});

	var reset_btn = document.getElementById('reset');
	reset_btn.addEventListener('click', function() {
		result = `DNF`;
		history.push(countries_cities_cache[randomNumber]);
		updateHistory()
		resetGuesser();
	});
};