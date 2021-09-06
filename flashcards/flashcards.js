(function () {

    "use strict";

    var MAX_NOTES = 21,
        MAX_GRADES = 15,
        EDITOR_EXIT_CONFIRM = (
            "You have unsaved changes in the card editor."
            + " Are you sure you want to navigate away and lose those changes?"
        ),
        routing,
        deck,
        menu,
        menu_export,
        load_dragndrop,
        load_input,
        load_cancel,
        no_cards,
        practice_screen,
        load_screen,
        current_card,
        current_card_ref = null,
        answered,
        score,
        next_card_ref_ref,
        note_ids,
        card_refs,
        to_learn,
        practice_card,
        practice_index,
        practice_question,
        practice_answer,
        practice_notes,
        stats,
        grade_form,
        next_action,
        learn_button,
        message,
        message_timeout,
        last_order_reset,
        confirm_modal,
        confirm_message,
        confirm_callback,
        all_cards,
        all_cards_list,
        editor_screen,
        editor_side_1,
        editor_side_2,
        editor_side_1_orig,
        editor_side_2_orig,
        editor_note_inputs,
        editor_note_origs,
        editor_note_containers,
        editor_note_suggestions,
        editor_side_1_preview,
        editor_side_2_preview,
        editor_mode,
        editor_buttons_new,
        editor_buttons_current,
        editor_button_save,
        editor_button_save_new;

    function main()
    {
        initialize_gui();
        restore_state();
        route();
    }

    function route()
    {
        var url = String(window.location.href),
            match, num;

        routing = true;

        if (match = url.match(/#([qe])-([0-9]+)$/)) {
            num = Number(match[2]) - 1;

            if (num >= 0 && num < deck["cards"].length) {
                store_pick(num);
                show_practice_screen();
                show_current_card();

                if (match[1] === "e") {
                    edit_current_card();
                }

                routing = false;

                return;
            }
        } else if (match = url.match(/#load$/)) {
            start_practising();
            handle_load_confirmation();
            routing = false;

            return;
        } else if (match = url.match(/#new$/)) {
            start_practising();
            hide(practice_screen);
            show_editor("new-card", "", "", []);
            routing = false;

            return;
        } else if (match = url.match(/#all$/)) {
            start_practising();
            hide(practice_screen);
            show_all_cards();
            routing = false;

            return;
        } else if (url.match(/#top$/)) {
            if (current_card_ref !== null) {
                routing = false;

                return;
            }
        }

        routing = false;
        start_practising();
    }

    function initialize_gui()
    {
        var i, si;

        message_timeout = null;

        load_deck({"name": "flashcards", "notes": [], "cards": []});
        menu = $("menu");
        load_dragndrop = $("load-dragndrop");
        load_input = $("load-input");
        load_screen = $("load-screen");
        practice_screen = $("practice-screen")
        no_cards = $("no-cards");
        practice_card = $("practice-card");
        practice_index = $("practice-card-index");
        practice_question = $("practice-card-question");
        practice_answer = $("practice-card-answer");
        practice_notes = $("practice-card-notes");
        grade_form = $("grade");
        stats = $("stats");
        learn_button = $("learn-button");
        message = $("message");
        menu_export = $("menu-export");
        confirm_modal = $("confirm");
        confirm_message = $("confirm-message");
        all_cards = $("all-cards");
        all_cards_list = $("all-cards-list");
        editor_screen = $("editor-screen");
        editor_side_1 = $("side-1");
        editor_side_2 = $("side-2");
        editor_note_suggestions = $("notes-datalist");
        editor_side_1_preview = $("side-1-preview");
        editor_side_2_preview = $("side-2-preview");
        editor_buttons_current = $("editor-buttons-current");
        editor_buttons_new = $("editor-buttons-new");
        editor_button_save = $("edit-save");
        editor_button_save_new = $("edit-save-new");

        $("practice-form").onsubmit = stop_event;
        $("editor-form").onsubmit = stop_event;
        $("load-form").onsubmit = stop_event;
        $("menu-button").onclick = handle_menu_button_click;
        $("menu-hide").onclick = handle_hide_menu_click;
        $("menu-load").onclick = handle_menu_load_click;
        $("no-cards-load").onclick = handle_menu_load_click;
        $("confirm-yes").onclick = handle_confirm_yes_click;
        $("confirm-no").onclick = handle_confirm_no_click;
        $("load-cancel").onclick = handle_load_cancel_click;
        $("grade-bad").onclick = handle_grade_bad_click;
        $("grade-soso").onclick = handle_grade_soso_click;
        $("grade-good").onclick = handle_grade_good_click;
        $("menu-show-all").onclick = handle_menu_show_all_click;
        $("all-cards-back").onclick = handle_all_cards_back_click;
        $("menu-edit").onclick = handle_menu_edit_click;
        $("edit-cancel").onclick = handle_edit_cancel_click;
        $("menu-create").onclick = handle_menu_create_click;
        $("no-cards-create").onclick = handle_menu_create_click;
        $("edit-back").onclick = handle_edit_cancel_click;

        editor_button_save.onclick = handle_edit_save_click;
        editor_button_save_new.onclick = handle_edit_save_new_click;

        editor_note_inputs = [];
        editor_note_origs = [];
        editor_note_containers = [];

        for (i = 0; i < MAX_NOTES; ++i) {
            si = String(i);
            editor_note_containers[i] = $("note-" + si + "-container");
            editor_note_inputs[i] = $("note-" + si);
            editor_note_inputs[i].onchange = handle_editor_note_input_blur;
            editor_note_inputs[i].onblur = handle_editor_note_input_blur;
            editor_note_origs[i] = "";
        }

        editor_side_1.onblur = handle_editor_side_1_blur;
        editor_side_1.onchange = handle_editor_side_1_blur;
        editor_side_2.onblur = handle_editor_side_2_blur;
        editor_side_2.onchange = handle_editor_side_2_blur;

        menu_export.onclick = handle_menu_export_click;

        learn_button.onclick = handle_learn_button_click;

        load_input.onchange = handle_load_input_change;
        load_dragndrop.ondrop = handle_file_drop;
        load_dragndrop.ondragover = stop_event;

        practice_card.onclick = handle_practice_card_click;

        populate_editor("new-card", "", "", []);

        window.addEventListener("drop", stop_event);
        window.addEventListener("dragover", stop_event);
        window.addEventListener("beforeunload", handle_beforeunload);
        window.addEventListener("popstate", handle_popstate);
    }

    function $(obj)
    {
        if (typeof(obj) === "string") {
            obj = document.getElementById(obj);
        }

        return obj;
    };

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
        hide(practice_screen);
        show(load_screen);
    }

    function handle_load_cancel_click(evt)
    {
        hide(menu);
        show_practice_screen();

        return stop_event(evt);
    }

    function show_practice_screen()
    {
        hide(menu);
        hide(all_cards);
        hide(load_screen);
        hide(editor_screen);
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
        return handle_grade_click(evt, 0);
    }

    function handle_grade_click(evt, score)
    {
        grade(score);

        if (to_learn.length > 0) {
            show(learn_button);
        }

        continue_practising();

        return stop_event(evt);
    }

    function handle_grade_soso_click(evt)
    {
        return handle_grade_click(evt, 1);
    }

    function handle_grade_good_click(evt)
    {
        return handle_grade_click(evt, 2);
    }

    function handle_menu_show_all_click(evt)
    {
        show_all_cards();

        return stop_event(evt);
    }

    function show_all_cards()
    {
        var cards = deck["cards"],
            notes = deck["notes"],
            html = [],
            card,
            i, l;

        push_history("all");
        hide(menu);
        hide(practice_screen);

        all_cards_list.innerHTML = "";

        for (i = 0, l = cards.length; i < l; ++i) {
            card = cards[i];
            html.push(card_to_list_item_html(i + 1, card, notes));
        }

        all_cards_list.innerHTML = html.join("");

        show(all_cards);
    }

    function card_to_list_item_html(index, card, notes)
    {
        index = String(index);

        return [
            "<li value=\"" + index + "\">",
                "<dt>",
                    card_side_to_list_item_html(card["side_2"]),
                "</dt>",
                "<dd>",
                    "<div>",
                        card_side_to_list_item_html(card["side_1"]),
                        "<a class=\"edit\" href=\"#e-" + index + "\">Edit and learn this card</a>",
                    "</div>",
                    "<div class=\"notes\">",
                        format_notes(notes, card["note_refs"]),
                    "</div>",
                    "<div class=\"score\">",
                        "Score: " + String(calculate_score_percentage(card)) + "%",
                    "</div>",
                "</dd>",
                "<div class=\"expand\"></div>",
            "</li>"
        ].join("");
    }

    function calculate_score_percentage(card)
    {
        var grades = card["grades"],
            max = MAX_GRADES * 2,
            sum = 0,
            i, l;

        for (i = 0, l = grades.length; i < l; ++i) {
            sum += grades[i];
        }

        sum = Math.min(sum, max);

        return Math.round(sum * 100.0 / max);
    }

    function card_side_to_list_item_html(side)
    {
        var with_furigana = side,
            without_furigana = remove_furigana(side);

        if (without_furigana == with_furigana) {
            return (
                "<div class=\"without_furigana\">"
                + format_text(without_furigana)
                + "</div>"
            );
        }

        return (
            "<div class=\"without_furigana\">"
            + format_text(without_furigana)
            + "</div><div class=\"with_furigana\">"
            + format_text(with_furigana)
            + "</div>"
        );
    }

    function remove_furigana(text)
    {
        return text.replace(/\{([^|}]*)([^|}]*?)([^|}]*?)\|\1([^}]*)\3\}/g, "$1$2$3");
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

    function handle_all_cards_back_click(evt)
    {
        hide(all_cards);
        show_practice_screen();
        show_current_card();
        all_cards_list.innerHTML = "";

        return stop_event(evt);
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

    function edit_current_card()
    {
        hide(menu);
        hide(practice_screen);
        show_editor(
            "current-card",
            current_card["side_1"],
            current_card["side_2"],
            current_card["note_refs"]
        );

        push_history("e-" + String(current_card_ref + 1));
    }

    function push_history(hash)
    {
        var url;

        if (routing) {
            return;
        }

        url = new URL(window.location);
        url.hash = hash;

        window.history.pushState({}, document.title, url);
    }

    function show_editor(mode, side_1, side_2, note_refs)
    {
        hide(all_cards);
        populate_editor(mode, side_1, side_2, note_refs);
        show(editor_screen);
        editor_side_1.focus();
    }

    function populate_editor(mode, side_1, side_2, note_refs)
    {
        var notes = deck["notes"],
            i, l, v;

        editor_mode = mode;
        editor_side_1.value = side_1;
        editor_side_2.value = side_2;

        editor_side_1_orig = side_1;
        editor_side_2_orig = side_2;

        l = note_refs.length;

        for (i = 0; i < MAX_NOTES; ++i) {
            if (i < l) {
                v = notes[note_refs[i]];
                show(editor_note_containers[i]);
            } else {
                v = "";
                hide(editor_note_containers[i]);
            }

            editor_note_inputs[i].value = v;
            editor_note_origs[i] = v;
        }

        if (l < MAX_NOTES) {
            show(editor_note_containers[l]);
        }

        update_editor_note_suggestions();
        editor_side_1_preview.innerHTML = format_text(editor_side_1.value);
        editor_side_2_preview.innerHTML = format_text(editor_side_2.value);

        if (mode === "current-card") {
            show(editor_buttons_current);
            hide(editor_buttons_new);
            editor_button_save.disabled = false;
            editor_button_save_new.disabled = true;
        } else {
            hide(editor_buttons_current);
            show(editor_buttons_new);
            editor_button_save.disabled = true;
            editor_button_save_new.disabled = false;
        }
    }

    function update_editor_note_suggestions()
    {
        var notes = deck["notes"],
            html = [],
            note,
            i, l;

        for (i = 0, l = notes.length; i < l; ++i) {
            note = quote_html(notes[i]);
            html.push(
                "<option value=\"" + note + "\">" + note + "</option>"
            );
        }

        html.sort();

        editor_note_suggestions.innerHTML = html.join("");
    }

    function handle_edit_cancel_click(evt)
    {
        if (is_editor_dirty()) {
            ask_for_confirmation(EDITOR_EXIT_CONFIRM, close_editor);
        } else {
            close_editor();
        }

        return stop_event(evt);
    }

    function is_editor_dirty()
    {
        var i;

        if (editor_side_1_orig !== editor_side_1.value) {
            return true;
        }

        if (editor_side_2_orig !== editor_side_2.value) {
            return true;
        }

        for (i = 0; i < MAX_NOTES; ++i) {
            if (editor_note_inputs[i].value !== editor_note_origs[i]) {
                return true;
            }
        }

        return false;
    }

    function close_editor()
    {
        if (current_card) {
            show_current_card();
        }

        show_editor("new-card", "", "", []);
        hide(editor_screen);
        show_practice_screen();
    }

    function handle_edit_save_click(evt)
    {
        replace_current_card(
            editor_side_1.value,
            editor_side_2.value,
            collect_notes_from_editor()
        );
        close_editor();
        show_message("Card #" + String(current_card_ref + 1) + " saved.", 2400);
        show_current_card();
        show_practice_screen();

        return stop_event(evt);
    }

    function replace_current_card(side_1, side_2, notes)
    {
        var new_note_created,
            note_refs,
            tmp;

        tmp = merge_notes(notes);
        new_note_created = tmp[0];
        note_refs = tmp[1];

        current_card["side_1"] = side_1;
        current_card["side_2"] = side_2;
        current_card["note_refs"] = note_refs;

        return new_note_created;
    }

    function handle_menu_create_click(evt)
    {
        hide(menu);
        hide(practice_screen);

        show_editor("new-card", "", "", []);
        push_history("new");

        return stop_event(evt);
    }

    function handle_edit_save_new_click(evt)
    {
        add_card(
            editor_side_1.value,
            editor_side_2.value,
            collect_notes_from_editor()
        );

        if (deck["cards"].length === 1) {
            learn();
            pick_card();
            hide(no_cards);
            show_current_card();
        }

        show_editor("new-card", "", "", []);
        show_message("Added card #" + String(deck["cards"].length) + " to the deck.", 2400);

        return stop_event(evt);
    }

    function collect_notes_from_editor()
    {
        var notes = [],
            note,
            i;

        for (i = 0; i < MAX_NOTES; ++i) {
            note = String(editor_note_inputs[i].value).trim();

            if (note !== "") {
                notes.push(note);
            }
        }

        return notes;
    }

    function add_card(side_1, side_2, notes)
    {
        var cards = deck["cards"],
            card,
            note_refs,
            tmp,
            new_note_created,
            i, l;

        tmp = merge_notes(notes);
        new_note_created = tmp[0];
        note_refs = tmp[1];

        to_learn.push(cards.length);
        cards.push(create_card(side_1, side_2, note_refs, []));

        return new_note_created;
    }

    function merge_notes(new_notes)
    {
        var notes,
            note,
            note_refs,
            note_key,
            new_note_created,
            i, l;

        notes = deck["notes"];
        note_refs = [];
        new_note_created = false;

        for (i = 0, l = new_notes.length; i < l; ++i) {
            note = new_notes[i].trim();
            note_key = note_to_key(note);

            if (!note_ids.hasOwnProperty(note_key)) {
                note_ids[note_key] = notes.length;
                notes.push(note);
                new_note_created = true;
            }

            note_refs.push(note_ids[note_key]);
        }

        return [new_note_created, note_refs];
    }

    function show_message(text, hide_after)
    {
        message.innerHTML = quote_html(text);
        show(message);

        if (message_timeout !== null) {
            clearTimeout(message_timeout);
        }

        message_timeout = setTimeout(hide_message, hide_after);
        window.location = "#top";
    }

    function handle_editor_note_input_blur(evt)
    {
        var i, l;

        for (i = MAX_NOTES - 1; i >= 0; --i) {
            if (editor_note_inputs[i].value !== "") {
                if (i < MAX_NOTES - 1) {
                    show(editor_note_containers[i + 1]);
                }

                break;
            }
        }

        return true;
    }

    function handle_editor_side_1_blur(evt)
    {
        editor_side_1_preview.innerHTML = format_text(editor_side_1.value);

        return true;
    }

    function handle_editor_side_2_blur(evt)
    {
        editor_side_2_preview.innerHTML = format_text(editor_side_2.value);

        return true;
    }

    function handle_menu_export_click(evt)
    {
        var name = deck["name"];

        hide(menu);

        if (name === "") {
            name = "deck.json";
        } else if (!name.match(/\.json$/)) {
            name = name + ".json";
        }

        menu_export.href = URL.createObjectURL(
            new Blob([export_deck(true)], {"type": "application/json"})
        );
        menu_export.download = name;

        return true;
    }

    function export_deck(indent)
    {
        var notes = deck["notes"],
            cards = deck["cards"],
            exported_notes = [],
            exported_cards = [],
            notes_remap = {},
            card,
            note,
            note_key,
            exported_card_notes,
            grades,
            exported_grades,
            i, l, j, ll;

        for (i = 0, l = cards.length; i < l; ++i) {
            card = cards[i];
            exported_card_notes = [];

            for (j = 0, ll = card["note_refs"].length; j < ll; ++j) {
                note = notes[card["note_refs"][j]];
                note_key = "note-" + note;

                if (!notes_remap.hasOwnProperty(note_key)) {
                    notes_remap[note_key] = String(exported_notes.length);
                    exported_notes.push(note);
                }

                exported_card_notes.push(notes_remap[note_key]);
            }

            grades = card["grades"];
            exported_grades = [];

            for (j = 0, ll = grades.length; j < ll; ++j) {
                exported_grades.push(String(grades[j]));
            }

            exported_cards.push(
                [
                    card["side_1"],
                    card["side_2"],
                    exported_card_notes.join(","),
                    exported_grades.join("")
                ]
            );
        }

        return JSON.stringify(
            {
                "name": deck["name"],
                "notes": exported_notes,
                "cards": exported_cards
            },
            null,
            indent ? 2 : 0
        );
    }

    function handle_learn_button_click(evt)
    {
        hide(learn_button);
        learn();
        show_message("Scheduled a new card.", 2400);

        return stop_event(evt);
    }

    function learn()
    {
        var ref;

        if (to_learn.length < 1) {
            return;
        }

        ref = to_learn.shift();

        card_refs.splice(next_card_ref_ref, 0, ref);
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
            load_deck_from_file(load_input.files[0]);
        }

        load_input.value = null;
    }

    function load_deck_from_file(file)
    {
        var reader = new FileReader(),
            handle_error;

        handle_error = function () {
            alert("Error reading file: " + String(reader.error || "unknown error"));
        };

        reader.onerror = handle_error;
        reader.onabort = handle_error;
        reader.onload = function ()
        {
            var name = String(file.name),
                error;

            try {
                load_deck_from_string(reader.result);
            } catch (error) {
                alert(error);
                return;
            }

            start_practising();

            show_message("Loaded " + name + ".", 2400);

            if (!deck["name"]) {
                deck["name"] = name;
            }

            update_title();
            store_state();
            show_practice_screen();
        };

        reader.readAsText(file);
    }

    function load_deck_from_string(deck_str)
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
            notes,
            raw_cards,
            raw_notes,
            raw_card,
            raw_grades,
            raw_note_refs,
            raw_note_ref,
            note_refs,
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

        cards = [];
        notes = [];
        note_ids = {};
        card_refs = [];
        to_learn = [];
        answered = 0;
        score = 0;

        deck = {
            "name": raw_deck.hasOwnProperty("name") ? raw_deck["name"] : "",
            "notes": [],
            "cards": []
        };
        raw_cards = raw_deck["cards"];
        raw_notes = raw_deck["notes"];

        for (i = 0, l = raw_notes.length; i < l; ++i) {
            notes.push(raw_notes[i].trim());
        }

        for (i = 0, l = raw_cards.length; i < l; ++i) {
            raw_card = raw_cards[i];
            raw_note_refs = raw_card[2];
            raw_grades = raw_card[3];

            grades = [];

            if (raw_grades === "") {
                to_learn.push(i);
            } else {
                card_refs.push(i);

                for (j = 0, ll = raw_grades.length; j < ll; ++j) {
                    grades.push(parseInt(raw_grades[j], 10));
                }
            }

            note_refs = [];

            if (raw_note_refs !== "") {
                raw_note_refs = raw_note_refs.split(",");

                for (j = 0, ll = raw_note_refs.length; j < ll; ++j) {
                    raw_note_ref = raw_note_refs[j];

                    if (raw_note_ref !== "") {
                        note_refs.push(parseInt(raw_note_ref, 10));
                    }
                }
            }

            cards.push(create_card(raw_card[0], raw_card[1], note_refs, grades));
        }

        for (i = 0, l = notes.length; i < l; ++i) {
            note_ids[note_to_key(notes[i])] = i;
        }

        deck["cards"] = cards;
        deck["notes"] = notes;
        last_order_reset = 0;

        reset_card_ref_order();

        if (card_refs.length < 1) {
            learn();
            learn();
            learn();
        }

        return deck;
    }

    function create_card(side_1, side_2, note_refs, grades)
    {
        return {
            "side_1": side_1,
            "side_2": side_2,
            "note_refs": note_refs,
            "grades": grades,
            "score": calculate_score(grades),
            "studied": 0,
            "priority": 0
        };
    }

    function note_to_key(note)
    {
        return "note-" + String(note).trim();
    }

    function validate_deck(raw_deck)
    {
        var notes,
            note,
            cards,
            card,
            card_note_refs,
            card_note_ref,
            scores,
            score,
            dump,
            i, j, l, ll;

        if (typeof(raw_deck) !== "object" || !raw_deck) {
            throw "the deck should be an JSON object";
        }

        if (!(raw_deck.hasOwnProperty("notes") && raw_deck.hasOwnProperty("cards"))
        ) {
            throw "the deck must have the following keys 'notes', 'cards'";
        }

        if (raw_deck.hasOwnProperty("name") && typeof(raw_deck["name"]) !== "string") {
            throw "the deck's 'name' must be string"
        }

        if (!(Array.isArray(raw_deck["notes"]) && Array.isArray(raw_deck["cards"]))) {
            throw "'notes' and 'cards' must be arrays";
        }

        notes = raw_deck["notes"];

        for (i = 0, l = notes.length; i < l; ++i) {
            note = notes[i];

            if (typeof(note) !== "string") {
                throw "notes must be strings: " + String(note);
            }
        }

        cards = raw_deck["cards"];

        for (i = 0, l = cards.length; i < l; ++i) {
            card = cards[i];
            dump = JSON.stringify(card);

            if (!(Array.isArray(card) && card.length === 4)) {
                throw "all cards must be arrays of 4 elements: " + card;
            }

            if (
                typeof(card[0]) !== "string"
                || typeof(card[1]) !== "string"
                || typeof(card[2]) !== "string"
                || typeof(card[3]) !== "string"
            ) {
                throw "elements of a card (side 1, side 2, note references, grades) must be strings: " + dump;
            }

            if (!card[2].match(/^([0-9]+(,[0-9]+)*)?$/)) {
                throw "note references must be a comma separated list of integers: " + dump;
            }

            if (!card[3].match(/^[012]*$/)) {
                throw "grades must be a string of integers between 0 and 2: " + dump;
            }

            card_note_refs = card[2].split(",");

            for (j = 0, ll = card_note_refs.length; j < ll; ++j) {
                card_note_ref = card_note_refs[j];

                if (card_note_ref !== "") {
                    card_note_ref = parseInt(card_note_ref, 10);

                    if (typeof(notes[card_note_ref]) === "undefined") {
                        throw "invalid note reference: " + String(card_note_ref) + ", card: " + dump;
                    }
                }
            }
        }
    }

    function calculate_score(grades)
    {
        var q = 0.64,
            weight = 1.0,
            sum_grades = 0,
            sum_weights = 0,
            i, l;

        if (grades.length < 1) {
            return 0;
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
                return cards[a]["priority"] - cards[b]["priority"];
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
        return deck["name"] ? deck["name"] + " - Flashcards" : "Flashcards";
    }

    function store_state()
    {
        localStorage.setItem("deck", export_deck(false));
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
        if (Math.random() > 0.25) {
            pick_card_by_score();
        } else {
            pick_card_randomly();
        }
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
        current_card_ref = pick;
        current_card = deck["cards"][current_card_ref];
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
        if (Math.random() < 0.5) {
            show_question(
                current_card["side_1"],
                current_card["side_2"],
                current_card["note_refs"]
            );
        } else {
            show_question(
                current_card["side_2"],
                current_card["side_1"],
                current_card["note_refs"]
            );
        }

        push_history("q-" + String(current_card_ref + 1));
    }

    function show_question(question, answer, note_refs)
    {
        hide(grade_form);
        hide(practice_answer);
        hide(practice_notes);
        hide_furigana();

        stats.innerHTML = String(score) + " / " + String(answered);
        practice_index.innerHTML = String(current_card_ref + 1) + ".";
        practice_question.innerHTML = format_text(question);
        practice_answer.innerHTML = format_text(answer);
        practice_notes.innerHTML = format_notes(deck["notes"], note_refs);

        if (question.match(/\{[^|}]*\|[^|}]*\}/)) {
            next_action = reveal_furigana;
        } else {
            next_action = reveal_answer;
        }
    }

    function hide_furigana()
    {
        practice_card.setAttribute("class", "");
    }

    function reveal_furigana()
    {
        practice_card.setAttribute("class", "furigana-visible");
        next_action = reveal_answer;
    }

    function reveal_answer()
    {
        reveal_furigana();
        show(practice_answer);
        show(practice_notes);
        next_action = show_grade_form;
    }

    function show_grade_form()
    {
        show(grade_form);
        next_action = null;
    }

    function handle_file_drop(evt)
    {
        if (evt.dataTransfer && evt.dataTransfer.items) {
            if (evt.dataTransfer.items.length >= 1) {
                load_deck_from_file(evt.dataTransfer.items[0].getAsFile());
            }
        } else if (evt.dataTransfer && evt.dataTransfer.files) {
            if (ev.dataTransfer.files.length >= 1) {
                load_deck_from_file(evt.dataTransfer.files[0]);
            }
        } else {
            alert("Your browser does not seem to support drag and drop.");
        }

        return stop_event(evt);
    }

    function restore_state()
    {
        var error,
            saved_deck;

        saved_deck = localStorage.getItem("deck");

        if (saved_deck) {
            try {
                load_deck_from_string(saved_deck);
                return;
            } catch (error) {
                localStorage.removeItem("deck");
            }
        }
    }

    function format_notes(notes, note_refs)
    {
        var i, l, formatted;

        if (note_refs.length === 0) {
            return "";
        }

        formatted = [];

        for (i = 0, l = note_refs.length; i < l; ++i) {
            formatted.push(format_text(notes[note_refs[i]]));
        }

        return (
            "<ul><li>"
            + formatted.join("</li><li>")
            + "</li></ul>"
        );
    }

    function handle_practice_card_click(evt)
    {
        if (next_action) {
            next_action();
        }

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
        score += grade;
    }

    function handle_beforeunload(evt)
    {
        store_state();

        if (is_editor_dirty()) {
            show_message(EDITOR_EXIT_CONFIRM, 6000);
            evt.preventDefault();
            evt.returnValue = EDITOR_EXIT_CONFIRM;

            return EDITOR_EXIT_CONFIRM;
        }
    }

    function handle_popstate(evt)
    {
        route();
    }

    function run_tests()
    {
        QUnit.module("state_handling", function () {
            QUnit.test("load_deck", function(assert) {
                var key,
                    invalid_decks = {
                        "not a dict": [],
                        "no notes": {
                            "name": "test deck",
                            "cards": [],
                        },
                        "no cards": {
                            "name": "test deck",
                            "notes": [],
                        },
                        "name is not a string": {
                            "name": [],
                            "notes": [],
                            "cards": []
                        },
                        "notes is not an array": {
                            "name": "test deck",
                            "notes": "NOT AN ARRAY",
                            "cards": []
                        },
                        "cards is not an array": {
                            "name": "test deck",
                            "notes": [],
                            "cards": "NOT AN ARRAY"
                        },
                        "a note is not a string": {
                            "name": "test deck",
                            "notes": [null],
                            "cards": []
                        },
                        "a card is not an array": {
                            "name": "test deck",
                            "notes": [],
                            "cards": ["NOT AN ARRAY"]
                        },
                        "a card is not an array of 4 elements": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", "side 2", ""]
                            ]
                        },
                        "a card's side 1 is not a string": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                [null, "side 2", "", ""]
                            ]
                        },
                        "a card's side 2 is not a string": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", null, "", ""]
                            ]
                        },
                        "a card's note references element is not a string": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", "side 2", null, ""]
                            ]
                        },
                        "a card's scores element is not a string": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", "side 2", "", null]
                            ]
                        },
                        "a card has a non-existant note": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", "side 2", "0", ""]
                            ]
                        },
                        "a card has a non-numeric note reference": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", "side 2", "a", ""]
                            ]
                        },
                        "a card has an non-numeric score": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", "side 2", "", "a"]
                            ]
                        },
                        "a card has an invalid score": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", "side 2", "", "3"]
                            ]
                        },
                        "a card's notes are not a comma separated list of numbers": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", "side 2", "1,", ""]
                            ]
                        },
                        "a card's scores are not a string of 0 1 or 2": {
                            "name": "test deck",
                            "notes": [],
                            "cards": [
                                ["side 1", "side 2", "", "0123"]
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

            QUnit.test("export_import", function(assert) {
                var deck = {
                        "name": "test deck",
                        "notes": ["Note-1", "Note-2", "Note-3"],
                        "cards": [
                            [
                                "Card-1 Side-1 (perfect)",
                                "Card-1 Side-2",
                                "0,1",
                                "2222222222"
                            ],
                            [
                                "Card-2 Side-1 (so-so)",
                                "Card-2 Side-2",
                                "0,2",
                                "1111111111"
                            ]
                        ]
                    };

                load_deck(deck);
                assert.deepEqual(JSON.parse(export_deck(false)), deck);

                load_deck(
                    {
                        "name": "test deck",
                        "notes": ["   note-1   ", " duplicate ", "unreferenced", "duplicate", "note-2"],
                        "cards": [
                            ["card 1 side 1", "card 1 side 2", "0,1", ""],
                            ["card 2 side 1", "card 2 side 2", "0,3,4", ""]
                        ]
                    }
                );
                assert.deepEqual(
                    JSON.parse(export_deck(false)),
                    {
                        "name": "test deck",
                        "notes": ["note-1", "duplicate", "note-2"],
                        "cards": [
                            ["card 1 side 1", "card 1 side 2", "0,1", ""],
                            ["card 2 side 1", "card 2 side 2", "0,1,2", ""]
                        ]
                    }
                );
            });

            QUnit.test("add_card", function(assert) {
                var new_note_created;

                load_deck(
                    {
                        "name": "test deck",
                        "notes": ["Note-1", "Note-2"],
                        "cards": [
                            [
                                "Card-1 Side-1",
                                "Card-1 Side-2",
                                "0",
                                ""
                            ],
                            [
                                "Card-2 Side-1",
                                "Card-2 Side-2",
                                "1",
                                ""
                            ]
                        ]
                    }
                );

                new_note_created = add_card(
                    "Card-3 Side-1", "Card-3 Side-2", ["  Note-3  ", "  Note-2  "]
                );

                assert.equal(new_note_created, true);
                assert.deepEqual(
                    JSON.parse(export_deck(false)),
                    {
                        "name": "test deck",
                        "notes": ["Note-1", "Note-2", "Note-3"],
                        "cards": [
                            [
                                "Card-1 Side-1",
                                "Card-1 Side-2",
                                "0",
                                ""
                            ],
                            [
                                "Card-2 Side-1",
                                "Card-2 Side-2",
                                "1",
                                ""
                            ],
                            [
                                "Card-3 Side-1",
                                "Card-3 Side-2",
                                "2,1",
                                ""
                            ]
                        ]
                    }
                );
            });

            QUnit.test("replace_current_card", function(assert) {
                var new_note_created;

                load_deck(
                    {
                        "name": "test deck",
                        "notes": ["Note-1", "Note-2"],
                        "cards": [
                            [
                                "Card-1 Side-1",
                                "Card-1 Side-2",
                                "0",
                                ""
                            ]
                        ]
                    }
                );

                pick_card_by_score();
                new_note_created = replace_current_card(
                    "Card-1 Side-1 modified",
                    "Card-1 Side-2 modified",
                    ["  Note-2  ", "  Note-3  "]
                );

                assert.equal(new_note_created, true);
                assert.deepEqual(
                    JSON.parse(export_deck(false)),
                    {
                        "name": "test deck",
                        "notes": ["Note-2", "Note-3"],
                        "cards": [
                            [
                                "Card-1 Side-1 modified",
                                "Card-1 Side-2 modified",
                                "0,1",
                                ""
                            ]
                        ]
                    }
                );
            });
        });

        QUnit.module("formatting", function () {
            QUnit.test("format_text", function(assert) {
                var i, l,
                    tests = [
                        [
                            "hello world",
                            "hello world"
                        ],
                        [
                            "_emphasis_ *strong* {small}\n<-- -->",
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

            QUnit.test("format_notes", function(assert) {
                assert.equal(format_notes([], []), "");
                assert.equal(
                    format_notes(["*world*", "_hello_"], [1, 0]),
                    "<ul><li><em>hello</em></li><li><strong>world</strong></li></ul>"
                );
            });

            QUnit.test("remove_furigana", function(assert) {
                var i, l,
                    tests = [
                        [
                            "hello world",
                            "hello world"
                        ],
                        [
                            "{お好み焼き|おこのみやき} {お好み焼き|おこのみやき}",
                            "お好み焼き お好み焼き"
                        ]
                    ];

                for (i = 0, l = tests.length; i < l; ++i) {
                    assert.equal(remove_furigana(tests[i][0]), tests[i][1]);
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
                        "notes": [
                            "Note-1",
                            "Note-2",
                            "Note-3",
                            "Note-4",
                            "Note-5",
                            "Note-6",
                            "Note-7",
                            "Note-8",
                            "Note-9",
                            "Note-10",
                            "Note-11"
                        ],
                        "cards": [
                            [
                                "Card-1 Side-1 (perfect)",
                                "Card-1 Side-2",
                                "0,1",
                                "2222222222"
                            ],
                            [
                                "Card-2 Side-1 (so-so)",
                                "Card-2 Side-2",
                                "2,3,4,5",
                                "1111111111"
                            ],
                            [
                                "Card-3 Side-1 (same score as Card-2)",
                                "Card-3 Side-2",
                                "6,7,8,9,10",
                                "1111111111"
                            ],
                            [
                                "Card-4 Side-1 (recently learned)",
                                "Card-4 Side-2",
                                "0,1",
                                "2222211111"
                            ],
                            [
                                "Card-5 Side-1 (recently forgotten)",
                                "Card-5 Side-2",
                                "0,1",
                                "1111122222"
                            ],
                            [
                                "Card-6 Side-1 (never studied card)",
                                "Card-6 Side-2",
                                "2",
                                ""
                            ]
                        ]
                    }
                );

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(2);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(2);

                learn();
                learn();

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(2);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(1);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(2);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(0);

                reset_card_ref_order();

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(2);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(1);

                pick_card_by_score();
                picked_card_refs.push(current_card_ref);
                grade(2);

                order = picked_card_refs.join("");
                assert.ok(
                    order === "125430540" || order === "215430540",
                    "Unexpected order: " + order + ", expected: 125430540 or 215430540"
                );
                assert.equal(answered, 9);
            });

            QUnit.test("pick_card_randomly", function(assert) {
                var previous_pick = -1,
                    i;

                load_deck(
                    {
                        "name": "test deck",
                        "notes": [],
                        "cards": [
                            ["Card-1 Side-1", "Card-1 Side-2", "", "2"],
                            ["Card-2 Side-1", "Card-2 Side-2", "", "2"],
                            ["Card-3 Side-1", "Card-3 Side-2", "", "2"],
                            ["Card-4 Side-1", "Card-4 Side-2", "", "2"],
                            ["Card-5 Side-1", "Card-5 Side-2", "", "2"],
                            ["Card-6 Side-1", "Card-6 Side-2", "", "2"],
                            ["Card-7 Side-1", "Card-7 Side-2", "", "2"],
                            ["Card-8 Side-1", "Card-8 Side-2", "", "2"],
                            ["Card-9 Side-1", "Card-9 Side-2", "", "2"],
                            ["Card-10 Side-1", "Card-10 Side-2", "", ""],
                            ["Card-11 Side-1", "Card-11 Side-2", "", ""],
                            ["Card-12 Side-1", "Card-12 Side-2", "", ""],
                            ["Card-13 Side-1", "Card-13 Side-2", "", ""],
                            ["Card-14 Side-1", "Card-14 Side-2", "", ""],
                            ["Card-15 Side-1", "Card-15 Side-2", "", ""],
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
