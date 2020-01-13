function hasilTerakhirMatch(data) {
    var LatestHTML = ''
    data.matches.forEach(function (latest) {
        latest = JSON.parse(JSON.stringify(latest).replace(/http:/g, 'https:'));
        LatestHTML += `
        <ul class="a-club-title">
            <li class="a-font-bold">${latest.homeTeam.name} <b>${latest.score.fullTime.homeTeam}</b></li>
            <li>VS</li>
            <li class="a-font-bold">${latest.awayTeam.name} <b>${latest.score.fullTime.awayTeam}</b></li>
        </ul>
        <ul class="a-stadium">
            <li>${latest.competition.name}</li>
        </ul>
        <ul class="a-date">
            <li class="a-font-bold">${latest.utcDate}</li>
        </ul>`
    });
    document.getElementById("latest-content").innerHTML = LatestHTML;
}