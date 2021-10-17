var cplay = window.Cplay;
window.addEventListener('DOMContentLoaded', changeHeight);
window.addEventListener('resize', changeHeight);

var custom = new Scrollbot(".custom-scroll", 6).setStyle({
    "background": "rgb(226 226 226)",
    "z-index": "2"
}, {
    "background": "rgba(0,0,0,0)"
});

cplay.create(function (musicfile, lyricsfile) {
    cplay.change(musicfile, lyricsfile);
}, {});

function changeHeight() {
    document.querySelector("body").style.height = document.documentElement.clientHeight + 'px';
}