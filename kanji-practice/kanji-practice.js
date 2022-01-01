(function () {

    "use strict";

    var MAX_GRADES = 15,
        EDITOR_EXIT_CONFIRM = (
            "You have unsaved changes in the card editor."
            + " Are you sure you want to navigate away and lose those changes?"
        ),
        CANVAS_SIZE = 720,
        KANJIVG_SIZE = 109,
        SCALE = CANVAS_SIZE / KANJIVG_SIZE,
        STROKE_WIDTH_INERTIA = CANVAS_SIZE / 15,
        FULL_CIRCLE = 2 * Math.PI,
        GRADES = [
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
        kanjivg,
        kanjidic,
        is_routing,
        deck,
        menu,
        menu_export_json,
        menu_export_tsv,
        load_dragndrop,
        load_input,
        load_ignore_tsv_header,
        tsv_info,
        load_action,
        load_cancel,
        no_cards,
        practice_screen,
        load_screen,
        load_screen_title,
        current_card,
        current_card_ref = null,
        characters,
        current_character_ref,
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
        editor_screen,
        editor_kanji,
        editor_kanji_orig,
        editor_pronunciation,
        editor_pronunciation_orig,
        editor_meaning,
        editor_meaning_orig,
        editor_mode,
        editor_buttons_new,
        editor_buttons_current,
        editor_button_save,
        editor_button_save_new,
        is_drawing,
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
        teach_stroke,
        teach_stroke_length,
        prev_pos,
        prev_time,
        prev_stroke_width,
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
        practice_kanji_details_content;

    function main()
    {
        kanjivg = window.kanjivg;
        kanjidic = window.kanjidic;
        initialize_gui();
        restore_state();
        route();
    }

    function route()
    {
        var url = String(window.location.href),
            match, num;

        is_routing = true;
        stop_teaching();

        if (match = url.match(/#([qe])-([0-9]+)(-([0-9]+))?$/)) {
            num = Number(match[2]) - 1;

            if (num >= 0 && num < deck["cards"].length) {
                hide(grade_form);
                hide(practice_kanji);
                hide(practice_pronunciation);
                store_pick(num);
                reset_current_character();
                show_next_character_prompt();
                show_practice_screen();
                show_current_card();

                if (match[1] === "e") {
                    edit_current_card();
                } else if (match[4]) {
                    num = Number(match[4]) - 1;

                    if (num >= 0 && num < characters.length && num <= drawn_characters.length) {
                        current_character_ref = num;
                        show_next_character_prompt();
                    }
                }

                is_routing = false;

                return;
            }
        } else if (match = url.match(/#q-([0-9]+)-([0-9]+)$/)) {
            num = Number(match[1]) - 1;

        } else if (match = url.match(/#load$/)) {
            start_practising();
            handle_load_confirmation();
            is_routing = false;

            return;
        } else if (match = url.match(/#new$/)) {
            start_practising();
            hide(practice_screen);
            show_editor("new-card", "", "", "");
            is_routing = false;

            return;
        } else if (url.match(/#top$/)) {
            if (current_card_ref !== null) {
                hide(grade_form);
                hide(practice_kanji);
                hide(practice_pronunciation);
                store_pick(current_card_ref);
                reset_current_character();
                show_next_character_prompt();
                show_practice_screen();
                show_current_card();
                show_next_character_prompt();

                is_routing = false;

                return;
            }
        }

        is_routing = false;
        start_practising();
    }

    function initialize_gui()
    {
        var i, si;

        message_timeout = null;

        load_deck({"name": "flashcards", "cards": []});
        menu = $("menu");
        load_dragndrop = $("load-dragndrop");
        load_input = $("load-input");
        load_ignore_tsv_header = $("load-tsv-header");
        tsv_info = $("tsv-info");
        load_screen = $("load-screen");
        load_screen_title = $("load-screen-title");
        practice_screen = $("practice-screen")
        no_cards = $("no-cards");
        practice_card = $("practice-card");
        grade_form = $("grade");
        stats = $("stats");
        learn_button = $("learn-button");
        message = $("message");
        menu_export_json = $("menu-export-json");
        menu_export_tsv = $("menu-export-tsv");
        alert_modal = $("alert");
        alert_message = $("alert-message");
        confirm_modal = $("confirm");
        confirm_message = $("confirm-message");
        editor_screen = $("editor-screen");
        editor_kanji = $("kanji");
        editor_pronunciation = $("pronunciation");
        editor_meaning = $("meaning");
        editor_buttons_current = $("editor-buttons-current");
        editor_buttons_new = $("editor-buttons-new");
        editor_button_save = $("edit-save");
        editor_button_save_new = $("edit-save-new");
        editor_kanji_orig = "";
        editor_pronunciation_orig = "";
        editor_meaning_orig = "";
        practice_meaning = $("practice-meaning");
        practice_kanji = $("practice-kanji");
        practice_kanji.onclick = handle_kanji_click;
        practice_pronunciation = $("practice-pronunciation");
        practice_pronunciation.onclick = handle_pronunciation_click;
        practice_kanji_details = $("practice-kanji-details");
        practice_kanji_details_content = $("practice-kanji-details-content");

        $("practice-form").onsubmit = stop_event;
        $("editor-form").onsubmit = stop_event;
        $("load-form").onsubmit = stop_event;
        $("menu-button").onclick = handle_menu_button_click;
        $("menu-hide").onclick = handle_hide_menu_click;
        $("menu-load").onclick = handle_menu_load_click;
        $("no-cards-load").onclick = handle_menu_load_click;
        $("menu-import-tsv").onclick = handle_menu_import_tsv_click;
        $("no-cards-import").onclick = handle_menu_import_tsv_click;
        $("menu-add-tsv").onclick = handle_menu_add_tsv_click;
        $("alert-ok").onclick = handle_alert_ok_click;
        $("confirm-yes").onclick = handle_confirm_yes_click;
        $("confirm-no").onclick = handle_confirm_no_click;
        $("load-cancel").onclick = handle_load_cancel_click;
        $("grade-bad").onclick = handle_grade_bad_click;
        $("grade-soso").onclick = handle_grade_soso_click;
        $("grade-good").onclick = handle_grade_good_click;
        $("menu-edit").onclick = handle_menu_edit_click;
        $("edit-cancel").onclick = handle_edit_cancel_click;
        $("menu-create").onclick = handle_menu_create_click;
        $("no-cards-create").onclick = handle_menu_create_click;
        $("edit-back").onclick = handle_edit_cancel_click;
        $("clear-button").onclick = handle_clear_click;
        $("hint-button").onclick = handle_hint_click;
        $("teach-button").onclick = handle_teach_click;
        $("details-button").onclick = handle_kanji_details_click;
        $("practice-kanji-details-close").onclick = handle_kanji_details_close_click;

        editor_button_save.onclick = handle_edit_save_click;
        editor_button_save_new.onclick = handle_edit_save_new_click;

        menu_export_json.onclick = handle_menu_export_json_click;
        menu_export_tsv.onclick = handle_menu_export_tsv_click;

        learn_button.onclick = handle_learn_button_click;

        load_input.onchange = handle_load_input_change;
        load_dragndrop.ondrop = handle_file_drop;
        load_dragndrop.ondragover = stop_event;

        practice_card.onclick = handle_practice_card_click;

        populate_editor("new-card", "", "", "");

        window.addEventListener("drop", stop_event);
        window.addEventListener("dragover", stop_event);
        window.addEventListener("beforeunload", handle_beforeunload);
        window.addEventListener("popstate", handle_popstate);

        initialize_canvas();
    }

    function initialize_canvas()
    {
        is_drawing = false;
        prev_pos = [0, 0];
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
        var guides = new Path2D("M 1,1 L 718,718 M 718,1 L 1,718 M 1,359 L 718,359 M 359,1 L 359,718");

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
                stop_drawing();
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
        stop_drawing();

        return stop_event(evt);
    }

    function handle_canvas_mouse_leave(evt)
    {
        stop_drawing();

        return stop_event(evt);
    }

    function start_drawing(doc_pos)
    {
        if (is_nan(doc_pos) || is_done) {
            return;
        }

        if (is_waiting_for_click) {
            if (time() < freeze_until) {
                return;
            }

            is_waiting_for_click = false;
            ++current_character_ref;

            if (current_character_ref < characters.length) {
                show_next_character_prompt();
            } else {
                show_grade_form();
                is_done = true;
            }

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
        prev_pos = to_canvas_pos(doc_pos);
        prev_time = time();
        prev_stroke_width = max_stroke_width / 2.4;
        draw(doc_pos);
    }

    function stop_drawing()
    {
        if (is_done || !is_drawing) {
            return;
        }

        is_drawing = false;
        drawn_strokes.push(stroke_segments);
        stroke_segments = [];

        if (is_teaching && is_teaching_paused) {
            continue_teaching();
        }

        if (drawn_strokes.length >= characters[current_character_ref]["strokes"].length) {
            reveal_character();

            drawn_characters[current_character_ref] = make_canvas_snapshot();
            drawn_strokes = [];
            is_waiting_for_click = true;
            freeze_until = time() + 0.3;

            if ((current_character_ref + 1) >= characters.length) {
                show(practice_kanji);
                show(practice_pronunciation);
            }
        }
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
            i, l, j, ll;

        restore_canvas_snapshot(revealed_canvas);

        for (i = 0, l = drawn_strokes.length; i < l; ++i) {
            stroke = drawn_strokes[i];

            for (j = 0, ll = stroke.length; j < ll; ++j) {
                segment = stroke[j];
                draw_segment(segment[0], segment[1], segment[2]);
            }
        }
    }

    function show_next_character_prompt()
    {
        hide(practice_kanji_details);

        practice_kanji_details_content.innerHTML = build_kanji_details();

        push_history("q-" + String(current_card_ref + 1) + "-" + String(current_character_ref + 1));

        if (current_character_ref < drawn_characters.length && drawn_characters[current_character_ref]) {
            restore_canvas_snapshot(drawn_characters[current_character_ref]);

            is_waiting_for_click = true;
            freeze_until = 0;
        } else {
            reset_current_character();
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
        grade = (0 < grade && grade < GRADES.length) ? GRADES[grade] : "";

        return [
            "<" + kanji_node + " lang=\"ja\">" + quote_html(kanji) + "</" + kanji_node + ">",
            "<table>",
            make_kanji_detail_row("Grade", grade),
            make_kanji_detail_row("JLPT (1-4)", jlpt),
            make_kanji_detail_row("Radical names", rad_names.join("、 "), "ja"),
            make_kanji_detail_row("On readings", on_readings.join("、 "), "ja"),
            make_kanji_detail_row("Kun readings", kun_readings.join("、 "), "ja"),
            make_kanji_detail_row("Nanori", nanoris.join("、 "), "ja"),
            make_kanji_detail_row("Meanings", meanings.join("; ")),
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
        var pos, new_pos, now, time_d, pos_d, speed,
            new_stroke_width,
            i, l, w;

        if (is_done || is_showing_hint || !is_drawing) {
            return;
        }

        if (is_nan(doc_pos)) {
            return;
        }

        new_pos = to_canvas_pos(doc_pos);
        now = time();
        time_d = Math.max(now - prev_time, 0.001);
        pos_d = pdistance(new_pos, prev_pos);
        speed =  Math.sqrt(pos_d / (CANVAS_SIZE * time_d));

        l = ease(Math.min(1.0, Math.max(0.0, pos_d / STROKE_WIDTH_INERTIA)));

        new_stroke_width = Math.max(
            min_stroke_width,
            Math.min(
                max_stroke_width,
                l * (prev_stroke_width / (speed + 0.001)) + (1.0 - l) * prev_stroke_width
            )
        );

        pos = prev_pos;

        for (i = 0; i < 10; ++i) {
            l = i / 10;
            prev_pos = pos;
            pos = vsum(vscale(1.0 - l, prev_pos), vscale(l, new_pos));
            w = Math.round((1.0 - l) * prev_stroke_width + l * new_stroke_width);
            draw_segment(prev_pos, pos, w);
            stroke_segments.push([prev_pos, pos, w]);
        }

        prev_stroke_width = new_stroke_width;
        prev_pos = new_pos;
        prev_time = now;
    }

    function draw_segment(pos1, pos2, stroke_width)
    {
        canvas_ctx.strokeStyle = "#f6f6f6";
        canvas_ctx.lineCap = "round";
        canvas_ctx.lineWidth = stroke_width;

        canvas_ctx.beginPath();
        canvas_ctx.moveTo(pos1[0], pos1[1]);
        canvas_ctx.lineTo(pos2[0], pos2[1]);
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
        show(practice_kanji);

        return stop_event(evt);
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
        load_screen_title.innerHTML = "Load deck";
        load_input.setAttribute("accept", ".json,application/json");
        hide(practice_screen);
        show(load_screen);
        hide(tsv_info);
    }

    function handle_import_tsv_confirmation()
    {
        load_action = import_deck_from_tsv_file;
        load_screen_title.innerHTML = "Import deck from TSV";
        load_input.setAttribute("accept", ".tsv,.tab,text/tab-separated-values");
        hide(practice_screen);
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
        hide(practice_screen);
        show(load_screen);
        show(tsv_info);

        return stop_event(evt);
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
        } else {
            hide(learn_button);
        }

        hide(grade_form);
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

    function quote_html(text)
    {
        return text.replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
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
            current_card["kanji"],
            current_card["pronunciation"],
            current_card["meaning"]
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

    function show_editor(mode, kanji, pronunciation, meaning)
    {
        populate_editor(mode, kanji, pronunciation, meaning);
        show(editor_screen);
        editor_kanji.focus();
    }

    function populate_editor(mode, kanji, pronunciation, meaning)
    {
        editor_mode = mode;

        editor_kanji.value = kanji;
        editor_kanji_orig = kanji;

        editor_pronunciation.value = pronunciation;
        editor_pronunciation_orig = pronunciation;

        editor_meaning.value = meaning;
        editor_meaning_orig = meaning;

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

    function close_editor()
    {
        if (current_card) {
            show_current_card();
        }

        show_editor("new-card", "", "", "");
        hide(editor_screen);
        show_practice_screen();
    }

    function handle_clear_click(evt)
    {
        if (is_done) {
            hide(grade_form);
        }

        if (is_done && current_character_ref > 0) {
            --current_character_ref;
        }

        reset_current_character();

        return stop_event(evt);
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
        var alpha, strokes, next_stroke, svg_path, pos;

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
        next_stroke = strokes[drawn_strokes.length];

        canvas_ctx.strokeStyle = "rgba(104, 144, 192, " + String(alpha) + ")";
        canvas_ctx.lineCap = "round";
        canvas_ctx.lineWidth = 3;
        canvas_ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvas_ctx.scale(SCALE, SCALE);
        canvas_ctx.stroke(new Path2D(next_stroke));

        svg_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svg_path.setAttribute("d", next_stroke);
        pos = svg_path.getPointAtLength(0);
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

        teach_stroke = document.createElementNS("http://www.w3.org/2000/svg", "path");
        teach_stroke.setAttribute("d", strokes[drawn_strokes.length]);
        teach_stroke_length = teach_stroke.getTotalLength();
        teach_frames = Math.floor(teach_stroke_length / 3.6) + 1;
        teach_frame = 0;

        return true;
    }

    function render_teaching_frame()
    {
        var pos, l;

        l = teach_frame / teach_frames;
        pos = teach_stroke.getPointAtLength(teach_stroke_length * l);
        pos.x *= SCALE;
        pos.y *= SCALE;

        restore_canvas_snapshot(teach_snapshot);

        canvas_ctx.fillStyle = "#f0f0c0";
        canvas_ctx.beginPath();
        canvas_ctx.arc(pos.x, pos.y, 10, 0, FULL_CIRCLE);
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
            error;

        try {
            validate_kanji(kanji);
        } catch (error) {
            show_alert(quote_html(error), function () { editor_kanji.focus(); });

            return stop_event(evt);
        }

        replace_current_card(
            kanji,
            editor_pronunciation.value,
            editor_meaning.value
        );
        close_editor();
        show_message("Card #" + String(current_card_ref + 1) + " saved.", 2400);
        show_current_card();
        show_practice_screen();

        return stop_event(evt);
    }

    function replace_current_card(kanji, pronunciation, meaning)
    {
        current_card["kanji"] = kanji;
        current_card["pronunciation"] = pronunciation;
        current_card["meaning"] = meaning;
    }

    function handle_menu_create_click(evt)
    {
        hide(menu);
        hide(practice_screen);

        show_editor("new-card", "", "", "");
        push_history("new");

        return stop_event(evt);
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
            editor_meaning.value
        );

        if (deck["cards"].length === 1) {
            learn();
            pick_card();
            hide(no_cards);
            show_current_card();
        }

        show_editor("new-card", "", "", "");
        show_message("Added card #" + String(deck["cards"].length) + " to the deck.", 2400);

        return stop_event(evt);
    }

    function add_card(kanji, pronunciation, meaning)
    {
        var cards = deck["cards"];

        to_learn.push(cards.length);
        cards.push(create_card(kanji, pronunciation, meaning, []));
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
                    exported_grades.join("")
                ]
            );
        }

        return JSON.stringify(
            {
                "name": deck["name"],
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
            header = "Word (kanji)\tPronunciation\tMeaning",
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
                import_deck_from_tsv_string(name, contents, load_ignore_tsv_header.checked);

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

    function import_deck_from_tsv_string(name, tsv_str, ignore_tsv_header)
    {
        load_deck(
            {
                "name": name,
                "cards": tsv_to_raw_cards(tsv_str, ignore_tsv_header, false)
            }
        );
    }

    function tsv_to_raw_cards(tsv_str, ignore_tsv_header, ignore_grades)
    {
        var lines = tsv_str.replace(/\r/g, "\n").replace(/\n+/g, "\n").trim("\n").split("\n"),
            cards = [],
            grades = "",
            format,
            kanji, pronunciation, meaning, grades_str, grade,
            i, l, ll, j, lll, line;

        if (ignore_grades) {
            format = "KANJI <TAB> PRONUNCIATION <TAB> MEANING";
        } else {
            format = "KANJI <TAB> PRONUNCIATION <TAB> MEANING <TAB> GRADE (0-2) <TAB> GRADE (0-2) <TAB> ...";
        }

        for (i = 0, l = lines.length; i < l; ++i) {
            if (ignore_tsv_header && i < 1) {
                ignore_tsv_header = false;
                continue;
            }

            line = lines[i].split("\t");
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

            if (!ignore_grades) {
                grades = line.splice(3);

                for (j = 0, lll = grades.length; j < lll; ++j) {
                    grade = grades[j].trim();

                    if (!grade.match(/^[0-2]?$/)) {
                        throw (
                            "Invalid deck: TSV line " + String(i + 1)
                            + " contains an invalid grade: " + grade + " - a grade can be either 0, 1, or 2: "
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

            cards.push([kanji, pronunciation, meaning, grades]);
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
                var added = add_cards_from_tsv_string(name, contents, load_ignore_tsv_header.checked);

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

    function add_cards_from_tsv_string(name, tsv_str, ignore_tsv_header)
    {
        var added = 0,
            raw_cards = tsv_to_raw_cards(tsv_str, ignore_tsv_header, true),
            cards = deck["cards"],
            existing_cards = {},
            kanji, meaning, pronunciation, error,
            i, l, c, h;

        try {
            validate_deck({"name": "", "cards": raw_cards});
        } catch (error) {
            throw "Invalid deck: " + error;
        }

        for (i = 0, l = cards.length; i < l; ++i) {
            c = cards[i];
            existing_cards[card_to_hash(c["kanji"], c["pronunciation"], c["meaning"])] = true;
        }

        for (i = 0, l = raw_cards.length; i < l; ++i) {
            if (ignore_tsv_header && i < 1) {
                ignore_tsv_header = false;
                continue;
            }

            c = raw_cards[i];
            kanji = c[0];
            pronunciation = c[1];
            meaning = c[2];
            h = card_to_hash(kanji, pronunciation, meaning);

            if (!existing_cards.hasOwnProperty(h)) {
                ++added;
                add_card(kanji, pronunciation, meaning);
            }
        }

        return added;
    }

    function card_to_hash(kanji, pronunciation, meaning)
    {
        return "c" + kanji + "\t" + pronunciation + "\t" + meaning;
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

        cards = [];
        card_refs = [];
        to_learn = [];

        deck = {
            "name": raw_deck.hasOwnProperty("name") ? raw_deck["name"] : "",
            "cards": []
        };
        raw_cards = raw_deck["cards"];

        for (i = 0, l = raw_cards.length; i < l; ++i) {
            raw_card = raw_cards[i];
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

            cards.push(create_card(raw_card[0], raw_card[1], raw_card[2], grades));
        }

        deck["cards"] = cards;
        last_order_reset = 0;

        reset_card_ref_order();

        if (card_refs.length < 1) {
            learn();
            learn();
            learn();
        }

        return deck;
    }

    function create_card(kanji, pronunciation, meaning, grades)
    {
        return {
            "kanji": kanji,
            "pronunciation": pronunciation,
            "meaning": meaning,
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

            if (!(Array.isArray(card) && card.length === 4)) {
                throw "all cards must be arrays of 4 elements: " + card;
            }

            if (
                typeof(card[0]) !== "string"
                || typeof(card[1]) !== "string"
                || typeof(card[2]) !== "string"
                || typeof(card[3]) !== "string"
            ) {
                throw "elements of a card (kanji, pronunciation, meaning, grades) must be strings: " + dump;
            }

            validate_kanji(card[0]);

            if (!card[3].match(/^[012]*$/)) {
                throw "grades must be a string of integers between 0 and 2: " + dump;
            }
        }
    }

    function validate_kanji(kanji)
    {
        var unknown_chars = [],
            i, l, c, k;

        for (i = 0, l = kanji.length; i < l; ++i) {
            c = kanji.substring(i, i + 1);

            if (!kanjivg.hasOwnProperty(kanji_to_key(c))) {
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
        hide(practice_kanji);
        hide(practice_pronunciation);

        if (Math.random() > 0.25) {
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

        for (i = 0, l = kanji.length; i < l; ++i) {
            c = kanji_to_key(kanji.substring(i, i + 1));

            if (kanjivg.hasOwnProperty(c)) {
                c = kanjivg[c];
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
        stats.innerHTML = String(score) + " / " + String(answered);

        current_card["kanji"],
        practice_kanji.innerHTML = quote_html(current_card["kanji"]);
        practice_pronunciation.innerHTML = quote_html(current_card["pronunciation"]);
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
        var i;

        kanjivg = {};

        for (i = 32; i < 127; ++i) {
            kanjivg[kanji_to_key(String.fromCharCode(i))] = [
                "components",
                ["path-1", "path-2"]
            ];
        }


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
                        "a card's scores element is not a string": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", "pronunciation", "meaning", null]
                            ]
                        },
                        "a card has an non-numeric score": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", "pronunciation", "meaning", "a"]
                            ]
                        },
                        "a card has an invalid score": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", "pronunciation", "meaning", "3"]
                            ]
                        },
                        "a card's scores are not a string of 0 1 or 2": {
                            "name": "test deck",
                            "cards": [
                                ["kanji", "pronunciation", "meaning", "0123"]
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
                        "kanji contains unknown characters": "☃\tpronunciation\tmeaning",
                        "a grade is invalid": "kanji\tpronunciation\tmeaning\t2\t3\t0"
                    };

                for (key in invalid_decks) {
                    if (invalid_decks.hasOwnProperty(key)) {
                        assert.throws(
                            function ()
                            {
                                import_deck_from_tsv_string("example.tsv", invalid_decks[key], false);
                            },
                            /Invalid deck/,
                            key
                        );
                    }
                }

                load_deck({"name": "test", "cards": []});

                assert.equal(
                    export_deck_as_tsv_string(),
                    "Word (kanji)\tPronunciation\tMeaning"
                );

                import_deck_from_tsv_string(
                    "example.tsv",
                    [
                        "kanji 1\tpronunciation \\x\\t\\r\\n\\\\1\tmeaning \\x\\t\\r\\n\\\\1\t\t",
                        "",
                        "katakana 2\t\tmeaning 2\t2\t1\t0\t\t\t",
                        ""
                    ].join("\r\n"),
                    false
                );
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "example.tsv",
                        "cards": [
                            ["kanji 1", "pronunciation \\x\t\r\n\\1", "meaning \\x\t\r\n\\1", ""],
                            ["katakana 2", "katakana 2", "meaning 2", "210"]
                        ]
                    }
                );

                import_deck_from_tsv_string(
                    "example.tsv",
                    [
                        "Word (kanji)\tPronunciation\tMeaning",
                        "kanji 1\tpronunciation \\x\\t\\r\\n\\\\1\tmeaning \\x\\t\\r\\n\\\\1\t\t",
                        "",
                        "katakana 2\t\tmeaning 2\t2\t1\t0\t\t",
                        ""
                    ].join("\r\n"),
                    true
                );
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "example.tsv",
                        "cards": [
                            ["kanji 1", "pronunciation \\x\t\r\n\\1", "meaning \\x\t\r\n\\1", ""],
                            ["katakana 2", "katakana 2", "meaning 2", "210"]
                        ]
                    }
                );

                assert.equal(
                    export_deck_as_tsv_string(),
                    [
                        "Word (kanji)\tPronunciation\tMeaning\tGrade\tGrade\tGrade",
                        "kanji 1\tpronunciation \\\\x\\t\\r\\n\\\\1\tmeaning \\\\x\\t\\r\\n\\\\1\t\t\t",
                        "katakana 2\tkatakana 2\tmeaning 2\t2\t1\t0",
                    ].join("\r\n")
                );
            });

            QUnit.test("add_cards_from_tsv", function(assert) {
                var key,
                    added_without_ignored_header,
                    added_with_ignored_header,
                    invalid_decks = {
                        "missing pronunciation": "kanji",
                        "missing meaning": "kanji\tpronunciation",
                        "kanji contains unknown characters": "☃\tpronunciation\tmeaning"
                    };

                load_deck(
                    {
                        "name": "test deck",
                        "cards": [
                            [
                                "kanji 1",
                                "pronunciation 1",
                                "meaning 1",
                                "222"
                            ],
                            [
                                "kanji 2",
                                "pronunciation 2",
                                "meaning 2",
                                "111"
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
                        "kanji 2\tpronunciation 2\tmeaning 2",
                        "",
                        "katakana 1\t\tkatakana meaning 1",
                        "kanji 3\tpronunciation \\x\\t\\r\\n\\\\3\tmeaning \\x\\t\\r\\n\\\\3\t2\t1\t0",
                        "kanji 1\tpronunciation 1\tmeaning 1\t0\t0\t0",
                        ""
                    ].join("\r\n"),
                    false
                )
                added_with_ignored_header = add_cards_from_tsv_string(
                    "example.tsv",
                    [
                        "Word\tPronunciation\tMeaning (header row)",
                        "kanji 1\tpronunciation 1\tmeaning 1",
                        "katakana 2\t\tkatakana meaning 2\t0\t1\t2",
                        "kanji 2\tpronunciation 2\tmeaning 2",
                        ""
                    ].join("\r\n"),
                    true
                )
                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "cards": [
                            ["kanji 1", "pronunciation 1", "meaning 1", "222"],
                            ["kanji 2", "pronunciation 2", "meaning 2", "111"],
                            ["katakana 1", "katakana 1", "katakana meaning 1", ""],
                            ["kanji 3", "pronunciation \\x\t\r\n\\3", "meaning \\x\t\r\n\\3", ""],
                            ["katakana 2", "katakana 2", "katakana meaning 2", ""]
                        ]
                    }
                );
                assert.equal(added_without_ignored_header, 2);
                assert.equal(added_with_ignored_header, 1);
            });

            QUnit.test("export_load", function(assert) {
                var deck = {
                        "name": "test deck",
                        "cards": [
                            [
                                "kanji 1 (perfect)",
                                "pronunciation 1",
                                "meaning 1",
                                "2222222222"
                            ],
                            [
                                "kanji 2 (so-so)",
                                "pronunciation 2",
                                "meaning 2",
                                "1111111111"
                            ]
                        ]
                    };

                load_deck(deck);
                assert.deepEqual(JSON.parse(export_deck_as_json_string(false)), deck);
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
                                ""
                            ],
                            [
                                "kanji 2",
                                "pronunciation 2",
                                "meaning 2",
                                ""
                            ]
                        ]
                    }
                );

                add_card("kanji 3", "pronunciation 3", "meaning 3");

                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "cards": [
                            [
                                "kanji 1",
                                "pronunciation 1",
                                "meaning 1",
                                ""
                            ],
                            [
                                "kanji 2",
                                "pronunciation 2",
                                "meaning 2",
                                ""
                            ],
                            [
                                "kanji 3",
                                "pronunciation 3",
                                "meaning 3",
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
                                ""
                            ]
                        ]
                    }
                );

                pick_card_by_score();
                replace_current_card(
                    "kanji modified",
                    "pronunciation modified",
                    "meaning modified"
                );

                assert.deepEqual(
                    JSON.parse(export_deck_as_json_string(false)),
                    {
                        "name": "test deck",
                        "cards": [
                            [
                                "kanji modified",
                                "pronunciation modified",
                                "meaning modified",
                                ""
                            ]
                        ]
                    }
                );
            });
        });

        QUnit.module("formatting", function () {
            QUnit.test("quote_html", function(assert) {
                assert.equal(quote_html("<>&\"'"), "&lt;&gt;&amp;&quot;&#039;");
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
                                "kanji 1 (perfect)",
                                "pronunciation 1",
                                "meaning 1",
                                "2222222222"
                            ],
                            [
                                "kanji 2 (so-so)",
                                "pronunciation 2",
                                "meaning 2",
                                "1111111111"
                            ],
                            [
                                "kanji 3 (same score as kanji 2)",
                                "pronunciation 3",
                                "meaning 3",
                                "1111111111"
                            ],
                            [
                                "kanji 4 (recently learned)",
                                "pronunciation 4",
                                "meaning 2",
                                "2222211111"
                            ],
                            [
                                "kanji 5 (recently forgotten)",
                                "pronunciation 5",
                                "meaning 5",
                                "1111122222"
                            ],
                            [
                                "kanji 6 (never studied)",
                                "pronunciation 6",
                                "meaning 6",
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
                        "cards": [
                            ["kaji 1", "pronunciation 1", "meaning 1", "2"],
                            ["kaji 2", "pronunciation 2", "meaning 2", "2"],
                            ["kaji 3", "pronunciation 3", "meaning 3", "2"],
                            ["kaji 4", "pronunciation 4", "meaning 4", "2"],
                            ["kaji 5", "pronunciation 5", "meaning 5", "2"],
                            ["kaji 6", "pronunciation 6", "meaning 6", "2"],
                            ["kaji 7", "pronunciation 7", "meaning 7", "2"],
                            ["kaji 8", "pronunciation 8", "meaning 8", "2"],
                            ["kaji 9", "pronunciation 9", "meaning 9", "2"],
                            ["kaji 10", "pronunciation 10", "meaning 10", ""],
                            ["kaji 11", "pronunciation 11", "meaning 11", ""],
                            ["kaji 12", "pronunciation 12", "meaning 12", ""],
                            ["kaji 13", "pronunciation 13", "meaning 13", ""],
                            ["kaji 14", "pronunciation 14", "meaning 14", ""],
                            ["kaji 15", "pronunciation 15", "meaning 15", ""],
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
