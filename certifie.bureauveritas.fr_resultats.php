/*
    Displays the hyperlinks to the certificates directly in the results boxes, to avoid having to click on "En savoir plus" for each result box.
*/

// Minified version (using https://www.toptal.com/developers/javascript-minifier/):

javascript:document.querySelectorAll(".bloc-resultat").forEach(async e=>{let t=e.querySelector("a").getAttribute("data-id");const c=(await(await fetch("https://certifie.bureauveritas.fr/scripts/popup_infos_certificat_agriculture_biologique.php",{headers:{accept:"application/json, text/javascript, */*; q=0.01","content-type":"application/x-www-form-urlencoded; charset=UTF-8"},body:"id_certificat="+t,method:"POST"})).json()).contenu;let i=document.createElement("div");i.innerHTML=c,i.querySelectorAll("a.lien_certificat").forEach(t=>{let c=t.cloneNode();c.innerText=t.innerText,c.style.display="block",c.style.marginTop="0.2em",e.appendChild(c)})});

// Non-minified version:

javascript:
document.querySelectorAll('.bloc-resultat').forEach( async bloc => {
    
    let certificateID = bloc.querySelector('a').getAttribute('data-id');

    const data = await (await fetch("https://certifie.bureauveritas.fr/scripts/popup_infos_certificat_agriculture_biologique.php", {
                  "headers": {
                    "accept": "application/json, text/javascript, */*; q=0.01",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                  },
                  "body": "id_certificat=" + certificateID,
                  "method": "POST"
                })).json();

    const contenu = data.contenu;

    let div = document.createElement('div');

    div.innerHTML = contenu;

    let certificates = div.querySelectorAll('a.lien_certificat');

    certificates.forEach ( (certificate) => {
        let certificateCopy = certificate.cloneNode();
        certificateCopy.innerText = certificate.innerText;
        certificateCopy.style.display = 'block';
        certificateCopy.style.marginTop = '0.2em';
        bloc.appendChild(certificateCopy);
    });

})

