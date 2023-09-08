var g_menuChoices = [];
var g_soundVector = [];
var g_audioMusic; // new Audio()
var g_characterName = "";
var g_textColor = "";
var g_even = false;
var g_skipped = false;
var g_needSkip = false;
var g_typingComplete = true;
var g_menuCounter = 0;
var g_divCounter = 0;
var g_loadDivCounter = -1;

const media_t = {
    music : 1,
    sound : 2,
};

const appearance_t = {
    fade : 1,
};

function $( _id ) { return ( document.getElementById( _id ) ); }

function _RemoveHash() {
    history.pushState( "", document.title,
                       window.location.pathname + window.location.search );

    return ( false );
}

const sleep = ( _delay ) =>
    new Promise( ( _resolve ) => setTimeout( _resolve, _delay ) );

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

function _SetCookie( _key, _value ) {
    document.cookie = `${_key}=${encodeURIComponent( _value )};path=/`;
}

function _GetCookie( _key ) {
    _key += "=";

    for ( _decodedCookie of decodeURIComponent( document.cookie )
              .split( ";" ) ) {
        while ( _decodedCookie.charAt( 0 ) === " " ) {
            _decodedCookie = _decodedCookie.substring( 1 );
        }

        if ( !_decodedCookie.indexOf( _key ) ) {
            return ( _decodedCookie.substring( _key.length,
                                               _decodedCookie.length ) );
        }
    }

    return ( "" );
}

function _DeleteCookie( _key ) {
    document.cookie = `${_key}=;expires=Thu, 01 Jan 1970;path=/;`;
}

function _DownloadFile( _text, _filename = "save.js" ) {
    let l_element = document.createElement( "a" );
    l_element.setAttribute(
        "href",
        `data:text/plain;charset=utf-8, ${encodeURIComponent( _text )}` );
    l_element.setAttribute( "download", _filename );

    l_element.style.display = "none";
    document.body.appendChild( l_element );

    l_element.click();

    l_element.parentNode.removeChild( l_element );
}

function _ReadFile( _path, _callback = console.log ) {
    if ( window.location.protocol === "file:" ) {
        let l_element = document.createElement( "input" );
        l_element.setAttribute( "type", "file" );
        l_element.onchange = ( _event ) => {
            let l_fileBlob = _event.target.files[ 0 ];

            let l_fileReaderInstance = new FileReader();

            l_fileReaderInstance.addEventListener(
                "load",
                function( _event ) { _callback( _event.target.result ); } );

            l_fileReaderInstance.readAsText( l_fileBlob );
        };

        l_element.classList.add( "d-none" );

        document.body.appendChild( l_element );

        l_element.click();

        l_element.parentNode.removeChild( l_element );

    } else {
        let l_xmlHttp = new XMLHttpRequest();

        l_xmlHttp.onreadystatechange = function() {
            if ( ( l_xmlHttp.readyState === XMLHttpRequest.DONE ) &&
                 ( l_xmlHttp.status === 200 ) ) {
                _callback( l_xmlHttp.responseText );
            }
        };

        l_xmlHttp.open( "GET", _path, true );
        l_xmlHttp.send( null );
    }
}

function _LoadSave( _path, _useLocalStorage = false ) {
    if ( _useLocalStorage ) {
        _ParseSave( localStorage.getItem( "_lastSave" ) );

    } else {
        if ( !!_GetCookie( "hasCookie" ) ) {
            _ParseSave( _GetCookie( "_lastSave" ) );

        } else {
            _ReadFile( "", _ParseSave );
        }
    }
}

function _ParseSave( _lastSave ) {
    if ( typeof _lastSave !== "undefined" ) {
        let l_text = "";

        g_menuChoices = [];

        for ( _decodedSave of decodeURIComponent( _lastSave ) ) {
            for ( let _symbol of _decodedSave ) {
                if ( _symbol === "\|" ) {
                    if ( g_loadDivCounter === -1 ) {
                        g_loadDivCounter = parseInt( unescape( l_text ) );

                    } else {
                        g_menuChoices.push( unescape( l_text ) );
                    }

                    l_text = "";

                } else {
                    l_text += _symbol;
                }
            }
        }
    }
}

function _CreateSave( _useLocalStorage = false ) {
    if ( _useLocalStorage ) {
        localStorage.setItem( "_lastSave", _GenerateSave() );

    } else {
        if ( !!_GetCookie( "hasCookie" ) ) {
            _SetCookie( "_lastSave", _GenerateSave() );

        } else {
            _DownloadFile( `${encodeURIComponent( _GenerateSave() )}`,
                           "lastsave.txt" );
        }
    }
}

function _GenerateSave() {
    let l_saveData = `${
        escape(
            g_divCounter )}\|`; // Example:
                                // "50|choiceValue3,choiceValue11,choiceValue1"

    for ( let _menuChoice of g_menuChoices ) {
        l_saveData += escape( _menuChoice ) + "\|";
    }

    return ( l_saveData );
}

function _Open( _file ) { window.open( _file, "_self" ); }

function _GetCountOfChildElements( _parent ) {
    let l_relevantChildCount = 0;

    for ( let _child of _parent.childNodes ) {
        if ( _child.nodeType != 3 ) {
            l_relevantChildCount++;
        }
    }

    return ( l_relevantChildCount );
}

function _ChooseMenuInput( _this, _index ) {
    for ( let _div of document.querySelectorAll( "._count" + _index ) ) {
        _div.classList.add( "disabled" );
        _div.removeAttribute( "onclick" );
    }

    _this.classList.add( "active" );
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

function _PlayBase64( _type, _base64, _fileType = "mp3", _loop = true ) {
    switch ( _type ) {
        case media_t.music: {
            if ( g_audioMusic ) {
                _Stop( _type );
            }

            g_audioMusic =
                new Audio( `data:audio/${_fileType};base64, ${_base64}` );
            g_audioMusic.volume = ( $( "volumeMusic" ).value / 100 );
            g_audioMusic.loop = _loop;
            g_audioMusic.autoplay = true;

            break;
        }

        case media_t.sound: {
            let l_audioSound =
                new Audio( `data:audio/${_fileType};base64, ${_base64}` );
            l_audioSound.volume = ( $( "volumeSounds" ).value / 100 );
            l_audioSound.autoplay = true;
            l_audioSound.onended = ( _event ) => { g_soundVector.pop(); };

            g_soundVector.push( l_audioSound );

            break;
        }

        default: {
            console.log( `Cannot play, unsupported media type: ${
                _type.toString( 10 )}.` );
        }
    }
}

function _Play( _type, _path, _loop = true ) {
    switch ( _type ) {
        case media_t.music: {
            if ( g_audioMusic ) {
                _Stop( _type );
            }

            g_audioMusic = new Audio( `./audio/${_path}` );
            g_audioMusic.volume = ( $( "volumeMusic" ).value / 100 );
            g_audioMusic.loop = _loop;
            g_audioMusic.autoplay = true;

            console.log( g_audioMusic );

            break;
        }

        case media_t.sound: {
            let l_audioSound = new Audio( `./audio/${_path}` );
            l_audioSound.volume = ( $( "volumeSounds" ).value / 100 );
            l_audioSound.autoplay = true;
            l_audioSound.onended = ( _event ) => { g_soundVector.pop(); };

            g_soundVector.push( l_audioSound );

            console.log( l_audioSound );

            break;
        }

        default: {
            console.log( `Cannot play ${_path} , unsupported media type: ${
                _type.toString( 10 )}.` );
        }
    }
}

function _Pause( _type ) {
    switch ( _type ) {
        case media_t.music: {
            g_audioMusic.pause();

            break;
        }

        case media_t.sound: {
            for ( let _audioSound of g_soundVector ) {
                _audioSound.pause();
            }

            break;
        }

        default: {
            console.log( `Cannot stop, unsupported media type: ${
                _type.toString( 10 )}.` );
        }
    }
}

function _Stop( _type ) {
    switch ( _type ) {
        case media_t.music: {
            g_audioMusic.pause();
            g_audioMusic.currentTime = 0;

            break;
        }

        case media_t.sound: {
            for ( let _audioSound of g_soundVector ) {
                _audioSound.pause();
                _audioSound.currentTime = 0;
            }

            break;
        }

        default: {
            console.log( `Cannot stop, unsupported media type: ${
                _type.toString( 10 )}.` );
        }
    }
}

function _Resume( _type ) {
    switch ( _type ) {
        case media_t.music: {
            g_audioMusic.resume();

            break;
        }

        case media_t.sound: {
            for ( let _audioSound of g_soundVector ) {
                _audioSound.resume();
            }

            break;
        }

        default: {
            console.log( `Cannot stop, unsupported media type: ${
                _type.toString( 10 )}.` );
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

function _Scene( _fileName = "none", _appearance = appearance_t.fade ) {
    async function l_TransitionEndCallback() {
        document.body.removeEventListener( _TransitionEndEventName(),
                                           l_TransitionEndCallback );

        await sleep( 0 );

        document.body.style.backgroundImage = _fileName;

        switch ( _appearance ) {
            case appearance_t.fade: {
                document.body.style.opacity = 1.0;

                break;
            }

            default: {
                throw ( `On End.\n_filename: \"${_fileName}\", _appearance: \"${
                    _appearance}\"` );
            }
        }
    }

    document.body.addEventListener( _TransitionEndEventName(),
                                    l_TransitionEndCallback );

    setTimeout( () => {
        switch ( _appearance ) {
            case appearance_t.fade: {
                document.body.style.opacity = 0.0;

                break;
            }

            default: {
                throw ( `On Begin.\n_filename: \"${
                    _fileName}\", _appearance: \"${_appearance}\"` );
            }
        }
    } );
}

function _Show( _filename = "none", _appearance = appearance_t.fade ) {}

function _MenuName( _text ) {
    g_menuCounter++;

    if ( g_divCounter < g_loadDivCounter ) {
        return;
    }

    if ( ( !_text ) && ( !!$( "_con" + g_divCounter ) ) ) {
        $( "_con" + g_divCounter ).innerHTML +=
            "<div class=\"d-grid gap-2 d-sm-flex flex-wrap justify-content-sm-center\" id=\"_menu" +
            g_menuCounter + "\">" +
            "</div>";

    } else {
        $( "msg" ).innerHTML +=
            "<div class=\"bg-dark text-secondary px-4 py-5 text-center\" id=\"_div" +
            g_menuCounter + "_menu\">" +
            "<div class=\"py-5\">" +
            `<h1 class=\"display-5 fw-bold text-white\">${_text}</h1>` +
            "<div class=\"col-lg-10 mx-auto\">" +
            "<div class=\"d-grid gap-2 d-sm-flex flex-wrap justify-content-sm-center\" id=\"_menu" +
            g_menuCounter + "\">" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class=\"b-example-divider\" id=\"_divider" + g_menuCounter +
            "_menu\"></div>";

        g_characterName = "";
        g_textColor = "";

        setTimeout( () => {
            $( "_div" + g_menuCounter + "_menu" ).classList.add( "transition" );
            $( "_divider" + g_menuCounter + "_menu" )
                .classList.add( "transition" );
            $( "_div" + g_menuCounter + "_menu" ).scrollIntoView();

            if ( !!$( "_div" + ( g_divCounter - 1 ) + "_menu" ) ) {
                $( "_div" + ( g_menuCounter - 1 ) + "_menu" )
                    .parentNode.removeChild(
                        $( "_div" + ( g_menuCounter - 1 ) + "_menu" ) );
                $( "_divider" + ( g_menuCounter - 1 ) + "_menu" )
                    .parentNode.removeChild(
                        $( "_divider" + ( g_menuCounter - 1 ) + "_menu" ) );
            }
        } );
    }
}

async function _MenuLabel( _text, _function ) {
    if ( ( g_divCounter >= g_loadDivCounter ) &&
         ( !!$( "_menu" + g_menuCounter ) ) ) {
        if ( typeof this[ _text ] !== "undefined" ) {
            $( "_menu" + g_menuCounter ).innerHTML +=
    "<input type=\"text\" class=\"form-control text-center _count" + g_menuCounter +
    `\" oninput=\"${ _text } = this.value\" onpaste=\"this.readOnly = true; _ChooseMenuInput( this, ${ g_menuCounter } ); if ( g_menuCounter > g_menuChoices.length ) { g_menuChoices.push( &quot;${ _text }&quot; ); } !${ _function.toString().replaceAll( "\"", "&quot;") }();\">`;

            await setTimeout( async () => {
                while ( !g_typingComplete ) {
                    await sleep( 20 );
                }

                for ( let _div of document.querySelectorAll( "input._count" +
                                                             g_menuCounter ) ) {
                    _div.classList.add( "transition" );
                }
            } );

        } else {
            let l_even = ( g_even ) ? "light" : "info";

            g_even = !g_even;

            $( "_menu" + g_menuCounter ).innerHTML +=
    "<button type=\"button\" class=\"btn btn-outline-" + l_even +
      " btn-lg px-4 _count" + g_menuCounter +
      `\" onclick=\"_ChooseMenuInput( this, ${ g_menuCounter } ); if ( g_menuCounter > g_menuChoices.length ) { g_menuChoices.push( &quot;${ _text }&quot; ); } !${ _function.toString().replaceAll( "\"", "&quot;") }();\">` +
    _text +
    "</button>" +
    "<br></br>";

            await setTimeout( async () => {
                while ( !g_typingComplete ) {
                    await sleep( 20 );
                }

                for ( let _div of document.querySelectorAll( "button._count" +
                                                             g_menuCounter ) ) {
                    _div.classList.add( "transition" );
                }
            } );
        }
    } else {
        if ( g_menuChoices[ g_menuCounter - 1 ] === _text ) {
            _function();
        }
    }
}

const _WaitInput = async function( delay = 500 ) {
    if ( g_divCounter < g_loadDivCounter ) {
        return;
    }

    while ( !g_typingComplete ) {
        await sleep( delay );
    }

    g_needSkip = true;

    while ( !g_skipped ) {
        await sleep( delay );
    }

    g_skipped = false;
    g_needSkip = false;
};

function Character( { name = "", color = "#ffffff" } = {} ) {
    g_characterName = name;
    g_textColor = "style=\"color: " + color + "\"";

    return ( _Say );
}

// Dart compatibility

// Function aliases

const RemoveHash = () => _RemoveHash();
const TransitionEndEventName = () => _TransitionEndEventName();
const SetCookie = ( _key, _value ) => _SetCookie( _key, _value );
const GetCookie = ( _key ) => _GetCookie( _key );
const DeleteCookie = ( _key ) => _DeleteCookie( _key );
const DownloadFile = ( _text, _filename = "save.js" ) =>
    _DownloadFile( _text, _filename );
const ReadFile = ( _path, _callback = console.log ) =>
    _ReadFile( _path, _callback );
const LoadSave = ( _path, _useLocalStorage = false ) =>
    _LoadSave( _path, _useLocalStorage );
const ParseSave = ( _lastSave ) => _ParseSave( _lastSave );
const CreateSave = ( _useLocalStorage = false ) =>
    _CreateSave( _useLocalStorage );
const GenerateSave = () => _GenerateSave();
const Open = ( _file ) => _Open( _file );
const GetCountOfChildElements = ( _parent ) =>
    _GetCountOfChildElements( _parent );
const ChooseMenuInput = ( _this, _index ) => _ChooseMenuInput( _this, _index );
const TypingText = ( _selector, _text ) => _TypingText( _selector, _text );
const PlayBase64 = ( _type, _base64, _fileType = "mp3", _loop = true ) =>
    _PlayBase64( _type, _base64, _fileType, _loop = true );
const Play = ( _type, _path, _loop = true ) => _Play( _type, _path, _loop );
const Pause = ( _type ) => _Pause( _type );
const Stop = ( _type ) => _Stop( _type );
const Resume = ( _type ) => _Resume( _type );
const Say = ( _text ) => _Say( _text );
const SayEx = ( _text, _beforeText = "<br></br>" ) =>
    _SayEx( _text, _beforeText );
const Scene = ( _fileName = "none", _appearance = null ) =>
    _Scene( _fileName, _appearance );
const Show = ( _filename = null, _appearance = null ) =>
    _Show( _filename, _appearance );
const MenuName = ( _text ) => _MenuName( _text );
const MenuLabel = ( _text, _function ) => _MenuLabel( _text, _function );
const WaitInput = ( delay = 500 ) => _WaitInput( delay );
