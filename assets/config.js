const config = {
    app_name : "placeholder",

    results_per_page : 50,
    results_page_indexes_per_page : 9,

    characters_page_title : "Characters page",
    characters_page_description : "Information and statistics for characters.",

    statistics_page_title : " Statistics page",
    statistics_page_description :
        "Various statistics for matches, characters and players.",

    faq_page_title : "FAQ page",
    faq_page_description : "Frequently asked questions.",
    faq_md_path : "./faq/faq.md",
    markedJs_path : "https://cdn.jsdelivr.net/npm/marked/marked.min.js",
    DOMPurifyJs_path :
        "https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.5/purify.min.js",

    character_request_address : "./characters_response.json",
    index_request_address : "./index_response.json",
    statistics_request_address : "./statistics_response.json",

    logo_image_path : "./logo/",

    character_avatar_path : "./characters/character_avatar/",
    character_image_path : "./characters/character_full/",

    image_extension : ".png",
};

export {config};
