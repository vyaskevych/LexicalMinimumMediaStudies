window.onload = () => {
    let input = document.querySelector('#input')
    input.oninput = function () {
        let value = this.value.trim();
        value=new RegExp(value,'gi');
        let list = document.querySelectorAll('.searchItem');
        if (value) {
            list.forEach(elem => {
                if (elem.innerText.search(value) == -1) {
                    elem.classList.add('hide')
                } else{
                    elem.classList.remove('hide');

                }
            });
        }
        else {
            list.forEach(elem => {
                elem.classList.remove('hide');
            });
        }
       
    }
};