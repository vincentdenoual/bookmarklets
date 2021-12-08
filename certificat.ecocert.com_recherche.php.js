/*
    Same as the bookmarklet for Bureau Veritas. Displays the last certificate's hyperlink directly in the results page, 
    if available. User must be on the http://certificat.ecocert.com/recherche.php webpage prior trigerring the bookmarklet.
*/

// Minified version:

javascript:document.querySelectorAll(".bloc_encadre").forEach(e=>{e.style.cursor="pointer";let t=!1;e.onclick=(async r=>{if(!t&&e.querySelector("a.mon_bouton")&&!e.querySelector("a.certificate_added")){t=!0,e.style.backgroundColor="#D4EFDF";let r=e.querySelector("a.mon_bouton").getAttribute("href"),a=await(await fetch(location.origin+"/"+r,{headers:{accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","accept-language":"fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6","upgrade-insecure-requests":"1"},method:"GET",mode:"cors",credentials:"include"})).text(),c=document.createElement("div");if(c.innerHTML=a,c.querySelector(".certificats_1 table tbody tr:nth-child(2) a.download-pdf")){const t=c.querySelector(".certificats_1 table tbody tr:nth-child(2) td:nth-child(2)").innerText,r=c.querySelector(".certificats_1 table tbody tr:nth-child(2) td:nth-child(5)").innerText,a=location.origin+"/"+c.querySelector(".certificats_1 table tbody tr:nth-child(2) a.download-pdf").getAttribute("href");let i=document.createElement("a");i.setAttribute("href",a),i.classList.add("certificate_added"),i.innerText=`Certificat ${t} valid from ${r}`,e.appendChild(i),e.style.backgroundColor="transparent"}else{let t=document.createElement("a");t.setAttribute("href","#"),t.classList.add("certificate_added"),t.innerText="No certificate found.",e.appendChild(t),e.style.backgroundColor="#FEF9E7"}}e.style.cursor="default"})});


// Non-minified version:

javascript:

document.querySelectorAll('.bloc_encadre').forEach( bloc => {

    bloc.style.cursor = 'pointer';

    let alreadyRun = false;

    bloc.onclick = async (ev) => {

        if ( ! alreadyRun && bloc.querySelector('a.mon_bouton') && ! bloc.querySelector('a.certificate_added') ) {
            
            alreadyRun = true;
            
            bloc.style.backgroundColor = '#D4EFDF';

            let linkDetails = bloc.querySelector('a.mon_bouton').getAttribute('href');

            let data = await (await fetch( location.origin + '/' + linkDetails , {
                          "headers": {
                            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6",
                            "upgrade-insecure-requests": "1"
                          },
                          "method": "GET",
                          "mode": "cors",
                          "credentials": "include"
                        })).text();

            let doc = document.createElement('div');

            doc.innerHTML = data;

            if ( doc.querySelector('.certificats_1 table tbody tr:nth-child(2) a.download-pdf') ) {

                const certificateNumber = doc.querySelector('.certificats_1 table tbody tr:nth-child(2) td:nth-child(2)').innerText;
                const certificateValidFrom = doc.querySelector('.certificats_1 table tbody tr:nth-child(2) td:nth-child(5)').innerText;
                const link = location.origin + '/' + doc.querySelector('.certificats_1 table tbody tr:nth-child(2) a.download-pdf').getAttribute('href');
                
                let a = document.createElement('a');
                a.setAttribute('href', link);
                a.classList.add('certificate_added');
                a.innerText = `Certificat ${certificateNumber} valid from ${certificateValidFrom}`;

                bloc.appendChild(a);

                bloc.style.backgroundColor = 'transparent';
         
            } else {
                let a = document.createElement('a');
                a.setAttribute('href', '#');
                a.classList.add('certificate_added');
                a.innerText = `No certificate found.`;

                bloc.appendChild(a);
                bloc.style.backgroundColor = '#FEF9E7';
            }

        }
    bloc.style.cursor = 'default';

    };

})
