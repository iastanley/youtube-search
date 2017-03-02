$(document).ready(function(){
  var YOUTUBE_SEARCH_LIST_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';

  //Make ajax request on form submit
  formHandler();

  /********FUNCTIONS********/

  //Making AJAX request
  function getDataFromApi(searchTerm, callback) {
    var settings = {
      url: YOUTUBE_SEARCH_LIST_ENDPOINT,
      data: {
        part: 'snippet',
        key: 'AIzaSyCbOY5vCwchBe7kOR4tQ0APZfVuSpLdEHE',
        q: searchTerm
      },
      datatype: 'json',
      type: 'GET',
      success: callback
    };
    $.ajax(settings);
  }

  //Render return data object to html
  function showApiData(data) {
    console.log(data);
    var resultsHTML = '';
    var videoURL = '';
    for(var i = 0; i < data.items.length; i++){
      videoURL = data.items[i].snippet.thumbnails.medium.url;
      resultsHTML += '<a href="#"><img src="' + videoURL + '"></a>';
    }
    $('#js-search-results').html(resultsHTML);
  }

  //event listener for form includes making ajax request
  function formHandler() {
    $('#js-search-form').submit(function(event){
      event.preventDefault();
      var query = $(this).find('.js-query').val();
      getDataFromApi(query, showApiData);
    });
  }
});
