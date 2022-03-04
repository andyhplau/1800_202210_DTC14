// The function to load navbars and footer
function loadSkeleton(){
    console.log($('#topnavbarPlaceholder').load('./text/topnav.html'));
    console.log($('#footerPlaceholder').load('./text/footer.html'));
    console.log($('#bottomnavbarPlaceholder').load('./text/bottomnav.html'));
}
loadSkeleton();  //invoke the function
