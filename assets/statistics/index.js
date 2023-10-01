window.top.document.title =
    `${config.app_name}:${config.statistics_page_title}`;

window.top.document.querySelector( "meta[property=\"og:description\"]" )
    .setAttribute( "content", config.statistics_page_description );

_UpdateTable(
    config.statistics_request_address,
    $( "players" ),
    "players",
);

$( "index-statistics" ).classList.remove( "d-none" );
