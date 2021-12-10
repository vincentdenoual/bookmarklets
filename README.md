## Bookmarklets

<< A bookmarklet is a bookmark stored in a web browser that contains JavaScript commands that add new features to the browser. Bookmarklets are JavaScripts stored as the URL of a bookmark in a web browser or as a hyperlink on a web page. Bookmarklets are usually small snippets of JavaScript executed when user clicks on them. >>

Source: https://en.wikipedia.org/wiki/Bookmarklet, Accessed Dec 8th, 2021.

Visual example described here: [https://github.com/vincentdenoual/bookmarklets/blob/af51f55b610473d7c125589fbf88aa71c3b15130/Bookmarklet%20visual%20explanation%20-%20Bureau%20Veritas.pdf](https://github.com/vincentdenoual/bookmarklets/blob/af51f55b610473d7c125589fbf88aa71c3b15130/Bookmarklet%20visual%20explanation%20-%20Bureau%20Veritas.pdf)

## Bookmarklets available

Each bookmarklet is set to run on a specific webpage. I wrote the following bookmarklets.

### Le Monde

For users who have subscribed to Le Monde.fr, this script will run on the page opened to display the digital version  of the newspaper, and open each page as an image in a new tab. Le Monde loads only 6 pages at a time: only these six pages will have their images opened upon user click.

Link to the Le Monde webpage (click on one of the editions prior running the script): [https://journal.lemonde.fr/](https://journal.lemonde.fr/).

[Link to the script](https://github.com/vincentdenoual/bookmarklets/blob/73a26696418ee3c3b9ef2dd0150b9c198543eaad/Le%20Monde%20(Newspaper)/journal.lemonde.fr.js).

### Bureau Veritas

Bureau Veritas allows anyone to search for the certificates they've issued to certified businesses. On their results page, the user has to click on the 'En savoir plus' hyperlink to access the hyperlink to the PDF certificate of the businesses. This script adds the PDF hyperlinks to the results boxes, so the user doesn't have to click on 'En savoir plus' anymore.

Link to the Bureau Veritas certificates website (the script will run on the results page): [https://certifie.bureauveritas.fr/](https://certifie.bureauveritas.fr/)

Link to the scripts (original and minified versions): [Link to the script](https://github.com/vincentdenoual/bookmarklets/blob/eb8b32a2864dc4602ec355a0ca7767ea7da52804/certifie.bureauveritas.fr_resultats.php.js)

### Ecocert

Similar to the Bureau Script above, but requiring a user click on each result box in order to display the certificate hyperlink inline (instead of requiring browsing to a different page).

Link to the Ecocert certificates search webpage: [http://certificat.ecocert.com/recherche.php](http://certificat.ecocert.com/recherche.php)

[Link to the script](https://github.com/vincentdenoual/bookmarklets/blob/eb8b32a2864dc4602ec355a0ca7767ea7da52804/certificat.ecocert.com_recherche.php.js)
