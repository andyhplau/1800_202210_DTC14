function add_suggestion() {
    suggestion = $('#suggested_location').val()
    console.log(suggestion)
    localStorage.i = suggestion;

    alert("Thank you for your suggest")
    // need to change page!! (Group room)
    location.href = 'vote_page.html';
}

function setup() {
    jQuery("#suggest_btn").click(add_suggestion);


    $("#voting_list").append('<input class="list-group-item-check" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios3" value="" checked>')
    $("#voting_list").append('<label class="list-group-item py-3" for="listGroupCheckableRadios3">' + localStorage.getItem("i") + '</label>')

    
}

jQuery(document).ready(setup);