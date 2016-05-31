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
    ['muhammed', 'Muhammed yalancının tekiydi?'],
    ['muhammet', 'Muhammed yalancının tekiydi?'],
    ['peygamber', 'Peygamberlerin hepsi şizofreni hastası biliyor musun? Hepsi yalancı.'],

    // KURAN
    ['kuran', 'İşe yaramaz yalanlarla dolu bir kağıt parçası.'],
    ['kur\'an', 'İşe yaramaz yalanlarla dolu bir kağıt parçası.'],

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
    ['amk', 'Küfür etme adam ol.'],
    ['aq', 'Küfür etme adam ol.'],
    ['oç', 'Küfür etme adam ol.'],
    ['orospu', 'Küfür etme adam ol.'],
    ['orosbu', 'Küfür etme adam ol.'],
    ['gavat', 'Küfür etme adam ol.'],   
    ['piç', 'Küfür etme adam ol.'],
    ['puşt', 'Küfür etme adam ol.'],

    // ALLAH
    ['allah', 'Allah yok.'],
    ['tanrı', 'Tanrı yok.'],
    ['tanri', 'Tanrı yok.'],
    ['tekbir', 'THERE\'S NO GOD'],
];

// Bot'un mesajlarına cevap vermeyeceği kişiler
var blackList = [
    "fatihkutay", "BrokenDiamond"
];

// cevaplar room'a mı yoksa pm olarak mı atılacak test eden değişken
// true ise cevaplar pm olarak yollanacak
var replyPM = true;

// Özel mesaj yollama fonksiyonu
function sendPrivateMessage(senderName, message) {
    document.getElementById('konduit').dispatchJSONEvent(
    JSON.stringify({
        'type': 'private_message',
        'data': {
            'message': message,
            'username': senderName,
        }   
    }));
}

// Room mesajı yollama fonksiyonu
function sendRoomMessage(message) {
    document.getElementById('konduit').dispatchJSONEvent(
        JSON.stringify(
        {
            "type": "room_message",
            "data": {
                "message": message,
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
    var senderName = "";

    // BOT'u kullanan kişinin nickname'i
    // ünlem işaretli komutları sadece bu kullanıcının kullanması için bu değişken tanımlandı
    // !afk gibi
    var user = "KafirBOT";

    // verilecek cevap mesajlarının tutulduğu list
    var message = [];

    // sorun çıkarsa bu değer true yapılacak
    var error = false;

    // Alınan veriyi konsola yazdır (Tarayıcıdayken F12 basıp görüntüleniyor)
    console.log(parsed.data);

    // mesajı atan kişi pm mi atmış test edilecek.
    var isPM = false;

    try {
        try {
            senderName = parsed.data.user.username;
            isPM = false;
        } catch (e) {
            senderName = parsed.data.from;
            isPM = true;
        }
        
        // kullanıcı banlanmış ise error
        if (blackList.indexOf(senderName) > -1)
            error = true;
           
        // bot sahibine özel komutlar
        if ((parsed.data.message.indexOf('!afk') > -1) && (senderName == user))
            afk = !afk;
        if ((parsed.data.message.indexOf('!deneme') > -1) && (senderName == user))
            message.push('Deneme');
        if ((parsed.data.message.indexOf('!pm-mode-on') > -1) && (senderName == user))
            replyPM = true;
        if ((parsed.data.message.indexOf('!pm-mode-off') > -1) && (senderName == user))
            replyPM = false;
        //------------------------------
       
        // mesajı analiz edip ona göre cevapları message listesine yaz.
        for (var i = 0; i < responseList.length; i++) {
            if (parsed.data.message.toLowerCase() == responseList[i][0] && !error) {
                message.push(responseList[i][1] + "\n");
            }
        }

        // mesaj yoksa bir şey yollamıyoruz
        if (message.length === 0)
            error = true;

        // mesajı yolla
        if (!(error || afk)) {
            if (isPM || replyPM) { 
                for (var i = 0; i < message.length; i++) {
                    sendPrivateMessage(senderName, message[i]);
                }
            } else {
                for (var i = 0; i < message.length; i++) {
                    sendRoomMessage(message[i]);
                }
            }
            console.log(message[i]);     
        }
    } 
    catch (c) { 

    }

    old(a);
};