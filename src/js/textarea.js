{

    $("#app").on('keyup', 'textarea', function (e) {
        let cur = e.target
        cur.style.height = 'auto';
        cur.style.height = cur.scrollHeight + "px";
    })
}