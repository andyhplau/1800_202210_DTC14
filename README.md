## My Web Application (IMMERSE)

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)
* [Libraries](#libraries)
* [Resources](#resources)
* [Contact](#contact)
* [Acknowledgement](#acknowledgements)

## General Info
Immerse, developed by DTC 14, is browser based web application to connect tourists and local residents by grouping them with their interests. <br>Our web applicaition can help tourists experience authentic local culture when they travel.

## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* jQuery
* Bootstrap 5
* Firebase, Firestore, and Storage
	
## Content
Content of the project folder:

```
Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file with log-in button, this is what users see when they come to url
├── login.html               # login html file, the page that has real log-in feature
└── README.md                # Explanation of outline (this file!)

It has the following subfolders and files:
├── .git                     # Folder for git repo

├── images                   # Folder for images
    /logo_no_background.png  # logo image
    /nav-profile-icon.png
    /profile-icon.png

├── pages                    # Forder for html files
    /chat.html               # chat html file, chat page
    /group.html              # group html file, group room main page
    /interest.html           # interest html file, the page where users can choose 3 interests
    /main.html               # main html file, the landing page after log-in, users can see their existing groups
    /matched.html            # matched html file, the page where user get suggested groups list
    /profile.html            # profile html file, users can edit their profile in this file
    /roles.html              # roles html file, the page where users select there roles
    /suggestion.html         # suggestion html file, the suggestion page
    /template.html           # temlplete html file, our template for all html files
    /vote_page.html          # vote_page html file, the vote page
    /voting_result.html      # voting_result html file, the result of vote page

├── scripts                  # Folder for scripts
    /authentication.js       # JS for user authentication
    /bottomnav.js            # JS for bottomnav.html
    /chat.js                 # JS for chat.html
    /firebaseAPI_team14.js   # firebase API stuff, shared acorss pages
    /group.js                # JS for group.html
    /index.js                # JS for index.html
    /interest.js             # JS for interest.html
    /main.js                 # JS for main.html
    /matched.js              # JS for matched.html
    /profile.js              # JS for profile.html
    /role.js                 # JS for roles.html
    /skeleton.js             # JS for loading topnav, bottomnav and footer in all pages
    /suggestion.js           # JS for suggestion.html
    /topnav.js               # JS for topnav.html
    /vote.js                 # JS for vote_page.html
    /voting_result.js        # JS for voting result.html

├── styles                   # Folder for styles
    /interest.css            # style for interest.html
    /style.css               # general style including top/bottom navbar and buttons, shared across pages
    /suggestion.css          # style for suggestion.html
    /vote.css                # style for vote_page.html

├── text
    /bottomnav.html          # bottomnav html file, for bottom navbar in skeleton
    /footer.html             # footer html file, for footer in skeleton
    /topnav.html             # topnav html file, for top navber in skeleton

Firebase hosting files:
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules
├── .firebase
    /hosting.chche

VS Code live server file:
├──  .vs.code
    /settings.json
```

## Libraries
* jQuery
    * https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
* Bootstrap 5
    * https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css
    * https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js
    * https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css
* Firebase, Firestore, Storage
    * https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js
    * https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js
    * https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js
    * https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.js
    * https://www.gstatic.com/firebasejs/ui/4.8.1/firebase-ui-auth.css

## Resources
* In-app icons from Feather v4.28.0 (Open Source https://feathericons.com/)
* Logo from freelogosign (https://www.freelogodesign.org/)

## Contact
* Aamir Hassan - ahassan54@my.bcit.ca
* Andy Lau - alau151@my.bcit.ca
* Soohyeun Park - spark308@my.bcit.ca

## Acknowledgements
* <a href="https://getbootstrap.com">Bootstrap 5</a>
* <a href="https://firebase.google.com">Firebase/  Firestore/  Storage</a>
* <a href="https://www.freelogodesign.org">Free logo design</a>
* <a href="https://feathericons.com">Feather icons</a> 
* <a href="https://www.w3schools.com">W3schools</a>
* <a href="https://jquery.com/">jQuery</a>