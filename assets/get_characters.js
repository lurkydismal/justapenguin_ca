import {charIdMap} from "./server/char_id_map.js";

for ( const [ id, char ] of Object.entries( charIdMap ) ) {
    for ( let _select of document.querySelectorAll( ".pchar" ) ) {
        let l_option = document.createElement( "option" );

        l_option.value = id;
        l_option.innerHTML = char.full;

        _select.appendChild( l_option );
    }
}
