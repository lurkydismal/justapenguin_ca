window.top.document.title =
    `${config.app_name}: ${config.characters_page_title}`;

window.top.document.querySelector( "meta[property=\"og:description\"]" )
    .setAttribute( "content", config.characters_page_description );

var currentCharImg = null;

for ( const [ id, char ] of Object.entries( charIdMap ) ) {
    let l_characterImageWrapDiv = _CreateElement(
        {
            tagName : "div",
            classList : "char-img-wrap",
        },
        _CreateElement(
            {
                tagName : "img",
                src : ( config.character_avatar_path + id +
                        config.image_extension ),
                "dataset.id" : id,
                onclick : ( _event ) => { selectCharacter( _event.target ); },
                classList : "char-img",
            },
            ),
    );

    $( "char-select" ).appendChild( l_characterImageWrapDiv );
}

function selectCharacter( _this ) {
    let bgImg = _ClassList$add(
        $( "bg-img" ),
        "transparent",
    );

    if ( currentCharImg ) {
        _ClassList$remove(
            currentCharImg,
            "selected",
        );
    }

    setTimeout( () => {
        _ChangeElement(
            bgImg,
            {
                src : ( config.character_image_path + _this.dataset.id +
                        config.image_extension ),
            },
        );
    }, 200 );

    currentCharImg = _this.parentElement;

    _ClassList$add(
        currentCharImg,
        "selected",
    );

    // _this.dataset.id
    _UpdateTable(
        config.character_request_address,
        $( "char-players" ),
        "charPlayers",
        ( _convertedResponse ) => {
            $( "char-wiki" ).innerText = ( _convertedResponse.charData.full ||
                                           _convertedResponse.charData.name );
            $( "char-wiki" ).href = _convertedResponse.charData.wiki;
        },
    );

    $( "char-info-container" ).removeAttribute( "hidden" );
}
