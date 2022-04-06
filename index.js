const count = 10;
const key = 'K4WJvoOKuM7XGgbXU2vJBb1FMfS-woXJ-sn7tv4NItk';
const ele = document.querySelector('#image')
let resp = [];
let ready = false
var imagesLoades = 0
var totalImages = 0
function imageLoaded(){
    console.log('images loaded');
    imagesLoades++
    if(imagesLoades === totalImages){
        ready = true
        console.log('ready', ready);
    }
}

function dispFunction(){
    imagesLoades = 0
    totalImages = resp.length;
    resp.forEach(function(photos){
        var y = document.createElement('a')
        y.setAttribute('href',photos.links.html)
        y.setAttribute('target','_blank')
        var x = document.createElement('img')
        x.setAttribute('src',photos.urls.regular)
        x.setAttribute('alt', photos.alt_description)
        x.setAttribute('title',photos.alt_description)
        x.addEventListener('load',imageLoaded)
        y.append(x)
        ele.append(y)
    })
}

async function getData(){
    try{
        var val = await fetch(`https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`)
    resp = await val.json();
    dispFunction();
    console.log(resp);
    }
    catch(error){
        console.log(error);
    }
}

window.addEventListener('scroll',function(){
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false
        getData()
        console.log('scrolled');
    }
})
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(
          "body").style.visibility = "hidden";
        document.querySelector(
          "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
          "#loader").style.display = "none";
        document.querySelector(
          "body").style.visibility = "visible";
    }}
getData();