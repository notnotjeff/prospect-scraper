module.exports = `
<body><div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window cc-banner cc-type-info cc-theme-block cc-bottom cc-color-override--38786966 " style=""><!--googleoff: all--><span id="cookieconsent:desc" class="cc-message">Käytämme evästeitä parantaaksemme palveluidemme käyttökokemusta. Jatkamalla sivuston käyttöä hyväksyt evästekäytäntömme. <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="/liiga/evastekaytannot" target="_blank">Lue lisää evästeistä.</a></span><div class="cc-compliance"><a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss">OK</a></div><!--googleon: all--></div>
    <div id="wrapper">
      <div class="team-logos"><div id="team-logos" style="max-width: 1280px"><a href="https://www.hifk.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/hifk.png"></a><a href="http://www.hpk.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/hpk.png"></a><a href="https://www.ilves.com" target="_blank"><img src="/static/liiga/common/img/team-logos/ilves.png"></a><a href="https://www.jukurit.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/jukurit.png"></a><a href="https://www.jypliiga.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/jyp.png"></a><a href="https://www.kalpa.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/kalpa.png"></a><a href="https://www.kookoo.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/kookoo.png"></a><a href="https://karpat.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/karpat.png"></a><a href="https://www.raumanlukko.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/lukko.png"></a><a href="https://www.pelicans.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/pelicans.png"></a><a href="https://www.saipa.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/saipa.png"></a><a href="https://www.vaasansport.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/sport.png"></a><a href="https://www.tappara.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/tappara.png"></a><a href="http://hc.tps.fi" target="_blank"><img src="/static/liiga/common/img/team-logos/tps.png"></a><a href="https://www.assat.com" target="_blank"><img src="/static/liiga/common/img/team-logos/assat.png"></a></div>
</div>
      
  
    <div id="ad-banner" data-id="91">
      <a href="https://www.veikkaus.fi/fi/etuasiakas?category=edut#!/2020_syksy_liiga_aitio" target="_blank">
        <span id="ad-span"></span>
        <img class="ad-image d" data-src="/media/ads/V-EA-aitioarvonta2020-1300x120.jpg" src="/media/ads/V-EA-aitioarvonta2020-1300x120.jpg" style="display: none !important;" width="1300" hidden="" height="250">
        <img class="ad-image m" data-src="/media/ads/V-EA-aitioarvonta2020-300x100.jpg" width="350" height="350">
      </a>
    </div>
  

      <div id="mainmenu">

        <div class="menubar">

          
          <a href="/fi/">
            
            <img class="logo mobile " src="/static/liiga/common/img/liiga_logo_mobile.png">
          </a>

          <button class="toggle-menu"><i class="fa fa-bars"></i></button>
          
          <div class="mobileLanguageSelect">
          





<div>





<a href="/fi/" onclick="
document.cookie = 'django_language=fi;path=/;expires=false';
">

<p id="fimobile" style="text-decoration: underline; font-weight: bold;">FI</p>

</a>


</div>
<p>|</p>
<div>



<a href="/en/" onclick="
document.cookie = 'django_language=en;path=/;expires=false';
">

<p id="enmobile" style="text-decoration: none; font-weight: normal;">EN</p>

</a>




</div>

<script type="text/javascript">
// Fetches the index of a cookie based on a name
function cookieIndex(cookie_name){
var cookies = document.cookie.split(";")
var index = -1;
for(var i = 0; i<cookies.length; i++){
if(cookies[i].includes(cookie_name)){
index = i
}
}
return index;
}

function elementWithIdExists(idToSearch){
var tmp = document.getElementsByTagName("p")
var exists = false

for(var i = 0; i<tmp.length;i++){
  var candidate = tmp[i].id
  if(idToSearch.toString()==candidate.toString()){
    exists = true;
  }

}
return exists;
}


var cookies=document.cookie.split(";")
// If no django_language cookie has been set, set it to default.
if(cookieIndex("django_language")==-1){
document.cookie = 'django_language=fi;path=/;expires=false';
}

var langselectmobile
var langselectdesktop

// Determine, if the desktop or mobile version of the site is in use.
// Based on that, fetch language buttons
if(elementWithIdExists(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"mobile")){
var langselectmobile = document.getElementById(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"mobile")
}

if(elementWithIdExists(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"desktop")){
var langselectdesktop = document.getElementById(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"desktop")
}

// Bold and underline the active language
if(langselectdesktop != null){
langselectdesktop.style.textDecoration="underline";
langselectdesktop.style.fontWeight="bold";
}
if(langselectmobile != null){
langselectmobile.style.textDecoration="underline";
langselectmobile.style.fontWeight="bold";
}



// Update language selection buttons if language has been changed from the URL

window.onload = function (){
  //Fetch current url and update cookie based on language code within it

  var tmp = window.location.href
  var location = tmp.split("/")
  for(var l of location){
    if(l == "en"){
    document.cookie = 'django_language=en;path=/;expires=false';
    }else if (l == "fi"){
    document.cookie = 'django_language=fi;path=/;expires=false';
    }
  }

// Bold and underline language selection button based on active language
  var cookies=document.cookie.split(";");
  var currentLang = cookies[cookieIndex("django_language")].split("=")[1].toString();

  if(currentLang == "fi"){
  if(elementWithIdExists(currentLang+""+"mobile")){
    var langselectmobilefi = document.getElementById(currentLang+""+"mobile")
    var langselectmobileen = document.getElementById("en"+""+"mobile")

    langselectmobilefi.style.textDecoration="underline";
    langselectmobilefi.style.fontWeight="bold";
    langselectmobileen.style.textDecoration="none";
    langselectmobileen.style.fontWeight="normal";

    }
  if(elementWithIdExists(currentLang+""+"desktop")){
    var langselectdesktopfi = document.getElementById(currentLang+""+"desktop")
    var langselectdesktopen = document.getElementById("en"+""+"desktop")

    langselectdesktopfi.style.textDecoration="underline";
    langselectdesktopfi.style.fontWeight="bold";
    langselectdesktopen.style.textDecoration="none";
    langselectdesktopen.style.fontWeight="normal";

    }
  }else if(currentLang == "en"){

   if(elementWithIdExists(currentLang+""+"mobile")){
    var langselectmobileen = document.getElementById(currentLang+""+"mobile")
    var langselectmobilefi = document.getElementById("fi"+""+"mobile")

    langselectmobileen.style.textDecoration="underline";
    langselectmobileen.style.fontWeight="bold";
    langselectmobilefi.style.textDecoration="none";
    langselectmobilefi.style.fontWeight="normal";


    }
  if(elementWithIdExists(currentLang+""+"desktop")){
    var langselectdesktopen = document.getElementById(currentLang+""+"desktop")
    var langselectdesktopfi = document.getElementById("fi"+""+"desktop")

    langselectdesktopen.style.textDecoration="underline";
    langselectdesktopen.style.fontWeight="bold";
    langselectdesktopfi.style.textDecoration="none";
    langselectdesktopfi.style.fontWeight="normal";

    }
  }

}



</script>

          </div>
        </div>

        
        <div class="logo ">
          <img src="/static/liiga/common/img/liiga_logo.png">
          <a href="/fi/" class="bg-hack"></a>
        </div>

        <img src="/static/liiga/common/img/avainlippu_sininen_rgb.png" class="avainlippu">

        <ul class="menu menu-">

          <li><a class="uutiset" href="/fi/uutiset/">Uutiset</a></li>
          <li><a class="ottelut" href="/fi/ottelut/">Ottelut</a></li>
          <li class="has-submenu"><p class="tilastot"><span>Tilastot<span class="menu-caret">&nbsp;<i class="fa fa-caret-right"></i></span></span></p>
            <ul class="submenu">
              <li><a href="/fi/tilastot/joukkueet/">Joukkuetilastot</a></li>
              <li><a href="/fi/tilastot/pelaajat/">Pelaajatilastot</a></li>
              <li><a href="/fi/tilastot/rajapyykit/">Rajapyykit</a></li>
              <li><a href="/fi/tilastot/tyokalut/">Sarjataulukkolaskuri</a></li>
              <li><a href="https://records.finhockey.fi" target="_blank">Suomi-kiekon<br>ennätykset ja tilastot</a></li>
           </ul>
          </li>
          <li><a class="pelaajat" href="/fi/pelaajat/">Pelaajat</a></li>
          <li class="has-submenu"><p class="joukkueet"><span>Joukkueet<span class="menu-caret">&nbsp;<i class="fa fa-caret-right"></i></span></span></p>

            <ul class="submenu">
              <li><a href="/fi/joukkueet/hifk/">HIFK</a></li><li><a href="/fi/joukkueet/hpk/">HPK</a></li><li><a href="/fi/joukkueet/ilves/">Ilves</a></li><li><a href="/fi/joukkueet/jukurit/">Jukurit</a></li><li><a href="/fi/joukkueet/jyp/">JYP</a></li><li><a href="/fi/joukkueet/kalpa/">KalPa</a></li><li><a href="/fi/joukkueet/kookoo/">KooKoo</a></li><li><a href="/fi/joukkueet/karpat/">Kärpät</a></li><li><a href="/fi/joukkueet/lukko/">Lukko</a></li><li><a href="/fi/joukkueet/pelicans/">Pelicans</a></li><li><a href="/fi/joukkueet/saipa/">SaiPa</a></li><li><a href="/fi/joukkueet/sport/">Sport</a></li><li><a href="/fi/joukkueet/tappara/">Tappara</a></li><li><a href="/fi/joukkueet/tps/">TPS</a></li><li><a href="/fi/joukkueet/assat/">Ässät</a></li>
            </ul>
          </li>

          <li class="has-submenu"><p class="liiga"><span>Liiga<span class="menu-caret">&nbsp;<i class="fa fa-caret-right"></i></span></span></p>
            <ul class="submenu">
              
              
              
                
                
                  
                  
                    
                      <li><a href="/fi/liiga/yhteystiedot">Yhteystiedot</a></li>
                        

                    

                    

                   
                  
                  
                    
                      <li><a href="/fi/liiga/erotuomarit">Erotuomarit</a></li>
                        

                    

                    

                   
                  
                  
                    
                      <li><a href="https://www.kannattajat.fi/collections/liiga" target="_blank">Kauppa</a></li>

                    

                    

                   
                  
                  
                    
                      <li><a href="/fi/liiga/palkinnot">Palkinnot</a></li>
                        

                    

                    

                   
                  
                  
                    
                      <li><a href="http://www.smliiga-alumni.fi/" target="_blank">Alumni</a></li>

                    

                    

                   
                  
                  
                    
                      <li><a href="/fi/liiga/kilpailusaannot">Kilpailusäännöt</a></li>
                        

                    

                    

                   
                  
                  
                    
                      <li><a href="/fi/liiga/kurinpitosaannot">Kurinpitosäännöt</a></li>
                        

                    

                    

                   
                  
                  
                    
                      <li><a href="/fi/liiga/kannattajat">Kannattajat</a></li>
                        
                          <li><a href="https://ymparistoohjelma.liiga.fi/en/" target="_blank">Environment Program</a></li>
                        

                    

                    

                   
                  
                  
                    
                      <li><a href="/fi/liiga/ohjeet">Ohjeet</a></li>
                        

                    

                    

                   
                  
                  
                    
                      <li><a href="/fi/liiga/turvallisuusohje">Turvallisuusohje</a></li>
                        

                    

                    

                   
                  
                  
                    

                    

                   
                  
                  
                    

                    

                   
                  
                  
                    

                    

                   
                  
                
              
              <li><a href="/mediasivut">Media</a></li>
            </ul>
          </li>

           
           <li class="languageSelect">
           





<div>





<a href="/fi/" onclick="
document.cookie = 'django_language=fi;path=/;expires=false';
">

<p id="fidesktop" style="text-decoration: underline; font-weight: bold;">FI</p>

</a>


</div>
<p>|</p>
<div>



<a href="/en/" onclick="
document.cookie = 'django_language=en;path=/;expires=false';
">

<p id="endesktop" style="text-decoration: none; font-weight: normal;">EN</p>

</a>




</div>

<script type="text/javascript">
// Fetches the index of a cookie based on a name
function cookieIndex(cookie_name){
var cookies = document.cookie.split(";")
var index = -1;
for(var i = 0; i<cookies.length; i++){
if(cookies[i].includes(cookie_name)){
index = i
}
}
return index;
}

function elementWithIdExists(idToSearch){
var tmp = document.getElementsByTagName("p")
var exists = false

for(var i = 0; i<tmp.length;i++){
  var candidate = tmp[i].id
  if(idToSearch.toString()==candidate.toString()){
    exists = true;
  }

}
return exists;
}


var cookies=document.cookie.split(";")
// If no django_language cookie has been set, set it to default.
if(cookieIndex("django_language")==-1){
document.cookie = 'django_language=fi;path=/;expires=false';
}

var langselectmobile
var langselectdesktop

// Determine, if the desktop or mobile version of the site is in use.
// Based on that, fetch language buttons
if(elementWithIdExists(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"mobile")){
var langselectmobile = document.getElementById(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"mobile")
}

if(elementWithIdExists(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"desktop")){
var langselectdesktop = document.getElementById(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"desktop")
}

// Bold and underline the active language
if(langselectdesktop != null){
langselectdesktop.style.textDecoration="underline";
langselectdesktop.style.fontWeight="bold";
}
if(langselectmobile != null){
langselectmobile.style.textDecoration="underline";
langselectmobile.style.fontWeight="bold";
}



// Update language selection buttons if language has been changed from the URL

window.onload = function (){
  //Fetch current url and update cookie based on language code within it

  var tmp = window.location.href
  var location = tmp.split("/")
  for(var l of location){
    if(l == "en"){
    document.cookie = 'django_language=en;path=/;expires=false';
    }else if (l == "fi"){
    document.cookie = 'django_language=fi;path=/;expires=false';
    }
  }

// Bold and underline language selection button based on active language
  var cookies=document.cookie.split(";");
  var currentLang = cookies[cookieIndex("django_language")].split("=")[1].toString();

  if(currentLang == "fi"){
  if(elementWithIdExists(currentLang+""+"mobile")){
    var langselectmobilefi = document.getElementById(currentLang+""+"mobile")
    var langselectmobileen = document.getElementById("en"+""+"mobile")

    langselectmobilefi.style.textDecoration="underline";
    langselectmobilefi.style.fontWeight="bold";
    langselectmobileen.style.textDecoration="none";
    langselectmobileen.style.fontWeight="normal";

    }
  if(elementWithIdExists(currentLang+""+"desktop")){
    var langselectdesktopfi = document.getElementById(currentLang+""+"desktop")
    var langselectdesktopen = document.getElementById("en"+""+"desktop")

    langselectdesktopfi.style.textDecoration="underline";
    langselectdesktopfi.style.fontWeight="bold";
    langselectdesktopen.style.textDecoration="none";
    langselectdesktopen.style.fontWeight="normal";

    }
  }else if(currentLang == "en"){

   if(elementWithIdExists(currentLang+""+"mobile")){
    var langselectmobileen = document.getElementById(currentLang+""+"mobile")
    var langselectmobilefi = document.getElementById("fi"+""+"mobile")

    langselectmobileen.style.textDecoration="underline";
    langselectmobileen.style.fontWeight="bold";
    langselectmobilefi.style.textDecoration="none";
    langselectmobilefi.style.fontWeight="normal";


    }
  if(elementWithIdExists(currentLang+""+"desktop")){
    var langselectdesktopen = document.getElementById(currentLang+""+"desktop")
    var langselectdesktopfi = document.getElementById("fi"+""+"desktop")

    langselectdesktopen.style.textDecoration="underline";
    langselectdesktopen.style.fontWeight="bold";
    langselectdesktopfi.style.textDecoration="none";
    langselectdesktopfi.style.fontWeight="normal";

    }
  }

}



</script>

           </li>
        </ul>

      </div>
      
  
    <div id="parade-ad-banner" data-id="3">
      <a href="https://www.defa.com/fi/sahkoauton-lataus/" target="_blank">
        <span id="parade-ad-span"></span>
        <img class="ad-image d" data-src="/media/ads/defa_liiga_2400x400_cs_desktop-3-sahkoauton-lataus.jpg" src="/media/ads/defa_liiga_2400x400_cs_desktop-3-sahkoauton-lataus.jpg" style="display: none !important;" hidden="">
        <img class="ad-image m" data-src="/media/ads/defa_liiga_1500x600_boksi_mobiili-3-sahkoauton-lataus.jpg">
      </a>
    </div>
  


      
  <div id="page">
    <h1>#8 Kokkonen, Mikko</h1>
    <div class="player-info-left-wrapper">
      <div class="player-image-wrapper">
        
        <div class="img">
          
            <img src="/media/players/31128854_KOKKONEN_MIKKO_20_2.png.600x750_q85_box-74%2C46%2C451%2C517.png">
          
        </div>
      </div>

      <div class="player-info-wrapper">
        
  <table id="player-info">

    
    <tbody><tr>
      <th>Joukkue </th>
      <td>Jukurit</td>
    </tr>
    

    <tr>
      <th>Pelipaikka </th>
      <td>Vasen puolustaja</td>
    </tr>
    <tr>
      <th>Syntynyt </th>
      <td>18.1.2001</td>
    </tr>
    <tr>
     <th>Kansalaisuus </th>
      <td>FIN</td>
    </tr>
    <tr>
      <th>Syntymäpaikka </th>
      <td>Mikkeli, FIN</td>
    </tr>
    <tr>
      <th>Ikä </th>
      <td>19</td>
    </tr>
    <tr>
      <th>Pituus </th>
      <td>181</td>
    </tr>
    <tr>
      <th>Paino </th>
      <td>90</td>
    </tr>
    <tr>
      <th>Maila </th>
      <td>L</td>

    </tr>
  </tbody></table>

      </div>
    </div>
    <div class="player-info-right-wrapper">
      <div class="player-news-wrapper">
        <div class="player-news">
          <div class="news-list-wrapper">
            <div class="banner desktop">
              

            </div>
            
              <div class="news-list">
                <h2>Ajankohtaista</h2>
                
  
    <div class="item">
      <div class="time">
        <div class="date">26.10.</div>
        <div class="year">2020</div>
      </div>
      
      <div class="headline">
        <a href="/fi/uutiset/2020/10/26/nuoret-leijonat-kohti-mm-kisoja-nama-pelaajat-liigasta-marraskuun-leiriryhmassa">Nuoret Leijonat kohti MM-kisoja – nämä pelaajat Liigasta marraskuun leiriryhmässä</a>
      </div>
      
    </div>
  
    <div class="item">
      <div class="time">
        <div class="date">8.1.</div>
        <div class="year">2020</div>
      </div>
      
      <div class="headline">
        <a href="/fi/uutiset/2020/01/08/red-bull-lapimurto-jakso-17-mm-kooste">Red Bull Läpimurto: Jakso 17 – MM-kooste</a>
      </div>
      
    </div>
  
    <div class="item">
      <div class="time">
        <div class="date">1.1.</div>
        <div class="year">2020</div>
      </div>
      
      <div class="headline">
        <a href="/fi/uutiset/2020/01/01/red-bull-lapimurto-jakso-16-vierumaen-kautta-kohti-mm-kisoja">Red Bull Läpimurto: Jakso 16 – Vierumäen kautta kohti MM-kisoja</a>
      </div>
      
    </div>
  
    <div class="item">
      <div class="time">
        <div class="date">12.12.</div>
        <div class="year">2019</div>
      </div>
      
      <div class="headline">
        <a href="/fi/uutiset/2019/12/12/nuorten-leijonien-mm-leiriryhma-valittu-iso-joukko-liiga-pelaajia-mukana">Nuorten Leijonien MM-leiriryhmä valittu – iso joukko Liiga-pelaajia mukana</a>
      </div>
      
    </div>
  
    <div class="item">
      <div class="time">
        <div class="date">22.6.</div>
        <div class="year">2019</div>
      </div>
      
      <div class="headline">
        <a href="/fi/uutiset/2019/06/22/kaapo-kakko-sivusi-suomalaispelaajien-ennatysta-nhln-varaustilaisuudessa-tassa-suomalaisten-karkinimet">Kaapo Kakko sivusi suomalaispelaajien ennätystä NHL:n varaustilaisuudessa – tässä suomalaisten kärkinimet</a>
      </div>
      
    </div>
  
  
  <a class="more" href="/fi/uutiset/">
    Lisää uutisia <i class="fa fa-caret-right"></i>
  
  </a>

              </div>
            

          </div>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>
    <div class="player-jump-menu-wrapper">
       
    <div class="clearfix" id="jump-menu">
      <form action="#">
          <div>
            <span class="label">Joukkue: </span>
            
  <div class="select">
    <select name="team">
      <option value="">Kaikki</option>
        <option value="assat">Ässät</option>
        <option value="hifk">HIFK</option>
        <option value="hpk">HPK</option>
        <option value="ilves">Ilves</option>
        <option value="jukurit" selected="">Jukurit</option>
        <option value="jyp">JYP</option>
        <option value="kalpa">KalPa</option>
        <option value="karpat">Kärpät</option>
        <option value="kookoo">KooKoo</option>
        <option value="lukko">Lukko</option>
        <option value="pelicans">Pelicans</option>
        <option value="saipa">SaiPa</option>
        <option value="sport">Sport</option>
        <option value="tappara">Tappara</option>
        <option value="tps">TPS</option>
    </select>
  </div>

          </div>
          <div>
            <span class="label">Pelaaja: </span>
            
  <div class="select">
    <select name="player">
      <option value="">Valitse pelaaja</option>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    <option class="popt" data-team="jukurit" value="/fi/pelaajat/60483742/abramov-vitali">Vitali Abramov</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/60466256/afanasjev-kristian">Kristian Afanasjev</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/60346724/galvas-jakub">Jakub Galvas</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/30375718/gronblom-tom">Tom Grönblom</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/30548804/haarti-jaakko">Jaakko Haarti</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/21600081/henritius-teemu">Teemu Henritius</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/30851669/huttunen-heikki">Heikki Huttunen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/21700651/hyvarinen-ville">Ville Hyvärinen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/60346723/jakovenko-aleksandr">Aleksandr Jakovenko</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/28547299/kemppainen-samuel">Samuel Kemppainen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/30747854/kiesila-perttu">Perttu Kiesilä</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/31128854/kokkonen-mikko" selected="">Mikko Kokkonen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/24174051/leskinen-ville">Ville Leskinen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/31317982/linjala-miiro">Miiro Linjala</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/22483058/lofman-anssi">Anssi Löfman</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/24229184/makinen-atte">Atte Mäkinen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/24064653/makinen-otto">Otto Mäkinen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/30667484/matikainen-kalle">Kalle Matikainen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/30712591/nikkanen-henri">Henri Nikkanen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/40172011/oden-markus">Markus Oden</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/22895620/piitulainen-jesper">Jesper Piitulainen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/22936754/pulkkinen-teemu">Teemu Pulkkinen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/22993098/rajaniemi-sami">Sami Rajaniemi</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/31267715/randelin-eetu">Eetu Randelin</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/30439447/rindell-axel">Axel Rindell</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/60466216/rohdin-joachim">Joachim Rohdin</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/23155013/saha-mikael">Mikael Saha</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/30870187/salmela-santeri">Santeri Salmela</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/60466255/stransky-simon">Simon Stransky</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/25479438/tillanen-kai">Kai Tillanen</option><option class="popt" data-team="jukurit" value="/fi/pelaajat/23702275/vahatalo-julius">Julius Vähätalo</option></select>
  </div>

          </div>
      </form>
    </div>
 
    </div>
    <div class="menu middle-menu">

      <a class="active" href="/fi/pelaajat/31128854/kokkonen-mikko">Tilastot</a>
      <a class="" href="/fi/pelaajat/31128854/kokkonen-mikko/ottelu-ottelulta">Ottelu ottelulta</a>

    </div>

    
  <div class="stats" id="stats-section">

    
      <h2>Kausi2020-2021</h2>
      
  
  <table>
  
  
    <thead class="header">
      <tr>
        <th colspan="42">Runkosarja</th>
      </tr>
    </thead>

    
      
      </table><table>
        <thead>
          <tr>
            <th>Kausi</th>
            <th>Joukkue</th>
            <th> Sarja</th>
            <th>O</th>
            <th>M</th>
            <th>S</th>
            <th>P</th>
            <th class="h-m">R</th>
            <th class="h-m">+</th>
            <th class="h-m">-</th>
            <th class="h-m">±</th>
            <th class="h-l">YV</th>
            <th class="h-l">AV</th>
            <th class="h-l">VM</th>
            <th class="h-l">L</th>
            <th class="h-m">L%</th>
            
            
              <th class="h-l">A</th>
              <th class="h-m">A%</th>
            
            
              <th class="h-s">Aika</th>
            
          </tr>
        </thead>
        <tbody>
          
          



            <tr class=" ">
              <td>
              

                
                  2020-2021
                
              
            </td>
            <td>
              
                Jukurit
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>10</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td class="h-m">6</td>
            <td class="h-m">
              
                2
              
            </td>
            <td class="h-m">
              
                6
              
            </td>
            <td class="h-m"> 
              
                -4
              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">
              
                26
              
            </td>
            <td class="h-m">
              
                0,0
              
            </td>
            
            
              <td class="h-l">0</td>
              <td class="h-m">-</td>
            
            
              <td class="h-s">21:21</td>
            
          </tr>
          
            
          
        
      </tbody>
    
  
  </table>

    


    
      <h2>Uran tilastot</h2>
      
  
  <table>
  
  
    <thead class="header">
      <tr>
        <th colspan="42">Runkosarja</th>
      </tr>
    </thead>

    
      
      </table><table>
        <thead>
          <tr>
            <th>Kausi</th>
            <th>Joukkue</th>
            <th> Sarja</th>
            <th>O</th>
            <th>M</th>
            <th>S</th>
            <th>P</th>
            <th class="h-m">R</th>
            <th class="h-m">+</th>
            <th class="h-m">-</th>
            <th class="h-m">±</th>
            <th class="h-l">YV</th>
            <th class="h-l">AV</th>
            <th class="h-l">VM</th>
            <th class="h-l">L</th>
            <th class="h-m">L%</th>
            
            
            
          </tr>
        </thead>
        <tbody>
          
          



            <tr class=" ">
              <td>
              

                
                  2016-2017
                
              
            </td>
            <td>
              
                Jukurit
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td class="h-m">0</td>
            <td class="h-m">
              
                0
              
            </td>
            <td class="h-m">
              
                1
              
            </td>
            <td class="h-m"> 
              
                -1
              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">
              
                0
              
            </td>
            <td class="h-m">
              
                -
              
            </td>
            
            
            
          </tr>
          
            
          
        



            <tr class=" ">
              <td>
              

                
                  2017-2018
                
              
            </td>
            <td>
              
                Jukurit
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>12</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td class="h-m">4</td>
            <td class="h-m">
              
                5
              
            </td>
            <td class="h-m">
              
                7
              
            </td>
            <td class="h-m"> 
              
                -2
              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">
              
                12
              
            </td>
            <td class="h-m">
              
                0,0
              
            </td>
            
            
            
          </tr>
          
            
          
        



            <tr class=" ">
              <td>
              

                
                  2018-2019
                
              
            </td>
            <td>
              
                Jukurit
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>56</td>
            <td>3</td>
            <td>16</td>
            <td>19</td>
            <td class="h-m">20</td>
            <td class="h-m">
              
                23
              
            </td>
            <td class="h-m">
              
                39
              
            </td>
            <td class="h-m"> 
              
                -16
              
            </td>
            <td class="h-l">1</td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">
              
                157
              
            </td>
            <td class="h-m">
              
                1,9
              
            </td>
            
            
            
          </tr>
          
            
          
        



            <tr class=" ">
              <td>
              

                
                  2019-2020
                
              
            </td>
            <td>
              
                Jukurit
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>39</td>
            <td>3</td>
            <td>7</td>
            <td>10</td>
            <td class="h-m">10</td>
            <td class="h-m">
              
                19
              
            </td>
            <td class="h-m">
              
                25
              
            </td>
            <td class="h-m"> 
              
                -6
              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">2</td>
            <td class="h-l">
              
                113
              
            </td>
            <td class="h-m">
              
                2,7
              
            </td>
            
            
            
          </tr>
          
            
          
        



            <tr class=" ">
              <td>
              

                
                  2020-2021
                
              
            </td>
            <td>
              
                Jukurit
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>10</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td class="h-m">6</td>
            <td class="h-m">
              
                2
              
            </td>
            <td class="h-m">
              
                6
              
            </td>
            <td class="h-m"> 
              
                -4
              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">
              
                26
              
            </td>
            <td class="h-m">
              
                0,0
              
            </td>
            
            
            
          </tr>
          
            
          
        



            <tr class=" career">
              <td>
              

                
                  Yhteensä
                
              
            </td>
            <td>
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>118</td>
            <td>6</td>
            <td>23</td>
            <td>29</td>
            <td class="h-m">40</td>
            <td class="h-m">
               
                
                  49
                
              
            </td>
            <td class="h-m">
               
                
                  78
                
              
            </td>
            <td class="h-m"> 
              
                
                  -29
                

              
            </td>
            <td class="h-l">1</td>
            <td class="h-l">0</td>
            <td class="h-l">2</td>
            <td class="h-l">
              
                
                  308
                
              
            </td>
            <td class="h-m">
              
                
                  1,9
                
              
            </td>
            
            
            
          </tr>
          
            
          
        
      </tbody>
    
  
  </table>

    
  </div>

    <div class="terms">
      <p>
        Jääkiekon SM-liiga Oy:n tilastojen käyttöön liittyy rajoituksia. Tutustuthan <a href="/liiga/kayttoehdot">käyttöehtoihimme</a>.
      </p>
    </div>
  </div>

    </div>

    <div id="footer">
      <div class="wrapper clearfix">
        <div class="one_fourth">
          <h3>Kumppanit</h3>
          <div class="half">
            <ul>
              <li><a target="_blank" href="https://www.telia.fi/liiga/">Telia ›</a></li>
              <li><a target="_blank" href="https://www.veikkaus.fi/">Veikkaus ›</a></li>
              <li><a target="_blank" href="https://www.intrum.fi/fi/ratkaisut-yrityksille/">Intrum ›</a></li>
              <li><a target="_blank" href="https://www.redbull.com/fi-fi/">Red Bull ›</a></li>
              <li><a target="_blank" href="http://www.scandichotels.fi/">Scandic ›</a></li>
              <li><a target="_blank" href="http://www.clique.fi">Clique ›</a></li>
              <li><a target="_blank" href="https://www.newwave.fi/tuotemerkit/Craft/">Craft ›</a></li>
              <li><a target="_blank" href="http://www.defa.com/fi/fp/main/">Defa ›</a></li>
            </ul>
          </div>
          <div class="half">
            <ul>
              <li><a target="_blank" href="https://www.ea.com/fi-fi/games/nhl/nhl-20">EA Sports›</a></li>
              <li><a target="_blank" href="https://www.if.fi/">If ›</a></li>
              <li><a target="_blank" href="http://www.liigaporssi.fi/">IS Liigapörssi ›</a></li>
              <li><a target="_blank" href="https://uusi.mandatumlife.fi/">Mandatum Life›</a></li>
              <li><a target="_blank" href="https://www.olvi.fi/">Olvi ›</a></li>
              <li><a target="_blank" href="http://www.planex.fi">Planex ›</a></li>
              <li><a target="_blank" href="https://www.olvi.fi/tuotteet/urheiluravinteet/teho-sport/">TEHO Sport ›</a></li>
              <li><a target="_blank" href="https://www.warrioreurope.com/">Warrior ›</a></li>
          </ul>
          </div>
          <div class="clearfix"></div>
        </div>

        <div class="one_fourth">
          <h3>Seurat</h3>
          <div class="half">
            <ul>
              <li><a target="_blank" href="http://www.hifk.fi">HIFK ›</a></li>
              <li><a target="_blank" href="http://hpk.fi">HPK ›</a></li>
              <li><a target="_blank" href="https://www.ilves.com">Ilves ›</a></li>
              <li><a target="_blank" href="http://www.jukurit.fi">Jukurit ›</a></li>
              <li><a target="_blank" href="http://www.jypliiga.fi">JYP ›</a></li>
              <li><a target="_blank" href="http://www.kalpa.fi">KalPa ›</a></li>
              <li><a target="_blank" href="http://www.kookoo.fi/">KooKoo ›</a></li>
              <li><a target="_blank" href="https://karpat.fi">Kärpät ›</a></li>
            </ul>
          </div>
          <div class="half">
            <ul>
              <li><a target="_blank" href="http://www.raumanlukko.fi">Lukko ›</a></li>
              <li><a target="_blank" href="http://www.pelicans.fi">Pelicans ›</a></li>
              <li><a target="_blank" href="http://www.saipa.fi">SaiPa ›</a></li>
              <li><a target="_blank" href="http://www.vaasansport.fi">Sport ›</a></li>
              <li><a target="_blank" href="http://www.tappara.fi">Tappara ›</a></li>
              <li><a target="_blank" href="http://hc.tps.fi">TPS ›</a></li>
              <li><a target="_blank" href="http://www.assat.com">Ässät ›</a></li>
            </ul>
          </div>
          <div class="clearfix"></div>
        </div>

        <div class="one_fourth">
          <h3>Liiga TV:ssä ›</h3>
          <ul>
            <li><a target="_blank" href="https://www.cmore.fi/liiga/10000822?cmp=cmore_sport_oma_online_liiga_convert_erikoisratkaisu_liiga_logo">C More ›</a></li>
            <li><a target="_blank" href="https://www.telia.fi/liiga/">Telia ›</a></li>
          </ul>
        </div>

        <div class="one_fourth">
          <h3>Sosiaalinen media</h3>
          <ul>
            <li><a target="_blank" href="https://www.facebook.com/smliiga">Facebook ›</a></li>
            <li><a target="_blank" href="https://twitter.com/smliiga">Twitter ›</a></li>
            <li><a target="_blank" href="https://twitter.com/liigalive">Twitter-tulospalvelu ›</a></li>
            <li><a target="_blank" href="http://instagram.com/liiga.fi">Instagram ›</a></li>
          </ul>
        </div>
      </div>

      <div class="site-info">
        <div class="copy"> Copyright © Liiga </div>
        <div class="separator">– </div>
        <div class="terms"><a href="/liiga/kayttoehdot">Käyttöehdot </a></div>
        <div class="separator">– </div>
        <div class="terms"><a href="/liiga/tietosuojaseloste">Tietosuoja </a></div>
        <div class="separator">– </div>
        <div class="terms"><a href="/liiga/evastekaytannot"> Evästekäytännöt  </a></div>
        <div class="separator">– </div>
        <div class="feedback"><a href="mailto:palaute@liiga.fi">Palaute </a></div>


      </div>
    </div>

    <script src="/static/common.06e67ac20f382564fb50.js"></script>
    
  <script src="/static/stats/player_base.1a1b268bc6711f6c2186.js"></script>


    <div class="body-scripts">

    
      <!-- Whatsapp -->
      <script type="text/javascript">if(typeof wabtn4fg==="undefined"){wabtn4fg=1;h=document.head||document.getElementsByTagName("head")[0],s=document.createElement("script");s.type="text/javascript";s.src="/static/ext/whatsapp-button.js";h.appendChild(s);}</script>

      <script>
        window.addEventListener("load", function(){
          window.cookieconsent.initialise({
            "palette": {
              "popup": {
              "background": "#000"
            },
            "button": {
              "background": "#fff"
            },
          },
          elements: {
            header: '<span class="cc-header">Käytämme evästeitä parantaaksemme palveluidemme käyttökokemusta. Jatkamalla sivuston käyttöä hyväksyt evästekäytäntömme.</span>&nbsp;',
            message: '<span id="cookieconsent:desc" class="cc-message">Käytämme evästeitä parantaaksemme palveluidemme käyttökokemusta. Jatkamalla sivuston käyttöä hyväksyt evästekäytäntömme.</span>',
            messagelink: '<span id="cookieconsent:desc" class="cc-message">Käytämme evästeitä parantaaksemme palveluidemme käyttökokemusta. Jatkamalla sivuston käyttöä hyväksyt evästekäytäntömme. <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="/liiga/evastekaytannot" target="_blank">Lue lisää evästeistä.</a></span>',
            dismiss: '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss">OK</a>',
            allow: '<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow"></a>',
            deny: '<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny"></a>',
            link: '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="" target="_blank" style="text-decoration:italic">Lue lisää evästeistä.</a>',
            close: '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close"></span>',
          },
          "theme": "block",
          "position": "bottom",
          "content": {
            "message": "Käytämme evästeitä parantaaksemme palveluidemme käyttökokemusta. Jatkamalla sivuston käyttöä hyväksyt evästekäytäntömme.",
            "dismiss": "OK",
            "link": "Lue lisää evästeistä.",
            "href": "/liiga/evastekaytannot"
          }
        })});
      </script>

      <!-- Google Code for Liiga -->

      <!-- Remarketing tags may not be associated with personally identifiable information or placed on pages related to sensitive categories. For instructions on adding this tag and more information on the above requirements, read the setup guide: google.com/ads/remarketingsetup -->

      <script type="text/javascript">
        var google_conversion_id = 1028704862;
        var google_conversion_label = "FUlKCM_Hj1YQ3pTD6gM";
        var google_custom_params = window.google_tag_params;
        var google_remarketing_only = true;
      </script>

      <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js"></script>

      <noscript>
        <div style="display:inline;">
          <img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/1028704862/?value=1.00&amp;currency_code=EUR&amp;label=FUlKCM_Hj1YQ3pTD6gM&amp;guid=ON&amp;script=0"/>
        </div>
      </noscript>

    <!-- Sanoma Retargeting -->
    <script type="text/javascript">
      try { cts = new Tagging(); cts.render('trigger'); } catch (err) { cts.log(err); }
    </script>

      
      <!-- Fonecta insight retargeting -->
      <script type="text/javascript">
        var _fiq = _fiq || []; _fiq.unshift(['trackPageview']); _fiq.unshift(['account', '43fa12c1-13e9-4137-acfc-36830dbeb36c']);
        (function() {
        var _fi = document.createElement('script'); _fi.type = 'text/javascript';
        _fi.async = true;
        _fi.src = '//insight.fonecta.fi/fi.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(_fi, s);
            })();
      </script>
    
    </div>
  
</body>
`
