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
let about = document.querySelector('#about div');
let termins = [];


function getData(event, type = 'LexicalMin') {
    var dbRef = firebase.database().ref(`1YQG7H2FTltWuQoEl_wXnhCHF0LCShGUrhpbtEtgF-qc/${type}`);
    dbRef.on('value', snap => { render(snap.val()); renderTermin(0) });
    const dbAbout = firebase.database().ref(`1YQG7H2FTltWuQoEl_wXnhCHF0LCShGUrhpbtEtgF-qc/about`);
    dbAbout.on('value', snap => { about.innerHTML = snap.val(); console.log('qwery', snap.val()) });

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

    checkOtherSrc(termin);

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

        otherDescription.innerHTML += termin.etymology != '' ? `<div class="block">
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
                                <p id="source" class="source lightblue ">${termin.URL ? addSrc(termin) : termin.source}</p>
                </div>`: '';
    }
}
function addAbbr(description) {
    let abbrev = ['англ.', 'рос.', 'фр.', 'див. також', 'див.', 'лат.', 'син.', 'пол.', 'нім.'];

    for (var k = 0; k < abbrev.length; k++) {
        description = description.replaceAll(abbrev[k], `<span class="lightblue">${abbrev[k]}</span>`);
    }
    return description;
}

function addLink(text) {
    return text = text.replace(/(https?:\/\/[^ >]+[\w/])/gmi, '<a class="lightblue" href=$1>$1</a>');
}

function addSrc(termin) {
    if (termin.URL) {
        // console.log('url', termin.URL)
        return `<a class="source lightblue" href="${termin.URL}" target="_blank">${termin.source}</a>`
    }
}

function checkOtherSrc(termin) {
    // const linkPresent = document.querySelector('a[title="Презентація"]');
    // const linkVideo = document.querySelector('a[title="Відеоілюстрація"]');

    // if(termin.presentation){
    //     linkPresent.setAttribute('href', termin.presentation);
    //     linkPresent.firstElementChild.classList.remove('noactive');
    // } else {
    //     linkPresent.removeAttribute('href');
    //     linkPresent.firstElementChild.classList.add('noactive');
    // }

    if (isOneLink(termin.presentation)) setOtherSrc(document.querySelector('a[title="Презентація"]'), termin.presentation);
    else setList(document.querySelector('a[title="Презентація"]'), termin.presentation);
    setOtherSrc(document.querySelector('a[title="Відеоілюстрація"]'), termin.video);
    setOtherSrc(document.querySelector('a[title="Наукова праця"]'), termin.article);
    setList(document.querySelector('a[title="Навчальна дисципліна"]'), termin.discipline);
}

function isOneLink(text) {
    return text.length === 0 || text.trim().indexOf('http') === 0;
}

function setOtherSrc(element, link) {
    if (link) {
        element.setAttribute('href', link);
        element.removeAttribute('data-toggle');
        element.firstElementChild.classList.remove('noactive');
    } else {
        element.removeAttribute('href');
        element.setAttribute('data-toggle', "dropdown");
        element.firstElementChild.classList.add('noactive');
    }
}

function setList(element, text) {
    if (text) {
        console.log('setList', text);
        console.log('newList', parseListOfDiscipline(text));
        element.setAttribute('data-toggle', "dropdown");
        createListLink(element.nextElementSibling, parseListOfDiscipline(text));
        element.firstElementChild.classList.remove('noactive');
    } else {
        element.nextElementSibling.innerHTML = "";
        element.nextElementSibling.classList.remove('dropdown-menu');
        element.firstElementChild.classList.add('noactive');
        element.removeAttribute('data-toggle');
    }
}

function parseListOfDiscipline(text = '') {
    let list = [];
    list = text.split(/,\s*$/gm).map(item => item.split(/-\s+(?=http)/gmi).map(e => e.trim()));
    return list;
}

function createListLink(element, list) {
    element.innerHTML = ""
    if (list === undefined || !Array.isArray(list) || !Array.isArray(list[0])) {
        return;
    }
    element.classList.add('dropdown-menu');
    element.innerHTML = list.map(item => `<a class="dropdown-item" href="${item[1]}" target="_blank">${item[0]}</a>`).join('');
}

document.addEventListener('DOMContentLoaded', () => { getData(); getTeleglossary() });

function getTeleglossary(event, type = 'teleglossary') {
    var dbRef = firebase.database().ref(`1YQG7H2FTltWuQoEl_wXnhCHF0LCShGUrhpbtEtgF-qc/${type}`);
    dbRef.on('value', snap => { renderTeleglossary(snap.val()) });
}

let list = document.getElementById("list");

function renderTeleglossary(data) {
    list.innerHTML = "";
    list.insertAdjacentHTML("beforeend", data.map(item => `<li class="${getFirstLetter(item.termin)} list-group-item list-group-item-action"><a 
    href="${item?.link}" type="video">${item.termin}</a></li>`).join(""))
}

function getFirstLetter(letter) {
    letter = letter.toUpperCase();
    letter = letter.replace(/[^A-ZА-ЯЇІЄҐ]/i, "");
    letter = letter[0];
    const LettersMap = {
        A: 'А',
        B: 'Б',
        C: 'Ц',
        D: 'Д',
        E: 'Е',
        F: 'Ф',
        G: 'Г',
        H: 'Х',
        I: 'І',
        J: 'Й',
        K: 'К',
        L: 'Л',
        M: 'М',
        N: 'Н',
        O: 'О',
        P: 'П',
        Q: 'К',
        R: 'Р',
        S: 'С',
        T: 'Т',
        U: 'У',
        V: 'В',
        W: 'В',
        X: 'К',
        Y: 'Й',
        Z: 'З',
    }
    return LettersMap[letter] ? LettersMap[letter] : letter;
}


/**
 * Створення словника медійних термінів
 */

document.querySelector('[data-target="#dictionaries"]').addEventListener('click', getDictionaries);
document.querySelector('#dictionaries ul:nth-of-type(1)').addEventListener('click', filterDictionaries);

let data = [];

function getDictionaries(event, type = 'dictionaries') {
    const targetList = document.querySelector(`#${type} ul:nth-of-type(2)`)
    var dbRef = firebase.database().ref(`1YQG7H2FTltWuQoEl_wXnhCHF0LCShGUrhpbtEtgF-qc/${type}`);
    dbRef.on('value', snap => { renderDictionaries(clearEmptyData(snap.val()), targetList) });
}

function clearEmptyData(inputData) {
    data = inputData.filter((item) => item.termin.trim() !== '');
    return data;
}

function renderDictionaries(data, element) {
    element.innerHTML = "";
    element.insertAdjacentHTML("beforeend", data.map(item => `<li class="list-group-item list-group-item-action"><a 
    href="${item?.link.trim()}">${item.termin.trim()}</a></li>`).join(""));
}

function filterDictionaries(event) {
    const letter = event.target.dataset.letter;
    const targetList = document.querySelector(`#dictionaries ul:nth-of-type(2)`);
    if (!letter) return;
    const activeLetter = document.querySelectorAll('.active');
    activeLetter.forEach(element => element.classList.remove('active'));
    event.target.classList.add('active');
    if (letter === 'all') return renderDictionaries(data, targetList);
    filteredData = data.filter(item => item.termin.trim()[0].toUpperCase() === letter);
    renderDictionaries(filteredData, targetList);
}



/**
 * 
 */