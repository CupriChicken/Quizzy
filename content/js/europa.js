async function getVragen() {
    const file = "../../content/js/data/vragen-europa.json";
    const request = new Request(file);
    
    const response = await fetch(request);
    const data = await response.json();
    return data;
}

const main = document.getElementById('middle');

async function displayVraag() {
    const vraag = document.getElementById('question');
    const meerKeuze = document.getElementById('answers');
    const open = document.getElementById('answer');

    const data = await getVragen();
    console.log(data);


    vraag.innerHTML = data.vragen[0].vraag;
    if (data.vragen[0].openVraag == true) {
        meerKeuze.style.display = 'none';
        open.style.display = 'block';    
    } else {
        open.style.display = 'none';
        meerKeuze.style.display = 'grid';
    }
}

displayVraag();