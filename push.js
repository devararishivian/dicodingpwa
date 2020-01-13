var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BAhBeK_F11Qy_qtLRLmNvjIVUmhVifNI1_mIAz7glutG45OSEPrcf4R2QNgiHkukGleNHYgougUjthdTvuuWqN4",
    "privateKey": "vpLFCJz_Xliat4NvA1g8Ik2o-UFLnkEn-x76-SSywzY"
};


webPush.setVapidDetails(
    'mailto:rishivian@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f9YWfQRS5k4:APA91bHfMeggFvrxnJ82Yd4dBecTY-wK6ZiGe3kcEMK-N-yvElPj4fa-sqesrbIxMwUJdTvArepD0i2zgIl6vCXOH5AM3C24OiSpAdDpNATV68--tPEwF572pxCguEi65yIPgtDULHy6",
    "keys": {
        "p256dh": "BFPbKaeDTCiHe7X0TRdbtdk4QaArRGIxTYi2+k3iYU7zQ8eC6vLTRyAA2wzMhWg5AOBv/6I+2DAE6sC2yncDSkY=",
        "auth": "9Mo578G4wjnVJ0mL44GlDQ=="
    }
};
var payload = 'Selamat! Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '207569005508',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);