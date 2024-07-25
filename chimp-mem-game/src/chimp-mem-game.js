(function () {

"use strict";

function $(id)
{
    return document.getElementById(id);
}

var CARDS = 40,

    EASY = 1,
    MEDIUM = 2,
    HARD = 3,

    SHARE_URL = "https://attilammagyar.github.io/toys/chimp-mem-game",
    SHARE_TEXT = "I just scored {score} in the Chimp Memorization Game on {difficulty} level with {numbers} numbers in {rounds} rounds.",
    SHARE_STATS = " Fastest memorization time: {min}s (mean: {mean}s, median: {median}s, SD: {sd}s).",
    SHARE_AUTO_HIDE = " Auto-hide: {auto-hide}s.",
    SHARE_PERFECT_ROUNDS = " Perfect rounds: {perfect_rounds}.",
    SHARE_HASHTAGS = " #MindField",

    LOCAL_STORAGE_KEY = "chimp_mem_game",

    VOLUME = 0.35,

    STATS_HISTORY_MAX_LENGTH = 1000,

    start_round_btn_node = null,
    mute_node = null,
    tweet_node = null,
    copy_text_node = null,
    stats_round_node = null,
    stats_score_node = null,
    stats_perfect_rounds_node = null,
    game_node = null,
    end_node = null,
    intro_node = null,
    stats_history = null,
    stats_history_download_node = null,
    stats_score_history_chart_node = null,
    stats_score_history_min_node = null,
    stats_score_history_mid_node = null,
    stats_score_history_max_node = null,
    stats_time_history_chart_node = null,
    stats_time_history_min_node = null,
    stats_time_history_mid_node = null,
    stats_time_history_max_node = null,
    stats_mem_time_mean_node = null,
    stats_mem_time_min_node = null,
    stats_mem_time_max_node = null,
    stats_mem_time_median_node = null,
    stats_mem_time_sd_node = null,
    status_text_node = null,
    card_num_nodes = {},
    difficulty_nodes = {},
    rounds_nodes = {},
    auto_hide_nodes = {},
    numbers = 3,
    rounds = 10,
    card_nodes = [],
    card_values = [],
    expected_values = [],
    done_memorizing = false,
    score_bonus = 1.0,
    accept_card_touches = false,
    difficulty = 0,
    auto_hide = null,
    round = 0,
    score = 0,
    perfect_rounds = 0,
    memorization_times = [],
    memorization_start = 0,
    hiding_timer = null,
    audio_ctx = null,
    is_audio_suspended = false,
    soft_saw_wave = null,
    soft_sqr_wave = null,
    win_frequency = 1108.73,
    win_lfo_freq_shaper_curve = null,
    win_lfo_amp_shaper_curve = null,
    wrong_frequency_1 = 311.13,
    wrong_frequency_2 = null,
    wrong_freq_curve = null,
    wrong_amp_curve = null;

function time()
{
    return (new Date()).getTime() / 1000;
}

function format_stats(n)
{
    return String(Math.round(n * 100) / 100);
}

function num_cmp(a, b)
{
    return a - b;
}

function build_statistics(arr)
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
            "sd": 0,
            "min_str": "?",
            "max_str": "?",
            "mean_str": "?",
            "median_str": "?",
            "sd_str": "?"
        };
    }

    arr.sort(num_cmp);

    for (i = 0, sum = 0; i < l; ++i) {
        sum += arr[i];
    }

    mean = sum / l;

    for (i = 0, sum = 0; i < l; ++i) {
        d = arr[i] - mean;
        sum += d * d;
    }

    sd = Math.sqrt(sum / l);

    m = Math.floor(l / 2.0);

    if (l % 2 == 0) {
        median = (arr[m - 1] + arr[m]) / 2.0;
    } else {
        median = arr[m];
    }

    return {
        "valid": true,
        "min": arr[0],
        "max": arr[l - 1],
        "mean": mean,
        "median": median,
        "sd": sd,
        "min_str": format_stats(arr[0]),
        "max_str": format_stats(arr[l - 1]),
        "mean_str": format_stats(mean),
        "median_str": format_stats(median),
        "sd_str": format_stats(sd)
    };
}

function clear_selection()
{
    try {
        window.getSelection().removeAllRanges();
    } catch (ex) {}
}

function update_status()
{
    status_text_node.innerHTML = (
        "Score: " + String(score)
        + " (Round " + String(round) + "/" + String(rounds) + ")"
    );
}

function is_mute()
{
    if (audio_ctx === null) {
        return true;
    }

    if (mute_node.checked) {
        suspend_audio();

        return true;
    }

    resume_audio();

    return false;
}

function suspend_audio()
{
    if (is_audio_suspended) {
        return;
    }

    is_audio_suspended = true;
    audio_ctx.suspend();
}

function resume_audio()
{
    if (!is_audio_suspended) {
        return;
    }

    is_audio_suspended = false;
    audio_ctx.resume();
}

function play_click_sound()
{
    var osc, gain_env, start, ac;

    if (is_mute()) {
        return;
    }

    ac = audio_ctx;

    osc = new OscillatorNode(ac, {"channelCount": 1});
    gain_env = new GainNode(ac, {"channelCount": 1, "gain": 0.0});

    start = ac.currentTime + 0.05;

    start_envelope(gain_env, start, 0.002, 0.005, 0.02);

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
}

function start_envelope(gain_env, time, attack, hold, decay)
{
    gain_env.gain.setValueAtTime(0.0, time);

    time += attack;
    gain_env.gain.linearRampToValueAtTime(VOLUME, time);

    time += hold;
    gain_env.gain.setValueAtTime(VOLUME, time);

    time += decay;
    gain_env.gain.linearRampToValueAtTime(0.0, time);
}

function play_win_sound()
{
    var osc, gain_env, gain_amp,
        lfo_freq, lfo_freq_shaper,
        lfo_amp, lfo_amp_shaper,
        start, ac;

    if (is_mute()) {
        return;
    }

    ac = audio_ctx;

    osc = new OscillatorNode(
        ac, {"channelCount": 1, "type": "sine", "frequency": win_frequency}
    );
    gain_env = new GainNode(ac, {"channelCount": 1, "gain": 0.0});
    gain_amp = new GainNode(ac, {"channelCount": 1, "gain": 0.0});
    lfo_freq = new OscillatorNode(
        ac, {"channelCount": 1, "periodicWave": soft_saw_wave, "frequency": 12.0}
    );
    lfo_freq_shaper = new WaveShaperNode(
        ac, {"channelCount": 1, "curve": win_lfo_freq_shaper_curve}
    );
    lfo_amp = new OscillatorNode(
        ac, {"channelCount": 1, "type": "triangle", "frequency": 6.0}
    );
    lfo_amp_shaper = new WaveShaperNode(
        ac, {"channelCount": 1, "curve": win_lfo_amp_shaper_curve}
    );

    start = ac.currentTime + 0.05;

    start_envelope(gain_env, start, 0.03, 1.2, 0.05);

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
}

function play_wrong_sound()
{
    var modulator, carrier,
        amp_shaper, freq_shaper,
        gain_env, gain_amp,
        start, ac;

    if (is_mute()) {
        return;
    }

    ac = audio_ctx;

    carrier = new OscillatorNode(
        ac,
        {
            "channelCount": 1,
            "periodicWave": soft_saw_wave,
            "frequency": wrong_frequency_1
        }
    );
    modulator = new OscillatorNode(
        ac,
        {
            "channelCount": 1,
            "periodicWave": soft_sqr_wave,
            "frequency": wrong_frequency_2
        }
    );
    gain_env = new GainNode(ac, {"channelCount": 1, "gain": 0.0});
    gain_amp = new GainNode(ac, {"channelCount": 1, "gain": 0.0});
    amp_shaper = new WaveShaperNode(
        ac, {"channelCount": 1, "curve": wrong_amp_curve}
    );
    freq_shaper = new WaveShaperNode(
        ac, {"channelCount": 1, "curve": wrong_freq_curve}
    );

    start = ac.currentTime + 0.05;

    start_envelope(gain_env, start, 0.003, 0.6, 0.03);

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
}

function handle_wrong_card(clicked_card_index, expected_value)
{
    var i;

    reveal_cards();

    for (i = 0; i < CARDS; ++i) {
        if (card_values[i] == expected_value) {
            card_nodes[i].setAttribute("class", "card revealed expected");
        } else if (card_values[i]) {
            card_nodes[i].setAttribute("class", "card revealed");
        }
    }

    card_nodes[clicked_card_index].setAttribute("class", "card revealed wrong");
    play_wrong_sound();

    setTimeout(prepare_next_round, 1000);
}

function handle_perfect_round()
{
    play_win_sound();
    prepare_next_round();
    ++perfect_rounds;
}

function handle_card_touch(evt)
{
    var now = time(),
        delta, clicked_card_index, card_value, card_node;

    if (!accept_card_touches) {
        clear_selection();

        return false;
    }

    accept_card_touches = false;

    clicked_card_index = evt.target.getAttribute("id").match(/^card-([0-9]+)$/);

    if (!clicked_card_index) {
        accept_card_touches = true;

        return false;
    }

    evt = evt || window.event;
    evt.stopPropagation();
    evt.preventDefault();
    clear_selection();

    clicked_card_index = Number(clicked_card_index[1]);
    card_node = card_nodes[clicked_card_index];

    if (!card_node) {
        accept_card_touches = true;

        return false;
    }

    if (done_memorizing && card_node.getAttribute("class").match(/revealed/)) {
        accept_card_touches = true;

        return false;
    }

    card_value = Number(card_values[clicked_card_index]);

    if (difficulty == EASY && !card_value) {
        accept_card_touches = true;

        return false;
    }

    play_click_sound();

    if (card_value != expected_values[0]) {
        handle_wrong_card(clicked_card_index, expected_values[0]);

        return false;
    }

    if (!done_memorizing) {
        done_memorizing = true;
        delta = now - memorization_start;

        if (auto_hide !== null) {
            delta = Math.min(delta, auto_hide / 1000);
        }

        score_bonus = Math.max(1.0, 3.0 * (1.0 - delta));
        memorization_times.push(delta);
        hide_card_values();
    }

    expected_values = expected_values.slice(1);
    score += Math.round(
        score_bonus * difficulty * (numbers - expected_values.length)
    );
    update_status();

    reveal_card(clicked_card_index);
    card_node.setAttribute("class", "card revealed");

    if (expected_values.length === 0) {
        handle_perfect_round();

        return false;
    }

    accept_card_touches = true;

    return false;
}

function randomize_card_values()
{
    var i;

    expected_values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    shuffle(expected_values);
    expected_values = expected_values.slice(0, numbers);
    expected_values.sort(num_cmp);

    card_values = [];

    for (i = 0; i < CARDS; ++i) {
        card_values.push(i < numbers ? String(expected_values[i]) : "");
    }

    shuffle(card_values);
}

function shuffle(arr)
{
    var i, j, tmp, l = arr.length;

    for (i = l - 1; i > 0; --i) {
        j = Math.floor(Math.random() * l);
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
}

function reveal_cards()
{
    var i;

    for (i = 0; i < CARDS; ++i) {
        reveal_card(i);
    }
}

function hide_cards()
{
    var i, card_node;

    for (i = 0; i < CARDS; ++i) {
        card_node = card_nodes[i];
        card_node.setAttribute("class", "card hidden");
        card_node.innerHTML = "&nbsp;";
    }
}

function hide_card_values()
{
    var i;

    if (hiding_timer !== null) {
        clearTimeout(hiding_timer);
        hiding_timer = null;
    }

    for (i = 0; i < CARDS; ++i) {
        hide_card_value(i);
    }
}

function hide_card_value(i)
{
    var card_node = card_nodes[i];

    card_node.innerHTML = "&nbsp;";

    switch (difficulty) {
        case EASY:
            if (card_values[i]) {
                card_node.setAttribute("class", "card value_hidden");
            } else {
                card_node.setAttribute("class", "card hidden");
            }

            break;

        case MEDIUM:
        case HARD:
            card_node.setAttribute("class", "card value_hidden");

            break;

        default:
            card_node.setAttribute("class", "card hidden");
    }
}

function reveal_card(i)
{
    var card_node = card_nodes[i],
        value = card_values[i];

    card_node.innerHTML = value ? value : "&nbsp;";

    if (difficulty === MEDIUM) {
        if (value) {
            card_node.setAttribute("class", "card revealed");
        } else {
            card_node.setAttribute("class", "card value_hidden");
        }
    } else {
        card_node.setAttribute("class", "card revealed");
    }
}

function prepare_next_round()
{
    ++round;
    accept_card_touches = false;

    if (auto_hide !== null) {
        start_round_btn_node.setAttribute("class", "");
    }

    if (round <= rounds) {
        setTimeout(
            function ()
            {
                hide_cards();
                update_status();

                if (auto_hide !== null) {
                    setTimeout(prepare_round, 500);
                } else {
                    setTimeout(start_round, 500);
                }
            },
            500
        );
    } else {
        setTimeout(show_end_screen, 1500);
    }
}

function prepare_round()
{
    start_round_btn_node.setAttribute("class", "visible");
}

function start_round()
{
    start_round_btn_node.setAttribute("class", "");
    randomize_card_values();
    reveal_cards();
    accept_card_touches = true;
    done_memorizing = false;
    score_bonus = 1.0;
    memorization_start = time();

    if (auto_hide !== null) {
        hiding_timer = setTimeout(hide_card_values, auto_hide);
    }
}

function format_number_with_units(n, unit)
{
    if (n == 1) {
        return String(n) + " " + unit;
    }

    return String(n) + " " + unit + "s";
}

function show_end_screen()
{
    var difficulty_str = ["easy", "medium", "hard"][difficulty - 1],
        stats = build_statistics(memorization_times),
        share_text;

    hide_cards();
    suspend_audio();

    share_text = (
        SHARE_TEXT
            .replace("{score}", format_number_with_units(score, "point"))
            .replace("{numbers}", String(numbers))
            .replace("{difficulty}", difficulty_str)
            .replace("{rounds}", rounds)
    );

    if (stats["valid"]) {
        share_text += (
            SHARE_STATS
                .replace("{min}", stats["min_str"])
                .replace("{mean}", stats["mean_str"])
                .replace("{sd}", stats["sd_str"])
                .replace("{median}", stats["median_str"])
        );
    }

    if (auto_hide !== null) {
        share_text += (
            SHARE_AUTO_HIDE
                .replace(
                    "{auto-hide}",
                    format_stats(auto_hide / 1000)
                )
        );
    }

    if (perfect_rounds > 0) {
        share_text += SHARE_PERFECT_ROUNDS.replace(
            "{perfect_rounds}", String(perfect_rounds)
        );
    }

    share_text += SHARE_HASHTAGS;

    tweet_node.setAttribute(
        "href",
        [
            "https://twitter.com/intent/tweet?text=",
            escape(share_text),
            "&url=",
            escape(SHARE_URL)
        ].join("")
    );
    copy_text_node.value = share_text + " " + SHARE_URL;

    stats_round_node.innerHTML = rounds;
    stats_score_node.innerHTML = score;
    stats_perfect_rounds_node.innerHTML = perfect_rounds;

    if (stats["valid"]) {
        stats_mem_time_mean_node.innerHTML = stats["mean_str"] + "s";
        stats_mem_time_min_node.innerHTML = stats["min_str"] + "s";
        stats_mem_time_max_node.innerHTML = stats["max_str"] + "s";
        stats_mem_time_median_node.innerHTML = stats["median_str"] + "s";
        stats_mem_time_sd_node.innerHTML = stats["sd_str"] + "s";

        stats_history.push(
            [
                memorization_start,
                difficulty,
                numbers,
                rounds,
                auto_hide === null ? 0 : auto_hide,
                score,
                perfect_rounds,
                stats["mean"],
                stats["sd"],
                stats["median"],
                stats["min"],
                stats["max"]
            ]
        );
        stats_history = truncate_stats_history(stats_history);
        store_stats_history();
    } else {
        stats_mem_time_mean_node.innerHTML = "N/A";
        stats_mem_time_min_node.innerHTML = "N/A";
        stats_mem_time_max_node.innerHTML = "N/A";
        stats_mem_time_median_node.innerHTML = "N/A";
        stats_mem_time_sd_node.innerHTML = "N/A";
    }

    game_node.setAttribute("class", "screen");
    end_node.setAttribute("class", "screen active");
}

function store_stats_history()
{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stats_history));
}

function start_game()
{
    var key, radio_btn, ex;

    if (audio_ctx === null) {
        init_audio();
    }

    for (key in card_num_nodes) {
        if (card_num_nodes.hasOwnProperty(key)) {
            radio_btn = card_num_nodes[key];

            if (radio_btn.checked) {
                numbers = Number(radio_btn.value);
                break;
            }
        }
    }

    for (key in difficulty_nodes) {
        if (difficulty_nodes.hasOwnProperty(key)) {
            radio_btn = difficulty_nodes[key];

            if (radio_btn.checked) {
                difficulty = Number(radio_btn.value);
                break;
            }
        }
    }

    for (key in rounds_nodes) {
        if (rounds_nodes.hasOwnProperty(key)) {
            radio_btn = rounds_nodes[key];

            if (radio_btn.checked) {
                rounds = Number(radio_btn.value);
                break;
            }
        }
    }

    for (key in auto_hide_nodes) {
        if (auto_hide_nodes.hasOwnProperty(key)) {
            radio_btn = auto_hide_nodes[key];

            if (radio_btn.checked) {
                if (key === "auto-hide-0") {
                    auto_hide = null;
                } else {
                    auto_hide = Number(radio_btn.value);
                }
                break;
            }
        }
    }

    round = 0;
    score = 0;
    perfect_rounds = 0;
    memorization_times = [];
    intro_node.setAttribute("class", "screen");
    game_node.setAttribute("class", "screen active");
    prepare_next_round();

    return false;
}

function show_intro_screen()
{
    redraw_historical_scores();
    redraw_historical_times();
    end_node.setAttribute("class", "screen");
    intro_node.setAttribute("class", "screen active");
}

function redraw_historical_scores()
{
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        history = stats_history.slice(Math.max(0, stats_history.length - 199)),
        x_offset,
        scores = [],
        rounds,
        score,
        rect,
        height,
        cls,
        min_score,
        max_score,
        scale,
        i, l;

    min_score = -1;
    max_score = 0.001;

    for (i = 0, l = history.length; i < l; ++i) {
        rounds = history[i][3];

        if (rounds < 1) {
            continue;
        }

        score = history[i][5] / rounds;
        scores.push([history[i][1], score]);

        if (score > max_score) {
            max_score = score;
        }

        if (min_score < 0 || score < min_score) {
            min_score = score;
        }
    }

    if (min_score < 0) {
        min_score = 0;
    }

    max_score = Math.max(1.0, Math.ceil(max_score * 1.05));
    min_score = Math.floor(min_score * 0.9);
    scale = 100.0 / (max_score - min_score);
    x_offset = 29 + 600 - scores.length * 3;

    for (i = 0, l = scores.length; i < l; ++i) {
        score = scores[i];

        if (score[0] === MEDIUM) {
            cls = "medium";
        } else if (score[0] === HARD) {
            cls = "hard";
        } else {
            cls = "easy";
        }

        height = scale * (score[1] - min_score);
        rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("class", cls);
        rect.setAttribute("x", String(x_offset + i * 3 + 0.5));
        rect.setAttribute("width", "2");
        rect.setAttribute("y", String(105 - height));
        rect.setAttribute("height", String(height));

        g.appendChild(rect);
    }

    stats_score_history_min_node.innerHTML = String(min_score);
    stats_score_history_mid_node.innerHTML = String(
        Math.round(50.0 * (max_score + min_score)) / 100.0
    );
    stats_score_history_max_node.innerHTML = String(max_score);

    stats_score_history_chart_node.innerHTML = "";
    stats_score_history_chart_node.appendChild(g);
}

function redraw_historical_times()
{
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        history = stats_history.slice(Math.max(0, stats_history.length - 199)),
        x_offset,
        entry,
        times = [],
        rounds,
        time,
        obj,
        x_center,
        y_center,
        x,
        top_,
        bottom,
        height,
        cls,
        min_time,
        max_time,
        sd,
        scale,
        i, l;

    min_time = -1;
    max_time = 0.001;

    for (i = 0, l = history.length; i < l; ++i) {
        entry = history[i];

        if (entry[11] > max_time) {
            max_time = entry[11];
        }

        if (min_time < 0 || entry[10] < min_time) {
            min_time = entry[10];
        }

        sd = entry[8];
        min_time = Math.max(0.0, Math.min(entry[7] - sd, min_time));
        max_time = Math.max(entry[7] + sd, max_time);
    }

    if (min_time < 0) {
        min_time = 0;
    }

    max_time = Math.ceil(max_time * 10.5) / 10.0;
    min_time = Math.floor(min_time * 9.0) / 10.0;
    scale = 100.0 / (max_time - min_time);
    x_offset = 29 + 600 - history.length * 3;

    for (i = 0, l = history.length; i < l; ++i) {
        entry = history[i];

        if (entry[1] === MEDIUM) {
            cls = "medium";
        } else if (entry[1] === HARD) {
            cls = "hard";
        } else {
            cls = "easy";
        }

        bottom = 105 - scale * (entry[10] - min_time);
        top_ = 5 + scale * (max_time - entry[11]);
        height = bottom - top_;
        x_center = x_offset + i * 3 + 1.5;
        y_center = (top_ + bottom) * 0.5;

        /* min - max line */
        obj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        obj.setAttribute("class", cls);
        obj.setAttribute("x", String(x_center - 0.3));
        obj.setAttribute("width", "0.6");
        obj.setAttribute("y", String(top_));
        obj.setAttribute("height", String(height));
        g.appendChild(obj);

        /* max */
        x = String(x_center - 1.5);
        obj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        obj.setAttribute("class", cls);
        obj.setAttribute("x", x);
        obj.setAttribute("width", "3.0");
        obj.setAttribute("y", String(top_ - 0.6));
        obj.setAttribute("height", "1.2");
        g.appendChild(obj);

        /* min */
        obj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        obj.setAttribute("class", cls);
        obj.setAttribute("x", x);
        obj.setAttribute("width", "3.0");
        obj.setAttribute("y", String(bottom - 0.6));
        obj.setAttribute("height", "1.2");
        g.appendChild(obj);

        /* mean */
        y_center = 5 + scale * (max_time - entry[7]);
        obj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        obj.setAttribute("class", cls);
        obj.setAttribute("x", x);
        obj.setAttribute("width", "3.0");
        obj.setAttribute("y", String(y_center - 0.6));
        obj.setAttribute("height", "1.2");
        g.appendChild(obj);

        /* standard deviation */
        sd = scale * entry[8];
        top_ = Math.max(5.0, y_center - sd);
        height = Math.min(105.0 - top_, 2.0 * sd);
        obj = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        obj.setAttribute("class", cls);
        obj.setAttribute("x", String(x_center - 0.75));
        obj.setAttribute("width", "1.5");
        obj.setAttribute("y", String(top_));
        obj.setAttribute("height", String(height));
        g.appendChild(obj);

        /* median */
        obj = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        obj.setAttribute("class", cls);
        obj.setAttribute("cx", String(x_center));
        obj.setAttribute("cy", String(5 + scale * (max_time - entry[9])));
        obj.setAttribute("r", "1.5");
        g.appendChild(obj);
    }

    stats_time_history_min_node.innerHTML = String(min_time);
    stats_time_history_mid_node.innerHTML = String(
        Math.round(50.0 * (max_time + min_time)) / 100.0
    );
    stats_time_history_max_node.innerHTML = String(max_time);

    stats_time_history_chart_node.innerHTML = "";
    stats_time_history_chart_node.appendChild(g);
}

function select()
{
    copy_text_node.select();
    copy_text_node.setSelectionRange(0, 99999);
}

function copy()
{
    select();
    navigator.clipboard.writeText(copy_text_node.value);
}

function init_audio()
{
    var partials = 24,
        soft_saw_coef = new Float32Array(partials),
        soft_sqr_coef = new Float32Array(partials),
        real = new Float32Array(partials),
        plus_or_minus_one, two_over_i_pi, softener,
        i, j;

    try {
        audio_ctx = new AudioContext();
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

    win_lfo_amp_shaper_curve = new Float32Array(
        [1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0]
    );
    win_lfo_freq_shaper_curve = new Float32Array([0.0, win_frequency]);
    wrong_amp_curve = new Float32Array([-1.0, 1.0]);
    wrong_freq_curve = new Float32Array([0.0, wrong_frequency_1 * 2.5]);
    wrong_frequency_2 = wrong_frequency_1 * Math.pow(2.0, -19.0 / 12.0);

    soft_saw_wave = new PeriodicWave(
        audio_ctx,
        {
            "channelCount": 1,
            "disableNormalization": false,
            "real": real,
            "imag": soft_saw_coef
        }
    );
    soft_sqr_wave = new PeriodicWave(
        audio_ctx,
        {
            "channelCount": 1,
            "disableNormalization": false,
            "real": real,
            "imag": soft_sqr_coef
        }
    );

    audio_ctx.suspend();
    is_audio_suspended = true;
}

function restore_stats_history(data)
{
    var h = [], i, l, d, ex, min, max, rounds, auto_hide;

    try {
        data = JSON.parse(data);
    } catch (ex) {
        console.log("Error parsing historical statistics: " + ex);

        return [];
    }

    if (!(data && Array.isArray(data))) {
        console.log("No historical statistics found.");
        return [];
    }

    for (i = 0, l = data.length; i < l; ++i) {
        d = data[i];

        if (!(Array.isArray(d) && d.length === 12)) {
            console.log(
                "Ignoring invalid entry in historical statistics: wrong length;"
                + JSON.stringify(d)
            );

            continue;
        }

        try {
            rounds = validate_int(d[3], 5, 20);
            auto_hide = validate_number(d[4], 0.0, 8000.0);
            min = validate_number(d[10], 0.0, null);
            max = validate_number(d[11], min, null);

            h.push(
                [
                    validate_number(d[0], 0.0, null),       /* start */
                    validate_int(d[1], EASY, HARD),         /* difficulty */
                    validate_int(d[2], 3, 9),               /* numbers */
                    rounds,                                 /* rounds */
                    auto_hide,                              /* auto-hide */
                    validate_int(d[5], 0, null),            /* score */
                    validate_int(d[6], 0, rounds),          /* perfect rounds */
                    validate_number(d[7], min, max),        /* mean memorization time */
                    validate_number(d[8], 0.0, max - min),  /* standard deviation */
                    validate_number(d[9], min, max),        /* median memorization time */
                    min,                                    /* fastest memorization time */
                    max                                     /* slowest memorization time */
                ]
            );
        } catch (ex) {
            console.log(
                "Ignoring invalid entry in historical statistics: "
                + String(ex)
                + "; "
                + JSON.stringify(d)
            );
        }
    }

    return truncate_stats_history(h);
}

function truncate_stats_history(h)
{
    if (h.length > STATS_HISTORY_MAX_LENGTH) {
        return h.slice(h.length - STATS_HISTORY_MAX_LENGTH);
    }

    return h;
}

function validate_int(num, min, max)
{
    return validate_number(num, min, max, 0.0) | 0;
}

function validate_number(raw_num, min, max, tolerance)
{
    var num = Number(raw_num);

    tolerance = tolerance || 0.000001;

    if (max !== null && num > (max + tolerance)) {
        throw "Value " + String(raw_num) + " greater than " + String(max);
    }

    if (min !== null && num < (min - tolerance)) {
        throw "Value " + String(raw_num) + " less than " + String(min);
    }

    return num;
}

function export_stats_history(evt)
{
    var lines = [],
        d = new Date(),
        ds, m, i, l, s;

    function format_time(t)
    {
        return (t < 10) ? "0" + String(t) : String(t);
    }

    lines.push(
        [
            "Game Start",
            "Difficulty",
            "Numbers",
            "Rounds",
            "Auto-hide",
            "Score",
            "Perfect Rounds",
            "Mean Memorization Time",
            "Standard Deviation",
            "Median Memorization Time",
            "Fastest Memorization Time",
            "Slowest Memorization Time"
        ].join("\t")
    );

    for (i = 0, l = stats_history.length; i < l; ++i) {
        s = stats_history[i];
        d.setTime(s[0] * 1000.0);
        ds = [
            String(d.getFullYear()),
            "-",
            format_time(d.getMonth() + 1),
            "-",
            format_time(d.getDate()),
            " ",
            format_time(d.getHours()),
            ":",
            format_time(d.getMinutes()),
            ":",
            format_time(d.getSeconds())
        ].join("");

        lines.push(
            [
                ds,
                String(s[1]),
                String(s[2]),
                String(s[3]),
                String(s[4] / 1000.0),
                String(s[5]),
                String(s[6]),
                String(s[7]),
                String(s[8]),
                String(s[9]),
                String(s[10]),
                String(s[11])
            ].join("\t")
        );
    }

    stats_history_download_node.href = URL.createObjectURL(
        new Blob([lines.join("\r\n")], {"type": "text/tab-separated-values"})
    );
    stats_history_download_node.download = "chimp-mem-game.tsv";

    return true;
}

function main()
{
    var game = $("game"),
        body = document.getElementsByTagName("body")[0],
        i, key, card_node;

    stats_history = restore_stats_history(
        localStorage.getItem(LOCAL_STORAGE_KEY)
    );

    for (i = 3; i < 10; ++i) {
        key = "cards-" + String(i);
        card_num_nodes[key] = $(key);
    }

    for (i = 1; i < 4; ++i) {
        key = "difficulty-" + String(i);
        difficulty_nodes[key] = $(key);
    }

    for (i = 0; i < 3; ++i) {
        key = "rounds-" + String(i);
        rounds_nodes[key] = $(key);
    }

    for (i = 0; i < 10; ++i) {
        key = "auto-hide-" + String(i);
        auto_hide_nodes[key] = $(key);
    }

    start_round_btn_node = $("start-round");
    mute_node = $("mute");
    copy_text_node = $("copy-text");
    tweet_node = $("tweet");
    stats_round_node = $("stats-rounds");
    stats_score_node = $("stats-score");
    stats_perfect_rounds_node = $("stats-perfect-rounds");
    game_node = game;
    end_node = $("end");
    intro_node = $("intro");
    stats_history_download_node = $("stats-history-download");
    stats_score_history_chart_node = $("stats-history-score-chart");
    stats_score_history_min_node = $("stats-history-score-min");
    stats_score_history_mid_node = $("stats-history-score-mid");
    stats_score_history_max_node = $("stats-history-score-max");
    stats_time_history_chart_node = $("stats-history-time-chart");
    stats_time_history_min_node = $("stats-history-time-min");
    stats_time_history_mid_node = $("stats-history-time-mid");
    stats_time_history_max_node = $("stats-history-time-max");
    stats_mem_time_mean_node = $("stats-mem-time-mean");
    stats_mem_time_min_node = $("stats-mem-time-min");
    stats_mem_time_max_node = $("stats-mem-time-max");
    stats_mem_time_median_node = $("stats-mem-time-median");
    stats_mem_time_sd_node = $("stats-mem-time-sd");
    status_text_node = $("status-text");

    for (i = 0; i < CARDS; ++i) {
        card_node = document.createElement("div");
        card_node.setAttribute("class", "card hidden");
        card_node.setAttribute("id", "card-" + String(i));
        card_nodes.push(card_node);
        game.appendChild(card_node);
    }

    body.addEventListener("mousedown", handle_card_touch, false);
    $("form").addEventListener(
        "submit",
        function (evt)
        {
            evt = evt || window.event;
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        }
    );
    $("start").addEventListener("click", start_game);
    $("restart").addEventListener("click", show_intro_screen);
    start_round_btn_node.addEventListener("click", start_round);
    copy_text_node.addEventListener("click", select);
    $("copy-button").addEventListener("click", copy);

    stats_history_download_node.addEventListener("click", export_stats_history);

    show_intro_screen();
}

window.onload = main;

})();
