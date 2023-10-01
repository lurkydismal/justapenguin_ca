window.top.document.title = `${config.app_name}: ${config.faq_page_title}`;

window.top.document.querySelector( "meta[property=\"og:description\"]" )
    .setAttribute( "content", config.faq_page_description );

import( config.markedJs_path ).then( ( _marked ) => {
    import( config.DOMPurifyJs_path ).then( ( _DOMPurify ) => {
        _ReadFile(
            config.faq_md_path,
            ( _data ) => {
                $( "faq-content" ).innerHTML =
                    DOMPurify.sanitize( marked.parse( _data ) );
            },
            "text",
            {
                headers : { "Content-Type" : "text/markdown; charset=utf-8" },
            },
        );
    } );
} );
