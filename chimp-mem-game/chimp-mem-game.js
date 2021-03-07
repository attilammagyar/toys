(function () {

"use strict";

function $(id) { return document.getElementById(id); }

var CTH = {
    CARDS: 40,
    ROUNDS: 10,

    EASY: 1,
    MEDIUM: 2,
    HARD: 3,

    URL: "https://attilammagyar.github.io/toys/chimp-mem-game",
    SHARE_TEXT: "I just scored {score} in the Chimp Memorization Game on {difficulty} difficulty with {numbers} numbers.",
    SHARE_STATS: " My fastest memorization time was {min}s (avg: {avg}s, median: {median}s).",
    SHARE_AUTO_HIDE: " The numbers were automatically hidden after {auto-hide}s.",
    SHARE_PERFECT_ROUNDS: " I had {perfect_rounds}.",
    SHARE_HASHTAGS: " #MindField",

    start_round_btn_node: null,
    mute_node: null,
    audio_nodes: null,
    numbers: 3,
    card_nodes: [],
    card_values: [],
    expected_values: [],
    done_memorizing: false,
    accept_card_touches: false,
    difficulty: 0,
    auto_hide: null,
    round: 0,
    score: 0,
    perfect_rounds: 0,
    memorization_times: [],
    memorization_start: 0,
    hiding_timer: null,

    now: function ()
    {
        return (new Date()).getTime() / 1000;
    },

    format_stats: function (n)
    {
        return String(Math.round(n * 100) / 100);
    },

    statistics: function (arr)
    {
        var l = arr.length,
            avg, median, sum, i, m;

        if (l < 1) {
            return {
                "valid": false,
                "min": "?",
                "max": "?",
                "avg": "?",
                "median": "?"
            };
        }

        arr.sort(function (a, b) { return a - b; });

        for (i = 0, sum = 0; i < l; ++i) {
            sum += arr[i];
        }

        avg = sum / l;

        m = Math.floor(l / 2);

        if (l % 2 == 0) {
            median = (arr[m - 1] + arr[m]) / 2;
        } else {
            median = arr[m];
        }

        return {
            "valid": true,
            "min": CTH.format_stats(arr[0]),
            "max": CTH.format_stats(arr[l - 1]),
            "avg": CTH.format_stats(avg),
            "median": CTH.format_stats(median)
        };
    },

    clear_selection: function ()
    {
        try {
            window.getSelection().removeAllRanges();
        } catch (ex) {}
    },

    update_status: function ()
    {
        $("status-text").innerHTML = (
            "Score: " + String(CTH.score)
            + " (Round " + String(CTH.round) + "/" + String(CTH.ROUNDS) + ")"
        );
    },

    play_audio: function (id)
    {
        var ex, audio;

        try {
            if (!CTH.mute_node.checked) {
                audio = CTH.audio_nodes[id];
                audio.pause();
                audio.currentTime = 0;
                audio.play();
            }
        } catch (ex) {
        }
    },

    handle_wrong_card: function (clicked_card_index, expected_value)
    {
        var i;

        CTH.reveal_cards();

        for (i = 0; i < CTH.CARDS; ++i) {
            if (CTH.card_values[i] == expected_value) {
                CTH.card_nodes[i].setAttribute("class", "card revealed expected");
            } else if (CTH.card_values[i]) {
                CTH.card_nodes[i].setAttribute("class", "card revealed");
            }
        }
        CTH.card_nodes[clicked_card_index].setAttribute("class", "card revealed wrong");
        CTH.play_audio("audio-wrong");

        setTimeout(CTH.prepare_next_round, 1000);
    },

    handle_perfect_round: function ()
    {
        CTH.play_audio("audio-win");
        CTH.prepare_next_round();
        ++CTH.perfect_rounds;
    },

    handle_card_touch: function (evt)
    {
        var now = CTH.now(),
            clicked_card_index, card_value, card_node;

        if (!CTH.accept_card_touches) {
            CTH.clear_selection();
            return;
        }

        CTH.accept_card_touches = false;

        clicked_card_index = evt.target.getAttribute("id").match(/^card-([0-9]+)$/);

        if (!clicked_card_index) {
            CTH.accept_card_touches = true;
            return;
        }

        evt.stopPropagation();
        evt.preventDefault();
        CTH.clear_selection();

        clicked_card_index = Number(clicked_card_index[1]);
        card_node = CTH.card_nodes[clicked_card_index];

        if (!card_node) {
            CTH.accept_card_touches = true;
            return;
        }

        if (CTH.done_memorizing && card_node.getAttribute("class").match(/revealed/)) {
            CTH.accept_card_touches = true;
            return;
        }

        card_value = Number(CTH.card_values[clicked_card_index]);

        if (CTH.difficulty == CTH.EASY && !card_value) {
            CTH.accept_card_touches = true;
            return;
        }

        if (card_value != CTH.expected_values[0]) {
            CTH.handle_wrong_card(clicked_card_index, CTH.expected_values[0]);
            return;
        }

        CTH.play_audio("audio-click");

        CTH.expected_values = CTH.expected_values.slice(1);
        CTH.score += CTH.difficulty * (CTH.numbers - CTH.expected_values.length);
        CTH.update_status();

        if (!CTH.done_memorizing) {
            CTH.done_memorizing = true;
            if (CTH.auto_hide <= 0) {
                CTH.memorization_times.push(now - CTH.memorization_start);
            }
            CTH.hide_card_values();
        }

        CTH.reveal_card(clicked_card_index);
        card_node.setAttribute("class", "card revealed");

        if (CTH.expected_values.length === 0) {
            CTH.handle_perfect_round();
            return
        }

        CTH.accept_card_touches = true;

        return false;
    },

    randomize_card_values: function ()
    {
        var i,
            expected_values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        CTH.shuffle(expected_values);
        expected_values = expected_values.slice(0, CTH.numbers);
        expected_values.sort(function (a, b) { return a-b; });
        CTH.expected_values = expected_values;

        CTH.card_values = [];

        for (i = 0; i < CTH.CARDS; ++i) {
            CTH.card_values.push(i < CTH.numbers ? String(expected_values[i]) : "");
        }

        CTH.shuffle(CTH.card_values);
    },

    shuffle: function (arr)
    {
        var i, j, tmp, l = arr.length;

        for (i = l - 1; i > 0; --i) {
            j = Math.floor(Math.random() * l);
            tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    },

    reveal_cards: function ()
    {
        var i;

        for (i = 0; i < CTH.CARDS; ++i) {
            CTH.reveal_card(i);
        }
    },

    hide_cards: function ()
    {
        var i, card_node;

        for (i = 0; i < CTH.CARDS; ++i) {
            card_node = CTH.card_nodes[i];
            card_node.setAttribute("class", "card hidden");
            card_node.innerHTML = "&nbsp;";
        }
    },

    hide_card_values: function ()
    {
        var i;

        if (CTH.hiding_timer !== null) {
            clearTimeout(CTH.hiding_timer);
            CTH.hiding_timer = null;
        }

        for (i = 0; i < CTH.CARDS; ++i) {
            CTH.hide_card_value(i);
        }
    },

    hide_card_value: function (i)
    {
        var card_node = CTH.card_nodes[i];

        card_node.innerHTML = "&nbsp;";

        switch (CTH.difficulty) {
            case CTH.EASY:
                if (CTH.card_values[i]) {
                    card_node.setAttribute("class", "card value_hidden");
                } else {
                    card_node.setAttribute("class", "card hidden");
                }
                break;
            case CTH.MEDIUM:
            case CTH.HARD:
                card_node.setAttribute("class", "card value_hidden");
                break;
            default:
                card_node.setAttribute("class", "card hidden");
        }
    },

    reveal_card: function (i)
    {
        var card_node = CTH.card_nodes[i],
            value = CTH.card_values[i];

        card_node.innerHTML = value ? value : "&nbsp;";

        if (CTH.difficulty === CTH.MEDIUM) {
            if (value) {
                card_node.setAttribute("class", "card revealed");
            } else {
                card_node.setAttribute("class", "card value_hidden");
            }
        } else {
            card_node.setAttribute("class", "card revealed");
        }
    },

    prepare_next_round: function ()
    {
        ++CTH.round;
        CTH.accept_card_touches = false;

        if (CTH.auto_hide > 0) {
            CTH.start_round_btn_node.setAttribute("class", "");
        }

        if (CTH.round <= CTH.ROUNDS) {
            setTimeout(function () {
                CTH.hide_cards();
                CTH.update_status();
                if (CTH.auto_hide > 0) {
                    setTimeout(CTH.prepare_round, 500);
                } else {
                    setTimeout(CTH.start_round, 500);
                }
            }, 500);
        } else {
            setTimeout(CTH.show_end_screen, 1000);
        }
    },

    prepare_round: function ()
    {
        CTH.start_round_btn_node.setAttribute("class", "visible");
    },

    start_round: function ()
    {
        CTH.start_round_btn_node.setAttribute("class", "");
        CTH.randomize_card_values();
        CTH.reveal_cards();
        CTH.accept_card_touches = true;
        CTH.done_memorizing = false;
        CTH.memorization_start = CTH.now();

        if (CTH.auto_hide > 0) {
            CTH.hiding_timer = setTimeout(CTH.hide_card_values, CTH.auto_hide);
        }
    },

    format_number_with_units: function (n, unit)
    {
        if (n == 1) {
            return String(n) + " " + unit;
        }

        return String(n) + " " + unit + "s";
    },

    show_end_screen: function ()
    {
        var difficulty = ["easy", "medium", "hard"][CTH.difficulty - 1],
            stats = CTH.statistics(CTH.memorization_times),
            share_text;

        CTH.hide_cards();

        share_text = (
            CTH.SHARE_TEXT
                .replace("{score}", CTH.format_number_with_units(CTH.score, "point"))
                .replace("{numbers}", String(CTH.numbers))
                .replace("{difficulty}", difficulty)
        );

        if (CTH.auto_hide > 0) {
            share_text += (
                CTH.SHARE_AUTO_HIDE
                    .replace(
                        "{auto-hide}",
                        CTH.format_stats(CTH.auto_hide / 1000)
                    )
            );
        } else {
            if (stats["valid"]) {
                share_text += (
                    CTH.SHARE_STATS
                        .replace("{min}", stats["min"])
                        .replace("{avg}", stats["avg"])
                        .replace("{median}", stats["median"])
                );
            }
        }

        if (CTH.perfect_rounds > 0) {
            share_text += CTH.SHARE_PERFECT_ROUNDS.replace(
                "{perfect_rounds}",
                CTH.format_number_with_units(CTH.perfect_rounds, "perfect round")
            );
        }

        share_text += CTH.SHARE_HASHTAGS;

        $("tweet").setAttribute(
            "href",
            [
                "https://twitter.com/intent/tweet?text=",
                escape(share_text),
                "&url=",
                escape(CTH.URL)
            ].join("")
        );

        $("stats-score").innerHTML = CTH.score;
        $("stats-perfect-rounds").innerHTML = CTH.perfect_rounds;

        if (stats["valid"]) {
            $("stats-mem-time-avg").innerHTML = stats["avg"] + "s";
            $("stats-mem-time-min").innerHTML = stats["min"] + "s";
            $("stats-mem-time-max").innerHTML = stats["max"] + "s";
            $("stats-mem-time-median").innerHTML = stats["median"] + "s";
        } else {
            $("stats-mem-time-avg").innerHTML = "N/A";
            $("stats-mem-time-min").innerHTML = "N/A";
            $("stats-mem-time-max").innerHTML = "N/A";
            $("stats-mem-time-median").innerHTML = "N/A";
        }

        $("game").setAttribute("class", "screen");
        $("end").setAttribute("class", "screen active");
    },

    start_game: function ()
    {
        var i, radio_btn;

        for (i = 3; i < 10; ++i) {
            if ($("card-number-" + String(i)).checked) {
                CTH.numbers = i;
                break;
            }
        }

        for (i = 1; i < 4; ++i) {
            if ($("difficulty-" + String(i)).checked) {
                CTH.difficulty = i;
                break;
            }
        }

        for (i = 0; i < 8; ++i) {
            radio_btn = $("auto-hide-" + String(i))
            if (radio_btn.checked) {
                if (i === 0) {
                    CTH.auto_hide = null;
                } else {
                    CTH.auto_hide = Number(radio_btn.value);
                }
                break;
            }
        }

        CTH.round = 0;
        CTH.score = 0;
        CTH.perfect_rounds = 0;
        CTH.memorization_times = [];
        $("intro").setAttribute("class", "screen");
        $("game").setAttribute("class", "screen active");
        CTH.prepare_next_round();

        return false;
    },

    restart_game: function ()
    {
        $("end").setAttribute("class", "screen");
        $("intro").setAttribute("class", "screen active");
    },

    init: function ()
    {
        var game = $("game"),
            body = document.getElementsByTagName("body")[0],
            i, card_node;

        CTH.start_round_btn_node = $("start-round");
        CTH.mute_node = $("mute");
        CTH.audio_nodes = {
            "audio-click": $("audio-click"),
            "audio-win": $("audio-win"),
            "audio-wrong": $("audio-wrong"),
        };

        for (i = 0; i < CTH.CARDS; ++i) {
            card_node = document.createElement("div");
            card_node.setAttribute("class", "card hidden");
            card_node.setAttribute("id", "card-" + String(i));
            CTH.card_nodes.push(card_node);
            game.appendChild(card_node);
        }

        body.addEventListener("mousedown", CTH.handle_card_touch, false);
        $("form").addEventListener("submit", function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
        });
        $("start").addEventListener("click", CTH.start_game);
        $("restart").addEventListener("click", CTH.restart_game);
        CTH.start_round_btn_node.addEventListener("click", CTH.start_round);
    }
}

window.onload = CTH.init;

})();
