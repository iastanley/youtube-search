$(document).ready(function(){
  var YOUTUBE_SEARCH_LIST_ENDPOINT = 'https://www.googleapis.com/youtube/v3/search';
  //global search term variable
  var searchTerm = '';

  //Make ajax request on form submit
  //this is the entry point function to the whole app
  formHandler();

  /********FUNCTIONS********/

  //Making AJAX request based on searchTerm
  function getDataFromSearch(searchTerm, callback) {
    var settings = {
      url: YOUTUBE_SEARCH_LIST_ENDPOINT,
      data: {
        part: 'snippet',
        key: 'AIzaSyCbOY5vCwchBe7kOR4tQ0APZfVuSpLdEHE',
        q: searchTerm,
        maxResults: 6
      },
      datatype: 'json',
      type: 'GET',
      success: callback
    };
    $.ajax(settings);
  }

  //Making AJAX request based on searchTerm and pageToken
  function getDataFromPage(searchTerm, token, callback) {
    var settings = {
      url: YOUTUBE_SEARCH_LIST_ENDPOINT,
      data: {
        part: 'snippet',
        key: 'AIzaSyCbOY5vCwchBe7kOR4tQ0APZfVuSpLdEHE',
        q: searchTerm,
        maxResults: 6,
        pageToken: token
      },
      datatype: 'json',
      type: 'GET',
      success: callback
    }
    $.ajax(settings);
  }

  //Render return data object to html
  function showApiData(data) {
    showNavButtons(data);
    var resultsHTML = '';
    var videoURL = '';
    var videoId = '';
    for(var i = 0; i < data.items.length; i++){
      videoURL = data.items[i].snippet.thumbnails.medium.url;
      videoId = data.items[i].id.videoId;
      resultsHTML += '<a target="_blank" href="https://youtu.be/'+ videoId +'">';
      resultsHTML += '<img src="' + videoURL + '"></a>';
    }
    $('#js-search-results').html(resultsHTML);
    //remove event listener to avoid multiple event listeners
    $('#js-search-form').off('click', '**');
    navButtonHandler(searchTerm, data);
  }

  //applies disabled style to buttons based on pageToken
  function showNavButtons(data){
    //show navigation buttons
    $('.prev-next-btns').show();
    //disable previous button if there are no previous
    if (!data.prevPageToken) {
      $('#prev-btn').addClass('disabled');
    } else {
      $('#prev-btn').removeClass('disabled');
    }
    //disable next button if there are no next
    if (!data.nextPageToken) {
      $('#next-btn').addClass('disabled');
    } else {
      $('#next-btn').removeClass('disabled');
    }
  }

  //navigation button handling
  function navButtonHandler(searchTerm, data){
    //next button
    if (data.nextPageToken) {
      $('#js-search-form').on('click', '#next-btn', function(){
        getDataFromPage(searchTerm, data.nextPageToken, showApiData);
      });
    }
    //previous button
    if (data.prevPageToken) {
      $('#js-search-form').on('click', '#prev-btn', function(){
        getDataFromPage(searchTerm, data.prevPageToken, showApiData);
      });
    }
  }

  //event listener for form includes making ajax request
  function formHandler() {
    $('#js-search-form').submit(function(event){
      event.preventDefault();
      //get input from user
      searchTerm = $(this).find('.js-query').val();
      getDataFromSearch(searchTerm, showApiData);
    });
  }


});
