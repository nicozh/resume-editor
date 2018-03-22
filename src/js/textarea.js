{
    $("#app").on('keyup', 'textarea', function (e) {
        let cur = e.target
        cur.style.height = 'auto';
        cur.style.height = cur.scrollHeight + "px";
    })
    setTimeout(() => {
        let x = document.querySelectorAll('textarea')
        for (let i = 0; i < x.length; i++) {
            $(x[i]).trigger('keyup', [1])
        }
    }, 1000);
}