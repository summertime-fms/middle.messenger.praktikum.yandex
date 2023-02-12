(() => {
    (() => {
        const checkState = function () {
            let parent = this.closest('.form__label');
            if (!parent) return;

            this.value === '' ?
                parent.classList.remove('active') :
                parent.classList.add('active')
        }

        const inputs = document.querySelectorAll('input:not([type="checkbox"]), textarea, input:not([type="radio"])')
        inputs.forEach((el) => {
            el.addEventListener('change', checkState);
        })
    })();

})()