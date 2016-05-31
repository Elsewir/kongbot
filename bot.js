// ==UserScript==
// @name        KafirBOT
// @namespace   kong
// @include     http://www.kongregate.com/games/*
// @version     1
// @grant       none
// ==/UserScript==

var version = '1.1.1'; // Versiyon numarası.
var afk = false; // Başladığında çalışır halde olacak.
var time;

var responseList = [
    // MUHAMMED
    ['muhammed', '(SAV).'],
    ['muhammet', '(SAV).'],

    // Komutlar
    ['!komutlar', '!bilgi,else,!anan,!kürt,!sözler,'],
    ['!bilgi', 'KafirBOT versiyon 31.2.1'],
    ['!sözler', '!mehmet akif,!mevlana,!nazım hikmet,!necip fazıl'],
    ['!anan', 'https://i.ytimg.com/vi/Tb2FcQ0qaPY/maxresdefault.jpg'],  
    ['!kürt', 'https://c11.incisozluk.com.tr/res/incisozluk/11006/1/199381_o66f9.jpg'], 

    //SÖZLER 
    ['!mehmet akif', 'Ya rab, bu uğursuz gecenin yok mu sabahı? Mahşerde mi biçarelerin, yoksa felahı?'],
    ['!mevlana', 'Irmak suyunu tümden içmenin imkanı yok ama susuzluğu giderecek kadar içmemenin de imkanı yok.'],
    ['!nazım hikmet', 'Ya ölü yıldızlara götüreceğiz hayatı, ya da ölüm inecek yeryüzüne.'], 
    ['!necip fazıl', 'Dünya öküzün üstünde derler ama,ben dünya üzerinde nice öküzler bilrim.'], 

    // KÜFÜRLER
    ['göt', 'Küfür etme adam ol.'],
    ['sikerim', 'Küfür etme adam ol.'],
    ['sikik', 'Küfür etme adam ol.'],
    ['sikeyim', 'Küfür etme adam ol.'],
    ['sikiim', 'Küfür etme adam ol.'],
    ['sikim', 'Küfür etme adam ol.'],
    ['yarrak', 'Küfür etme adam ol.'],
    ['yarak', 'Küfür etme adam ol.'],
    ['amcık', 'Küfür etme adam ol.'],
    ['amq', 'Küfür etme adam ol.'],
    ['AMK', 'Küfür etme adam ol.'],  
    ['amk', 'Küfür etme adam ol.'],
    ['aq', 'Küfür etme adam ol.'],
    ['oç', 'Ben senin annene küfrettimi orospu çocuğu.'],
    ['orospu', 'Küfür etme adam ol.'],
    ['orosbu', 'Küfür etme adam ol.'],

    // ALLAH
    ['allah', '(C.C)'],
    ['Allah', '(C.C)'],
    ['ALLAH', '(C.C)'],
    ['tanrı', '(C.C)'],
    ['Tanrı', '(C.C)'],
    ['tekbir', 'ALLAHU EKBER'],
];

// Bot'un mesajlarına cevap verdiği kişiler
var blackList = [
    "discontinue", "seksek1", "sterlars", "sahin9999", "omeragasxex", "AlpKaanB", "exandtrix09", "yagtinmer", "fatihkutay", "YusufO48", "MetehanO24"
];

// Opsiyonel özellikler için ses dosyası eklendi.
var audio = document.createElement('audio'); // Ses dosyasını yarat.
audio.volume = 0.50;
audio.setAttribute('src', 'http://www.soundjay.com/button/sounds/beep-01a.mp3');
document.body.appendChild(audio);


var old = window.konduitToHolodeck;
window.konduitToHolodeck = function (a) {
    // bu ikisi gelen mesajı parse ediyorlar
    var decoded = Base64.decode(a);
    var parsed = JSON.parse(decoded);

    // mesajı atan kişinin kullanıcı adı bu.
    var username = "";

    // BOT'u kullanan kişinin nickname'i
    // ünlem işaretli komutları sadece bu kullanıcının kullanması için bu değişken tanımlandı
    // !afk gibi
    var user = "KafirBOT"

    // verilecek cevap mesajlarının tutulduğu list
    var message = [];

    // sorun çıkarsa bu değer true yapılacak
    var error = false;

    // Alınan veriyi konsola yazdır (Tarayıcıdayken F12 basıp görüntüleniyor)
    console.log(parsed.data);

    // mesajı atan kişi pm mi atmış test edilecek.
    var isPM = false;

    // pm'lere cevap verilip verilmeyeceği ile alakalı değişken
    var replyPM = false;


    try {
        try {
            username = parsed.data.user.username;
            isPM = false;
        } catch (e) {
            username = parsed.data.from;
            isPM = true;
    }
        
    // kullanıcı banlanmış ise error
    if (blackList.indexOf(username) > -1)
        error = true;
       
    // bot sahibine özel komutlar
    if (parsed.data.message.indexOf('!afk') > -1)
        afk = !afk;
    
    if (username == parsed.data.from) 
        error = true; 

    //------------------------------
   
    //containsWord(parsed.data.message, responseList[i][0]
    for (var i = 0; i < responseList.length; i++) {
        if (parsed.data.message == responseList[i][0] && !error) {
            message.push(responseList[i][1] + "\n");
        }
    }

    if (message.length === 0)
        error = true;

    if (!error && !afk) {     // && mods(parsed.data.user.username) == true
        for (var i = 0; i < message.length; i++) {
            console.log(message[i]);          
            document.getElementById('konduit').dispatchJSONEvent(
                JSON.stringify(
                {
                    "type": "room_message",
                    "data": {
                        "message": message[i],
                        "room": 
                        {
                            "id": "15",
                            "type": "chat",
                            "name": "Şu Çılgın Türkler",
                            "xmpp_name": "15",
                            "owner": "Tarantulka"
                        }
                    }
                })
            );   
        }
    }
  } catch (c) { }
  old(a);
};