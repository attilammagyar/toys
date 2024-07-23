(function () {

    "use strict";

    var MAX_GRADES = 15,
        GRADE_BAD = 0,
        GRADE_SOSO = 3,
        GRADE_GOOD = 5,
        GRADE_EASY = 9,
        EDITOR_EXIT_CONFIRM = (
            "You have unsaved changes in the card editor."
            + " Are you sure you want to navigate away and lose those changes?"
        ),
        DECK_PROPERTIES_EDITOR_EXIT_CONFIRM = (
            "You have unsaved changes in the deck properties editor."
            + " Are you sure you want to navigate away and lose those changes?"
        ),
        CANVAS_SIZE = 480,
        TOLERANCE = CANVAS_SIZE / 3,
        CLEAR_GESTURE_VERTICAL = - Math.round(CANVAS_SIZE * 0.55),
        KANJIVG_SIZE = 109,
        SCALE = CANVAS_SIZE / KANJIVG_SIZE,
        FULL_CIRCLE = 2 * Math.PI,
        KANJI_GRADES = [
            "",
            "jōyō 1",
            "jōyō 2",
            "jōyō 3",
            "jōyō 4",
            "jōyō 5",
            "jōyō 6",
            "",
            "junior high",
            "jinmeiyō (used in names)",
            "jinmeiyō (used in names)"
        ],
        FULL_WIDTH_ASCII_START = "！".charCodeAt(0),
        FULL_WIDTH_ASCII_END = "～".charCodeAt(0),
        FULL_WIDTH_ASCII_DIFF = FULL_WIDTH_ASCII_START - "!".charCodeAt(0),
        HALF_WIDTH_KATAKANA = "｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ",
        HALF_WIDTH_KATAKANA_FULL = "。「」、・ヲァィゥェォャュョッーアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン",
        is_debugging,
        perfect_score,
        builtin_decks,
        kanjivg,
        kanjidic,
        is_routing,
        deck,
        menu,
        menu_export_json,
        save_json_button,
        menu_export_tsv,
        load_dragndrop,
        load_input,
        load_ignore_tsv_header,
        load_fix_breaks,
        tsv_info,
        load_action,
        load_cancel,
        no_cards,
        practice_screen,
        load_screen,
        load_screen_title,
        builtins_screen,
        current_card,
        current_card_ref = null,
        characters,
        current_character_ref,
        revealed_chars,
        answered,
        score,
        next_card_ref_ref,
        card_refs,
        to_learn,
        practice_card,
        stats,
        grade_form,
        next_action,
        learn_button,
        message,
        message_timeout,
        last_order_reset,
        alert_modal,
        alert_message,
        alert_callback,
        confirm_modal,
        confirm_message,
        confirm_callback,
        all_cards,
        all_cards_list,
        all_cards_studied,
        all_cards_to_study,
        all_cards_histogram,
        all_cards_histogram_vis,
        deck_properties_screen,
        editor_screen,
        editor_title,
        editor_kanji,
        editor_kanji_orig,
        editor_pronunciation,
        editor_pronunciation_orig,
        editor_meaning,
        editor_meaning_orig,
        editor_notes,
        editor_notes_preview,
        editor_notes_orig,
        editor_mode,
        editor_card_ref,
        editor_buttons_new,
        editor_buttons_existing,
        editor_button_save,
        editor_button_save_new,
        is_drawing,
        undo_needed,
        undo_snapshot,
        is_waiting_for_click,
        freeze_until,
        is_done,
        is_showing_hint,
        hint_animation,
        hint_snapshot,
        hint_remaining_frames,
        is_teaching,
        is_teaching_paused,
        teach_animation,
        teach_snapshot,
        teach_frames,
        teach_frame,
        abs_max_distance_x,
        abs_max_distance_y,
        max_distance_y,
        start_pos,
        start_snapshot,
        start_time,
        prev_pos,
        prev_mid,
        prev_time,
        prev_stroke_width,
        next_stroke,
        next_stroke_svg_path,
        next_stroke_svg_path_length,
        stroke_segments,
        drawn_strokes,
        drawn_characters = [],
        dom_canvas,
        clean_canvas,
        revealed_canvas,
        canvas_ctx,
        ongoing_touch,
        max_stroke_width,
        min_stroke_width,
        practice_meaning,
        practice_kanji,
        practice_pronunciation,
        practice_kanji_details,
        practice_kanji_details_content,
        practice_kanji_details_notes,
        about_screen,
        deck_name_orig,
        meaning_language_orig,
        deck_name,
        meaning_language,
        notes_language,
        notes_language_orig,
        language_codes = [
            {"code": "", "name": "Unknown"},
            {"code": "ab", "name": "Abkhazian"},
            {"code": "aa", "name": "Afar"},
            {"code": "af", "name": "Afrikaans"},
            {"code": "ak", "name": "Akan"},
            {"code": "sq", "name": "Albanian"},
            {"code": "am", "name": "Amharic"},
            {"code": "ar", "name": "Arabic"},
            {"code": "an", "name": "Aragonese"},
            {"code": "hy", "name": "Armenian"},
            {"code": "as", "name": "Assamese"},
            {"code": "av", "name": "Avaric"},
            {"code": "ae", "name": "Avestan"},
            {"code": "ay", "name": "Aymara"},
            {"code": "az", "name": "Azerbaijani"},
            {"code": "bm", "name": "Bambara"},
            {"code": "ba", "name": "Bashkir"},
            {"code": "eu", "name": "Basque"},
            {"code": "be", "name": "Belarusian"},
            {"code": "bn", "name": "Bengali"},
            {"code": "bi", "name": "Bislama"},
            {"code": "bs", "name": "Bosnian"},
            {"code": "br", "name": "Breton"},
            {"code": "bg", "name": "Bulgarian"},
            {"code": "my", "name": "Burmese"},
            {"code": "ca", "name": "Catalan, Valencian"},
            {"code": "ch", "name": "Chamorro"},
            {"code": "ce", "name": "Chechen"},
            {"code": "ny", "name": "Chichewa, Chewa, Nyanja"},
            {"code": "zh", "name": "Chinese"},
            {"code": "cv", "name": "Chuvash"},
            {"code": "kw", "name": "Cornish"},
            {"code": "co", "name": "Corsican"},
            {"code": "cr", "name": "Cree"},
            {"code": "hr", "name": "Croatian"},
            {"code": "cs", "name": "Czech"},
            {"code": "da", "name": "Danish"},
            {"code": "dv", "name": "Divehi, Dhivehi, Maldivian"},
            {"code": "nl", "name": "Dutch, Flemish"},
            {"code": "dz", "name": "Dzongkha"},
            {"code": "en", "name": "English"},
            {"code": "eo", "name": "Esperanto"},
            {"code": "et", "name": "Estonian"},
            {"code": "ee", "name": "Ewe"},
            {"code": "fo", "name": "Faroese"},
            {"code": "fj", "name": "Fijian"},
            {"code": "fi", "name": "Finnish"},
            {"code": "fr", "name": "French"},
            {"code": "ff", "name": "Fulah"},
            {"code": "gl", "name": "Galician"},
            {"code": "ka", "name": "Georgian"},
            {"code": "de", "name": "German"},
            {"code": "el", "name": "Greek, Modern (1453-)"},
            {"code": "gn", "name": "Guarani"},
            {"code": "gu", "name": "Gujarati"},
            {"code": "ht", "name": "Haitian, Haitian Creole"},
            {"code": "ha", "name": "Hausa"},
            {"code": "he", "name": "Hebrew"},
            {"code": "hz", "name": "Herero"},
            {"code": "hi", "name": "Hindi"},
            {"code": "ho", "name": "Hiri Motu"},
            {"code": "hu", "name": "Hungarian"},
            {"code": "ia", "name": "Interlingua (International Auxiliary Language Association)"},
            {"code": "id", "name": "Indonesian"},
            {"code": "ie", "name": "Interlingue, Occidental"},
            {"code": "ga", "name": "Irish"},
            {"code": "ig", "name": "Igbo"},
            {"code": "ik", "name": "Inupiaq"},
            {"code": "io", "name": "Ido"},
            {"code": "is", "name": "Icelandic"},
            {"code": "it", "name": "Italian"},
            {"code": "iu", "name": "Inuktitut"},
            {"code": "ja", "name": "Japanese"},
            {"code": "jv", "name": "Javanese"},
            {"code": "kl", "name": "Kalaallisut, Greenlandic"},
            {"code": "kn", "name": "Kannada"},
            {"code": "kr", "name": "Kanuri"},
            {"code": "ks", "name": "Kashmiri"},
            {"code": "kk", "name": "Kazakh"},
            {"code": "km", "name": "Central Khmer"},
            {"code": "ki", "name": "Kikuyu, Gikuyu"},
            {"code": "rw", "name": "Kinyarwanda"},
            {"code": "ky", "name": "Kirghiz, Kyrgyz"},
            {"code": "kv", "name": "Komi"},
            {"code": "kg", "name": "Kongo"},
            {"code": "ko", "name": "Korean"},
            {"code": "ku", "name": "Kurdish"},
            {"code": "kj", "name": "Kuanyama, Kwanyama"},
            {"code": "la", "name": "Latin"},
            {"code": "lb", "name": "Luxembourgish, Letzeburgesch"},
            {"code": "lg", "name": "Ganda"},
            {"code": "li", "name": "Limburgan, Limburger, Limburgish"},
            {"code": "ln", "name": "Lingala"},
            {"code": "lo", "name": "Lao"},
            {"code": "lt", "name": "Lithuanian"},
            {"code": "lu", "name": "Luba-Katanga"},
            {"code": "lv", "name": "Latvian"},
            {"code": "gv", "name": "Manx"},
            {"code": "mk", "name": "Macedonian"},
            {"code": "mg", "name": "Malagasy"},
            {"code": "ms", "name": "Malay"},
            {"code": "ml", "name": "Malayalam"},
            {"code": "mt", "name": "Maltese"},
            {"code": "mi", "name": "Maori"},
            {"code": "mr", "name": "Marathi"},
            {"code": "mh", "name": "Marshallese"},
            {"code": "mn", "name": "Mongolian"},
            {"code": "na", "name": "Nauru"},
            {"code": "nv", "name": "Navajo, Navaho"},
            {"code": "nd", "name": "North Ndebele"},
            {"code": "ne", "name": "Nepali"},
            {"code": "ng", "name": "Ndonga"},
            {"code": "nb", "name": "Norwegian Bokmål"},
            {"code": "nn", "name": "Norwegian Nynorsk"},
            {"code": "no", "name": "Norwegian"},
            {"code": "ii", "name": "Sichuan Yi, Nuosu"},
            {"code": "nr", "name": "South Ndebele"},
            {"code": "oc", "name": "Occitan"},
            {"code": "oj", "name": "Ojibwa"},
            {"code": "cu", "name": "Church Slavic, Old Slavonic, Church Slavonic, Old Bulgarian, Old Church Slavonic"},
            {"code": "om", "name": "Oromo"},
            {"code": "or", "name": "Oriya"},
            {"code": "os", "name": "Ossetian, Ossetic"},
            {"code": "pa", "name": "Punjabi, Panjabi"},
            {"code": "pi", "name": "Pali"},
            {"code": "fa", "name": "Persian"},
            {"code": "pl", "name": "Polish"},
            {"code": "ps", "name": "Pashto, Pushto"},
            {"code": "pt", "name": "Portuguese"},
            {"code": "qu", "name": "Quechua"},
            {"code": "rm", "name": "Romansh"},
            {"code": "rn", "name": "Rundi"},
            {"code": "ro", "name": "Romanian, Moldavian, Moldovan"},
            {"code": "ru", "name": "Russian"},
            {"code": "sa", "name": "Sanskrit"},
            {"code": "sc", "name": "Sardinian"},
            {"code": "sd", "name": "Sindhi"},
            {"code": "se", "name": "Northern Sami"},
            {"code": "sm", "name": "Samoan"},
            {"code": "sg", "name": "Sango"},
            {"code": "sr", "name": "Serbian"},
            {"code": "gd", "name": "Gaelic, Scottish Gaelic"},
            {"code": "sn", "name": "Shona"},
            {"code": "si", "name": "Sinhala, Sinhalese"},
            {"code": "sk", "name": "Slovak"},
            {"code": "sl", "name": "Slovenian"},
            {"code": "so", "name": "Somali"},
            {"code": "st", "name": "Southern Sotho"},
            {"code": "es", "name": "Spanish, Castilian"},
            {"code": "su", "name": "Sundanese"},
            {"code": "sw", "name": "Swahili"},
            {"code": "ss", "name": "Swati"},
            {"code": "sv", "name": "Swedish"},
            {"code": "ta", "name": "Tamil"},
            {"code": "te", "name": "Telugu"},
            {"code": "tg", "name": "Tajik"},
            {"code": "th", "name": "Thai"},
            {"code": "ti", "name": "Tigrinya"},
            {"code": "bo", "name": "Tibetan"},
            {"code": "tk", "name": "Turkmen"},
            {"code": "tl", "name": "Tagalog"},
            {"code": "tn", "name": "Tswana"},
            {"code": "to", "name": "Tonga (Tonga Islands)"},
            {"code": "tr", "name": "Turkish"},
            {"code": "ts", "name": "Tsonga"},
            {"code": "tt", "name": "Tatar"},
            {"code": "tw", "name": "Twi"},
            {"code": "ty", "name": "Tahitian"},
            {"code": "ug", "name": "Uighur, Uyghur"},
            {"code": "uk", "name": "Ukrainian"},
            {"code": "ur", "name": "Urdu"},
            {"code": "uz", "name": "Uzbek"},
            {"code": "ve", "name": "Venda"},
            {"code": "vi", "name": "Vietnamese"},
            {"code": "vo", "name": "Volapük"},
            {"code": "wa", "name": "Walloon"},
            {"code": "cy", "name": "Welsh"},
            {"code": "wo", "name": "Wolof"},
            {"code": "fy", "name": "Western Frisian"},
            {"code": "xh", "name": "Xhosa"},
            {"code": "yi", "name": "Yiddish"},
            {"code": "yo", "name": "Yoruba"},
            {"code": "za", "name": "Zhuang, Chuang"},
            {"code": "zu", "name": "Zulu"}
        ],
        known_languages = {};

    function main()
    {
        var tilde_key = kanji_to_key("~");

        is_debugging = String(window.location.href).match(/#debug/);

        builtin_decks = window.builtin_decks;
        kanjivg = window.kanjivg;
        kanjidic = window.kanjidic;

        if (!kanjivg.hasOwnProperty(tilde_key)) {
            kanjivg[tilde_key] = [
                "~", ["M20.0,54.5 c34.5,-35.0,34.5,35.0,69.0,0.0"]
            ];
        }

        initialize_languages();
        initialize_gui();
        initialize_perfect_score();
        restore_state();
        route();
    }

    function route()
    {
        var url = String(window.location.href),
            match, num, is_card_changed, rc;

        is_routing = true;
        stop_teaching();

        if (match = url.match(/#q-([0-9]+)(-([0-9]+))?$/)) {
            num = Number(match[1]) - 1;

            if (num >= 0 && num < deck["cards"].length) {
                hide(grade_form);
                hide(practice_pronunciation);
                is_card_changed = current_card_ref !== num;
                rc = revealed_chars;
                store_pick(num);
                reset_current_character();
                show_next_character_prompt();
                show_practice_screen();
                show_current_card();

                if (match[3]) {
                    num = Number(match[3]) - 1;

                    if (num >= 0 && num < characters.length && num <= drawn_characters.length) {
                        current_character_ref = num;

                        if (is_card_changed) {
                            set_revealed_chars(num);
                        } else {
                            set_revealed_chars(Math.max(rc, num));
                        }

                        show_next_character_prompt();
                    }
                }

                is_routing = false;

                return;
            }
        } else if (match = url.match(/#e-([0-9]+)$/)) {
            num = Number(match[1]) - 1;

            if (num >= 0 && num < deck["cards"].length) {
                edit_card(num);

                is_routing = false;

                return;
            }
        } else if (match = url.match(/#load$/)) {
            start_practising();
            handle_load_confirmation();
            is_routing = false;

            return;
        } else if (match = url.match(/#imp$/)) {
            start_practising();
            handle_import_tsv_confirmation();
            is_routing = false;

            return;
        } else if (match = url.match(/#builtins$/)) {
            start_practising();
            handle_menu_builtins_click();
            is_routing = false;

            return;
        } else if (match = url.match(/#new$/)) {
            start_practising();
            show_card_editor("new-card", "", "", "", "");
            is_routing = false;

            return;
        } else if (match = url.match(/#all$/)) {
            start_practising();
            show_all_cards();
            is_routing = false;

            return;
        } else if (url.match(/#top$/)) {
            if (current_card_ref !== null) {
                hide(grade_form);
                hide(practice_pronunciation);
                store_pick(current_card_ref);
                reset_current_character();
                show_next_character_prompt();
                show_practice_screen();
                show_current_card();

                is_routing = false;

                return;
            }
        } else if (url.match(/#deck-properties/)) {
            start_practising();
            show_deck_properties_editor();
            is_routing = false;

            return;
        } else if (url.match(/#about/)) {
            start_practising();
            show_about_screen();
            is_routing = false;

            return;
        }

        is_routing = false;
        start_practising();
    }

    function initialize_perfect_score()
    {
        var perfect_grades = [],
            perfect_grade = 0.6 * GRADE_GOOD + 0.4 * GRADE_EASY,
            i;

        for (i = 0; i < MAX_GRADES; ++i) {
            perfect_grades.push(perfect_grade);
        }

        perfect_score = calculate_score(perfect_grades);
    }

    function initialize_gui()
    {
        var i, si, file_name, e;

        message_timeout = null;

        load_deck(
            {
                "name": "flashcards",
                "meaning_language": "en",
                "notes_language": "ja",
                "cards": []
            }
        );
        menu = $("menu");
        load_dragndrop = $("load-dragndrop");
        load_input = $("load-input");
        load_ignore_tsv_header = $("load-tsv-header");
        load_fix_breaks = $("load-tsv-fix-breaks");
        tsv_info = $("tsv-info");
        load_screen = $("load-screen");
        load_screen_title = $("load-screen-title");
        builtins_screen = $("builtins-screen");
        practice_screen = $("practice-screen")
        no_cards = $("no-cards");
        practice_card = $("practice-card");
        grade_form = $("grade");
        stats = $("stats");
        learn_button = $("learn-button");
        message = $("message");
        menu_export_json = $("menu-export-json");
        save_json_button = $("save-json-button")
        menu_export_tsv = $("menu-export-tsv");
        alert_modal = $("alert");
        alert_message = $("alert-message");
        confirm_modal = $("confirm");
        confirm_message = $("confirm-message");
        all_cards = $("all-cards");
        all_cards_list = $("all-cards-list");
        all_cards_studied = $("all-cards-studied");
        all_cards_to_study = $("all-cards-to-study");
        all_cards_histogram = [
            $("histogram-0"),
            $("histogram-1"),
            $("histogram-2"),
            $("histogram-3"),
            $("histogram-4"),
            $("histogram-5"),
            $("histogram-6"),
            $("histogram-7"),
            $("histogram-8"),
            $("histogram-9")
        ];
        all_cards_histogram_vis = [
            $("histogram-vis-0"),
            $("histogram-vis-1"),
            $("histogram-vis-2"),
            $("histogram-vis-3"),
            $("histogram-vis-4"),
            $("histogram-vis-5"),
            $("histogram-vis-6"),
            $("histogram-vis-7"),
            $("histogram-vis-8"),
            $("histogram-vis-9")
        ];
        editor_screen = $("editor-screen");
        editor_title = $("editor-title");
        deck_properties_screen = $("deck-properties-screen");
        editor_kanji = $("kanji");
        editor_pronunciation = $("pronunciation");
        editor_meaning = $("meaning");
        editor_buttons_existing = $("editor-buttons-existing");
        editor_buttons_new = $("editor-buttons-new");
        editor_button_save = $("edit-save");
        editor_button_save_new = $("edit-save-new");
        editor_notes = $("notes");
        editor_notes_preview = $("notes-preview");
        editor_kanji_orig = "";
        editor_pronunciation_orig = "";
        editor_meaning_orig = "";
        editor_notes_orig = "";
        practice_meaning = $("practice-meaning");
        practice_kanji = $("practice-kanji");
        practice_kanji.onclick = handle_kanji_click;
        practice_pronunciation = $("practice-pronunciation");
        practice_pronunciation.onclick = handle_pronunciation_click;
        practice_kanji_details = $("practice-kanji-details");
        practice_kanji_details_content = $("practice-kanji-details-content");
        practice_kanji_details_notes = $("practice-kanji-details-notes");
        deck_name = $("deck-name");
        meaning_language = $("meaning-language");
        notes_language = $("notes-language");
        about_screen = $("about-screen");
        deck_name_orig = null;
        meaning_language_orig = null;
        notes_language_orig = null;

        $("practice-form").onsubmit = stop_event;
        $("editor-form").onsubmit = stop_event;
        $("deck-properties-form").onsubmit = stop_event;
        $("load-form").onsubmit = stop_event;
        $("menu-button").onclick = handle_menu_button_click;
        $("menu-hide").onclick = handle_hide_menu_click;
        $("menu-load").onclick = handle_menu_load_click;
        $("no-cards-load").onclick = handle_menu_load_click;
        $("menu-import-tsv").onclick = handle_menu_import_tsv_click;
        $("no-cards-import").onclick = handle_menu_import_tsv_click;
        $("menu-builtins").onclick = handle_menu_builtins_click;
        $("no-cards-builtins").onclick = handle_menu_builtins_click;
        $("builtins-back").onclick = handle_builtins_back_click;
        $("builtins-hiragana").onclick = handle_builtins_hiragana_click;
        $("builtins-katakana").onclick = handle_builtins_katakana_click;
        $("builtins-basic-kanji").onclick = handle_builtins_basic_kanji_click;
        $("builtins-lower-intermediate-kanji").onclick = handle_lower_intermediate_kanji_click;
        $("menu-add-tsv").onclick = handle_menu_add_tsv_click;
        $("menu-about").onclick = handle_menu_about_click;
        $("about-back").onclick = handle_about_back_click;
        $("alert-ok").onclick = handle_alert_ok_click;
        $("confirm-yes").onclick = handle_confirm_yes_click;
        $("confirm-no").onclick = handle_confirm_no_click;
        $("load-cancel").onclick = handle_load_cancel_click;
        $("grade-bad").onclick = handle_grade_bad_click;
        $("grade-soso").onclick = handle_grade_soso_click;
        $("grade-good").onclick = handle_grade_good_click;
        $("grade-easy").onclick = handle_grade_easy_click;
        $("menu-show-all").onclick = handle_menu_show_all_click;
        $("menu-edit").onclick = handle_menu_edit_click;
        $("edit-cancel").onclick = handle_edit_cancel_click;
        $("menu-create").onclick = handle_menu_create_click;
        $("menu-deck").onclick = handle_menu_deck_click;
        $("deck-save").onclick = handle_deck_properties_save_click;
        $("deck-back").onclick = handle_deck_properties_cancel_click;
        $("no-cards-create").onclick = handle_menu_create_click;
        $("edit-back").onclick = handle_edit_cancel_click;
        $("clear-button").onclick = handle_clear_click;
        $("hint-button").onclick = handle_hint_click;
        $("teach-button").onclick = handle_teach_click;
        $("details-button").onclick = handle_kanji_details_click;
        $("practice-kanji-details-close").onclick = handle_kanji_details_close_click;

        editor_notes.onblur = handle_editor_notes_blur;
        editor_notes.onchange = handle_editor_notes_blur;
        editor_button_save.onclick = handle_edit_save_click;
        editor_button_save_new.onclick = handle_edit_save_new_click;

        menu_export_json.onclick = handle_menu_export_json_click;
        save_json_button.onclick = handle_save_json_click;
        menu_export_tsv.onclick = handle_menu_export_tsv_click;

        learn_button.onclick = handle_learn_button_click;

        load_input.onchange = handle_load_input_change;
        load_dragndrop.ondrop = handle_file_drop;
        load_dragndrop.ondragover = stop_event;

        practice_card.onclick = handle_practice_card_click;

        populate_card_editor("new-card", "", "", "", "");

        window.addEventListener("drop", stop_event);
        window.addEventListener("dragover", stop_event);
        window.addEventListener("beforeunload", handle_beforeunload);
        window.addEventListener("popstate", handle_popstate);

        initialize_canvas();

        try {
            file_name = window.location.href.match(/([^/#]*)(#.*)?$/)[1];

            if (!file_name) {
                file_name = "index.html";
            }

            $("download-button").setAttribute("href", file_name);
        } catch (e) {
        }
    }

    function initialize_languages()
    {
        var kl = known_languages,
            i, l, lng;

        for (i = 0, l = language_codes.length; i < l; ++i) {
            lng = language_codes[i];
            kl["l" + lng["code"]] = lng["name"];
        }
    }

    function initialize_canvas()
    {
        is_drawing = false;
        undo_needed = false;
        prev_pos = [0, 0];
        prev_mid = null;
        prev_time = 0;
        prev_stroke_width = 0;
        drawn_strokes = [];
        stroke_segments = [];

        dom_canvas = $("practice-canvas");
        canvas_ctx = dom_canvas.getContext("2d");
        ongoing_touch = null;

        dom_canvas.ontouchstart = handle_canvas_touch_start;
        dom_canvas.ontouchmove = handle_canvas_touch_move;
        dom_canvas.ontouchend = handle_canvas_touch_end;
        dom_canvas.ontouchcancel = handle_canvas_touch_end;

        dom_canvas.onmousedown = handle_canvas_mouse_down;
        dom_canvas.onmousemove = handle_canvas_mouse_move;
        dom_canvas.onmouseup = handle_canvas_mouse_up;
        dom_canvas.onmouseleave = handle_canvas_mouse_leave;
        dom_canvas.onclick = stop_event;

        min_stroke_width = Math.max(1, CANVAS_SIZE / 60);
        max_stroke_width = min_stroke_width * 4.2;

        canvas_ctx.canvas.width = CANVAS_SIZE;
        canvas_ctx.canvas.height = CANVAS_SIZE;

        clear_canvas();
        clean_canvas = make_canvas_snapshot();
    }

    function clear_canvas()
    {
        var guides = new Path2D("M 1,1 L 478,478 M 478,1 L 1,478 M 1,239 L 478,239 M 239,1 L 239,478");

        canvas_ctx.fillStyle = "#000000";
        canvas_ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        canvas_ctx.strokeStyle = "#5a5a5a";
        canvas_ctx.lineWidth = 2;
        canvas_ctx.stroke(guides);
    }

    function make_canvas_snapshot()
    {
        return canvas_ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

    function restore_canvas_snapshot(snapshot)
    {
        canvas_ctx.putImageData(snapshot, 0, 0);
    }

    function handle_canvas_touch_start(evt)
    {
        var t, ct;

        if (ongoing_touch !== null) {
            return stop_event(evt);
        }

        ct = evt.changedTouches;

        if (ct.length < 1) {
            return stop_event(evt);
        }

        t = ct[0];

        ongoing_touch = t.identifier;
        start_drawing([t.pageX, t.pageY]);

        return stop_event(evt);
    }

    function handle_canvas_touch_move(evt)
    {
        var i, l, t, ct;

        if (ongoing_touch === null) {
            return stop_event(evt);
        }

        ct = evt.changedTouches;

        for (i = 0, l = ct.length; i < l; ++i) {
            t = ct[i];

            if (t.identifier === ongoing_touch) {
                draw([t.pageX, t.pageY]);
                break;
            }
        }

        return stop_event(evt);
    }

    function handle_canvas_touch_end(evt)
    {
        var i, l, t, ct;

        if (this.ongoing_touch === null) {
            return stop_event(evt);
        }

        ct = evt.changedTouches;

        for (i = 0, l = ct.length; i < l; ++i) {
            t = ct[i];

            if (t.identifier === ongoing_touch) {
                stop_drawing([t.pageX, t.pageY], true);
                ongoing_touch = null;
                break;
            }
        }

        return stop_event(evt);
    }

    function handle_canvas_mouse_down(evt)
    {
        start_drawing([evt.pageX, evt.pageY]);

        return stop_event(evt);
    }

    function handle_canvas_mouse_move(evt)
    {
        draw([evt.pageX, evt.pageY]);

        return stop_event(evt);
    }

    function handle_canvas_mouse_up(evt)
    {
        stop_drawing([evt.pageX, evt.pageY], true);

        return stop_event(evt);
    }

    function handle_canvas_mouse_leave(evt)
    {
        stop_drawing([evt.pageX, evt.pageY], false, true);

        return stop_event(evt);
    }

    function start_drawing(doc_pos)
    {
        if (is_nan(doc_pos)) {
            return;
        }

        if (undo_needed) {
            undo_incorrect_stroke();
        }

        start_pos = to_canvas_pos(doc_pos);
        abs_max_distance_x = 0;
        abs_max_distance_y = 0;
        max_distance_y = 0;

        if (is_done) {
            return;
        }

        if (is_waiting_for_click) {
            return;
        }

        if (is_showing_hint) {
            stop_showing_hint();
        }

        if (is_teaching) {
            pause_teaching();
        }

        is_drawing = true;
        stroke_segments = [];

        prev_pos = start_pos;
        prev_mid = null;
        prev_time = time();
        start_time = prev_time;
        start_snapshot = make_canvas_snapshot();

        prev_stroke_width = max_stroke_width / 2.4;
        draw(doc_pos);
    }

    function stop_drawing(doc_pos, is_click_end, needs_drawing)
    {
        var is_accepted;

        if ((is_drawing || is_waiting_for_click || is_done) && is_clear_gesture()) {
            is_drawing = false;
            clear_drawn_character();

            return;
        }

        if (is_waiting_for_click && is_click_end) {
            if (time() < freeze_until) {
                return;
            }

            is_waiting_for_click = false;
            ++current_character_ref;
            set_revealed_chars(Math.max(revealed_chars, current_character_ref));

            if (current_character_ref < characters.length) {
                show_next_character_prompt();
            } else {
                show_grade_form();
                is_done = true;
            }

            return;
        }

        if (is_done || !is_drawing) {
            return;
        }

        is_drawing = false;

        if (is_hint_gesture()) {
            restore_canvas_snapshot(start_snapshot);
            stroke_segments = [];

            if (is_teaching) {
                if (is_teaching_paused) {
                    continue_teaching();
                }
            } else {
                show_hint();
            }

            return;
        }

        if (needs_drawing) {
            draw(doc_pos);
        }

        is_accepted = is_stroke_acceptable();

        if (is_accepted) {
            drawn_strokes.push(stroke_segments);
        } else {
            undo_needed = true;
            undo_snapshot = start_snapshot;
            setTimeout(undo_incorrect_stroke, 50);
        }

        stroke_segments = [];

        if (is_accepted) {
            if (is_teaching && is_teaching_paused) {
                continue_teaching();
            }

            if (drawn_strokes.length < characters[current_character_ref]["strokes"].length) {
                update_next_stroke();
            } else {
                reveal_character();

                drawn_characters[current_character_ref] = make_canvas_snapshot();
                drawn_strokes = [];
                is_waiting_for_click = true;
                set_revealed_chars(Math.max(revealed_chars, current_character_ref + 1));
                freeze_until = time() + 0.3;

                if ((current_character_ref + 1) >= characters.length) {
                    show(practice_pronunciation);
                }
            }
        }
    }

    function undo_incorrect_stroke()
    {
        if (!undo_needed) {
            if (is_teaching) {
                continue_teaching();
            }

            return;
        }

        undo_needed = false;
        restore_canvas_snapshot(undo_snapshot);
        undo_snapshot = null;

        if (is_teaching) {
            continue_teaching();
        }
    }

    function is_clear_gesture()
    {
        return (abs_max_distance_x < 100) && (max_distance_y < CLEAR_GESTURE_VERTICAL);
    }

    function is_hint_gesture()
    {
        return ((abs_max_distance_x + abs_max_distance_y) <= 5) && (time() - start_time) <= 0.20;
    }

    function is_stroke_acceptable()
    {
        var drawn_start, drawn_end, correct_start, correct_end;

        drawn_start = stroke_segments[0][0];
        drawn_end = stroke_segments[stroke_segments.length - 1][1];

        correct_start = svg_point_at_length_to_canvas_pos(
            next_stroke_svg_path, 0
        );
        correct_end = svg_point_at_length_to_canvas_pos(
            next_stroke_svg_path, next_stroke_svg_path_length
        );

        return (
            (pdistance([correct_start.x, correct_start.y], drawn_start) <= TOLERANCE)
            && (pdistance([correct_end.x, correct_end.y], drawn_end) <= TOLERANCE)
        );
    }

    function svg_point_at_length_to_canvas_pos(svg_path, length)
    {
        var pos = svg_path.getPointAtLength(length);

        pos.x *= SCALE;
        pos.y *= SCALE;

        return pos;
    }

    function reset_current_character()
    {
        stop_animations();

        drawn_strokes = [];
        is_done = false;
        is_drawing = false;
        is_waiting_for_click = false;
        is_showing_hint = false;
        save_revealed_snapshot();
        reset_canvas();
        update_next_stroke();
    }

    function update_next_stroke()
    {
        next_stroke = characters[current_character_ref]["strokes"][drawn_strokes.length];
        next_stroke_svg_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        next_stroke_svg_path.setAttribute("d", next_stroke);
        next_stroke_svg_path_length = next_stroke_svg_path.getTotalLength();
    }

    function stop_animations()
    {
        if (is_showing_hint) {
            stop_showing_hint();
        }

        if (is_teaching) {
            stop_teaching();
        }
    }

    function reveal_character()
    {
        var stroke, segment,
            i, l, j, ll, redrawn;

        restore_canvas_snapshot(revealed_canvas);

        for (i = 0, l = drawn_strokes.length; i < l; ++i) {
            stroke = drawn_strokes[i];

            for (j = 0, ll = stroke.length; j < ll; ++j) {
                segment = stroke[j];
                draw_segment(segment[0], segment[1], segment[2], segment[3]);
            }
        }

        redrawn = canvas_ctx.createPattern(dom_canvas, "no-repeat");

        restore_canvas_snapshot(revealed_canvas);

        canvas_ctx.globalAlpha = 0.75;
        canvas_ctx.fillStyle = redrawn;
        canvas_ctx.beginPath();
        canvas_ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        canvas_ctx.fill();
        canvas_ctx.closePath();
        canvas_ctx.globalAlpha = 1.0;
    }

    function show_next_character_prompt()
    {
        hide(practice_kanji_details);

        practice_kanji_details_notes.innerHTML = "<h1>Notes</h1><div>" + format_text(current_card["notes"]) + "</div>";
        practice_kanji_details_content.innerHTML = build_kanji_details();

        push_history("q-" + String(current_card_ref + 1) + "-" + String(current_character_ref + 1));

        if (current_character_ref < drawn_characters.length && drawn_characters[current_character_ref]) {
            restore_canvas_snapshot(drawn_characters[current_character_ref]);

            is_waiting_for_click = true;
            freeze_until = 0;
        } else {
            reset_current_character();

            if (current_card["grades"].length < 1) {
                teach();
            }
        }
    }

    function build_kanji_details()
    {
        var components = characters[current_character_ref]["components"],
            html = [],
            kanji_node = "h1",
            has_info = false,
            i, l, c, k, d;

        for (i = 0, l = components.length; i < l; ++i) {
            c = components.substring(i, i + 1);
            k = kanji_to_key(c);

            if (!kanjidic.hasOwnProperty(k)) {
                continue;
            }

            has_info = true;
            d = kanjidic[k];
            html.push(format_kanji_details(kanji_node, c, d[0], d[1], d[2], d[3], d[4], d[5], d[6]));

            if (i === 0 && l > 1) {
                html.push("<h2>Components</h2>");
            }

            kanji_node = "h3";
        }

        if (!has_info) {
            html.push("<h1 lang=\"ja\">" + quote_html(c) + "</h1>");
            html.push("<div>(no details available)</div>")
        }

        return html.join("");
    }

    function format_kanji_details(
            kanji_node,
            kanji,
            grade,
            rad_names,
            nanoris,
            on_readings,
            kun_readings,
            meanings,
            jlpt
    ) {
        grade = (
            (0 < grade && grade < KANJI_GRADES.length) ? KANJI_GRADES[grade] : ""
        );

        return [
            "<" + kanji_node + " lang=\"ja\">" + quote_html(kanji) + "</" + kanji_node + ">",
            "<table>",
            make_kanji_detail_row("On readings", on_readings.join("、 "), "ja"),
            make_kanji_detail_row("Kun readings", kun_readings.join("、 "), "ja"),
            make_kanji_detail_row("Nanori", nanoris.join("、 "), "ja"),
            make_kanji_detail_row("Meanings", meanings.join("; ")),
            make_kanji_detail_row("Radical names", rad_names.join("、 "), "ja"),
            make_kanji_detail_row("Grade", grade),
            make_kanji_detail_row("JLPT (1-4)", jlpt),
            "</table>"
        ].join("");
    }

    function make_kanji_detail_row(title, text, lang)
    {
        return (
            "<tr><th>" + title + ":</th><td"
            + (lang ? " lang=\"" + lang + "\"" : "") + ">"
            + quote_html(text) + "</td></tr>"
        );
    }

    function save_revealed_snapshot()
    {
        var s, p, i, l, st, pos;

        reset_canvas();
        s = characters[current_character_ref]["strokes"];

        canvas_ctx.strokeStyle = "#6890c0";
        canvas_ctx.lineCap = "round";
        canvas_ctx.lineWidth = 3;
        canvas_ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvas_ctx.scale(SCALE, SCALE);

        for (i = 0, l = s.length; i < l; ++i) {
            p = new Path2D(s[i]);
            canvas_ctx.stroke(p);
        }

        for (i = 0, l = s.length; i < l; ++i) {
            st = document.createElementNS("http://www.w3.org/2000/svg", "path");
            st.setAttribute("d", s[i]);
            pos = st.getPointAtLength(0);
            canvas_ctx.fillStyle = "#d8ecff";
            canvas_ctx.beginPath();
            canvas_ctx.arc(pos.x, pos.y, 1, 0, FULL_CIRCLE);
            canvas_ctx.fill();
        }

        canvas_ctx.setTransform(1, 0, 0, 1, 0, 0);
        revealed_canvas = make_canvas_snapshot();
    }

    function reset_canvas()
    {
        restore_canvas_snapshot(clean_canvas);
    }

    function is_nan(pos)
    {
        return isNaN(pos[0]) || isNaN(pos[1]);
    }

    function to_canvas_pos(doc_pos)
    {
        var rect = dom_canvas.getClientRects()[0];

        return [
            (doc_pos[0] - rect.left) * dom_canvas.width / rect.width,
            (doc_pos[1] - rect.top) * dom_canvas.height / rect.height
        ];
    }

    function draw(doc_pos)
    {
        var mid, new_pos, now, time_d, pos_d, speed, decrease,
            abs_start_d_x, start_d_y, abs_start_d_y,
            new_stroke_width,
            i, l, w;

        if (!(is_drawing || is_waiting_for_click || is_done)) {
            return;
        }

        if (is_nan(doc_pos)) {
            return;
        }

        new_pos = to_canvas_pos(doc_pos);

        abs_start_d_x = Math.abs(new_pos[0] - start_pos[0]);
        start_d_y = new_pos[1] - start_pos[1];
        abs_start_d_y = Math.abs(start_d_y);

        if (abs_start_d_x > abs_max_distance_x) {
            abs_max_distance_x = abs_start_d_x;
        }

        if (abs_start_d_y > abs_max_distance_y) {
            abs_max_distance_y = abs_start_d_y;
            max_distance_y = start_d_y;
        }

        if (is_done || is_showing_hint || !is_drawing) {
            return;
        }

        now = time();

        time_d = Math.max(now - prev_time, 0.001);
        pos_d = pdistance(new_pos, prev_pos) / CANVAS_SIZE;
        speed =  pos_d / time_d;
        l = Math.min(1.0, pos_d * 5);
        decrease = 0.001 + Math.sqrt(speed);
        new_stroke_width = l * (prev_stroke_width / decrease) + (1.0 - l) * prev_stroke_width;
        prev_stroke_width = new_stroke_width;
        new_stroke_width = Math.round(new_stroke_width);

        if (new_stroke_width < min_stroke_width) {
            new_stroke_width = min_stroke_width;
        } else if (new_stroke_width > max_stroke_width) {
            new_stroke_width = max_stroke_width;
        }

        mid = vscale(0.5, vsum(prev_pos, new_pos));

        if (prev_mid !== null) {
            draw_segment(prev_mid, mid, prev_pos, new_stroke_width);
            stroke_segments.push([prev_mid, mid, prev_pos, new_stroke_width]);
        } else {
            draw_segment(prev_pos, mid, null, new_stroke_width);
            stroke_segments.push([prev_pos, mid, null, new_stroke_width]);
        }

        prev_mid = mid;
        prev_pos = new_pos;
        prev_time = now;

        if (
            (new_pos[0] < 0)
            || (new_pos[1] < 0)
            || (new_pos[0] > CANVAS_SIZE)
            || (new_pos[1] > CANVAS_SIZE)
        ) {
            stop_drawing(doc_pos, false, false);
        }
    }

    function draw_segment(pos1, pos2, control, stroke_width)
    {
        canvas_ctx.strokeStyle = "#f6f6f6";
        canvas_ctx.lineCap = "round";
        canvas_ctx.lineWidth = stroke_width;

        canvas_ctx.beginPath();
        canvas_ctx.moveTo(pos1[0], pos1[1]);

        if (control) {
            canvas_ctx.quadraticCurveTo(control[0], control[1], pos2[0], pos2[1]);
        } else {
            canvas_ctx.lineTo(pos2[0], pos2[1]);
        }
        canvas_ctx.stroke();
    }

    function ease(t)
    {
        return t * t * (3 - 2 * t);
    }

    function vscale(s, v)
    {
        var result = [],
            i, l;

        for (i = 0, l = v.length; i < l; ++i) {
            result.push(s * v[i]);
        }

        return result;
    }

    function vsum(v1, v2)
    {
        var result = [],
            i, l;

        for (i = 0, l = v1.length; i < l; ++i) {
            result.push(v1[i] + v2[i]);
        }

        return result;
    }

    function pdistance(p1, p2)
    {
        var dx = p1[0] - p2[0],
            dy = p1[1] - p2[1];

        return Math.sqrt(dx * dx + dy * dy);
    };

    function $(obj)
    {
        if (typeof(obj) === "string") {
            obj = document.getElementById(obj);
        }

        return obj;
    };

    function handle_kanji_click(evt)
    {
        set_revealed_chars(characters.length);

        return stop_event(evt);
    }

    function set_revealed_chars(rc)
    {
        revealed_chars = Math.min(rc, characters.length);

        update_kanji();
    }

    function update_kanji()
    {
        var i, l, s, k;

        practice_kanji.innerHTML = "";
        k = current_card["kanji"];
        l = Math.min(k.length, revealed_chars);

        if (revealed_chars > 0) {
            show(practice_kanji);
        } else {
            hide(practice_kanji);
        }

        for (i = 0; i < l; ++i) {
            s = document.createElement("span");
            s.setAttribute("lang", "ja");
            s.innerHTML = quote_html(k.substring(i, i + 1));

            if (i === current_character_ref) {
                s.setAttribute("class", "current");
            }

            practice_kanji.appendChild(s);
        }

        if ((revealed_chars < k.length) && (current_character_ref >= revealed_chars)) {
            s = document.createElement("span");
            s.setAttribute("lang", "ja");
            s.setAttribute("class", "current");
            s.innerHTML = "_";
            practice_kanji.appendChild(s);
        }
    }

    function handle_pronunciation_click(evt)
    {
        show(practice_pronunciation);

        return stop_event(evt);
    }

    function stop_event(evt)
    {
        evt = evt || event;
        evt.preventDefault();

        return false;
    }

    function handle_menu_button_click(evt)
    {
        show_menu();

        return stop_event(evt);
    }

    function show_menu()
    {
        stop_animations();
        push_history("top");
        show(menu);
    }

    function handle_hide_menu_click(evt)
    {
        hide(menu);

        return stop_event(evt);
    }

    function show(obj)
    {
        var cls;

        obj = $(obj);
        cls = obj.getAttribute("class") || "";
        obj.setAttribute("class", cls.replace(/(^| )hidden($| )/g, "$2"));
    }

    function hide(obj)
    {
        var cls;

        obj = $(obj);
        cls = obj.getAttribute("class") || "";
        obj.setAttribute("class", cls.replace(/(^| )hidden($| )/g, "$2") + " hidden");
    }

    function handle_menu_load_click(evt)
    {
        hide(menu);

        if (deck["cards"].length > 0) {
            ask_for_confirmation(
                "Loading another deck will replace the current one."
                + " It is recommended to save the current deck as a file before switching to another deck."
                + "<br/><br/>Are you sure you want to load a different deck?",
                handle_load_confirmation
            );
        } else {
            handle_load_confirmation();
        }

        return stop_event(evt);
    }

    function handle_menu_import_tsv_click(evt)
    {
        hide(menu);

        if (deck["cards"].length > 0) {
            ask_for_confirmation(
                "Importing another deck will replace the current one."
                + " It is recommended to save the current deck as a file before switching to another deck."
                + "<br/><br/>Are you sure you want to import a different deck?",
                handle_import_tsv_confirmation
            );
        } else {
            handle_import_tsv_confirmation();
        }

        return stop_event(evt);
    }

    function handle_menu_builtins_click(evt)
    {
        push_history("builtins");
        hide(menu);
        hide_all_screens();

        show(builtins_screen);

        return stop_event(evt);
    }

    function handle_builtins_back_click(evt)
    {
        show_practice_screen();

        return stop_event(evt);
    }

    function handle_builtins_hiragana_click(evt)
    {
        return handle_builtin_deck_click(evt, "hiragana");
    }

    function handle_builtins_katakana_click(evt)
    {
        return handle_builtin_deck_click(evt, "katakana");
    }

    function handle_builtins_basic_kanji_click(evt)
    {
        return handle_builtin_deck_click(evt, "basic_kanji");
    }

    function handle_lower_intermediate_kanji_click(evt)
    {
        return handle_builtin_deck_click(evt, "lower_intermediate_kanji");
    }

    function handle_builtin_deck_click(evt, deck_name)
    {
        if (deck["cards"].length > 0) {
            ask_for_confirmation(
                "Loading a built-in deck will replace the current one."
                + " It is recommended to save the current deck as a file before switching to another deck."
                + "<br/><br/>Are you sure you want to load a different deck?",
                function () { load_builtin_deck(deck_name); }
            );
        } else {
            load_builtin_deck(deck_name);
        }

        return stop_event(evt);
    }

    function load_builtin_deck(deck_name)
    {
        var deck;

        if (!builtin_decks.hasOwnProperty(deck_name)) {
            return;
        }

        deck = builtin_decks[deck_name];

        load_deck(deck);

        hide_all_screens();
        hide(grade_form);
        show_message("Loaded the " + deck["name"] + " deck.", 2400);
        start_practising();
        update_title();
        store_state();
        show_practice_screen();
    }

    function show_alert(message, callback)
    {
        alert_message.innerHTML = message;
        alert_callback = callback;
        show(alert_modal);
    }

    function handle_alert_ok_click(evt)
    {
        hide(alert_modal);

        if (alert_callback) {
            alert_callback();
        }

        return stop_event(evt);
    }

    function ask_for_confirmation(message, callback)
    {
        confirm_message.innerHTML = message;
        confirm_callback = callback;
        show(confirm_modal);
    }

    function handle_confirm_yes_click(evt)
    {
        hide(confirm_modal);
        confirm_callback();

        return stop_event(evt);
    }

    function handle_confirm_no_click(evt)
    {
        hide(confirm_modal);

        return stop_event(evt);
    }

    function handle_load_confirmation()
    {
        push_history("load");
        load_action = load_deck_from_json_file;
        load_screen_title.innerHTML = "Load Deck";
        load_input.setAttribute("accept", ".json,application/json");
        hide_all_screens();
        hide(grade_form);
        show(load_screen);
        hide(tsv_info);
    }

    function hide_all_screens()
    {
        hide(menu);

        hide(about_screen);
        hide(all_cards);
        hide(builtins_screen);
        hide(deck_properties_screen);
        hide(editor_screen);
        hide(load_screen);
        hide(practice_screen);
        hide(practice_kanji_details);

        all_cards_list.innerHTML = "";

        scroll_to_top();
    }

    function scroll_to_top()
    {
        var error;

        try {
            window.scrollTo(0, 0);
        } catch (error) {
        }
    }

    function handle_import_tsv_confirmation()
    {
        push_history("imp");
        load_action = import_deck_from_tsv_file;
        load_screen_title.innerHTML = "Import Deck From TSV";
        load_input.setAttribute("accept", ".tsv,.tab,text/tab-separated-values");
        hide_all_screens();
        hide(grade_form);
        show(load_screen);
        show(tsv_info);
    }

    function handle_menu_add_tsv_click(evt)
    {
        if (deck["cards"].length < 1) {
            return handle_menu_import_tsv_click(evt);
        }

        load_action = add_cards_from_tsv_file;
        load_screen_title.innerHTML = "Add new cards from TSV";
        load_input.setAttribute("accept", ".tsv,.tab,text/tab-separated-values");
        hide_all_screens();
        show(load_screen);
        show(tsv_info);

        return stop_event(evt);
    }

    function handle_load_cancel_click(evt)
    {
        show_practice_screen();

        return stop_event(evt);
    }

    function handle_menu_about_click(evt)
    {
        push_history("about");
        show_about_screen();

        return stop_event(evt);
    }

    function show_about_screen()
    {
        hide_all_screens();
        show(about_screen);
    }

    function handle_about_back_click(evt)
    {
        show_practice_screen();

        return stop_event(evt);
    }

    function show_practice_screen()
    {
        hide_all_screens();
        show(practice_screen);

        if (deck["cards"].length > 0) {
            hide(no_cards);
            show(practice_card);
        } else {
            show(no_cards);
            stats.innerHTML = "";
            hide(practice_card);
            hide(grade_form);
            hide(learn_button);
        }
    }

    function handle_grade_bad_click(evt)
    {
        return handle_grade_click(evt, GRADE_BAD);
    }

    function handle_grade_click(evt, score)
    {
        grade(score);

        if (to_learn.length > 0) {
            show(learn_button);
        } else {
            hide(learn_button);
        }

        hide(grade_form);
        continue_practising();

        return stop_event(evt);
    }

    function handle_grade_soso_click(evt)
    {
        return handle_grade_click(evt, GRADE_SOSO);
    }

    function handle_grade_good_click(evt)
    {
        return handle_grade_click(evt, GRADE_GOOD);
    }

    function handle_grade_easy_click(evt)
    {
        return handle_grade_click(evt, GRADE_EASY);
    }

    function handle_menu_show_all_click(evt)
    {
        show_all_cards();

        return stop_event(evt);
    }

    function show_all_cards()
    {
        var cards = deck["cards"],
            html = [],
            histogram = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            studied_cards = 0,
            cards_to_study = 0,
            card,
            percentage,
            i, l;

        push_history("all");
        hide_all_screens();

        all_cards_list.innerHTML = "";

        for (i = 0, l = cards.length; i < l; ++i) {
            card = cards[i];
            percentage = calculate_score_percentage(card["grades"]);

            if (percentage >= 0.0) {
                ++histogram[Math.min(9, (Math.floor(percentage) / 10.0) | 0)];
                ++studied_cards;
            } else {
                ++cards_to_study;
            }

            html.push(card_to_list_item_html(i, card, percentage));
        }

        all_cards_list.innerHTML = html.join("");
        show_stats(histogram, studied_cards, cards_to_study);

        show(all_cards);
    }

    function show_stats(histogram, studied_cards, cards_to_study)
    {
        var max, percentage, i, l;

        all_cards_studied.innerText = String(studied_cards);
        all_cards_to_study.innerText = String(cards_to_study);

        max = 0;

        for (i = 0; i < 10; ++i) {
            if (histogram[i] > max) {
                max = histogram[i];
            }
        }

        for (i = 0; i < 10; ++i) {
            if (max > 0) {
                percentage = (
                    (histogram[i] > 0) ? Math.max(0.0, histogram[i] / max) : 0
                );
            } else {
                percentage = 0;
            }

            all_cards_histogram[i].innerText = String(histogram[i]);
            all_cards_histogram_vis[i].style.height = (
                String(12.0 * percentage) + "vh"
            );
            all_cards_histogram_vis[i].style.marginTop = (
                String(12.0 * (1.0 - percentage)) + "vh"
            );
        }
    }

    function card_to_list_item_html(index, card, score_percentage)
    {
        var score_cls;

        if (score_percentage >= 90) {
            score_cls = "high";
        } else if (score_percentage >= 80) {
            score_cls = "medium-high";
        } else if (score_percentage >= 50) {
            score_cls = "medium";
        } else if (score_percentage >= 20) {
            score_cls = "medium-low";
        } else {
            score_cls = "low";
        }

        index = String(index + 1);

        return [
            "<li value=\"" + index + "\">",
                "<div>",
                    "<dt lang=\"ja\">",
                        quote_html(card["kanji"]),
                    "</dt>",
                    "<dd>",
                        "<div lang=\"ja\">",
                            quote_html(card["pronunciation"]),
                        "</div>",
                        "<div lang=\"" + deck["meaning_language"] + "\">",
                            quote_html(card["meaning"]),
                        "</div>",
                        "<div class=\"notes\" lang=\"" + deck["notes_language"] + "\">",
                            format_text(card["notes"]),
                        "</div>",
                        (score_percentage >= 0.0)
                            ? (
                                "<div class=\"score " + score_cls + "\">"
                                    + "Score: " + String(score_percentage)
                                    + "%"
                                + "</div>"
                            )
                            : "",
                        "<div class=\"right\">",
                            "<a class=\"button\" href=\"#e-" + index + "\">Edit</a>",
                        "</div>",
                    "</dd>",
                "</div>",
            "</li>"
        ].join("");
    }

    function calculate_score_percentage(grades)
    {
        var count = Math.min(MAX_GRADES, grades.length);

        if (count < 1) {
            return -1.0;
        }

        return Math.min(
            100.0,
            Math.round(calculate_score(grades) * 100.0 / perfect_score)
        );
    }

    function format_text(text)
    {
        return (
            quote_html(text)
                .replace(
                    /\{([^|}]*?)\|([^}]*)\}/g,
                    "<span class=\"furigana\"><ruby>$1<rt>$2</rt></ruby></span>"
                )
                .replace(/\{([^}]*)\}/g, "<small>($1)</small>")
                .replace(/_([^_]*)_/g, "<em>$1</em>")
                .replace(/\*([^*]*)\*/g, "<strong>$1</strong>")
                .replace(/-+&gt;/g, "&rarr;")
                .replace(/&lt;-+/g, "&larr;")
                .replace(/\n/g, "<br/>")
        );
    }

    function quote_html(text)
    {
        return text.replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function handle_menu_deck_click(evt)
    {
        push_history("deck-properties");
        show_deck_properties_editor();

        return stop_event(evt);
    }

    function show_deck_properties_editor()
    {
        hide_all_screens();

        deck_name_orig = deck["name"];
        deck_name.value = deck["name"];

        meaning_language_orig = populate_language_selector(
            meaning_language, deck["meaning_language"]
        );
        notes_language_orig = populate_language_selector(
            notes_language, deck["notes_language"]
        );

        show(deck_properties_screen);
    }

    function populate_language_selector(select_node, selected_lang_code)
    {
        var i, l, o, lc, c;

        select_node.innerHTML = "";

        for (i = 0, l = language_codes.length; i < l; ++i) {
            lc = language_codes[i];
            c = lc["code"];

            o = document.createElement("option");
            o.innerText = lc["name"];
            o.setAttribute("value", c);

            if (selected_lang_code == c) {
                o.setAttribute("selected", "selected");
            }

            select_node.appendChild(o);
        }

        return selected_lang_code;
    }

    function handle_deck_properties_save_click(evt)
    {
        close_deck_properties_editor();

        deck["name"] = deck_name.value;
        deck["meaning_language"] = meaning_language.value;
        deck["notes_language"] = notes_language.value;

        show_message("Deck properties saved.", 2400);

        if (current_card) {
            show_current_card();
        }

        show_practice_screen();

        return stop_event(evt);
    }

    function handle_deck_properties_cancel_click(evt)
    {
        if (is_deck_properties_editor_dirty()) {
            ask_for_confirmation(
                DECK_PROPERTIES_EDITOR_EXIT_CONFIRM,
                close_deck_properties_editor
            );
        } else {
            close_deck_properties_editor();
        }

        return stop_event(evt);
    }

    function is_deck_properties_editor_dirty()
    {
        if (
            deck_name_orig === null
            && meaning_language_orig === null
            && notes_language_orig === null
        ) {
            return false;
        }

        if (deck_name_orig !== deck_name.value) {
            return true;
        }

        if (meaning_language_orig !== meaning_language.value) {
            return true;
        }

        if (notes_language_orig !== notes_language.value) {
            return true;
        }

        return false;
    }

    function close_deck_properties_editor()
    {
        deck_name_orig = null;
        meaning_language_orig = null;
        notes_language_orig = null;

        if (current_card) {
            show_current_card();
        }

        show_practice_screen();
    }

    function handle_menu_edit_click(evt)
    {
        hide(menu);

        if (!current_card) {
            return stop_event(evt);
        }

        edit_current_card();

        return stop_event(evt);
    }

    function edit_card(card_ref)
    {
        var card = deck["cards"][card_ref];

        push_history("e-" + String(card_ref + 1));

        editor_card_ref = card_ref;

        show_card_editor(
            "random-card",
            card["kanji"],
            card["pronunciation"],
            card["meaning"],
            card["notes"]
        );
    }

    function edit_current_card()
    {
        show_card_editor(
            "current-card",
            current_card["kanji"],
            current_card["pronunciation"],
            current_card["meaning"],
            current_card["notes"]
        );

        push_history("e-" + String(current_card_ref + 1));
    }

    function push_history(hash)
    {
        var url;

        if (is_routing) {
            return;
        }

        url = new URL(window.location);
        url.hash = hash;

        window.history.pushState({}, document.title, url);
    }

    function show_card_editor(mode, kanji, pronunciation, meaning, notes)
    {
        hide_all_screens();
        populate_card_editor(mode, kanji, pronunciation, meaning, notes);
        show(editor_screen);
        editor_kanji.focus();
    }

    function populate_card_editor(mode, kanji, pronunciation, meaning, notes)
    {
        editor_mode = mode;

        editor_title.innerText = (mode === "new-card") ? "Create card" : "Edit card";

        editor_kanji.value = kanji;
        editor_kanji_orig = kanji;

        editor_pronunciation.value = pronunciation;
        editor_pronunciation_orig = pronunciation;

        editor_meaning.setAttribute("lang", deck["meaning_language"]);
        editor_meaning.value = meaning;
        editor_meaning_orig = meaning;

        editor_notes.setAttribute("lang", deck["notes_language"]);
        editor_notes.value = notes;
        editor_notes_preview.setAttribute("lang", deck["notes_language"]);
        editor_notes_preview.innerHTML = format_text(notes);

        if (mode === "current-card" || mode == "random-card") {
            show(editor_buttons_existing);
            hide(editor_buttons_new);
            editor_button_save.disabled = false;
            editor_button_save_new.disabled = true;
        } else {
            hide(editor_buttons_existing);
            show(editor_buttons_new);
            editor_button_save.disabled = true;
            editor_button_save_new.disabled = false;
        }
    }

    function handle_edit_cancel_click(evt)
    {
        if (is_card_editor_dirty()) {
            ask_for_confirmation(EDITOR_EXIT_CONFIRM, close_card_editor);
        } else {
            close_card_editor();
        }

        return stop_event(evt);
    }

    function is_card_editor_dirty()
    {
        if (editor_kanji_orig !== editor_kanji.value) {
            return true;
        }

        if (editor_pronunciation_orig !== editor_pronunciation.value) {
            return true;
        }

        if (editor_meaning_orig !== editor_meaning.value) {
            return true;
        }

        return false;
    }

    function close_card_editor()
    {
        var mode = editor_mode;

        populate_card_editor("new-card", "", "", "", "");

        if (mode == "random-card") {
            show_all_cards();
        } else {
            if (current_card) {
                show_current_card();
            }

            show_practice_screen();
        }

        scroll_to_top();
    }

    function handle_clear_click(evt)
    {
        clear_drawn_character();

        return stop_event(evt);
    }

    function clear_drawn_character()
    {
        if (is_done) {
            hide(grade_form);
        }

        if (is_done && current_character_ref > 0) {
            --current_character_ref;
            set_revealed_chars(Math.max(revealed_chars, current_character_ref));
        }

        reset_current_character();
    }

    function handle_hint_click(evt)
    {
        show_hint();

        return stop_event(evt);
    }

    function show_hint()
    {
        if (is_showing_hint || is_waiting_for_click || is_done || is_teaching) {
            return;
        }

        is_showing_hint = true;

        hint_snapshot = make_canvas_snapshot();
        hint_remaining_frames = 8;
        hint_animation = setInterval(draw_hint, 80);
    }

    function draw_hint()
    {
        var alpha, strokes, pos;

        if (hint_remaining_frames < 0 || current_character_ref >= characters.length) {
            stop_showing_hint();

            return;
        }

        strokes = characters[current_character_ref]["strokes"];

        if (drawn_strokes.length >= strokes.length) {
            stop_showing_hint();

            return;
        }

        restore_canvas_snapshot(hint_snapshot);

        alpha = Math.min(1.0, (hint_remaining_frames + 1) / 6),

        canvas_ctx.strokeStyle = "rgba(104, 144, 192, " + String(alpha) + ")";
        canvas_ctx.lineCap = "round";
        canvas_ctx.lineWidth = 3;
        canvas_ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvas_ctx.scale(SCALE, SCALE);
        canvas_ctx.stroke(new Path2D(next_stroke));

        pos = next_stroke_svg_path.getPointAtLength(0);
        canvas_ctx.fillStyle = "rgba(216, 236, 255, " + String(alpha) + ")";
        canvas_ctx.beginPath();
        canvas_ctx.arc(pos.x, pos.y, 1, 0, FULL_CIRCLE);
        canvas_ctx.fill();

        canvas_ctx.setTransform(1, 0, 0, 1, 0, 0);

        --hint_remaining_frames;
    }

    function stop_showing_hint()
    {
        is_showing_hint = false;
        restore_canvas_snapshot(hint_snapshot);
        clearInterval(hint_animation);
    }

    function handle_teach_click(evt)
    {
        teach();

        return stop_event(evt);
    }

    function teach()
    {
        var strokes;

        if (is_showing_hint || is_waiting_for_click || is_done || is_teaching) {
            return;
        }

        strokes = characters[current_character_ref]["strokes"];

        if (drawn_strokes.length >= strokes.length) {
            return;
        }

        if (teach_next_stroke()) {
            is_teaching = true;
            is_teaching_paused = false;

            reveal_character();
            teach_snapshot = make_canvas_snapshot();
            teach_animation = setInterval(render_teaching_frame, 100);
        }
    }

    function teach_next_stroke()
    {
        var strokes;

        if (current_character_ref >= characters.length) {
            return false;
        }

        strokes = characters[current_character_ref]["strokes"];

        if (drawn_strokes.length >= strokes.length) {
            return false;
        }

        teach_frames = Math.floor(next_stroke_svg_path_length / 3.6) + 1;
        teach_frame = 0;

        return true;
    }

    function render_teaching_frame()
    {
        var pos, l;

        l = teach_frame / teach_frames;
        pos = svg_point_at_length_to_canvas_pos(next_stroke_svg_path, next_stroke_svg_path_length * l);

        restore_canvas_snapshot(teach_snapshot);

        canvas_ctx.fillStyle = "#f0f0c0";
        canvas_ctx.beginPath();
        canvas_ctx.arc(pos.x, pos.y, 16, 0, FULL_CIRCLE);
        canvas_ctx.fill();

        ++teach_frame;

        if (teach_frame > teach_frames) {
            teach_frame = 0;
        }
    }

    function pause_teaching()
    {
        is_teaching_paused = true;
        clearInterval(teach_animation);
        restore_canvas_snapshot(teach_snapshot);
    }

    function continue_teaching()
    {
        if (teach_next_stroke()) {
            is_teaching_paused = false;

            teach_snapshot = make_canvas_snapshot();
            teach_animation = setInterval(render_teaching_frame, 100);
        } else {
            stop_teaching();
        }
    }

    function stop_teaching()
    {
        if (!is_teaching) {
            return;
        }

        is_teaching = false;
        is_teaching_paused = false;

        clearInterval(teach_animation);
        restore_canvas_snapshot(teach_snapshot);
    }

    function handle_kanji_details_click(evt)
    {
        show(practice_kanji_details);

        return stop_event(evt);
    }

    function handle_kanji_details_close_click(evt)
    {
        hide(practice_kanji_details);

        return stop_event(evt);
    }

    function handle_edit_save_click(evt)
    {
        var kanji = editor_kanji.value,
            card_ref,
            error;

        try {
            validate_kanji(kanji);
        } catch (error) {
            show_alert(quote_html(error), function () { editor_kanji.focus(); });

            return stop_event(evt);
        }


        if (editor_mode == "random-card") {
            card_ref = editor_card_ref
            replace_card(
                editor_card_ref,
                kanji,
                editor_pronunciation.value,
                editor_meaning.value,
                editor_notes.value
            );
            close_card_editor();
            show_all_cards();
        } else {
            card_ref = current_card_ref;
            replace_current_card(
                kanji,
                editor_pronunciation.value,
                editor_meaning.value,
                editor_notes.value
            );
            close_card_editor();
            show_current_card();
            show_practice_screen();
        }

        show_message("Card #" + String(card_ref + 1) + " saved.", 2400);

        return stop_event(evt);
    }

    function replace_card(card_ref, kanji, pronunciation, meaning, notes)
    {
        var card;

        card = deck["cards"][card_ref];

        card["kanji"] = kanji;
        card["pronunciation"] = pronunciation;
        card["meaning"] = meaning;
        card["notes"] = notes;
    }

    function replace_current_card(kanji, pronunciation, meaning, notes)
    {
        replace_card(current_card_ref, kanji, pronunciation, meaning, notes);
    }

    function handle_menu_create_click(evt)
    {
        show_card_editor("new-card", "", "", "", "");
        push_history("new");

        return stop_event(evt);
    }

    function handle_editor_notes_blur(evt)
    {
        editor_notes_preview.innerHTML = format_text(editor_notes.value);

        return true;
    }

    function handle_edit_save_new_click(evt)
    {
        var kanji = editor_kanji.value,
            error;

        try {
            validate_kanji(kanji);
        } catch (error) {
            show_alert(quote_html(error));
            editor_kanji.focus();

            return stop_event(evt);
        }

        add_card(
            kanji,
            editor_pronunciation.value,
            editor_meaning.value,
            editor_notes.value
        );

        if (deck["cards"].length === 1) {
            learn();
            pick_card();
            hide_all_screens();
            show_current_card();
        }

        show_card_editor("new-card", "", "", "", "");
        show_message("Added card #" + String(deck["cards"].length) + " to the deck.", 2400);

        return stop_event(evt);
    }

    function add_card(kanji, pronunciation, meaning, notes)
    {
        var cards = deck["cards"];

        to_learn.push(cards.length);
        cards.push(create_card(kanji, pronunciation, meaning, notes, []));
    }

    function show_message(text, hide_after)
    {
        message.innerHTML = quote_html(text);
        show(message);

        if (message_timeout !== null) {
            clearTimeout(message_timeout);
        }

        message_timeout = setTimeout(hide_message, hide_after);
        scroll_to_top();
    }

    function handle_menu_export_json_click(evt)
    {
        return handle_menu_export_click(
            evt,
            export_deck_as_indented_json_string,
            menu_export_json,
            ".json",
            "application/json"
        );
    }

    function handle_save_json_click(evt)
    {
        return handle_menu_export_click(
            evt,
            export_deck_as_indented_json_string,
            save_json_button,
            ".json",
            "application/json"
        );
    }

    function handle_menu_export_click(evt, export_fn, anchor_node, extension, mime_type)
    {
        var name = deck["name"];

        hide(menu);

        if (name === "") {
            name = "kanji" + extension;
        } else if (name.substring(name.length - extension.length) !== extension) {
            name = name + extension;
        }

        anchor_node.href = URL.createObjectURL(
            new Blob([export_fn()], {"type": mime_type})
        );
        anchor_node.download = name;

        return true;
    }

    function export_deck_as_indented_json_string()
    {
        return export_deck_as_json_string(true);
    }

    function export_deck_as_json_string(indent)
    {
        var cards = deck["cards"],
            exported_cards = [],
            card,
            grades,
            exported_grades,
            i, l, j, ll;

        for (i = 0, l = cards.length; i < l; ++i) {
            card = cards[i];
            grades = card["grades"];
            exported_grades = [];

            for (j = 0, ll = grades.length; j < ll; ++j) {
                exported_grades.push(String(grades[j]));
            }

            exported_cards.push(
                [
                    card["kanji"],
                    card["pronunciation"],
                    card["meaning"],
                    card["notes"],
                    exported_grades.join("")
                ]
            );
        }

        return JSON.stringify(
            {
                "name": deck["name"],
                "meaning_language": deck["meaning_language"],
                "notes_language": deck["notes_language"],
                "cards": exported_cards
            },
            null,
            indent ? 2 : 0
        );
    }

    function handle_menu_export_tsv_click(evt)
    {
        return handle_menu_export_click(
            evt,
            export_deck_as_tsv_string,
            menu_export_tsv,
            ".tsv",
            "text/tab-separated-values"
        );
    }

    function export_deck_as_tsv_string()
    {
        var cards = deck["cards"],
            lines = [],
            header = "Word (kanji)\tPronunciation\tMeaning\tNotes",
            grades_header = [],
            most_grades = 0,
            card, grades, exported_grades,
            i, l, j, ll;

        for (i = 0, l = cards.length; i < l; ++i) {
            ll = cards[i]["grades"].length;

            if (ll > most_grades) {
                most_grades = ll;
            }
        }

        for (i = 0; i < most_grades; ++i) {
            grades_header.push("Grade");
        }

        if (grades_header.length > 0) {
            header += "\t" + grades_header.join("\t");
        }

        lines.push(header);

        for (i = 0, l = cards.length; i < l; ++i) {
            card = cards[i];
            grades = card["grades"];
            exported_grades = [];

            for (j = 0, ll = grades.length; j < most_grades; ++j) {
                exported_grades.push((j < ll) ? String(grades[j]) : "");
            }

            lines.push(
                [
                    quote_tsv(card["kanji"]),
                    quote_tsv(card["pronunciation"]),
                    quote_tsv(card["meaning"]),
                    quote_tsv(card["notes"]),
                    exported_grades.join("\t")
                ].join("\t")
            );
        }

        return lines.join("\r\n");
    }

    function quote_tsv(text)
    {
        return (
            text
                .replace(/\\/g, "\\\\")
                .replace(/\t/g, "\\t")
                .replace(/\r/g, "\\r")
                .replace(/\n/g, "\\n")
        );
    }

    function handle_learn_button_click(evt)
    {
        hide(learn_button);

        if (learn()) {
            show_message("Scheduled a new card.", 2400);
        }

        return stop_event(evt);
    }

    function learn()
    {
        var ref;

        if (to_learn.length < 1) {
            return false;
        }

        ref = to_learn.shift();

        card_refs.splice(next_card_ref_ref, 0, ref);

        return true;
    }

    function hide_message()
    {
        hide(message);
        message.innerHTML = "&nbsp;";
        message_timeout = null;
    }

    function handle_load_input_change(evt)
    {
        if (load_input.files.length >= 1) {
            load_action(load_input.files[0]);
        }

        load_input.value = null;
    }

    function import_deck_from_tsv_file(file)
    {
        read_file(
            file,
            function (name, contents)
            {
                import_deck_from_tsv_string(
                    name,
                    contents,
                    load_ignore_tsv_header.checked,
                    load_fix_breaks.checked
                );

                if (!deck["name"]) {
                    deck["name"] = name;
                }

                show_message("Imported " + name + ".", 2400);
                start_practising();
                update_title();
                store_state();
                show_practice_screen();
            }
        );
    }

    function import_deck_from_tsv_string(name, tsv_str, ignore_tsv_header, fix_line_breaks)
    {
        load_deck(
            {
                "name": name,
                "notes_language": "ja",
                "cards": tsv_to_raw_cards(tsv_str, ignore_tsv_header, false, fix_line_breaks)
            }
        );
    }

    function tsv_to_raw_cards(tsv_str, ignore_tsv_header, ignore_grades, fix_line_breaks)
    {
        var lines = tsv_str.replace(/\r/g, "\n").replace(/\n+/g, "\n").trim("\n").split("\n"),
            cards = [],
            grades = "",
            format,
            kanji, pronunciation, meaning, notes, grades_idx, grades_str, grade,
            i, l, ll, j, lll, line;

        if (ignore_grades) {
            format = "KANJI <TAB> PRONUNCIATION <TAB> MEANING <TAB> NOTES";
        } else {
            format = "KANJI <TAB> PRONUNCIATION <TAB> MEANING <TAB> NOTES <TAB> GRADE (0-2) <TAB> GRADE (0-2) <TAB> ...";
        }

        i = ignore_tsv_header ? 1 : 0;

        for (l = lines.length; i < l; ++i) {
            line = String(lines[i]);

            if (fix_line_breaks) {
                j = i + 1;

                for (; j < l && lines[j].indexOf("\t") === -1; ++j, ++i) {
                    line += " " + String(lines[j]);
                }
            }

            line = line.split("\t");
            ll = line.length;

            if (ll < 3) {
                throw (
                    "Invalid deck: TSV line " + String(i + 1)
                    + " is not in \"" + format + "\" format: "
                    + String(line)
                );
            }

            kanji = unquote_tsv(line[0]);
            pronunciation = unquote_tsv(line[1]);
            meaning = unquote_tsv(line[2]);

            if (ll > 3 && !line[3].match(/^[0-9]?$/)) {
                notes = unquote_tsv(line[3]);
                grades_idx = 4;
            } else {
                grades_idx = 3;
                notes = "";
            }

            if (!ignore_grades) {
                grades = line.splice(grades_idx);

                for (j = 0, lll = grades.length; j < lll; ++j) {
                    grade = grades[j].trim();

                    if (!grade.match(/^[0-9]?$/)) {
                        throw (
                            "Invalid deck: TSV line " + String(i + 1)
                            + " contains an invalid grade: " + grade + " - a grade can be a single digit integer between 0-9: "
                            + String(line)
                        );
                    }

                    grades[j] = grade;
                }

                grades = grades.join("");
            }

            if (pronunciation === "") {
                pronunciation = kanji;
            }

            cards.push([kanji, pronunciation, meaning, notes, grades]);
        }

        return cards;
    }

    function unquote_tsv(tsv_str)
    {
        return (
            tsv_str
                .replace(/\\\\/g, "\\")
                .replace(/\\t/g, "\t")
                .replace(/\\r/g, "\r")
                .replace(/\\n/g, "\n")
                .trim()
        );
    }

    function read_file(file, callback)
    {
        var reader = new FileReader(),
            handle_error;

        handle_error = function () {
            show_alert("Error reading file: " + quote_html(String(reader.error || "unknown error")));
        };

        reader.onerror = handle_error;
        reader.onabort = handle_error;
        reader.onload = function ()
        {
            var error;

            try {
                callback(String(file.name), reader.result);
            } catch (error) {
                show_alert(quote_html(error));

                return;
            }

        };

        reader.readAsText(file);
    }

    function add_cards_from_tsv_file(file)
    {
        read_file(
            file,
            function (name, contents)
            {
                var added = add_cards_from_tsv_string(
                    name,
                    contents,
                    load_ignore_tsv_header.checked,
                    load_fix_breaks.checked
                );

                show_message(
                    "Added " + String(added)
                    + " new card" + ((added === 1) ? "" : "s")
                    + " from " + name + ".",
                    2400
                );
                start_practising();
                update_title();
                store_state();
                show_practice_screen();
            }
        );
    }

    function add_cards_from_tsv_string(name, tsv_str, ignore_tsv_header, fix_line_breaks)
    {
        var added = 0,
            raw_cards = tsv_to_raw_cards(tsv_str, ignore_tsv_header, true, fix_line_breaks),
            cards = deck["cards"],
            existing_cards = {},
            kanji, meaning, notes, pronunciation, error,
            i, l, c, h;

        try {
            validate_deck({"name": "", "cards": raw_cards});
        } catch (error) {
            throw "Invalid deck: " + error;
        }

        for (i = 0, l = cards.length; i < l; ++i) {
            c = cards[i];
            existing_cards[card_to_hash(c["kanji"], c["pronunciation"], c["meaning"], c["notes"])] = true;
        }

        for (i = 0, l = raw_cards.length; i < l; ++i) {
            c = raw_cards[i];
            kanji = c[0];
            pronunciation = c[1];
            meaning = c[2];
            notes = c[3];
            h = card_to_hash(kanji, pronunciation, meaning, notes);

            if (!existing_cards.hasOwnProperty(h)) {
                ++added;
                add_card(kanji, pronunciation, meaning, notes);
            }
        }

        return added;
    }

    function card_to_hash(kanji, pronunciation, meaning, notes)
    {
        return "c" + kanji + "\t" + pronunciation + "\t" + meaning + "\t" + notes;
    }

    function load_deck_from_json_file(file)
    {
        read_file(
            file,
            function (name, contents)
            {
                load_deck_from_json_string(contents);

                if (!deck["name"]) {
                    deck["name"] = name;
                }

                show_message("Loaded " + name + ".", 2400);
                start_practising();
                update_title();
                store_state();
                show_practice_screen();
            }
        );
    }

    function load_deck_from_json_string(deck_str)
    {
        var error, raw_deck;

        try {
            raw_deck = JSON.parse(deck_str);
        } catch (error) {
            throw "Invalid deck JSON: " + String(error);
        }

        load_deck(raw_deck);
        update_title();
    }

    function load_deck(raw_deck)
    {
        var cards,
            raw_cards,
            raw_card,
            raw_grades,
            notes,
            grades,
            error,
            i, l, j, ll;

        try {
            validate_deck(raw_deck);
        } catch (error) {
            throw "Invalid deck: " + error;
        }

        score = 0;
        answered = 0;
        current_card = null;
        current_card_ref = null;
        characters = null;
        current_character_ref = null;
        revealed_chars = null;

        cards = [];
        card_refs = [];
        to_learn = [];

        deck = {
            "name": raw_deck.hasOwnProperty("name") ? raw_deck["name"] : "",
            "meaning_language": raw_deck.hasOwnProperty("meaning_language")
                ? raw_deck["meaning_language"]
                : "",
            "notes_language": raw_deck.hasOwnProperty("notes_language")
                ? raw_deck["notes_language"]
                : "",
            "cards": []
        };
        raw_cards = raw_deck["cards"];

        for (i = 0, l = raw_cards.length; i < l; ++i) {
            raw_card = raw_cards[i];
            notes = raw_card.length > 4 ? raw_card[3] : "";
            raw_grades = raw_card.length > 4 ? raw_card[4] : raw_card[3];

            grades = [];

            if (raw_grades === "") {
                to_learn.push(i);
            } else {
                card_refs.push(i);

                for (j = 0, ll = raw_grades.length; j < ll; ++j) {
                    grades.push(parseInt(raw_grades[j], 10));
                }
            }

            cards.push(create_card(raw_card[0], raw_card[1], raw_card[2], notes, grades));
        }

        deck["cards"] = cards;
        last_order_reset = 0;

        if (card_refs.length < 1) {
            for (i = 0, l = Math.min(3, cards.length); i < l; ++i) {
                card_refs.push(to_learn.shift());
            }
        }

        reset_card_ref_order();

        return deck;
    }

    function create_card(kanji, pronunciation, meaning, notes, grades)
    {
        return {
            "kanji": kanji,
            "pronunciation": pronunciation,
            "meaning": meaning,
            "notes": notes,
            "grades": grades,
            "score": calculate_score(grades),
            "studied": 0,
            "priority": 0
        };
    }

    function validate_deck(raw_deck)
    {
        var cards,
            card,
            scores,
            score,
            dump,
            grades,
            i, j, l, ll;

        if (typeof(raw_deck) !== "object" || !raw_deck) {
            throw "the deck should be an JSON object";
        }

        if (!raw_deck.hasOwnProperty("cards")) {
            throw "the deck must have a 'cards' key";
        }

        if (raw_deck.hasOwnProperty("name") && typeof(raw_deck["name"]) !== "string") {
            throw "the deck's 'name' must be string"
        }

        if (!Array.isArray(raw_deck["cards"])) {
            throw "'cards' must be an array";
        }

        cards = raw_deck["cards"];

        for (i = 0, l = cards.length; i < l; ++i) {
            card = cards[i];
            dump = JSON.stringify(card);

            if (!(Array.isArray(card) && (card.length >= 4 || card.length <= 5))) {
                throw "all cards must be arrays of 4 or 5 elements: " + card;
            }

            if (
                typeof(card[0]) !== "string"
                || typeof(card[1]) !== "string"
                || typeof(card[2]) !== "string"
                || typeof(card[3]) !== "string"
                || (card.length >= 5 && typeof(card[4]) !== "string")
            ) {
                throw "elements of a card (kanji, pronunciation, meaning, notes, grades) must be strings: " + dump;
            }

            validate_kanji(card[0]);

            grades = (card.length > 4) ? card[4] : card[3];

            if (!grades.match(/^[0-9]*$/)) {
                throw "grades must be a string of integers between 0 and 9: " + dump;
            }
        }

        validate_language_code(raw_deck, "meaning_language");
        validate_language_code(raw_deck, "notes_language");
    }

    function validate_language_code(raw_deck, lang_field)
    {
        var lang;

        if (!raw_deck.hasOwnProperty(lang_field)) {
            return;
        }

        lang = raw_deck[lang_field];

        if (typeof(lang) !== "string") {
            throw "'" + lang_field + "' must be a string"
        }

        if (lang !== "" && !known_languages.hasOwnProperty("l" + lang)) {
            throw "unknown language code for '" + lang_field + "': '" + lang + "'";
        }
    }

    function validate_kanji(kanji)
    {
        var unknown_chars = [],
            i, l, c, k;

        for (i = 0, l = kanji.length; i < l; ++i) {
            c = kanji.substring(i, i + 1);

            if (!look_up_kanjivg(c)) {
                unknown_chars.push(
                    '"' + c + '" (0x' + c.charCodeAt(0).toString(16) + ")"
                );
            }
        }

        if (unknown_chars.length < 1) {
            return;
        }

        throw (
            "Unknown character"
            + ((unknown_chars.length > 1) ? "s" : "")
            + ' in "' + kanji + '": '
            + unknown_chars.join(", ")
        );
    }

    function look_up_kanjivg(kanji_char)
    {
        var data, char_code, error;

        try {
            data = get_kanjivg(kanji_char);

            if (data) {
                return data;
            }

            char_code = kanji_char.charCodeAt(0);

            if (char_code >= FULL_WIDTH_ASCII_START && char_code <= FULL_WIDTH_ASCII_END) {
                return get_kanjivg(
                    String.fromCharCode(char_code - FULL_WIDTH_ASCII_DIFF)
                );
            }

            char_code = HALF_WIDTH_KATAKANA.indexOf(kanji_char);

            if (char_code > -1) {
                return get_kanjivg(
                    HALF_WIDTH_KATAKANA_FULL.substring(char_code, char_code + 1)
                );
            }
        } catch (error) {
            if (is_debugging) {
                console.log(error);
            }

            return undefined;
        }

        return undefined;
    }

    function get_kanjivg(kanji_char)
    {
        var error;

        try {
            return kanjivg[kanji_to_key(kanji_char)];
        } catch (error) {
            return undefined;
        }
    }

    function calculate_score(grades)
    {
        var q = 0.55,
            weight = 1.0,
            sum_grades = 0.0,
            sum_weights = 0.0,
            i, l;

        if (grades.length < 1) {
            return 0.0;
        }

        for (i = 0, l = grades.length; i < l; ++i) {
            sum_grades += grades[i] * weight;
            sum_weights += weight;
            weight *= q;
        }

        return (sum_grades / sum_weights) * grades.length / 10;
    }

    function reset_card_ref_order()
    {
        var cards = deck["cards"],
            now = time(),
            i, l, card;

        for (i = 0, l = cards.length; i < l; ++i) {
            card = cards[i];
            card["priority"] = card["score"] + 30.0 / Math.max(1.0, now - card["studied"]);
        }

        card_refs.sort(
            function (a, b) {
                var d = cards[a]["priority"] - cards[b]["priority"];

                return (0 === d) ? a - b : d;
            }
        );

        next_card_ref_ref = 0;
        last_order_reset = now;
    }

    function time()
    {
        return Date.now() / 1000;
    }

    function update_title()
    {
        document.title = make_title();
    }

    function make_title()
    {
        return deck["name"] ? deck["name"] + " - Kanji Practice" : "Kanji Practice";
    }

    function store_state()
    {
        localStorage.setItem("kanji", export_deck_as_json_string(false));
    }

    function start_practising()
    {
        show_practice_screen();

        if (deck["cards"].length < 1) {
            return;
        }

        continue_practising();
    }

    function continue_practising()
    {
        if (time() > last_order_reset + 45) {
            reset_card_ref_order();
            store_state();
        }

        pick_card();
        show_current_card();
    }

    function pick_card()
    {
        drawn_characters = [];
        hide(practice_pronunciation);

        if ((0 >= score) || (10 >= answered) || (0.25 <= Math.random())) {
            pick_card_by_score();
        } else {
            pick_card_randomly();
        }

        reset_current_character();
        show_next_character_prompt();
    }

    function pick_card_by_score()
    {
        store_pick(card_refs[next_card_ref_ref]);
        ++next_card_ref_ref;

        if (next_card_ref_ref >= card_refs.length) {
            next_card_ref_ref = 0;
        }
    }

    function store_pick(pick)
    {
        var kanji, c, i, l;

        if (current_card_ref !== pick) {
            drawn_characters = [];
        }

        current_card_ref = pick;
        current_card = deck["cards"][current_card_ref];
        kanji = current_card["kanji"];
        characters = [];
        current_character_ref = 0;
        set_revealed_chars(0);

        for (i = 0, l = kanji.length; i < l; ++i) {
            c = look_up_kanjivg(kanji.substring(i, i + 1));

            if (c) {
                characters.push(
                    {
                        "components": c[0],
                        "strokes": c[1]
                    }
                );
            }
        }
    }

    function kanji_to_key(kanji)
    {
        return "k" + kanji.charCodeAt(0).toString(16);
    }

    function pick_card_randomly()
    {
        var length = card_refs.length,
            tries = 10,
            offset,
            pick = current_card_ref;

        while (tries > 0 && pick === current_card_ref) {
            offset = random(5, length);
            pick = card_refs[(next_card_ref_ref + offset) % length];
            --tries;
        }

        store_pick(pick);
    }

    function random(min, max)
    {
        if (max <= min) {
            return min;
        }

        return min + Math.floor(Math.random() * (max - min));
    }

    function show_current_card()
    {
        var max_score = answered * GRADE_GOOD,
            percentage;

        if (0 < max_score) {
            percentage = Math.round(score * 100.0 / max_score);
            stats.innerHTML = String(percentage) + "% (" + String(answered) + ")";
        } else {
            stats.innerHTML = "";
        }

        current_card["kanji"],
        update_kanji();
        practice_pronunciation.innerHTML = quote_html(current_card["pronunciation"]);
        practice_meaning.setAttribute("lang", deck["meaning_language"]);
        practice_meaning.innerHTML = quote_html(current_card["meaning"]);
    }

    function show_grade_form()
    {
        show(grade_form);
    }

    function handle_file_drop(evt)
    {
        if (evt.dataTransfer && evt.dataTransfer.items) {
            if (evt.dataTransfer.items.length >= 1) {
                load_action(evt.dataTransfer.items[0].getAsFile());
            }
        } else if (evt.dataTransfer && evt.dataTransfer.files) {
            if (ev.dataTransfer.files.length >= 1) {
                load_action(evt.dataTransfer.files[0]);
            }
        } else {
            show_alert("Your browser does not seem to support drag and drop.");
        }

        return stop_event(evt);
    }

    function restore_state()
    {
        var error,
            saved_deck;

        saved_deck = localStorage.getItem("kanji");

        if (saved_deck) {
            try {
                load_deck_from_json_string(saved_deck);
                return;
            } catch (error) {
                show_message("Error restoring state: " + String(error));
                localStorage.removeItem("kanji");
            }
        }
    }

    function handle_practice_card_click(evt)
    {
        return stop_event(evt);
    }

    function grade(grade)
    {
        var grades = current_card["grades"];

        while (grades.length > MAX_GRADES) {
            grades.pop();
        }

        grades.unshift(grade);
        current_card["studied"] = time();
        current_card["score"] = calculate_score(grades);

        ++answered;
        score += Math.min(GRADE_GOOD, grade);
    }

    function handle_beforeunload(evt)
    {
        store_state();

        if (is_card_editor_dirty()) {
            show_message(EDITOR_EXIT_CONFIRM, 6000);
            evt.preventDefault();
            evt.returnValue = EDITOR_EXIT_CONFIRM;

            return EDITOR_EXIT_CONFIRM;
        }

        if (is_deck_properties_editor_dirty()) {
            show_message(DECK_PROPERTIES_EDITOR_EXIT_CONFIRM, 6000);
            evt.preventDefault();
            evt.returnValue = DECK_PROPERTIES_EDITOR_EXIT_CONFIRM;

            return DECK_PROPERTIES_EDITOR_EXIT_CONFIRM;
        }
    }

    function handle_popstate(evt)
    {
        route();
    }

    function run_tests()
    {
        var i;

        kanjivg = {};

        for (i = 32; i < 127; ++i) {
            kanjivg[kanji_to_key(String.fromCharCode(i))] = [
                String.fromCharCode(i) + " (components)",
                ["SVG path-1", "SVG path-2"]
            ];
        }

        kanjivg[kanji_to_key("ア")] = [
            "ア",
            ["SVG path-1", "SVG path-2"]
        ];
        kanjivg[kanji_to_key("何")] = [
            "何亻可丁一口亅",
            ["SVG path-1", "SVG path-2"]
        ];

        initialize_languages();

        update_kanji = function () {};

        QUnit.module("state_handling", function () {
            QUnit.test("load_deck", function(assert) {
                var key,
                    invalid_decks = {
                        "not a dict": [],
                        "no cards": {
                            "name": "test deck"
                        },
                        "name is not a string": {
                            "name": [],
                            "cards": []
                        },
                        "cards is not an array": {
                            "name": "test deck",
                            "cards": "NOT AN ARRAY"
                        },
                        "a card is not an array": {
                            "name": "test deck",
                            "cards": ["NOT AN ARRAY"]
                        },
                        "a card is not an array of 4 elements": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", "pronunciation", "meaning"]
                            ]
                        },
                        "kanji is not a string": {
                            "name": "test deck",
                            "cards": [
                                [null, "pronunciation", "meaning", ""]
                            ]
                        },
                        "kanji contains unknown characters": {
                            "name": "test deck",
                            "cards": [
                                ["☃", "pronunciation", "meaning", ""]
                            ]
                        },
                        "pronunciation is not a string": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", null, "meaning", ""]
                            ]
                        },
                        "meaning is not a string": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", "pronunciation", null, ""]
                            ]
                        },
                        "a card's notes element is not a string": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", "pronunciation", "meaning", null]
                            ]
                        },
                        "a card's scores element is not a string": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", "pronunciation", "meaning", "notes", null]
                            ]
                        },
                        "a card has an non-numeric score": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", "pronunciation", "meaning", "notes", "a"]
                            ]
                        },
                        "invalid meaning language type": {
                            "name": "test deck",
                            "meaning_language": 42,
                            "cards": [
                                ["kanji", "pronunciation", "meaning", "notes", "9530"]
                            ]
                        },
                        "unknown meaning language": {
                            "name": "test deck",
                            "meaning_language": "unknownlanguage",
                            "cards": [
                                ["kanji", "pronunciation", "meaning", "notes", "9530"]
                            ]
                        },
                        "invalid notes language type": {
                            "name": "test deck",
                            "meaning_language": "hu",
                            "notes_language": 42,
                            "cards": [
                                ["kanji", "pronunciation", "meaning", "notes", "9530"]
                            ]
                        },
                        "unknown notes language": {
                            "name": "test deck",
                            "meaning_language": "hu",
                            "notes_language": "unknownlanguage",
                            "cards": [
                                ["kanji", "pronunciation", "meaning", "notes", "9530"]
                            ]
                        }
                    };

                for (key in invalid_decks) {
                    if (invalid_decks.hasOwnProperty(key)) {
                        assert.throws(
                            function () { load_deck(invalid_decks[key]); },
                            /Invalid deck:/,
                            key
                        );
                    }
                }
            });

            QUnit.test("import_export_tsv_deck", function(assert) {
                var key,
                    invalid_decks = {
                        "missing pronunciation": "kanji",
                        "missing meaning": "kanji\tpronunciation",
                        "kanji contains unknown characters": "☃\tpronunciation\tmeaning\tnotes",
                        "a grade is invalid": "kanji\tpronunciation\tmeaning\tnotes\t3\ta\t0"
                    };

                for (key in invalid_decks) {
                    if (invalid_decks.hasOwnProperty(key)) {
                        assert.throws(
                            function ()
                            {
                                import_deck_from_tsv_string(
                                    "example.tsv", invalid_decks[key], false, false
                                );
                            },
                            /Invalid deck/,
                            key
                        );
                    }
                }

                load_deck({"name": "test", "cards": []});

                assert.equal(
                    export_deck_as_tsv_string(),
                    "Word (kanji)\tPronunciation\tMeaning\tNotes"
                );

                import_deck_from_tsv_string(
                    "example.tsv",
                    [
                        "kanji 1\tpronunciation \\x\\t\\r\\n\\\\1\tmeaning \\x\\t\\r\\n\\\\1\tnotes \\x\\t\\r\\n\\\\1\t\t",
                        "",
                        "katakana 2\t\tmeaning 2\tnotes 2\t9\t3\t0\t\t\t",
                        ""
                    ].join("\r\n"),
                    false,
                    false
                );
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "example.tsv",
                        "meaning_language": "",
                        "notes_language": "ja",
                        "cards": [
                            ["kanji 1", "pronunciation \\x\t\r\n\\1", "meaning \\x\t\r\n\\1", "notes \\x\t\r\n\\1", ""],
                            ["katakana 2", "katakana 2", "meaning 2", "notes 2", "930"]
                        ]
                    }
                );

                import_deck_from_tsv_string(
                    "example.tsv",
                    [
                        "Word (kanji)\tPronunciation\tMeaning\tNotes",
                        "kanji 1\tpronunciation \\x\\t\\r\\n\\\\1\tmeaning \\x\\t\\r\\n\\\\1\tnotes \\x\\t\\r\\n\\\\1\t\t",
                        "",
                        "katakana 2\t\tmeaning 2\tnotes 2\t9\t5\t0\t\t",
                        ""
                    ].join("\r\n"),
                    true,
                    false
                );
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "example.tsv",
                        "meaning_language": "",
                        "notes_language": "ja",
                        "cards": [
                            ["kanji 1", "pronunciation \\x\t\r\n\\1", "meaning \\x\t\r\n\\1", "notes \\x\t\r\n\\1", ""],
                            ["katakana 2", "katakana 2", "meaning 2", "notes 2", "950"]
                        ]
                    }
                );

                assert.equal(
                    export_deck_as_tsv_string(),
                    [
                        "Word (kanji)\tPronunciation\tMeaning\tNotes\tGrade\tGrade\tGrade",
                        "kanji 1\tpronunciation \\\\x\\t\\r\\n\\\\1\tmeaning \\\\x\\t\\r\\n\\\\1\tnotes \\\\x\\t\\r\\n\\\\1\t\t\t",
                        "katakana 2\tkatakana 2\tmeaning 2\tnotes 2\t9\t5\t0",
                    ].join("\r\n")
                );

                import_deck_from_tsv_string(
                    "example.tsv",
                    [
                        "kanji 1\tpronunciation 1\tmeaning 1",
                        "kanji 2\tpronunciation 2\tmeaning 2\tnotes 2",
                        "kanji 3\tpronunciation 3\tmeaning 3\t5\t3",
                        "kanji 4\tpronunciation 4\tmeaning 4\tnotes 4\t5\t5",
                        "kanji 5\tpronunciation 5\tmeaning 5",
                        ""
                    ].join("\r\n"),
                    false,
                    false
                );
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "example.tsv",
                        "meaning_language": "",
                        "notes_language": "ja",
                        "cards": [
                            ["kanji 1", "pronunciation 1", "meaning 1", "", ""],
                            ["kanji 2", "pronunciation 2", "meaning 2", "notes 2", ""],
                            ["kanji 3", "pronunciation 3", "meaning 3", "", "53"],
                            ["kanji 4", "pronunciation 4", "meaning 4", "notes 4", "55"],
                            ["kanji 5", "pronunciation 5", "meaning 5", "", ""]
                        ]
                    }
                );

                import_deck_from_tsv_string(
                    "example.tsv",
                    [
                        "kanji 1\tpronunciation 1\tthe\nmeaning\n1",
                        "kanji 2\tpronunciation 2\tthe meaning 2\tthe\nnotes\n2",
                        "kanji 3\tpronunciation 3\tthe meaning 3\t5\t3",
                        ""
                    ].join("\r\n"),
                    false,
                    true
                );
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "example.tsv",
                        "meaning_language": "",
                        "notes_language": "ja",
                        "cards": [
                            ["kanji 1", "pronunciation 1", "the meaning 1", "", ""],
                            ["kanji 2", "pronunciation 2", "the meaning 2", "the notes 2", ""],
                            ["kanji 3", "pronunciation 3", "the meaning 3", "", "53"]
                        ]
                    }
                );
            });

            QUnit.test("get_kanjivg", function(assert) {
                function assert_kanjivg(expected, kanji_char)
                {
                    if (expected === undefined) {
                        assert.strictEqual(undefined, look_up_kanjivg(kanji_char));
                    } else {
                        assert.strictEqual(
                            expected,
                            look_up_kanjivg(kanji_char)[0].substring(0, 1)
                        );
                    }
                }

                assert_kanjivg(undefined, "\t");
                assert_kanjivg("a", "a");
                assert_kanjivg("a", "ａ");
                assert_kanjivg("~", "~");
                assert_kanjivg("ア", "ア");
                assert_kanjivg("ア", "ｱ");
                assert_kanjivg("~", "～");
                assert_kanjivg("何", "何");
            });

            QUnit.test("add_cards_from_tsv", function(assert) {
                var key,
                    added_without_ignored_header,
                    added_with_ignored_header,
                    invalid_decks = {
                        "missing pronunciation": "kanji",
                        "missing meaning": "kanji\tpronunciation",
                        "kanji contains unknown characters": "☃\tpronunciation\tmeaning\tnotes"
                    };

                load_deck(
                    {
                        "name": "test deck",
                        "cards": [
                            [
                                "kanji 1",
                                "pronunciation 1",
                                "meaning 1",
                                "notes 1",
                                "555"
                            ],
                            [
                                "kanji 2",
                                "pronunciation 2",
                                "meaning 2",
                                "notes 2",
                                "333"
                            ]
                        ]
                    }
                );

                for (key in invalid_decks) {
                    if (invalid_decks.hasOwnProperty(key)) {
                        assert.throws(
                            function ()
                            {
                                add_cards_from_tsv_string(
                                    "example.tsv",
                                    invalid_decks[key],
                                    false,
                                    false
                                );
                            },
                            /Invalid deck/,
                            key
                        );
                    }
                }

                added_without_ignored_header = add_cards_from_tsv_string(
                    "example.tsv",
                    [
                        "kanji 2\tpronunciation 2\tmeaning 2\tnotes 2",
                        "",
                        "katakana 1\t\tkatakana meaning 1\tkatakana notes 2",
                        "kanji 3\tpronunciation \\x\\t\\r\\n\\\\3\tmeaning \\x\\t\\r\\n\\\\3\tnotes \\x\\t\\r\\n\\\\3\t5\t3\t0",
                        "kanji 1\tpronunciation 1\tmeaning 1\tnotes 1\t0\t0\t0",
                        "kanji 4\tpronunciation 4\tmeaning 4\t3\t3\t3",
                        ""
                    ].join("\r\n"),
                    false,
                    false
                )
                added_with_ignored_header = add_cards_from_tsv_string(
                    "example.tsv",
                    [
                        "Word\tPronunciation\tMeaning (header row)\tNotes (header row)",
                        "kanji 1\tpronunciation 1\tmeaning 1\tnotes 1",
                        "katakana 2\t\tkatakana meaning 2\tkatakana notes 2\t0\t3\t5",
                        "kanji 2\tpronunciation 2\tmeaning 2\tnotes 2",
                        "kanji 4\tpronunciation 4\tmeaning 4\tnotes are optional\t5\t5\t5",
                        ""
                    ].join("\r\n"),
                    true,
                    false
                )
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": [
                            ["kanji 1", "pronunciation 1", "meaning 1", "notes 1", "555"],
                            ["kanji 2", "pronunciation 2", "meaning 2", "notes 2", "333"],
                            ["katakana 1", "katakana 1", "katakana meaning 1", "katakana notes 2", ""],
                            ["kanji 3", "pronunciation \\x\t\r\n\\3", "meaning \\x\t\r\n\\3", "notes \\x\t\r\n\\3", ""],
                            ["kanji 4", "pronunciation 4", "meaning 4", "", ""],
                            ["katakana 2", "katakana 2", "katakana meaning 2", "katakana notes 2", ""],
                            ["kanji 4", "pronunciation 4", "meaning 4", "notes are optional", ""]
                        ]
                    }
                );
                assert.equal(added_without_ignored_header, 3);
                assert.equal(added_with_ignored_header, 2);

                load_deck({"name": "test deck", "cards": []});
                add_cards_from_tsv_string(
                    "example.tsv",
                    [
                        "Word\tPronunciation\tMeaning (header row)\tNotes (header row)\tGrade\tGrade",
                        "kanji 1\tpronunciation 1\tmeaning 1\tnotes 1\t5\t3",
                        ""
                    ].join("\r\n"),
                    true,
                    false
                )
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": [
                            ["kanji 1", "pronunciation 1", "meaning 1", "notes 1", ""],
                        ]
                    }
                );

                load_deck({"name": "test deck", "cards": []});
                add_cards_from_tsv_string(
                    "example.tsv",
                    [
                        "Word\tPronunciation\tMeaning (header row)\tNotes (header row)\tGrade\tGrade",
                        "kanji 1\tpronunciation 1\tthe\nmeaning\n1",
                        ""
                    ].join("\r\n"),
                    true,
                    true
                )
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": [
                            ["kanji 1", "pronunciation 1", "the meaning 1", "", ""],
                        ]
                    }
                );
            });

            QUnit.test("export_load", function(assert) {
                var deck = {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": [
                            [
                                "kanji 1 (perfect)",
                                "pronunciation 1",
                                "meaning 1",
                                "notes 1",
                                "5555555555"
                            ],
                            [
                                "kanji 2 (so-so)",
                                "pronunciation 2",
                                "meaning 2",
                                "notes 2",
                                "3333333333"
                            ]
                        ]
                    };

                load_deck(deck);
                assert.deepEqual(JSON.parse(export_deck_as_json_string(false)), deck);

                load_deck(
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": [
                            [
                                "kanji 1 (perfect)",
                                "pronunciation 1",
                                "meaning 1",
                                "5555555555"
                            ],
                            [
                                "kanji 2 (so-so)",
                                "pronunciation 2",
                                "meaning 2",
                                "3333333333"
                            ]
                        ]
                    }
                );
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": [
                            [
                                "kanji 1 (perfect)",
                                "pronunciation 1",
                                "meaning 1",
                                "",
                                "5555555555"
                            ],
                            [
                                "kanji 2 (so-so)",
                                "pronunciation 2",
                                "meaning 2",
                                "",
                                "3333333333"
                            ]
                        ]
                    }
                );

                load_deck({"name": "test deck", "cards": []});
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": []
                    }
                );

                load_deck({"name": "test deck", "meaning_language": "hu", "cards": []});
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "hu",
                        "notes_language": "",
                        "cards": []
                    }
                );

                load_deck({"name": "test deck", "notes_language": "hu", "cards": []});
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "hu",
                        "cards": []
                    }
                );

                load_deck(
                    {
                        "name": "test deck",
                        "meaning_language": "en",
                        "notes_language": "hu",
                        "cards": []
                    }
                );
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "en",
                        "notes_language": "hu",
                        "cards": []
                    }
                );
            });

            QUnit.test("add_card", function(assert) {
                load_deck(
                    {
                        "name": "test deck",
                        "cards": [
                            [
                                "kanji 1",
                                "pronunciation 1",
                                "meaning 1",
                                "notes 1",
                                ""
                            ],
                            [
                                "kanji 2",
                                "pronunciation 2",
                                "meaning 2",
                                "notes 2",
                                ""
                            ]
                        ]
                    }
                );

                add_card("kanji 3", "pronunciation 3", "meaning 3", "notes 3");

                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": [
                            [
                                "kanji 1",
                                "pronunciation 1",
                                "meaning 1",
                                "notes 1",
                                ""
                            ],
                            [
                                "kanji 2",
                                "pronunciation 2",
                                "meaning 2",
                                "notes 2",
                                ""
                            ],
                            [
                                "kanji 3",
                                "pronunciation 3",
                                "meaning 3",
                                "notes 3",
                                ""
                            ]
                        ]
                    }
                );
            });

            QUnit.test("replace_card", function(assert) {
                load_deck(
                    {
                        "name": "test deck",
                        "cards": [
                            [
                                "kanji 1",
                                "pronunciation 1",
                                "meaning 1",
                                "notes 1",
                                ""
                            ],
                            [
                                "kanji 2",
                                "pronunciation 2",
                                "meaning 2",
                                "notes 2",
                                ""
                            ],
                            [
                                "kanji 3",
                                "pronunciation 3",
                                "meaning 3",
                                "notes 3",
                                ""
                            ]
                        ]
                    }
                );

                replace_card(
                    1,
                    "kanji 2 modified",
                    "pronunciation 2 modified",
                    "meaning 2 modified",
                    "notes 2 modified"
                );

                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": [
                            [
                                "kanji 1",
                                "pronunciation 1",
                                "meaning 1",
                                "notes 1",
                                ""
                            ],
                            [
                                "kanji 2 modified",
                                "pronunciation 2 modified",
                                "meaning 2 modified",
                                "notes 2 modified",
                                ""
                            ],
                            [
                                "kanji 3",
                                "pronunciation 3",
                                "meaning 3",
                                "notes 3",
                                ""
                            ]
                        ]
                    }
                );
            });

            QUnit.test("replace_current_card", function(assert) {
                load_deck(
                    {
                        "name": "test deck",
                        "cards": [
                            [
                                "kanji",
                                "pronunciation",
                                "meaning",
                                "notes",
                                ""
                            ]
                        ]
                    }
                );

                pick_card_by_score();
                replace_current_card(
                    "kanji modified",
                    "pronunciation modified",
                    "meaning modified",
                    "notes modified"
                );

                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "meaning_language": "",
                        "notes_language": "",
                        "cards": [
                            [
                                "kanji modified",
                                "pronunciation modified",
                                "meaning modified",
                                "notes modified",
                                ""
                            ]
                        ]
                    }
                );
            });

            QUnit.test("calculate_score_percentage", function(assert) {
                var B = GRADE_BAD,
                    S = GRADE_SOSO,
                    G = GRADE_GOOD,
                    E = GRADE_EASY;

                function assert_score_percentage(expected, grades)
                {
                    var actual = calculate_score_percentage(grades),
                        diff = Math.abs(expected - actual);

                    assert.ok(
                        diff < 0.1,
                        (
                            "Expected " + String(expected)
                            + ", got " + String(actual)
                            + " (diff: " + String(diff) + ")"
                            + " for " + JSON.stringify(grades, null, 0)
                        )
                    );
                }

                initialize_perfect_score();

                assert_score_percentage(-1.0, []);

                assert_score_percentage(0.0, [B]);
                assert_score_percentage(3.0, [S]);
                assert_score_percentage(5.0, [G]);
                assert_score_percentage(9.0, [E]);

                assert_score_percentage(0.0, [B, B, B, B, B,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(45.0, [S, S, S, S, S,  S, S, S, S, S,  S, S, S, S, S]);
                assert_score_percentage(76.0, [G, G, G, G, G,  G, G, G, G, G,  G, G, G, G, G]);
                assert_score_percentage(100.0, [E, E, E, E, E,  E, E, E, E, E,  E, E, E, E, E]);

                assert_score_percentage(20.0, [S, B, B, B, B,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(29.0, [S, B, S, B, S,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(40.0, [S, S, S, B, S,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(43.0, [S, S, S, S, S,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(62.0, [G, G, S, S, B,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(68.0, [G, G, G, S, S,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(71.0, [G, G, G, G, S,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(72.0, [G, G, G, G, G,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(95.0, [E, E, B, B, B,  B, B, B, B, B,  B, B, B, B, B]);
                assert_score_percentage(59.0, [G, S, S, S, S,  S, S, S, S, S,  B, B, B, B, B]);
                assert_score_percentage(71.0, [G, G, G, S, S,  S, S, S, S, S,  B, B, B, B, B]);
                assert_score_percentage(74.0, [G, G, G, G, G,  S, S, S, S, S,  B, B, B, B, B]);
                assert_score_percentage(88.0, [E, G, B, S, S,  S, S, S, S, S,  B, B, B, B, B]);
                assert_score_percentage(100.0, [E, E, G, B, S,  S, S, S, S, S,  S, B, B, B, B]);
                assert_score_percentage(88.0, [E, B, E, G, B,  S, S, S, S, S,  S, B, B, B, B]);

                assert_score_percentage(75.0, [B, E, E, E, E,  E, E, E, E, E,  E, E, E, E, E]);
                assert_score_percentage(95.0, [S, E, E, E, E,  E, E, E, E, E,  E, E, E, E, E]);
                assert_score_percentage(100.0, [G, E, E, E, E,  E, E, E, E, E,  E, E, E, E, E]);

                assert_score_percentage(4.0, [S, B]);
                assert_score_percentage(8.0, [S, S, B]);
                assert_score_percentage(6.0, [S, S]);
                assert_score_percentage(11.0, [G, S, B]);
                assert_score_percentage(15.0, [G, G, G]);
                assert_score_percentage(16.0, [G, S, B, B, B]);
                assert_score_percentage(25.0, [G, G, G, G, G]);
                assert_score_percentage(52.0, [E, G, G, S, S, S, B, B]);
                assert_score_percentage(18.0, [E, E]);
                assert_score_percentage(33.0, [E, E, G, G]);
                assert_score_percentage(40.0, [E, E, G, G, G]);
                assert_score_percentage(42.0, [G, E, E, E, G, G]);
                assert_score_percentage(43.0, [E, E, E, G, G]);
                assert_score_percentage(43.0, [G, G, E, E, E, G, G]);
                assert_score_percentage(45.0, [G, G, G, E, E, E, G, G]);
                assert_score_percentage(48.0, [G, G, G, G, E, E, E, G, G]);
            });
        });

        QUnit.module("formatting", function () {
            QUnit.test("quote_html", function(assert) {
                assert.equal(quote_html("<>&\"'"), "&lt;&gt;&amp;&quot;&#039;");
            });

            QUnit.test("format_text", function(assert) {
                var i, l,
                    tests = [
                        [
                            "hello world",
                            "hello world"
                        ],
                        [
                            "_emphasis_ *strong* {small}\n<-- -" + "->",
                            "<em>emphasis</em> <strong>strong</strong> <small>(small)</small><br/>&larr; &rarr;"
                        ],
                        [
                            "{お好み焼き|おこのみやき}",
                            "<span class=\"furigana\"><ruby>お好み焼き<rt>おこのみやき</rt></ruby></span>"
                        ]
                    ];

                for (i = 0, l = tests.length; i < l; ++i) {
                    assert.equal(format_text(tests[i][0]), tests[i][1]);
                }
            });
        });

        QUnit.module("scheduling", function () {
            QUnit.test("pick_card_by_score", function(assert) {
                var picked_card_refs = [],
                    order = "";

                load_deck(
                    {
                        "name": "test deck",
                        "cards": [
                            [
                                "kanji 1 (perfect, easy)",
                                "pronunciation 1",
                                "meaning 1",
                                "notes 1",
                                "9999999999"
                            ],
                            [
                                "kanji 2 (so-so)",
                                "pronunciation 2",
                                "meaning 2",
                                "notes 2",
                                "3333333333"
                            ],
                            [
                                "kanji 3 (similar score to kanji 2)",
                                "pronunciation 3",
                                "meaning 3",
                                "notes 3",
                                "3333333335"
                            ],
                            [
                                "kanji 4 (recently learned)",
                                "pronunciation 4",
                                "meaning 2",
                                "notes 2",
                                "5533300000"
                            ],
                            [
                                "kanji 5 (recently forgotten)",
                                "pronunciation 5",
                                "meaning 5",
                                "notes 5",
                                "3333355555"
                            ],
                            [
                                "kanji 6 (never studied)",
                                "pronunciation 6",
                                "meaning 6",
                                "notes 6",
                                ""
                            ]
                        ]
                    }
                );

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_SOSO);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                learn();
                learn();

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_SOSO);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_EASY);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_BAD);

                reset_card_ref_order();

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_SOSO);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                order = picked_card_refs.join("");
                assert.equal(order, "125430514203");
                assert.equal(answered, 12);
            });

            QUnit.test("newly_learned_cards", function(assert) {
                var picked_card_refs = [],
                    order = "";

                load_deck(
                    {
                        "name": "test deck",
                        "cards": [
                            ["kanji 1", "pronunciation 1", "meaning 1", "notes 1", ""],
                            ["kanji 2", "pronunciation 2", "meaning 2", "notes 2", ""],
                            ["kanji 3", "pronunciation 3", "meaning 3", "notes 3", ""],
                            ["kanji 4", "pronunciation 4", "meaning 2", "notes 2", ""],
                            ["kanji 5", "pronunciation 5", "meaning 5", "notes 5", ""],
                            ["kanji 6", "pronunciation 6", "meaning 6", "notes 6", ""]
                        ]
                    }
                );

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_BAD);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_SOSO);

                reset_card_ref_order();

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_GOOD);

                learn();

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_BAD);

                learn();

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_SOSO);

                learn();

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(GRADE_SOSO);

                order = picked_card_refs.join("");
                assert.equal(order, "012021345");
                assert.equal(answered, 9);
            });

            QUnit.test("pick_card_randomly", function(assert) {
                var previous_pick = -1,
                    i;

                load_deck(
                    {
                        "name": "test deck",
                        "cards": [
                            ["kaji 1", "pronunciation 1", "meaning 1", "notes 1", "5"],
                            ["kaji 2", "pronunciation 2", "meaning 2", "notes 2", "5"],
                            ["kaji 3", "pronunciation 3", "meaning 3", "notes 3", "5"],
                            ["kaji 4", "pronunciation 4", "meaning 4", "notes 4", "5"],
                            ["kaji 5", "pronunciation 5", "meaning 5", "notes 5", "5"],
                            ["kaji 6", "pronunciation 6", "meaning 6", "notes 6", "5"],
                            ["kaji 7", "pronunciation 7", "meaning 7", "notes 7", "5"],
                            ["kaji 8", "pronunciation 8", "meaning 8", "notes 8", "5"],
                            ["kaji 9", "pronunciation 9", "meaning 9", "notes 9", "5"],
                            ["kaji 10", "pronunciation 10", "meaning 10", "notes 10", ""],
                            ["kaji 11", "pronunciation 11", "meaning 11", "notes 11", ""],
                            ["kaji 12", "pronunciation 12", "meaning 12", "notes 12", ""],
                            ["kaji 13", "pronunciation 13", "meaning 13", "notes 13", ""],
                            ["kaji 14", "pronunciation 14", "meaning 14", "notes 14", ""],
                            ["kaji 15", "pronunciation 15", "meaning 15", "notes 15", ""],
                        ]
                    }
                );

                for (i = 0; i < 50; ++i) {
                    pick_card_randomly();
                    assert.ok(
                        5 <= current_card_ref && current_card_ref < 10,
                        "Unexpected pick: " + String(current_card_ref)
                    );
                    assert.ok(
                        previous_pick != current_card_ref,
                        "Repeated pick: " + String(current_card_ref)
                    );
                    previous_pick = current_card_ref;
                }
            });
        })
    }

    window.onload = function ()
    {
        if (typeof(QUnit) === "object") {
            console.log("QUnit detected, running tests...");
            run_tests();
        } else {
            main();
        }
    };

}())
