function add_suggestion() {
    i = 0;
    suggestion = $('#suggested_location').val()
    console.log(suggestion + i)

    alert("Thank you for your suggest")
    // need to change page!! (Group room)
    location.href = 'index.html';
}

function setup() {
    jQuery("#suggest_btn").click(add_suggestion);
}

jQuery(document).ready(setup);