/*
    Opens a new browser tab for each of the 6 pre-loaded Le Monde newspaper page images.
    Use when current tab is "journal.lemonde.fr" website.
*/

javascript:(Array.from(document.querySelectorAll('.page img'))).map( img => img.src ).forEach( link => { window.open(link, '_blank') } )
