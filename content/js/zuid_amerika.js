let huidigeVraagIndex = 0;
let score = 0;
let goedBeantwoord = 0;
const openAntwoord = document.getElementById('openAntwoord');
const nakijkKnop = document.getElementById('nakijken');
const juisteAntwoord = document.getElementById('juisteAntwoord');
const resultaten = document.getElementById('resultaten');
const vraag = document.getElementById('vraag');
const meerKeuze = document.getElementById('antwoorden');
const open = document.getElementById('antwoord');
const image = document.getElementById('image');
const info = document.getElementById('extraInfo');
info.style.display = 'none';

async function getVragen() {
    const file = "../../content/js/data/vragen-zuid_amerika.json";
    const request = new Request(file);
    
    const response = await fetch(request);
    const data = await response.json();
    return data;
}

async function displayVraag() {
    resultaten.style.display = 'none';

    const data = await getVragen();

    const huidigeVraag = data.vragen[huidigeVraagIndex];

    if (huidigeVraagIndex >= data.vragen.length) {
        DisplayResultaten();
    }
    else {
        image.setAttribute('src', data.vragen[huidigeVraagIndex].plaatje);
        image.setAttribute('alt', data.vragen[huidigeVraagIndex].alt);
        vraag.innerHTML = huidigeVraag.vraag;

        if (huidigeVraag.openVraag == true) {
            meerKeuze.style.display = 'none';
            open.style.display = 'flex';
            juisteAntwoord.style.display = 'none';
            openAntwoord.removeAttribute('readonly');
            openAntwoord.value = '';
            nakijkKnop.style.display = 'block';
    
        } 
        else {
            open.style.display = 'none';
            meerKeuze.style.display = 'grid';
    
            document.getElementById('antwoord1').innerHTML = huidigeVraag.antwoorden[0];
            document.getElementById('antwoord2').innerHTML = huidigeVraag.antwoorden[1];
            document.getElementById('antwoord3').innerHTML = huidigeVraag.antwoorden[2];
            document.getElementById('antwoord4').innerHTML = huidigeVraag.antwoorden[3];
        }
        
    }
}

async function checkAntwoord(antwoord) {
    const data = await getVragen();
    const huidigeVraag = data.vragen[huidigeVraagIndex];

    if (antwoord == huidigeVraag.juisteAntwoord) {
        console.log('goed');
        score++;
        goedBeantwoord++;
    } else {
        console.log('fout');
    }
    huidigeVraagIndex++;
    displayVraag();
}

document.getElementById('goed').addEventListener('click', function() {
    score += 0.5;
    goedBeantwoord++;
    huidigeVraagIndex++;
    console.log('goed');
    displayVraag();
});

document.getElementById('fout').addEventListener('click', function() {
    huidigeVraagIndex++;
    console.log('fout');
    displayVraag();
});

async function checkOpenAntwoord() {
    const juisteAntwoordDisplay = document.getElementById('juisteAntwoordDisplay');
    const data = await getVragen();

    openAntwoord.setAttribute('readonly', true);
    nakijkKnop.style.display = 'none';
    juisteAntwoord.style.display = 'block';
    juisteAntwoordDisplay.innerHTML = data.vragen[huidigeVraagIndex].antwoorden;
}

async function DisplayResultaten() {
    const data = await getVragen();
    const scoreDisplay = document.getElementById('score');
    const vragen = document.getElementById('vragen');
    const vragenMax = document.getElementById('vragenMax');

    vraag.style.display = 'none';
    meerKeuze.style.display = 'none';
    open.style.display = 'none';
    image.style.display = 'none';
    resultaten.style.display = 'flex';
    vragen.innerHTML = goedBeantwoord;
    vragenMax.innerHTML = data.vragen.length;
    scoreDisplay.innerHTML = score * 100;
}

async function toggleInfo() {
    if (info.style.display == 'none') {
        info.style.display = 'block';
    }
    else {
        info.style.display = 'none';
    }
}

displayVraag();