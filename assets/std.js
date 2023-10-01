var g_typingComplete = true;

const _Result_t = {
    any : "_any",
    anyTag : "no tags",
};

function $( _id ) { return ( document.getElementById( _id ) ); }

const _Sleep = ( _delay ) => {
    return new Promise( ( _resolve ) => setTimeout( _resolve, _delay ) );
};

/**
 * Capitalizes first letters of words in string.
 * @param {string} _string String to be modified
 * @param {boolean=true} _lowercase Whether all other letters should be
 *     lowercased
 * @return {string}
 * @usage
 *   _Capitalize('fix this string');     // -> 'Fix This String'
 *   _Capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   _Capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
const _Capitalize = ( _string, _lowercase = true ) => {
    return ( ( _lowercase ) ? ( _string.toLowerCase() ) : ( _string ) )
        .replace( /(?:^|\s|["'([{])+\S/g, ( match ) => match.toUpperCase() );
};

function _PushValueToListOnce( _value, _list ) {
    let l_valueTrimmed = _value.trim();

    if ( !l_valueTrimmed.length ) {
        return;
    }

    if ( !_list.includes( l_valueTrimmed ) ) {
        _list.push( l_valueTrimmed );
    }
}

function _CompareList( _list, _listAnother ) {
    if ( ( !_list.length ) || ( !_listAnother.length ) ) {
        return ( false );
    }

    for ( const _item of _list ) {
        if ( !_listAnother.includes( _item ) ) {
            return ( false );
        }
    }

    for ( const _item of _listAnother ) {
        if ( !_list.includes( _item ) ) {
            return ( false );
        }
    }

    return ( true );
}

function _CompareWithObject( _compare, _object ) {
    for ( let [ index, value ] of Object.entries( _compare ) ) {
        if ( value !== _Result_t.any ) {
            if ( ( typeof _object[ index ] === "number" ) &&
                 ( isFinite( value ) ) ) {
                value = Number( value );
            }

            if ( _object[ index ] !== value ) {
                return ( false );
            }
        }
    }

    return ( true );
}

function _CreateElement( _element, ..._innerElements ) {
    let l_element;

    if ( typeof _element === "string" ) {
        l_element = document.createElement( _element );

    } else if ( typeof _element.tagName !== "undefined" ) {
        l_element = document.createElement( _element.tagName );

        delete _element.tagName;

        if ( typeof _element.classList !== "undefined" ) {
            for ( const _className of _element.classList.split( " " ) ) {
                l_element.classList.add( _className );
            }

            delete _element.classList;
        }

        _ChangeElement( l_element, _element );

    } else {
        throw ( new Error(
            `_CreateElement: typeof _element.tagName === "undefined": ${
                _element}` ) );
    }

    if ( typeof _innerElements !== "undefined" ) {
        for ( const _innerElement of _innerElements ) {
            l_element.appendChild( _innerElement );
        }
    }

    return ( l_element );
}

function _ChangeElement( _element, ..._properties ) {
    if ( typeof _properties !== "undefined" ) {
        for ( const _property of _properties ) {
            for ( const [ key, value ] of Object.entries( _property ) ) {
                let keysSplitted = key.split( "." ).filter(
                    ( _tag ) => { return ( !!_tag.length ); } );

                if ( keysSplitted.length === 2 ) {
                    _element[ keysSplitted[ 0 ] ][ keysSplitted[ 1 ] ] = value;

                } else {
                    _element[ key ] = value;
                }
            }
        }
    }

    return ( _element );
}

function _ClassList$add( _element, ...args ) {
    for ( const _className of args ) {
        _element.classList.add( _className );
    }

    return ( _element );
}

function _ClassList$remove( _element, ...args ) {
    for ( const _className of args ) {
        _element.classList.remove( _className );
    }

    return ( _element );
}

function _AppendOptionFromListToElementsBySelector( _list, _selector ) {
    for ( const _item of _list ) {
        document.querySelectorAll( _selector ).forEach( ( _element ) => {
            _element.appendChild(
                _CreateElement(
                    {
                        tagName : "option",
                        value : _item,
                    },
                    ),
            );
        } );
    }
}

function _TransitionEndEventName() {
    let l_transitions = {
        "transition" : "transitionend",
        "OTransition" : "oTransitionEnd",
        "MozTransition" : "transitionend",
        "WebkitTransition" : "webkitTransitionEnd"
    };

    let l_bodyStyle = document.body.style;

    for ( let _transition in l_transitions ) {
        if ( typeof l_bodyStyle[ _transition ] !== "undefined" ) {
            return ( l_transitions[ _transition ] );
        }
    }
}

function _RemoveHash() {
    history.pushState( "", document.title,
                       window.location.pathname + window.location.search );

    return ( false );
}

function _TypingText( _selector, _text ) {
    let l_typed = new Typed( _selector, {
        // Strings to be typed
        strings : [ _text ],

        // ID of element containing string children
        stringsElement : null,

        // Type speed in milliseconds
        typeSpeed : $( "typingSpeed" ).value,

        // Time before typing starts in milliseconds
        startDelay : 0,

        // backspacing speed in milliseconds
        backSpeed : 0,

        // Only backspace what doesn't match the previous string
        smartBackspace : true,

        // Shuffle the strings
        shuffle : false,

        // Time before backspacing in milliseconds
        backDelay : 700,

        // Fade out instead of backspace
        fadeOut : true,

        // CSS class for fade animation
        fadeOutClass : "typed-fade-out",

        // Fade out delay in milliseconds
        fadeOutDelay : 500,

        // Loop strings
        loop : false,

        // Amount of loops
        loopCount : Infinity,

        // Show cursor
        showCursor : false,

        // Character for cursor
        cursorChar : "_",

        // Insert CSS for cursor and fadeOut into HTML <head>
        autoInsertCss : true,

        // Attribute for typing
        // Ex: input placeholder, value, or just HTML text
        attr : null,

        // Bind to focus and blur if el is text input
        bindInputFocusEvents : false,

        // "html" or "null" for plaintext
        contentType : "html",

        onBegin : ( self ) => { console.log( "begin" ); },

        onComplete : ( self ) => {
            console.log( "complete" );
            g_typingComplete = true;
        },

        preStringTyped : ( arrayPos, self ) => { console.log( "pre" ); },

        onStringTyped : ( arrayPos, self ) => { console.log( "typed" ); },

        onLastStringBackspaced : ( self ) => { console.log( "last" ); },

        onTypingPaused : ( arrayPos, self ) => { console.log( "paused" ); },

        onTypingResumed : ( arrayPos, self ) => { console.log( "resumed" ); },

        onReset : ( self ) => { console.log( "reset" ); },

        onStop : ( arrayPos, self ) => { console.log( "stop" ); },

        onStart : ( arrayPos, self ) => { console.log( "start" ); },

        onDestroy : ( self ) => { console.log( "destroy" ); }
    } );
}

function _DownloadFile( _text, _filename = "save.js" ) {
    let l_element = _CreateElement(
        {
            tagName : "a",
            "style.display" : "none",
        },
    );

    l_element.setAttribute(
        "href",
        `data:text/plain;charset=utf-8, ${encodeURIComponent( _text )}` );
    l_element.setAttribute( "download", _filename );

    document.body.appendChild( l_element );

    l_element.click();

    l_element.parentNode.removeChild( l_element );
}

function _ReadFile( _path, _callback = console.log, _responseType = "text",
                    _headers ) {
    if ( ( window.location.protocol === "file:" ) ||
         ( _responseType == "file" ) ) {
        let l_element = _CreateElement(
            {
                tagName : "input",
                classList : "d-none",
            },
        );
        l_element.setAttribute( "type", "file" );
        l_element.onchange = ( _event ) => {
            let l_fileBlob = _event.target.files[ 0 ];

            let l_fileReaderInstance = new FileReader();

            l_fileReaderInstance.addEventListener(
                "load",
                function( _event ) { _callback( _event.target.result ); } );

            l_fileReaderInstance.readAsText( l_fileBlob );
        };

        document.body.appendChild( l_element );

        l_element.click();

        l_element.parentNode.removeChild( l_element );

    } else {
        fetch(
            _path,
            _headers,
            )
            .then( ( _response ) => {
                if ( !_response.ok ) {
                    throw ( new Error( `_ReadFile: ${_response.status}: ${
                        _response.message}.` ) );
                }

                return ( _response[ _responseType ]() );
            } )
            .then( ( _data ) => { _callback( _data ); } )
            .catch( ( _error ) => { console.error( 'Error:', _error ); } );
    }
}

function _CreateEllipses() {
    return ( _CreateElement(
        {
            tagName : "span",
            role : "img",
            ariaLabel : "ellipses",
            innerText : "...",
        },
        ) );
}

function _GetMatchTimeFromTimestamp( _timestamp ) {
    const l_kSecondsPerHour = 3600;
    const l_kSecondsPerMinute = 60;

    const l_hour = Math.trunc( _timestamp / l_kSecondsPerHour );
    const l_minute =
        Math.trunc( ( _timestamp % l_kSecondsPerHour ) / l_kSecondsPerMinute );
    const l_second = Math.trunc( _timestamp % 60 );

    return ( [ l_hour, l_minute, l_second ] );
}

function _ComparePlayersWithForm( _player1, _match ) {
    let l_result = _CompareWithObject(
        _player1,
        _match,
    );

    if ( l_result ) {
        return ( 1 );

    } else {
        // Rename object fields
        // 1 -> 2, e.g. player_1 -> player_2
        for ( const key of Object.keys( _player1 ) ) {
            _player1[ key.replace( 1, 2 ) ] = _player1[ key ];

            delete _player1[ key ];
        }

        l_result = _CompareWithObject(
            _player1,
            _match,
        );

        if ( l_result ) {
            return ( 2 );
        }
    }

    return ( 0 );
}

function _UpdateTable(
    _path = "",
    _table,
    _JSONFieldName,
    _callback,
    _tableContent = {
        "rank" : [],
        "player" : [],
        "games" : [],
        "wins" : [],
        "losses" : [],
        "draws" : [],
        "win rate" : [],
    },
) {
    if ( !_path.length ) {
        return;
    }

    _ReadFile(
        _path,
        ( _convertedResponse ) => {
            const l_content = _convertedResponse[ _JSONFieldName ];

            for ( let _index in l_content ) {
                for ( const [ _field, _data ] of Object.entries(
                          l_content[ _index ] ) ) {
                    _tableContent[ _field ].push( _data );
                }
            }

            if ( typeof _callback !== "undefined" ) {
                _callback( _convertedResponse );
            }

            // Clear table
            _table.replaceChildren();

            // Generate table head
            let l_tableHead = _CreateElement( "thead" );
            let l_tableRow = _CreateElement( "tr" );

            for ( const [ _field, _data ] of Object.entries( _tableContent ) ) {
                let l_tableHeader = _CreateElement(
                    "th",
                    _CreateElement(
                        {
                            tagName : "a",
                            innerText : _Capitalize( _field ),
                        },
                        ),
                );

                l_tableRow.appendChild( l_tableHeader );
            }

            l_tableHead.appendChild( l_tableRow );
            _table.appendChild( l_tableHead );

            // Generate table body
            let l_tableBody = _CreateElement( "tbody" );

            for ( let _index in _tableContent[ "rank" ] ) {
                let l_tableRow = _CreateElement( "tr" );

                for ( const [ _field, _data ] of Object.entries(
                          _tableContent ) ) {
                    let l_tableData = _CreateElement(
                        {
                            tagName : "td",
                            innerText : _data[ _index ],
                        },
                    );

                    if ( _field === "win rate" ) {
                        // &percnt;
                        l_tableData.innerText += "\%";
                    }

                    l_tableRow.appendChild( l_tableData );
                }

                l_tableBody.appendChild( l_tableRow );
            }

            // Put table on the page
            _table.appendChild( l_tableBody );

            // Add table sort
            _AddTableSort();
        },
        "json",
    );
}

// Refactor required below

// A long time ago someone wrote this
// and no one knows how it works
function _AddTableSort() {
    for ( let table of document.getElementsByClassName( "sort-table" ) ) {
        let config = table.dataset.sort.split( "," );

        let tbody = table.tBodies[ 0 ];
        let th_cells = table.tHead.rows[ 0 ].cells;

        for ( let i = 0; i < th_cells.length; i++ ) {
            if ( config[ i ] === "" )
                continue;

            th_cells[ i ].addEventListener( "click", () => {
                let sorted_cell = table.getElementsByClassName( "sorted-asc" );

                if ( !sorted_cell.length > 0 ) {
                    sorted_cell = table.getElementsByClassName( "sorted-desc" );
                }

                if ( sorted_cell.length > 0 ) {
                    sorted_cell[ 0 ].classList.remove( "sorted-asc" );
                }

                // sorted_cell is dynamic, gotta check again
                if ( sorted_cell.length > 0 ) {
                    sorted_cell[ 0 ].classList.remove( "sorted-desc" );
                }

                let rows = Array.prototype.slice.call( tbody.rows, 0 );

                rows.sort( ( a, b ) => {
                    if ( config[ i ] === "text" ) {
                        // Text
                        if ( parseInt( table.dataset.sorted ) === i ) {
                            return a.cells[ i ].innerText.localeCompare(
                                b.cells[ i ].innerText );
                        } else {
                            return b.cells[ i ].innerText.localeCompare(
                                a.cells[ i ].innerText );
                        }
                    } else if ( config[ i ] === "num" ) {
                        // Numerical
                        if ( parseInt( table.dataset.sorted ) === i ) {
                            return parseFloat( a.cells[ i ].innerText ) -
                                   parseFloat( b.cells[ i ].innerText );
                        } else {
                            return parseFloat( b.cells[ i ].innerText ) -
                                   parseFloat( a.cells[ i ].innerText );
                        }
                    }
                } );

                while ( tbody.rows.length > 0 ) {
                    tbody.deleteRow( 0 );
                }

                for ( let i = 0; i < rows.length; i++ ) {
                    tbody.appendChild( rows[ i ] );
                }

                if ( parseInt( table.dataset.sorted ) !== i ) {
                    th_cells[ i ].classList.add( "sorted-desc" );
                    table.dataset.sorted = i;

                } else {
                    th_cells[ i ].classList.add( "sorted-asc" );
                    table.dataset.sorted = null;
                }
            } );
        }
    }
}

async function _Say( _text ) {
    let l_characterName = "";

    g_divCounter++;

    if ( g_divCounter < g_loadDivCounter ) {
        return;
    }

    if ( !!g_characterName ) {
        l_characterName = `<h1 class=\"display-5 fw-bold text-white\">${
            g_characterName}</h1>`;
    }

    g_typingComplete = false;

    $( "msg" ).innerHTML +=
        "<div class=\"bg-dark text-secondary px-4 py-5 text-center\" id=\"_div" +
        g_divCounter + "_say\">" +
        "<div class=\"py-5\">" + l_characterName +
        "<div class=\"col-lg-10 mx-auto\" id=\"_con" + g_divCounter + "\">" +
        `<p class=\"fs-5 mb-4\" ${g_textColor} id=\"_typing` + g_divCounter +
        `\"></p>` +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class=\"b-example-divider\" id=\"_divider" + g_divCounter +
        "_say\"></div>";

    g_characterName = "";
    g_textColor = "";

    await setTimeout( async () => {
        $( "_div" + g_divCounter + "_say" ).classList.add( "transition" );
        $( "_divider" + g_divCounter + "_say" ).classList.add( "transition" );
        $( "_div" + g_divCounter + "_say" ).scrollIntoView();

        if ( !!$( "_div" + ( g_divCounter - 5 ) + "_say" ) ) {
            $( "_div" + ( g_divCounter - 5 ) + "_say" )
                .parentNode.removeChild(
                    $( "_div" + ( g_divCounter - 5 ) + "_say" ) );
            $( "_divider" + ( g_divCounter - 5 ) + "_say" )
                .parentNode.removeChild(
                    $( "_divider" + ( g_divCounter - 5 ) + "_say" ) );
        }

        _TypingText( "#_typing" + g_divCounter, _text );
    } );

    await _WaitInput();
}

async function _SayEx( _text, _beforeText = "<br></br>" ) {
    if ( g_divCounter < g_loadDivCounter ) {
        return;
    }

    $( "_typing" + g_divCounter ).innerHTML +=
        "<span id=\"_typingEx" + g_divCounter + "\"></span>";

    _TypingText( "#_typingEx" + g_divCounter + ":last-of-type",
                 _beforeText + _text );

    await _WaitInput();
}
