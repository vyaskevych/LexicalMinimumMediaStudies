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
            dbRef.on('value', snap => render(snap.val()));
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
                    const description = termin[key];
                    p.innerHTML = description;
                    if (description) {
                        p.closest('div.block')?.classList.remove('hide');
                    } else {
                        p.closest('div.block')?.classList.add('hide');
                    }
                }
            }
            checkOtherDescription(id);
        }

        function checkOtherDescription(id) {
            while (termins[++id].termin == '') {
                let termin = termins[id];

                otherDescription.innerHTML = termin.etymology != '' ? `<div class="block">
                    <h2 class="translateheader" tabindex="0">Етимологія терміна</h2>
                    <hr class="hrline">
                    <p>${termin.etymology}</p>
                </div>`: '';

                otherDescription.innerHTML += termin.equivalent != '' ? `<div class="block">
                <h2 class="translateheader" tabindex="0">Еквівалент іншою мовою</h2>
                <hr class="hrline">
                    <p id="equivalent">${termin.equivalent}</p>
                </div>`: '';

                otherDescription.innerHTML += termin.synonym != '' ? `<div class="block">
                    <h2 class="translateheader" tabindex="0">Синонім або відсилання до іншого терміна</h2>
                    <hr class="hrline">
                        <p id="synonym">${termin.synonym}</p>
                </div>`: '';

                otherDescription.innerHTML += termin.vocabulary != '' ? `<div class="block">
                        <h2 class="translateheader" tabindex="0">Словникове значення </h2>
                        <hr class="hrline">
                            <p id="vocabulary">${termin.vocabulary}</p>
                </div>`: '';

                otherDescription.innerHTML += termin.contextual != '' ? `<div class="block">
                            <h2 class="translateheader" tabindex="0">Контекстне значення </h2>
                            <hr class="hrline">
                                <p id="contextual">${termin.contextual}</p>
                </div>`: '';

                otherDescription.innerHTML += termin.source != '' ? `<div class="block ">
                                <h2 class="translateheader" tabindex="0">Джерело </h2>
                                <hr class="hrline">
                                    <p id="source" class="source lightblue ">${termin.source}</p>
                </div>`: '';
            }
        }


        document.addEventListener('DOMContentLoaded', () => getData());
