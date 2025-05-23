/*
 * Copyright (c) 2025, Attila M. Magyar
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

(function () {

"use strict";

var BOWLS = 9,
    LATENCY = 0.03,
    BOWL_FREQ_MAX = 6000.0,
    BOWL_FREQ_MIN = 30.0,
    BOWL_FREQ_RANGE = BOWL_FREQ_MAX - BOWL_FREQ_MIN,
    BOWL_FREQ_RANGE_INV = 1.0 / BOWL_FREQ_RANGE,
    A4_FREQ = 440.0,
    BOWL_HIT_DECAY_MIN = 1.5,
    BOWL_HIT_DECAY_MAX = 60.0,
    BOWL_HIT_DECAY_RANGE = BOWL_HIT_DECAY_MAX - BOWL_HIT_DECAY_MIN,
    BOWL_RESONANCE_TOUCH_LENGTH = 0.33,
    MIN_VELOCITY = 0.1,
    BOWL_TOUCH_LENGTH_TO_HIT_VELOCITY = (1.0 - MIN_VELOCITY) / BOWL_RESONANCE_TOUCH_LENGTH,
    BOWL_FILTER_GAIN_DEFAULT = -21.0,
    DB_MIN = -120.0,
    DB_MAX = 0.0,
    DB_RANGE = DB_MAX - DB_MIN,
    notes = null,
    note_names = null,
    note_order = null,
    tones = null,
    tone_names = null,
    bowls = null,
    bowl_uis = null,
    echo = null,
    reverb = null,
    saturator = null,
    noise_buffer = null,
    noise_source = null,
    noise_amp = null,
    noise_mod_osc = null,
    noise_mod_pw = null,
    noise_mod_detune_osc = null,
    noise_mod_detune_gain = null,
    noise_mod_amp = null,
    noise_mod_shape = null,
    noise_volume = null,
    main_volume = null,
    audio_ctx = null,
    error_dom_node = null,
    bowls_container_dom_node = null,
    tools_dom_node = null,
    envelope_shape_curve = null,
    saturation_curve = null,
    settings_dom_node = null,
    settings = null,
    presets = null,
    preset_names = null,
    preset_selector = null,
    load_preset_button = null,
    gc_interval = null,
    autoplay_queue = null,
    autoplay_start_button = null,
    autoplay_pause_button = null,
    volume_input = null,
    noise_volume_input = null,
    echo_wet_input = null,
    reverb_wet_input = null,
    noise_modulation_input = null;


function main()
{
    error_dom_node = $("error");
    bowls_container_dom_node = $("bowls-container");
    tools_dom_node = $("tools");

    volume_input = $("volume");
    noise_volume_input = $("noise-volume");
    noise_modulation_input = $("noise-modulation");
    echo_wet_input = $("echo");
    reverb_wet_input = $("reverb");

    init_envelope_shape_curve();
    init_saturation_curve();
    init_notes();
    init_presets();

    preset_selector = $("presets");
    populate_select(preset_selector, preset_names);

    $("main-form").onsubmit = stop_event;
    $("start").onclick = handle_start_click;
    $("settings").onclick = handle_settings_click;

    load_preset_button = $("load-preset");
    load_preset_button.onclick = handle_load_preset_click;

    autoplay_start_button = $("autoplay-start");
    autoplay_start_button.onclick = handle_autoplay_start_click;

    autoplay_pause_button = $("autoplay-pause");
    autoplay_pause_button.onclick = handle_autoplay_pause_click;

    clear_errors();

    window.addEventListener("beforeunload", handle_beforeunload);
}


function init_envelope_shape_curve()
{
    var i, x, d;

    envelope_shape_curve = new Float32Array(256);
    d = 1.0 / (1.0 - Math.log(1.001));

    for (i = 0; i < 128; ++i) {
        envelope_shape_curve[i] = 0.0;
    }

    for (i = 0; i < 128; ++i) {
        x = i / 127;
        envelope_shape_curve[i + 128] = Math.pow(x, 3.0);
    }
}


function init_saturation_curve()
{
    var i, x;

    saturation_curve = new Float32Array(2048);

    for (i = 0; i < 2048; ++i) {
        x = (i / 2047) * 2.0 - 1.0;
        saturation_curve[i] = Math.tanh(5.0 * x);
    }
}


function init_presets()
{
    var i, j, l, s;

    presets = {
        "default": {
            "volume": 70.0,
            "noise_volume": 15.0,
            "noise_modulation": 15.0,
            "echo": 15,
            "reverb": 12,
            "bowl_0_freq": notes["G3"],
            "bowl_1_freq": notes["A3"],
            "bowl_2_freq": notes["C4"],
            "bowl_3_freq": notes["D4"],
            "bowl_4_freq": notes["F#4"],
            "bowl_5_freq": notes["B4"],
            "bowl_6_freq": notes["C5"],
            "bowl_7_freq": notes["E5"],
            "bowl_8_freq": notes["G5"],
            "bowl_0_tone": "metal1",
            "bowl_1_tone": "metal1",
            "bowl_2_tone": "metal1",
            "bowl_3_tone": "metal1",
            "bowl_4_tone": "metal1",
            "bowl_5_tone": "metal1",
            "bowl_6_tone": "metal1",
            "bowl_7_tone": "metal1",
            "bowl_8_tone": "metal1"
        }
    };

    preset_names = {
        "default": "default",
        "metal1_low": "metal 1 (low)",
        "metal2": "metal 2",
        "metal2_low": "metal 2 (low)",
        "crystal": "crystal",
        "crystal_low": "crystal (low)",
        "synth": "synth",
        "synth_low": "synth (low)",
        "mixed": "mixed",
        "mixed_low": "mixed (low)",
        "digital": "digital",
        "digital_low": "digital (low)",
        "pixel": "pixel",
        "pixel_low": "pixel (low)"
    };

    s = copy_settings(presets["default"]);
    s["bowl_0_tone"] = "metal1";
    s["bowl_1_tone"] = "synth";
    s["bowl_2_tone"] = "metal1";
    s["bowl_3_tone"] = "metal2";
    s["bowl_4_tone"] = "synth";
    s["bowl_5_tone"] = "metal2";
    s["bowl_6_tone"] = "crystal";
    s["bowl_7_tone"] = "synth";
    s["bowl_8_tone"] = "crystal";
    presets["mixed"] = s;

    s = copy_settings_mod(presets["default"], "metal1", 0.5);
    s["bowl_0_tone"] = "metal1";
    s["bowl_1_tone"] = "synth";
    s["bowl_2_tone"] = "metal1";
    s["bowl_3_tone"] = "metal2";
    s["bowl_4_tone"] = "synth";
    s["bowl_5_tone"] = "metal2";
    s["bowl_6_tone"] = "crystal";
    s["bowl_7_tone"] = "synth";
    s["bowl_8_tone"] = "crystal";
    presets["mixed_low"] = s;

    for (i in preset_names) {
        if (preset_names.hasOwnProperty(i) && !presets.hasOwnProperty(i) && (i.indexOf("_low") < 0)) {
            s = copy_settings(presets["default"]);

            for (j = 0; j < 9; ++j) {
                s["bowl_" + String(j) + "_tone"] = i;
            }

            presets[i] = s;
        }
    }

    for (i in preset_names) {
        if (preset_names.hasOwnProperty(i) && !presets.hasOwnProperty(i) && (i.indexOf("_low") >= 0)) {
            s = copy_settings_mod(presets["default"], i.replace("_low", ""), 0.5);
            presets[i] = s;
        }
    }
}


function init_notes()
{
    var note_letters = "B C C# D D# E F F# G G# A A#".split(" "),
        octave = 0,
        note_name, freq, i, l;

    notes = {};
    note_names = {};
    note_order = [];

    for (i = 0, l = note_letters.length; i < 96; ++i) {
        freq = note_num_to_freq(i);

        if (freq < BOWL_FREQ_MIN) {
            throw "Bug in init_notes(): BOWL_FREQ_MIN and lowest note are contradicting.";
        }

        if (freq > BOWL_FREQ_MAX) {
            break;
        }

        note_name = note_letters[i % l];

        if (note_name === "C") {
            ++octave;
        }

        note_name = note_name + String(octave);
        notes[note_name] = freq;
        note_names[note_name] = note_name;
        note_order.push(note_name);
    }
}


function note_num_to_freq(n)
{
    return Math.pow(2.0, ((n - 46) / 12.0)) * A4_FREQ;
}


function freq_to_note_num(f)
{
    var n;

    if (f < BOWL_FREQ_MIN) {
        return (note_order.length < 1) ? -1 : 0;
    }

    if (f > BOWL_FREQ_MAX) {
        return note_order.length - 1;
    }

    n = Math.log2(f / A4_FREQ) * 12.0 + 46.0;

    return Math.min(note_order.length - 1, Math.max(0, Math.round(n)));
}


function db_to_linear(db)
{
    if (db <= DB_MIN) {
        return 0.0;
    }

    db = Math.min(DB_MAX, db);

    return Math.pow(10.0, db / 20.0);
}


function linear_to_db(lin)
{
    if (lin < 0.000001) {
        return DB_MIN;
    } else if (lin >= 1.0) {
        return DB_MAX;
    }

    return 20.0 * Math.log10(lin);
}


function percent_to_lin_volume(p)
{
    return p * 0.01;
}


function handle_beforeunload(evt)
{
    localStorage.setItem("singing_bowls", JSON.stringify(settings));
}


function restore_settings()
{
    var saved = localStorage.getItem("singing_bowls"),
        e;

    if (!saved) {
        settings = copy_settings(presets["default"]);

        return;
    }

    try {
        settings = copy_valid_settings(JSON.parse(saved));
    } catch (e) {
        settings = copy_settings(presets["default"]);
        console.log(e);
    }
}


function handle_start_click(evt)
{
    var error, outputs, ct, saved_settings;

    if (audio_ctx !== null) {
        return stop_event(evt);
    }

    try {
        audio_ctx = new AudioContext();

        if (AudioParam.prototype.cancelAndHoldAtTime === undefined) {
            patch_audio_param(audio_ctx);
        }

        init_tones(audio_ctx);
        restore_settings();

        main_volume = new GainNode(
            audio_ctx,
            {"channelCount": 2, "gain": percent_to_lin_volume(settings["volume"])}
        );
        main_volume.connect(audio_ctx.destination);

        saturator = new WaveShaperNode(
            audio_ctx,
            {"curve": saturation_curve, "oversample": "none", "channelCount": 2}
        );
        saturator.connect(main_volume);

        init_noise(audio_ctx, settings);
        noise_volume.connect(main_volume);

        init_effects(audio_ctx, saturator);

        outputs = [saturator, echo.input, reverb.input];

        bowls = [
            new Bowl(0, audio_ctx, 220.0, -0.38, outputs, bowls_container_dom_node, "#2b4eff"),
            new Bowl(1, audio_ctx, 220.0,  0.00, outputs, bowls_container_dom_node, "#862bff"),
            new Bowl(2, audio_ctx, 220.0,  0.38, outputs, bowls_container_dom_node, "#2ba3ff"),
            new Bowl(3, audio_ctx, 220.0, -0.27, outputs, bowls_container_dom_node, "#2bffed"),
            new Bowl(4, audio_ctx, 220.0, -0.05, outputs, bowls_container_dom_node, "#ff2ba4"),
            new Bowl(5, audio_ctx, 220.0,  0.27, outputs, bowls_container_dom_node, "#3cff2b"),
            new Bowl(6, audio_ctx, 220.0, -0.16, outputs, bowls_container_dom_node, "#ff2b2b"),
            new Bowl(7, audio_ctx, 220.0,  0.05, outputs, bowls_container_dom_node, "#ff9f2b"),
            new Bowl(8, audio_ctx, 220.0,  0.16, outputs, bowls_container_dom_node, "#dbff2b")
        ];

        ct = audio_ctx.currentTime + 0.1;
        noise_source.start(ct);
        noise_mod_osc.start(ct);
        noise_mod_detune_osc.start(ct);
        noise_volume.gain.setValueAtTime(0.0, ct);

        apply_bowl_settings();

        noise_volume.gain.cancelAndHoldAtTime(ct);
        noise_volume.gain.setValueAtTime(0.0, ct);
        noise_volume.gain.linearRampToValueAtTime(
            percent_to_lin_volume(settings["noise_volume"]),
            ct + 3.0
        );

        gc_interval = setInterval(disconnect_decayed_bowls, 500);

    } catch (error) {
        show_error("Error initializing the sound: " + String(error));
        throw error;
    }

    update_settings_ui();

    volume_input.oninput = handle_settings_change;
    volume_input.onchange = handle_settings_change;

    noise_volume_input.oninput = handle_settings_change;
    noise_volume_input.onchange = handle_settings_change;

    noise_modulation_input.oninput = handle_settings_change;
    noise_modulation_input.onchange = handle_settings_change;

    echo_wet_input.oninput = handle_settings_change;
    echo_wet_input.onchange = handle_settings_change;

    reverb_wet_input.oninput = handle_settings_change;
    reverb_wet_input.onchange = handle_settings_change;

    hide("intro");
    show("bowls");

    return stop_event(evt);
}


function handle_settings_click(evt)
{
    if (String(tools_dom_node.getAttribute("class")).indexOf("settings") !== -1) {
        tools_dom_node.setAttribute("class", "");
        bowls_container_dom_node.setAttribute("class", "");
    } else {
        tools_dom_node.setAttribute("class", "settings");
        bowls_container_dom_node.setAttribute("class", "settings");
    }

    return stop_event(evt);
}


function handle_load_preset_click(evt)
{
    var preset_name = preset_selector.value;

    if (presets.hasOwnProperty(preset_name)) {
        apply_settings(presets[preset_name]);
        update_settings_ui();
    }

    load_preset_button.blur();

    return stop_event(evt);
}


function handle_autoplay_start_click(evt)
{
    hide(autoplay_start_button);
    show(autoplay_pause_button);

    autoplay_queue = [];
    autoplay_iterate();

    return stop_event(evt);
}


function handle_autoplay_pause_click(evt)
{
    var i, l, a;

    hide(autoplay_pause_button);
    show(autoplay_start_button);

    if (autoplay_queue) {
        for (i = 0, l = autoplay_queue.length; i < l; ++i) {
            a = autoplay_queue[i];

            if (a.must_run) {
                a.run();
            }
        }
    }

    autoplay_queue = null;

    return stop_event(evt);
}


function autoplay_iterate()
{
    var action, wait, wait_min, wait_max;

    if (autoplay_queue === null) {
        return;
    }

    if (autoplay_queue.length < 1) {
        autoplay_generate_events();
    }

    action = autoplay_queue.pop();
    wait = action.run();
    wait_min = wait[0];
    wait_max = Math.max(wait_min, wait[1]);

    wait = (wait_max > wait_min) ? normal_random(wait_min, wait_max) : wait_min;

    setTimeout(autoplay_iterate, Math.round(wait * 1000.0));
}


function normal_random(min, max)
{
    var rnd;

    /*
    Random number from an approximately normal distribution. See:
    https://en.wikipedia.org/wiki/Central_limit_theorem
    */
    rnd = (Math.random() + Math.random() + Math.random()) / 3.0;

    return min + rnd * (max - min);
}


function rand_int(min, max, avoid)
{
    var rnd, i;

    min = Math.ceil(min);
    max = Math.floor(max);

    for (i = 0; i < 10; ++i) {
        rnd = Math.floor(Math.random() * (max - min) + min);

        if (rnd !== avoid) {
            return rnd;
        }
    }

    return rnd;
}


function autoplay_generate_events()
{
    var rnd = rand_int(0, 7),
        bowl_idx, velocity, wait, i, extra_hits;

    bowl_idx = rand_int(0, BOWLS);
    velocity = normal_random(0.1, 0.9);

    if (rnd < 3) {
        extra_hits = rnd;
        autoplay_queue.push(
            new AutoplayAction(
                bowl_idx,
                "hit",
                [velocity * normal_random(0.9, 1.1)],
            )
        );
        autoplay_queue.push(
            new AutoplayAction(bowl_idx, "deactivate_ui", [], [0.01, 0.01])
        );
        autoplay_queue.push(
            new AutoplayAction(bowl_idx, "activate_ui", [], [0.2, 0.2])
        );
    } else {
        extra_hits = rnd - 3;
        wait = normal_random(5.0, 15.0);

        autoplay_queue.push(
            new AutoplayAction(bowl_idx, "release_resonance", [])
        );
        autoplay_queue.push(
            new AutoplayAction(bowl_idx, "deactivate_ui", [], [0.01, 0.01])
        );
        autoplay_queue.push(
            new AutoplayAction(bowl_idx, "trigger_resonance", [], [wait, wait])
        );
        autoplay_queue.push(
            new AutoplayAction(bowl_idx, "activate_ui", [], [0.01, 0.01])
        );
    }

    wait = normal_random(0.5, 5.0);

    for (i = 0; i < extra_hits; ++i) {
        bowl_idx = rand_int(0, BOWLS);
        autoplay_queue.push(
            new AutoplayAction(
                bowl_idx,
                "hit",
                [velocity * normal_random(0.9, 1.1)],
                [wait * 0.9, wait * 1.1]
            )
        );
        autoplay_queue.push(
            new AutoplayAction(bowl_idx, "deactivate_ui", [], [0.01, 0.01])
        );
        autoplay_queue.push(
            new AutoplayAction(bowl_idx, "activate_ui", [], [0.2, 0.2])
        );
    }
}


function AutoplayAction(bowl_idx, method_name, params, wait)
{
    this.bowl_idx = bowl_idx;
    this.method_name = method_name;
    this.params = params;
    this.wait = wait;
    this.must_run = (
        method_name === "release_resonance" || method_name === "deactivate_ui"
    );
}


AutoplayAction.prototype.run = function ()
{
    var bowl = bowls[this.bowl_idx],
        wait;

    wait = bowl[this.method_name].apply(bowl, this.params);

    return this.wait || [wait * 0.1, wait * 0.6];
};


function disconnect_decayed_bowls()
{
    var ct = audio_ctx.currentTime,
        i, l, b, d;

    for (i = 0, l = BOWLS; i < l; ++i) {
        b = bowls[i];
        d = b.decays_after;

        if (d !== null && d < ct) {
            b.disconnect();
        }
    }
}


function init_noise(audio_ctx, settings)
{
    var c;

    init_noise_buffer(audio_ctx);

    noise_source = new AudioBufferSourceNode(
        audio_ctx,
        {"buffer": noise_buffer, "channelCount": 2, "loop": true}
    );
    noise_amp = new GainNode(audio_ctx, {"channelCount": 2, "gain": 0.0});
    noise_volume = new GainNode(audio_ctx, {"channelCount": 2, "gain": 0.0});

    noise_mod_osc = new OscillatorNode(
        audio_ctx,
        {"channelCount": 1, "frequency": 0.11}
    );

    c = 2.0 / Math.PI;
    noise_mod_pw = new PeriodicWave(
        audio_ctx,
        {
            "channelCount": 1,
            "disableNormalization": false,
            "imag": new Float32Array(
                [
                    0.0,
                    - (c /  1.0) * (5.0 /  5.0),
                    + (c /  2.0) * (5.0 /  6.0),
                    - (c /  3.0) * (5.0 /  7.0),
                    + (c /  4.0) * (5.0 /  8.0),
                    - (c /  5.0) * (5.0 /  9.0),
                    + (c /  6.0) * (5.0 / 10.0),
                    - (c /  7.0) * (5.0 / 11.0),
                ]
            ),
            "real": new Float32Array(
                [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
            )
        }
    );
    noise_mod_osc.setPeriodicWave(noise_mod_pw);

    noise_mod_amp = new GainNode(
        audio_ctx,
        {"channelCount": 1, "gain": settings["noise_modulation"] * 0.01}
    );

    noise_mod_shape = new WaveShaperNode(
        audio_ctx,
        {
            "curve": new Float32Array([0.0, 1.0]),
            "oversample": "none",
            "channelCount": 1
        }
    );

    noise_mod_detune_osc = new OscillatorNode(
        audio_ctx,
        {"channelCount": 1, "frequency": 0.033, "type": "sine"}
    );
    noise_mod_detune_gain = new GainNode(
        audio_ctx,
        {"channelCount": 1, "gain": 900.0}
    );

    noise_mod_detune_osc.connect(noise_mod_detune_gain);
    noise_mod_detune_gain.connect(noise_mod_osc.detune);

    noise_mod_osc.connect(noise_mod_amp);
    noise_mod_amp.connect(noise_mod_shape);
    noise_mod_shape.connect(noise_amp.gain);

    noise_source.connect(noise_amp);
    noise_amp.connect(noise_volume);
}


function init_noise_buffer(audio_ctx)
{
    /*
    Pseudo-random samples with simple low-pass and high-pass filters. See:
     - https://en.wikipedia.org/wiki/Multiply-with-carry_pseudorandom_number_generator
     - https://en.wikipedia.org/wiki/Low-pass_filter#Discrete-time_realization
     - https://en.wikipedia.org/wiki/High-pass_filter#Discrete-time_realization

    Not using Math.random(), because the ECMAScript specification does not
    define its exact behavior, and we have no control over its seeding, so
    depending on the browser, it may or may not produce samples which are
    repeatable without audible patterns and beating emerging. This particular
    pseudo-RNG and seed value are not perfect either, but they produce a noise
    that is nice enough.

    The two filters are combined using the following notation:

     - High-pass:

           R := sample rate
           S := sampling period length (1/R)
           H := high-pass cut-off frequency
           r[n] := n-th raw sample (random noise)

           v := 2 * pi * S * H
           a := 1 / (v + 1)
           x[n] := a * (x[n - 1] + r[n] - r[n - 1])

     - Low-pass:

           L := low-pass cut-off frequency
           t := 2 * pi * S * L
           w1 := t / (t + 1)
           w2 := 1 - w1
           y[n] := w1 * x[n] + (1 - w2) * y[n - 1]

    */

    var R = audio_ctx.sampleRate,
        S = 1.0 / R,
        H = Math.min(23.0, R * 0.0625),
        L = Math.min(370.0, R * 0.3500),
        PI_2_S = 2.0 * Math.PI * S,
        v = PI_2_S * H,
        t = PI_2_S * L,
        a = 1.0 / (v + 1.0),
        w1 = t / (t + 1.0),
        w2 = 1.0 - w1,
        seed = 7919,
        rng_x = seed,
        rng_c = (((~seed) >> 3) ^ 0x3cf5) & 0xffff,
        rng_scale = 2.0 / 65536.0,
        samples = Math.max(128, (Math.round(1.7 * R) + 1) * 2),
        decay = 11,
        norm = 0.0,
        channel_1, channel_2, common, amp,
        c, r_n_m1, x_n_m1, y_n_m1, r_n, x_n, y_n, abs, i, l;

    function gen_next_sample()
    {
        rng_x = 32718 * rng_x + rng_c;
        rng_c = rng_x >> 16;
        rng_x = rng_x & 0xffff;

        r_n = (rng_x * rng_scale - 1.0) * amp;
        x_n = a * (x_n_m1 + r_n - r_n_m1);
        y_n = w1 * x_n + w2 * y_n_m1;

        r_n_m1 = r_n;
        x_n_m1 = x_n;
        y_n_m1 = y_n;

        return y_n;
    }

    noise_buffer = new AudioBuffer(
        {
            "length": samples,
            "numberOfChannels": 2,
            "sampleRate": audio_ctx.sampleRate
        }
    );

    channel_1 = noise_buffer.getChannelData(0);
    amp = 1.0;
    r_n_m1 = x_n_m1 = y_n_m1 = 0.0;

    for (i = 0, l = Math.floor(samples / 2) + 1 - decay; i < l; ++i) {
        channel_1[i] = gen_next_sample();
        abs = Math.abs(channel_1[i]);

        if (abs > norm) {
            norm = abs;
        }
    }

    for (l += decay; i < l; ++i) {
        channel_1[i] = gen_next_sample();
        abs = Math.abs(channel_1[i]);
        amp *= amp * 0.99;

        if (abs > norm) {
            norm = abs;
        }
    }

    norm = 0.3 / norm;

    for (i = 0; i < l; ++i) {
        channel_1[i] *= norm;
    }

    for (--l; i < samples && l > -1; ++i, --l) {
        channel_1[i] = -channel_1[l];
    }

    channel_2 = noise_buffer.getChannelData(1);

    for (i = 0, l = Math.floor(samples * 0.8) + 1; i < samples; ++i, ++l) {
        channel_2[i] = channel_1[l % samples];
    }
}


function init_tones(audio_ctx)
{
    var partials = 100,
        coefs = 2 * partials + 2,
        plus_or_minus_one, i_pi, two_over_i_pi, softener, lowpass,
        soft_saw_coefs = new Float32Array(coefs),
        lowpassed_saw_coefs = new Float32Array(coefs),
        triangle_coefs = new Float32Array(coefs),
        soft_triangle_coefs = new Float32Array(coefs),
        soft_square_coefs = new Float32Array(coefs),
        lowpassed_square_coefs = new Float32Array(coefs),
        i, j, c;

    /*
    We want to include a sub-harmonic as well, so the fundamental and the
    partials above it need to be set up relative to that, and oscillator
    frequencies have to be divided by 2 to make everything fall into place.
    Also, real-life bowls tend to have frequencies that are not exactly
    multiples of the fundamental, and the higher resolution that is resulting
    from including a sub-harmonic helps with approximating those better.
    */

    /* sub-harmonics */
    lowpassed_saw_coefs[1] = 0.2;
    soft_triangle_coefs[1] = 0.1;
    lowpassed_square_coefs[1] = 0.1;

    for (i = 0; i < partials; ++i) {
        j = 2 * i + 2;
        plus_or_minus_one = (i % 2) === 1 ? -1.0 : 1.0;
        i_pi = (i + 1.0) * Math.PI;
        two_over_i_pi = 2.0 / i_pi;
        softener = 5.0 / (i + 5.0);
        lowpass = Math.pow(1.2, Math.min(0.0, 3.0 - i));

        c = plus_or_minus_one * two_over_i_pi;
        lowpassed_saw_coefs[j] = 0.7 * lowpass * c;
        soft_saw_coefs[j] = 1.0 * softener * c - lowpassed_saw_coefs[j];

        c = 8.0 * Math.sin(i_pi / 2.0) / (i_pi * i_pi);
        soft_triangle_coefs[j] = 0.7 * softener * c;
        triangle_coefs[j] = 1.0 * c - soft_triangle_coefs[j];

        c = (1.0 + plus_or_minus_one) * two_over_i_pi;
        lowpassed_square_coefs[j] = 0.5 * lowpass * c;
        soft_square_coefs[j] = 0.7 * softener * c - lowpassed_square_coefs[j];
    }

    tones = {};

    tones["crystal"] = new Tone(
        "crystal",
        audio_ctx,
        0.007,
        0.005,
        1.0,
        1.0,
        0.0,
        dbs_to_coefs(
            0.7,
            0.5,
            [
                - 39.0,             /* sub-harmonic */
                  -8.8,  -45.7,     /* fundamental */
                 -51.0,  -40.2,     /* second partial */
                 -65.2, -999.0,
                 -61.3,  -48.2,
                -999.0, -999.0,
                -999.0, -999.0,
                 -62.9, -999.0,
                -999.0, -999.0,
                -999.0,  -67.2,
                 -55.8, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                 -60.3,  -66.7,
                -999.0, -999.0,
                 -71.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0,  -74.8,
                -999.0,  -75.1
            ],
            [
                 -44.5,             /* sub-harmonic */
                  -8.4,  -53.0,     /* fundamental */
                 -59.5,  -53.9,     /* second partial */
                -999.0, -999.0,
                -999.0,  -67.2,
                -999.0, -999.0,
                -999.0, -999.0,
                 -63.2, -999.0,
                 -75.8, -999.0,
                -999.0, -999.0,
                 -69.2, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                 -75.5,  -72.6,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0,  -78.0
            ]
        )
    );

    tones["digital"] = new Tone(
        "digital",
        audio_ctx,
        0.009,
        0.006,
        1.0,
        0.5,
        0.5,
        {
            "trans": triangle_coefs,
            "ring": soft_triangle_coefs
        }
    );

    tones["metal1"] = new Tone(
        "metal 1",
        audio_ctx,
        0.005,
        0.003,
        1.0,
        1.0,
        0.0,
        dbs_to_coefs(
            1.0,
            0.7,
            [
                -999.0,             /* sub-harmonic */
                 -25.8,  -54.0,     /* fundamental */
                 -51.1,  -55.0,     /* second partial */
                 -28.0,  -61.0,
                 -52.3,  -57.4,
                 -56.9,  -19.9,
                 -55.0,  -65.7,
                 -61.3,  -55.5,
                 -54.4,  -40.1,
                 -65.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                 -45.1, -999.0,
                -999.0, -999.0,
                -999.0,  -62.0,
                 -61.0, -999.0,
                -999.0,  -53.3,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                 -56.1, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0,  -56.4
            ],
            [
                -999.0,             /* sub-harmonic */
                 -42.1,  -59.4,     /* fundamental */
                 -56.1,  -60.0,     /* second partial */
                 -23.0,  -64.2,
                 -67.9, -999.0,
                 -70.0,  -27.2,
                 -64.9, -999.0,
                -999.0, -999.0,
                -999.0,  -54.8,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                 -65.3
            ]
        )
    );

    tones["metal2"] = new Tone(
        "metal 2",
        audio_ctx,
        0.005,
        0.003,
        1.0,
        1.0,
        0.0,
        dbs_to_coefs(
            1.0,
            0.7,
            [
                 -61.5,             /* sub-harmonic */
                 -25.1,  -51.7,     /* fundamental */
                 -46.3,  -60.8,     /* second partial */
                 -13.5,  -47.6,
                -999.0, -999.0,
                 -12.3, -999.0,
                -999.0, -999.0,
                 -63.9,  -21.2,
                -999.0, -999.0,
                 -64.9, -999.0,
                -999.0,  -43.6,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0,  -63.4,
                -999.0, -999.0,
                -999.0, -999.0,
                 -58.8, -999.0,
                 -56.3, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                -999.0, -999.0,
                 -66.4
            ],
            [
                 -60.5,             /* sub-harmonic */
                 -36.8, -999.0,     /* fundamental */
                 -73.9, -999.0,     /* second partial */
                 -24.8, -999.0,
                -999.0, -999.0,
                 -64.4, -999.0,
                -999.0,  -91.8
            ]
        )
    );

    tones["pixel"] = new Tone(
        "pixel",
        audio_ctx,
        0.009,
        0.006,
        1.0,
        0.5,
        0.5,
        {
            "trans": soft_square_coefs,
            "ring": lowpassed_square_coefs
        }
    );

    tones["synth"] = new Tone(
        "synth",
        audio_ctx,
        0.7,
        3.7,
        0.7,
        0.2,
        1.0,
        {
            "trans": soft_saw_coefs,
            "ring": lowpassed_saw_coefs
        }
    );

    tone_names = {};

    for (i in tones) {
        if (tones.hasOwnProperty(i)) {
            tone_names[i] = tones[i].name;
        }
    }
}


function dbs_to_coefs(trans_norm, ring_norm, trans_db, ring_db)
{
    var trans_lin, /* The first element is the DC-offset. */
        ring_lin,
        i, l;

    trans_lin = db_harmonics_to_normalized_lin_coefs(trans_db, trans_norm);
    ring_lin = db_harmonics_to_normalized_lin_coefs(ring_db, ring_norm);

    for (i = 1, l = Math.min(trans_lin.length, ring_lin.length); i < l; ++i) {
        trans_lin[i] -= ring_lin[i];
    }

    return {
        "trans": trans_lin,
        "ring": ring_lin
    };
}


function db_harmonics_to_normalized_lin_coefs(dbs, normalized_linear)
{
    var coefs = [0.0],      /* The first element is the DC-offset. */
        norm = 0.0,
        i, l, lin;

    for (i = 0, l = dbs.length; i < l; ++i) {
        lin = db_to_linear(dbs[i]);
        norm += lin;

        coefs.push(lin);
    }

    if (norm > 0.000001) {
        norm = normalized_linear / norm;

        for (i = 1, l = coefs.length; i < l; ++i) {
            coefs[i] *= norm;
        }
    }

    return coefs;
}


function Tone(
        name,
        audio_ctx,
        ring_attack,
        transient_attack,
        decay_scale,
        amplitude_modulation,
        transient_detune,
        harmonics
) {
    this.name = name;
    this.ring_attack = ring_attack;
    this.transient_attack = transient_attack;
    this.decay_scale = decay_scale;
    this.amplitude_modulation = amplitude_modulation;
    this.transient_detune = transient_detune;
    this.ring_pw = new PeriodicWave(
        audio_ctx,
        {
            "channelCount": 1,
            "disableNormalization": true,
            "imag": new Float32Array(harmonics["ring"]),
            "real": new Float32Array(harmonics["ring"].length)
        }
    );
    this.transient_pw = new PeriodicWave(
        audio_ctx,
        {
            "channelCount": 1,
            "disableNormalization": true,
            "imag": new Float32Array(harmonics["trans"]),
            "real": new Float32Array(harmonics["trans"].length)
        }
    );
}


function init_effects(audio_ctx, output)
{
    var ct = audio_ctx.currentTime + LATENCY;

    reverb = new Reverb(audio_ctx, [output]);

    reverb.wet.setValueAtTime(0.12, ct);
    reverb.highpass_freq.value = 120.0;
    reverb.damping_freq.value = 2300.0;
    reverb.damping_gain.value = -6.0;
    reverb.room_reflectivity.value = 0.95;
    reverb.width.value = 0.5;

    echo = new Echo(audio_ctx, [output, reverb.input]);

    echo.wet.setValueAtTime(0.15, ct);
    echo.delay.value = 0.7;
    echo.highpass_freq.value = 120.0;
    echo.damping_freq.value = 3300.0;
    echo.damping_gain.value = -3.0;
    echo.feedback.value = 0.56;
    echo.width.value = -0.7;
}


function copy_valid_settings(raw_settings)
{
    var new_settings = {},
        i, l, p;

    copy_valid_setting_num(raw_settings, new_settings, "volume", 0, 100);
    copy_valid_setting_num(raw_settings, new_settings, "noise_volume", 0, 100);
    copy_valid_setting_num(raw_settings, new_settings, "noise_modulation", 0, 100);
    copy_valid_setting_num(raw_settings, new_settings, "echo", 0, 99);
    copy_valid_setting_num(raw_settings, new_settings, "reverb", 0, 70);

    for (i = 0, l = BOWLS; i < l; ++i) {
        p = "bowl_" + String(i);
        copy_valid_setting_num(
            raw_settings,
            new_settings,
            p + "_freq",
            BOWL_FREQ_MIN,
            BOWL_FREQ_MAX
        );
        copy_valid_setting_tone(raw_settings, new_settings, p + "_tone");
    }

    return new_settings;
}


function copy_valid_setting_num(source, target, key, min, max)
{
    var n, e;

    try {
        if (!(source && source.hasOwnProperty(key))) {
            throw "Missing key: " + String(key);
        }

        n = Number(source[key]);

        if (n < min || n > max) {
            throw "Invalid value; key=" + String(key) + ", value=" + String(source[key]);
        }
    } catch (e) {
        n = presets["default"][key];
        console.log(e);
    }

    target[key] = n;
}


function copy_valid_setting_tone(source, target, key)
{
    var t, e;

    try {
        if (!source.hasOwnProperty(key)) {
            throw "Missing key: " + String(key);
        }

        t = String(source[key]);

        if (!tones.hasOwnProperty(t)) {
            throw "Invalid tone; key=" + String(key) + ", tone=" + String(t);
        }
    } catch (e) {
        t = "metal1";
        console.log(e);
    }

    target[key] = t;
}


function update_settings_ui()
{
    volume_input.value = settings["volume"];
    noise_volume_input.value = settings["noise_volume"];
    noise_modulation_input.value = settings["noise_modulation"];
    echo_wet_input.value = settings["echo"];
    reverb_wet_input.value = settings["reverb"];
}


function handle_settings_change(evt)
{
    var new_settings = copy_settings(settings);

    new_settings["volume"] = Number(volume_input.value);
    new_settings["noise_volume"] = Number(noise_volume_input.value);
    new_settings["noise_modulation"] = Number(noise_modulation_input.value);
    new_settings["echo"] = Number(echo_wet_input.value);
    new_settings["reverb"] = Number(reverb_wet_input.value);

    apply_settings(new_settings);

    return true;
}


function copy_settings(settings)
{
    var copy = {},
        i;

    for (i in settings) {
        if (settings.hasOwnProperty(i)) {
            copy[i] = settings[i];
        }
    }

    return copy;
}


function copy_settings_mod(settings, tone, freq_scale)
{
    var copy = copy_settings(settings),
        i;

    for (i = 0; i < BOWLS; ++i) {
        copy["bowl_" + String(i) + "_tone"] = tone;
        copy["bowl_" + String(i) + "_freq"] *= freq_scale;
    }

    return copy;
}


function apply_settings(new_settings)
{
    var old_settings = settings,
        begin, end;

    settings = copy_valid_settings(new_settings);

    begin = audio_ctx.currentTime + LATENCY;
    end = begin + 0.05;

    apply_volume(old_settings, "volume", main_volume.gain, begin, end);
    apply_volume(old_settings, "noise_volume", noise_volume.gain, begin, end);
    apply_volume(old_settings, "noise_modulation", noise_mod_amp.gain, begin, end);
    apply_volume(old_settings, "echo", echo.wet, begin, end);
    apply_volume(old_settings, "reverb", reverb.wet, begin, end);

    apply_bowl_settings();
}


function apply_volume(old_settings, key, audio_param, begin, end)
{
    var old_value = percent_to_lin_volume(old_settings[key]),
        new_value = percent_to_lin_volume(settings[key]);

    audio_param.cancelAndHoldAtTime(begin);
    audio_param.setValueAtTime(old_value, begin);
    audio_param.linearRampToValueAtTime(new_value, end);
}


function apply_bowl_settings()
{
    var i, l, p;

    for (i = 0, l = BOWLS; i < l; ++i) {
        p = "bowl_" + String(i);
        bowls[i].set_frequency(settings[p + "_freq"]);
        bowls[i].set_tone(settings[p + "_tone"]);
    }
}


function Bowl(index, audio_ctx, frequency, panning, outputs, ui_container, color)
{
    this.index = index;
    this.prefix = "bowl_" + String(index);
    this.name = "Bowl " + String(index + 1);
    this.outputs = outputs;
    this.audio_ctx = audio_ctx;
    this.is_initialized = false;
    this.modulation_frequency = 1.0;
    this.ring_hit_decay = 1.0;
    this.transient_hit_decay = 1.0;
    this.pitch = 1.0;
    this.touch_start_time = null;
    this.resonance_timer = null;
    this.is_resonating = false;
    this.is_connected = false;
    this.decays_after = null;
    this.sustains_after = null;
    this.volume = 0.2;
    this.tone = null;
    this.tone_name = null;
    this.bowl_button = null;
    this.bowl_ui = null;
    this.pitch_selector = null;
    this.tone_selector = null;

    this.create_audio_nodes(panning);
    this.create_ui(name, ui_container, color);
    this.set_tone("metal1");
    this.set_frequency(frequency);
}

Bowl.prototype.connect = function ()
{
    if (this.is_connected) {
        return;
    }

    this.is_connected = true;

    this.create_oscillators(this.audio_ctx.currentTime + 0.009);
};

Bowl.prototype.disconnect = function ()
{
    var ct;

    if (this.is_connected) {
        this.is_connected = false;
        this.is_resonating = false;
        this.decays_after = null;
        this.sustains_after = null;

        ct = this.audio_ctx.currentTime;

        this.ring_osc.stop(ct);
        this.transient_osc.stop(ct);
        this.amp_mod_osc.stop(ct);

        this.ring_osc.disconnect();
        this.transient_osc.disconnect();
        this.amp_mod_osc.disconnect();

        this.ring_osc = null;
        this.transient_osc = null;
        this.amp_mod_osc = null;
    }
};

Bowl.prototype.create_audio_nodes = function (panning)
{
    /*
    We want to include a sub-harmonic as well, so the fundamental and the
    partials above it need to be set up relative to that, and oscillator
    frequencies have to be divided by 2 to make everything fall into place,
    hence the dummy zero after each partial in the PeriodicWave.
    */

    var audio_ctx = this.audio_ctx,
        ring_gain = new GainNode(audio_ctx, {"channelCount": 1, "gain": 0.0}),
        transient_gain = new GainNode(audio_ctx, {"channelCount": 1, "gain": 0.0}),
        amp_mod_amp = new GainNode(audio_ctx, {"channelCount": 1, "gain": 0.0}),
        amp_mod_shape = new WaveShaperNode(
            audio_ctx,
            {
                "curve": new Float32Array([1.0, 0.7]),
                "oversample": "none",
                "channelCount": 1
            }
        ),
        amp_mod_gain = new GainNode(audio_ctx, {"channelCount": 1, "gain": 0.0}),
        envelope_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        envelope_shape = new WaveShaperNode(
            audio_ctx,
            {
                "curve": envelope_shape_curve,
                "oversample": "none",
                "channelCount": 1
            }
        ),
        envelope_gain = new GainNode(audio_ctx, {"channelCount": 1, "gain": 0.0}),
        freq_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        filter = new BiquadFilterNode(
            audio_ctx,
            {
                "channelCount": 1,
                "type": "highshelf",
                "Q": 0.0,
                "frequency": 2000.0,
                "gain": BOWL_FILTER_GAIN_DEFAULT
            }
        ),
        panner = new StereoPannerNode(audio_ctx, {"channelCount": 2}),
        ct = audio_ctx.currentTime,
        outputs, i, l;

    freq_cns.start(ct);
    envelope_cns.start(ct);

    panner.pan.setValueAtTime(panning, ct);

    ring_gain.connect(filter);
    transient_gain.connect(filter);
    filter.connect(amp_mod_gain);
    amp_mod_amp.connect(amp_mod_shape);
    amp_mod_shape.connect(amp_mod_gain.gain);
    amp_mod_gain.connect(envelope_gain);
    envelope_cns.connect(envelope_shape);
    envelope_shape.connect(envelope_gain.gain);
    envelope_gain.connect(panner);

    ring_gain.gain.setValueAtTime(0.0, ct);
    transient_gain.gain.setValueAtTime(0.0, ct);
    envelope_cns.offset.setValueAtTime(0.0, ct);
    envelope_gain.gain.setValueAtTime(0.0, ct);
    freq_cns.offset.setValueAtTime(2000.0, ct);
    filter.gain.setValueAtTime(0.0, ct);
    amp_mod_amp.gain.setValueAtTime(0.0, ct);

    this.ring_gain = ring_gain;
    this.transient_gain = transient_gain;
    this.frequency_cns = freq_cns;
    this.filter = filter;
    this.amp_mod_amp = amp_mod_amp;
    this.amp_mod_shape = amp_mod_shape;
    this.amp_mod_gain = amp_mod_gain;
    this.envelope_cns = envelope_cns;
    this.envelope_shape = envelope_shape;
    this.envelope_gain = envelope_gain;
    this.panner = panner;

    outputs = this.outputs;

    for (i = 0, l = outputs.length; i < l; ++i) {
        panner.connect(outputs[i]);
    }
};

Bowl.prototype.create_oscillators = function (start)
{
    var audio_ctx = this.audio_ctx,
        tone = this.tone,
        freq_cns = this.frequency_cns,
        ring_osc = new OscillatorNode(
            audio_ctx,
            {"channelCount": 1, "frequency": 0.0}
        ),
        transient_osc = new OscillatorNode(
            audio_ctx,
            {"channelCount": 1, "frequency": 0.0}
        ),
        amp_mod_osc = new OscillatorNode(
            audio_ctx,
            {
                "channelCount": 1,
                "frequency": this.modulation_frequency,
                "type": "sine"
            }
        );

    ring_osc.setPeriodicWave(tone.ring_pw);
    ring_osc.detune.setValueAtTime(0.0, 0.0);

    transient_osc.setPeriodicWave(tone.transient_pw);
    transient_osc.detune.setValueAtTime(0.0, 0.0);

    freq_cns.connect(ring_osc.frequency);
    freq_cns.connect(transient_osc.frequency);

    ring_osc.start(start);
    transient_osc.start(start);
    amp_mod_osc.start(start);

    ring_osc.connect(this.ring_gain);
    transient_osc.connect(this.transient_gain);
    amp_mod_osc.connect(this.amp_mod_amp);

    this.ring_osc = ring_osc;
    this.transient_osc = transient_osc;
    this.amp_mod_osc = amp_mod_osc;
};

Bowl.prototype.set_tone = function (tone_name)
{
    this.tone_selector.value = tone_name;
    this.apply_tone(tone_name);
};

Bowl.prototype.apply_tone = function (tone_name)
{
    if (tone_name === this.tone_name) {
        return;
    }

    this.tone = tones[tone_name];
    this.tone_name = tone_name;

    if (this.is_connected) {
        this.disconnect();
        this.connect();
    }
};

Bowl.prototype.set_frequency = function (freq)
{
    this.pitch_selector.value = note_order[freq_to_note_num(freq)];
    this.apply_frequency(freq);
};

Bowl.prototype.apply_frequency = function (freq)
{
    var f = Math.min(BOWL_FREQ_MAX, Math.max(BOWL_FREQ_MIN, freq)),
        fh = f * 0.5,
        ct, fo, r, ri, d, n;

    if (this.is_initialized && Math.abs(this.pitch - fh) < 0.001) {
        return;
    }

    this.is_initialized = true;

    ct = this.audio_ctx.currentTime;
    fo = this.frequency_cns.offset;
    r = (f - BOWL_FREQ_MIN) * BOWL_FREQ_RANGE_INV;
    ri = 1.0 - r;
    d = BOWL_HIT_DECAY_MIN + ri * BOWL_HIT_DECAY_RANGE;

    fo.setValueAtTime(fh, ct);

    this.pitch = fh;
    this.ring_hit_decay = d;
    this.transient_hit_decay = d * 0.3;
    this.modulation_frequency = Math.max(0.2, Math.min(5.0, freq * 0.003));
    this.volume = 0.2 * ri * ri + 0.05;

    this.filter.frequency.value = Math.min(f * 3.0, 12000.0);

    if (this.is_connected) {
        this.amp_mod_osc.frequency.value = this.modulation_frequency;
    }
};

Bowl.prototype.create_ui = function (name, ui_container, color)
{
    var div, button, svg, title, g, path, pitch_selector, tone_selector,
        handle_pitch_change,
        handle_tone_change,
        handle_touch_start,
        handle_touch_end;

    div = document.createElement("div");
    div.setAttribute("class", "bowl");

    button = document.createElement("button");

    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 200 200");
    svg.setAttribute("stroke", color);
    svg.setAttribute("stroke-width", "15");
    svg.setAttribute("fill", "none");

    g = document.createElementNS("http://www.w3.org/2000/svg", "g");

    title = document.createElementNS("http://www.w3.org/2000/svg", "title");
    title.innerText = name;

    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
        "d",
        "M 10, 60  A 37 30 90 0 0 190, 60  M 10, 60  A 30 10 0 0 0 190, 60  M 10, 60  A 30 10 0 0 1 190, 60"
    );
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    handle_pitch_change = bind(this, this.handle_pitch_change);
    pitch_selector = document.createElement("select");
    pitch_selector.setAttribute("class", "pitch");
    pitch_selector.setAttribute("title", "Pitch");
    pitch_selector.onchange = handle_pitch_change;
    pitch_selector.oninput = handle_pitch_change;
    populate_select(pitch_selector, note_names);

    handle_tone_change = bind(this, this.handle_tone_change);
    tone_selector = document.createElement("select");
    tone_selector.setAttribute("class", "tone");
    tone_selector.setAttribute("title", "Tone");
    tone_selector.onchange = handle_tone_change;
    tone_selector.oninput = handle_tone_change;
    populate_select(tone_selector, tone_names);

    g.appendChild(title);
    g.appendChild(path);
    svg.appendChild(g);
    button.appendChild(svg);
    div.appendChild(button);
    div.appendChild(pitch_selector);
    div.appendChild(tone_selector);
    ui_container.appendChild(div);

    handle_touch_start = bind(this, this.handle_touch_start);
    handle_touch_end = bind(this, this.handle_touch_end);

    button.onmousedown = handle_touch_start;
    button.onmouseup = handle_touch_end;

    button.ontouchstart = handle_touch_start;
    button.ontouchend = handle_touch_end;
    button.ontouchcancel = handle_touch_end;

    this.bowl_ui = div;
    this.bowl_button = button;
    this.pitch_selector = pitch_selector;
    this.tone_selector = tone_selector;
};

Bowl.prototype.handle_pitch_change = function (evt)
{
    var note = this.pitch_selector.value,
        freq;

    if (notes.hasOwnProperty(note)) {
        freq = notes[note];
        settings[this.prefix + "_freq"] = freq;
        this.apply_frequency(freq);

    }

    return true;
};

Bowl.prototype.handle_tone_change = function (evt)
{
    var tone = this.tone_selector.value;

    if (tones.hasOwnProperty(tone)) {
        settings[this.prefix + "_tone"] = tone;
        this.apply_tone(tone);
    }

    return true;
};

Bowl.prototype.handle_touch_start = function (evt)
{
    this.touch_start();

    return stop_event(evt);
};

Bowl.prototype.handle_touch_end = function (evt)
{
    this.touch_end();

    return stop_event(evt);
};

Bowl.prototype.activate_ui = function ()
{
    this.bowl_button.setAttribute("class", "active");
};

Bowl.prototype.deactivate_ui = function ()
{
    this.bowl_button.setAttribute("class", "");
};

Bowl.prototype.touch_start = function ()
{
    if (this.touch_start_time !== null) {
        return;
    }

    this.activate_ui();

    this.connect();

    this.touch_start_time = this.audio_ctx.currentTime;
    this.resonance_timer = setTimeout(
        bind(this, this.trigger_resonance),
        (BOWL_RESONANCE_TOUCH_LENGTH + 0.05) * 1000.0
    );
};

Bowl.prototype.touch_end = function ()
{
    var rt = this.resonance_timer,
        tst, ct, velocity;

    if (this.is_resonating) {
        this.release_resonance();
    } else {
        tst = this.touch_start_time;

        if (tst === null) {
            return;
        }

        this.touch_start_time = null;

        ct = this.audio_ctx.currentTime;

        this.hit(
            1.0 - BOWL_TOUCH_LENGTH_TO_HIT_VELOCITY * Math.min(
                BOWL_RESONANCE_TOUCH_LENGTH, Math.max(0.001, ct - tst)
            ),
            ct + LATENCY
        );
    }

    if (rt !== null) {
        clearTimeout(rt);
        this.resonance_timer = null;
    }

    this.deactivate_ui();
};

Bowl.prototype.random_detune = function ()
{
    return Math.random() * 7.3 - 2.8;
};

Bowl.prototype.trigger_resonance = function ()
{
    var detune = this.random_detune(),
        da, start, needs_reset, rg, tg, eo, fo, fg, aa, rd;

    this.connect();

    da = this.decays_after;

    this.decays_after = null;
    this.touch_start_time = null;
    this.resonance_timer = null;
    this.is_resonating = true;

    rg = this.ring_gain.gain;
    tg = this.transient_gain.gain;
    eo = this.envelope_cns.offset;
    fo = this.frequency_cns.offset;
    fg = this.filter.gain;
    aa = this.amp_mod_amp.gain;

    rd = Math.min(this.ring_hit_decay * 0.07, 3.0);
    start = this.audio_ctx.currentTime + LATENCY;

    rg.cancelAndHoldAtTime(start);
    tg.cancelAndHoldAtTime(start);
    eo.cancelAndHoldAtTime(start);
    fo.cancelAndHoldAtTime(start);
    fg.cancelAndHoldAtTime(start);
    aa.cancelAndHoldAtTime(start);

    fo.linearRampToValueAtTime(this.pitch, start + 0.15);

    if (da === null || da < start) {
        rg.setValueAtTime(0.0, start);
        tg.setValueAtTime(0.0, start);
        eo.setValueAtTime(0.0, start);
    }

    start += rd;

    rg.linearRampToValueAtTime(this.volume, start);
    tg.linearRampToValueAtTime(0.0, start);
    eo.linearRampToValueAtTime(1.0, start);
    fg.linearRampToValueAtTime(BOWL_FILTER_GAIN_DEFAULT, start);
    aa.linearRampToValueAtTime(this.tone.amplitude_modulation, start);

    this.sustains_after = start;

    start += rd * 15.0;

    this.ring_osc.detune.linearRampToValueAtTime(detune, start);
    this.transient_osc.detune.linearRampToValueAtTime(detune, start);

    return rd;
};

Bowl.prototype.release_resonance = function ()
{
    var ct, rd, rg, tg, eo, fo, fg, aa, sa, tone;

    this.is_resonating = false;
    this.touch_start_time = null;

    tone = this.tone;

    rd = this.ring_hit_decay * 0.7 * tone.decay_scale;
    sa = this.sustains_after;

    rg = this.ring_gain.gain;
    tg = this.transient_gain.gain;
    eo = this.envelope_cns.offset;
    fo = this.frequency_cns.offset;
    fg = this.filter.gain;
    aa = this.amp_mod_amp.gain;

    ct = this.audio_ctx.currentTime + LATENCY;

    rg.cancelAndHoldAtTime(ct);
    tg.cancelAndHoldAtTime(ct);
    eo.cancelAndHoldAtTime(ct);
    fo.cancelAndHoldAtTime(ct);
    fg.cancelAndHoldAtTime(ct);
    aa.cancelAndHoldAtTime(ct);

    fo.linearRampToValueAtTime(this.pitch, ct + 0.15);

    if (sa !== null && sa < ct) {
        rg.setValueAtTime(this.volume, ct);
        tg.setValueAtTime(0.0, ct);
        eo.setValueAtTime(1.0, ct);
        fg.setValueAtTime(BOWL_FILTER_GAIN_DEFAULT, ct);
        aa.setValueAtTime(tone.amplitude_modulation, ct);

        this.sustains_after = null;
    }

    ct += rd;

    rg.linearRampToValueAtTime(0.0, ct);
    tg.linearRampToValueAtTime(0.0, ct);
    eo.linearRampToValueAtTime(0.0, ct);
    fg.linearRampToValueAtTime(BOWL_FILTER_GAIN_DEFAULT, ct);
    aa.linearRampToValueAtTime(0.0, ct);

    this.decays_after = ct + 0.1;

    return rd;
};

Bowl.prototype.hit = function (velocity, start)
{
    var rg = this.ring_gain.gain,
        tg = this.transient_gain.gain,
        eo = this.envelope_cns.offset,
        fo = this.frequency_cns.offset,
        fg = this.filter.gain,
        tone = this.tone,
        td = tone.transient_detune,
        detune = this.random_detune(),
        iv = 1.0 - velocity,
        sriv = tone.ring_attack * iv,
        stiv = tone.transient_attack * iv,
        rd = this.ring_hit_decay * velocity * tone.decay_scale,
        p = this.pitch,
        srivrd;

    this.connect();
    this.is_resonating = false;

    start = this.cancel(start || this.audio_ctx.currentTime + LATENCY);

    sriv += start;
    stiv += start;
    srivrd = sriv + rd;

    fo.setValueAtTime(p * 0.5, start);

    rg.linearRampToValueAtTime(this.volume * velocity, sriv);
    tg.linearRampToValueAtTime(this.volume * velocity * velocity, stiv);
    eo.linearRampToValueAtTime(1.0, sriv);
    fo.linearRampToValueAtTime(p, start + 0.005);
    fg.linearRampToValueAtTime(0.0, sriv);

    this.amp_mod_amp.gain.linearRampToValueAtTime(
        0.35 * velocity * tone.amplitude_modulation,
        sriv + 1.5
    );

    this.ring_osc.detune.linearRampToValueAtTime(detune, srivrd);
    this.transient_osc.detune.linearRampToValueAtTime(
        (1.0 - td) * detune + td * this.random_detune(),
        srivrd
    );

    rg.linearRampToValueAtTime(0.0, srivrd);
    tg.linearRampToValueAtTime(0.0, stiv + this.transient_hit_decay * velocity);
    eo.linearRampToValueAtTime(0.0, srivrd);
    fg.linearRampToValueAtTime(BOWL_FILTER_GAIN_DEFAULT, sriv + rd * 0.12);

    this.decays_after = srivrd + 0.1;

    return rd;
};

Bowl.prototype.cancel = function (when)
{
    var rd = this.ring_osc.detune,
        rg = this.ring_gain.gain,
        td = this.transient_osc.detune,
        tg = this.transient_gain.gain,
        eo = this.envelope_cns.offset,
        fo = this.frequency_cns.offset,
        fg = this.filter.gain,
        aa = this.amp_mod_amp.gain,
        p = this.pitch;

    rd.cancelAndHoldAtTime(when);
    rg.cancelAndHoldAtTime(when);
    td.cancelAndHoldAtTime(when);
    tg.cancelAndHoldAtTime(when);
    eo.cancelAndHoldAtTime(when);
    fo.cancelAndHoldAtTime(when);
    fg.cancelAndHoldAtTime(when);
    aa.cancelAndHoldAtTime(when);

    when += 0.05;

    rd.linearRampToValueAtTime(0.0, when);
    rg.linearRampToValueAtTime(0.0, when);
    td.linearRampToValueAtTime(0.0, when);
    tg.linearRampToValueAtTime(0.0, when);
    eo.linearRampToValueAtTime(0.0, when);
    fo.linearRampToValueAtTime(p, when);
    fg.linearRampToValueAtTime(BOWL_FILTER_GAIN_DEFAULT, when);
    aa.linearRampToValueAtTime(0.0, when);

    return when;
};


function Reverb(audio_ctx, outputs)
{
    /*
    Based on Freeverb: https://ccrma.stanford.edu/~jos/pasp/Freeverb.html

    Changes:
     * The allpass filters are omitted, and only half of the comb filters are
       used for each channel in order to reduce CPU usage.
     * A high-shelf filter is used instead of a low-pass in order to have
       more control over damping.
    */

    var comb_tunings = [1557.0, 1617.0, 1491.0, 1422.0, 1277.0, 1356.0, 1188.0, 1116.0],
        damping_freq_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        damping_gain_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        feedback_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        width_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        highpass = new BiquadFilterNode(
            audio_ctx,
            {
                "type": "highpass",
                "frequency": 100.0,
                "Q": 1.0,
                "gain": 0.0
            }
        ),
        splitter = new ChannelSplitterNode(audio_ctx, {"numberOfOutputs": 2}),
        merger = new ChannelMergerNode(audio_ctx, {"numberOfInputs": 2}),
        wet_gain = new GainNode(audio_ctx, {"gain": 0.0}),
        out_left = new GainNode(audio_ctx, {"gain": 1.0, "channelCount": 1}),
        out_right = new GainNode(audio_ctx, {"gain": 1.0, "channelCount": 1}),
        wet1_left = new GainNode(audio_ctx, {"gain": 0.5, "channelCount": 1}),
        wet2_left = new GainNode(audio_ctx, {"gain": 0.5, "channelCount": 1}),
        wet1_right = new GainNode(audio_ctx, {"gain": 0.5, "channelCount": 1}),
        wet2_right = new GainNode(audio_ctx, {"gain": 0.5, "channelCount": 1}),
        inv_left = new GainNode(audio_ctx, {"gain": -1.0, "channelCount": 1}),
        inv_right = new GainNode(audio_ctx, {"gain": -1.0, "channelCount": 1}),
        combs_left = [],
        combs_right = [],
        ct = audio_ctx.currentTime,
        filter_left, filter_right,
        i, l, t;

    wet_gain.gain.value = 0.0;
    out_left.gain.value = 1.0;
    out_right.gain.value = 1.0;

    width_cns.offset.value = 0.5;
    damping_freq_cns.offset.value = 6000;
    damping_gain_cns.offset.value = -6.0;
    feedback_cns.offset.value = 0.8;

    damping_freq_cns.start(ct);
    damping_gain_cns.start(ct);
    feedback_cns.start(ct);
    width_cns.start(ct);

    highpass.frequency.value = 100.0;
    highpass.connect(splitter);

    for (i = 0, l = comb_tunings.length; i < l; ++i) {
        t = comb_tunings[i] / 44100.0;

        if (0 < (i & 2)) {
            filter_left = new LowpassCombFilter(audio_ctx, t, damping_freq_cns, damping_gain_cns, feedback_cns);
            splitter.connect(filter_left.input, 0);
            filter_left.output.connect(out_left);
            combs_left.push(filter_left);
        } else {
            filter_right = new LowpassCombFilter(audio_ctx, t, damping_freq_cns, damping_gain_cns, feedback_cns);
            splitter.connect(filter_right.input, 1);
            filter_right.output.connect(out_right);
            combs_right.push(filter_right);
        }
    }

    /*
    The original Freeverb code calculates the output samples like this:

        *outputL += outL*wet1 + outR*wet2 + *inputL*dry;
        *outputR += outR*wet1 + outL*wet2 + *inputR*dry;

    wet1 and wet2 are derived from the width parameter (0 <= width <= 1):

        wet1 = wet*(width/2 + 0.5f);
        wet2 = wet*((1-width)/2);

    If we scale the width parameter so that 0 <= width <= 0.5, then

        wet1 = wet*(0.5f + width);
        wet2 = wet*(0.5f - width);
    */

    inv_left.gain.value = -1.0;
    wet1_left.gain.value = 0.5;
    wet2_left.gain.value = 0.5;
    width_cns.connect(wet1_left.gain);
    width_cns.connect(inv_left);
    inv_left.connect(wet2_left.gain);

    inv_right.gain.value = -1.0;
    wet1_right.gain.value = 0.5;
    wet2_right.gain.value = 0.5;
    width_cns.connect(wet1_right.gain);
    width_cns.connect(inv_right);
    inv_right.connect(wet2_right.gain);

    out_left.connect(wet1_left);
    out_right.connect(wet2_left);

    out_right.connect(wet1_right);
    out_left.connect(wet2_right);

    wet1_left.connect(merger, 0, 0);
    wet2_left.connect(merger, 0, 0);
    wet1_right.connect(merger, 0, 1);
    wet2_right.connect(merger, 0, 1);

    merger.connect(wet_gain);

    for (i = 0, l = outputs.length; i < l; ++i) {
        wet_gain.connect(outputs[i]);
    }

    this._combs_left = combs_left;
    this._combs_right = combs_right;

    this._damping_freq_cns = damping_freq_cns;
    this._damping_gain_cns = damping_gain_cns;
    this._feedback_cns = feedback_cns;
    this._width_cns = width_cns;
    this._highpass = highpass;
    this._splitter = splitter;
    this._merger = merger;
    this._wet_gain = wet_gain;
    this._out_left = out_left;
    this._out_right = out_right;
    this._wet1_left = wet1_left;
    this._wet2_left = wet2_left;
    this._wet1_right = wet1_right;
    this._wet2_right = wet2_right;
    this._inv_left = inv_left;
    this._inv_right = inv_right;

    this.input = highpass;
    this.output = wet_gain;
    this.wet = wet_gain.gain;
    this.highpass_freq = highpass.frequency;
    this.damping_freq = damping_freq_cns.offset;
    this.damping_gain = damping_gain_cns.offset;
    this.room_reflectivity = feedback_cns.offset;
    this.width = width_cns.offset;
}

function LowpassCombFilter(audio_ctx, delay_t, damping_freq_cns, damping_gain_cns, feedback_cns)
{
    var delay = new DelayNode(audio_ctx, {"maxDelayTime": 1.0, "channelCount": 1}),
        gain = new GainNode(audio_ctx, {"gain": 0.0, "channelCount": 1}),
        highshelf = new BiquadFilterNode(
            audio_ctx,
            {
                "type": "highshelf",
                "Q": 1.0,
                "frequency": 0.0,
                "gain": 0.0,
                "channelCount": 1
            }
        );

    damping_freq_cns.connect(highshelf.frequency);
    damping_gain_cns.connect(highshelf.gain);
    feedback_cns.connect(gain.gain);

    delay.delayTime.value = delay_t;

    delay.connect(highshelf);
    highshelf.connect(gain);
    gain.connect(delay);

    this._highshelf = highshelf;
    this._gain = gain;

    this.input = this.output = delay;
}

function Echo(audio_ctx, outputs)
{
    var wet_gain = new GainNode(audio_ctx, {"gain": 0.0}),
        delay_1 = new DelayNode(audio_ctx, {"maxDelayTime": 4.0}),
        delay_2 = new DelayNode(audio_ctx, {"maxDelayTime": 4.0}),
        pan_1 = new StereoPannerNode(audio_ctx),
        pan_2 = new StereoPannerNode(audio_ctx),
        gain_1 = new GainNode(audio_ctx, {"gain": 0.0}),
        gain_2 = new GainNode(audio_ctx, {"gain": 0.0}),
        delay_time_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        feedback_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        width_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        width_inv = new GainNode(audio_ctx, {"gain": -1.0}),
        damping_freq_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        damping_gain_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
        highpass = new BiquadFilterNode(
            audio_ctx,
            {
                "type": "highpass",
                "Q": 1.0,
                "frequency": 100.0,
                "gain": 0.0
            }
        ),
        highshelf_1 = new BiquadFilterNode(
            audio_ctx,
            {
                "type": "highshelf",
                "Q": 1.0,
                "frequency": 0.0,
                "gain": 0.0,
                "channelCount": 1
            }
        ),
        highshelf_2 = new BiquadFilterNode(
            audio_ctx,
            {
                "type": "highshelf",
                "Q": 1.0,
                "frequency": 0.0,
                "gain": 0.0,
                "channelCount": 1
            }
        ),
        ct = audio_ctx.currentTime,
        i, l;

    wet_gain.gain.value = 0.0;
    delay_time_cns.offset.value = 0.5;
    width_cns.offset.value = 1.0;
    feedback_cns.offset.value = 0.7;

    feedback_cns.start(ct);
    delay_time_cns.start(ct);
    width_cns.start(ct);
    damping_freq_cns.start(ct);
    damping_gain_cns.start(ct);

    delay_time_cns.connect(delay_1.delayTime);
    delay_time_cns.connect(delay_2.delayTime);
    damping_freq_cns.connect(highshelf_1.frequency);
    damping_freq_cns.connect(highshelf_2.frequency);
    damping_gain_cns.connect(highshelf_1.gain);
    damping_gain_cns.connect(highshelf_2.gain);
    feedback_cns.connect(gain_1.gain);
    feedback_cns.connect(gain_2.gain);
    width_cns.connect(pan_1.pan);
    width_cns.connect(width_inv);
    width_inv.connect(pan_2.pan);

    highpass.frequency.value = 100;

    highpass.connect(delay_1);

    delay_1.connect(gain_1);
    gain_1.connect(highshelf_1);
    highshelf_1.connect(pan_1);
    highshelf_1.connect(delay_2);

    delay_2.connect(gain_2);
    gain_2.connect(highshelf_2);
    highshelf_2.connect(pan_2);
    highshelf_2.connect(delay_1);

    pan_1.connect(wet_gain);
    pan_2.connect(wet_gain);

    for (i = 0, l = outputs.length; i < l; ++i) {
        wet_gain.connect(outputs[i]);
    }

    this._highpass = highpass;
    this._delay_1 = delay_1;
    this._delay_2 = delay_2;
    this._pan_1 = pan_1;
    this._pan_2 = pan_2;
    this._gain_1 = gain_1;
    this._gain_2 = gain_2;
    this._delay_time_cns = delay_time_cns;
    this._feedback_cns = feedback_cns;
    this._width_cns = width_cns;
    this._width_inv = width_inv;
    this._damping_freq_cns = damping_freq_cns;
    this._damping_gain_cns = damping_gain_cns;
    this._highshelf_1 = highshelf_1;
    this._highshelf_2 = highshelf_2;

    this.input = highpass;
    this.output = wet_gain;
    this.delay = delay_time_cns.offset;
    this.wet = wet_gain.gain;
    this.highpass_freq = highpass.frequency;
    this.damping_freq = damping_freq_cns.offset;
    this.damping_gain = damping_gain_cns.offset;
    this.feedback = feedback_cns.offset;
    this.width = width_cns.offset;
}


function populate_select(select, options)
{
    var option, i, l, v;

    if (Array.isArray(options)) {
        for (i = 0, l = options.length; i < l; ++i) {
            v = options[i];
            option = document.createElement("option");
            option.value = v;
            option.innerText = v;
            select.appendChild(option);
        }
    } else {
        for (i in options) {
            if (!options.hasOwnProperty(i)) {
                continue;
            }

            option = document.createElement("option");
            option.value = i;
            option.innerText = options[i];
            select.appendChild(option);
        }
    }
}


function change_selection(select, selected)
{
    select.value = selected;
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


function show_error(error_msg)
{
    error_dom_node.innerHTML += "<p>" + error_msg + "</p>";
    show(error_dom_node);
}


function quote_html(text)
{
    return text.replace(/&/g, "&amp;")
        .replace(/>/g, "&gt;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function clear_errors()
{
    error_dom_node.innerHTML = "";
    hide(error_dom_node);
}


function patch_audio_param(audio_ctx)
{
    /**
     * NOTE: this is not a generic polyfill for cancelAndHoldAtTime(), since
     *       it only supports linear ramping, and it's heavily based on
     *       assumptions that are specific to this app.
     */

    AudioParam.prototype._linearRampToValueAtTime = AudioParam.prototype.linearRampToValueAtTime;
    AudioParam.prototype._setValueAtTime = AudioParam.prototype.setValueAtTime;

    AudioParam.prototype._save_evt = function (evt_type, value, end)
    {
        var new_evts = [],
            ct = audio_ctx.currentTime,
            old_evts, i, l, e;

        if (old_evts = this._events) {
            l = null;

            for (i = old_evts.length - 1; i > -1; --i) {
                new_evts.unshift(e = old_evts[i]);

                if (e[2] < ct) {
                    break;
                }
            }
        }

        new_evts.push([evt_type, value, end, ct]);

        this._events = new_evts;
    };

    AudioParam.prototype.linearRampToValueAtTime = function (value, when)
    {
        this._linearRampToValueAtTime(value, when);
        this._save_evt("l", value, when);
    };

    AudioParam.prototype.setValueAtTime = function (value, when)
    {
        this._setValueAtTime(value, when);
        this._save_evt("s", value, when);
    };

    AudioParam.prototype.cancelAndHoldAtTime = function (when)
    {
        var events, last_event, evt, i, l, d, v, s;

        events = this._events;
        this._events = [];

        this.cancelScheduledValues(when);

        if (events && (0 < (l = events.length))) {
            last_event = null;
            v = null;
            s = 0;

            for (i = l - 1; i > -1; --i) {
                evt = events[i];

                if (evt[2] <= when) {
                    v = evt[1];
                    s = evt[2];
                    break;
                }

                last_event = evt;
            }

            if (v === null) {
                return;
            }

            if (
                (last_event === null)
                || (last_event[0] === "s")
                || (last_event[3] >= when)
            ) {
                /* FIXME: probably this._setValueAtTime(v, when) would suffice */
                this._save_evt("s", v, when);
                this._linearRampToValueAtTime(v, when);

                return;
            }

            s = Math.max(s, last_event[3]);

            if (0 < (d = (last_event[2] - s))) {
                v = v + ((when - s) / d) * (last_event[1] - v);
            }

            this._save_evt("s", v, when);
            this._linearRampToValueAtTime(v, when);
        }
    };
}


function bind(obj, func)
{
    return function () { return func.apply(obj, arguments); };
}


function $(obj)
{
    if (typeof(obj) === "string") {
        obj = document.getElementById(obj);
    }

    return obj;
}


function stop_event(evt)
{
    evt = evt || event;
    evt.preventDefault();
    evt.stopPropagation();

    return false;
}


window.onload = function () {
    main();
};

})();
