{
    let parent = document.getElementById('app')
    parent.addEventListener('keyup', function (e) {
        let cur = e.target
        cur.style.height = 'auto';
        cur.style.height = cur.scrollHeight + "px";
    })
}