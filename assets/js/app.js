$(document).ready(function () {

	var searchGifs = {
		searchTerms: ["The Godfather", "The Shawshank Redemption", "Schindler's List", "Raging Bull", "Casablanca", "Citizen Kane",
			"Gone with the Wind", "The Wizard of Oz", "One Flew Over the Cuckoo's Nest", "Lawrence of Arabia", "Vertigo", "Psycho", "The Godfather: Part II",
			"On the Waterfront", "Sunset Blvd", "Forrest Gump", "The Sound of Music", "12 Angry Men", "West Side Story", "Star Wars: Episode IV - A New Hope","Pulp Fiction","The Big Lebowski",
		],
		createButtons: function () {
			for (var i = 0; i < searchGifs.searchTerms.length; i++) {
				var newBttn = $('<button>');
				newBttn.attr("data-search", searchGifs.searchTerms[i]);
				newBttn.addClass("btn");
				newBttn.addClass("searchButtons");
				newBttn.text(searchGifs.searchTerms[i]);
				$('#searchButtonsContainer').append(newBttn);
			}
		},
		addSearchTerms: function (e) {
			e.preventDefault();
			var userTerm = $('#submitBox').val();

			if (searchGifs.searchTerms.indexOf(userTerm) < 0 && userTerm.length > 0) {
				searchGifs.searchTerms.push(userTerm);
				var newBttn = $('<button>');
				newBttn.attr("data-search", userTerm);
				newBttn.addClass("btn animated rotateInUpLeft ");
				newBttn.addClass("searchButtons coralBtn");
				newBttn.text(userTerm);
				$('#searchButtonsContainer').append(newBttn);
				$('#submitBox').val('');
			}

		},
		displayResults: function (e) {
			$('#showGIFS').empty();
			e.preventDefault();

			var userQuery = $(this).data('search');
			var key = "&api_key=c71d8a0929634d5ca2af34dc84b3643a";
			var limit = "&limit=10";
			var reqUrl = "https://api.giphy.com/v1/gifs/search?q=" + userQuery + limit + key;
			// console.log(reqUrl);
			$.ajax({
				url: reqUrl,
				method: "GET"
			}).done(function (response) {

				for (var i = 0; i < response.data.length; i++) {
					var gifContain = $('<div>');
					gifContain.addClass('gifContainer');
					var animateLink = response.data[i].images["fixed_height"].url;
					var stillLink = response.data[i].images["fixed_height_still"].url;
					var rating = response.data[i].rating;
					console.log(rating);
					var ratingSpan = $('<p>');
					ratingSpan.addClass('gifRating ui2 teal message white center ');
					ratingSpan.text("Rating: " + rating);
					var newImg = $('<img>');
					newImg.attr('src', stillLink);
					newImg.attr('data-animate', animateLink);
					newImg.attr('data-still', stillLink);
					newImg.attr('data-state', "still");
					newImg.addClass('gif img-responsive');
					gifContain.prepend(ratingSpan);
					gifContain.append(newImg);

					$('#showGIFS').append(gifContain);

				}

				$('.gif').on("click", function () {
					var state = $(this).attr("data-state");
					if (state === "still") {
						$(this).attr('src', $(this).data("animate"));
						$(this).attr("data-state", "animate");
					} else {
						$(this).attr('src', $(this).data("still"));
						$(this).attr("data-state", "still");
					}

				});

				$('#clear').on("click", function () {
					$('.gifContainer').html("");
				});
			});
		},

	};

	searchGifs.createButtons();



	$('#submitTerm').click(searchGifs.addSearchTerms);
	$(document).on('click', '.searchButtons', searchGifs.displayResults);
});