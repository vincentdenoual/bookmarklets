( () => {

    let eleves = {};
    let competences = {};
    let evaluations = {};
    const marks = {
        '4': {text: 'Très bonne maîtrise', letter: '4', userComment: false},
        '3': {text: 'Maîtrise satisfaisante', letter: '3', userComment: false},
        '2': {text: 'Maîtrise fragile', letter: '2', userComment: true},
        '1': {text: 'Maîtrise insuffisante', letter: '1', userComment: true},
        '0': {text: 'Aucune évaluation', letter: '0', userComment: false},
        'A': {text: 'Absent', letter: 'A', userComment: false},
        'D': {text: 'Dispensé', letter: 'D', userComment: false},
        'R': {text: 'Non rendu', letter: 'R', userComment: false},
        'N': {text: 'Non évalué', letter: 'N', userComment: false},
        'X': {text: "L'élève n'est plus dans la classe", letter: 'X', userComment: false}
    }

    let group = document.getElementById('GInterface.Instances[2].Instances[0].Instances[0].bouton_Edit').innerText.trim() ;
    let trimester = document.getElementById('GInterface.Instances[2].Instances[0].Instances[1].bouton_Edit').innerText.trim() ;

    // Fetching 'Eleves'
    document.getElementById('GInterface.Instances[2].Instances[5].Instances[0]_Contenu_5').querySelectorAll('.liste_celluleGrid').forEach( ligne => {

        // eleves[id] = name
        eleves[ parseInt(ligne.style.gridRow.split('/')[0].trim()) ] = ligne.innerText ;

    });

    // Fetching 'Competences'
    document.getElementById('GInterface.Instances[2].Instances[5].Instances[0]_Contenu_2').querySelectorAll('.Titre').forEach( titre => {

        // competences[id] = name
        competences[ parseInt(titre.style.gridColumn.split('/')[0].trim()) ] = titre.innerText ;

    });

    // Fetching 'evaluations'
    document.querySelectorAll('.liste_contenu_ligne.AlignementMilieu').forEach( contenu => {

        // evaluations[id eleve] = { competence[id] = note }
        let eleve = eleves[ parseInt(contenu.closest('.liste_celluleGrid').style.gridRow.split('/')[0].trim()) ] ;

        let competence = competences[ parseInt(contenu.closest('.liste_celluleGrid').style.gridColumn.split('/')[0].trim()) ] ;

        let evaluation = ( () => {
            if ( contenu.children[0] && contenu.children[0].style.backgroundColor === 'rgb(0, 128, 0)' ) {
                return marks['4'];

            } else if ( contenu.children[0] && contenu.children[0].style.backgroundColor === 'rgb(69, 184, 81)' ) {
                return marks['3'];

            } else if ( contenu.children[0] && contenu.children[0].style.backgroundColor === 'rgb(255, 218, 1)' ) {
                return marks['2'];

            } else if ( contenu.children[0] && contenu.children[0].style.backgroundColor === 'rgb(248, 10, 10)' ) {
                return marks['1'];

            } else if ( contenu.querySelector('i') && contenu.querySelector('i').className === 'icon_competence_absent' ) {
                return marks['A'] ;

            } else if ( contenu.querySelector('i') && contenu.querySelector('i').className === 'icon_competence_dispense' ) {
                return marks['D'] ;

            } else if ( contenu.querySelector('i') && contenu.querySelector('i').className === 'icon_competence_non_rendu' ) {
                return marks['R'] ;

            } else if ( contenu.querySelector('span.NiveauAcquisition_Pastille') && contenu.querySelector('span.NiveauAcquisition_Pastille').innerText === ' ' ) {
                return marks['N'] ;

            } else if ( contenu.innerText === 'X' ) {
                return marks['X'] ;

            } else {
                return marks['0'] ;
            };

        })() ; 


        if ( ! evaluations[ eleve ] ) { evaluations[ eleve ] = {} };

        evaluations[ eleve ][ competence ] = evaluation ;    

    });


    // Converting the 'evaluations' object to a TSV string.
    // Adding headers
    let dataTextTSV, dataLetterTSV = ( () => {
        
        let str = 'Nom Eleve' + '\t' + Object.values(competences).join('\t') + '\n' ;
        return str;

    } )();

    // Adding the content for Text.
    dataTextTSV += ( () => {

        let str = '' ;

        Object.values(eleves).forEach( eleve => {

            // Adding the pupil's name
            str += eleve + '\t';

            Object.values(competences).forEach ( competence => {

                // Adding each evaluation for the pupil
                str += evaluations[eleve][competence].text + '\t';

            } );

            str += '\n';

        } );

        return str ;

    } )();

    // Adding the content for Text.
    dataLetterTSV += ( () => {

        let str = '' ;

        Object.values(eleves).forEach( eleve => {

            // Adding the pupil's name
            str += eleve + '\t';

            Object.values(competences).forEach ( competence => {

                // Adding each evaluation for the pupil
                str += evaluations[eleve][competence].letter + '\t';

            } );

            str += '\n';

        } );

        return str ;

    } )();

    let dialog = document.createElement('dialog') ;

    for ( let competence in competences ) {
        
        let header = document.createElement('p') ;
        header.innerText = competences[ competence ];
        header.style.fontWeight = 'bold';
        dialog.appendChild(header);

        for ( let mark in marks ) {

            // If the mark is set to allow for commenting by the user.
            if ( marks[mark].userComment ) {

                let input = document.createElement('input') ;
                let label = document.createElement('label') ; 
                let inputValue = localStorage.getItem(`${competences[competence]}|${mark}`) || '';
                input.setAttribute('id', `input_Competence${competence}_mark${mark}`) ; 
                input.setAttribute('title', `${competences[competence]}|${mark}`) ;      
                input.setAttribute('value', inputValue) ;
                label.setAttribute('for', `input_Competence${competence}_mark${mark}`) ;
                label.innerText = marks[mark].text ;
                input.style.display = 'block' ;
                input.style.width = '90%' ;
                input.style.color = 'blue' ;
                input.style.marginBottom = '5px' ;
                label.style.display = 'block' ;

                // Save data as soon as it's changed.
                input.oninput = (ev) => {
                    ev.target.style.color = 'red';
                    localStorage.setItem(`${competences[competence]}|${mark}`, ev.target.value) ;
                    ev.target.style.color = 'blue' ;
                } ;

                dialog.appendChild(label) ;
                dialog.appendChild(input) ;                              
            } ;

        };

    };

    let linkingWordsHeader = document.createElement('p') ;
    let linkingWordsInput = document.createElement('input') ;
    let linkingWordsLabel = document.createElement('label') ;
    let linkingWordsInputValue = localStorage.getItem('linkingwords') ;

    linkingWordsHeader.innerText = "Mots de liaison" ;
    linkingWordsHeader.style.fontWeight = 'bold' ;
    linkingWordsHeader.style.marginTop = '15px';
    linkingWordsHeader.style.color = 'green';
    linkingWordsInput.setAttribute('id','linkingwords') ;
    linkingWordsLabel.setAttribute('for','linkingwords') ;
    linkingWordsInput.setAttribute('value',linkingWordsInputValue) ;
    linkingWordsInput.style.color = 'green' ;
    linkingWordsInput.style.fontWeight = 'bold' ;
    linkingWordsInput.style.width = '90%' ;
    linkingWordsInput.style.display = 'block' ;
    linkingWordsLabel.style.display = 'block' ;
    linkingWordsLabel.innerText = 'Liste de mots séparés par des virgules' ;

    linkingWordsInput.oninput = (ev) => {
        ev.target.color = 'red' ;
        localStorage.setItem('linkingwords',ev.target.value);
        ev.target.color = 'green' ;
    };
    
    // Saving data as a file and downloads it.
    let aText = document.createElement('a') ;
    let aLetter = document.createElement('a') ;    

    aText.style.display = 'block';
    aLetter.style.display = 'block';
    aText.style.margin = '5px';
    aLetter.style.margin = '5px';

    aText.setAttribute('download', `Evaluations ${group} ${trimester} - Textes.tsv`) ;
    aLetter.setAttribute('download', `Evaluations ${group} ${trimester} - Lettres.tsv`) ;

    aText.setAttribute('href', 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent( dataTextTSV )))) ;
    aLetter.setAttribute('href', 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent( dataLetterTSV )))) ;

    aText.innerText = aText.getAttribute('download') ;
    aLetter.innerText = aLetter.getAttribute('download') ;

    dialog.appendChild(linkingWordsHeader) ;
    dialog.appendChild(linkingWordsLabel) ;
    dialog.appendChild(linkingWordsInput) ;

    dialog.appendChild(aText) ;    
    dialog.appendChild(aLetter) ;

    document.body.appendChild(dialog) ;

    dialog.showModal() ;

    // Lancement du téléchargement
    aText.click() ;
    aLetter.click() ;




} )()
