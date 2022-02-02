module.exports = `
<body><div role="dialog" aria-live="polite" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window cc-banner cc-type-info cc-theme-block cc-bottom cc-color-override--38786966 " style=""><!--googleoff: all--><span id="cookieconsent:desc" class="cc-message">Käytämme evästeitä parantaaksemme palveluidemme käyttökokemusta. Jatkamalla sivuston käyttöä hyväksyt evästekäytäntömme. <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="/mestis/evastekaytannot" target="_blank">Lue lisää evästeistä.</a></span><div class="cc-compliance"><a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss">OK</a></div><!--googleon: all--></div>
    <div id="wrapper">
      <div class="team-logos"><div id="team-logos" style="max-width: 1280px"><div>
        <a href="https://www.forssanpalloseura.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/fps.v54ab8660.png"></a>
      </div><div>
        <a href="http://www.kokkolanhermes.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/hermes.vc0382e5a.png"></a>
      </div><div>
        <a href="https://www.hokki.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/hokki.vcaa4f107.png"></a>
      </div><div>
        <a href="http://www.ipk.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/ipk.va9ad0be6.png"></a>
      </div><div>
        <a href="https://www.kettera.net/" target="_blank"><img src="/static/liiga/common/img/team-logos/kettera.v7d3a6faa.png"></a>
      </div><div>
        <a href="https://www.keupaht.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/keupa.vfa36865d.png"></a>
      </div><div>
        <a href="https://kiekko-espoo.com/" target="_blank"><img src="/static/liiga/common/img/team-logos/kiekko-espoo.ved16c85f.png"></a>
      </div><div>
        <a href="https://joensuunkiekkopojat.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/kiekko-pojat.v2e6af7bf.png"></a>
      </div><div>
        <a href="https://kiekko-vantaa.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/kiekko-vantaa.v3d7af107.png"></a>
      </div><div>
        <a href="https://www.tampereenkoovee.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/koovee.v3dcb9df5.png"></a>
      </div><div>
        <a href="https://peliitat.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/peliitat.vda3036cf.png"></a>
      </div><div>
        <a href="http://www.rokihockey.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/roki.v669dedbe.png"></a>
      </div><div>
        <a href="https://www.sapko.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/sapko.v339c1c1c.png"></a>
      </div><div>
        <a href="https://www.tutohockey.fi/" target="_blank"><img src="/static/liiga/common/img/team-logos/tuto.v00912d18.png"></a>
      </div></div>
</div>
      
      <div id="mainmenu">
        <div class="menubar">
          
          
          <div class="mobileLanguageSelect">
            
<span>
  
  
    <a id="fimobile" href="/fi/" onclick="
  document.cookie = 'django_language=fi;path=/;expires=false';
" style="text-decoration: underline; font-weight: bold;">FI</a>
  
 | 
  
    <a id="enmobile" href="/en/" onclick="
  document.cookie = 'django_language=en;path=/;expires=false';
" style="text-decoration: none; font-weight: normal;">EN</a>
  
  
</span>
<script type="text/javascript">
  // Fetches the index of a cookie based on a name
  function cookieIndex(cookie_name) {
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
    return !!document.getElementById(idToSearch);
  }

  var cookies=document.cookie.split(";")
  // If no django_language cookie has been set, set it to default.
  if(cookieIndex("django_language")==-1){
    document.cookie = 'django_language=fi;path=/;expires=false';
  }

  var langselectmobile;
  var langselectdesktop;

  // Determine, if the desktop or mobile version of the site is in use.
  // Based on that, fetch language buttons
  if (cookies[cookieIndex("django_language")]) {
    if(elementWithIdExists(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"mobile")){
      var langselectmobile = document.getElementById(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"mobile")
    }

    if(elementWithIdExists(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"desktop")){
      var langselectdesktop = document.getElementById(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"desktop")
    }
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
        var langselectmobilefi = document.getElementById(currentLang+"mobile")
        var langselectmobileen = document.getElementById("en"+"mobile")

        langselectmobilefi.style.textDecoration="underline";
        langselectmobilefi.style.fontWeight="bold";
        langselectmobileen.style.textDecoration="none";
        langselectmobileen.style.fontWeight="normal";

      }
      if(elementWithIdExists(currentLang+""+"desktop")){
        var langselectdesktopfi = document.getElementById(currentLang+"desktop")
        var langselectdesktopen = document.getElementById("en"+"desktop")

        langselectdesktopfi.style.textDecoration="underline";
        langselectdesktopfi.style.fontWeight="bold";
        langselectdesktopen.style.textDecoration="none";
        langselectdesktopen.style.fontWeight="normal";

      }
    } else if(currentLang == "en") {
     if(elementWithIdExists(currentLang+""+"mobile")){
        var langselectmobileen = document.getElementById(currentLang+"mobile");
        var langselectmobilefi = document.getElementById("fi"+"mobile");
        langselectmobileen.style.textDecoration="underline";
        langselectmobileen.style.fontWeight="bold";
        langselectmobilefi.style.textDecoration="none";
        langselectmobilefi.style.fontWeight="normal";
      }
      if(elementWithIdExists(currentLang+""+"desktop")){
        var langselectdesktopen = document.getElementById(currentLang+"desktop");
        var langselectdesktopfi = document.getElementById("fi"+"desktop");

        langselectdesktopen.style.textDecoration="underline";
        langselectdesktopen.style.fontWeight="bold";
        langselectdesktopfi.style.textDecoration="none";
        langselectdesktopfi.style.fontWeight="normal";

      }
    }
  }
</script>

          </div>
          <button class="toggle-menu"><i class="fa fa-bars"></i></button>
        </div>

        
        <div class="logo ">
          <a href="/fi/"><img src="/static/liiga/common/img/liiga_logo.v84079fa5.png"></a>
        </div>
        <ul class="menu menu-">
          <li><a class="uutiset" href="/fi/uutiset/">Uutiset</a></li>
          <li><a class="ottelut" href="/fi/ottelut/">Ottelut</a></li>
          <li class="has-submenu"><p class="tilastot"><span>Tilastot<span class="menu-caret">&nbsp;<i class="fa fa-caret-right"></i></span></span></p>
            <ul class="submenu">
              <li><a href="/fi/tilastot/joukkueet/">Joukkuetilastot</a></li>
              <li><a href="/fi/tilastot/pelaajat/">Pelaajatilastot</a></li>
              
              <li><a href="/fi/tilastot/tyokalut/">Sarjataulukkolaskuri</a></li>
           </ul>
          </li>
          <li><a class="pelaajat" href="/fi/pelaajat/">Pelaajat</a></li>
          <li class="has-submenu"><p class="joukkueet"><span>Joukkueet<span class="menu-caret">&nbsp;<i class="fa fa-caret-right"></i></span></span></p>

            <ul class="submenu">
              <li><a href="/fi/joukkueet/fps/">FPS</a></li><li><a href="/fi/joukkueet/hermes/">Hermes</a></li><li><a href="/fi/joukkueet/hokki/">Hokki</a></li><li><a href="/fi/joukkueet/ipk/">IPK</a></li><li><a href="/fi/joukkueet/kettera/">Ketterä</a></li><li><a href="/fi/joukkueet/keupa-ht/">KeuPa HT</a></li><li><a href="/fi/joukkueet/k-espoo/">Kiekko-Espoo</a></li><li><a href="/fi/joukkueet/jokp/">Kiekko-Pojat</a></li><li><a href="/fi/joukkueet/k-vantaa/">Kiekko-Vantaa</a></li><li><a href="/fi/joukkueet/koovee/">KOOVEE</a></li><li><a href="/fi/joukkueet/peliitat/">Peliitat</a></li><li><a href="/fi/joukkueet/roki/">RoKi</a></li><li><a href="/fi/joukkueet/sapko/">SaPKo</a></li><li><a href="/fi/joukkueet/tuto-hockey/">TUTO Hockey</a></li>
            </ul>
          </li>
          <li><a class="uutiset" href="/hengenpelastajaliiga">Hengenpelastajaliiga</a></li>
          <li class="has-submenu"><p class="liiga"><span>Mestis<span class="menu-caret">&nbsp;<i class="fa fa-caret-right"></i></span></span></p>
            <ul class="submenu">
              
              
              
                
                
                
                  
                    <li><a href="/fi/mestis/yhteystiedot">Yhteystiedot</a></li>
                      
                  
                

                
                
              
            </ul>
          </li>
        </ul>
        <div class="languageSelect">
          
<span>
  
  
    <a id="fidesktop" href="/fi/" onclick="
  document.cookie = 'django_language=fi;path=/;expires=false';
" style="text-decoration: underline; font-weight: bold;">FI</a>
  
 | 
  
    <a id="endesktop" href="/en/" onclick="
  document.cookie = 'django_language=en;path=/;expires=false';
" style="text-decoration: none; font-weight: normal;">EN</a>
  
  
</span>
<script type="text/javascript">
  // Fetches the index of a cookie based on a name
  function cookieIndex(cookie_name) {
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
    return !!document.getElementById(idToSearch);
  }

  var cookies=document.cookie.split(";")
  // If no django_language cookie has been set, set it to default.
  if(cookieIndex("django_language")==-1){
    document.cookie = 'django_language=fi;path=/;expires=false';
  }

  var langselectmobile;
  var langselectdesktop;

  // Determine, if the desktop or mobile version of the site is in use.
  // Based on that, fetch language buttons
  if (cookies[cookieIndex("django_language")]) {
    if(elementWithIdExists(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"mobile")){
      var langselectmobile = document.getElementById(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"mobile")
    }

    if(elementWithIdExists(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"desktop")){
      var langselectdesktop = document.getElementById(cookies[cookieIndex("django_language")].split("=")[1].toString()+""+"desktop")
    }
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
        var langselectmobilefi = document.getElementById(currentLang+"mobile")
        var langselectmobileen = document.getElementById("en"+"mobile")

        langselectmobilefi.style.textDecoration="underline";
        langselectmobilefi.style.fontWeight="bold";
        langselectmobileen.style.textDecoration="none";
        langselectmobileen.style.fontWeight="normal";

      }
      if(elementWithIdExists(currentLang+""+"desktop")){
        var langselectdesktopfi = document.getElementById(currentLang+"desktop")
        var langselectdesktopen = document.getElementById("en"+"desktop")

        langselectdesktopfi.style.textDecoration="underline";
        langselectdesktopfi.style.fontWeight="bold";
        langselectdesktopen.style.textDecoration="none";
        langselectdesktopen.style.fontWeight="normal";

      }
    } else if(currentLang == "en") {
     if(elementWithIdExists(currentLang+""+"mobile")){
        var langselectmobileen = document.getElementById(currentLang+"mobile");
        var langselectmobilefi = document.getElementById("fi"+"mobile");
        langselectmobileen.style.textDecoration="underline";
        langselectmobileen.style.fontWeight="bold";
        langselectmobilefi.style.textDecoration="none";
        langselectmobilefi.style.fontWeight="normal";
      }
      if(elementWithIdExists(currentLang+""+"desktop")){
        var langselectdesktopen = document.getElementById(currentLang+"desktop");
        var langselectdesktopfi = document.getElementById("fi"+"desktop");

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
      
        
  <div id="top-ad">
      <!-- Adform publisher tag -->
      <!-- Tag for Mestis.fi - Mestis.fi TOP 980x552, 980x400, 980x120 placement -->
      <script data-adfscript="adx.adform.net/adx/?mid=611096"></script>
      <script src="//s1.adform.net/banners/scripts/adx.js" async="" defer=""></script>
  </div>

      

      
  <div id="page">
    <h1>#18 Simontaival, Kasper</h1>
    <div class="player-info-left-wrapper">
      <div class="player-image-wrapper">
        
        <div class="img">
          
            <img src="/static/liiga/common/img/unknown-player-transparent-600x600.v1bec7489.png">
          
        </div>
      </div>

      <div class="player-info-wrapper">
        
  <table id="player-info">

    
    <tbody><tr>
      <th>Joukkue </th>
      <td>TUTO Hockey</td>
    </tr>
    

    <tr>
      <th>Pelipaikka </th>
      <td>Hyökkääjä</td>
    </tr>
    <tr>
      <th>Syntynyt </th>
      <td>11.1.2002</td>
    </tr>
    <tr>
     <th>Kansalaisuus </th>
      <td>FIN</td>
    </tr>
    <tr>
      <th>Syntymäpaikka </th>
      <td>Tampere, FIN</td>
    </tr>
    <tr>
      <th>Ikä </th>
      <td>18</td>
    </tr>
    <tr>
      <th>Pituus </th>
      <td>175</td>
    </tr>
    <tr>
      <th>Paino </th>
      <td>80</td>
    </tr>
    <tr>
      <th>Maila </th>
      <td>R</td>

    </tr>
  </tbody></table>

      </div>
    </div>
    <div class="player-info-right-wrapper">
      <div class="player-news-wrapper">
        <div class="player-news">
          <div class="news-list-wrapper">
            

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
        <option value="fps">FPS</option>
        <option value="hermes">Hermes</option>
        <option value="hokki">Hokki</option>
        <option value="ilves">Ilves</option>
        <option value="ipk">IPK</option>
        <option value="jht">JHT</option>
        <option value="jokerit">Jokerit</option>
        <option value="jokp">JoKP</option>
        <option value="k-espoo">K-Espoo</option>
        <option value="kettera">Ketterä</option>
        <option value="keupa-ht">KeuPa HT</option>
        <option value="koovee">KOOVEE</option>
        <option value="k-vantaa">K-Vantaa</option>
        <option value="narvik-arctic-eagles-nor">Narvik Arctic Eagles, NOR</option>
        <option value="peliitat">Peliitat</option>
        <option value="raahek">RaaheK</option>
        <option value="roki">RoKi</option>
        <option value="sapko">SaPKo</option>
        <option value="sport">Sport</option>
        <option value="tuto-hockey" selected="">TUTO Hockey</option>
    </select>
  </div>

          </div>
          <div>
            <span class="label">Pelaaja: </span>
            
  <div class="select">
    <select name="player">
      <option value="">Valitse pelaaja</option>
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    <option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/24341444/hopponen-waltteri">Waltteri Hopponen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/27828414/ilomaki-valtteri">Valtteri Ilomäki</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/28777551/jantunen-jonne">Jonne Jantunen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/29462166/kallio-roope">Roope Kallio</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/33510428/kangasniemi-okko">Okko Kangasniemi</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/28861548/karlsson-jere">Jere Karlsson</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/29805082/karvonen-elias">Elias Karvonen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/22276391/laine-mikko">Mikko Laine</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/29477410/larinmaa-jesper">Jesper Larinmaa</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/29893133/lehti-timi">Timi Lehti</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/22357760/lehtonen-matias">Matias Lehtonen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/22394684/levo-mikke">Mikke Levo</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/28892986/makela-juho">Juho Mäkelä</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/28908935/niemi-valtteri">Valtteri Niemi</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/27839775/nieminen-ville">Ville Nieminen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/33502782/piiroinen-kari">Kari Piiroinen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/24220769/poikola-aleksi">Aleksi Poikola</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/30821864/puhakka-petteri">Petteri Puhakka</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/32579127/rannisto-jasper">Jasper Rannisto</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/29948541/reunanen-tarmo">Tarmo Reunanen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/32107502/raty-manu">Manu Räty</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/30616671/salmenoja-mikko">Mikko Salmenoja</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/29942725/salminen-saku">Saku Salminen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/31574013/simontaival-kasper" selected="">Kasper Simontaival</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/23485961/tuohilampi-kristian">Kristian Tuohilampi</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/30049772/urpolahti-waltteri">Waltteri Urpolahti</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/29584248/valtola-olli">Olli Valtola</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/29942233/vanhatalo-lassi">Lassi Vanhatalo</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/28269043/viitanen-mark">Mark Viitanen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/27777358/virtanen-juho">Juho Virtanen</option><option class="popt" data-team="tuto-hockey" value="/fi/pelaajat/29577200/virtanen-valtteri">Valtteri Virtanen</option></select>
  </div>

          </div>
      </form>
    </div>
 
    </div>
    <div class="menu middle-menu">

      <a class="active" href="/fi/pelaajat/31574013/simontaival-kasper">Tilastot</a>
      <a class="" href="/fi/pelaajat/31574013/simontaival-kasper/ottelu-ottelulta">Ottelu ottelulta</a>

    </div>

    
  <div class="stats" id="stats-section">
    
      <h2>Kausi 2020-2021</h2>
      
  
  <table>
  
  
    <thead class="header">
      <tr>
        <th colspan="42">Runkosarja</th>
      </tr>
    </thead>

    
      
        <thead>
          <tr>
            <th class="ta-l">Kausi</th>
            <th class="ta-l">Joukkue</th>
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
              <td class="ta-l">
              
                
                  2020-2021
                
              
            </td>
            <td class="ta-l">
              
                TUTO Hockey
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>5</td>
            <td>3</td>
            <td>4</td>
            <td>7</td>
            <td class="h-m">4</td>
            <td class="h-m">
              
                5
              
            </td>
            <td class="h-m">
              
                4
              
            </td>
            <td class="h-m"> 
              
                +1
              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">2</td>
            <td class="h-l">
              
                35
              
            </td>
            <td class="h-m">
              
                8,6
              
            </td>
            
            
              <td class="h-l">2</td>
              <td class="h-m">50,0</td>
            
            
              <td class="h-s">18:19</td>
            
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

    
      
        <thead>
          <tr>
            <th class="ta-l">Kausi</th>
            <th class="ta-l">Joukkue</th>
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
              <td class="ta-l">
              
                
                  2018-2019
                
              
            </td>
            <td class="ta-l">
              
                LeKi
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>21</td>
            <td>5</td>
            <td>9</td>
            <td>14</td>
            <td class="h-m">0</td>
            <td class="h-m">
              
                15
              
            </td>
            <td class="h-m">
              
                12
              
            </td>
            <td class="h-m"> 
              
                +3
              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">
              
                68
              
            </td>
            <td class="h-m">
              
                7,4
              
            </td>
            
            
            
          </tr>
          
            
          
        
            <tr class=" ">
              <td class="ta-l">
              
                
                  2019-2020
                
              
            </td>
            <td class="ta-l">
              
                KOOVEE
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>6</td>
            <td>1</td>
            <td>3</td>
            <td>4</td>
            <td class="h-m">6</td>
            <td class="h-m">
              
                4
              
            </td>
            <td class="h-m">
              
                6
              
            </td>
            <td class="h-m"> 
              
                -2
              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">
              
                19
              
            </td>
            <td class="h-m">
              
                5,3
              
            </td>
            
            
            
          </tr>
          
            
          
        
            <tr class=" ">
              <td class="ta-l">
              
                
                  2020-2021
                
              
            </td>
            <td class="ta-l">
              
                TUTO Hockey
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>5</td>
            <td>3</td>
            <td>4</td>
            <td>7</td>
            <td class="h-m">4</td>
            <td class="h-m">
              
                5
              
            </td>
            <td class="h-m">
              
                4
              
            </td>
            <td class="h-m"> 
              
                +1
              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">2</td>
            <td class="h-l">
              
                35
              
            </td>
            <td class="h-m">
              
                8,6
              
            </td>
            
            
            
          </tr>
          
            
          
        
            <tr class=" career">
              <td class="ta-l">
              
                
                  Yhteensä
                
              
            </td>
            <td class="ta-l">
              
            </td>
            <td>
              
                FIN
              
            </td>
            <td>32</td>
            <td>9</td>
            <td>16</td>
            <td>25</td>
            <td class="h-m">10</td>
            <td class="h-m">
               
                
                  24
                
              
            </td>
            <td class="h-m">
               
                
                  22
                
              
            </td>
            <td class="h-m"> 
              
                
                  +2
                

              
            </td>
            <td class="h-l">0</td>
            <td class="h-l">0</td>
            <td class="h-l">2</td>
            <td class="h-l">
              
                
                  122
                
              
            </td>
            <td class="h-m">
              
                
                  7,4
                
              
            </td>
            
            
            
          </tr>
          
            
          
        
      </tbody>
    
  
  </table>

    
  </div>

    <div class="terms">
      <p>
        Mestiksen tilastojen käyttöön liittyy rajoituksia. Tutustuthan <a href="/liiga/kayttoehdot">käyttöehtoihimme</a>.
      </p>
    </div>
  </div>

    </div>

    <div id="footer">
      <div class="wrapper clearfix">
        <div class="one_fourth">
          <div class="half">
            <div class="logo">
              <img src="/static/liiga/common/img/MestisBadge.v265bd509.png">
            </div>
          </div>
          <div class="half">
          </div>
          <div class="clearfix"></div>
        </div>

        <div class="one_fourth">
          <h3>Jääkiekkoliitto verkossa</h3>
          <ul>
            <li><a target="_blank" href="http://www.leijonat.fi/">Leijonat</a></li>
            <li><a target="_blank" href="http://www.tilastopalvelu.fi/ih">Tulospalvelu</a></li>
            <li><a target="_blank" href="http://www.finhockey.fi/">Finhockey</a></li>
            <li><a target="_blank" href="http://www.palvelusivusto.fi/">Palvelusivusto</a></li>
            <li><a target="_blank" href="http://store.leijonat.fi/">Leijonat Store</a></li>
          </ul>
        </div>

        <div class="one_fourth">
          <h3>Mestis TV:ssä</h3>
          <ul>
            <li><a target="_blank" href="https://www.ruutu.fi/ohjelmat/mestis">Ruutu</a></li>
          </ul>
        </div>

        <div class="one_fourth">
          <h3>Seuraa meitä</h3>
          <ul>
            <li><i class="fa fa-facebook"></i> <a target="_blank" href="https://www.facebook.com/MestisHockey">Facebook</a></li>
            <li><i class="fa fa-twitter"></i> <a target="_blank" href="https://twitter.com/mestis">Twitter</a></li>
            <li><i class="fa fa-instagram"></i> <a target="_blank" href="http://instagram.com/mestisfi">Instagram</a></li>
            <li><i class="fa fa-youtube"></i> <a target="_blank" href="https://www.youtube.com/channel/UCySVAyET4s0PF7GlSE4hzOA">Youtube</a></li>
          </ul>
        </div>
      </div>

      <div class="site-info">
        <div class="copy"> Copyright © Mestis 2019 Suomen Jääkiekkoliitto </div>
        <div class="separator">– </div>
        <div class="terms"><a href="/mestis/kayttoehdot">Käyttöehdot </a></div>
        <div class="separator">– </div>
        <div class="terms"><a href="http://www.finhockey.fi/index.php/info/tietosuoja">Tietosuoja </a></div>
        <div class="separator">– </div>
        <div class="terms"><a href="/mestis/evastekaytannot"> Evästekäytännöt  </a></div>
        <div class="separator">– </div>
        <div class="terms"> Sivuston toteutus:  <a href="https://nidos.fi" target="_blank"> Nidos Oy </a></div>
        


      </div>
    </div>

    <script src="/static/common.7dad78cd985c7694a19a.js"></script>
    
  <script src="/static/stats/player_base.1a1b268bc6711f6c2186.js"></script>


    <div class="body-scripts">
    </div>
  
</body>
`
