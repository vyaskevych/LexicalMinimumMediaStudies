// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBsMXq4l2KQDKHEcB356K5O0mY24WC3T90",
    authDomain: "lexicalminimum.firebaseapp.com",
    databaseURL: "https://lexicalminimum-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "lexicalminimum",
    storageBucket: "lexicalminimum.appspot.com",
    messagingSenderId: "494411586982",
    appId: "1:494411586982:web:5cd721fd16cff5b7c3c367",
    measurementId: "G-T3JT704E9D"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

let leftlist = document.getElementById('leftlist');
let otherDescription = document.getElementById('otherDescription');
let termins = [];


function getData(event, type = 'LexicalMin') {
    var dbRef = firebase.database().ref(`1YQG7H2FTltWuQoEl_wXnhCHF0LCShGUrhpbtEtgF-qc/${type}`);
    dbRef.on('value', snap => { render(snap.val()); renderTermin(0) });
}

function render(data) {
    // console.log('data', data);
    termins = data;
    leftlist.innerHTML = "";
    termins.forEach(item => renderItem(item));
}

function renderItem(item) {
    if (item.termin !== '') {
        leftlist.innerHTML += `
            <a href="javascript:void(0);" class="searchItem list-group-item list-group-item-action" onclick="renderTermin(${item.id})">${item.termin}</a>
          `
    }
}

function renderTermin(id) {
    otherDescription.innerHTML = '';
    //let termin = termins.find(termin => termin.id === id);
    let termin = termins[id];

    for (var key in termin) {
        const p = document.getElementById(key);
        if (p) {

            let description = termin[key];
            description = addAbbr(addLink(description));

            p.innerHTML = description;
            if (description) {
                p.closest('div.block')?.classList.remove('hide');
            } else {
                p.closest('div.block')?.classList.add('hide');
            }
        }
    }
    if (termin.URL) {
        const src = document.getElementById('source');
        src.innerHTML = addSrc(termin);
    }
    checkOtherDescription(id);
}



function checkOtherDescription(id) {
    while (termins[++id].termin == '') {
        let termin = termins[id];

        otherDescription.innerHTML = termin.etymology != '' ? `<div class="block">
                    <h2 class="translateheader" tabindex="0">Етимологія терміна</h2>
                    <hr class="hrline">
                    <p>${addAbbr(termin.etymology)}</p>
                </div>`: '';


        otherDescription.innerHTML += termin.equivalent != '' ? `<div class="block">
                <h2 class="translateheader" tabindex="0">Еквівалент іншою мовою</h2>
                <hr class="hrline">
                    <p id="equivalent">${addAbbr(termin.equivalent)}</p>
                </div>`: '';

        otherDescription.innerHTML += termin.synonym != '' ? `<div class="block">
                    <h2 class="translateheader" tabindex="0">Синонім або відсилання до іншого терміна</h2>
                    <hr class="hrline">
                        <p id="synonym">${addAbbr(termin.synonym)}</p>
                </div>`: '';

        otherDescription.innerHTML += termin.vocabulary != '' ? `<div class="block">
                        <h2 class="translateheader" tabindex="0">Словникове значення </h2>
                        <hr class="hrline">
                            <p id="vocabulary">${addAbbr(termin.vocabulary)}</p>
                </div>`: '';

        otherDescription.innerHTML += termin.contextual != '' ? `<div class="block">
                            <h2 class="translateheader" tabindex="0">Контекстне значення </h2>
                            <hr class="hrline">
                                <p id="contextual">${addAbbr(termin.contextual)}</p>
                </div>`: '';

        otherDescription.innerHTML += termin.source != '' ? `<div class="block ">
                                <h2 class="translateheader" tabindex="0">Джерело </h2>
                                <hr class="hrline">
                                <p id="source" class="source lightblue ">${addSrc(termin)}</p>
                </div>`: '';
    }
}
function addAbbr(description) {
    let abbrev = ['англ.', 'рос.', 'фр.', 'див. також', 'див.', 'лат.', 'син.'];

    for (var k = 0; k < abbrev.length; k++) {
        description = description.replaceAll(abbrev[k], `<span class="lightblue">${abbrev[k]}</span>`);
    }
    return description;
}

function addLink(text) {
    return text = text.replace(/(https?:\/\/[^ >]+[\w/])/gmi, '<a class="lightblue" href=$1>$1</a>');
}

function addSrc(termin){
    if (termin.URL) {
        console.log('url', termin.URL)
        return `<a class="source lightblue" href="${termin.URL}" target="_blank">${termin.source}</a>`
    }
}


document.addEventListener('DOMContentLoaded', () => getData());

