(function () {

"use strict";

function $(id) { return document.getElementById(id); }

var CTH = {
    CARDS: 40,

    EASY: 1,
    MEDIUM: 2,
    HARD: 3,

    URL: "https://attilammagyar.github.io/toys/chimp-mem-game",
    SHARE_TEXT: "I just scored {score} in the Chimp Memorization Game on {difficulty} difficulty with {numbers} numbers in {rounds} rounds.",
    SHARE_STATS: " My fastest memorization time was {min}s (mean: {mean}s, median: {median}s, standard deviation: {sd}s).",
    SHARE_AUTO_HIDE: " The numbers were automatically hidden after {auto-hide}s.",
    SHARE_PERFECT_ROUNDS: " I had {perfect_rounds}.",
    SHARE_HASHTAGS: " #MindField",

    start_round_btn_node: null,
    mute_node: null,
    audio_nodes: null,
    tweet_node: null,
    copy_text_node: null,
    stats_round_node: null,
    stats_score_node: null,
    stats_perfect_rounds_node: null,
    game_node: null,
    end_node: null,
    intro_node: null,
    stats_mem_time_mean_node: null,
    stats_mem_time_min_node: null,
    stats_mem_time_max_node: null,
    stats_mem_time_median_node: null,
    stats_mem_time_sd_node: null,
    status_text_node: null,
    card_num_nodes: {},
    difficulty_nodes: {},
    rounds_nodes: {},
    auto_hide_nodes: {},
    numbers: 3,
    rounds: 10,
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
    audio_ctx: null,
    soft_saw_wave: null,
    soft_sqr_wave: null,
    win_frequency: 1108.73,
    win_lfo_freq_shaper_curve: null,
    win_lfo_amp_shaper_curve: null,
    wrong_frequency_1: 311.13,
    wrong_frequency_2: null,
    wrong_freq_curve: null,
    wrong_amp_curve: null,

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
            mean, sd, median, sum, i, m, d;

        if (l < 1) {
            return {
                "valid": false,
                "min": "?",
                "max": "?",
                "mean": "?",
                "median": "?",
                "sd": "?"
            };
        }

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
            "min": CTH.format_stats(arr[0]),
            "max": CTH.format_stats(arr[l - 1]),
            "mean": CTH.format_stats(mean),
            "median": CTH.format_stats(median),
            "sd": CTH.format_stats(sd)
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
        CTH.status_text_node.innerHTML = (
            "Score: " + String(CTH.score)
            + " (Round " + String(CTH.round) + "/" + String(CTH.rounds) + ")"
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

    is_mute: function ()
    {
        return CTH.mute_node.checked || CTH.audio_ctx === null;
    },

    play_click_sound: function ()
    {
        var osc, gain_env, start, ac;

        if (CTH.is_mute()) {
            return;
        }

        ac = CTH.audio_ctx;

        osc = new OscillatorNode(ac, {"channelCount": 1});
        gain_env = new GainNode(ac, {"channelCount": 1, "gain": 0.0});

        start = ac.currentTime + 0.05;

        CTH.start_envelope(gain_env, start, 0.002, 0.005, 0.02);

        osc.type = "square";
        osc.frequency.value = 660.0;

        osc.connect(gain_env);
        gain_env.connect(ac.destination);

        osc.start(start);

        setTimeout(
            function ()
            {
                gain_env.disconnect(ac.destination);
                osc.disconnect(gain_env);
            },
            300
        );
    },

    start_envelope: function (gain_env, time, attack, hold, decay)
    {
        gain_env.gain.setValueAtTime(0.0, time);

        time += attack;
        gain_env.gain.linearRampToValueAtTime(0.5, time);

        time += hold;
        gain_env.gain.setValueAtTime(0.5, time);

        time += decay;
        gain_env.gain.linearRampToValueAtTime(0.0, time);
    },

    play_win_sound: function ()
    {
        var osc, gain_env, gain_amp,
            lfo_freq, lfo_freq_shaper,
            lfo_amp, lfo_amp_shaper,
            start, ac;

        if (CTH.is_mute()) {
            return;
        }

        ac = CTH.audio_ctx;

        osc = new OscillatorNode(
            ac,
            {
                "channelCount": 1,
                "type": "sine",
                "frequency": CTH.win_frequency
            }
        );
        gain_env = new GainNode(ac, {"channelCount": 1, "gain": 0.0});
        gain_amp = new GainNode(ac, {"channelCount": 1, "gain": 0.0});
        lfo_freq = new OscillatorNode(
            ac,
            {
                "channelCount": 1,
                "periodicWave": CTH.soft_saw_wave,
                "frequency": 12.0
            }
        );
        lfo_freq_shaper = new WaveShaperNode(
            ac, {"channelCount": 1, "curve": CTH.win_lfo_freq_shaper_curve}
        );
        lfo_amp = new OscillatorNode(
            ac, {"channelCount": 1, "type": "triangle", "frequency": 6.0}
        );
        lfo_amp_shaper = new WaveShaperNode(
            ac, {"channelCount": 1, "curve": CTH.win_lfo_amp_shaper_curve}
        );

        start = ac.currentTime + 0.05;

        CTH.start_envelope(gain_env, start, 0.03, 1.2, 0.05);

        osc.connect(gain_amp);
        gain_amp.connect(gain_env);
        gain_env.connect(ac.destination);

        lfo_freq.connect(lfo_freq_shaper);
        lfo_freq_shaper.connect(osc.frequency);

        lfo_amp.connect(lfo_amp_shaper);
        lfo_amp_shaper.connect(gain_amp.gain);

        lfo_freq.start(start);
        lfo_amp.start(start);
        osc.start(start);

        setTimeout(
            function ()
            {
                gain_env.disconnect(ac.destination);
                gain_amp.disconnect(gain_env);
                osc.disconnect(gain_amp);
                lfo_freq_shaper.disconnect(osc.frequency);
                lfo_freq.disconnect(lfo_freq_shaper);
                lfo_amp_shaper.disconnect(gain_amp.gain);
                lfo_amp.disconnect(lfo_amp_shaper);
            },
            2000
        );
    },

    play_wrong_sound: function ()
    {
        var modulator, carrier,
            amp_shaper, freq_shaper,
            gain_env, gain_amp,
            start, ac;

        if (CTH.is_mute()) {
            return;
        }

        ac = CTH.audio_ctx;

        carrier = new OscillatorNode(
            ac,
            {
                "channelCount": 1,
                "periodicWave": CTH.soft_saw_wave,
                "frequency": CTH.wrong_frequency_1
            }
        );
        modulator = new OscillatorNode(
            ac,
            {
                "channelCount": 1,
                "periodicWave": CTH.soft_sqr_wave,
                "frequency": CTH.wrong_frequency_2
            }
        );
        gain_env = new GainNode(ac, {"channelCount": 1, "gain": 0.0});
        gain_amp = new GainNode(ac, {"channelCount": 1, "gain": 0.0});
        amp_shaper = new WaveShaperNode(
            ac, {"channelCount": 1, "curve": CTH.wrong_amp_curve}
        );
        freq_shaper = new WaveShaperNode(
            ac, {"channelCount": 1, "curve": CTH.wrong_freq_curve}
        );

        start = ac.currentTime + 0.05;

        CTH.start_envelope(gain_env, start, 0.003, 0.6, 0.03);

        modulator.connect(amp_shaper);
        amp_shaper.connect(gain_amp.gain);

        modulator.connect(freq_shaper);
        freq_shaper.connect(carrier.frequency);

        carrier.connect(gain_amp);
        gain_amp.connect(gain_env);
        gain_env.connect(ac.destination);

        modulator.start(start);
        carrier.start(start);

        setTimeout(
            function ()
            {
                gain_env.disconnect(ac.destination);
                gain_amp.disconnect(gain_env);
                carrier.disconnect(gain_amp);
                modulator.disconnect(amp_shaper);
                amp_shaper.disconnect(gain_amp.gain);
                modulator.disconnect(freq_shaper);
                freq_shaper.disconnect(carrier.frequency);
            },
            2000
        );
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
        CTH.play_wrong_sound();

        setTimeout(CTH.prepare_next_round, 1000);
    },

    handle_perfect_round: function ()
    {
        CTH.play_win_sound();
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

        CTH.play_click_sound();

        CTH.expected_values = CTH.expected_values.slice(1);
        CTH.score += CTH.difficulty * (CTH.numbers - CTH.expected_values.length);
        CTH.update_status();

        if (!CTH.done_memorizing) {
            CTH.done_memorizing = true;
            if (CTH.auto_hide <= 0) {
                CTH.memorization_times.push(now - CTH.memorization_start);
            } else {
                CTH.memorization_times.push(CTH.auto_hide / 1000);
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

        if (CTH.round <= CTH.rounds) {
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
                .replace("{rounds}", CTH.rounds)
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
                        .replace("{mean}", stats["mean"])
                        .replace("{sd}", stats["sd"])
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

        CTH.tweet_node.setAttribute(
            "href",
            [
                "https://twitter.com/intent/tweet?text=",
                escape(share_text),
                "&url=",
                escape(CTH.URL)
            ].join("")
        );
        CTH.copy_text_node.value = share_text + " " + CTH.URL;

        CTH.stats_round_node.innerHTML = CTH.rounds;
        CTH.stats_score_node.innerHTML = CTH.score;
        CTH.stats_perfect_rounds_node.innerHTML = CTH.perfect_rounds;

        if (stats["valid"]) {
            CTH.stats_mem_time_mean_node.innerHTML = stats["mean"] + "s";
            CTH.stats_mem_time_min_node.innerHTML = stats["min"] + "s";
            CTH.stats_mem_time_max_node.innerHTML = stats["max"] + "s";
            CTH.stats_mem_time_median_node.innerHTML = stats["median"] + "s";
            CTH.stats_mem_time_sd_node.innerHTML = stats["sd"] + "s";
        } else {
            CTH.stats_mem_time_mean_node.innerHTML = "N/A";
            CTH.stats_mem_time_min_node.innerHTML = "N/A";
            CTH.stats_mem_time_max_node.innerHTML = "N/A";
            CTH.stats_mem_time_median_node.innerHTML = "N/A";
            CTH.stats_mem_time_sd_node.innerHTML = "N/A";
        }

        CTH.game_node.setAttribute("class", "screen");
        CTH.end_node.setAttribute("class", "screen active");
    },

    start_game: function ()
    {
        var key, radio_btn, ex;

        if (CTH.audio_ctx === null) {
            CTH.init_audio();
        }

        for (key in CTH.card_num_nodes) {
            if (CTH.card_num_nodes.hasOwnProperty(key)) {
                radio_btn = CTH.card_num_nodes[key];

                if (radio_btn.checked) {
                    CTH.numbers = Number(radio_btn.value);
                    break;
                }
            }
        }

        for (key in CTH.difficulty_nodes) {
            if (CTH.difficulty_nodes.hasOwnProperty(key)) {
                radio_btn = CTH.difficulty_nodes[key];

                if (radio_btn.checked) {
                    CTH.difficulty = Number(radio_btn.value);
                    break;
                }
            }
        }

        for (key in CTH.rounds_nodes) {
            if (CTH.rounds_nodes.hasOwnProperty(key)) {
                radio_btn = CTH.rounds_nodes[key];

                if (radio_btn.checked) {
                    CTH.rounds = Number(radio_btn.value);
                    break;
                }
            }
        }

        for (key in CTH.auto_hide_nodes) {
            if (CTH.auto_hide_nodes.hasOwnProperty(key)) {
                radio_btn = CTH.auto_hide_nodes[key];

                if (radio_btn.checked) {
                    if (key === "auto-hide-0") {
                        CTH.auto_hide = null;
                    } else {
                        CTH.auto_hide = Number(radio_btn.value);
                    }
                    break;
                }
            }
        }

        CTH.round = 0;
        CTH.score = 0;
        CTH.perfect_rounds = 0;
        CTH.memorization_times = [];
        CTH.intro_node.setAttribute("class", "screen");
        CTH.game_node.setAttribute("class", "screen active");
        CTH.prepare_next_round();

        return false;
    },

    restart_game: function ()
    {
        CTH.end_node.setAttribute("class", "screen");
        CTH.intro_node.setAttribute("class", "screen active");
    },

    select: function ()
    {
        CTH.copy_text_node.select();
        CTH.copy_text_node.setSelectionRange(0, 99999);
    },

    copy: function ()
    {
        CTH.select();
        navigator.clipboard.writeText(CTH.copy_text_node.value);
    },

    init_audio: function ()
    {
        var partials = 24,
            soft_saw_coef = new Float32Array(partials),
            soft_sqr_coef = new Float32Array(partials),
            real = new Float32Array(partials),
            plus_or_minus_one, two_over_i_pi, softener,
            i, j;

        try {
            CTH.audio_ctx = new AudioContext();
        } catch (ex) {
            return;
        }

        soft_saw_coef[0] = 0.0;
        soft_sqr_coef[0] = 0.0;
        real[0] = 0.0;

        for (i = 0; i < partials; ++i) {
            j = i + 1;
            plus_or_minus_one = ((i & 1) == 1 ? -1.0 : 1.0);
            two_over_i_pi = 2.0 / (j * Math.PI);
            softener = 5.0 / (i + 5.0);

            soft_saw_coef[j] = softener * plus_or_minus_one * two_over_i_pi;
            soft_sqr_coef[j] = (
                softener * (1.0 + plus_or_minus_one) * two_over_i_pi
            );
            real[j] = 0.0;
        }

        CTH.soft_saw_wave = new PeriodicWave(
            CTH.audio_ctx,
            {
                "channelCount": 1,
                "disableNormalization": false,
                "real": real,
                "imag": soft_saw_coef
            }
        );
        CTH.soft_sqr_wave = new PeriodicWave(
            CTH.audio_ctx,
            {
                "channelCount": 1,
                "disableNormalization": false,
                "real": real,
                "imag": soft_sqr_coef
            }
        );

        CTH.win_lfo_freq_shaper_curve = new Float32Array(
            [0.0, CTH.win_frequency]
        );
        CTH.win_lfo_amp_shaper_curve = new Float32Array(
            [1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]
        );

        CTH.wrong_frequency_2 = (
            CTH.wrong_frequency_1 * Math.pow(2.0, -19.0 / 12.0)
        );
        CTH.wrong_amp_curve = new Float32Array([-1.0, 1.0]);
        CTH.wrong_freq_curve = new Float32Array(
            [0.0, CTH.wrong_frequency_1 * 2.5]
        );
    },

    init: function ()
    {
        var game = $("game"),
            body = document.getElementsByTagName("body")[0],
            i, key, card_node;

        for (i = 3; i < 10; ++i) {
            key = "cards-" + String(i);
            CTH.card_num_nodes[key] = $(key);
        }

        for (i = 1; i < 4; ++i) {
            key = "difficulty-" + String(i);
            CTH.difficulty_nodes[key] = $(key);
        }

        for (i = 0; i < 3; ++i) {
            key = "rounds-" + String(i);
            CTH.rounds_nodes[key] = $(key);
        }

        for (i = 0; i < 8; ++i) {
            key = "auto-hide-" + String(i);
            CTH.auto_hide_nodes[key] = $(key);
        }

        CTH.start_round_btn_node = $("start-round");
        CTH.mute_node = $("mute");
        CTH.audio_nodes = {
            "audio-click": $("audio-click"),
            "audio-win": $("audio-win"),
            "audio-wrong": $("audio-wrong"),
        };
        CTH.copy_text_node = $("copy-text");
        CTH.tweet_node = $("tweet");
        CTH.stats_round_node = $("stats-rounds");
        CTH.stats_score_node = $("stats-score");
        CTH.stats_perfect_rounds_node = $("stats-perfect-rounds");
        CTH.game_node = game;
        CTH.end_node = $("end");
        CTH.intro_node = $("intro");
        CTH.stats_mem_time_mean_node = $("stats-mem-time-mean");
        CTH.stats_mem_time_min_node = $("stats-mem-time-min");
        CTH.stats_mem_time_max_node = $("stats-mem-time-max");
        CTH.stats_mem_time_median_node = $("stats-mem-time-median");
        CTH.stats_mem_time_sd_node = $("stats-mem-time-sd");
        CTH.status_text_node = $("status-text");

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
        CTH.copy_text_node.addEventListener("click", CTH.select);
        $("copy-button").addEventListener("click", CTH.copy);
    }
}

window.onload = CTH.init;

})();
