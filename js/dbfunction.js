function checkData(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                if (data != undefined) {
                    resolve("Data favorit")
                } else {
                    reject("Bukan data favorit")
                }
            });
    });
}

function createDataFav(dataType, data) {
    var storeName = "";
    var dataToCreate = {}
    if (dataType == "match") {
        storeName = "match_favorit"
        dataToCreate = {
            id: data.match.id,
            head2head: {
                numberOfMatches: data.head2head.numberOfMatches,
                totalGoals: data.head2head.totalGoals,
                homeTeam: {
                    wins: data.head2head.homeTeam.wins,
                    draws: data.head2head.homeTeam.draws,
                    losses: data.head2head.homeTeam.losses
                },
                awayTeam: {
                    wins: data.head2head.awayTeam.wins,
                    draws: data.head2head.awayTeam.draws,
                    losses: data.head2head.awayTeam.losses
                }
            },
            match: {
                utcDate: data.match.utcDate,
                venue: data.match.venue,
                matchday: data.match.matchday,
                homeTeam: {
                    name: data.match.homeTeam.name
                },
                awayTeam: {
                    name: data.match.awayTeam.name
                }
            }
        }
    }

    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataToCreate);

        return tx.complete;
    }).then(function () {
        console.log('Berhasil disimpan.');
        document.getElementById("iconFav").classList.add('fas');
        document.getElementById("iconFav").innerHTML = " Favorit";
        M.toast({
            html: 'Berhasil ditambahkan di Favorit!'
        });
    }).catch(function () {
        M.toast({
            html: 'Terjadi Kesalahan'
        });
    });
}

function deleteDatafav(storeName, data) {
    databasePromise(idb).then(function (db) {
        var tx = db.transaction(storeName, 'readwrite');
        var store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function () {
        console.log('Item deleted');
        document.getElementById("iconFav").classList.remove('fas');
        document.getElementById("iconFav").classList.add('far');
        document.getElementById("iconFav").innerHTML = " Tambah Ke Favorit";
        M.toast({
            html: 'Berhasil dihapus dari Favorit!'
        });
    }).catch(function () {
        M.toast({
            html: 'Terjadi Kesalahan'
        });
    });
}

function getSavedDataById(dataType) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = Number(urlParams.get("id"));

    if (dataType == "match") {
        getDataById("match_favorit", idParam).then(function (match) {
            resultDetailMatch(match);
        });
    }
}

function getDataById(storeName, id) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function (resolve, reject) {
        databasePromise(idb)
            .then(function (db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function (data) {
                resolve(data);
            });
    });
}

function readDataFavHtml(dataType) {
    if (dataType == "match") {
        getAllData("match_favorit").then(function (data) {
            resultMatchFav(data);
        });
    }
}