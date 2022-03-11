(function () {

    "use strict";

    var NUM = 0,
        ADD = 1,
        SUB = 2,
        MUL = 3,
        EQ = 4,
        PREC = [0, 1, 1, 2],
        MAX_LEVEL = 5,
        rng_x,
        rng_c,
        is_playing,
        next_challenge,
        is_done,
        score,
        score_delta,
        roller,
        level,
        calculation,
        polish,
        op_stack,
        has_operator,
        has_eq,
        numbers,
        eqs,
        operators,
        tiles,
        tile_ids,
        tiles_count,
        prev_tile,
        score_node,
        level_node,
        score_delta_node,
        calculation_node,
        tiles_node,
        about_screen,
        end_screen,
        copy_text_node,
        countdown_node,
        final_score_node,
        main_screen;

    function main()
    {
        score_node = $("score");
        level_node = $("level");
        score_delta_node = $("score-delta");
        calculation_node = $("calculation");
        tiles_node = $("tiles");
        about_screen = $("about-screen");
        end_screen = $("end-screen");
        copy_text_node = $("copy-text");
        countdown_node = $("countdown");
        final_score_node = $("final-score");

        $("next-level-button").onclick = handle_next_level_click;
        $("delete-button").onclick = handle_delete_click;

        $("about").onclick = stop_event;
        $("about-button").onclick = handle_about_button_click;
        $("about-close").onclick = handle_about_close_click;
        $("copy-button").onclick = copy;
        $("restart-button").onclick = handle_restart_click;
        about_screen.onclick = handle_about_close_click;
        copy_text_node.onclick = select;

        restart();

        setInterval(tick, 1000);
    }

    function handle_delete_click(evt)
    {
        evt = evt || event;

        if (calculation.length > 0) {
            cancel_calculation();
        }

        return stop_event(evt);
    }

    function handle_about_button_click(evt)
    {
        evt = evt || event;

        show(about_screen);
        is_playing = false;

        return stop_event(evt);
    }

    function handle_about_close_click(evt)
    {
        evt = evt || event;

        hide(about_screen);
        is_playing = true;

        return stop_event(evt);
    }

    function select(evt)
    {
        evt = evt || event;

        copy_text_node.select();
        copy_text_node.setSelectionRange(0, 99999);

        return stop_event(evt);
    }

    function copy(evt)
    {
        evt = evt || event;

        select();
        navigator.clipboard.writeText(copy_text_node.value);

        return stop_event(evt);
    }

    function handle_about_end_click(evt)
    {
        hide(end_screen);
    }

    function cancel_calculation()
    {
        adjust_score_delta(-10 * calculation.length);
        new_calculation();
        update_calculation();

        if ((eqs < 1) || (operators < 1)) {
            level_up();
            schedule_new_board();
        }
    }

    function handle_next_level_click(evt)
    {
        evt = evt || event;

        if (calculation.length > 0) {
            cancel_calculation();
        }

        adjust_score_delta(-10 * tiles_count);
        level_up();
        schedule_new_board();

        return stop_event(evt);
    }

    function handle_restart_click(evt)
    {
        evt = evt || event;
        restart();
        hide(end_screen);

        return stop_event(evt);
    }

    function restart()
    {
        var d = new Date();

        init_random(d);

        d.setDate(d.getDate() + 1);
        d.setHours(0, 0, 0, 0);
        next_challenge = d.getTime();

        new_game();
        is_playing = true;
        is_done = false;
    }

    function new_game()
    {
        score = 0;
        score_delta = 0;
        roller = null;
        level = 0;

        level_up();
        new_board();
        update_calculation();
    }

    function new_board()
    {
        new_calculation();
        generate_tiles();
        shuffle(tile_ids);
        update_score();
        show_tiles();
    }

    function new_calculation()
    {
        calculation = [];
        polish = [];
        op_stack = [];
        prev_tile = null;
        has_operator = false;
        has_eq = false;
    }

    function tick()
    {
        var d, t, h, m, s;

        if (is_playing && (score > 0)) {
            --score;
            update_score();
        } else if (is_done) {
            d = Math.floor(Math.max(0, next_challenge - (new Date()).getTime()) / 1000);
            s = d % 60;
            m = Math.floor(d / 60) % 60;
            h = Math.floor(d / 3600);
            t = (
                ((h < 10) ? "0" : "") + String(h)
                + ":"
                + ((m < 10) ? "0" : "") + String(m)
                + ":"
                + ((s < 10) ? "0" : "") + String(s)
            );
            countdown_node.innerHTML = t;
        }
    }

    function generate_tiles()
    {
        var i, j, m, op, elements, num, result, max_num;

        max_num = level * 12 + 10;
        clear_tiles();

        while (tiles_count < 30) {
            elements = random(1, 4);
            result = 0;
            num = random(3, max_num);
            create_number_tiles(num);

            for (i = 0; i < elements; ++i) {
                if ((random(0, 100) <= 20) && (result > 2)) {
                    num = random(1, result);
                    create_tile(SUB, "-");
                    create_number_tiles(num);
                    result -= num;
                } else {
                    num = random(1, max_num);
                    create_tile(ADD, "+");
                    create_number_tiles(num);
                    result += num;
                }

                if (random(0, 100) <= 10) {
                    create_tile(NUM, result);
                }
            }

            create_tile(EQ, "=");
            create_tile(NUM, result);
        }
    }

    function create_number_tiles(num)
    {
        var f, c;

        if ((level > 2) && (tiles_count < 30) && (random(0, 100) <= 20)) {
            c = 0;

            while (((f = find_factor(num)) > 1) && (num > 1)) {
                num /= f;
                create_tile(NUM, f);

                if (c > 0) {
                    create_tile(MUL, "×");
                }

                ++c;
            }

            if ((c < 2) && (random(0, 100) <= 15)) {
                create_tile(MUL, "×");
                create_tile(NUM, 1);
            }
        } else {
            create_tile(NUM, num);
        }
    }

    function find_factor(num)
    {
        var f;

        if (random(0, 100) <= 50) {
            if ((num > 4) && (num % 4 === 0)) {
                return num / 4;
            }

            if ((num > 2) && (num % 2 === 0)) {
                return num / 2;
            }
        }

        f = Math.floor(Math.sqrt(num));

        while (f > 1) {
            if (num % f === 0) {
                return f;
            }

            --f;
        }

        return num;
    }

    function clear_tiles()
    {
        tiles = {};
        tile_ids = [];
        tiles_count = 0;
        operators = 0;
        numbers = 0;
        eqs = 0;
    }

    function create_tile(type, value)
    {
        var tile_id;

        ++tiles_count;

        tile_id = "t-" + String(tiles_count);
        tiles[tile_id] = [type, value];
        tile_ids.push(tile_id);

        switch (type) {
            case NUM:
                if (value < 0)
                    throw "WHAT?";
                ++numbers;
                break
            case ADD:
            case SUB:
            case MUL:
                ++operators;
                break;
            case EQ:
                ++eqs;
                break;
        }

        return tile_id;
    }

    function shuffle(arr)
    {
        var l = arr.length,
            i, j, tmp;

        for (i = l - 1; i > 0; --i) {
            j = random(0, l);
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }

    function show_tiles()
    {
        var i, a, tile, tile_id;

        tiles_node.innerHTML = "";

        for (i = 0; i < tiles_count; ++i) {
            tile_id = tile_ids[i];
            tile = tiles[tile_id];
            a = document.createElement("a");
            a.innerText = String(tile[1]);
            a.setAttribute("id", tile_id);
            a.setAttribute("class", "type-" + String(tile[0]));
            a.onclick = handle_tile_click;
            tiles_node.appendChild(a);
        }

        show(tiles_node);
    }

    function handle_tile_click(evt)
    {
        var is_complete = false,
            a, tile_id;

        evt = evt || event;
        a = evt.target;
        tile_id = a.getAttribute("id");

        if (append_tile(tile_id)) {
            hide(a);

            is_complete = is_calculation_complete();

            if (is_complete) {
                evaluate_calculation();
            }
        }

        if (!is_complete) {
            update_calculation();
        }

        update_score();

        return stop_event(evt);
    }

    function adjust_score_delta(change)
    {
        score_delta += change;

        if (roller === null && score_delta !== 0) {
            roller = setInterval(roll_score, 100);
        }
    }

    function append_tile(tile_id)
    {
        var prev_type = null,
            is_valid = false,
            tile, value, is_valid;

        tile = tiles[tile_id];

        if (tile && is_valid_as_next_tile(tile)) {
            --tiles_count;
            is_valid = true;

            if (prev_tile !== null) {
                prev_type = prev_tile[0];
            }

            value = tile[1];
            calculation.push(tile);
            tiles[tile_id] = null;
            adjust_score_delta(3);
            prev_tile = tile;

            switch (tile[0]) {
                case ADD:
                    append_operator(tile);
                    break;
                case SUB:
                    adjust_score_delta(7);
                    append_operator(tile);
                    break;
                case MUL:
                    adjust_score_delta(17);
                    append_operator(tile);
                    break;
                case EQ:
                    has_eq = true;
                    --eqs;
                    break;
                case NUM:
                    --numbers;

                    if (!has_eq) {
                        polish.push(tile);
                    }

                    if (is_board_exhausted()) {
                        level_up();
                        schedule_new_board();
                    }

                    break;
                default:
                    break;
            }
        }

        return is_valid;
    }

    function append_operator(tile)
    {
        var p = PREC[tile[0]];

        has_operator = true;
        --operators;

        while ((op_stack.length > 0) && (op_stack[op_stack.length - 1][2] >= p)) {
            polish.push(op_stack.pop());
        }

        op_stack.push([tile[0], tile[1], p]);
    }

    function partial_result()
    {
        var stack = [],
            p = polish.slice(),
            o = op_stack.slice(),
            e, a, b,
            i, l;

        if ((calculation.length < 3) || ((prev_tile[0] !== NUM) && (prev_tile[0] !== EQ))) {
            return null;
        }

        while (o.length > 0) {
            p.push(o.pop());
        }

        for (i = 0, l = p.length; i < l; ++i) {
            e = p[i];

            switch (e[0]) {
                case NUM:
                    stack.push(e[1]);
                    break;
                case ADD:
                    b = stack.pop();
                    a = stack.pop();
                    stack.push(a + b);
                    break;
                case SUB:
                    b = stack.pop();
                    a = stack.pop();
                    stack.push(a - b);
                    break;
                case MUL:
                    b = stack.pop();
                    a = stack.pop();
                    stack.push(a * b);
                    break;
                default:
                    break;
            }
        }

        return stack[0];
    }

    function is_calculation_complete()
    {
        return has_eq && prev_tile !== null && prev_tile[0] === NUM;
    }

    function evaluate_calculation()
    {
        var value = prev_tile[1],
            expected = partial_result();

        if (expected === value) {
            adjust_score_delta(Math.min(1000, expected * calculation.length));
            show_correct_calculation();

            if (tiles_count < 1) {
                adjust_score_delta(2000);
            }
        } else {
            adjust_score_delta(
                - Math.max(50, Math.min(500, Math.abs(value - expected) * calculation.length))
            );
            show_wrong_calculation(expected);
        }

        new_calculation();
    }

    function is_board_exhausted()
    {
        return (eqs < 1) || (has_eq && (operators < 1));
    }

    function level_up()
    {
        ++level;

        if (level <= MAX_LEVEL) {
            update_level();
        } else {
            end_game();
        }
    }

    function end_game()
    {
        var final_score = Math.max(0, score + score_delta),
            final_score_str, high_score, high_score_str, ex, msg;

        try {
            high_score = Math.max(0, Number(localStorage.getItem("calcle_high_score")));
        } catch (ex) {
            high_score = 0;
        }

        is_done = true;
        is_playing = false;
        final_score_str = String(final_score);

        if (high_score > 0) {
            high_score = Math.max(final_score, high_score);
            high_score_str = String(high_score);
            final_score_node.innerHTML = (
                "Score: " + final_score_str
                + " (High score: " + high_score_str + ")"
            );
            msg = (
                "I just scored " + final_score_str + " in Calcle"
                + " (my highest score is " + high_score_str + "):"
                + " https://attilammagyar.github.io/toys/calcle"
            );
        } else {
            high_score = Math.max(final_score, high_score);
            final_score_node.innerHTML = "Score: " + String(final_score);
            msg = (
                "I just scored " + final_score_str + " in Calcle:"
                + " https://attilammagyar.github.io/toys/calcle"
            );
        }

        copy_text_node.value = msg;

        tick();
        show(end_screen);

        localStorage.setItem("calcle_high_score", high_score);
    }

    function schedule_new_board()
    {
        hide(tiles_node);
        setTimeout(new_board, 300);
    }

    function roll_score()
    {
        var sgn = (score_delta > 0) ? 1 : -1,
            new_delta, diff;

        new_delta = sgn * Math.floor(Math.abs(score_delta) * 0.8);
        diff = score_delta - new_delta;

        score = Math.max(0, score + diff);
        score_delta = new_delta;

        if (score_delta === 0) {
            clearInterval(roller);
            roller = null;
        }

        update_score();
    }

    function is_valid_as_next_tile(tile)
    {
        var type = tile[0];

        switch (type) {
            case NUM:
                return prev_tile === null || prev_tile[0] !== NUM;
            case ADD:
            case SUB:
            case MUL:
                return prev_tile !== null && prev_tile[0] === NUM;
            case EQ:
                return has_operator && prev_tile !== null && prev_tile[0] === NUM;
            default:
                return false;
        }
    }

    function update_calculation()
    {
        var p = partial_result(),
            html = calculation_to_string("<wbr/>");

        if (p !== null) {
            html += '<wbr/><span class="partial-result">' + (has_eq ? "" : "=") + String(p) + "</span>";
        }

        calculation_node.innerHTML = html;
    }

    function calculation_to_string(separator)
    {
        return calculation_to_array(separator).join("");
    }

    function calculation_to_array(separator)
    {
        var c, p, i, l;

        c = "";

        for (i = 0, l = calculation.length; i < l; ++i) {
            p = String(calculation[i][1]);
            c += separator + p;

            if (p === "=") {
                ++i;
                break;
            }
        }

        if (i < l) {
            return [c, String(calculation[i][1])];
        }

        return [c, ""];
    }

    function show_wrong_calculation(expected)
    {
        var c = calculation_to_array("<wbr/>");

        calculation_node.innerHTML = (
            c[0]
            + "<span class=\"wrong\">"
            + c[1]
            + "</span> <span class=\"good\">"
            + String(expected)
            + "</span>"
        );
    }

    function show_correct_calculation()
    {
        calculation_node.innerHTML = (
            "<span class=\"good\">"
            + calculation_to_string("<wbr/>")
            + "</span>"
        );
    }

    function update_score()
    {
        score_node.innerHTML = String(score);

        if (score_delta === 0) {
            score_delta_node.innerHTML = "";
        } else if (score_delta > 0) {
            score_delta_node.innerHTML = "+" + String(score_delta);
            score_delta_node.setAttribute("class", "good");
        } else {
            score_delta_node.innerHTML = String(score_delta);
            score_delta_node.setAttribute("class", "bad");
        }
    }

    function update_level()
    {
        level_node.innerHTML = String(level) + "/" + String(MAX_LEVEL);
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
        evt.stopPropagation();

        return false;
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

    function init_random(date)
    {
        var year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            seed;

        seed = (year << 9) + ((month + (day & 3)) << 5) + day + 0x345;
        rng_x = seed & 0xffff
        rng_c = (((~seed) >> 3) ^ 0x3cf5) & 0xffff
    }

    function random(min, max)
    {
        // https://en.wikipedia.org/wiki/Multiply-with-carry_pseudorandom_number_generator
        var diff;

        rng_x = 32718 * rng_x + rng_c;
        rng_c = rng_x >> 16;
        rng_x = rng_x  & 0xffff;

        diff = (max >= min) ? max - min : 0;

        return min + Math.floor(diff * (rng_x / 0x10000));
    }

    function stats(arr)
    {
        var l = arr.length,
            mean, sd, median, sum, i, m, d;

        if (l < 1) {
            return {
                "valid": false,
                "min": 0,
                "max": 0,
                "mean": 0,
                "median": 0,
                "sd": 0
            };
        }

        arr = arr.slice();
        arr.sort(function (a, b) { return a - b; });

        for (i = 0, sum = 0; i < l; ++i) {
            sum += arr[i];
        }

        mean = sum / l;

        for (i = 0, sum = 0; i < l; ++i) {
            d = arr[i] - mean;
            sum += d * d;
        }

        sd = Math.sqrt(sum / l);

        m = Math.floor(l / 2);

        if (l % 2 == 0) {
            median = (arr[m - 1] + arr[m]) / 2;
        } else {
            median = arr[m];
        }

        return {
            "valid": true,
            "min": arr[0],
            "max": arr[l - 1],
            "mean": mean,
            "median": median,
            "sd": sd
        };
    }

    function run_tests()
    {
        var noop = function () {};

        schedule_new_board = noop;
        show_correct_calculation = noop;
        show_tiles = noop;
        show_wrong_calculation = noop;
        update_calculation = noop;
        update_level = noop;
        update_score = noop;
        roller = "not-none";

        QUnit.module("calcle", function () {
            var dummy_tile_1,
                dummy_tile_2,
                dummy_tile_3,
                dummy_tile_add,
                dummy_tile_eq;

            function set_up_gameplay_test()
            {
                init_random(new Date(2022, 0, 1));
                new_game();
                clear_tiles();
                new_calculation();

                dummy_tile_1 = create_tile(NUM, 1);
                dummy_tile_2 = create_tile(NUM, 2);
                dummy_tile_3 = create_tile(NUM, 3);
                dummy_tile_add = create_tile(ADD, "+");
                dummy_tile_eq = create_tile(EQ, "=");
            }

            function assert_can_append(assert, type, value, expect_completion, expected_partial_result)
            {
                assert.ok(
                    append_tile(create_tile(type, value)),
                    "Expected " + String(value) + " to be accepted after '" + calculation_to_string("") + "'"
                );

                assert.equal(
                    is_calculation_complete(),
                    expect_completion,
                    "Expected '" + calculation_to_string("") + "' to be "
                    + (expect_completion ? "complete" : "incomplete")
                );

                assert.equal(
                    partial_result(),
                    expected_partial_result,
                    "Unexpected partial result for '" + calculation_to_string("") + "'"
                );
            }

            function assert_cannot_append(assert, type, value)
            {
                assert.notOk(
                    append_tile(create_tile(type, value)),
                    "Expected " + String(value) + " not to be accepted after '" + calculation_to_string("") + "'"
                );
            }

            QUnit.test("calculation_to_string", function (assert) {
                set_up_gameplay_test();

                assert_can_append(assert, NUM, 1, false, null);
                assert_can_append(assert, ADD, "+", false, null);
                assert_can_append(assert, NUM, 2, false, 3);
                assert_can_append(assert, MUL, "×", false, null);
                assert_can_append(assert, NUM, 3, false, 7);
                assert_can_append(assert, SUB, "-", false, null);
                assert_can_append(assert, NUM, 4, false, 3);
                assert_can_append(assert, ADD, "+", false, null);
                assert_can_append(assert, NUM, 5, false, 8);
                assert_can_append(assert, EQ, "=", false, 8);
                assert_can_append(assert, NUM, 8, true, 8);

                assert.equal(calculation_to_string(""), "1+2×3-4+5=8");
            });

            QUnit.test("1+2=3", function (assert) {
                set_up_gameplay_test();

                assert_cannot_append(assert, EQ, "=");
                assert_cannot_append(assert, ADD, "+");
                assert_cannot_append(assert, SUB, "+");
                assert_cannot_append(assert, MUL, "×");

                assert_can_append(assert, NUM, 1, false, null);
                assert_cannot_append(assert, NUM, 2);
                assert_cannot_append(assert, EQ, "=");

                assert_can_append(assert, ADD, "+", false, null);
                assert_cannot_append(assert, EQ, "=");
                assert_cannot_append(assert, ADD, "+");
                assert_cannot_append(assert, SUB, "+");
                assert_cannot_append(assert, MUL, "×");

                assert_can_append(assert, NUM, 2, false, 3);
                assert_cannot_append(assert, NUM, 2);

                assert_can_append(assert, EQ, "=", false, 3);
                assert_cannot_append(assert, EQ, "=");
                assert_cannot_append(assert, ADD, "+");
                assert_cannot_append(assert, SUB, "+");
                assert_cannot_append(assert, MUL, "×");

                assert_can_append(assert, NUM, 3, true, 3);
            });

            QUnit.test("complicated_calculation", function (assert) {
                set_up_gameplay_test();

                assert_can_append(assert, NUM, 1, false, null);
                assert_can_append(assert, ADD, "+", false, null);
                assert_can_append(assert, NUM, 2, false, 3);
                assert_can_append(assert, MUL, "×", false, null);
                assert_can_append(assert, NUM, 3, false, 7);
                assert_can_append(assert, MUL, "×", false, null);
                assert_can_append(assert, NUM, 5, false, 31);
                assert_can_append(assert, SUB, "-", false, null);
                assert_can_append(assert, NUM, 4, false, 27);
                assert_can_append(assert, MUL, "×", false, null);
                assert_can_append(assert, NUM, 7, false, 3);
                assert_can_append(assert, ADD, "+", false, null);
                assert_can_append(assert, NUM, 97, false, 100);
                assert_can_append(assert, EQ, "=", false, 100);
                assert_can_append(assert, NUM, 100, true, 100);

                assert.equal(calculation_to_string(""), "1+2×3×5-4×7+97=100");
            });

            QUnit.test("wrong result", function (assert) {
                set_up_gameplay_test();

                assert_can_append(assert, NUM, 1, false, null);
                assert_can_append(assert, ADD, "+", false, null);
                assert_can_append(assert, NUM, 2, false, 3);
                assert_can_append(assert, MUL, "×", false, null);
                assert_can_append(assert, NUM, 3, false, 7);
                assert_can_append(assert, SUB, "-", false, null);
                assert_can_append(assert, NUM, 5, false, 2);
                assert_can_append(assert, EQ, "=", false, 2);
                assert_can_append(assert, NUM, 3, true, 2);

                score_delta = 0;
                evaluate_calculation();

                assert.ok(score_delta < 0, "Expected penalty for wrong result, got: " + String(score_delta));
            });

            QUnit.test("correct result", function (assert) {
                set_up_gameplay_test();

                assert_can_append(assert, NUM, 1, false, null);
                assert_can_append(assert, ADD, "+", false, null);
                assert_can_append(assert, NUM, 2, false, 3);
                assert_can_append(assert, MUL, "×", false, null);
                assert_can_append(assert, NUM, 3, false, 7);
                assert_can_append(assert, SUB, "-", false, null);
                assert_can_append(assert, NUM, 5, false, 2);
                assert_can_append(assert, EQ, "=", false, 2);
                assert_can_append(assert, NUM, 2, true, 2);

                score_delta = 0;
                evaluate_calculation();

                assert.ok(score_delta > 0, "Expected reward for correct result, got: " + String(score_delta));
            });

            QUnit.test("is_board_exhausted", function (assert) {
                set_up_gameplay_test();

                assert_can_append(assert, NUM, 1, false, null);
                assert_can_append(assert, ADD, "+", false, null);
                assert_can_append(assert, NUM, 2, false, 3);
                assert_can_append(assert, EQ, "=", false, 3);
                assert_can_append(assert, NUM, 3, true, 3);

                assert.notOk(is_board_exhausted(), "Expected board not to be exhausted");

                new_calculation();

                assert.ok(append_tile(dummy_tile_1));
                assert.ok(append_tile(dummy_tile_add));
                assert.ok(append_tile(dummy_tile_2));
                assert.ok(append_tile(dummy_tile_eq));
                assert.ok(append_tile(dummy_tile_3));

                assert.ok(is_board_exhausted(), "Expected board to be exhausted");
            });

            QUnit.test("random", function(assert) {
                var n = 365 * 20,
                    expected_sd = Math.sqrt((200 - 100) * (200 - 100) / 12),
                    a, d, ds, i, j, s, r, off_limits;

                for (i = 0; i < n; ++i) {
                    d = new Date(2022, 0, i);
                    ds = (
                        " (seed: "
                        + String(d.getFullYear())
                        + "-" + String(d.getMonth() + 1)
                        + "-" + String(d.getDate())
                        + ")"
                    );
                    a = [];
                    off_limits = [];
                    init_random(d);

                    for (j = 0; j < 500; ++j) {
                        r = random(100, 200);
                        a.push(r);

                        if (!((Math.floor(r) === r) && (100 <= r) && (r <= 199))) {
                            off_limits.push(r);
                        }
                    }

                    s = stats(a);

                    assert.deepEqual(
                        off_limits,
                        [],
                        "Expected all random numbers to be integers between 100 and 199, got: " + String(off_limits) + ds
                    );
                    assert.ok(
                        (100 <= s["min"]) && (s["min"] < 105),
                        "Expected smallest random number to be between 100 and 105, got " + String(s["min"]) + ds
                    );
                    assert.ok(
                        (195 <= s["max"]) && (s["max"] <= 199),
                        "Expected biggest random number to be between 195 and 199, got " + String(s["max"]) + ds
                    );
                    assert.ok(
                        Math.abs(s["median"] - 150) <= 10,
                        "Expected the median to be around 150 (+/- 10), got " + String(s["median"]) + ds
                    );
                    assert.ok(
                        Math.abs(s["mean"] - 150) <= 10,
                        "Expected the mean to be around 150 (+/- 10), got " + String(s["mean"]) + ds
                    );
                    assert.ok(
                        Math.abs(s["sd"] - expected_sd) <= 5,
                        "Expected the standard deviation to be around "
                        + String(expected_sd)
                        + " (+/- 5), got " + String(s["sd"]) + ds
                    );

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
