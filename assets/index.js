import {charIdMap} from "./char_id_map.js";
import {config} from "./config.js";

window.charIdMap = charIdMap;
window.config = config;

function getRandomCharacterId() {
    const chars = Object.keys( charIdMap );
    const randomCharId = chars[ Math.trunc( Math.random() * chars.length ) ];

    return ( randomCharId );
};

document.querySelector( "meta[property=\"og:title\"]" )
    .setAttribute( "content", config.app_name );
document.querySelector( "meta[property=\"og:image\"]" )
    .setAttribute( "content", config.character_avatar_path +
                                  getRandomCharacterId() +
                                  config.image_extension );

window.top.document.title = config.app_name;

window.randomValue = new Uint8Array( 1 );
crypto.getRandomValues( randomValue );

$( "logo" ).src =
    config.logo_image_path +
    ( ( randomValue[ 0 ] % Object.keys( charIdMap ).length ) + 1 ) +
    config.image_extension;

document.body.addEventListener( "htmx:validateUrl", ( _event ) => {
    if ( !_event.detail.sameHost ) {
        _event.preventDefault();
    }
} );

// Get characters
for ( const [ id, char ] of Object.entries( charIdMap ) ) {
    document.querySelectorAll( ".pchar" ).forEach( ( _characterSelect ) => {
        _characterSelect.appendChild(
            _CreateElement(
                {
                    tagName : "option",
                    value : id,
                    innerText : char.full,
                },
                ),
        );
    } );
}

// Get matches and fill search fields options
fetch( config.index_request_address )
    .then( ( _response ) => { return ( _response.json() ); } )
    .then( ( _convertedResponse ) => {
        if ( !_convertedResponse.matches.length ) {
            $( "no-results" ).classList.remove( "d-none" );

            return;
        }

        $( "no-results" ).classList.add( "d-none" );
        $( "have-results" ).classList.remove( "d-none" );

        const playerNameList = [];
        const matchTagsList = [];
        const videoIdList = [];

        for ( const match of Object.values(
                  _convertedResponse.matches ) ) {
            _PushValueToListOnce( match.player_1, playerNameList );

            _PushValueToListOnce( match.player_2, playerNameList );

            for ( const tag of Object.values( match.tags ) ) {
                _PushValueToListOnce( tag, matchTagsList );
            }

            _PushValueToListOnce( match.video_id, videoIdList );
        }

        _AppendOptionFromListToElementsBySelector( playerNameList,
                                                   ".pname-list" );

        _AppendOptionFromListToElementsBySelector( matchTagsList, ".tag-list" );

        _AppendOptionFromListToElementsBySelector( videoIdList,
                                                   ".videoId-list" );

        window.matches = _convertedResponse.matches;

        $( "search-button" ).classList.remove( "d-none" );
    } );

function searchMatchesByForm() {
    const selectedPlayerName = ( $( "p1name" ).value || _Result_t.any );
    const selectedMainCharacter = ( $( "p1charMain" ).value || _Result_t.any );
    const selectedSubCharacter = ( $( "p1charSub" ).value || _Result_t.any );
    const selectedPlayerNameAnother = ( $( "p2name" ).value || _Result_t.any );
    const selectedMainCharacterAnother =
        ( $( "p2charMain" ).value || _Result_t.any );
    const selectedSubCharacterAnother =
        ( $( "p2charSub" ).value || _Result_t.any );
    const selectedMatchResult = ( $( "result" ).value || _Result_t.any );
    const selectedMinAvgELO = ( $( "minELO" ).value || _Result_t.any );
    const selectedMaxAvgELO = ( $( "maxELO" ).value || _Result_t.any );
    const selectedMatchTags = ( $( "matchTags" ).value || _Result_t.any );
    const selectedVideoId = ( $( "videoId" ).value || _Result_t.any );

    return ( matches.filter( ( _match ) => {
        let l_result = 0;
        let l_compare = {
            player_1 : selectedPlayerName,
            main_character_id_1 : selectedMainCharacter,
            sub_character_id_1 : selectedSubCharacter,
        };

        // One field set
        l_result = _ComparePlayersWithForm( l_compare, _match );

        if ( !l_result ) {
            return ( false );
        }

        // Another field set
        l_compare = {
            player_1 : selectedPlayerNameAnother,
            main_character_id_1 : selectedMainCharacterAnother,
            sub_character_id_1 : selectedSubCharacterAnother,
        };

        if ( l_result === 2 ) {
            l_result = _ComparePlayersWithForm( l_compare, _match );

        } else {
            // Rename object fields
            // 1 -> 2, e.g. player_1 -> player_2
            for ( const key of Object.keys( l_compare ) ) {
                l_compare[ key.replace( 1, 2 ) ] = l_compare[ key ];

                delete l_compare[ key ];
            }

            l_result = _CompareWithObject(
                l_compare,
                _match,
            );
        }

        if ( !l_result ) {
            return ( false );
        }

        l_result = _CompareWithObject(
            {
                result : selectedMatchResult,
                video_id : selectedVideoId,
            },
            _match,
        );

        if ( !l_result ) {
            return ( false );
        }

        const l_matchAverageELO = ( ( _match.elo_1 + _match.elo_2 ) / 2 );

        if ( selectedMinAvgELO >= l_matchAverageELO ) {
            return ( false );
        }

        if ( selectedMaxAvgELO <= l_matchAverageELO ) {
            return ( false );
        }

        if ( selectedMatchTags !== _Result_t.any ) {
            let l_filteredSelectedMatchTags =
                selectedMatchTags.split( "," )
                    .map( ( _tag ) => { return ( _tag.trim() ); } )
                    .filter( ( _tag ) => { return ( !!_tag.length ); } );

            for ( const tag of l_filteredSelectedMatchTags ) {
                if ( !_match.tags.length ) {
                    return ( false );
                }

                if ( !_match.tags.includes( tag ) ) {
                    return ( false );
                }
            }
        }

        return ( true );
    } ) );
}

function generatePagination( _pageIndexToMoveTo, _lastPageIndex ) {
    const l_pagination = _CreateElement(
        {
            tagName : "div",
            classList : "ms-pagination",
        },
        _CreateElement(
            "ul",
            _CreateElement(
                "li",
                // Prev
                _ClassList$add(
                    _CreateElement(
                        {
                            tagName : "a",
                            innerText : "Prev",
                            "dataset.page" : ( !!( _pageIndexToMoveTo - 1 )
                                                   ? ( _pageIndexToMoveTo - 1 )
                                                   : ( 1 ) ),
                        },
                        ),
                    ( ( _pageIndexToMoveTo === 1 ) ? ( "ms-disabled" )
                                                   : ( "prev" ) ),
                    ),
                // Prev end
                // First
                _CreateElement(
                    {
                        tagName : "a",
                        innerText : 1,
                        "dataset.page" : 1,
                    },
                    ),
                // First end
                ),
            ),
    );

    let l_listItem = l_pagination.getElementsByTagName( "li" )[ 0 ];

    if ( _lastPageIndex > 1 ) {
        const l_kResultsCountBetweenActiveAndCorners =
            Math.trunc( config.results_page_indexes_per_page / 2 );
        const l_kDrawLeftSide =
            ( _pageIndexToMoveTo > l_kResultsCountBetweenActiveAndCorners );
        const l_kDrawRightSide =
            ( _pageIndexToMoveTo <
              ( _lastPageIndex - l_kResultsCountBetweenActiveAndCorners ) );
        let l_firstIndexToDraw;

        if ( ( _pageIndexToMoveTo === 1 ) || ( !l_kDrawLeftSide ) ) {
            l_firstIndexToDraw = 2;

        } else {
            l_firstIndexToDraw = _pageIndexToMoveTo;
        }

        if ( !l_kDrawRightSide ) {
            l_firstIndexToDraw -=
                ( ( l_firstIndexToDraw -
                    ( _lastPageIndex -
                      l_kResultsCountBetweenActiveAndCorners ) ) +
                  1 );
        }

        if ( l_kDrawLeftSide ) {
            l_firstIndexToDraw -= l_kResultsCountBetweenActiveAndCorners;
        }

        if ( l_firstIndexToDraw <= 1 ) {
            l_firstIndexToDraw = 2;
        }

        let l_currentPageIndex = l_firstIndexToDraw;

        // Ellipses after First
        if ( l_firstIndexToDraw >= 3 ) {
            l_listItem.appendChild( _CreateEllipses() );
        }

        // List pages
        while (
            ( l_currentPageIndex <
              ( l_firstIndexToDraw + config.results_page_indexes_per_page ) ) &&
            ( l_currentPageIndex < ( _lastPageIndex ) ) ) {
            l_listItem.appendChild(
                _CreateElement(
                    {
                        tagName : "a",
                        innerText : l_currentPageIndex,
                        "dataset.page" : l_currentPageIndex,
                    },
                    ),
            );

            l_currentPageIndex++;
        }

        // Ellipses before last
        if ( _lastPageIndex > l_currentPageIndex ) {
            l_listItem.appendChild( _CreateEllipses() );
        }

        // Last
        l_listItem.appendChild(
            _CreateElement(
                {
                    tagName : "a",
                    innerText : _lastPageIndex,
                    "dataset.page" : _lastPageIndex,
                },
                ),
        );
    }

    // Next
    l_listItem.appendChild(
        _ClassList$add(
            _CreateElement(
                {
                    tagName : "a",
                    innerText : "Next",
                    "dataset.page" : ( _pageIndexToMoveTo < _lastPageIndex )
                                         ? ( _pageIndexToMoveTo + 1 )
                                         : ( _pageIndexToMoveTo ),
                },
                ),
            ( ( _pageIndexToMoveTo === _lastPageIndex ) ? ( "ms-disabled" )
                                                        : ( "next" ) ),
            ),
    );

    l_listItem.querySelectorAll( `a[data-page="${_pageIndexToMoveTo}"]` )
        .forEach( ( _anchor ) => {
            _anchor.classList.remove( "ms-disables" );
            _anchor.classList.add( "ms-active" );
        } );

    return ( l_pagination );
}

function generateMatchResultsTable( _pageIndexToMoveTo, _matchesFiltered ) {
    const l_table = _CreateElement(
        "table",
        // Table head
        _CreateElement(
            "thead",
            _CreateElement(
                "tr",
                _CreateElement(
                    {
                        tagName : "th",
                        innerText : "#",
                    },
                    ),
                _CreateElement(
                    {
                        tagName : "th",
                        innerText : "Avg. ELO",
                    },
                    ),
                _CreateElement(
                    {
                        tagName : "th",
                        innerText : "Date",
                    },
                    ),
                _CreateElement(
                    {
                        tagName : "th",
                        innerTex : "Matchup details",
                    },
                    ),
                _CreateElement(
                    {
                        tagName : "th",
                        innerText : "Link",
                    },
                    ),
                _CreateElement(
                    {
                        tagName : "th",
                        innerText : "Tags",
                    },
                    ),
                ),
            ),
        // Table head end
    );

    // Table body
    const l_lastMatchIndexOnPage =
        ( _pageIndexToMoveTo * config.results_per_page );
    const l_firstMatchIndexOnPage =
        ( l_lastMatchIndexOnPage - config.results_per_page );
    const l_tableBody = _CreateElement( "tbody" );

    for ( let _matchIndex = l_firstMatchIndexOnPage;
          _matchIndex < l_lastMatchIndexOnPage; _matchIndex++ ) {
        const l_match = _matchesFiltered[ _matchIndex ];

        if ( typeof l_match === "undefined" ) {
            break;
        }

        let l_previousMatch = ( _matchIndex !== l_firstMatchIndexOnPage )
                                  ? ( _matchesFiltered[ _matchIndex - 1 ] )
                                  : ( l_match );

        const kResultsTableColumnCount = 6;

        // Separate different videos
        if ( ( _matchIndex !== l_firstMatchIndexOnPage ) &&
             ( !_CompareList( l_match.tags, l_previousMatch.tags ) ||
               ( l_match.video_id !== l_previousMatch.video_id ) ) ) {
            l_tableBody.appendChild(
                _CreateElement(
                    "tr",
                    _CreateElement(
                        {
                            tagName : "td",
                            colSpan : kResultsTableColumnCount,
                            classList : "py-1 video-separator",
                        },
                        ),
                    ),
            );
        }

        let l_tableRow = _CreateElement(
            "tr",
            // # Match id
            _CreateElement(
                {
                    tagName : "td",
                    innerText : l_match.id,
                },
                ),
            // # Match id end
            // Avg. ELO Average Match elo
            _CreateElement(
                {
                    tagName : "td",
                    innerText :
                        ( ( l_match.elo_1 + l_match.elo_2 ) / 2 ).toFixed( 1 ),
                },
                ),
            // Avg. ELO Average Match elo end
            // Date Match date
            _CreateElement(
                {
                    tagName : "td",
                    innerText : l_match.date,
                    classList : "d-sm-table-cell match-date",
                },
                ),
            // Date Match date end
            // Matchup details Match result -> sub_character_id_2
            _CreateElement(
                {
                    tagName : "td",
                    classList : "matchup",
                },
                _CreateElement(
                    "div",
                    // Player 1 details
                    _ClassList$add(
                        _CreateElement(
                            {
                                tagName : "div",
                                classList : "player-1",
                            },
                            _CreateElement(
                                {
                                    tagName : "img",
                                    src : ( config.character_avatar_path +
                                            l_match.main_character_id_1 +
                                            config.image_extension ),
                                    classList : "d-sm-img",
                                },
                                ),
                            _CreateElement(
                                {
                                    tagName : "img",
                                    src : ( config.character_avatar_path +
                                            l_match.sub_character_id_1 +
                                            config.image_extension ),
                                    classList : "d-sm-img",
                                },
                                ),
                            _CreateElement(
                                {
                                    tagName : "span",
                                },
                                _CreateElement(
                                    {
                                        tagName : "button",
                                        innerText : l_match.player_1,
                                        onclick : ( _event ) => {
                                            $( "p1name" ).value =
                                                _event.target.innerText;
                                        },
                                        classList : "ms-btn ms-action2",
                                    },
                                    ),
                                ),
                            _CreateElement(
                                {
                                    tagName : "span",
                                    innerText : l_match.elo_1,
                                },
                                ),
                            ),
                        ( ( ( l_match.result === 0 ) ||
                            ( l_match.result === 1 ) )
                              ? ( "winner" )
                              : ( "loser" ) ),
                        ),
                    // Player 1 details end
                    // Versus divider
                    _CreateElement(
                        {
                            tagName : "span",
                            classList : "versus",
                        },
                        ),
                    // Versus divider end
                    // Player 2 details
                    _ClassList$add(
                        _CreateElement(
                            {
                                tagName : "div",
                                classList : "player-2",
                            },
                            _CreateElement(
                                {
                                    tagName : "img",
                                    src : ( config.character_avatar_path +
                                            l_match.main_character_id_2 +
                                            config.image_extension ),
                                    classList : "d-sm-img",
                                },
                                ),
                            _CreateElement(
                                {
                                    tagName : "img",
                                    src : ( config.character_avatar_path +
                                            l_match.sub_character_id_2 +
                                            config.image_extension ),
                                    classList : "d-sm-img",
                                },
                                ),
                            _CreateElement(
                                {
                                    tagName : "span",
                                },
                                _CreateElement(
                                    {
                                        tagName : "button",
                                        innerText : l_match.player_2,
                                        onclick : ( _event ) => {
                                            $( "p2name" ).value =
                                                _event.target.innerText;
                                        },
                                        classList : "ms-btn ms-action2",
                                    },
                                    ),
                                ),
                            _CreateElement(
                                {
                                    tagName : "span",
                                    innerText : l_match.elo_2,
                                },
                                ),
                            ),
                        ( ( ( l_match.result === 0 ) ||
                            ( l_match.result === 2 ) )
                              ? ( "winner" )
                              : ( "loser" ) ),
                        ),
                    // Player 2 details end
                    ),
                ),
            // Matchup details Match result -> sub_character_id_2 end
        );

        // Link Match video_id
        let l_tableData = _CreateElement( "td" );

        if ( !!l_match.video_id.length ) {
            const [ l_hour, l_minute, l_second ] =
                _GetMatchTimeFromTimestamp( l_match.timestamp );

            l_tableData.appendChild(
                _CreateElement(
                    {
                        tagName : "a",
                        target : "_blank",
                        referrerPolicy : "no-referrer",
                        href : `https://youtu.be/${l_match.video_id}?t=${
                            l_match.timestamp}`,
                    },
                    _CreateElement(
                        {
                            tagName : "span",
                            innerText :
                                `Watch time: ${l_hour}:${l_minute}:${l_second}`,
                            classList : "d-sm-table-cell nowrap",
                        },
                        ),
                    ),
            );
        }

        l_tableRow.appendChild( l_tableData );

        // Tags Match tags
        l_tableRow.appendChild(
            _CreateElement(
                {
                    tagName : "td",
                    classList : "d-md-table-cell",
                },
                _CreateElement(
                    {
                        tagName : "button",
                        innerText : ( !!l_match.tags.length )
                                        ? ( l_match.tags.toString().replace(
                                              ",", ", " ) )
                                        : ( _Result_t.anyTag ),
                        onclick : ( _event ) => {
                            let l_tags = _event.target.innerText;

                            if ( ( l_tags !== _Result_t.anyTag ) &&
                                 ( l_tags !== _Result_t.any ) &&
                                 ( l_tags.length ) ) {
                                if ( $( "matchTags" )
                                         .value.includes( l_tags ) ) {
                                    return;
                                }

                                if ( $( "matchTags" ).value.length ) {
                                    l_tags = ", " + l_tags;
                                }

                                $( "matchTags" ).value += l_tags;
                            } else {
                                $( "matchTags" ).value = "";
                            }
                        },
                        classList : "ms-btn ms-action2",
                    },
                    ),
                ),
        );

        l_tableBody.appendChild( l_tableRow );
    }

    // Append table content
    l_table.appendChild( l_tableBody );

    return ( l_table );
}

const fillResultsTable = ( ( _pageIndexToMoveTo, _lastPageIndex,
                             _matchesFiltered ) => {
    let l_lastPageIndex;
    let l_matchesFiltered;

    return ( ( _pageIndexToMoveTo, _lastPageIndex, _matchesFiltered ) => {
        l_lastPageIndex = ( _lastPageIndex || l_lastPageIndex );
        l_matchesFiltered = ( _matchesFiltered || l_matchesFiltered );

        // Hide results
        $( "results" ).classList.add( "d-none" );

        // Clear match results table
        $( "results" ).replaceChildren();

        // If \c matchesFiltered is empty
        if ( !l_matchesFiltered.length ) {
            $( "have-results" ).classList.add( "d-none" );
            $( "no-results" ).classList.remove( "d-none" );

            return;
        }

        // Generate pagination
        const l_pagination =
            generatePagination( _pageIndexToMoveTo, l_lastPageIndex );

        // Append top pagination
        $( "results" ).appendChild( l_pagination.cloneNode( true ) );

        // Generate match results table
        $( "results" )
            .appendChild( generateMatchResultsTable( _pageIndexToMoveTo,
                                                     l_matchesFiltered ) );

        // Append bottom pagination
        $( "results" ).appendChild( l_pagination );

        // banana banana banana
        $( "results" )
            .querySelectorAll(
                `a[data-page]:not([data-page='${_pageIndexToMoveTo}'])` )
            .forEach( ( _anchor ) => {
                _anchor.onclick = ( _event ) => {
                    fillResultsTable( Number( _event.target.dataset.page ) );
                };
            } );

        // Show results
        $( "no-results" ).classList.add( "d-none" );
        $( "have-results" ).classList.add( "d-none" );
        $( "results" ).classList.remove( "d-none" );
    } );
} )();

// Search button click
$( "search-button" ).addEventListener( "click", ( _event ) => {
    const l_currentPageIndex = 1;
    const l_matchesFiltered = searchMatchesByForm();
    const l_lastPageIndex =
        Math.ceil( l_matchesFiltered.length / config.results_per_page );

    fillResultsTable( l_currentPageIndex, l_lastPageIndex, l_matchesFiltered );
} );
