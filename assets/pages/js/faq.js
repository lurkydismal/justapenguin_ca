window.top.document.title = `${apps.name}: FAQ page`;

window.top.document.querySelector( "meta[property=\"og:description\"]" )
    .setAttribute( "content", "Frequently asked questions." );

import( "https://cdn.jsdelivr.net/npm/marked/marked.min.js" ).then( ( _marked ) => {
    import(
        "https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js" )
        .then( ( _DOMPurify ) => {
            fetch( "./server/templates/faq.md", {
                headers : { "Content-Type" : "text/markdown; charset=utf-8" }
            } )
                .then( ( _response ) => {
                    if ( !_response.ok ) {
                        throw ( new Error( "Network response was not OK." ) );
                    }

                    return ( _response.text() );
                } )
                .then( ( _data ) => {
                    $( "faq-content" ).innerHTML =
                        DOMPurify.sanitize( marked.parse( _data ) );
                } )
                .catch( ( _error ) => { console.error( 'Error:', _error ); } );
        } )
} );
