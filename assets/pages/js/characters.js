window.top.document.title = `${apps.name}: Characters page`;

window.top.document.querySelector( "meta[property=\"og:description\"]" )
    .setAttribute( "content", "Information and statistics for characters." );

if ( typeof currentCharImg === "undefined" ) {
    var currentCharImg = null;
}

if ( typeof imgs === "undefined" ) {
    var imgs = document.getElementsByClassName( "char-img" );
}

if ( typeof bgImg === "undefined" ) {
    var bgImg = document.getElementById( "bg-img" );
}

if ( typeof charWiki === "undefined" ) {
    var charWiki = document.getElementById( "char-wiki" );
}

if ( typeof charPlayers === "undefined" ) {
    var charPlayers = document.getElementById( "char-players" );
}

if ( typeof charInfoContainer === "undefined" ) {
    var charInfoContainer = document.getElementById( "char-info-container" );
}

if ( typeof showChart === "undefined" ) {
    var showChart = false;
}

// window.onThemeSwitch = function( theme ) { window.location.reload(); };

bgImg.onload = function() {
    setTimeout( () => { bgImg.classList.remove( "transparent" ); }, 200 );
};

for ( let img of imgs ) {
    img.onclick = () => {
        if ( currentCharImg ) {
            currentCharImg.classList.remove( "selected" );
        }
        bgImg.classList.add( "transparent" );
        setTimeout( () => {
            bgImg.src = `./pages/img/chars/big/${img.dataset.id}.png`;
        }, 200 );
        currentCharImg = img.parentElement;
        currentCharImg.classList.add( "selected" );
        getCharInfo( img.dataset.id ).then( updateCharInfo );
    };
}

if ( window.location.hash.length > 0 ) {
    let id = window.location.hash.slice( 1 );
    document.querySelector( `[data-id=${id}]` ).click();
}

function updateCharInfo( json ) {
    charWiki.innerText = json.charData.full || json.charData.name;
    charWiki.href = json.charData.wiki;
    // charPlayers.tBodies[ 0 ].innerHTML = json.charPlayers;
    // window.location.href = "#" + json.charData.id;
}

function getCharInfo( char ) {
    charInfoContainer.removeAttribute( "hidden" );

    return ( fetch( `../database/${char}.json` ).then( r => r.json() ) )
}
