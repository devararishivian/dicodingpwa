var base_url = "https://api.football-data.org/v2/";
var id_liga = 2015; //Liga Perancis = 2015
var endpoint_latest = `${base_url}teams/86/matches?status=FINISHED&limit=1`;
var endpoint_upcoming = `${base_url}teams/81/matches?status=SCHEDULED&limit=1`;
var endpoint_jadwal_upcoming = `${base_url}competitions/${id_liga}/matches?status=SCHEDULED&limit=20`;
var endpoint_match = `${base_url}matches/`;

// var apiToken = "e62f6b93b1eb4861abffeeb55bf7ce1b";

var apiToken = "52e5a72de16f45b8aec36e3dbb02b0c9";

let fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': apiToken,
    }
  });
}

var status = response => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}


// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}


// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}
// Blok kode untuk melakukan request data json

function getLatestMatch() {
  if ('caches' in window) {
    caches.match(endpoint_latest).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          hasilTerakhirMatch(data);
        });
      }
    });
  }
  fetchApi(endpoint_latest)
    .then(status)
    .then(json)
    .then(function (data) {
      hasilTerakhirMatch(data)
    })
    .catch(error);
}

function getUpcomingMatch() {
  if ('caches' in window) {
    caches.match(endpoint_upcoming).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          upcomingMatch(data);
        });
      }
    });
  }
  fetchApi(endpoint_upcoming)
    .then(status)
    .then(json)
    .then(function (data) {
      upcomingMatch(data)
    })
    .catch(error);
}

function getMatchLeague() {
  return new Promise(function (resolve, reject) {
    if ('caches' in window) {
      caches.match(endpoint_jadwal_upcoming).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultMatch(data);
            resolve(data);
          });
        }
      });
    }
    fetchApi(endpoint_jadwal_upcoming)
      .then(status)
      .then(json)
      .then(function (data) {
        resultMatch(data);
        resolve(data);
      })
      .catch(error);
  });
}

function getDetailMatchById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ('caches' in window) {
      caches.match(endpoint_match + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultDetailMatch(data);
            resolve(data)
          });
        }
      });
    }
    fetchApi(endpoint_match + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        resultDetailMatch(data);
        resolve(data);
      })
      .catch(error);
  });
}