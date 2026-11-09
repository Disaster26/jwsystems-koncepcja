(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var app=$("#app");

/* ---------- pamięć (bezpiecznie) ---------- */
function czytaj(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function zapisz(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var stan={zalog:czytaj("jw_zalog",false),koszyk:czytaj("jw_koszyk",{}),widok:czytaj("jw_widok","kafle")};

/* ---------- dane ---------- */
var KAT=[
 {id:"kable",n:"Kable miedziane",o:"Skrętka kat. 5e, 6, 6A i 7, kable telefoniczne i koncentryczne",ik:"k-kable",
  pod:[["Skrętka kat. 5e","U/UTP, F/UTP"],["Skrętka kat. 6","U/UTP, F/UTP"],["Skrętka kat. 6A","U/FTP, S/FTP"],["Skrętka kat. 7 i 7A","S/FTP"],["Telefoniczne","kable i akcesoria"],["Koncentryczne","kable i złącza"]]},
 {id:"swiatlowody",n:"Światłowody",o:"Patchcordy jedno- i wielomodowe, kable AOC, puszki i mufy, moduły SFP",ik:"k-swiatlowody",
  pod:[["Patchcordy SM duplex","jednomodowe"],["Patchcordy MM","wielomodowe"],["Kable optyczne AOC","aktywne"],["Puszki i mufy","zakończenia"],["Moduły SFP","1G i 10G"],["Przełącznice","19 cali"]]},
 {id:"szafy",n:"Szafy rack i wyposażenie",o:"Szafy stojące i wiszące 19\" i 10\", półki, organizery, wentylacja",ik:"k-szafy",
  pod:[["Szafy stojące 19\"","od 15U do 47U"],["Szafy wiszące 19\"","od 4U do 22U"],["Szafy wiszące 10\"","6U, 9U, 12U"],["Półki i szuflady","wyposażenie"],["Organizery i zaślepki","porządek w szafie"],["Wentylatory i termostaty","chłodzenie"]]},
 {id:"osprzet",n:"Osprzęt i złącza",o:"Patch panele, patchcordy, keystone, gniazda, złącza modularne, LSA",ik:"k-osprzet",
  pod:[["Patch panele","ekranowane i nieekranowane"],["Patchcordy miedziane","kat. 5e, 6, 6A"],["Keystone","moduły i gniazda"],["Złącza modularne","RJ45, RJ11"],["Puszki połączeniowe","natynkowe"],["LSA","łączówki, gniazdniki"]]},
 {id:"narzedzia",n:"Narzędzia i pomiary",o:"Zaciskarki, narzędzia uderzeniowe, ściągacze izolacji, testery okablowania",ik:"k-narzedzia",
  pod:[["Zaciskarki","złącza modularne i koncentryczne"],["Narzędzia uderzeniowe","LSA, keystone"],["Ściągacze izolacji","i obcinarki"],["Zestawy narzędzi","dla instalatora"],["Testery okablowania","strukturalnego"],["Telefony monterskie","pomiary linii"]]},
 {id:"zasilanie",n:"Zasilanie i KVM",o:"Listwy PDU do szaf, zasilacze UPS, przełączniki KVM i ekstendery ATEN",ik:"k-zasilanie",
  pod:[["Listwy PDU 19\"","z pomiarem i bez"],["Zasilacze UPS","online"],["Przełączniki KVM","kablowe i rack"],["Ekstendery","HDMI, USB"],["Konwertery","video i USB"],["Akcesoria ATEN","kable KVM, szyny"]]}
];
var KOL={szary:"#A3ACB3",fiolet:"#6B4A97",czarny:"#2B3036",pomarancz:"#E07A25"};
var P=[
 {id:"sxkd-5e-ftp-pvc-305",kod:"SXKD-5E-FTP-PVC",n:"Kabel instalacyjny Solarix CAT5E F/UTP PVC Eca, box 305 m",kat:"5e",ekran:"F/UTP",pow:"PVC",ogien:"Eca",opak:"box 305 m",typ:"box",m:305,zast:"Wewnętrzny",kolor:"szary RAL 7035",kc:KOL.szary,sr:"6,2 mm",waga:"39,4 kg/km",pasmo:"100 MHz",drut:"drut miedziany 0,50 mm",prot:"2.5/5GBASE-T i niższe",ekrOp:"folia wokół wszystkich 4 par",cena:689,szt:14},
 {id:"sxkd-5e-utp-lsoh-305",kod:"SXKD-5E-UTP-LSOH",n:"Kabel instalacyjny Solarix CAT5E U/UTP LSOH Dca-s1,d2,a1, box 305 m",kat:"5e",ekran:"U/UTP",pow:"LSOH",ogien:"Dca-s1,d2,a1",opak:"box 305 m",typ:"box",m:305,zast:"Wewnętrzny",kolor:"fioletowy RAL 4005",kc:KOL.fiolet,sr:"5,0 mm",waga:"30,2 kg/km",pasmo:"testowany do 350 MHz",drut:"drut miedziany 0,50 mm",prot:"2.5/5GBASE-T i niższe",ekrOp:"brak (nieekranowany)",cena:612,szt:22},
 {id:"sxkd-5e-ftp-pe-100",kod:"SXKD-5E-FTP-PE",n:"Kabel instalacyjny Solarix CAT5E F/UTP PE Fca zewnętrzny, box 100 m",kat:"5e",ekran:"F/UTP",pow:"PE",ogien:"Fca",opak:"box 100 m",typ:"box",m:100,zast:"Zewnętrzny",kolor:"czarny RAL 9005",kc:KOL.czarny,sr:"6,2 mm",waga:"34,8 kg/km",pasmo:"100 MHz",drut:"drut miedziany 0,50 mm",prot:"2.5/5GBASE-T i niższe",ekrOp:"folia wokół wszystkich 4 par",cena:289,szt:9},
 {id:"sxkd-6-utp-pvc-500",kod:"SXKD-6-UTP-PVC",n:"Kabel instalacyjny Solarix CAT6 U/UTP PVC Eca, szpula 500 m",kat:"6",ekran:"U/UTP",pow:"PVC",ogien:"Eca",opak:"szpula 500 m",typ:"szpula",m:500,zast:"Wewnętrzny",kolor:"szary RAL 7035",kc:KOL.szary,sr:"6,1 mm",waga:"41,7 kg/km",pasmo:"250 MHz",drut:"drut miedziany 0,55 mm",prot:"2.5G/5GBASE-T i niższe",ekrOp:"brak (nieekranowany)",cena:1149,szt:6},
 {id:"sxkd-6-ftp-pvc-500",kod:"SXKD-6-FTP-PVC",n:"Kabel instalacyjny Solarix CAT6 F/UTP PVC Eca, szpula 500 m",kat:"6",ekran:"F/UTP",pow:"PVC",ogien:"Eca",opak:"szpula 500 m",typ:"szpula",m:500,zast:"Wewnętrzny",kolor:"szary RAL 7035",kc:KOL.szary,sr:"7,4 mm",waga:"54,2 kg/km",pasmo:"250 MHz",drut:"drut miedziany 0,565 mm",prot:"2.5G/5GBASE-T i niższe",ekrOp:"folia wokół wszystkich 4 par",cena:1389,szt:0},
 {id:"sxkd-6a-stp-lsoh-500",kod:"SXKD-6A-STP-LSOH",n:"Kabel instalacyjny Solarix CAT6A U/FTP LSOH Dca-s1,d2,a1, szpula 500 m",kat:"6A",ekran:"U/FTP",pow:"LSOH",ogien:"Dca-s1,d2,a1",opak:"szpula 500 m",typ:"szpula",m:500,zast:"Wewnętrzny",kolor:"szary RAL 7035",kc:KOL.szary,sr:"7,3 mm",waga:"51,5 kg/km",pasmo:"testowany do 650 MHz",drut:"drut miedziany 0,56 mm",prot:"10GBASE-T",ekrOp:"folia wokół każdej pary",cena:2090,szt:4}
];
var byId={};P.forEach(function(p){byId[p.id]=p});
var FILTRY=[
 {k:"kat",n:"Kategoria",f:function(p){return p.kat},etyk:function(v){return "kat. "+v}},
 {k:"ekran",n:"Ekranowanie",f:function(p){return p.ekran}},
 {k:"pow",n:"Powłoka",f:function(p){return p.pow}},
 {k:"opak",n:"Opakowanie / długość",f:function(p){return p.opak}},
 {k:"zast",n:"Zastosowanie",f:function(p){return p.zast}},
 {k:"ogien",n:"Reakcja na ogień (CPR)",f:function(p){return p.ogien}}
];
var KOLEJ={kat:["5e","6","6A"],ekran:["U/UTP","F/UTP","U/FTP"],pow:["PVC","LSOH","PE"],opak:["box 100 m","box 305 m","szpula 500 m"],zast:["Wewnętrzny","Zewnętrzny"],ogien:["Fca","Eca","Dca-s1,d2,a1"]};
var wybrane={};

/* ---------- pomocnicze ---------- */
function zl(n){var t=(Math.round(n*100)/100).toFixed(2).split(".");return t[0].replace(/\B(?=(\d{3})+(?!\d))/g," ")+","+t[1]+" zł"}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ikona(id,c){return '<svg'+(c?' class="'+c+'"':'')+' aria-hidden="true"><use href="#'+id+'"/></svg>'}
function toast(t){var el=$("#toast");el.textContent=t;el.classList.add("wid");clearTimeout(toast._t);toast._t=setTimeout(function(){el.classList.remove("wid")},2600)}
function przewod(){return '<div class="przewod" aria-hidden="true"><i></i><b></b></div>'}
function ileKosz(){var s=0;for(var k in stan.koszyk)s+=stan.koszyk[k];return s}

/* ---------- grafiki produktów (neutralne ilustracje, nie zdjęcia) ---------- */
var uid=0;
function artBox(p){
  var c=p.kc,id="b"+(++uid);
  return '<svg viewBox="0 0 400 300" role="img" aria-label="Ilustracja: '+esc(p.opak)+'">'+
  '<defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#E9EEF2"/></linearGradient></defs>'+
  '<ellipse cx="200" cy="262" rx="150" ry="14" fill="#10293D" opacity=".08"/>'+
  '<polygon points="96,92 236,70 316,96 176,120" fill="#F3F6F9" stroke="#C3CDD5" stroke-width="1.5"/>'+
  '<polygon points="96,92 176,120 176,256 96,228" fill="url(#'+id+')" stroke="#C3CDD5" stroke-width="1.5"/>'+
  '<polygon points="176,120 316,96 316,226 176,256" fill="#FFFFFF" stroke="#C3CDD5" stroke-width="1.5"/>'+
  '<polygon points="176,150 316,126 316,150 176,174" fill="#10293D"/>'+
  '<text x="190" y="167" fill="#fff" font-family="Archivo,Arial,sans-serif" font-weight="700" font-size="15" transform="skewY(-9.7) translate(0,32)">CAT '+esc(p.kat.toUpperCase())+'  '+esc(p.ekran)+'</text>'+
  '<text x="192" y="214" fill="#10293D" font-family="Archivo,Arial,sans-serif" font-weight="700" font-size="30" transform="skewY(-9.7) translate(0,34)">'+p.m+' m</text>'+
  '<text x="193" y="236" fill="#55636E" font-family="Inter,Arial,sans-serif" font-size="12" transform="skewY(-9.7) translate(0,35)">'+esc(p.pow)+' · '+esc(p.zast.toLowerCase())+'</text>'+
  '<ellipse cx="136" cy="176" rx="11" ry="15" fill="#2B3036" opacity=".85"/>'+
  '<path d="M136 176 C 108 190, 70 200, 60 236 S 40 268, 22 270" fill="none" stroke="'+c+'" stroke-width="12" stroke-linecap="round"/>'+
  '<path d="M136 176 C 108 190, 70 200, 60 236 S 40 268, 22 270" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="3" stroke-linecap="round" transform="translate(-2,-3)"/>'+
  '</svg>';
}
function artSzpula(p){
  var c=p.kc,lin="";
  for(var r=58;r<=96;r+=7){lin+='<circle cx="200" cy="146" r="'+r+'" fill="none" stroke="#000" stroke-opacity=".10" stroke-width="1.2"/>'}
  return '<svg viewBox="0 0 400 300" role="img" aria-label="Ilustracja: '+esc(p.opak)+'">'+
  '<ellipse cx="200" cy="268" rx="130" ry="12" fill="#10293D" opacity=".08"/>'+
  '<circle cx="214" cy="140" r="118" fill="#25313B"/>'+
  '<circle cx="200" cy="146" r="118" fill="#34424E"/>'+
  '<circle cx="200" cy="146" r="104" fill="#3D4C59"/>'+
  '<circle cx="200" cy="146" r="100" fill="'+c+'"/>'+lin+
  '<circle cx="200" cy="146" r="50" fill="#2B3741"/>'+
  '<circle cx="200" cy="146" r="22" fill="#EEF2F5"/>'+
  '<circle cx="200" cy="146" r="22" fill="none" stroke="#1C262E" stroke-width="3"/>'+
  '<rect x="150" y="196" width="100" height="34" rx="4" fill="#fff"/>'+
  '<text x="200" y="213" text-anchor="middle" fill="#10293D" font-family="Archivo,Arial,sans-serif" font-weight="700" font-size="13">CAT '+esc(p.kat.toUpperCase())+' '+esc(p.ekran)+'</text>'+
  '<text x="200" y="226" text-anchor="middle" fill="#55636E" font-family="Inter,Arial,sans-serif" font-size="10">'+p.m+' m · '+esc(p.pow)+'</text>'+
  '<path d="M292 112 C 330 120, 346 170, 352 214 S 372 262, 386 266" fill="none" stroke="'+c+'" stroke-width="11" stroke-linecap="round"/>'+
  '</svg>';
}
function artPrzekroj(p){
  var pary=[["#E07A25","#fff"],["#2E8B57","#fff"],["#1F6FB5","#fff"],["#7A4B2A","#fff"]];
  var pos=[[170,120],[230,120],[170,180],[230,180]];
  var s='<svg viewBox="0 0 400 300" role="img" aria-label="Przekrój kabla '+esc(p.ekran)+'">';
  s+='<circle cx="200" cy="150" r="112" fill="'+p.kc+'"/><circle cx="200" cy="150" r="100" fill="#F4F7F9"/>';
  if(p.ekran==="F/UTP")s+='<circle cx="200" cy="150" r="96" fill="none" stroke="#B8C2CA" stroke-width="6"/>';
  s+='<path d="M200 70 L200 230 M120 150 L280 150" stroke="#D3DBE1" stroke-width="5" opacity="'+(p.kat==="5e"?0:1)+'"/>';
  pos.forEach(function(q,i){
    if(p.ekran==="U/FTP")s+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="31" fill="none" stroke="#B8C2CA" stroke-width="5"/>';
    s+='<circle cx="'+(q[0]-12)+'" cy="'+(q[1]-6)+'" r="14" fill="'+pary[i][0]+'"/><circle cx="'+(q[0]-12)+'" cy="'+(q[1]-6)+'" r="5.5" fill="#C98B4A"/>';
    s+='<circle cx="'+(q[0]+12)+'" cy="'+(q[1]+6)+'" r="14" fill="#fff" stroke="'+pary[i][0]+'" stroke-width="4"/><circle cx="'+(q[0]+12)+'" cy="'+(q[1]+6)+'" r="5.5" fill="#C98B4A"/>';
  });
  s+='<text x="200" y="290" text-anchor="middle" fill="#55636E" font-family="Inter,Arial,sans-serif" font-size="13">Przekrój: '+esc(p.ekran)+(p.ekran==="U/UTP"?", bez ekranu":p.ekran==="F/UTP"?", folia na 4 parach":", folia na każdej parze")+'</text></svg>';
  return s;
}
function artEtykieta(p){
  var w=[["Kategoria","CAT "+p.kat.toUpperCase()],["Konstrukcja",p.ekran],["Powłoka",p.pow+", "+p.ogien],["Długość",p.opak]];
  var s='<svg viewBox="0 0 400 300" role="img" aria-label="Etykieta parametrów"><rect x="70" y="40" width="260" height="220" rx="12" fill="#fff" stroke="#C3CDD5" stroke-width="1.5"/><rect x="70" y="40" width="260" height="44" rx="12" fill="#10293D"/><rect x="70" y="70" width="260" height="14" fill="#10293D"/>';
  s+='<text x="90" y="68" fill="#fff" font-family="Archivo,Arial,sans-serif" font-weight="700" font-size="16">'+esc(p.kod)+'</text>';
  w.forEach(function(r,i){var y=116+i*36;s+='<text x="90" y="'+y+'" fill="#55636E" font-family="Inter,Arial,sans-serif" font-size="12">'+r[0]+'</text><text x="310" y="'+y+'" text-anchor="end" fill="#10293D" font-family="Archivo,Arial,sans-serif" font-weight="700" font-size="14">'+esc(r[1])+'</text><line x1="90" x2="310" y1="'+(y+12)+'" y2="'+(y+12)+'" stroke="#E3E9ED"/>'});
  return s+'</svg>';
}
function art(p){return p.typ==="box"?artBox(p):artSzpula(p)}

/* ---------- kawałki UI ---------- */
function cechy(p){return '<div class="cechy"><span>kat. '+p.kat+'</span><span>'+p.ekran+'</span><span>'+p.pow+'</span><span>'+p.opak+'</span></div>'}
function stanTxt(p){return p.szt>0?'<span class="stan">W magazynie</span>':'<span class="stan zam">Na zamówienie</span>'}
function kafelProd(p){
  var cena=stan.zalog
    ? '<div class="cena"><div><b>'+zl(p.cena)+'</b><small>netto / '+p.opak+' (przykład)</small></div><button type="button" class="do-koszyka" data-dodaj="'+p.id+'" aria-label="Dodaj do koszyka: '+esc(p.n)+'">'+ikona("i-koszyk")+'</button></div>'
    : '<div class="cena-zaloguj"><span>'+ikona("i-klodka")+'Cena po zalogowaniu</span><a class="link" href="#/konto">Zaloguj</a></div>';
  return '<article class="pk"><a class="pk-obraz" href="#/produkt/'+p.id+'" tabindex="-1" aria-hidden="true">'+art(p)+'<span class="pk-flaga">przykładowa pozycja</span></a>'+
   '<div class="pk-tresc"><span class="pk-kod">'+p.kod+'</span><a class="pk-nazwa" href="#/produkt/'+p.id+'">'+esc(p.n)+'</a>'+cechy(p)+
   '<div class="pk-dol">'+stanTxt(p)+cena+'</div></div></article>';
}
function karuzela(html,id){
  return '<div class="karuzela-w"><div class="karuzela" id="'+id+'" tabindex="0" aria-label="Przewijana lista produktów">'+html+'</div></div>';
}
function strzalki(id){return '<div class="kar-strz"><button type="button" data-kar="'+id+'" data-kier="-1" aria-label="Poprzednie">'+ikona("i-lewo")+'</button><button type="button" data-kar="'+id+'" data-kier="1" aria-label="Następne">'+ikona("i-prawo")+'</button></div>'}

function schemat(){
  return '<div class="schemat"><div class="sch-rzad">'+
   '<div class="sch-wezel l"><b>Comarch ERP Optima</b><small>Handel Plus: towary, cenniki, magazyn</small><span class="kropka"></span></div>'+
   '<div class="sch-kable">'+
    '<div class="sch-kabel"><p class="sch-opis">Optima do sklepu <span>co kilka minut</span></p><div class="linia"><i class="pakiet"></i><i class="pakiet"></i></div><div class="tagi"><span>towary i kody</span><span>ceny z cenników</span><span>stany magazynowe</span><span>statusy zamówień</span><span>faktury PDF</span></div></div>'+
    '<div class="sch-kabel wstecz"><div class="tagi"><span>zamówienia jako ZS</span><span>nowi kontrahenci z NIP</span><span>adres dostawy</span><span>nr zamówienia klienta</span></div><div class="linia"><i class="pakiet"></i><i class="pakiet"></i></div><p class="sch-opis">Sklep do Optimy <span>od razu po złożeniu</span></p></div>'+
   '</div>'+
   '<div class="sch-wezel p"><b>Sklep B2B</b><small>jwsystems.pl, konta firmowe</small><span class="kropka"></span></div>'+
  '</div></div>';
}

/* ---------- widoki ---------- */
function vDom(){
  var hp=byId["sxkd-6a-stp-lsoh-500"];
  var katKaf=KAT.map(function(k){return '<a class="kat-kafel" href="#/kategoria/'+k.id+'">'+ikona(k.ik)+'<h3>'+k.n+'</h3><p>'+k.o+'</p></a>'}).join("");
  var katMini=KAT.map(function(k){return '<a href="#/kategoria/'+k.id+'">'+ikona(k.ik)+k.n.replace(" i wyposażenie","").replace(" i pomiary","").replace(" i złącza","")+'</a>'}).join("");
  return ''+
  '<section class="hero"><div class="w hero-w">'+
   '<div class="hero-tekst">'+
    '<h1>Okablowanie i szafy rack dla firm</h1>'+
    '<p class="lead">Hurtownia teletechniczna JW SYSTEMS. Ceny netto i stany z magazynu widać po zalogowaniu, a zamówienie na fakturę trafia od razu do naszego systemu.</p>'+
    '<form class="szukaj" role="search" data-szukaj>'+ikona("i-szukaj")+'<input type="search" name="q" placeholder="Np. skrętka kat. 6 U/UTP" aria-label="Szukaj w katalogu"><button type="submit">Szukaj</button></form>'+
    '<div class="hero-cta">'+(stan.zalog?'<a class="btn btn-g" href="#/kategoria/kable"><span class="wezel"></span>Przejdź do katalogu</a><a class="btn btn-o" href="#/konto">Moje zamówienia</a>':'<a class="btn btn-g" href="#/konto"><span class="wezel"></span>Załóż konto firmowe</a><a class="btn btn-o" href="#/kategoria/kable">Katalog</a>')+'</div>'+
    '<div class="hero-fakty"><span>'+ikona("i-ok")+'Sprzedaż tylko dla firm z NIP</span><span>'+ikona("i-ok")+'Zamówienia na fakturę</span><span>'+ikona("i-ok")+'Stany z Comarch ERP Optima</span></div>'+
   '</div>'+
   '<div class="hero-art" aria-hidden="true">'+heroArt()+
    '<div class="hero-karta"><div class="hk-gora"><span>'+hp.kod+'</span><span class="st">Dostępny</span></div><div class="hk-nazwa">Kabel CAT6A U/FTP LSOH, 500 m</div>'+
    (stan.zalog?'<div class="hk-cena" style="color:var(--navy)"><b style="font-family:var(--font-h);font-size:18px">'+zl(hp.cena)+'</b> netto (przykład)</div>':'<div class="hk-cena">'+ikona("i-klodka")+'Cena po zalogowaniu firmy</div>')+'</div>'+
   '</div>'+
   '<nav class="hero-kat" aria-label="Kategorie">'+katMini+'</nav>'+
  '</div></section>'+

  '<section class="sek"><div class="w">'+przewod()+'<div class="sek-gl"><div><h2>Katalog</h2><p>Sześć działów, w których zamówisz całą instalację: od skrętki i światłowodu, przez osprzęt i szafę, po narzędzia i zasilanie.</p></div></div><div class="kat-siatka">'+katKaf+'</div></div></section>'+

  '<section class="sek sek-szara"><div class="w">'+przewod()+'<div class="sek-gl"><div><h2>Jak kupują u nas firmy</h2><p>Sklep działa jak hurtownia: najpierw konto firmy, potem ceny i zamówienia na fakturę.</p></div></div>'+
   '<div class="kroki"><div class="krok"><h3>Rejestracja z NIP</h3><p>Wpisujesz NIP, dane firmy uzupełniają się same. Zakładasz konto dla siebie i kolegów z firmy.</p></div><div class="krok"><h3>Akceptacja i warunki</h3><p>Zatwierdzamy konto i przypisujemy Twoją firmę do cennika oraz terminu płatności z Optimy.</p></div><div class="krok"><h3>Ceny netto i zamówienia</h3><p>Widzisz swoje ceny i stany, zamawiasz w opakowaniach (box, szpula), płacisz przelewem na fakturę.</p></div></div>'+
  '</div></section>'+

  '<section class="sek"><div class="w">'+przewod()+'<div class="sek-gl"><div><h2>Skrętka instalacyjna</h2><p>Przykładowe pozycje do testu sklepu. Docelowo kody, ceny i stany przyjdą z Optimy, a opisy i karty katalogowe z danych producentów.</p></div>'+strzalki("karDom")+'</div>'+
   karuzela(P.map(kafelProd).join(""),"karDom")+
  '</div></section>'+

  '<section class="sek sek-tint"><div class="w">'+przewod()+'<div class="sek-gl"><div><h2>Zamówienia trafiają prosto do Comarch ERP Optima</h2><p>Nikt nie przepisuje zamówień. Sklep i Optima wymieniają dane w obie strony, więc ceny, stany i faktury są zawsze te same co w biurze.</p></div><a class="link" href="#/integracja">Jak działa integracja'+ikona("i-strz")+'</a></div>'+schemat()+'</div></section>'+

  '<section class="sek"><div class="w kontakt-pas"><div>'+przewod()+'<h2>Większy projekt albo nietypowa pozycja?</h2><p>Wycenimy instalację z całą listą materiałów, także pozycje spoza katalogu.</p></div><div class="kp-akcje"><a class="btn btn-g" href="tel:+48693024107">'+ikona("i-tel")+'693 024 107</a><a class="btn btn-o" href="mailto:jarek@jwsystems.pl">'+ikona("i-mail")+'jarek@jwsystems.pl</a></div></div></section>';
}
function heroArt(){
  /* przewody w kolorach logo zbiegają się w węzeł, jak kropka i wstęga W */
  var k=[["#0E8CC2",14,60],["#0B6BA2",14,130],["#074880",14,200],["#10293D",14,270],["#A3ACB3",10,340]];
  var s='<svg class="przew" viewBox="0 0 560 480"><defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E8CC2"/><stop offset="1" stop-color="#074880"/></linearGradient></defs>';
  s+='<rect x="300" y="40" width="200" height="300" rx="14" fill="#fff" stroke="#DCE3E8"/>';
  for(var i=0;i<9;i++){s+='<rect x="320" y="'+(62+i*28)+'" width="160" height="18" rx="3" fill="'+(i===3||i===4?"#EAF3F9":"#F4F7F9")+'" stroke="#DCE3E8"/>';if(i===3||i===4){for(var j=0;j<10;j++)s+='<rect x="'+(328+j*15)+'" y="'+(66+i*28)+'" width="9" height="10" rx="1.5" fill="#10293D" opacity=".8"/>'}}
  k.forEach(function(c,i){var y=c[2];s+='<path d="M-10 '+(y+60)+' C 120 '+(y+60)+', 170 '+(150+i*14)+', 330 '+(152+i*10)+'" fill="none" stroke="'+c[0]+'" stroke-width="'+c[1]+'" stroke-linecap="round"/>'});
  s+='<circle cx="334" cy="176" r="15" fill="#10293D"/><circle cx="334" cy="176" r="6" fill="#0E8CC2"/>';
  return s+'</svg>';
}

function vKategoria(id,q){
  var k=KAT.filter(function(x){return x.id===id})[0];
  if(!k)return vBrak();
  var ok='<nav class="okruszki" aria-label="Okruszki"><a href="#/">Sklep</a><i class="sep"></i><span>'+k.n+'</span></nav>';
  if(id!=="kable"){
    return '<div class="w">'+ok+'<div class="list-gl"><div><h1>'+k.n+'</h1><p>'+k.o+'.</p></div></div>'+
     '<div class="kat-zaw">'+k.pod.map(function(p){return '<div>'+p[0]+'<small>'+p[1]+'</small></div>'}).join("")+'</div>'+
     '<div class="info-import">'+ikona(k.ik)+'<div><p><b>Ten dział wypełni import.</b> Kody, ceny i stany przyjdą z Comarch ERP Optima, a opisy, parametry i karty katalogowe z danych producentów. W podglądzie pełny listing z filtrami pokazujemy na kablach miedzianych.</p><p style="margin-top:10px"><a class="link" href="#/kategoria/kable">Zobacz listing kabli miedzianych'+ikona("i-strz")+'</a></p></div></div></div>';
  }
  return '<div class="w">'+ok+
   '<div class="list-gl"><div><h1>'+(q?'Wyniki: „'+esc(q)+'”':'Skrętka instalacyjna')+'</h1><p>Kable instalacyjne z litego drutu do sieci LAN. Filtruj po kategorii, ekranowaniu, powłoce i opakowaniu.</p></div></div>'+
   '<div class="podkat"><a href="#/kategoria/kable" data-szybki="">Wszystkie</a><a href="#/kategoria/kable" data-szybki="5e">Kat. 5e</a><a href="#/kategoria/kable" data-szybki="6">Kat. 6</a><a href="#/kategoria/kable" data-szybki="6A">Kat. 6A</a><a href="#/kategoria/kable" data-demo="Kat. 7 i 7A dojdą z importem.">Kat. 7 i 7A</a><a href="#/kategoria/kable" data-demo="Kable telefoniczne dojdą z importem.">Telefoniczne</a><a href="#/kategoria/kable" data-demo="Kable koncentryczne dojdą z importem.">Koncentryczne</a></div>'+
   '<div class="listing"><aside class="filtry" id="filtry" aria-label="Filtry"><div class="filtry-gl"><b>Filtry</b><button type="button" class="nag-ikona" data-zamknij-f aria-label="Zamknij filtry">'+ikona("i-x")+'</button></div><div id="fGrupy"></div><button type="button" class="f-czysc" id="fCzysc">Wyczyść filtry</button><div class="filtry-dol"><button type="button" class="btn btn-g btn-pelny" data-zamknij-f id="fPokaz">Pokaż produkty</button></div></aside>'+
   '<div><div class="pasek-list"><button type="button" class="btn btn-o btn-filtry" id="btnFiltry">'+ikona("i-filtr")+'Filtry</button><span class="ile" id="ile"></span><div class="pl-prawo"><label class="sr" for="sort">Sortowanie</label><select id="sort"><option value="dom">Domyślnie</option><option value="cr">Cena rosnąco</option><option value="cm">Cena malejąco</option><option value="n">Nazwa A-Z</option></select><div class="widok"><button type="button" data-widok="kafle" aria-label="Widok kafli">'+ikona("i-kafle")+'</button><button type="button" data-widok="lista" aria-label="Widok listy">'+ikona("i-lista")+'</button></div></div></div>'+
   '<div class="aktywne" id="aktywne"></div><div class="siatka" id="siatka"></div></div></div></div>';
}
function filtruj(q){
  return P.filter(function(p){
    if(q){var t=(p.n+" "+p.kod).toLowerCase();if(q.toLowerCase().split(/\s+/).some(function(w){return w&&t.indexOf(w.replace("kat.","").replace("kat",""))<0&&t.indexOf(w)<0}))return false}
    return FILTRY.every(function(f){var w=wybrane[f.k];return !w||!w.length||w.indexOf(f.f(p))>=0});
  });
}
function rysujListing(q){
  var grupy=$("#fGrupy");if(!grupy)return;
  grupy.innerHTML=FILTRY.map(function(f){
    return '<div class="f-grupa"><p>'+f.n+'</p>'+KOLEJ[f.k].map(function(v){
      var zap=Object.assign({},wybrane);zap[f.k]=[v];
      var stary=wybrane;wybrane=zap;var n=filtruj(q).length;wybrane=stary;
      var ch=(wybrane[f.k]||[]).indexOf(v)>=0;
      return '<label class="f-opcja'+(n===0&&!ch?' zero':'')+'"><input type="checkbox" data-f="'+f.k+'" value="'+esc(v)+'"'+(ch?' checked':'')+'>'+(f.etyk?f.etyk(v):v)+'<em>'+n+'</em></label>';
    }).join("")+'</div>';
  }).join("");
  var lista=filtruj(q),s=$("#sort").value;
  if(s==="cr")lista.sort(function(a,b){return a.cena-b.cena});
  if(s==="cm")lista.sort(function(a,b){return b.cena-a.cena});
  if(s==="n")lista.sort(function(a,b){return a.n.localeCompare(b.n,"pl")});
  var sg=$("#siatka");sg.className="siatka"+(stan.widok==="lista"?" lista":"");
  sg.innerHTML=lista.length?lista.map(kafelProd).join(""):'<div class="pusto">Brak pozycji dla wybranych filtrów. <button type="button" class="f-czysc" data-czysc>Wyczyść filtry</button></div>';
  $("#ile").textContent=lista.length+" "+(lista.length===1?"pozycja":lista.length<5&&lista.length>0?"pozycje":"pozycji");
  var akt=[];FILTRY.forEach(function(f){(wybrane[f.k]||[]).forEach(function(v){akt.push('<button type="button" data-usun-f="'+f.k+'" data-v="'+esc(v)+'">'+(f.etyk?f.etyk(v):v)+ikona("i-x")+'</button>')})});
  $("#aktywne").innerHTML=akt.join("");
  var nf=akt.length;$("#btnFiltry").innerHTML=ikona("i-filtr")+"Filtry"+(nf?" ("+nf+")":"");
  $("#fPokaz").textContent="Pokaż "+lista.length+" "+(lista.length===1?"pozycję":lista.length<5&&lista.length>0?"pozycje":"pozycji");
  $$(".widok button").forEach(function(b){b.classList.toggle("akt",b.dataset.widok===stan.widok)});
  var kk=(wybrane.kat||[]);$$(".podkat a[data-szybki]").forEach(function(a){var v=a.dataset.szybki;a.classList.toggle("akt",v===""?!kk.length:(kk.length===1&&kk[0]===v))});
}

function vProdukt(id){
  var p=byId[id];if(!p)return vBrak();
  var widoki=[["Opakowanie",art(p)],["Przekrój kabla",artPrzekroj(p)],["Parametry",artEtykieta(p)]];
  var par=[["Kod producenta",p.kod],["Kategoria","CAT"+p.kat.toUpperCase()],["Konstrukcja",p.ekran],["Ekranowanie",p.ekrOp],["Szerokość pasma",p.pasmo],["Wspierane protokoły",p.prot],["Przewód",p.drut],["Powłoka",p.pow],["Reakcja na ogień (CPR)",p.ogien],["Zastosowanie",p.zast],["Kolor",p.kolor],["Średnica kabla",p.sr],["Waga",p.waga],["Opakowanie (JM)",p.opak],["Gwarancja producenta","5 lat"]];
  var zakup=stan.zalog
   ? '<div class="pz-cena"><b>'+zl(p.cena)+'</b><span class="przyklad">cena przykładowa</span><small>netto za '+p.opak+' · '+zl(p.cena*1.23)+' brutto · '+zl(p.cena/p.m)+' netto za metr</small></div>'+
     '<div class="pz-rzad"><div class="ilosc"><button type="button" data-il="-1" aria-label="Mniej">−</button><input id="il" type="number" min="1" value="1" aria-label="Ilość opakowań"><button type="button" data-il="1" aria-label="Więcej">+</button></div><button type="button" class="btn btn-g" data-dodaj="'+p.id+'" data-z-il><span class="wezel"></span>Dodaj do koszyka</button></div>'+
     '<p class="pz-przel" id="przel">1 × '+p.opak+' = <b>'+p.m+' m</b></p>'
   : '<div class="pz-gosc"><p>'+ikona("i-klodka")+'<span><b>Cena po zalogowaniu.</b> Sprzedajemy wyłącznie firmom. Po zalogowaniu zobaczysz cenę netto ze swojego cennika i stan magazynu.</span></p><div class="btny"><a class="btn btn-g" href="#/konto"><span class="wezel"></span>Zaloguj się</a><a class="btn btn-o" href="#/konto">Załóż konto firmowe</a></div></div>';
  var rel=P.filter(function(x){return x.id!==p.id&&(x.kat===p.kat||x.ekran===p.ekran)}).slice(0,4);
  return '<div class="w"><nav class="okruszki" aria-label="Okruszki"><a href="#/">Sklep</a><i class="sep"></i><a href="#/kategoria/kable">Kable miedziane</a><i class="sep"></i><a href="#/kategoria/kable" data-szybki="'+p.kat+'">Skrętka kat. '+p.kat+'</a><i class="sep"></i><span>'+p.kod+'</span></nav>'+
  '<div class="produkt"><div class="galeria"><div class="gal-tor" id="galTor" tabindex="0" aria-label="Galeria">'+widoki.map(function(w){return '<div>'+w[1]+'<figcaption>'+w[0]+' · ilustracja</figcaption></div>'}).join("")+'</div>'+
   '<div class="gal-min">'+widoki.map(function(w,i){return '<button type="button" data-gal="'+i+'" class="'+(i===0?"akt":"")+'" aria-label="'+w[0]+'">'+w[1]+'</button>'}).join("")+'</div><div class="gal-kropki">'+widoki.map(function(w,i){return '<i class="'+(i===0?"akt":"")+'"></i>'}).join("")+'</div></div>'+
   '<div class="p-info"><h1>'+esc(p.n)+'</h1><div class="p-meta"><span>Kod: <code>'+p.kod+'</code></span><span>JM: '+p.opak+'</span><span>Producent: Solarix</span></div>'+cechy(p)+
   '<div class="p-zakup">'+stanTxt(p)+zakup+'<div class="pz-info"><span>'+ikona("i-ok")+'Faktura VAT z Optimy</span><span>'+ikona("i-ok")+'Przelew z terminem dla firm</span><span>'+ikona("i-ok")+'Stan aktualizowany z magazynu</span><span>'+ikona("i-ok")+'Wycena większych ilości</span></div></div>'+
   '<div class="pliki"><a class="plik" href="#/produkt/'+p.id+'" data-demo="W sklepie: karta katalogowa PDF z danych producenta.">'+ikona("i-pdf")+'<span><b>Karta katalogowa (PDF)</b><small>'+p.kod+', wersja PL</small></span></a><a class="plik" href="#/produkt/'+p.id+'" data-demo="W sklepie: deklaracja właściwości użytkowych PDF.">'+ikona("i-pdf")+'<span><b>Deklaracja właściwości użytkowych DoP (PDF)</b><small>CPR, klasa '+p.ogien+'</small></span></a></div>'+
   '</div></div>'+
  '<div class="p-sekcje"><div class="p-par"><h2>Parametry techniczne</h2><table class="tabela-par"><tbody>'+par.map(function(r){return '<tr><th scope="row">'+r[0]+'</th><td>'+esc(r[1])+'</td></tr>'}).join("")+'</tbody></table></div>'+
   '<div class="p-opis"><h2>Opis</h2><ul><li>Kabel instalacyjny kategorii '+p.kat.toUpperCase()+' do okablowania strukturalnego, protokoły '+p.prot+'.</li><li>Konstrukcja '+p.ekran+': '+p.ekrOp+'.</li><li>Żyły z litego drutu miedzianego ('+p.drut.replace("drut miedziany ","")+'), do zarabiania w gniazdach i patch panelach.</li><li>Powłoka '+p.pow+', klasa reakcji na ogień '+p.ogien+' według CPR.</li><li>'+(p.zast==="Zewnętrzny"?"Do prowadzenia na zewnątrz budynku.":"Do instalacji wewnątrz budynku.")+' Kolor: '+p.kolor+'.</li></ul>'+
   '<p class="zrodlo">Przykładowa pozycja do testu sklepu. Nazwa i parametry pochodzą z katalogu dystrybutora (intelek.pl), ilustracje są neutralne, cena i stan są przykładowe. Docelowo cena i stan przyjdą z Comarch ERP Optima.</p></div></div>'+
  (rel.length?'<section style="padding-bottom:64px">'+przewod()+'<div class="sek-gl"><h2>Podobne pozycje</h2>'+strzalki("karRel")+'</div>'+karuzela(rel.map(kafelProd).join(""),"karRel")+'</section>':'')+
  '</div>';
}

function vKoszyk(){
  var ids=Object.keys(stan.koszyk).filter(function(k){return byId[k]&&stan.koszyk[k]>0});
  var ok='<nav class="okruszki" aria-label="Okruszki"><a href="#/">Sklep</a><i class="sep"></i><span>Koszyk</span></nav>';
  if(!stan.zalog){
    return '<div class="w">'+ok+'<div class="list-gl"><div><h1>Koszyk</h1></div></div><div class="konto-g"><div class="panel-k"><h2>Zamówienia składają zalogowane firmy</h2><p>Zaloguj się albo załóż konto firmowe z NIP. Po akceptacji zobaczysz swoje ceny netto i złożysz zamówienie na fakturę.</p><div class="hero-cta" style="margin-top:4px"><a class="btn btn-g" href="#/konto"><span class="wezel"></span>Zaloguj się</a><a class="btn btn-o" href="#/kategoria/kable">Przeglądaj katalog</a></div></div></div></div>';
  }
  if(!ids.length){
    return '<div class="w">'+ok+'<div class="list-gl"><div><h1>Koszyk</h1></div></div><div class="pusto" style="margin-bottom:72px">Koszyk jest pusty. <a class="link" href="#/kategoria/kable">Przejdź do katalogu'+ikona("i-strz")+'</a></div></div>';
  }
  var netto=0;
  var poz=ids.map(function(id){var p=byId[id],il=stan.koszyk[id],w=p.cena*il;netto+=w;
    return '<div class="k-poz"><a class="min" href="#/produkt/'+id+'" tabindex="-1" aria-hidden="true">'+art(p)+'</a><div><a class="nz" href="#/produkt/'+id+'">'+esc(p.n)+'</a><p class="kd">'+p.kod+' · '+zl(p.cena)+' netto / '+p.opak+' · razem '+(p.m*il)+' m</p></div>'+
    '<div class="pr"><div class="ilosc"><button type="button" data-kil="'+id+'" data-d="-1" aria-label="Mniej">−</button><input type="number" min="1" value="'+il+'" data-kin="'+id+'" aria-label="Ilość"><button type="button" data-kil="'+id+'" data-d="1" aria-label="Więcej">+</button></div><b>'+zl(w)+'</b><button type="button" class="usun" data-usun="'+id+'">Usuń</button></div></div>'}).join("");
  return '<div class="w">'+ok+'<div class="list-gl"><div><h1>Koszyk i zamówienie</h1><p>Ceny netto z Twojego cennika (w podglądzie przykładowe). Zamówienie trafi do Comarch ERP Optima jako zamówienie od klienta.</p></div></div>'+
  '<div class="koszyk"><div><div class="k-lista">'+poz+'</div>'+
   '<div class="panel-k" style="margin-top:16px"><h2>Dostawa i dokument</h2>'+
    '<div class="radio-k"><label><input type="radio" name="dost" checked><span>Kurier na adres firmy<small>Przykładowa Firma Instalacyjna, adres z konta</small></span></label><label><input type="radio" name="dost"><span>Inny adres dostawy<small>np. adres budowy, kontakt do odbierającego</small></span></label><label><input type="radio" name="dost"><span>Odbiór osobisty<small>po potwierdzeniu gotowości przez JW SYSTEMS</small></span></label></div>'+
    '<div class="dwa"><div class="pole"><label for="po">Nr zamówienia klienta</label><input id="po" placeholder="np. ZAM/2026/118"><small>Pojawi się na fakturze</small></div><div class="pole"><label for="dok">Dokument</label><select id="dok"><option>Faktura VAT</option><option>Faktura VAT z odroczonym terminem</option></select></div></div>'+
    '<div class="pole"><label for="uw">Uwagi do zamówienia</label><textarea id="uw" placeholder="Np. dostawa po 10:00, kable z jednej partii"></textarea></div>'+
   '</div></div>'+
   '<aside class="k-podsum"><h2>Podsumowanie</h2><div class="k-wiersz"><span>Wartość netto</span><b>'+zl(netto)+'</b></div><div class="k-wiersz"><span>VAT 23%</span><b>'+zl(netto*.23)+'</b></div><div class="k-wiersz suma"><span>Do zapłaty brutto</span><b>'+zl(netto*1.23)+'</b></div>'+
   '<div class="uwaga">'+ikona("i-ok")+'<span>Płatność: przelew, termin 14 dni (przykład, docelowo warunki firmy z Optimy).</span></div>'+
   '<button type="button" class="btn btn-g btn-pelny" id="zloz"><span class="wezel"></span>Złóż zamówienie</button><small style="color:var(--muted);font-size:12.5px">W podglądzie zamówienie nie jest nigdzie wysyłane.</small></aside></div></div>';
}

function vZamowienie(nr){
  return '<div class="w"><nav class="okruszki" aria-label="Okruszki"><a href="#/">Sklep</a><i class="sep"></i><a href="#/konto">Konto</a><i class="sep"></i><span>Zamówienie '+esc(nr.replace(/-/g,"/"))+'</span></nav>'+
  '<div class="panel-k" style="margin:10px 0 72px"><div>'+przewod()+'<h1 style="font-size:clamp(24px,3vw,34px)">Dziękujemy, zamówienie '+esc(nr.replace(/-/g,"/"))+' przyjęte</h1></div><p>Zamówienie jest już w Comarch ERP Optima jako zamówienie od klienta. O kolejnych krokach poinformujemy mailem, a statusy zobaczysz w panelu firmy.</p>'+
  '<div class="status"><span class="post"></span><div class="ok"><b>Przyjęte w sklepie</b><small>teraz</small></div><div class="ok teraz"><b>Zapisane w Optimie</b><small>dokument ZS</small></div><div><b>Faktura</b><small>FS w PDF w panelu</small></div><div><b>Wysłane</b><small>numer przesyłki mailem</small></div></div>'+
  '<div class="hero-cta"><a class="btn btn-g" href="#/konto"><span class="wezel"></span>Przejdź do zamówień</a><a class="btn btn-o" href="#/kategoria/kable">Wróć do katalogu</a></div></div></div>';
}

function vKonto(){
  var ok='<nav class="okruszki" aria-label="Okruszki"><a href="#/">Sklep</a><i class="sep"></i><span>Konto firmy</span></nav>';
  if(!stan.zalog){
    return '<div class="w">'+ok+'<div class="list-gl"><div><h1>Konto firmy</h1><p>Sklep jest tylko dla firm. Ceny netto i zamówienia na fakturę są dostępne po zalogowaniu.</p></div></div>'+
    '<div class="konto-g">'+
     '<form class="panel-k" id="fLog" novalidate><h2>Logowanie</h2><div class="pole"><label for="le">E-mail służbowy</label><input id="le" type="email" autocomplete="off" placeholder="imie@firma.pl"></div><div class="pole"><label for="lh">Hasło</label><input id="lh" type="password" autocomplete="off"></div><button type="submit" class="btn btn-g btn-pelny"><span class="wezel"></span>Zaloguj się</button><div class="uwaga">'+ikona("i-ok")+'<span>W podglądzie przycisk logowania pokazuje widok firmy testowej. Formularz nie wysyła danych.</span></div></form>'+
     '<form class="panel-k" id="fRej" novalidate><h2>Załóż konto firmowe</h2><p>Wpisz NIP, a dane firmy uzupełnią się z rejestru. Konto aktywujemy po weryfikacji.</p>'+
      '<div class="pole"><label for="nip">NIP firmy</label><div class="nip-rzad"><input id="nip" inputmode="numeric" placeholder="10 cyfr" autocomplete="off"><button type="button" class="btn btn-o" id="gus">Pobierz dane</button></div><small>W sklepie: dane z GUS/CEIDG po NIP</small></div>'+
      '<div class="pole"><label for="rf">Nazwa firmy</label><input id="rf" autocomplete="off"></div>'+
      '<div class="dwa"><div class="pole"><label for="re">E-mail</label><input id="re" type="email" autocomplete="off"></div><div class="pole"><label for="rt">Telefon</label><input id="rt" type="tel" autocomplete="off"></div></div>'+
      '<button type="submit" class="btn btn-n btn-pelny">Wyślij wniosek o konto</button></form>'+
    '</div></div>';
  }
  var zam=[["WWW/0042/11/2026","06.11.2026","3","2 734,00","w","W realizacji"],["WWW/0039/10/2026","28.10.2026","5","4 118,50","ok","Zrealizowane"],["WWW/0035/10/2026","17.10.2026","2","1 301,00","ok","Zrealizowane"],["WWW/0031/10/2026","03.10.2026","8","6 942,20","ok","Zrealizowane"]];
  var fv=[["FS/1187/11/2026","06.11.2026","20.11.2026","3 362,82","d","Do zapłaty"],["FS/1154/10/2026","28.10.2026","11.11.2026","5 065,76","ok","Zapłacona"],["FS/1122/10/2026","17.10.2026","31.10.2026","1 600,23","ok","Zapłacona"]];
  return '<div class="w">'+ok+'<div class="dash">'+
   '<div class="dash-gl"><div><h1>Przykładowa Firma Instalacyjna</h1><p>Konto testowe w podglądzie · NIP 000-000-00-00 · użytkownik: zakupy@przyklad.pl</p></div><div class="warunki"><span>Cennik<b>Hurt A</b></span><span>Termin płatności<b>14 dni</b></span><span>Limit kupiecki<b>15 000 zł</b></span></div></div>'+
   '<div class="zakladki" role="tablist"><button type="button" role="tab" class="akt" data-tab="z">Zamówienia</button><button type="button" role="tab" data-tab="f">Faktury</button><button type="button" role="tab" data-tab="d">Dane firmy</button></div>'+
   '<div data-panel="z"><div class="tab-w"><table class="tab"><thead><tr><th>Numer</th><th>Data</th><th>Pozycje</th><th class="num">Netto</th><th>Status</th><th></th></tr></thead><tbody>'+zam.map(function(r){return '<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+r[2]+'</td><td class="num">'+r[3]+' zł</td><td><span class="etk '+r[4]+'">'+r[5]+'</span></td><td><a class="pdf-l" href="#/konto" data-demo="W sklepie: szczegóły zamówienia i ponowne zamówienie jednym kliknięciem.">Szczegóły</a></td></tr>'}).join("")+'</tbody></table></div></div>'+
   '<div data-panel="f" hidden><div class="tab-w"><table class="tab"><thead><tr><th>Faktura</th><th>Wystawiona</th><th>Termin</th><th class="num">Brutto</th><th>Status</th><th></th></tr></thead><tbody>'+fv.map(function(r){return '<tr><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+r[2]+'</td><td class="num">'+r[3]+' zł</td><td><span class="etk '+r[4]+'">'+r[5]+'</span></td><td><a class="pdf-l" href="#/konto" data-demo="W sklepie: faktura PDF prosto z Optimy.">'+ikona("i-pdf")+'PDF</a></td></tr>'}).join("")+'</tbody></table></div></div>'+
   '<div data-panel="d" hidden><div class="dane-firmy"><div><small>Nazwa</small><b>Przykładowa Firma Instalacyjna</b></div><div><small>NIP</small><b>000-000-00-00</b></div><div><small>Adres do faktury</small><b>ul. Przykładowa 1, 00-000 Warszawa</b></div><div><small>Użytkownicy konta</small><b>2 osoby (zakupy, kierownik budowy)</b></div></div></div>'+
   '<p style="color:var(--muted);font-size:13px;margin-top:14px">Dane w panelu są przykładowe. Docelowo zamówienia, faktury, limit i termin płatności czytane są z Comarch ERP Optima.</p>'+
   '<div class="hero-cta"><button type="button" class="btn btn-o" id="wyloguj">Wyloguj (podgląd)</button></div>'+
  '</div></div>';
}

function vIntegracja(){
  return '<div class="w"><nav class="okruszki" aria-label="Okruszki"><a href="#/">Sklep</a><i class="sep"></i><span>Integracja z Optimą</span></nav>'+
  '<div class="list-gl"><div><h1>Sklep połączony z Comarch ERP Optima</h1><p>Optima pozostaje jedynym źródłem cen, stanów i dokumentów. Sklep tylko je pokazuje i oddaje z powrotem zamówienia.</p></div></div>'+
  schemat()+
  '<div class="opt-kafle"><div><b>Ceny z cenników</b><p>Firma przypisana w Optimie do cennika widzi w sklepie swoje ceny netto.</p></div><div><b>Stany magazynowe</b><p>Ilości z wybranych magazynów, odświeżane automatycznie, bez ręcznego wpisywania.</p></div><div><b>Zamówienia jako ZS</b><p>Zamówienie ze sklepu od razu jest w Optimie, z numerem zamówienia klienta i uwagami.</p></div><div><b>Faktury w panelu</b><p>Faktura wystawiona w Optimie wraca do klienta jako PDF w panelu firmy.</p></div></div>'+
  '<section class="sek" style="padding-bottom:72px">'+przewod()+'<h2 style="margin-bottom:24px">Droga zamówienia</h2><div class="kroki"><div class="krok"><h3>Klient zamawia</h3><p>Zalogowana firma składa zamówienie w sklepie, w swoich cenach netto.</p></div><div class="krok"><h3>Optima przyjmuje</h3><p>Zamówienie pojawia się w Optimie. JW SYSTEMS kompletuje towar i wystawia fakturę jak zwykle.</p></div><div class="krok"><h3>Sklep informuje</h3><p>Status i faktura PDF wracają do sklepu, klient dostaje mail i widzi wszystko w panelu.</p></div></div></section>'+
  '</div>';
}
function vBrak(){return '<div class="w"><div class="pusto" style="margin:40px 0 72px">Nie ma takiej strony. <a class="link" href="#/">Wróć do sklepu</a></div></div>'}

/* ---------- router ---------- */
function trasa(){
  var h=location.hash.replace(/^#/,"")||"/";
  var qi=h.indexOf("?"),q="";if(qi>=0){q=decodeURIComponent(h.slice(qi+1).replace(/^q=/,"").replace(/\+/g," "));h=h.slice(0,qi)}
  var cz=h.split("/").filter(Boolean);
  var nav="",kat="";
  if(!cz.length){app.innerHTML=vDom()}
  else if(cz[0]==="kategoria"){kat=cz[1];app.innerHTML=vKategoria(cz[1],q);if(cz[1]==="kable"){rysujListing(q);podepnijListing(q)}}
  else if(cz[0]==="produkt"){kat="kable";app.innerHTML=vProdukt(cz[1]);podepnijProdukt()}
  else if(cz[0]==="koszyk"){nav="koszyk";app.innerHTML=vKoszyk()}
  else if(cz[0]==="konto"){nav="konto";app.innerHTML=vKonto()}
  else if(cz[0]==="zamowienie"){nav="konto";app.innerHTML=vZamowienie(cz[1]||"")}
  else if(cz[0]==="integracja"){nav="integracja";app.innerHTML=vIntegracja()}
  else app.innerHTML=vBrak();
  $$("[data-nav]").forEach(function(a){a.classList.toggle("akt",a.dataset.nav===nav)});
  $$("#katPasek a, #mmKat a").forEach(function(a){a.classList.toggle("akt",a.dataset.kat===kat)});
  podepnijKaruzele();
  zamknijMenu();
}
var ostatniHash="";
window.addEventListener("hashchange",function(){
  var bez=function(x){return x.split("?")[0]};
  var zmiana=bez(location.hash)!==bez(ostatniHash);
  ostatniHash=location.hash;trasa();
  if(zmiana)window.scrollTo(0,0);
});

/* ---------- interakcje ---------- */
function odswiezNaglowek(){
  var n=ileKosz(),l=$("#licznik");l.hidden=!n;l.textContent=n;
  $("#kontoTxt").textContent=stan.zalog?"Moja firma":"Zaloguj";
  $("#pdPrzelacz").textContent=stan.zalog?"Zobacz jako gość":"Zobacz jako zalogowana firma";
}
function ustawZalog(v){stan.zalog=v;zapisz("jw_zalog",v);odswiezNaglowek();var y=window.scrollY;trasa();window.scrollTo(0,y)}
$("#pdPrzelacz").addEventListener("click",function(){ustawZalog(!stan.zalog);toast(stan.zalog?"Widok zalogowanej firmy: ceny netto i koszyk":"Widok gościa: ceny ukryte")});

function dodaj(id,il){stan.koszyk[id]=(stan.koszyk[id]||0)+il;zapisz("jw_koszyk",stan.koszyk);odswiezNaglowek();toast("Dodano do koszyka: "+byId[id].kod+" × "+il)}

document.addEventListener("click",function(e){
  var t=e.target.closest("[data-demo]");
  if(t){e.preventDefault();toast(t.dataset.demo);return}
  t=e.target.closest("[data-dodaj]");
  if(t){var il=1;if(t.hasAttribute("data-z-il")){il=Math.max(1,parseInt($("#il").value,10)||1)}dodaj(t.dataset.dodaj,il);return}
  t=e.target.closest("[data-il]");
  if(t){var inp=$("#il"),v=Math.max(1,(parseInt(inp.value,10)||1)+parseInt(t.dataset.il,10));inp.value=v;przeliczIl();return}
  t=e.target.closest("[data-kil]");
  if(t){var id=t.dataset.kil;stan.koszyk[id]=Math.max(1,stan.koszyk[id]+parseInt(t.dataset.d,10));zapisz("jw_koszyk",stan.koszyk);odswiezNaglowek();trasa();return}
  t=e.target.closest("[data-usun]");
  if(t){delete stan.koszyk[t.dataset.usun];zapisz("jw_koszyk",stan.koszyk);odswiezNaglowek();trasa();return}
  if(e.target.closest("#zloz")){stan.koszyk={};zapisz("jw_koszyk",{});odswiezNaglowek();location.hash="#/zamowienie/WWW-0043-11-2026";return}
  if(e.target.closest("#wyloguj")){ustawZalog(false);return}
  if(e.target.closest("#gus")){toast("W sklepie dane firmy uzupełnią się z rejestru po NIP. W podglądzie nic nie jest pobierane.");return}
  t=e.target.closest("[data-tab]");
  if(t){$$("[data-tab]").forEach(function(b){b.classList.toggle("akt",b===t)});$$("[data-panel]").forEach(function(p){p.hidden=p.dataset.panel!==t.dataset.tab});return}
  t=e.target.closest("[data-szybki]");
  if(t){var v2=t.dataset.szybki;wybrane={};if(v2)wybrane.kat=[v2];if(location.hash.indexOf("#/kategoria/kable")===0&&location.hash.indexOf("?")<0){e.preventDefault();rysujListing("")}return}
  t=e.target.closest("[data-kar]");
  if(t){var k=document.getElementById(t.dataset.kar);var c=k.firstElementChild;var krok=c?c.getBoundingClientRect().width+16:300;k.scrollBy({left:krok*parseInt(t.dataset.kier,10),behavior:"smooth"});return}
  t=e.target.closest("[data-gal]");
  if(t){var tor=$("#galTor");tor.scrollTo({left:tor.clientWidth*parseInt(t.dataset.gal,10),behavior:"smooth"});return}
});
document.addEventListener("submit",function(e){
  var f=e.target;
  if(f.matches("[data-szukaj]")){e.preventDefault();var q=f.q.value.trim();wybrane={};location.hash="#/kategoria/kable"+(q?"?q="+encodeURIComponent(q):"");return}
  if(f.id==="fLog"){e.preventDefault();ustawZalog(true);toast("Zalogowano jako firma testowa (podgląd)");return}
  if(f.id==="fRej"){e.preventDefault();toast("W podglądzie formularz nie wysyła danych. W sklepie wniosek trafi do JW SYSTEMS do akceptacji.");return}
});
document.addEventListener("change",function(e){
  var t=e.target;
  if(t.matches("[data-kin]")){var id=t.dataset.kin;stan.koszyk[id]=Math.max(1,parseInt(t.value,10)||1);zapisz("jw_koszyk",stan.koszyk);odswiezNaglowek();trasa()}
});

function przeliczIl(){var p=byId[(location.hash.split("/")[2]||"")];var inp=$("#il");if(!p||!inp)return;var v=Math.max(1,parseInt(inp.value,10)||1);$("#przel").innerHTML=v+" × "+p.opak+" = <b>"+(v*p.m)+" m</b>"}

function podepnijListing(q){
  $("#fGrupy").addEventListener("change",function(e){var t=e.target;if(!t.dataset.f)return;var a=wybrane[t.dataset.f]||[];if(t.checked)a.push(t.value);else a=a.filter(function(x){return x!==t.value});wybrane[t.dataset.f]=a;rysujListing(q)});
  $("#fCzysc").addEventListener("click",function(){wybrane={};rysujListing(q)});
  $("#sort").addEventListener("change",function(){rysujListing(q)});
  $$(".widok button").forEach(function(b){b.addEventListener("click",function(){stan.widok=b.dataset.widok;zapisz("jw_widok",stan.widok);rysujListing(q)})});
  $("#aktywne").addEventListener("click",function(e){var b=e.target.closest("[data-usun-f]");if(!b)return;wybrane[b.dataset.usunF]=(wybrane[b.dataset.usunF]||[]).filter(function(x){return x!==b.dataset.v});rysujListing(q)});
  $("#siatka").addEventListener("click",function(e){if(e.target.closest("[data-czysc]")){wybrane={};rysujListing(q)}});
  var fl=$("#filtry"),tlo=null;
  function otworz(){fl.classList.add("otw");tlo=document.createElement("div");tlo.className="f-tlo";tlo.addEventListener("click",zamknij);document.body.appendChild(tlo);document.body.style.overflow="hidden"}
  function zamknij(){fl.classList.remove("otw");if(tlo){tlo.remove();tlo=null}document.body.style.overflow=""}
  $("#btnFiltry").addEventListener("click",otworz);
  $$("[data-zamknij-f]").forEach(function(b){b.addEventListener("click",zamknij)});
}
function podepnijProdukt(){
  var inp=$("#il");if(inp)inp.addEventListener("input",przeliczIl);
  var tor=$("#galTor");if(!tor)return;
  tor.addEventListener("scroll",function(){var i=Math.round(tor.scrollLeft/tor.clientWidth);$$(".gal-min button").forEach(function(b,j){b.classList.toggle("akt",i===j)});$$(".gal-kropki i").forEach(function(b,j){b.classList.toggle("akt",i===j)})},{passive:true});
  ciagnij(tor);
}
/* przeciąganie myszą (palec działa natywnie) */
function ciagnij(el){
  var start=0,sl=0,wcis=false,ruch=false;
  el.addEventListener("pointerdown",function(e){if(e.pointerType!=="mouse")return;wcis=true;ruch=false;start=e.clientX;sl=el.scrollLeft});
  window.addEventListener("pointermove",function(e){if(!wcis)return;var d=e.clientX-start;if(Math.abs(d)>5){ruch=true;el.classList.add("ciagnie")}if(ruch)el.scrollLeft=sl-d});
  window.addEventListener("pointerup",function(){if(!wcis)return;wcis=false;if(ruch){var c=el.firstElementChild;var w=c?c.getBoundingClientRect().width+(el.classList.contains("gal-tor")?0:16):el.clientWidth;el.classList.remove("ciagnie");el.scrollTo({left:Math.round(el.scrollLeft/w)*w,behavior:"smooth"})}});
  el.addEventListener("click",function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false}},true);
}
function podepnijKaruzele(){$$(".karuzela").forEach(ciagnij)}

/* menu mobilne */
var mm=$("#menuMob"),mb=$("#menuBtn");
function zamknijMenu(){if(mm.hidden)return;mm.hidden=true;mb.setAttribute("aria-expanded","false");document.body.style.overflow=""}
mb.addEventListener("click",function(){mm.hidden=false;mb.setAttribute("aria-expanded","true");document.body.style.overflow="hidden"});
$$("[data-zamknij]",mm).forEach(function(b){b.addEventListener("click",zamknijMenu)});
mm.addEventListener("click",function(e){if(e.target.closest("a"))setTimeout(zamknijMenu,0)});
document.addEventListener("keydown",function(e){if(e.key==="Escape"){zamknijMenu();var f=$("#filtry.otw");if(f){var b=$("[data-zamknij-f]");b&&b.click()}}});

/* kategorie w nagłówku i menu */
$("#katPasek").innerHTML=KAT.map(function(k){return '<a href="#/kategoria/'+k.id+'" data-kat="'+k.id+'">'+ikona(k.ik)+k.n+'</a>'}).join("")+'<a href="#/kategoria/kable" data-demo="Kanały kablowe i chemia Ambersil dojdą z importem.">Pozostałe</a>';
$("#mmKat").innerHTML=KAT.map(function(k){return '<a href="#/kategoria/'+k.id+'" data-kat="'+k.id+'">'+ikona(k.ik)+'<span>'+k.n+'<small>'+k.o+'</small></span></a>'}).join("");
$("#rok").textContent=new Date().getFullYear();

odswiezNaglowek();
ostatniHash=location.hash;
trasa();
})();
