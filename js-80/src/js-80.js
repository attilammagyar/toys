(function () {

    "use strict";

    var PATCH_VERSION = "4",
        OSC_WAVEFORMS = {
            "sawtooth": "sawtooth",
            "softsaw": "soft sawtooth",
            "invsaw": "inverse sawtooth",
            "softinvsaw": "soft inverse sawtooth",
            "sine": "sine",
            "square": "square",
            "softsquare": "soft square",
            "triangle": "triangle",
            "softtriangle": "soft triangle",
            "custom": "custom"
        },
        LFO_WAVEFORMS = {
            "sawtooth": "sawtooth",
            "invsaw": "inverse sawtooth",
            "sine": "sine",
            "square": "square",
            "triangle": "triangle"
        },
        MIDI_CONTROLS = null,
        BASE_MIDI_CONTROLS = {
            "none": "",
            "pitch": "pitch wheel",
            "mod": "modulation (CC 1)",
            "breath": "breath (CC 2)",
            "volume": "volume (CC 7)",
            "pan": "pan (CC 10)",
            "expr": "expression (CC 11)",
            "gp1": "general 1 (CC 16)",
            "gp2": "general 2 (CC 17)",
            "gp3": "general 3 (CC 18)",
            "gp4": "general 4 (CC 19)",
            "fx1": "effect 1 (CC 91)",
            "fx2": "effect 2 (CC 92)",
            "fx3": "effect 3 (CC 93)",
            "fx4": "effect 4 (CC 94)",
            "fx5": "effect 5 (CC 95)",
            "note": "MIDI note",
            "vel": "MIDI velocity",
            "vrt1": "virtual 1",
            "vrt2": "virtual 2",
            "vrt3": "virtual 3",
            "vrt4": "virtual 4",
            "vrt5": "virtual 5",
            "vrtnote": "QWERTY note",
            "vrtvel": "QWERTY velocity",
            "seqnote": "seq. note (imprecise)",
            "seqprog": "seq. progress (imprecise)",
            "seqvel": "seq. velocity (imprecise)",
            "touch1x": "touch 1 X",
            "touch1y": "touch 1 Y",
            "touch2x": "touch 2 X",
            "touch2y": "touch 2 Y"
        },
        MACRO_CONTROLS = {
            "mcs1": "Macro 1",
            "mcs2": "Macro 2",
            "mcs3": "Macro 3",
            "mcs4": "Macro 4",
            "mcs5": "Macro 5",
            "mcs6": "Macro 6",
            "mcs7": "Macro 7",
            "mcs8": "Macro 8",
            "mcs9": "Macro 9",
            "mcs10": "Macro 10",
            "mcs11": "Macro 11",
            "mcs12": "Macro 12",
            "mcs13": "Macro 13",
            "mcs14": "Macro 14",
            "mcs15": "Macro 15",
            "mcs16": "Macro 16",
            "mcs17": "Macro 17",
            "mcs18": "Macro 18",
            "mcs19": "Macro 19",
            "mcs20": "Macro 20",
            "mcs21": "Macro 21",
            "mcs22": "Macro 22",
            "mcs23": "Macro 23",
            "mcs24": "Macro 24"
        },
        LFO_CONTROLS = {
            "lfo1": "LFO 1",
            "lfo2": "LFO 2",
            "lfo3": "LFO 3",
            "lfo4": "LFO 4",
            "lfo5": "LFO 5",
            "lfo6": "LFO 6",
            "lfo7": "LFO 7",
            "lfo8": "LFO 8"
        },
        ALL_CONTROLS = null,
        SEQ_ON_OFF_KEY = "sq_st",
        SEQ_BEATS = 12,
        SEQ_VOICES = 4,
        SEQ_INTERVAL = 200,
        SEQ_BANKS = {
            "b0": "Bank 1 [1]",
            "b1": "Bank 2 [2]",
            "b2": "Bank 3 [3]",
            "b3": "Bank 4 [4]",
            "b4": "Bank 5 [5]"
        },
        SEQ_NOTE_NAMES = {
            "nx": "",
            "n0": "C",
            "s1": "C#",
            "f1": "Db",
            "n2": "D",
            "s3": "D#",
            "f3": "Eb",
            "n4": "E",
            "n5": "F",
            "s6": "F#",
            "f6": "Gb",
            "n7": "G",
            "s8": "G#",
            "f8": "Ab",
            "n9": "A",
            "s10": "A#",
            "f10": "Bb",
            "n11": "B"
        },
        SEQ_NOTE_VALUES = {
            "nx": -1,
            "n0": 0,
            "s1": 1,
            "f1": 1,
            "n2": 2,
            "s3": 3,
            "f3": 3,
            "n4": 4,
            "n5": 5,
            "s6": 6,
            "f6": 6,
            "n7": 7,
            "s8": 8,
            "f8": 8,
            "n9": 9,
            "s10": 10,
            "f10": 10,
            "n11": 11
        },
        SEQ_VELOCITIES = {
            "v1": "5%",
            "v2": "10%",
            "v3": "15%",
            "v4": "20%",
            "v5": "25%",
            "v6": "30%",
            "v7": "35%",
            "v8": "40%",
            "v9": "45%",
            "v10": "50%",
            "v11": "55%",
            "v12": "60%",
            "v13": "65%",
            "v14": "70%",
            "v15": "75%",
            "v16": "80%",
            "v17": "85%",
            "v18": "90%",
            "v19": "95%",
            "v20": "100%"
        },
        SEQ_STEPS = {
            "sx": "",
            "sr": "rest",
            "s0": "1",
            "s1": "2",
            "s2": "3",
            "s3": "4",
            "s4": "5",
            "s5": "6",
            "s6": "7",
            "s7": "8",
            "s8": "9",
            "s9": "10",
            "s10": "11",
            "s11": "12",
            "s12": "13",
            "s13": "14",
            "s14": "15",
            "s15": "16",
            "s16": "17",
            "s17": "18",
            "s18": "19",
            "s19": "20",
            "s20": "21",
            "s21": "22",
            "s22": "23",
            "s23": "24",
            "s24": "25",
            "s25": "26",
            "s26": "27",
            "s27": "28",
            "s28": "29",
            "s29": "30",
            "s30": "31",
            "s31": "32",
            "s32": "33",
            "s33": "34",
            "s34": "35",
            "s35": "36",
            "s36": "37",
            "s37": "38",
            "s38": "39",
            "s39": "40",
            "s40": "41",
            "s41": "42",
            "s42": "43",
            "s43": "44",
            "s44": "45",
            "s45": "46",
            "s46": "47",
            "s47": "48",
            "s48": "49",
            "s49": "50",
            "s50": "51",
            "s51": "52",
            "s52": "53",
            "s53": "54",
            "s54": "55",
            "s55": "56",
            "s56": "57",
            "s57": "58",
            "s58": "59",
            "s59": "60"
        },
        SEQ_ROOTS = {
            "rx": "",
            "r0": "1",
            "r1": "2",
            "r2": "3",
            "r3": "4",
            "r4": "5",
            "r5": "6",
            "r6": "7",
            "r7": "8",
            "r8": "9",
            "r9": "10",
            "r10": "11",
            "r11": "12",
            "r12": "13",
            "r13": "14",
            "r14": "15",
            "r15": "16",
            "r16": "17",
            "r17": "18",
            "r18": "19",
            "r19": "20",
            "r20": "21",
            "r21": "22",
            "r22": "23",
            "r23": "24",
            "r24": "25",
            "r25": "26",
            "r26": "27",
            "r27": "28",
            "r28": "29",
            "r29": "30",
            "r30": "31",
            "r31": "32",
            "r32": "33",
            "r33": "34",
            "r34": "35",
            "r35": "36"
        },
        MOD_NAMES = {
            "m1": "add",
            "m2": "AM",
            "m3": "FM",
            "m4": "add + AM",
            "m5": "add + FM",
            "m6": "AM + FM",
            "m7": "add + AM + FM",
            "m8": "split at C3",
            "m9": "split at C#3 / Db3",
            "m10": "split at D3",
            "m11": "split at D#3 / Eb3",
            "m12": "split at E3",
            "m13": "split at F3",
            "m14": "split at F#3 / Gb3",
            "m15": "split at G3",
            "m16": "split at G#3 / Ab3",
            "m17": "split at A3",
            "m18": "split at A#3 / Bb3",
            "m19": "split at B3",
            "m20": "split at C4"
        },
        MOD_MASKS = {
            "m1": 1,
            "m2": 2,
            "m3": 4,
            "m4": 3,
            "m5": 5,
            "m6": 6,
            "m7": 7,
            "m8": 1,
            "m9": 1,
            "m10": 1,
            "m11": 1,
            "m12": 1,
            "m13": 1,
            "m14": 1,
            "m15": 1,
            "m16": 1,
            "m17": 1,
            "m18": 1,
            "m19": 1,
            "m20": 1
        },
        SPLITS = {
            "m1": null,
            "m2": null,
            "m3": null,
            "m4": null,
            "m5": null,
            "m6": null,
            "m7": null,
            "m8": 48,
            "m9": 49,
            "m10": 50,
            "m11": 51,
            "m12": 52,
            "m13": 53,
            "m14": 54,
            "m15": 55,
            "m16": 56,
            "m17": 57,
            "m18": 58,
            "m19": 59,
            "m20": 60
        },
        ENV_HP_FLAG = 1,
        ENV_LP_FLAG = 2,
        LFO_HP_FLAG = 4,
        LFO_LP_FLAG = 8,
        LFOS = 8,
        MACROS = 24,
        PRT_TIME_MIN = 0.0,
        PRT_TIME_MAX = 2.0,
        PRT_TIME_DEF = 0.0,
        ENV_DEL_MIN = 0.0,
        ENV_DEL_MAX = 6.0,
        ENV_DEL_DEF = 0.0,
        ENV_ATK_MIN = 0.0,
        ENV_ATK_MAX = 6.0,
        ENV_ATK_DEF = 0.02,
        ENV_HLD_MIN = 0.0,
        ENV_HLD_MAX = 12.0,
        ENV_HLD_DEF = 0.3,
        ENV_DEC_MIN = 0.001,
        ENV_DEC_MAX = 15.0,
        ENV_DEC_DEF = 0.6,
        ENV_REL_MIN = 0.0,
        ENV_REL_MAX = 6.0,
        ENV_REL_DEF = 0.1,
        ENV_VOL_MIN = 0.0,
        ENV_VOL_MAX = 1.0,
        ENV_PEAK_DEF = 1.0,
        ENV_SUS_DEF = 0.7,
        SND_FREQ_MAX = 22050.0,
        SND_FREQ_MIN = 20.0,
        SND_FREQ_DELTA = SND_FREQ_MAX - SND_FREQ_MIN,
        LFO_FREQ_MAX = 30.0,
        LFO_FREQ_MIN = 0.01,
        LFO_FREQ_DEF = 2.0,
        FILTER_FREQ_MIN = 0.0,
        FILTER_FREQ_MAX = 1.0,
        FILTER_FREQ_CURVE_RESOLUTION = 1023,
        FILTER_FREQ_RANGE = SND_FREQ_MAX / SND_FREQ_MIN,
        FILTER_FREQ_SCALE = 1.0 / SND_FREQ_DELTA,
        FILTER_Q_MIN = 0.0,
        FILTER_Q_MAX = 30.0,
        FILTER_Q_DEF = 1.0,
        QWERTY = {
            "KeyZ":         [48, "zZ",  "white", "C3"],
            "KeyX":         [49, "xX",  "black", "C#3"],
            "KeyC":         [50, "cC",  "white", "D3"],
            "KeyV":         [51, "vV",  "black", "D#3"],
            "KeyB":         [52, "bB",  "white", "E3"],
            "KeyN":         [53, "nN",  "white", "F3"],
            "KeyM":         [54, "mM",  "black", "F#3"],
            "Comma":        [55, ",<",  "white", "G3"],
            "KeyQ":         [56, "qQ",  "black", "G#3"],
            "KeyA":         [57, "aA",  "white", "A3"],
            "KeyW":         [58, "wW",  "black", "A#3"],
            "KeyS":         [59, "sS",  "white", "B3"],
            "KeyD":         [60, "dD",  "white", "C4"],
            "KeyR":         [61, "rR",  "black", "C#4"],
            "KeyF":         [62, "fF",  "white", "D4"],
            "KeyT":         [63, "tT",  "black", "D#4"],
            "KeyG":         [64, "gG",  "white", "E4"],
            "KeyH":         [65, "hH",  "white", "F4"],
            "KeyU":         [66, "uU",  "black", "F#4"],
            "KeyJ":         [67, "jJ",  "white", "G4"],
            "KeyI":         [68, "iI",  "black", "G#4"],
            "KeyK":         [69, "kK",  "white", "A4"],
            "KeyO":         [70, "oO",  "black", "A#4"],
            "KeyL":         [71, "lL",  "white", "B4"],
            "Semicolon":    [72, ";:",  "white", "C5"],
        },
        DEFAULT_PRESET = "p1",
        CTL_DST_STEEPNESS_MIN = 3.0,
        CTL_DST_STEEPNESS_SCALE = 12.0,
        FOLD_THRESHOLD = 0.125,
        FOLD_MAX = 0.875,
        FOLD_CURVE = new Float32Array(
            [0.0, 0.125, 0.0, -0.125, 0.0, 0.125, 0.0, -0.125, 0.0, 0.125, 0.0, -0.125, 0.0, 0.125, 0.0, -0.125, 0.0]
        ),
        FOLD_CURVE_INV = new Float32Array(
            [0.0, -0.125, 0.0, 0.125, 0.0, -0.125, 0.0, 0.125, 0.0, -0.125, 0.0, 0.125, 0.0, -0.125, 0.0, 0.125, 0.0]
        ),
        RANDOMS = 300,
        random_numbers = [],
        synth_ui = null,
        synth_obj = null,
        filter_freq_curve_log,
        filter_freq_curve_lin,
        soft_saw_pw,
        soft_sqr_pw,
        soft_tri_pw,
        presets,
        preset_names,
        patch_file_input,
        preset_selector,
        export_patch_anchor,
        start_button,
        confirm_modal,
        confirm_message,
        confirm_callback,
        error_dom_node,
        rng_x, rng_c;

    function main()
    {
        var i;

        MIDI_CONTROLS = merge(BASE_MIDI_CONTROLS, MACRO_CONTROLS);
        ALL_CONTROLS = merge(merge(BASE_MIDI_CONTROLS, LFO_CONTROLS), MACRO_CONTROLS);

        // init_fold_curves();

        init_filter_freq_curves();

        $("main-form").onsubmit = stop_event;

        init_random();

        for (i = 0; i < RANDOMS; ++i) {
            random_numbers.push(gen_random());
        }

        error_dom_node = $("error");

        confirm_modal = $("confirm");
        confirm_message = $("confirm-message");
        $("confirm-yes").onclick = handle_confirm_yes_click;
        $("confirm-no").onclick = handle_confirm_no_click;

        export_patch_anchor = $("export-patch");
        export_patch_anchor.onclick = handle_export_patch_click;

        patch_file_input = $("patch-file");
        $("import-patch").onclick = handle_import_patch_click;

        preset_selector = $("presets");
        $("load-preset").onclick = handle_load_preset_click;

        populate_select(preset_selector, preset_names);
        preset_selector.value = DEFAULT_PRESET;

        start_button = $("start");
        start_button.onclick = handle_start_click;

        return true;
    }

    function init_fold_curves()
    {
        var resolution = 16384,
            resolution_inv = 1.0 / resolution,
            curve = new Float32Array(resolution),
            inv = new Float32Array(resolution),
            pi = Math.PI,
            pi_sqr = Math.PI * Math.PI,
            pi_2_f = Math.PI * 2.0 * 4.0,
            sin = Math.sin,
            abs = Math.abs,
            i, j, a, v, s, max, n, norm;

        max = 0.0;

        for (i = 0; i < resolution; ++i) {
            v = 0.0;
            s = 1.0;

            for (j = 0; j < 3; ++j) {
                n = 2.0 * j + 1.0;
                v += (s / (n * n)) * sin(pi_2_f * n * i * resolution_inv)
                s = -s;
            }

            v = (1.0 / pi_sqr) * v;
            a = abs(v);

            if (a > max) {
                max = a;
            }

            curve[i] = v;
        }

        norm = FOLD_THRESHOLD / max;

        for (i = 0; i < resolution; ++i) {
            curve[i] *= norm;
            inv[i] = -curve[i];
        }

        FOLD_CURVE = curve;
        FOLD_CURVE_INV = inv;
    }

    function init_filter_freq_curves()
    {
        var min = SND_FREQ_MIN,
            max = SND_FREQ_MAX,
            range = max / min,
            scale = 1.0 / SND_FREQ_DELTA,
            freqs = [],
            resolution = Math.floor(FILTER_FREQ_CURVE_RESOLUTION / 2),
            i, l;

        for (i = 0; i < resolution; ++i) {
            freqs.push(0.0);
        }

        freqs.push(0.0);

        for (i = 1, l = resolution; i < l; ++i) {
            freqs.push(ratio_to_log_filter_freq_ratio(i / resolution));
        }

        freqs.push(1.0);

        filter_freq_curve_log = new Float32Array(freqs);
        filter_freq_curve_lin = new Float32Array([-1.0, 1.0]);
    }

    function ratio_to_log_filter_freq_ratio(ratio)
    {
        var min = SND_FREQ_MIN;

        return (min * Math.pow(FILTER_FREQ_RANGE, ratio) - min) * FILTER_FREQ_SCALE;
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

    function handle_export_patch_click(evt)
    {
        function pad(n)
        {
            return (n < 10) ? "0" + String(n) : String(n);
        };

        var now = new Date(),
            patch, datetime;

        datetime = [
            String(now.getFullYear()),
            pad(now.getMonth() + 1),
            pad(now.getDate()),
            pad(now.getHours()),
            pad(now.getMinutes()),
            pad(now.getSeconds())
        ].join("-");

        patch = JSON.stringify(synth_obj.export_patch(), null, 2);
        patch = (
            patch.replace(/\[\n    /g, "[")
                .replace(/,\n    /g, ", ")
                .replace(/\n  \]/g, "]")
        );

        export_patch_anchor.href = URL.createObjectURL(
            new Blob([patch], {"type": "application/json"})
        );
        export_patch_anchor.download = "patch-" + datetime + ".json";

        return true;
    }

    function handle_import_patch_click(evt)
    {
        clear_errors();

        if (0 < patch_file_input.files.length) {
            ask_for_confirmation(
                "Importing a patch will overwrite all your current settings. Are you sure you want to continue?",
                function ()
                {
                    read_file(patch_file_input.files[0], import_patch_from_file);
                    patch_file_input.value = "";
                }
            );
        } else {
            show_error("Use the file picker to select a patch file first.");
        }

        return stop_event(evt);
    }

    function import_patch_from_file(name, patch)
    {
        var error;

        try {
            synth_obj.import_patch(JSON.parse(patch));
        } catch (error) {
            show_error("Unable to import patch: " + String(error));
        }
    }

    function read_file(file, callback)
    {
        var reader = new FileReader(),
            handle_error;

        handle_error = function () {
            show_error("Error reading file: " + quote_html(String(reader.error || "unknown error")));
        };

        reader.onerror = handle_error;
        reader.onabort = handle_error;
        reader.onload = function ()
        {
            var error;

            try {
                callback(String(file.name), reader.result);
            } catch (error) {
                show_error(quote_html(error));

                return;
            }

        };

        reader.readAsText(file);
    }

    function handle_load_preset_click(evt)
    {
        clear_errors();

        ask_for_confirmation(
            "Loading a preset will overwrite all your current settings. Are you sure you want to continue?",
            function ()
            {
                synth_obj.import_patch(presets[preset_selector.value]);
            }
        );

        return stop_event(evt);
    }

    function handle_start_click(evt)
    {
        start_button.innerText = "Please wait...";

        setTimeout(
            function ()
            {
                var synth_dom_node = $("synth"),
                    error;

                try {
                    init_synth(synth_dom_node);
                } catch (error) {
                    show(error_dom_node);
                    hide($("intro"));

                    throw error;
                };

                show(synth_dom_node);
                show(error_dom_node);
                show($("menu"));
                hide($("intro"));
            },
            100
        );

        return stop_event(evt);
    }

    function init_synth(synth_dom_node)
    {
        var audio_ctx, saved_patch, error;

        if (synth_obj) {
            return;
        }

        clear_errors();

        try {
            audio_ctx = new AudioContext();

            if (AudioParam.prototype.cancelAndHoldAtTime === undefined) {
                patch_audio_param(audio_ctx);
            }

            init_waveforms(audio_ctx);

            synth_obj = new Synth(
                audio_ctx,
                Number($("comp-poliphony").value),
                Number($("midi-poliphony").value)
            );
            synth_obj.output.connect(audio_ctx.destination);

            restore_patch_from_local_storage();

            synth_ui = new SynthUI(synth_obj);

            document.onkeydown = bind(synth_obj, synth_obj.handle_key_down);
            document.onkeyup = bind(synth_obj, synth_obj.handle_key_up);
            document.onmouseup = bind(synth_ui, synth_ui.handle_document_mouse_up);

            window.addEventListener("beforeunload", handle_beforeunload);

            if (navigator.requestMIDIAccess) {
                navigator.requestMIDIAccess({"sysex": false, "software": false})
                    .then(
                        function (midi_access)
                        {
                            var inputs, input, error

                            try {
                                inputs = midi_access.inputs.values();

                                while ((input = inputs.next()) && input.value) {
                                    synth_obj.register_midi_input(input.value);
                                }
                            } catch (error) {
                                show_error("Error registering MIDI inputs: " + String(error));
                            }

                        },
                        function (error)
                        {
                            show_error("Unable to access MIDI inputs: " + String(error));
                        }
                    );
            } else {
                show_error("Your browser doesn't seem to support the Web MIDI API, so you won't be able to use your MIDI keyboard.");
            }

            synth_dom_node.appendChild(synth_ui.dom_node);
        } catch (error) {
            show_error("Error initializing the synthesizers: " + String(error));
            throw error;
        }
    }

    function patch_audio_param(audio_ctx)
    {
        /**
         * NOTE: this is not a generic polyfill for cancelAndHoldAtTime(), since
         *       it only supports linear ramping, and it's heavily based on
         *       assumptions that are specific to how JS-80 uses automation.
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
                    // FIXME: probably this._setValueAtTime(v, when) would suffice
                    this._linearRampToValueAtTime(v, when);

                    return;
                }

                s = Math.max(s, last_event[3]);

                if (0 < (d = (last_event[2] - s))) {
                    v = v + ((when - s) / d) * (last_event[1] - v);
                }

                this._linearRampToValueAtTime(v, when);
            }
        };
    }

    function init_waveforms(audio_ctx)
    {
        var partials = 128,
            soft_saw_coef = new Float32Array(partials),
            soft_sqr_coef = new Float32Array(partials),
            soft_tri_coef = new Float32Array(partials),
            real = new Float32Array(partials),
            plus_or_minus_one, i_pi, two_over_i_pi, softener,
            i, j;

        soft_saw_coef[0] = 0.0;
        soft_sqr_coef[0] = 0.0;
        soft_tri_coef[0] = 0.0;
        real[0] = 0.0;

        for (i = 0; i < partials; ++i) {
            j = i + 1;
            plus_or_minus_one = ((i & 1) == 1 ? -1.0 : 1.0);
            i_pi = j * Math.PI;
            two_over_i_pi = 2.0 / i_pi;
            softener = 5.0 / (i + 5.0);

            soft_saw_coef[j] = softener * plus_or_minus_one * two_over_i_pi;
            soft_sqr_coef[j] = softener * (1 + plus_or_minus_one) * two_over_i_pi;
            soft_tri_coef[j] = softener * (8.0 * Math.sin(i_pi / 2.0) / (i_pi * i_pi));
            real[j]
        }

        soft_saw_pw = new PeriodicWave(
            audio_ctx,
            {
                "channelCount": 1,
                "disableNormalization": false,
                "real": real,
                "imag": soft_saw_coef
            }
        );
        soft_sqr_pw = new PeriodicWave(
            audio_ctx,
            {
                "channelCount": 1,
                "disableNormalization": false,
                "real": real,
                "imag": soft_sqr_coef
            }
        );
        soft_tri_pw = new PeriodicWave(
            audio_ctx,
            {
                "channelCount": 1,
                "disableNormalization": false,
                "real": real,
                "imag": soft_tri_coef
            }
        );
    }

    function restore_patch_from_local_storage()
    {
        var saved_patch = localStorage.getItem("js80"),
            error;

        if (!saved_patch) {
            synth_obj.import_patch(presets[DEFAULT_PRESET]);
            return false;
        }

        try {
            synth_obj.import_patch(JSON.parse(saved_patch));
        } catch (error) {
            localStorage.removeItem("js80");
            show_error("Invalid synth patch JSON: " + String(error));
            synth_obj.import_patch(presets[DEFAULT_PRESET]);

            return false;
        }

        return true;
    }

    function handle_beforeunload(evt)
    {
        localStorage.setItem(
            "js80",
            JSON.stringify(synth_obj.export_patch())
        );
    }

    function show_error(error_msg)
    {
        error_dom_node.innerHTML += "<p>" + error_msg + "</p>";
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
    }

    function Observable()
    {
        this.observers = [];
        this._is_notifying = false;
    }

    Observable.prototype.notify_observers = function (arg)
    {
        var observers = this.observers,
            i, l;

        if (this._is_notifying) {
            return false;
        }

        this._is_notifying = true;

        for (i = 0, l = observers.length; i < l; ++i) {
            observers[i].update(this, arg);
        }

        this._is_notifying = false;
    }

    function Observer()
    {
    }

    Observer.prototype.update = function (observable, arg)
    {
    }

    function Synth(audio_ctx, comp_poliphony, midi_poliphony)
    {
        var freqs = [],
            output = new GainNode(audio_ctx, {"gain": 1.0}),
            i, l, ct, ctl;

        Observable.call(this);
        Observer.call(this);

        this._params = [];
        this._params_by_key = {};
        this._update_dirty_custom_waves_timeout = null;
        this._update_dirty_custom_waves_func = null;

        this.audio_ctx = audio_ctx;
        this.garbage = [];
        this.virt_detune = new DetuneParam(this, "vrt_dt", null, 1, -48, 48, 0);
        this.virt_ctl_params = [
            new NumParam(this, "vcp1", 0.0, 1.0, 0.5),
            new NumParam(this, "vcp2", 0.0, 1.0, 0.5),
            new NumParam(this, "vcp3", 0.0, 1.0, 0.5),
            new NumParam(this, "vcp4", 0.0, 1.0, 0.5),
            new NumParam(this, "vcp5", 0.0, 1.0, 0.5)
        ];
        this.virt_ctls = [
            new VirtualMIDIController(this, this.virt_ctl_params[0]),
            new VirtualMIDIController(this, this.virt_ctl_params[1]),
            new VirtualMIDIController(this, this.virt_ctl_params[2]),
            new VirtualMIDIController(this, this.virt_ctl_params[3]),
            new VirtualMIDIController(this, this.virt_ctl_params[4])
        ];

        for (i = 0; i < 228; ++i) {
            freqs[i] = Math.pow(2.0, ((i - 117.0) / 12.0)) * 440.0;
        }

        this._pitch_ctl = new MIDIController(this, 0.5);
        this._note_ctl = new MIDIController(this, 0.5);
        this._velocity_ctl = new MIDIController(this, 0.6);
        this._midi_ctls = [];

        this._virt_note_ctl = new MIDIController(this, 0.5);
        this._virt_vel_ctl = new MIDIController(this, 0.6);
        this._seq_note_ctl = new MIDIController(this, 0.5);
        this._seq_prog_ctl = new MIDIController(this, 0.5);
        this._seq_vel_ctl = new MIDIController(this, 0.6);

        this.touch_1_x_ctl = new MIDIController(this, 0.2);
        this.touch_1_y_ctl = new MIDIController(this, 0.2);
        this.touch_2_x_ctl = new MIDIController(this, 0.2);
        this.touch_2_y_ctl = new MIDIController(this, 0.2);

        for (i = 0; i < 128; ++i) {
            this._midi_ctls[i] = null;
        }

        this.controllers = {
            "pitch": this._pitch_ctl,
            "mod": this._midi_ctls[1] = new MIDIController(this, 0.25),
            "breath": this._midi_ctls[2] = new MIDIController(this, 0.5),
            "volume": this._midi_ctls[7] = new MIDIController(this, 0.5),
            "pan": this._midi_ctls[10] = new MIDIController(this, 0.5),
            "expr": this._midi_ctls[11] = new MIDIController(this, 0.5),
            "gp1": this._midi_ctls[16] = new MIDIController(this, 0.5),
            "gp2": this._midi_ctls[17] = new MIDIController(this, 0.5),
            "gp3": this._midi_ctls[18] = new MIDIController(this, 0.5),
            "gp4": this._midi_ctls[19] = new MIDIController(this, 0.5),
            "fx1": this._midi_ctls[91] = new MIDIController(this, 0.5),
            "fx2": this._midi_ctls[92] = new MIDIController(this, 0.5),
            "fx3": this._midi_ctls[93] = new MIDIController(this, 0.5),
            "fx4": this._midi_ctls[94] = new MIDIController(this, 0.5),
            "fx5": this._midi_ctls[95] = new MIDIController(this, 0.5),
            "note": this._note_ctl,
            "vel": this._velocity_ctl,
            "vrt1": this.virt_ctls[0],
            "vrt2": this.virt_ctls[1],
            "vrt3": this.virt_ctls[2],
            "vrt4": this.virt_ctls[3],
            "vrt5": this.virt_ctls[4],
            "vrtnote": this._virt_note_ctl,
            "vrtvel": this._virt_vel_ctl,
            "seqnote": this._seq_note_ctl,
            "seqprog": this._seq_prog_ctl,
            "seqvel": this._seq_vel_ctl,
            "touch1x": this.touch_1_x_ctl,
            "touch1y": this.touch_1_y_ctl,
            "touch2x": this.touch_2_x_ctl,
            "touch2y": this.touch_2_y_ctl
        };

        ct = audio_ctx.currentTime;

        for (i = 0; i < MACROS; ++i) {
            ctl = new Macro(this, "mcs" + String(i + 1));
            this.controllers[ctl.key] = ctl;
        }

        for (i = 0; i < LFOS; ++i) {
            ctl = new LFOController(this, "lfo" + String(i + 1));
            this.controllers[ctl.key] = ctl;
            ctl.start(ct);
        }

        this.midi_voice = new Voice(this, "midi", midi_poliphony, freqs, output);
        this.midi_voice.start(ct);

        this.comp_voice = new Voice(this, "cmp", comp_poliphony, freqs, output);
        this.comp_voice.start(ct);

        this.sequencer = new Sequencer(
            this,
            this.comp_voice,
            this.midi_voice,
            this._seq_note_ctl,
            this._seq_vel_ctl,
            this._seq_prog_ctl,
            this._note_ctl,
            this._velocity_ctl,
            this._virt_note_ctl,
            this._virt_vel_ctl
        );

        this.theremin = new Theremin(this, output);
        this.theremin.start(ct);

        this._comp_keyboard_target = "comp";
        this.comp_keyboard_target = new EnumParam(
            this,
            "ckb_trg",
            {"comp": "QWERTY Module", "seq": "Sequencer root note"},
            "comp"
        );
        this.comp_keyboard_target.observers.push(this);

        this.output = output;
        this.midi_inputs = [];

        this._update_dirty_custom_waves_func = bind(
            this,
            function ()
            {
                this.theremin.update_dirty_custom_wave();
                this.midi_voice.osc_1.update_dirty_custom_wave();
                this.midi_voice.osc_2.update_dirty_custom_wave();
                this.comp_voice.osc_1.update_dirty_custom_wave();
                this.comp_voice.osc_2.update_dirty_custom_wave();
                this._update_dirty_custom_waves_timeout = null;
            }
        );
    }

    Synth.prototype.clear_garbage = function (when)
    {
        var old_garbage = this.garbage,
            new_garbage = [],
            i, l, j, ll, g;

        for (i = 0, l = old_garbage.length; i < l; ++i) {
            g = old_garbage[i];

            if (g[0] > when) {
                new_garbage.push(g);
            } else {
                g[1].disconnect();

                for (j = 2, ll = g.length; j < ll; j += 2) {
                    g[j].disconnect(g[j + 1]);
                }
            }
        }

        this.garbage = new_garbage;
    };

    Synth.prototype.update_dirty_custom_waves = function ()
    {
        var f = this._update_dirty_custom_waves_func;

        if (f === null) {
            return;
        }

        if (this._update_dirty_custom_waves_timeout === null) {
            this._update_dirty_custom_waves_timeout = setTimeout(f, 55);
        }
    };

    Synth.prototype.register_param = function (param)
    {
        var key;

        if (this._params_by_key.hasOwnProperty(key = param.key)) {
            throw "Programming error: duplicate parameter key: " + param.key;
        }

        this._params.push(param);
        this._params_by_key[key] = param;
    };

    Synth.prototype.update = function (observable, arg)
    {
        this._comp_keyboard_target = this.comp_keyboard_target.value;
    };

    Synth.prototype.notify_observers = Observable.prototype.notify_observers;

    Synth.prototype.connect = function (param, ctl_key)
    {
        param.disconnect();

        if (ctl_key.substring(0, 3) === "lfo") {
            param.connect_lfo_ctl(ctl_key, this.controllers[ctl_key]);
        } else {
            param.connect_midi_ctl(ctl_key, this.controllers[ctl_key]);
        }
    };

    Synth.prototype.register_midi_input = function (midi_input)
    {
        midi_input.onmidimessage = bind(this, this.handle_midi_message);
        this.midi_inputs.push(midi_input);
        this.notify_observers(null);
    }

    Synth.prototype.export_patch = function ()
    {
        var result = {"version": PATCH_VERSION},
            params = this._params,
            i, l, param;

        for (i = 0, l = params.length; i < l; ++i) {
            param = params[i];
            result[param.key] = [param.value, param.controller];
        }

        return result;
    };

    Synth.prototype.import_patch = function (exported)
    {
        var params = this._params,
            params_by_key = this._params_by_key,
            i, l, param, key, t, v, c, m;

        exported = this._upgrade_patch(exported);

        for (i = 0, l = params.length; i < l; ++i) {
            param = params[i];
            param.disconnect();

            key = param.key;

            if (!exported.hasOwnProperty(key)) {
                console.log("Value or controller for param " + key + " not found or invalid, using the default value");
                param.set_value(param.default_value);
                continue;
            }

            if (key === SEQ_ON_OFF_KEY) {
                // Sequencer should never start automatically, especially not
                // halfway through importing a patch.
                param.set_value("off");
                continue;
            }

            t = this._parse_exported_param(exported, key);

            if (t === null) {
                console.log("Ignoring " + key + " because it is not an array of 2 elements, or it refers to an unknown controller");
                param.set_value(param.default_value);
                continue;
            }

            c = t[1];

            if (c.substring(0, 3) === "lfo") {
                if (!param.connect_lfo_ctl) {
                    console.log("Ignoring controller for " + key + " because it is not compatible with LFOs");
                    c = "none";
                }
            } else if (c !== "none" && !param.connect_midi_ctl) {
                console.log("Ignoring controller for " + key + " because it cannot be controlled");
                c = "none";
            }

            v = param.validate(t[0]);

            if (v === null) {
                console.log("Ignoring value of " + key + " because its value is invalid");
                v = param.default_value;
            }

            param.set_value(v);

            if (c !== "none") {
                this.connect(param, c);
            }
        }

        c = this.controllers;

        for (i in c) {
            if (c.hasOwnProperty(i) && (i.substring(0, 3) !== "lfo")) {
                c[i].control_params();
            }
        }

        this._pitch_ctl.control_params();
        this._note_ctl.control_params();
        this._velocity_ctl.control_params();

        params_by_key["th_edl"].disconnect();
        params_by_key["th_ep"].disconnect();
        params_by_key["th_eh"].disconnect();
        params_by_key["th_ed"].disconnect();
        params_by_key["th_es"].disconnect();

        params_by_key["th_edl"].set_value(ENV_DEL_MIN);
        params_by_key["th_ep"].set_value(ENV_VOL_MAX);
        params_by_key["th_eh"].set_value(ENV_HLD_MIN);
        params_by_key["th_ed"].set_value(ENV_DEC_MIN);
        params_by_key["th_es"].set_value(ENV_VOL_MAX);
    };

    Synth.prototype._upgrade_patch = function (patch)
    {
        var upgraded = {},
            version, param, key, value, ctl;

        version = patch.hasOwnProperty("version") ? String(patch["version"]) : "1";

        if (version === PATCH_VERSION) {
            return patch;
        }

        for (key in patch) {
            param = this._parse_exported_param(patch, key);

            if (param === null) {
                continue;
            }

            upgraded[key] = param;
        }

        switch (version) {
            case "1":
                upgraded["mcs1_ds"] = this._copy_or_default("mcs1_ds", patch, null);
                upgraded["mcs2_ds"] = this._copy_or_default("mcs2_ds", patch, null);
                upgraded["mcs3_ds"] = this._copy_or_default("mcs3_ds", patch, null);
                upgraded["mcs4_ds"] = this._copy_or_default("mcs4_ds", patch, null);
                upgraded["mcs5_ds"] = this._copy_or_default("mcs5_ds", patch, null);
                upgraded["mcs6_ds"] = this._copy_or_default("mcs6_ds", patch, null);
                upgraded["mcs7_ds"] = this._copy_or_default("mcs7_ds", patch, null);
                upgraded["mcs8_ds"] = this._copy_or_default("mcs8_ds", patch, null);
                upgraded["mcs9_ds"] = this._copy_or_default("mcs9_ds", patch, null);
                upgraded["mcs10_ds"] = this._copy_or_default("mcs10_ds", patch, null);
                upgraded["mcs11_ds"] = this._copy_or_default("mcs11_ds", patch, null);
                upgraded["mcs12_ds"] = this._copy_or_default("mcs12_ds", patch, null);
                upgraded["mcs13_ds"] = this._copy_or_default("mcs13_ds", patch, null);
                upgraded["mcs14_ds"] = this._copy_or_default("mcs14_ds", patch, null);
                upgraded["mcs15_ds"] = this._copy_or_default("mcs15_ds", patch, null);
                upgraded["mcs16_ds"] = this._copy_or_default("mcs16_ds", patch, null);
                upgraded["mcs17_ds"] = this._copy_or_default("mcs17_ds", patch, null);
                upgraded["mcs18_ds"] = this._copy_or_default("mcs18_ds", patch, null);
                upgraded["mcs19_ds"] = this._copy_or_default("mcs19_ds", patch, null);
                upgraded["mcs20_ds"] = this._copy_or_default("mcs20_ds", patch, null);
                upgraded["mcs21_ds"] = this._copy_or_default("mcs21_ds", patch, null);
                upgraded["mcs22_ds"] = this._copy_or_default("mcs22_ds", patch, null);
                upgraded["mcs23_ds"] = this._copy_or_default("mcs23_ds", patch, null);
                upgraded["mcs24_ds"] = this._copy_or_default("mcs24_ds", patch, null);

                upgraded["lfo1_ds"] = this._copy_or_default("lfo1_ds", patch, null);
                upgraded["lfo2_ds"] = this._copy_or_default("lfo2_ds", patch, null);
                upgraded["lfo3_ds"] = this._copy_or_default("lfo3_ds", patch, null);
                upgraded["lfo4_ds"] = this._copy_or_default("lfo4_ds", patch, null);
                upgraded["lfo5_ds"] = this._copy_or_default("lfo5_ds", patch, null);
                upgraded["lfo6_ds"] = this._copy_or_default("lfo6_ds", patch, null);
                upgraded["lfo7_ds"] = this._copy_or_default("lfo7_ds", patch, null);
                upgraded["lfo8_ds"] = this._copy_or_default("lfo8_ds", patch, null);

                upgraded["midi_o1_ehqi"] = this._copy_or_default("midi_o1_ehqi", patch, "midi_o1_ehq");
                upgraded["midi_o1_ehqdlt"] = this._copy_or_default("midi_o1_ehqdlt", patch, null);
                upgraded["midi_o1_ehqat"] = this._copy_or_default("midi_o1_ehqat", patch, null);
                upgraded["midi_o1_ehqp"] = this._copy_or_default("midi_o1_ehqp", patch, "midi_o1_ehq");
                upgraded["midi_o1_ehqht"] = this._copy_or_default("midi_o1_ehqht", patch, null);
                upgraded["midi_o1_ehqdt"] = this._copy_or_default("midi_o1_ehqdt", patch, null);
                upgraded["midi_o1_ehqs"] = this._copy_or_default("midi_o1_ehqs", patch, "midi_o1_ehq");
                upgraded["midi_o1_ehqrt"] = this._copy_or_default("midi_o1_ehqrt", patch, null);
                upgraded["midi_o1_ehqr"] = this._copy_or_default("midi_o1_ehqr", patch, "midi_o1_ehq");

                upgraded["midi_o1_elqi"] = this._copy_or_default("midi_o1_elqi", patch, "midi_o1_elq");
                upgraded["midi_o1_elqdlt"] = this._copy_or_default("midi_o1_elqdlt", patch, null);
                upgraded["midi_o1_elqat"] = this._copy_or_default("midi_o1_elqat", patch, null);
                upgraded["midi_o1_elqp"] = this._copy_or_default("midi_o1_elqp", patch, "midi_o1_elq");
                upgraded["midi_o1_elqht"] = this._copy_or_default("midi_o1_elqht", patch, null);
                upgraded["midi_o1_elqdt"] = this._copy_or_default("midi_o1_elqdt", patch, null);
                upgraded["midi_o1_elqs"] = this._copy_or_default("midi_o1_elqs", patch, "midi_o1_elq");
                upgraded["midi_o1_elqrt"] = this._copy_or_default("midi_o1_elqrt", patch, null);
                upgraded["midi_o1_elqr"] = this._copy_or_default("midi_o1_elqr", patch, "midi_o1_elq");

                upgraded["midi_o2_ehqi"] = this._copy_or_default("midi_o2_ehqi", patch, "midi_o2_ehq");
                upgraded["midi_o2_ehqdlt"] = this._copy_or_default("midi_o2_ehqdlt", patch, null);
                upgraded["midi_o2_ehqat"] = this._copy_or_default("midi_o2_ehqat", patch, null);
                upgraded["midi_o2_ehqp"] = this._copy_or_default("midi_o2_ehqp", patch, "midi_o2_ehq");
                upgraded["midi_o2_ehqht"] = this._copy_or_default("midi_o2_ehqht", patch, null);
                upgraded["midi_o2_ehqdt"] = this._copy_or_default("midi_o2_ehqdt", patch, null);
                upgraded["midi_o2_ehqs"] = this._copy_or_default("midi_o2_ehqs", patch, "midi_o2_ehq");
                upgraded["midi_o2_ehqrt"] = this._copy_or_default("midi_o2_ehqrt", patch, null);
                upgraded["midi_o2_ehqr"] = this._copy_or_default("midi_o2_ehqr", patch, "midi_o2_ehq");

                upgraded["midi_o2_elqi"] = this._copy_or_default("midi_o2_elqi", patch, "midi_o2_elq");
                upgraded["midi_o2_elqdlt"] = this._copy_or_default("midi_o2_elqdlt", patch, null);
                upgraded["midi_o2_elqat"] = this._copy_or_default("midi_o2_elqat", patch, null);
                upgraded["midi_o2_elqp"] = this._copy_or_default("midi_o2_elqp", patch, "midi_o2_elq");
                upgraded["midi_o2_elqht"] = this._copy_or_default("midi_o2_elqht", patch, null);
                upgraded["midi_o2_elqdt"] = this._copy_or_default("midi_o2_elqdt", patch, null);
                upgraded["midi_o2_elqs"] = this._copy_or_default("midi_o2_elqs", patch, "midi_o2_elq");
                upgraded["midi_o2_elqrt"] = this._copy_or_default("midi_o2_elqrt", patch, null);
                upgraded["midi_o2_elqr"] = this._copy_or_default("midi_o2_elqr", patch, "midi_o2_elq");

                upgraded["cmp_o1_ehqi"] = this._copy_or_default("cmp_o1_ehqi", patch, "cmp_o1_ehq");
                upgraded["cmp_o1_ehqdlt"] = this._copy_or_default("cmp_o1_ehqdlt", patch, null);
                upgraded["cmp_o1_ehqat"] = this._copy_or_default("cmp_o1_ehqat", patch, null);
                upgraded["cmp_o1_ehqp"] = this._copy_or_default("cmp_o1_ehqp", patch, "cmp_o1_ehq");
                upgraded["cmp_o1_ehqht"] = this._copy_or_default("cmp_o1_ehqht", patch, null);
                upgraded["cmp_o1_ehqdt"] = this._copy_or_default("cmp_o1_ehqdt", patch, null);
                upgraded["cmp_o1_ehqs"] = this._copy_or_default("cmp_o1_ehqs", patch, "cmp_o1_ehq");
                upgraded["cmp_o1_ehqrt"] = this._copy_or_default("cmp_o1_ehqrt", patch, null);
                upgraded["cmp_o1_ehqr"] = this._copy_or_default("cmp_o1_ehqr", patch, "cmp_o1_ehq");

                upgraded["cmp_o1_elqi"] = this._copy_or_default("cmp_o1_elqi", patch, "cmp_o1_elq");
                upgraded["cmp_o1_elqdlt"] = this._copy_or_default("cmp_o1_elqdlt", patch, null);
                upgraded["cmp_o1_elqat"] = this._copy_or_default("cmp_o1_elqat", patch, null);
                upgraded["cmp_o1_elqp"] = this._copy_or_default("cmp_o1_elqp", patch, "cmp_o1_elq");
                upgraded["cmp_o1_elqht"] = this._copy_or_default("cmp_o1_elqht", patch, null);
                upgraded["cmp_o1_elqdt"] = this._copy_or_default("cmp_o1_elqdt", patch, null);
                upgraded["cmp_o1_elqs"] = this._copy_or_default("cmp_o1_elqs", patch, "cmp_o1_elq");
                upgraded["cmp_o1_elqrt"] = this._copy_or_default("cmp_o1_elqrt", patch, null);
                upgraded["cmp_o1_elqr"] = this._copy_or_default("cmp_o1_elqr", patch, "cmp_o1_elq");

                upgraded["cmp_o2_ehqi"] = this._copy_or_default("cmp_o2_ehqi", patch, "cmp_o2_ehq");
                upgraded["cmp_o2_ehqdlt"] = this._copy_or_default("cmp_o2_ehqdlt", patch, null);
                upgraded["cmp_o2_ehqat"] = this._copy_or_default("cmp_o2_ehqat", patch, null);
                upgraded["cmp_o2_ehqp"] = this._copy_or_default("cmp_o2_ehqp", patch, "cmp_o2_ehq");
                upgraded["cmp_o2_ehqht"] = this._copy_or_default("cmp_o2_ehqht", patch, null);
                upgraded["cmp_o2_ehqdt"] = this._copy_or_default("cmp_o2_ehqdt", patch, null);
                upgraded["cmp_o2_ehqs"] = this._copy_or_default("cmp_o2_ehqs", patch, "cmp_o2_ehq");
                upgraded["cmp_o2_ehqrt"] = this._copy_or_default("cmp_o2_ehqrt", patch, null);
                upgraded["cmp_o2_ehqr"] = this._copy_or_default("cmp_o2_ehqr", patch, "cmp_o2_ehq");

                upgraded["cmp_o2_elqi"] = this._copy_or_default("cmp_o2_elqi", patch, "cmp_o2_elq");
                upgraded["cmp_o2_elqdlt"] = this._copy_or_default("cmp_o2_elqdlt", patch, null);
                upgraded["cmp_o2_elqat"] = this._copy_or_default("cmp_o2_elqat", patch, null);
                upgraded["cmp_o2_elqp"] = this._copy_or_default("cmp_o2_elqp", patch, "cmp_o2_elq");
                upgraded["cmp_o2_elqht"] = this._copy_or_default("cmp_o2_elqht", patch, null);
                upgraded["cmp_o2_elqdt"] = this._copy_or_default("cmp_o2_elqdt", patch, null);
                upgraded["cmp_o2_elqs"] = this._copy_or_default("cmp_o2_elqs", patch, "cmp_o2_elq");
                upgraded["cmp_o2_elqrt"] = this._copy_or_default("cmp_o2_elqrt", patch, null);
                upgraded["cmp_o2_elqr"] = this._copy_or_default("cmp_o2_elqr", patch, "cmp_o2_elq");

                upgraded["th_ehqi"] = this._copy_or_default("th_ehqi", patch, "th_ehq");
                upgraded["th_ehqdlt"] = this._copy_or_default("th_ehqdlt", patch, null);
                upgraded["th_ehqat"] = this._copy_or_default("th_ehqat", patch, null);
                upgraded["th_ehqp"] = this._copy_or_default("th_ehqp", patch, "th_ehq");
                upgraded["th_ehqht"] = this._copy_or_default("th_ehqht", patch, null);
                upgraded["th_ehqdt"] = this._copy_or_default("th_ehqdt", patch, null);
                upgraded["th_ehqs"] = this._copy_or_default("th_ehqs", patch, "th_ehq");
                upgraded["th_ehqrt"] = this._copy_or_default("th_ehqrt", patch, null);
                upgraded["th_ehqr"] = this._copy_or_default("th_ehqr", patch, "th_ehq");

                upgraded["th_elqi"] = this._copy_or_default("th_elqi", patch, "th_elq");
                upgraded["th_elqdlt"] = this._copy_or_default("th_elqdlt", patch, null);
                upgraded["th_elqat"] = this._copy_or_default("th_elqat", patch, null);
                upgraded["th_elqp"] = this._copy_or_default("th_elqp", patch, "th_elq");
                upgraded["th_elqht"] = this._copy_or_default("th_elqht", patch, null);
                upgraded["th_elqdt"] = this._copy_or_default("th_elqdt", patch, null);
                upgraded["th_elqs"] = this._copy_or_default("th_elqs", patch, "th_elq");
                upgraded["th_elqrt"] = this._copy_or_default("th_elqrt", patch, null);
                upgraded["th_elqr"] = this._copy_or_default("th_elqr", patch, "th_elq");

                upgraded["th_fd"] = this._copy_or_default("th_fd", patch, null);

                version = "2";

                /* fallthrough */

            case "2":
                upgraded["midi_o1_pfia"] = this._copy_or_default("midi_o1_pfia", patch, null);
                upgraded["midi_o1_pfdlt"] = this._copy_or_default("midi_o1_pfdlt", patch, null);
                upgraded["midi_o1_pfat"] = this._copy_or_default("midi_o1_pfat", patch, null);
                upgraded["midi_o1_pfpa"] = this._copy_or_default("midi_o1_pfpa", patch, null);
                upgraded["midi_o1_pfht"] = this._copy_or_default("midi_o1_pfht", patch, null);
                upgraded["midi_o1_pfdt"] = this._copy_or_default("midi_o1_pfdt", patch, null);
                upgraded["midi_o1_pfsa"] = this._copy_or_default("midi_o1_pfsa", patch, null);
                upgraded["midi_o1_pfrt"] = this._copy_or_default("midi_o1_pfrt", patch, null);
                upgraded["midi_o1_pfra"] = this._copy_or_default("midi_o1_pfra", patch, null);

                upgraded["midi_o2_pfia"] = this._copy_or_default("midi_o2_pfia", patch, null);
                upgraded["midi_o2_pfdlt"] = this._copy_or_default("midi_o2_pfdlt", patch, null);
                upgraded["midi_o2_pfat"] = this._copy_or_default("midi_o2_pfat", patch, null);
                upgraded["midi_o2_pfpa"] = this._copy_or_default("midi_o2_pfpa", patch, null);
                upgraded["midi_o2_pfht"] = this._copy_or_default("midi_o2_pfht", patch, null);
                upgraded["midi_o2_pfdt"] = this._copy_or_default("midi_o2_pfdt", patch, null);
                upgraded["midi_o2_pfsa"] = this._copy_or_default("midi_o2_pfsa", patch, null);
                upgraded["midi_o2_pfrt"] = this._copy_or_default("midi_o2_pfrt", patch, null);
                upgraded["midi_o2_pfra"] = this._copy_or_default("midi_o2_pfra", patch, null);

                upgraded["cmp_o1_pfia"] = this._copy_or_default("cmp_o1_pfia", patch, null);
                upgraded["cmp_o1_pfdlt"] = this._copy_or_default("cmp_o1_pfdlt", patch, null);
                upgraded["cmp_o1_pfat"] = this._copy_or_default("cmp_o1_pfat", patch, null);
                upgraded["cmp_o1_pfpa"] = this._copy_or_default("cmp_o1_pfpa", patch, null);
                upgraded["cmp_o1_pfht"] = this._copy_or_default("cmp_o1_pfht", patch, null);
                upgraded["cmp_o1_pfdt"] = this._copy_or_default("cmp_o1_pfdt", patch, null);
                upgraded["cmp_o1_pfsa"] = this._copy_or_default("cmp_o1_pfsa", patch, null);
                upgraded["cmp_o1_pfrt"] = this._copy_or_default("cmp_o1_pfrt", patch, null);
                upgraded["cmp_o1_pfra"] = this._copy_or_default("cmp_o1_pfra", patch, null);

                upgraded["cmp_o2_pfia"] = this._copy_or_default("cmp_o2_pfia", patch, null);
                upgraded["cmp_o2_pfdlt"] = this._copy_or_default("cmp_o2_pfdlt", patch, null);
                upgraded["cmp_o2_pfat"] = this._copy_or_default("cmp_o2_pfat", patch, null);
                upgraded["cmp_o2_pfpa"] = this._copy_or_default("cmp_o2_pfpa", patch, null);
                upgraded["cmp_o2_pfht"] = this._copy_or_default("cmp_o2_pfht", patch, null);
                upgraded["cmp_o2_pfdt"] = this._copy_or_default("cmp_o2_pfdt", patch, null);
                upgraded["cmp_o2_pfsa"] = this._copy_or_default("cmp_o2_pfsa", patch, null);
                upgraded["cmp_o2_pfrt"] = this._copy_or_default("cmp_o2_pfrt", patch, null);
                upgraded["cmp_o2_pfra"] = this._copy_or_default("cmp_o2_pfra", patch, null);

                upgraded["th_pfia"] = this._copy_or_default("th_pfia", patch, null);
                upgraded["th_pfdlt"] = this._copy_or_default("th_pfdlt", patch, null);
                upgraded["th_pfat"] = this._copy_or_default("th_pfat", patch, null);
                upgraded["th_pfpa"] = this._copy_or_default("th_pfpa", patch, null);
                upgraded["th_pfht"] = this._copy_or_default("th_pfht", patch, null);
                upgraded["th_pfdt"] = this._copy_or_default("th_pfdt", patch, null);
                upgraded["th_pfsa"] = this._copy_or_default("th_pfsa", patch, null);
                upgraded["th_pfrt"] = this._copy_or_default("th_pfrt", patch, null);
                upgraded["th_pfra"] = this._copy_or_default("th_pfra", patch, null);

                /* fallthrough */

            case "3":
                upgraded["midi_o1_ehlg"] = ["off", "none"];
                upgraded["midi_o1_ellg"] = ["off", "none"];
                upgraded["midi_o1_h_lg"] = ["off", "none"];
                upgraded["midi_o1_l_lg"] = ["off", "none"];

                upgraded["midi_o2_ehlg"] = ["off", "none"];
                upgraded["midi_o2_ellg"] = ["off", "none"];
                upgraded["midi_o2_hlg"] = ["off", "none"];
                upgraded["midi_o2_llg"] = ["off", "none"];

                upgraded["cmp_o1_ehlg"] = ["off", "none"];
                upgraded["cmp_o1_ellg"] = ["off", "none"];
                upgraded["cmp_o1_h_lg"] = ["off", "none"];
                upgraded["cmp_o1_l_lg"] = ["off", "none"];

                upgraded["cmp_o2_ehlg"] = ["off", "none"];
                upgraded["cmp_o2_ellg"] = ["off", "none"];
                upgraded["cmp_o2_hlg"] = ["off", "none"];
                upgraded["cmp_o2_llg"] = ["off", "none"];

                upgraded["th_ehlg"] = ["off", "none"];
                upgraded["th_ellg"] = ["off", "none"];
                upgraded["th_hlg"] = ["off", "none"];
                upgraded["th_llg"] = ["off", "none"];

                upgraded["midi_o1_ehif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_ehif", patch);
                upgraded["midi_o1_ehpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_ehpf", patch);
                upgraded["midi_o1_ehrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_ehrf", patch);
                upgraded["midi_o1_ehsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_ehsf", patch);
                upgraded["midi_o1_elif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_elif", patch);
                upgraded["midi_o1_elpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_elpf", patch);
                upgraded["midi_o1_elrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_elrf", patch);
                upgraded["midi_o1_elsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_elsf", patch);
                upgraded["midi_o1_hf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_hf", patch);
                upgraded["midi_o1_lf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o1_lf", patch);

                upgraded["midi_o2_ehif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_ehif", patch);
                upgraded["midi_o2_ehpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_ehpf", patch);
                upgraded["midi_o2_ehrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_ehrf", patch);
                upgraded["midi_o2_ehsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_ehsf", patch);
                upgraded["midi_o2_elif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_elif", patch);
                upgraded["midi_o2_elpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_elpf", patch);
                upgraded["midi_o2_elrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_elrf", patch);
                upgraded["midi_o2_elsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_elsf", patch);
                upgraded["midi_o2_hf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_hf", patch);
                upgraded["midi_o2_lf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("midi_o2_lf", patch);

                upgraded["cmp_o1_ehif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_ehif", patch);
                upgraded["cmp_o1_ehpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_ehpf", patch);
                upgraded["cmp_o1_ehrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_ehrf", patch);
                upgraded["cmp_o1_ehsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_ehsf", patch);
                upgraded["cmp_o1_elif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_elif", patch);
                upgraded["cmp_o1_elpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_elpf", patch);
                upgraded["cmp_o1_elrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_elrf", patch);
                upgraded["cmp_o1_elsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_elsf", patch);
                upgraded["cmp_o1_hf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_hf", patch);
                upgraded["cmp_o1_lf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o1_lf", patch);

                upgraded["cmp_o2_ehif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_ehif", patch);
                upgraded["cmp_o2_ehpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_ehpf", patch);
                upgraded["cmp_o2_ehrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_ehrf", patch);
                upgraded["cmp_o2_ehsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_ehsf", patch);
                upgraded["cmp_o2_elif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_elif", patch);
                upgraded["cmp_o2_elpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_elpf", patch);
                upgraded["cmp_o2_elrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_elrf", patch);
                upgraded["cmp_o2_elsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_elsf", patch);
                upgraded["cmp_o2_hf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_hf", patch);
                upgraded["cmp_o2_lf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("cmp_o2_lf", patch);

                upgraded["th_ehif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_ehif", patch);
                upgraded["th_ehpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_ehpf", patch);
                upgraded["th_ehrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_ehrf", patch);
                upgraded["th_ehsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_ehsf", patch);
                upgraded["th_elif"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_elif", patch);
                upgraded["th_elpf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_elpf", patch);
                upgraded["th_elrf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_elrf", patch);
                upgraded["th_elsf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_elsf", patch);
                upgraded["th_hf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_hf", patch);
                upgraded["th_lf"] = this._lin_filter_freq_to_loglin_filter_freq_or_default("th_lf", patch);

                version = PATCH_VERSION;

                break;

            default:
                throw "Invalid patch version: " + version;
        }

        upgraded["version"] = version;

        return upgraded;
    };

    Synth.prototype._copy_or_default = function (param_key, patch, copy_from)
    {
        var param = this._params_by_key[param_key],
            exported = null;

        if (copy_from !== null) {
            exported = this._parse_exported_param(patch, copy_from);
        }

        if (exported === null) {
            return [param.default_value, "none"];
        }

        return exported;
    };

    Synth.prototype._parse_exported_param = function (patch, key)
    {
        var exported, ctl;

        if (!patch.hasOwnProperty(key)) {
            return null;
        }

        exported = patch[key];

        if ((!Array.isArray(exported)) || (exported.length !== 2)) {
            return null;
        }

        ctl = String(exported[1]);

        if (ctl !== "none" && (!this.controllers.hasOwnProperty(ctl))) {
            return null;
        }

        return exported;
    }

    Synth.prototype._lin_filter_freq_to_loglin_filter_freq_or_default = function (param_key, patch)
    {
        var param = this._params_by_key[param_key],
            exported = this._parse_exported_param(patch, param_key);

        if (exported === null) {
            return [param.default_value, "none"];
        }

        exported[0] = Math.max(
            0.0,
            Math.min(1.0, (exported[0] - SND_FREQ_MIN) / SND_FREQ_DELTA)
        );

        return exported;
    };

    Synth.prototype.handle_midi_message = function (message)
    {
        var data,
            d0, d1, d2,
            velocity, midi_ctl, ct;

        data = message.data;
        d0 = data[0] & 0xf0;
        d1 = data[1] & 0x7f;
        d2 = data[2] & 0x7f;

        // var channel = data[0] & 0x0f;
        // console.log([d0, d1, d2]);

        switch (d0) {
            case 144: // note on, d1 = note, d2 = velocity
                velocity = d2 / 0x7f;
                ct = this.audio_ctx.currentTime;

                this._note_ctl.set_value(d1 / 0x7f);
                this._velocity_ctl.set_value(velocity);

                if (0 < d2) {
                    this.midi_voice.trigger_note(ct, ct + 0.009, d1, velocity);
                } else {
                    this.midi_voice.stop_note(ct + 0.009, d1);
                }

                break;

            case 128: // note off, d1 = note
                this.midi_voice.stop_note(this.audio_ctx.currentTime + 0.009, d1);
                break;

            case 224: // pitch bend change, d2 << 7 + d1 = bender position, 0x2000 = center
                this._pitch_ctl.set_value(((d2 << 7) + d1) / 0x3fff);
                break;

            case 176: // control change, d1 = controller number, d2 = controller value
                midi_ctl = this._midi_ctls[d1];

                if (midi_ctl !== null) {
                    midi_ctl.set_value(d2 / 0x7f);
                }

                break;
        }

        return true;
    };

    Synth.prototype.handle_key_down = function (e)
    {
        var key_code = e.code,
            velocity = 0.6,
            v;

        if (e.ctrlKey || e.metaKey || e.altKey) {
            return true;
        }

        if (QWERTY.hasOwnProperty(key_code)) {
            if (e.shiftKey) {
                velocity += 0.399;
            }

            this.virtual_key_down(key_code, velocity);

            return stop_event(e);
        }

        if (e.shiftKey) {
            return true;
        }

        switch (key_code) {
            case "Space":
                this.sequencer.onoff.toggle();
                return stop_event(e);

            case "Digit1":
                this.sequencer.active_bank.set_value("b0");
                return stop_event(e);

            case "Digit2":
                this.sequencer.active_bank.set_value("b1");
                return stop_event(e);

            case "Digit3":
                this.sequencer.active_bank.set_value("b2");
                return stop_event(e);

            case "Digit4":
                this.sequencer.active_bank.set_value("b3");
                return stop_event(e);

            case "Digit5":
                this.sequencer.active_bank.set_value("b4");
                return stop_event(e);

            case "ArrowLeft":
                if ((v = this.virt_detune.value) >= -36) {
                    this.virt_detune.set_value(v - 12);
                }

                return stop_event(e);

            case "ArrowRight":
                if ((v = this.virt_detune.value) <= 36) {
                    this.virt_detune.set_value(v + 12);
                }

                return stop_event(e);

            default:
                return true;
        }

        return true;
    };

    Synth.prototype.handle_key_up = function (e)
    {
        var key_code = e.code;

        if (QWERTY.hasOwnProperty(key_code)) {
            this.virtual_key_up(key_code);

            return stop_event(e);
        }

        return true;
    };

    Synth.prototype.virtual_key_down = function (key_code, velocity)
    {
        var midi_note = QWERTY[key_code][0] + this.virt_detune.value,
            ct;

        if ((0 > midi_note) || (127 < midi_note)) {
            return;
        }

        this._virt_note_ctl.set_value(midi_note / 0x7f);
        this._virt_vel_ctl.set_value(velocity);

        if (this._comp_keyboard_target === "seq") {
            this.sequencer.set_base_note(midi_note);
        } else {
            ct = this.audio_ctx.currentTime;

            this.comp_voice.trigger_note(
                ct, ct + 0.009, midi_note, velocity
            );
        }

        this.on_virtual_key_down(key_code);
    };

    Synth.prototype.virtual_key_up = function (key_code)
    {
        var midi_note = QWERTY[key_code][0] + this.virt_detune.value;

        if ((0 > midi_note) || (127 < midi_note)) {
            return;
        }

        this.comp_voice.stop_note(this.audio_ctx.currentTime + 0.009, midi_note);

        this.on_virtual_key_up(key_code);
    };

    Synth.prototype.on_virtual_key_down = function (key_code)
    {
    };

    Synth.prototype.on_virtual_key_up = function (key_code)
    {
    };

    function Sequencer(
        synth, comp_voice, midi_voice,
        note_ctl, vel_ctl, prog_ctl,
        midi_note_ctl, midi_vel_ctl,
        virt_note_ctl, virt_vel_ctl
    ) {
        var target = new EnumParam(synth, "sq_trg", {"comp": "QWERTY Module", "midi": "MIDI Module"}, "comp"),
            active_bank = new EnumParam(synth, "sq_ab", SEQ_BANKS, "b0"),
            onoff = new OnOffParam(synth, SEQ_ON_OFF_KEY),
            banks = {
                "b0": new SequencerBank(synth, "sq_b0"),
                "b1": new SequencerBank(synth, "sq_b1"),
                "b2": new SequencerBank(synth, "sq_b2"),
                "b3": new SequencerBank(synth, "sq_b3"),
                "b4": new SequencerBank(synth, "sq_b4")
            },
            beats = [],
            i;

        Observer.call(this);

        onoff.observers.push(this);
        target.observers.push(this);
        active_bank.observers.push(this);

        this._audio_ctx = synth.audio_ctx;
        this._synth = synth;
        this._comp_voice = comp_voice;
        this._midi_voice = midi_voice;
        this._note_ctl = note_ctl;
        this._vel_ctl = vel_ctl;
        this._prog_ctl = prog_ctl;

        this._midi_note_ctl = midi_note_ctl;
        this._midi_vel_ctl = midi_vel_ctl;
        this._virt_note_ctl = virt_note_ctl;
        this._virt_vel_ctl = virt_vel_ctl;

        this._active_bank = banks["b0"];
        this._active_bank_key = "b0";
        this._next_bank_key = "b0";
        this._target_name = "comp";
        this._target_voice = null;
        this._target_note_ctl = null;
        this._target_vel_ctl = null;
        this._stop = false;
        this._is_active = false;
        this._events = [];

        this.target = target;
        this.active_bank = active_bank;
        this.onoff = onoff;

        this.banks = banks;

        for (i = 0; i < SEQ_BEATS; ++i) {
            // steps 1-4, velocity, number of non-rest notes
            beats[i] = [-1, -1, -1, -1, 0.0, 0];
        }

        this._scale = [];
        this._scheduled_roots = [];
        this._scheduled_root_idx = 0;
        this._base_note_idx_in_scale = 0;
        this._base_note_offset = 48;
        this._next_bank_notes = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        this._next_bank_scale = [];
        this._next_bank_scheduled_roots = [];
        this._next_bank_base_note_idx_in_scale = 0;
        this._next_bank_base_note_offset = 48;
        this._non_empty_beats = 0;
        this._beats = beats;
        this._note_idx = 0;
        this._scheduled_until = 0.0;
        this._beat_idx = 0;
        this._reserved_notes = 5;

        this.update(null, null);
        this._reload_next_bank_scale(this.banks["b0"]);

        this._interval_length = SEQ_INTERVAL / 1000.0;
        this._interval = setInterval(bind(this, this.main_loop), SEQ_INTERVAL);
    }

    Sequencer.prototype.update = function (observable, arg)
    {
        var target_name, target_changed, is_active, target_voice;

        is_active = this.onoff.value === "on";
        target_name = this.target.value;
        target_changed = target_name !== this._target_name;
        target_voice = this._target_voice;

        if (target_voice !== null && target_changed) {
            target_voice.stop_scheduling();
            target_voice = null;
        }

        if (is_active) {
            this._stop = false;

            if (target_voice === null) {
                if (target_name === "comp") {
                    this._target_voice = target_voice = this._comp_voice;
                    this._target_note_ctl = this._virt_note_ctl;
                    this._target_vel_ctl = this._virt_vel_ctl;
                } else {
                    this._target_voice = target_voice = this._midi_voice;
                    this._target_note_ctl = this._midi_note_ctl;
                    this._target_vel_ctl = this._midi_vel_ctl;
                }

                this._reserved_notes = target_voice.start_scheduling();
            }

            if (!this._is_active) {
                this._beat_idx = 0;
                this._base_note_idx_in_scale = this._next_bank_base_note_idx_in_scale;
                this._base_note_offset = this._next_bank_base_note_offset;
                this._is_active = is_active;
            }
        } else {
            this._stop = this._is_active;
        }

        this._target_name = target_name;

        if ((this._next_bank_key = this.active_bank.value) !== this._active_bank_key) {
            this._next_bank_base_note_idx_in_scale = 0;
            this._next_bank_base_note_offset = 48;

            if (this._beat_idx < 1) {
                this._scheduled_root_idx = 0;
                this._reload_next_bank_scale(
                    this._active_bank = this.banks[this._active_bank_key = this._next_bank_key]
                );
            } else {
                this._reload_next_bank_scale(this.banks[this._next_bank_key]);
            }
        }

        if (is_active) {
            this.main_loop();
        }
    };

    Sequencer.prototype._reload_next_bank_scale = function (bank)
    {
        var next_bank_notes = this._next_bank_notes,
            scheduled_roots = [],
            old_scheduled_roots = this._next_bank_scheduled_roots,
            scale = [],
            scale_idx = 0,
            scale_params = bank.scale,
            scheduled_root_params = bank.scheduled_roots,
            prev_v = -1,
            offset = 0,
            i, l, v, r, osrl;

        for (i = 0, l = next_bank_notes.length; i < l; ++i) {
            next_bank_notes[i] = -1;
        }

        for (i = 0, l = scale_params.length; i < l; ++i) {
            if ((v = SEQ_NOTE_VALUES[scale_params[i].value]) > -1) {
                next_bank_notes[v] = scale_idx;
                ++scale_idx;

                if (v < prev_v) {
                    offset += 12;
                }

                scale.push(v + offset);
                prev_v = v;
            }
        }

        for (i = r = 0, l = scheduled_root_params.length, osrl = old_scheduled_roots.length; i < l; ++i) {
            v = scheduled_root_params[i].value.substring(1, 3);

            if (v === "x") {
                continue;
            }

            scheduled_roots.push(v = Number(v));

            if (r < osrl) {
                if (old_scheduled_roots[r] !== v) {
                    this._next_bank_scheduled_scheduled_root_idx = 0;
                }
            } else {
                this._next_bank_scheduled_scheduled_root_idx = 0;
            }

            ++r;
        }

        this._next_bank_scale = scale;
        this._next_bank_scheduled_roots = scheduled_roots;
    };

    Sequencer.prototype.main_loop = function ()
    {
        var note_idx, active_bank, bpm, arpeggio, detune, scale, scale_len,
            beat_len, beat_len_with_gap, scheduled_until, schedule_until, ct,
            beats, beat, beat_idx, beat_idx_p1, next_beat_idx, next_beat,
            non_empty_beats, velocity, target_voice, next_beat_non_rests,
            midi_note, base_note_idx, base_note_offset, next_active_bank_key,
            steps, beat_end, gap_inv, offset, events, new_events, is_inactive,
            target_note_ctl, target_vel_ctl, scheduled_roots,
            scheduled_root_idx, scheduled_roots_len, scheduled_root,
            note_start, note_ctl, vel_ctl, reserved, i, l, e;

        ct = this._audio_ctx.currentTime + 0.009;
        this._synth.clear_garbage(ct);

        events = this._events;
        l = events.length;

        if ((is_inactive = !this._is_active) && (l < 1)) {
            return;
        }

        new_events = [];

        for (i = 0; i < l; ++i) {
            e = events[i];

            if (e[0] <= ct) {
                e[1].set_value(e[2]);
            } else {
                new_events.push(e);
            }
        }

        this._events = new_events;

        if (is_inactive) {
            return;
        }

        active_bank = this._active_bank;
        beat_idx = this._beat_idx;
        non_empty_beats = this._non_empty_beats;
        target_voice = this._target_voice;
        target_note_ctl = this._target_note_ctl;
        target_vel_ctl = this._target_vel_ctl;

        if ((beat_idx < 1) || (non_empty_beats < 1)) {
            if (this._stop) {
                target_voice.stop_scheduling();
                this._target_voice = null;
                this._stop = false;
                this._is_active = false;
                this._next_bank_base_note_idx_in_scale = 0;
                this._next_bank_base_note_offset = 48;
                this._scheduled_root_idx = 0;
                return;
            }

            if ((next_active_bank_key = this._next_bank_key) !== this._active_bank_key) {
                active_bank = this._active_bank = this.banks[
                    this._active_bank_key = next_active_bank_key
                ];

                this._scheduled_root_idx = 0;
            }

            this._reload(active_bank);

            this._scale = this._next_bank_scale;
            this._scheduled_roots = this._next_bank_scheduled_roots;
            this._base_note_idx_in_scale = this._next_bank_base_note_idx_in_scale;
            this._base_note_offset = this._next_bank_base_note_offset;

            if ((non_empty_beats = this._non_empty_beats) < 1) {
                return;
            }
        }

        scale = this._scale;

        if ((scale_len = scale.length) < 1) {
            return;
        }

        scheduled_until = Math.max(ct, this._scheduled_until);
        schedule_until = ct + 1.5 * this._interval_length;
        beat_len = 60.0 / (bpm = Math.round(active_bank.tempo.value));

        this._prog_ctl.set_value(
            Math.max(
                0.0,
                Math.min(
                    1.0,
                    (ct - scheduled_until + beat_len * (beat_idx_p1 = beat_idx + 1)) / (beat_len * non_empty_beats)
                )
            )
        );

        if (scheduled_until >= schedule_until) {
            return;
        }

        scheduled_roots = this._scheduled_roots;
        scheduled_roots_len = scheduled_roots.length;
        scheduled_root_idx = this._scheduled_root_idx;
        scheduled_root = 0;

        gap_inv = 1.0 - Math.round(active_bank.gap.value) / 256.0;
        detune = active_bank.detune.value;
        beat_len_with_gap = beat_len * gap_inv;
        arpeggio = beat_len * (Math.round(active_bank.arpeggio.value) / 256.0);

        reserved = this._reserved_notes;
        note_idx = this._note_idx;
        base_note_idx = this._base_note_idx_in_scale;
        base_note_offset = this._base_note_offset;
        beats = this._beats;
        note_ctl = this._note_ctl;
        vel_ctl = this._vel_ctl;

        beat = beats[beat_idx];
        next_beat = beats[next_beat_idx = (beat_idx_p1 % non_empty_beats)];
        next_beat_non_rests = next_beat[5];

        while (scheduled_until < schedule_until) {
            if ((0 < scheduled_roots_len) && (scheduled_root_idx < scheduled_roots_len)) {
                scheduled_root = scheduled_roots[scheduled_root_idx];
            }

            velocity = beat[4];
            beat_end = scheduled_until + beat_len_with_gap;

            for (i = 3; i > -1; --i) {
                if ((steps = beat[i]) < 0) {
                    continue;
                }

                steps += base_note_idx + scheduled_root;
                midi_note = (
                    scale[steps % scale_len] + 12 * (Math.floor(steps / scale_len))
                    + detune
                    + base_note_offset
                );

                if ((0 > midi_note) || (127 < midi_note)) {
                    continue;
                }

                offset = (3 - i) * arpeggio;

                target_voice.schedule_note(note_start = scheduled_until + offset, note_idx, midi_note, velocity);
                target_voice.schedule_stop(beat_end + offset, note_idx);

                midi_note /= 127.0;

                new_events.push([note_start, note_ctl, midi_note]);
                new_events.push([note_start, vel_ctl, velocity]);

                new_events.push([note_start, target_note_ctl, midi_note]);
                new_events.push([note_start, target_vel_ctl, velocity]);

                if (++note_idx >= reserved) {
                    note_idx = 0;
                }
            }

            if ((0 < scheduled_roots_len) && (next_beat_idx <= beat_idx)) {
                scheduled_root_idx = (scheduled_root_idx + 1) % scheduled_roots_len;
            }

            scheduled_until = scheduled_until + beat_len;
            beat = next_beat;
            beat_idx = next_beat_idx;
            next_beat_idx = (beat_idx + 1) % non_empty_beats;
            next_beat = beats[next_beat_idx];
            next_beat_non_rests = next_beat[5];
        }

        this._note_idx = note_idx;
        this._scheduled_until = scheduled_until;
        this._beat_idx = beat_idx;
        this._scheduled_root_idx = scheduled_root_idx;
    };

    Sequencer.prototype._reload = function (active_bank)
    {
        var beats = this._beats,
            non_empty_beats = 0,
            non_rests, beats_params, velocity_params, beat_params, beat,
            i, j, l, ll, v;

        this._reload_next_bank_scale(active_bank);

        beats_params = active_bank.beats;
        velocity_params = active_bank.velocities;

        for (i = 0, l = beats_params.length; i < l; ++i) {
            beat_params = beats_params[i];
            beat = beats[i];
            non_rests = 0;

            for (j = 0, ll = beat_params.length; j < ll; ++j) {
                v = beat_params[j].value.substring(1, 3);

                if (v === "x") {
                    beat[j] = -1;
                } else if (v === "r") {
                    beat[j] = -1;
                    non_empty_beats = i + 1;
                } else {
                    beat[j] = Number(v);
                    non_empty_beats = i + 1;
                    ++non_rests;
                }
            }

            beat[4] = Number(velocity_params[i].value.substring(1, 3)) / 20.0;
            beat[5] = non_rests;
        }

        this._non_empty_beats = non_empty_beats;
    };

    Sequencer.prototype.set_base_note = function (midi_note) {
        var mod = midi_note % 12,
            idx;

        if ((idx = this._next_bank_notes[mod]) > -1) {
            this._next_bank_base_note_idx_in_scale = idx;
            this._next_bank_base_note_offset = (
                midi_note - mod - (
                    (12 * Math.floor(this._next_bank_scale[idx] / 12.0)) | 0
                )
            );
        }
    };

    function SequencerBank(synth, key)
    {
        var scale = [],
            scheduled_roots = [],
            beats = [],
            velocities = [],
            i, si, k;

        for (i = 0; i < 12; ++i) {
            si = String(i);
            k = "n" + si;

            if (!SEQ_NOTE_NAMES.hasOwnProperty(k)) {
                k = "s" + si;
            }

            scale.push(new EnumParam(synth, key + "_scl" + si, SEQ_NOTE_NAMES, k));

            scheduled_roots.push(new EnumParam(synth, key + "_r" + si, SEQ_ROOTS, "rx"));
        }

        for (i = 0; i < SEQ_BEATS; ++i) {
            si = String(i);
            velocities.push(new EnumParam(synth, key + "_v" + si, SEQ_VELOCITIES, "v12"));
            beats.push([
                new EnumParam(synth, key + "_b" + si + "_3", SEQ_STEPS, "sx"),
                new EnumParam(synth, key + "_b" + si + "_2", SEQ_STEPS, "sx"),
                new EnumParam(synth, key + "_b" + si + "_1", SEQ_STEPS, "sx"),
                new EnumParam(synth, key + "_b" + si + "_0", SEQ_STEPS, "sx")
            ]);
        }

        this.tempo = new MIDIControllableParam(synth, key + "_bpm", 3, 999, 144);
        this.arpeggio = new MIDIControllableParam(synth, key + "_arp", 0, 256, 0);
        this.gap = new MIDIControllableParam(synth, key + "_gap", 0, 255, 8);
        this.detune = new DetuneParam(synth, key + "_dt", null, 1, -48, 48, 0);
        this.scale = scale;
        this.scheduled_roots = scheduled_roots;
        this.beats = beats;
        this.velocities = velocities;
    }

    function Voice(synth, key, poliphony, frequencies, output)
    {
        var active_notes = [],
            available_notes = [],
            volume = new GainNode(synth.audio_ctx, {"gain": 1.0}),
            am_vol = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            fm_vol = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            effects, i;
            i;

        Observer.call(this);

        am_vol.offset.value = 0.0;
        fm_vol.offset.value = 0.0;

        for (i = 0; i < 128; ++i) {
            active_notes.push(null);
        }

        for (i = 0; i < poliphony; ++i) {
            available_notes.push(i);
        }

        effects = new Effects(synth, key, volume);
        volume.connect(output);

        this._audio_ctx = synth.audio_ctx;
        this._active_notes = active_notes;
        this._available_notes = available_notes;
        this._scheduled_notes = [];
        this._vol = volume;
        this._am_vol = am_vol;
        this._fm_vol = fm_vol;
        this._mod = MOD_MASKS["m1"];
        this._split = null;
        this._poliphony = poliphony;
        this.effects = effects;

        this.volume = new LFOControllableParam(synth, key + "_vl", volume.gain, 0.0, 1.0, 0.5);
        this.modulation = new EnumParam(synth, key + "_md", MOD_NAMES, "m1");
        this.am_volume = new LFOControllableParam(synth, key + "_avl", am_vol.offset, 0.0, 3.0, 0.5);
        this.fm_volume = new LFOControllableParam(synth, key + "_fvl", fm_vol.offset, 0.0, 300.0, 5.0);

        this.osc_2 = new MIDINoteBasedCarrier(
            synth, key + "_o2", poliphony, frequencies, effects.input, null, null, null
        );
        this.osc_1 = new MIDINoteBasedModulator(
            synth, key + "_o1", poliphony, frequencies, effects.input, this.osc_2, am_vol, fm_vol
        );

        this.modulation.observers.push(this);
    }

    Voice.prototype.update = function (modulation, arg)
    {
        this.osc_1.modulate(MOD_MASKS[arg]);
        this._split = SPLITS[arg];
    };

    Voice.prototype.start = function (when)
    {
        this.osc_1.start(when);
        this.osc_2.start(when);
        this._am_vol.start(when);
        this._fm_vol.start(when);
    };

    Voice.prototype.trigger_note = function (now, when, midi_note, velocity)
    {
        var active_notes = this._active_notes,
            note_idx;

        if (active_notes[midi_note] !== null) {
            return;
        }

        if ((note_idx = this._available_notes.shift()) === undefined) {
            return;
        }

        active_notes[midi_note] = note_idx;

        this._trigger_note(now, when, note_idx, midi_note, velocity);
    };

    Voice.prototype._trigger_note = function (now, when, note_idx, midi_note, velocity)
    {
        var split = this._split;

        if (split === null) {
            this.osc_1.trigger_note(now, when, note_idx, midi_note, velocity);
            this.osc_2.trigger_note(now, when, note_idx, midi_note, velocity);
        } else {
            if (midi_note < split) {
                this.osc_1.trigger_note(now, when, note_idx, midi_note, velocity);
            } else {
                this.osc_2.trigger_note(now, when, note_idx, midi_note, velocity);
            }
        }
    };

    Voice.prototype.schedule_note = function (when, note_idx, midi_note, velocity)
    {
        this._trigger_note(when, when, note_idx, midi_note, velocity);
    };

    Voice.prototype.stop_note = function (when, midi_note)
    {
        var active_notes = this._active_notes,
            note_idx;

        if ((note_idx = active_notes[midi_note]) === null) {
            return;
        }

        active_notes[midi_note] = null;

        this.osc_1.stop_note(when, note_idx);
        this.osc_2.stop_note(when, note_idx);

        this._available_notes.push(note_idx);
    };

    Voice.prototype.schedule_stop = function (when, note_idx)
    {
        this.osc_1.stop_note(when, note_idx);
        this.osc_2.stop_note(when, note_idx);
    };

    Voice.prototype.start_scheduling = function ()
    {
        var active_notes = this._active_notes,
            available_notes = this._available_notes,
            scheduled_notes = this._scheduled_notes,
            sn = 0,
            osc_1 = this.osc_1,
            osc_2 = this.osc_2,
            reserved = Math.min(5, this._poliphony),
            i, l, n, ct;

        while ((0 < available_notes.length) && (sn < reserved)) {
            scheduled_notes.push(available_notes.shift());
            ++sn;
        }

        ct = this._audio_ctx.currentTime;

        for (i = 0, l = active_notes.length; (i < l) && (sn < reserved); ++i) {
            if (active_notes[i] !== null) {
                n = active_notes[i];
                osc_1.cancel_note(ct, n);
                osc_2.cancel_note(ct, n);
                scheduled_notes.push(n);
                active_notes[i] = null;
                ++sn;
            }
        }

        return sn;
    };

    Voice.prototype.stop_scheduling = function ()
    {
        var scheduled_notes = this._scheduled_notes,
            available_notes = this._available_notes,
            osc_1 = this.osc_1,
            osc_2 = this.osc_2,
            ct = this._audio_ctx.currentTime,
            n;

        while (0 < scheduled_notes.length) {
            n = scheduled_notes.shift();

            available_notes.push(n);
        }
    };

    function Effects(synth, key, output)
    {
        var overdrive, distortion, low_shelf, high_shelf, echo, reverb;

        reverb = new Reverb(synth, key + "_rev", output);
        echo = new Echo(synth, key + "_ech", reverb.input);
        high_shelf = new ShelfFilter(synth, key + "_hs", "highshelf", 5000, echo.input);
        low_shelf = new ShelfFilter(synth, key + "_ls", "lowshelf", 250, high_shelf.input);
        distortion = new Distortion(synth, key + "_dst", low_shelf.input, 10);
        overdrive = new Distortion(synth, key + "_od", distortion.input, 3);

        overdrive.bypass();
        distortion.bypass();
        low_shelf.bypass();
        high_shelf.bypass();
        echo.bypass();
        reverb.bypass();

        this.overdrive = overdrive;
        this.distortion = distortion;
        this.low_shelf = low_shelf;
        this.high_shelf = high_shelf;
        this.reverb = reverb;
        this.echo = echo;

        this.input = overdrive.input;
        this.output = reverb.output;
    }

    function Effect(synth, key, output)
    {
        var input = new GainNode(synth.audio_ctx, {"gain": 1.0}),
            onoff = new OnOffParam(synth, key + "_st");

        Observer.call(this);

        this._input_connections = [];
        this._output_connections = [];

        this.onoff = onoff;
        this.input = input;
        this.output = output;

        onoff.observers.push(this);
    }

    Effect.prototype.update = function (state_param, new_state)
    {
        if (new_state === "on") {
            this.engage();
        } else {
            this.bypass();
        }
    };

    Effect.prototype.bypass = function ()
    {
        var output_connections = this._output_connections,
            i, l;

        for (i = 0, l = output_connections.length; i < l; ++i) {
            output_connections[i].disconnect();
        }

        this.input.disconnect();
        this.input.connect(this.output);
    };

    Effect.prototype.engage = function ()
    {
        var output_connections = this._output_connections,
            input_connections = this._input_connections,
            input = this.input,
            output = this.output,
            i, l;

        this.input.disconnect();

        for (i = 0, l = input_connections.length; i < l; ++i) {
            input.connect(input_connections[i]);
        }

        for (i = 0, l = output_connections.length; i < l; ++i) {
            output_connections[i].connect(output);
        }
    };

    function LogLinBiquadFilter(synth, filter_type)
    {
        var filter = new BiquadFilterNode(
                synth.audio_ctx,
                {
                    "type": filter_type,
                    "Q": 0.0,
                    "frequency": SND_FREQ_MIN,
                    "gain": 0.0,
                    "channelCount": 1
                }
            ),
            freq_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            freq_shaper = new WaveShaperNode(synth.audio_ctx, {"curve": filter_freq_curve_lin}),
            freq_scale = new GainNode(synth.audio_ctx, {"gain": SND_FREQ_DELTA});

        Observer.call(this);

        freq_cns.offset.value = 0.0;
        freq_cns.connect(freq_shaper);
        freq_shaper.connect(freq_scale);
        freq_scale.connect(filter.frequency)

        freq_cns.start(0.0);

        this._freq_cns = freq_cns;
        this._freq_shaper = freq_shaper;
        this._freq_scale = freq_scale;
        this._log_freq = null;

        this.filter = filter;
        this.frequency = freq_cns.offset;
        this.Q = filter.Q;
    }

    LogLinBiquadFilter.prototype.set_log_freq = function (log_freq)
    {
        this._log_freq = log_freq;

        log_freq.observers.push(this);
    }

    LogLinBiquadFilter.prototype.update = function (log_freq, value)
    {
        if (value == "on") {
            this._freq_shaper.curve = filter_freq_curve_log;
        } else {
            this._freq_shaper.curve = filter_freq_curve_lin;
        }
    }

    function LFOCompatibleBiquadFilter(synth, key, filter_type, default_freq, output)
    {
        var filter = new LogLinBiquadFilter(synth, filter_type);

        Effect.call(this, synth, key, output);

        this._filter = filter;
        this._input_connections = this._output_connections = [filter.filter];

        this.log_freq = new OnOffParam(synth, key + "lg", "on");
        this.freq = new LFOControllableParam(synth, key + "f", filter.frequency, FILTER_FREQ_MIN, FILTER_FREQ_MAX, default_freq);
        this.q = new LFOControllableParam(synth, key + "q", filter.Q, FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF);

        filter.set_log_freq(this.log_freq);
    }

    LFOCompatibleBiquadFilter.prototype.update = Effect.prototype.update;
    LFOCompatibleBiquadFilter.prototype.bypass = Effect.prototype.bypass;
    LFOCompatibleBiquadFilter.prototype.engage = Effect.prototype.engage;

    function ShelfFilter(synth, key, filter_type, default_freq, output)
    {
        var filter = new BiquadFilterNode(
                synth.audio_ctx,
                {
                    "type": filter_type,
                    "Q": FILTER_Q_DEF,
                    "frequency": default_freq,
                    "gain": 0.0
                }
            );

        Effect.call(this, synth, key, output);

        this._filter = filter;
        this._input_connections = this._output_connections = [filter];

        this.freq = new LFOControllableParam(synth, key + "f", filter.frequency, SND_FREQ_MIN, SND_FREQ_MAX, default_freq);
        this.gain = new LFOControllableParam(synth, key + "g", this._filter.gain, -48.0, +24.0, 0.0);
    }

    ShelfFilter.prototype.update = Effect.prototype.update;
    ShelfFilter.prototype.bypass = Effect.prototype.bypass;
    ShelfFilter.prototype.engage = Effect.prototype.engage;

    function Distortion(synth, key, output, steepness)
    {
        var curve = [],
            ct = synth.audio_ctx.currentTime,
            gain_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            dry_gain = new GainNode(synth.audio_ctx, {"gain": 1.0}),
            inv_gain = new GainNode(synth.audio_ctx, {"gain": -1.0}),
            wet_gain = new GainNode(synth.audio_ctx, {"gain": 0.0}),
            exp = Math.exp,
            ws, i, l;

        Effect.call(this, synth, key, output);

        for (i = 0; i < 5000; ++i) {
            curve.push(
                2.0 / (1.0 + exp((-steepness * (i - 2500.0)) / 2500.0)) - 1.0
            );
        }

        ws = new WaveShaperNode(synth.audio_ctx, {"curve": new Float32Array(curve)});

        gain_cns.offset.value = 0.0;
        gain_cns.connect(wet_gain.gain);
        gain_cns.connect(inv_gain);
        inv_gain.connect(dry_gain.gain);
        ws.connect(wet_gain);

        gain_cns.start(ct);

        this._ws = ws;
        this._amount_cns = gain_cns;

        this._output_connections = [wet_gain, dry_gain];
        this._input_connections = [ws, dry_gain];

        this.gain = new LFOControllableParam(synth, key + "_gn", gain_cns.offset, 0.0, 1.0, 0.3);
    }

    Distortion.prototype.update = Effect.prototype.update;
    Distortion.prototype.bypass = Effect.prototype.bypass;
    Distortion.prototype.engage = Effect.prototype.engage;

    function Reverb(synth, key, output)
    {
        /*
        Based on Freeverb: https://ccrma.stanford.edu/~jos/pasp/Freeverb.html

        Changes:
         * Only half of the comb filters and allpass filters are used for
           each channel in order to reduce CPU usage.
         * A high-shelf filter is used instead of a low-pass in order to have
           more control over damping.
        */

        var comb_tunings = [1557.0, 1617.0, 1491.0, 1422.0, 1277.0, 1356.0, 1188.0, 1116.0],
            allpass_freqs = [225.0, 556.0, 441.0, 341.0],
            damping_freq_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            damping_gain_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            feedback_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            width_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            highpass = new BiquadFilterNode(
                synth.audio_ctx,
                {
                    "type": "highpass",
                    "frequency": 100.0,
                    "Q": 1.0,
                    "gain": 0.0
                }
            ),
            splitter = new ChannelSplitterNode(synth.audio_ctx, {"numberOfOutputs": 2}),
            merger = new ChannelMergerNode(synth.audio_ctx, {"numberOfInputs": 2}),
            dry_gain = new GainNode(synth.audio_ctx, {"gain": 0.7}),
            wet_gain = new GainNode(synth.audio_ctx, {"gain": 0.3}),
            out_left = new GainNode(synth.audio_ctx, {"gain": 1.0, "channelCount": 1}),
            out_right = new GainNode(synth.audio_ctx, {"gain": 1.0, "channelCount": 1}),
            wet1_left = new GainNode(synth.audio_ctx, {"gain": 0.5, "channelCount": 1}),
            wet2_left = new GainNode(synth.audio_ctx, {"gain": 0.5, "channelCount": 1}),
            wet1_right = new GainNode(synth.audio_ctx, {"gain": 0.5, "channelCount": 1}),
            wet2_right = new GainNode(synth.audio_ctx, {"gain": 0.5, "channelCount": 1}),
            inv_left = new GainNode(synth.audio_ctx, {"gain": -1.0, "channelCount": 1}),
            inv_right = new GainNode(synth.audio_ctx, {"gain": -1.0, "channelCount": 1}),
            combs_left = [],
            combs_right = [],
            aps_left = [],
            aps_right = [],
            ct = synth.audio_ctx.currentTime,
            filter_left, filter_right,
            prev_filter_left, prev_filter_right,
            i, l, t;

        Effect.call(this, synth, key, output);

        dry_gain.gain.value = 0.7;
        wet_gain.gain.valeu = 0.3;
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

        prev_filter_left = null;
        prev_filter_right = null;

        for (i = 0, l = allpass_freqs.length; i < l; ++i) {
            t = allpass_freqs[i];

            if (0 < (i & 1)) {
                filter_left = new BiquadFilterNode(
                    synth.audio_ctx,
                    {
                        "type": "allpass",
                        "Q": 1.0,
                        "frequency": t,
                        "gain": 0.0,
                        "channelCount": 1
                    }
                );

                if (prev_filter_left !== null) {
                    prev_filter_left.connect(filter_left);
                }

                aps_left.push(filter_left);
                prev_filter_left = filter_left;
            } else {
                filter_right = new BiquadFilterNode(
                    synth.audio_ctx,
                    {
                        "type": "allpass",
                        "Q": 1.0,
                        "frequency": t,
                        "gain": 0.0,
                        "channelCount": 1
                    }
                );

                if (prev_filter_right !== null) {
                    prev_filter_right.connect(filter_right);
                }

                aps_right.push(filter_right);
                prev_filter_right = filter_right;
            }
        }

        filter_left.connect(out_left);
        filter_right.connect(out_right);

        highpass.frequency.value = 100.0;
        highpass.connect(splitter);

        for (i = 0, l = comb_tunings.length; i < l; ++i) {
            t = comb_tunings[i] / 44100.0;

            if (0 < (i & 2)) {
                filter_left = new LowpassCombFilter(synth, t, damping_freq_cns, damping_gain_cns, feedback_cns);
                splitter.connect(filter_left.input, 0);
                filter_left.output.connect(aps_left[0]);
                combs_left.push(filter_left);
            } else {
                filter_right = new LowpassCombFilter(synth, t, damping_freq_cns, damping_gain_cns, feedback_cns);
                splitter.connect(filter_right.input, 1);
                filter_right.output.connect(aps_right[0]);
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

        this._combs_left = combs_left;
        this._combs_right = combs_right;
        this._aps_left = aps_left;
        this._aps_right = aps_right;

        this._damping_freq_cns = damping_freq_cns;
        this._damping_gain_cns = damping_gain_cns;
        this._feedback_cns = feedback_cns;
        this._width_cns = width_cns;
        this._highpass = highpass;
        this._splitter = splitter;
        this._merger = merger;
        this._dry_gain = dry_gain;
        this._wet_gain = wet_gain;
        this._out_left = out_left;
        this._out_right = out_right;
        this._wet1_left = wet1_left;
        this._wet2_left = wet2_left;
        this._wet1_right = wet1_right;
        this._wet2_right = wet2_right;
        this._inv_left = inv_left;
        this._inv_right = inv_right;

        this._output_connections = [wet_gain, dry_gain];
        this._input_connections = [highpass, dry_gain];

        this.dry = new LFOControllableParam(synth, key + "_dry", dry_gain.gain, 0.0, 1.0, 0.7);
        this.wet = new LFOControllableParam(synth, key + "_wet", wet_gain.gain, 0.0, 1.0, 0.3);
        this.highpass_freq = new LFOControllableParam(synth, key + "_hpf", highpass.frequency, SND_FREQ_MIN, SND_FREQ_MAX, 100.0);
        this.damping_freq = new LFOControllableParam(synth, key + "_df", damping_freq_cns.offset, SND_FREQ_MIN, SND_FREQ_MAX, 6000.0);
        this.damping_gain = new LFOControllableParam(synth, key + "_dg", damping_gain_cns.offset, -24.0, -1.0, -6.0);
        this.room_size = new LFOControllableParam(synth, key + "_rsz", feedback_cns.offset, 0.0, 0.99, 0.8);
        this.width = new LFOControllableParam(synth, key + "_w", width_cns.offset, -0.5, 0.5, -0.25);
    }

    Reverb.prototype.update = Effect.prototype.update;
    Reverb.prototype.bypass = Effect.prototype.bypass;
    Reverb.prototype.engage = Effect.prototype.engage;

    function LowpassCombFilter(synth, delay_t, damping_freq_cns, damping_gain_cns, feedback_cns)
    {
        var delay = new DelayNode(synth.audio_ctx, {"maxDelayTime": 1.0, "channelCount": 1}),
            gain = new GainNode(synth.audio_ctx, {"gain": 0.0, "channelCount": 1}),
            highshelf = new BiquadFilterNode(
                synth.audio_ctx,
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

    function Echo(synth, key, output)
    {
        var dry_gain = new GainNode(synth.audio_ctx, {"gain": 0.9}),
            wet_gain = new GainNode(synth.audio_ctx, {"gain": 0.5}),
            delay_1 = new DelayNode(synth.audio_ctx, {"maxDelayTime": 4.0}),
            delay_2 = new DelayNode(synth.audio_ctx, {"maxDelayTime": 4.0}),
            pan_1 = new StereoPannerNode(synth.audio_ctx),
            pan_2 = new StereoPannerNode(synth.audio_ctx),
            gain_1 = new GainNode(synth.audio_ctx, {"gain": 0.0}),
            gain_2 = new GainNode(synth.audio_ctx, {"gain": 0.0}),
            delay_time_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            feedback_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            width_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            width_inv = new GainNode(synth.audio_ctx, {"gain": -1.0}),
            damping_freq_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            damping_gain_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            highpass = new BiquadFilterNode(
                synth.audio_ctx,
                {
                    "type": "highpass",
                    "Q": 1.0,
                    "frequency": 100.0,
                    "gain": 0.0
                }
            ),
            highshelf_1 = new BiquadFilterNode(
                synth.audio_ctx,
                {
                    "type": "highshelf",
                    "Q": 1.0,
                    "frequency": 0.0,
                    "gain": 0.0,
                    "channelCount": 1
                }
            ),
            highshelf_2 = new BiquadFilterNode(
                synth.audio_ctx,
                {
                    "type": "highshelf",
                    "Q": 1.0,
                    "frequency": 0.0,
                    "gain": 0.0,
                    "channelCount": 1
                }
            ),
            ct = synth.audio_ctx.currentTime;

        Effect.call(this, synth, key, output);

        dry_gain.gain.value = 0.9;
        wet_gain.gain.valeu = 0.5;
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

        this._input_connections = [highpass, dry_gain];
        this._output_connections = [wet_gain, dry_gain];

        this.delay = new LFOControllableParam(synth, key + "_dly", delay_time_cns.offset, 0.001, 3.0, 0.4);
        this.dry = new LFOControllableParam(synth, key + "_dry", dry_gain.gain, 0.0, 1.0, 0.9);
        this.wet = new LFOControllableParam(synth, key + "_wet", wet_gain.gain, 0.0, 1.0, 0.5);
        this.highpass_freq = new LFOControllableParam(synth, key + "_hpf", highpass.frequency, SND_FREQ_MIN, SND_FREQ_MAX, 100.0);
        this.damping_freq = new LFOControllableParam(synth, key + "_df", damping_freq_cns.offset, SND_FREQ_MIN, SND_FREQ_MAX, 6000.0);
        this.damping_gain = new LFOControllableParam(synth, key + "_dg", damping_gain_cns.offset, -24.0, -1.0, -6.0);
        this.feedback = new LFOControllableParam(synth, key + "_rsz", feedback_cns.offset, 0.0, 0.99, 0.5);
        this.width = new LFOControllableParam(synth, key + "_w", width_cns.offset, -1.0, 1.0, -0.5);
    }

    Echo.prototype.update = Effect.prototype.update;
    Echo.prototype.bypass = Effect.prototype.bypass;
    Echo.prototype.engage = Effect.prototype.engage;

    function ComplexOscillator(
            synth, key, output, volume_param_target,
            lfo_highpass_params, lfo_lowpass_params
    ) {
        var pan, waveform_key, custom_waveform_key, ehp_onoff_key, elp_onoff_key,
            env_highpass_onoff, env_lowpass_onoff,
            folding_cns,
            i;

        Observable.call(this);
        Observer.call(this);

        this._synth = synth;

        pan = new StereoPannerNode(synth.audio_ctx);
        pan.connect(output);

        folding_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});
        folding_cns.offset.value = 0.0;

        this._key = key;
        this._pan = pan;
        this._folding_cns = folding_cns;

        this._waveform_key = waveform_key = key + "_wf";
        this.waveform = new EnumParam(synth, waveform_key, OSC_WAVEFORMS, "sine");
        this.waveform.observers.push(this);

        this._custom_waveform_key = custom_waveform_key = key + "_cwf";
        this._is_custom_waveform_dirty = false;
        this.custom_waveform = new CustomWaveParams(synth, custom_waveform_key);
        this.custom_waveform.observers.push(this);

        this.volume = new LFOControllableParam(synth, key + "_vl", volume_param_target, 0.0, 1.0 / FOLD_THRESHOLD, 0.5 / FOLD_THRESHOLD);
        this.pan = new LFOControllableParam(synth, key + "_pn", pan.pan, -1.0, 1.0, 0.0);
        this.width = new MIDIControllableParam(synth, key + "_wd", -1.0, 1.0, 0.2);
        this.folding = new LFOControllableParam(synth, key + "_fl", folding_cns.offset, 0.0, FOLD_MAX, 0.0);

        this.amp_env_params = [
            new MIDIControllableParam(synth, key + "_edl", ENV_DEL_MIN, ENV_DEL_MAX, ENV_DEL_DEF),
            new MIDIControllableParam(synth, key + "_ea", ENV_ATK_MIN, ENV_ATK_MAX, ENV_ATK_DEF),
            new MIDIControllableParam(synth, key + "_ep", ENV_VOL_MIN, ENV_VOL_MAX, ENV_PEAK_DEF),
            new MIDIControllableParam(synth, key + "_eh", ENV_HLD_MIN, ENV_HLD_MAX, ENV_HLD_DEF),
            new MIDIControllableParam(synth, key + "_ed", ENV_DEC_MIN, ENV_DEC_MAX, ENV_DEC_DEF),
            new MIDIControllableParam(synth, key + "_es", ENV_VOL_MIN, ENV_VOL_MAX, ENV_SUS_DEF),
            new MIDIControllableParam(synth, key + "_er", ENV_REL_MIN, ENV_REL_MAX, ENV_REL_DEF)
        ];

        this.env_prefold_amp_params = [
            new MIDIControllableParam(synth, key + "_pfia", ENV_VOL_MIN, ENV_VOL_MAX, ENV_VOL_MAX),
            new MIDIControllableParam(synth, key + "_pfdlt", ENV_DEL_MIN, ENV_DEL_MAX, ENV_DEL_DEF),
            new MIDIControllableParam(synth, key + "_pfat", ENV_ATK_MIN, ENV_ATK_MAX, ENV_ATK_DEF),
            new MIDIControllableParam(synth, key + "_pfpa", ENV_VOL_MIN, ENV_VOL_MAX, ENV_VOL_MAX),
            new MIDIControllableParam(synth, key + "_pfht", ENV_HLD_MIN, ENV_HLD_MAX, ENV_HLD_DEF),
            new MIDIControllableParam(synth, key + "_pfdt", ENV_DEC_MIN, ENV_DEC_MAX, ENV_DEC_DEF),
            new MIDIControllableParam(synth, key + "_pfsa", ENV_VOL_MIN, ENV_VOL_MAX, ENV_VOL_MAX),
            new MIDIControllableParam(synth, key + "_pfrt", ENV_REL_MIN, ENV_REL_MAX, ENV_REL_DEF),
            new MIDIControllableParam(synth, key + "_pfra", ENV_VOL_MIN, ENV_VOL_MAX, ENV_VOL_MAX)
        ];

        ehp_onoff_key = key + "_eho";
        this.env_highpass_onoff = env_highpass_onoff = new OnOffParam(synth, ehp_onoff_key);
        this.env_highpass_log_freq = new OnOffParam(synth, key + "_ehlg", "on");

        this.env_highpass_params = [
            new MIDIControllableParam(synth, key + "_ehif", FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MIN),
            new MIDIControllableParam(synth, key + "_ehdlt", ENV_DEL_MIN, ENV_DEL_MAX, ENV_DEL_DEF),
            new MIDIControllableParam(synth, key + "_ehat", ENV_ATK_MIN, ENV_ATK_MAX, ENV_ATK_DEF),
            new MIDIControllableParam(synth, key + "_ehpf", FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MIN),
            new MIDIControllableParam(synth, key + "_ehht", ENV_HLD_MIN, ENV_HLD_MAX, ENV_HLD_DEF),
            new MIDIControllableParam(synth, key + "_ehdt", ENV_DEC_MIN, ENV_DEC_MAX, ENV_DEC_DEF),
            new MIDIControllableParam(synth, key + "_ehsf", FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MIN),
            new MIDIControllableParam(synth, key + "_ehrt", ENV_REL_MIN, ENV_REL_MAX, ENV_REL_DEF),
            new MIDIControllableParam(synth, key + "_ehrf", FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MIN),

            new MIDIControllableParam(synth, key + "_ehqi", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF),
            new MIDIControllableParam(synth, key + "_ehqdlt", ENV_DEL_MIN, ENV_DEL_MAX, ENV_DEL_DEF),
            new MIDIControllableParam(synth, key + "_ehqat", ENV_ATK_MIN, ENV_ATK_MAX, ENV_ATK_DEF),
            new MIDIControllableParam(synth, key + "_ehqp", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF),
            new MIDIControllableParam(synth, key + "_ehqht", ENV_HLD_MIN, ENV_HLD_MAX, ENV_HLD_DEF),
            new MIDIControllableParam(synth, key + "_ehqdt", ENV_DEC_MIN, ENV_DEC_MAX, ENV_DEC_DEF),
            new MIDIControllableParam(synth, key + "_ehqs", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF),
            new MIDIControllableParam(synth, key + "_ehqrt", ENV_REL_MIN, ENV_REL_MAX, ENV_REL_DEF),
            new MIDIControllableParam(synth, key + "_ehqr", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF)
        ];

        elp_onoff_key = key + "_elo";
        this.env_lowpass_onoff = env_lowpass_onoff = new OnOffParam(synth, elp_onoff_key);
        this.env_lowpass_log_freq = new OnOffParam(synth, key + "_ellg", "on");

        this.env_lowpass_params = [
            new MIDIControllableParam(synth, key + "_elif", FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MAX),
            new MIDIControllableParam(synth, key + "_eldlt", ENV_DEL_MIN, ENV_DEL_MAX, ENV_DEL_DEF),
            new MIDIControllableParam(synth, key + "_elat", ENV_ATK_MIN, ENV_ATK_MAX, ENV_ATK_DEF),
            new MIDIControllableParam(synth, key + "_elpf", FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MAX),
            new MIDIControllableParam(synth, key + "_elht", ENV_HLD_MIN, ENV_HLD_MAX, ENV_HLD_DEF),
            new MIDIControllableParam(synth, key + "_eldt", ENV_DEC_MIN, ENV_DEC_MAX, ENV_DEC_DEF),
            new MIDIControllableParam(synth, key + "_elsf", FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MAX),
            new MIDIControllableParam(synth, key + "_elrt", ENV_REL_MIN, ENV_REL_MAX, ENV_REL_DEF),
            new MIDIControllableParam(synth, key + "_elrf", FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MAX),

            new MIDIControllableParam(synth, key + "_elqi", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF),
            new MIDIControllableParam(synth, key + "_elqdlt", ENV_DEL_MIN, ENV_DEL_MAX, ENV_DEL_DEF),
            new MIDIControllableParam(synth, key + "_elqat", ENV_ATK_MIN, ENV_ATK_MAX, ENV_ATK_DEF),
            new MIDIControllableParam(synth, key + "_elqp", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF),
            new MIDIControllableParam(synth, key + "_elqht", ENV_HLD_MIN, ENV_HLD_MAX, ENV_HLD_DEF),
            new MIDIControllableParam(synth, key + "_elqdt", ENV_DEC_MIN, ENV_DEC_MAX, ENV_DEC_DEF),
            new MIDIControllableParam(synth, key + "_elqs", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF),
            new MIDIControllableParam(synth, key + "_elqrt", ENV_REL_MIN, ENV_REL_MAX, ENV_REL_DEF),
            new MIDIControllableParam(synth, key + "_elqr", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF)
        ];

        env_highpass_onoff.observers.push(this);
        env_lowpass_onoff.observers.push(this);

        this._filter_flags = {};
        this._filter_flags[ehp_onoff_key] = ENV_HP_FLAG;
        this._filter_flags[elp_onoff_key] = ENV_LP_FLAG;

        this.lfo_highpass_params = lfo_highpass_params;
        this.lfo_lowpass_params = lfo_lowpass_params;
    }

    ComplexOscillator.prototype.notify_observers = Observable.prototype.notify_observers;
    ComplexOscillator.prototype.update = Observer.prototype.update;

    ComplexOscillator.prototype.start = function (when)
    {
        this._folding_cns.start(when);
    };

    ComplexOscillator.prototype.update_dirty_custom_wave = function ()
    {
    };

    function MIDINoteBasedOscillator(
            synth, key, poliphony, frequencies, output,
            lfo_highpass_params, lfo_lowpass_params
    ) {
        var notes = [],
            vol_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            fine_detune_cns,
            detune_cns,
            i, note;

        ComplexOscillator.call(
            this,
            synth, key, output, vol_cns.offset,
            lfo_highpass_params, lfo_lowpass_params
        );

        vol_cns.offset.value = 0.0;
        this._vol_cns = vol_cns;

        fine_detune_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});
        fine_detune_cns.offset.value = 0.0;
        this._fine_detune_cns = fine_detune_cns;

        detune_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});
        detune_cns.offset.value = 0.0;
        this._detune_cns = detune_cns;

        this._frequencies = frequencies;

        this._notes = [];
        this._last_freq = null;

        this.velocity_sensitivity = new MIDIControllableParam(synth, key + "_v", 0.0, 1.0, 1.0);
        this.vel_ovsens = new MIDIControllableParam(synth, key + "_vs", 0.0, 1.0, 0.0);
        this.prt_time = new MIDIControllableParam(synth, key + "_prt", PRT_TIME_MIN, PRT_TIME_MAX, PRT_TIME_DEF);
        this.prt_depth = new MIDIControllableParam(synth, key + "_prd", -2400.0, 2400.0, 0.0);
        this.detune = new DetuneParam(synth, key + "_dt", detune_cns.offset, 100, -48, 48, 0);
        this.fine_detune = new LFOControllableParam(synth, key + "_fd", fine_detune_cns.offset, -400.0, 400.0, 0.0);
    }

    MIDINoteBasedOscillator.prototype.notify_observers = Observable.prototype.notify_observers;

    MIDINoteBasedOscillator.prototype.update = function (param, new_value)
    {
        var notes = this._notes,
            flags = this._filter_flags,
            key = param.key,
            i, l, flag;

        if (key === this._waveform_key) {
            if (new_value === "custom") {
                this._is_custom_waveform_dirty = true;
                this._synth.update_dirty_custom_waves();
            } else {
                this._is_custom_waveform_dirty = false;
                for (i = 0, l = notes.length; i < l; ++i) {
                    notes[i].set_waveform(new_value);
                }
            }

            this.notify_observers(new_value);
        } else if (key === this._custom_waveform_key && this.waveform.value === "custom") {
            this._is_custom_waveform_dirty = true;
            this._synth.update_dirty_custom_waves();
        } else if (flags.hasOwnProperty(key)) {
            flag = flags[key];

            if (new_value === "on") {
                for (i = 0, l = notes.length; i < l; ++i) {
                    notes[i].engage_filter(flag);
                }
            } else {
                for (i = 0, l = notes.length; i < l; ++i) {
                    notes[i].bypass_filter(flag);
                }
            }
        }
    };

    MIDINoteBasedOscillator.prototype.update_dirty_custom_wave = function ()
    {
        var notes, wave, i, l;

        if (!this._is_custom_waveform_dirty) {
            return;
        }

        notes = this._notes;
        wave = this.custom_waveform.get_waveform();

        for (i = 0, l = notes.length; i < l; ++i) {
            notes[i].set_custom_waveform(wave);
        }

        this._is_custom_waveform_dirty = false;
    };

    MIDINoteBasedOscillator.prototype.start = function (when)
    {
        var notes = this._notes,
            i, l;

        ComplexOscillator.prototype.start.call(this, when);

        this._vol_cns.start(when);
        this._fine_detune_cns.start(when);
        this._detune_cns.start(when);

        for (i = 0, l = notes.length; i < l; ++i) {
            notes[i].start(when);
        }
    };

    MIDINoteBasedOscillator.prototype.trigger_note = function (now, when, note_idx, midi_note, velocity)
    {
        var vs = this.velocity_sensitivity.value,
            note_pan, prt_depth, prt_start_freq, vos, freq, v;

        // note_pan = 2.0 * (midi_note / 127.0) - 1.0;
        note_pan = (midi_note + this.detune.value) / 63.5 - 1.0;

        if (note_pan < -1.0) {
            note_pan = -1.0;
        } else if (note_pan > 1.0) {
            note_pan = 1.0;
        }

        midi_note += 48;

        if ((0 > midi_note) || (227 < midi_note)) {
            return;
        }

        freq = this._frequencies[midi_note];

        velocity = (1.0 - vs) + vs * velocity;

        if ((vos = this.vel_ovsens.value) > 0) {
            v = velocity * velocity;
            // velocity = (1.0 - vos) * velocity + vos * v * v;
            velocity = velocity + vos * (v * v - velocity);
        }

        prt_depth = this.prt_depth.value;

        if ((prt_depth < 1.0) && (prt_depth > -1.0)) {
            prt_start_freq = this._last_freq;
        } else {
            prt_start_freq = freq * Math.pow(2.0, prt_depth / 1200.0);
        }

        this._notes[note_idx].trigger(
            now,
            when,
            freq,
            velocity,
            this.width.value * note_pan,
            prt_start_freq,
            this.prt_time.value,
            this.amp_env_params,
            this.env_prefold_amp_params,
            this.env_highpass_params,
            this.env_lowpass_params
        );

        this._last_freq = freq;
    };

    MIDINoteBasedOscillator.prototype.stop_note = function (when, note_idx)
    {
        this._notes[note_idx].stop(when);
    };

    MIDINoteBasedOscillator.prototype.cancel_note = function (when, note_idx)
    {
        this._notes[note_idx].cancel(when);
    };

    function MIDINoteBasedCarrier(synth, key, poliphony, frequencies, output)
    {
        var notes = [],
            lfo_highpass, lfo_lowpass,
            note, i;

        lfo_lowpass = new LFOCompatibleBiquadFilter(synth, key + "_l", "lowpass", FILTER_FREQ_MAX, null);
        lfo_highpass = new LFOCompatibleBiquadFilter(synth, key + "_h", "highpass", FILTER_FREQ_MIN, lfo_lowpass.input);

        MIDINoteBasedOscillator.call(
            this,
            synth, key, poliphony, frequencies, output,
            [lfo_highpass.onoff, lfo_highpass.log_freq, lfo_highpass.freq, lfo_highpass.q],
            [lfo_lowpass.onoff, lfo_lowpass.log_freq, lfo_lowpass.freq, lfo_lowpass.q]
        );

        lfo_lowpass.output = this._pan;

        lfo_highpass.bypass();
        lfo_lowpass.bypass();

        for (i = 0; i < poliphony; ++i) {
            notes.push(
                note = new CarrierNote(
                    synth, lfo_highpass.input,
                    this._vol_cns, this._detune_cns, this._fine_detune_cns, this._folding_cns
                )
            );
            note.env_highpass.set_log_freq(this.env_highpass_log_freq);
            note.env_lowpass.set_log_freq(this.env_lowpass_log_freq);
        }

        this._notes = notes;
    }

    MIDINoteBasedCarrier.prototype.notify_observers = MIDINoteBasedOscillator.prototype.notify_observers;
    MIDINoteBasedCarrier.prototype.update = MIDINoteBasedOscillator.prototype.update;
    MIDINoteBasedCarrier.prototype.update_dirty_custom_wave = MIDINoteBasedOscillator.prototype.update_dirty_custom_wave;
    MIDINoteBasedCarrier.prototype.start = MIDINoteBasedOscillator.prototype.start;
    MIDINoteBasedCarrier.prototype.trigger_note = MIDINoteBasedOscillator.prototype.trigger_note;
    MIDINoteBasedCarrier.prototype.stop_note = MIDINoteBasedOscillator.prototype.stop_note;
    MIDINoteBasedCarrier.prototype.cancel_note = MIDINoteBasedOscillator.prototype.cancel_note;

    function MIDINoteBasedModulator(synth, key, poliphony, frequencies, output, carrier_osc, am_vol_cns, fm_vol_cns)
    {
        var notes = [],
            lfo_highpass_onoff, lfo_highpass_log_freq, lfo_highpass_freq, lfo_highpass_q,
            lfo_lowpass_onoff, lfo_lowpass_log_freq, lfo_lowpass_freq, lfo_lowpass_q,
            note, i;

        if (carrier_osc && carrier_osc._notes.length !== poliphony) {
            throw (
                "MIDINoteBasedModulator error: carrier must have the same poliphony as modulator: "
                + String(carrier_osc._notes.length) + " != " + String(poliphony)
            );
        }

        lfo_highpass_onoff = new OnOffParam(synth, key + "_h_st");
        lfo_highpass_log_freq = new OnOffParam(synth, key + "_h_lg", "on");
        lfo_highpass_freq = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});
        lfo_highpass_q = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});

        lfo_lowpass_onoff = new OnOffParam(synth, key + "_l_st");
        lfo_lowpass_log_freq = new OnOffParam(synth, key + "_l_lg", "on");
        lfo_lowpass_freq = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});
        lfo_lowpass_q = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});

        this._lfo_hp_freq_cns = lfo_highpass_freq;
        this._lfo_hp_q_cns = lfo_highpass_q;

        this._lfo_lp_freq_cns = lfo_lowpass_freq;
        this._lfo_lp_q_cns = lfo_lowpass_q;

        lfo_highpass_onoff.observers.push(this);
        lfo_lowpass_onoff.observers.push(this);

        MIDINoteBasedOscillator.call(
            this,
            synth, key, poliphony, frequencies, output,
            [
                lfo_highpass_onoff,
                lfo_highpass_log_freq,
                new LFOControllableParam(synth, key + "_hf", lfo_highpass_freq.offset, FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MIN),
                new LFOControllableParam(synth, key + "_hq", lfo_highpass_q.offset, FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF)
            ],
            [
                lfo_lowpass_onoff,
                lfo_lowpass_log_freq,
                new LFOControllableParam(synth, key + "_lf", lfo_lowpass_freq.offset, FILTER_FREQ_MIN, FILTER_FREQ_MAX, FILTER_FREQ_MAX),
                new LFOControllableParam(synth, key + "_lq", lfo_lowpass_q.offset, FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF)
            ]
        );

        this._filter_flags[lfo_highpass_onoff.key] = LFO_HP_FLAG;
        this._filter_flags[lfo_lowpass_onoff.key] = LFO_LP_FLAG;

        this._mod_mask = 1;
        this._carrier_osc = carrier_osc;

        for (i = 0; i < poliphony; ++i) {
            notes.push(
                note = new ModulatorNote(
                    synth,
                    this._vol_cns,
                    this._detune_cns,
                    this._fine_detune_cns,
                    this._folding_cns,
                    this._lfo_hp_freq_cns,
                    this._lfo_hp_q_cns,
                    this._lfo_lp_freq_cns,
                    this._lfo_lp_q_cns
                )
            );
            note.output.connect(this._pan);
            note.env_highpass.set_log_freq(this.env_highpass_log_freq);
            note.env_lowpass.set_log_freq(this.env_lowpass_log_freq);
            note.lfo_highpass.set_log_freq(lfo_highpass_log_freq);
            note.lfo_lowpass.set_log_freq(lfo_lowpass_log_freq);

            am_vol_cns.connect(note.am_out.gain);
            fm_vol_cns.connect(note.fm_out.gain);
        }

        this._notes = notes;
    }

    MIDINoteBasedModulator.prototype.notify_observers = MIDINoteBasedOscillator.prototype.notify_observers;
    MIDINoteBasedModulator.prototype.update = MIDINoteBasedOscillator.prototype.update;
    MIDINoteBasedModulator.prototype.update_dirty_custom_wave = MIDINoteBasedOscillator.prototype.update_dirty_custom_wave;
    MIDINoteBasedModulator.prototype.trigger_note = MIDINoteBasedOscillator.prototype.trigger_note;
    MIDINoteBasedModulator.prototype.stop_note = MIDINoteBasedOscillator.prototype.stop_note;
    MIDINoteBasedModulator.prototype.cancel_note = MIDINoteBasedOscillator.prototype.cancel_note;

    MIDINoteBasedModulator.prototype.start = function (when)
    {
        MIDINoteBasedOscillator.prototype.start.call(this, when);

        this._lfo_hp_freq_cns.start(when);
        this._lfo_hp_q_cns.start(when);
        this._lfo_lp_freq_cns.start(when);
        this._lfo_lp_q_cns.start(when);
    };

    /**
     * 1 = add
     * 2 = amplitude modulation
     * 4 = frequency modulation
     */
    MIDINoteBasedModulator.prototype.modulate = function (mask)
    {
        var mod_notes = this._notes,
            old_mask = this._mod_mask,
            need_add, need_am, need_fm,
            had_add, had_am, had_fm,
            carr_notes, mod_note, carr_note,
            i, l;

        if (this._carrier_osc === null) {
            throw "No carrier set for this MIDINoteBasedModulator: " + this._key;
        }

        this._mod_mask = mask;
        carr_notes = this._carrier_osc._notes;

        need_add = (0 < (mask & 1));
        need_am = (0 < (mask & 2));
        need_fm = (0 < (mask & 4));
        had_add = (0 < (old_mask & 1));
        had_am = (0 < (old_mask & 2));
        had_fm = (0 < (old_mask & 4));

        for (i = 0, l = mod_notes.length; i < l; ++i) {
            mod_note = mod_notes[i];
            carr_note = carr_notes[i];

            if (need_add) {
                if (!had_add) {
                    mod_note.output.connect(this._pan);
                }
            } else if (had_add) {
                mod_note.output.disconnect();
            }

            if (need_am) {
                if (!had_am) {
                    mod_note.am_out.connect(carr_note.am_in);
                }
            } else if (had_am) {
                mod_note.am_out.disconnect();
            }

            if (need_fm) {
                if (!had_fm) {
                    mod_note.fm_out.connect(carr_note.frequency);
                }
            } else if (had_fm) {
                mod_note.fm_out.disconnect();
            }
        }
    };

    function Theremin(synth, output)
    {
        var effects = new Effects(synth, "th", output),
            note_vol = new GainNode(synth.audio_ctx, {"gain": 0.0, "channelCount": 1}),
            amp_env, lfo_lowpass, lfo_highpass,
            note;

        note = new Note(synth, note_vol, null);

        lfo_lowpass = new LFOCompatibleBiquadFilter(synth, "th_l", "lowpass", FILTER_FREQ_MAX, null);
        lfo_highpass = new LFOCompatibleBiquadFilter(synth, "th_h", "highpass", FILTER_FREQ_MIN, lfo_lowpass.input);

        ComplexOscillator.call(
            this,
            synth, "th", effects.input, note.osc_vol.gain,
            [lfo_highpass.onoff, lfo_highpass.log_freq, lfo_highpass.freq, lfo_highpass.q],
            [lfo_lowpass.onoff, lfo_lowpass.log_freq, lfo_lowpass.freq, lfo_lowpass.q]
        );

        amp_env = this.amp_env_params;
        amp_env[0].set_value(ENV_DEL_MIN);
        amp_env[2].set_value(ENV_VOL_MAX);
        amp_env[3].set_value(ENV_HLD_MIN);
        amp_env[4].set_value(ENV_DEC_MIN);
        amp_env[5].set_value(ENV_VOL_MAX);

        this._folding_cns.connect(note.folding_cns_target);

        lfo_lowpass.output = this._pan;

        lfo_highpass.bypass();
        lfo_lowpass.bypass();
        note_vol.connect(lfo_highpass.input);

        note_vol.gain.value = 0.0;

        note.env_highpass.set_log_freq(this.env_highpass_log_freq);
        note.env_lowpass.set_log_freq(this.env_lowpass_log_freq);

        this._audio_ctx = synth.audio_ctx;
        this._note = note;
        this._note_vol = note_vol;
        this._lfo_highpass = lfo_highpass;
        this._lfo_lowpass = lfo_lowpass;

        this.effects = effects;
        this.min_freq = new MIDIControllableParam(synth, "th_min", SND_FREQ_MIN, SND_FREQ_MAX, 110);
        this.max_freq = new MIDIControllableParam(synth, "th_max", SND_FREQ_MIN, SND_FREQ_MAX, 7040);
        this.fine_detune = new LFOControllableParam(synth, "th_fd", note.fine_detune, -400.0, 400.0, 0.0);
        this.resolution = new MIDIControllableParam(synth, "th_res", 1, 189, 1);
    }

    Theremin.prototype.notify_observers = ComplexOscillator.prototype.notify_observers;

    Theremin.prototype.update = function (param, new_value)
    {
        var key = param.key,
            flags = this._filter_flags,
            flag;

        if (key === this._waveform_key) {
            if (new_value === "custom") {
                this._is_custom_waveform_dirty = true;
                this._synth.update_dirty_custom_waves();
            } else {
                this._is_custom_waveform_dirty = false;
                this._note.set_waveform(new_value);
            }

            this.notify_observers(new_value);
        } else if (key === this._custom_waveform_key && this.waveform.value === "custom") {
            this._is_custom_waveform_dirty = true;
            this._synth.update_dirty_custom_waves();
        } else if (flags.hasOwnProperty(key)) {
            flag = flags[key];

            if (new_value === "on") {
                this._note.engage_filter(flag);
            } else {
                this._note.bypass_filter(flag);
            }
        }
    };

    Theremin.prototype.update_dirty_custom_wave = function ()
    {
        if (!this._is_custom_waveform_dirty) {
            return;
        }

        this._note.set_custom_waveform(this.custom_waveform.get_waveform());
        this._is_custom_waveform_dirty = false;
    };

    Theremin.prototype.start = function (when)
    {
        ComplexOscillator.prototype.start.call(this, when);

        this._note.start(when);
    };

    Theremin.prototype.trigger = function (x, y)
    {
        var now = this._audio_ctx.currentTime,
            g = this._note_vol.gain,
            res = this.resolution.value,
            freq;

        g.cancelAndHoldAtTime(now);

        if (res > 1) {
            res = 630.0 / res,
            x = Math.round(x * res) / res;
        }

        freq = this.min_freq.value + this.max_freq.value * x;

        this._note.trigger(
            now,
            now + 0.009,
            freq,
            1.0,
            this.width.value * (2.0 * x - 1.0),
            freq,
            0,
            this.amp_env_params,
            this.env_prefold_amp_params,
            this.env_highpass_params,
            this.env_lowpass_params
        );
        this.move(x, y);
    };

    Theremin.prototype.move = function (x, y)
    {
        var now = this._audio_ctx.currentTime,
            f = this._note.frequency,
            g = this._note_vol.gain,
            p = this._note.pan.pan,
            res = this.resolution.value,
            when;

        when = now + 0.05;

        if (res > 1) {
            res = 630.0 / res,
            x = Math.round(x * res) / res;
        }

        f.linearRampToValueAtTime(this.min_freq.value + this.max_freq.value * x, when);
        g.linearRampToValueAtTime((1.0 - y) * 0.95 + 0.05, when);
        p.linearRampToValueAtTime(this.width.value * (2.0 * x - 1.0), when);
    };

    Theremin.prototype.stop = function (x, y)
    {
        this.move(x, y);
        this._note.stop(this._audio_ctx.currentTime + 0.009);
    };

    function Note(synth, output, folding_cns)
    {
        var osc = new OscillatorNode(synth.audio_ctx, {"channelCount": 1}),
            prefold_vol = new GainNode(synth.audio_ctx, {"gain": 0.0, "channelCount": 1}),
            fold_threshold = new GainNode(synth.audio_ctx, {"gain": FOLD_THRESHOLD, "channelCount": 1}),
            folder,
            osc_vol = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            vel_vol = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            pan = new StereoPannerNode(synth.audio_ctx, {"channelCount": 2}),
            env_highpass = new LogLinBiquadFilter(synth, "highpass"),
            env_lowpass = new LogLinBiquadFilter(synth, "lowpass");

        folder = new WaveShaperNode(synth.audio_ctx, {"curve": FOLD_CURVE, "channelCount": 1});

        osc_vol.gain.value = 0.0;
        vel_vol.gain.value = 0.0;
        osc.frequency.value = 0.0;

        if (folding_cns !== null) {
            folding_cns.connect(fold_threshold.gain);
        }

        osc.connect(prefold_vol);
        prefold_vol.connect(fold_threshold);
        fold_threshold.connect(folder);
        folder.connect(osc_vol);

        vel_vol.connect(pan);

        if (output !== null) {
            pan.connect(output);
        }

        this._osc = osc;
        this._waveform = null;
        this._periodic_wave = null;

        this._prefold_vol = prefold_vol;
        this._fold_threshold = fold_threshold;
        this._folder = folder;
        this._fold_curve = FOLD_CURVE;
        this._fold_curve_inv = FOLD_CURVE_INV;
        this._vel_vol = vel_vol;

        this._is_triggered = false;

        this._amp_sustain_start = null;
        this._amp_sustain_level = null;
        this._amp_release_time = null;

        this._pfa_sustain_start = null;
        this._pfa_sustain_level = null;
        this._pfa_release_time = null
        this._pfa_release_level = null

        this._ehp_f_sustain_start = null;
        this._ehp_f_sustain_level = null;
        this._ehp_f_release_time = null
        this._ehp_f_release_level = null
        this._ehp_q_sustain_start = null;
        this._ehp_q_sustain_level = null;
        this._ehp_q_release_time = null
        this._ehp_q_release_level = null

        this._elp_f_sustain_start = null;
        this._elp_f_sustain_level = null;
        this._elp_f_release_time = null
        this._elp_f_release_level = null
        this._elp_q_sustain_start = null;
        this._elp_q_sustain_level = null;
        this._elp_q_release_time = null
        this._elp_q_release_level = null

        this.frequency = osc.frequency;
        this.pan = pan;
        this.osc_vol = osc_vol;
        this.folding_cns_target = fold_threshold.gain;
        this.fine_detune = osc.detune;
        this.env_highpass = env_highpass;
        this.env_lowpass = env_lowpass;

        this._chain_mask = 0;
        this._chain_mask_when_triggered = 0;
        this._chain_in = osc_vol;
        this._chains = [
            [vel_vol],
            [env_highpass.filter, vel_vol],
            [env_lowpass.filter, vel_vol],
            [env_highpass.filter, env_lowpass.filter, vel_vol]
        ];
        this._chain = this._chains[0];

        this._rewire(0);
    }

    Note.prototype._rewire = function (new_chain_mask)
    {
        var chains = this._chains,
            chain_in = this._chain_in,
            old_chain = this._chain,
            new_chain, i, l, e;

        new_chain = chains[new_chain_mask];

        chain_in.disconnect();

        for (i = 0, l = old_chain.length - 1; i < l; ++i) {
            old_chain[i].disconnect(old_chain[i + 1]);
        }

        chain_in.connect(new_chain[0]);

        for (i = 0, l = new_chain.length - 1; i < l; ++i) {
            new_chain[i].connect(new_chain[i + 1]);
        }

        this._chain_mask = new_chain_mask;
        this._chain = new_chain;
    };

    Note.prototype.start = function (when)
    {
        this._osc.start(when);
    };

    Note.prototype.trigger = function (
            now, when, freq, velocity, pan,
            prt_start_freq, prt_time,
            amp_env_params, env_prefold_amp_params, env_highpass_params, env_lowpass_params
    ) {
        var f = this.frequency,
            p = this.pan.pan,
            chain_mask = this._chain_mask;

        this._is_triggered = true;

        f.cancelAndHoldAtTime(when);

        if (prt_start_freq === null || prt_time < 0.001) {
            f.setValueAtTime(freq, when);
        } else {
            f.setValueAtTime(prt_start_freq, when);
            f.linearRampToValueAtTime(freq, when + prt_time);
        }

        p.cancelAndHoldAtTime(when);
        p.setValueAtTime(pan, when);

        this._amp_sustain_start = this._apply_envelope_dahds(
            this._vel_vol.gain,
            now,
            when,
            0,
            amp_env_params[0].value,
            amp_env_params[1].value,
            amp_env_params[2].value * velocity,
            amp_env_params[3].value,
            amp_env_params[4].value,
            this._amp_sustain_level = amp_env_params[5].value * velocity
        );
        this._amp_release_time = amp_env_params[6].value;

        this._pfa_sustain_start = this._apply_envelope_dahds(
            this._prefold_vol.gain,
            now,
            when,
            env_prefold_amp_params[0].value,
            env_prefold_amp_params[1].value,
            env_prefold_amp_params[2].value,
            env_prefold_amp_params[3].value,
            env_prefold_amp_params[4].value,
            env_prefold_amp_params[5].value,
            this._pfa_sustain_level = env_prefold_amp_params[6].value
        );
        this._pfa_release_time = env_prefold_amp_params[7].value;
        this._pfa_release_level = env_prefold_amp_params[8].value;

        this._chain_mask_when_triggered = chain_mask;

        if (0 < (chain_mask & 1)) {
            this._ehp_f_sustain_start = this._apply_envelope_dahds(
                this.env_highpass.frequency,
                now,
                when,
                env_highpass_params[0].value,
                env_highpass_params[1].value,
                env_highpass_params[2].value,
                env_highpass_params[3].value,
                env_highpass_params[4].value,
                env_highpass_params[5].value,
                this._ehp_f_sustain_level = env_highpass_params[6].value
            );
            this._ehp_q_sustain_start = this._apply_envelope_dahds(
                this.env_highpass.Q,
                now,
                when,
                env_highpass_params[9].value,
                env_highpass_params[10].value,
                env_highpass_params[11].value,
                env_highpass_params[12].value,
                env_highpass_params[13].value,
                env_highpass_params[14].value,
                this._ehp_q_sustain_level = env_highpass_params[15].value
            );
        } else {
            this._ehp_f_sustain_level = env_highpass_params[6].value;
            this._ehp_q_sustain_level = env_highpass_params[15].value;
        }

        this._ehp_f_release_time = env_highpass_params[7].value;
        this._ehp_f_release_level = env_highpass_params[8].value;
        this._ehp_q_release_time = env_highpass_params[16].value;
        this._ehp_q_release_level = env_highpass_params[17].value;

        if (0 < (chain_mask & 2)) {
            this._elp_f_sustain_start = this._apply_envelope_dahds(
                this.env_lowpass.frequency,
                now,
                when,
                env_lowpass_params[0].value,
                env_lowpass_params[1].value,
                env_lowpass_params[2].value,
                env_lowpass_params[3].value,
                env_lowpass_params[4].value,
                env_lowpass_params[5].value,
                this._elp_f_sustain_level = env_lowpass_params[6].value
            );
            this._elp_q_sustain_start = this._apply_envelope_dahds(
                this.env_lowpass.Q,
                now,
                when,
                env_lowpass_params[9].value,
                env_lowpass_params[10].value,
                env_lowpass_params[11].value,
                env_lowpass_params[12].value,
                env_lowpass_params[13].value,
                env_lowpass_params[14].value,
                this._elp_q_sustain_level = env_lowpass_params[15].value
            );
        } else {
            this._elp_f_sustain_level = env_lowpass_params[6].value;
            this._elp_q_sustain_level = env_lowpass_params[15].value;
        }

        this._elp_f_release_time = env_lowpass_params[7].value;
        this._elp_f_release_level = env_lowpass_params[8].value;
        this._elp_q_release_time = env_lowpass_params[16].value;
        this._elp_q_release_level = env_lowpass_params[17].value;
    };

    // initial-l ==delay-t==> initial-l ==attack-t==> peak-l ==hold-t==> peak-l ==decay-t==> sustain-l
    Note.prototype._apply_envelope_dahds = function (param, now, when, il, dlt, at, pl, ht, dt, sl)
    {
        param.cancelAndHoldAtTime(now);
        param.linearRampToValueAtTime(il, when);

        if (dlt > 0.0) {
            param.linearRampToValueAtTime(il, when += dlt);
        }

        param.linearRampToValueAtTime(pl, when += at);

        if (ht > 0.0) {
            param.linearRampToValueAtTime(pl, when += ht);
        }

        param.linearRampToValueAtTime(sl, when += dt);

        return when;
    }

    Note.prototype.stop = function (when)
    {
        var chain_mask;

        if (this._is_triggered) {
            this._is_triggered = false;

            chain_mask = this._chain_mask_when_triggered;

            this._apply_envelope_r(
                this._vel_vol.gain,
                when,
                this._amp_sustain_start,
                this._amp_sustain_level,
                this._amp_release_time,
                0.0
            );

            this._apply_envelope_r(
                this._prefold_vol.gain,
                when,
                this._pfa_sustain_start,
                this._pfa_sustain_level,
                this._pfa_release_time,
                this._pfa_release_level
            );

            if (0 < (chain_mask & 1)) {
                this._apply_envelope_r(
                    this.env_highpass.frequency,
                    when,
                    this._ehp_f_sustain_start,
                    this._ehp_f_sustain_level,
                    this._ehp_f_release_time,
                    this._ehp_f_release_level
                );
                this._apply_envelope_r(
                    this.env_highpass.Q,
                    when,
                    this._ehp_q_sustain_start,
                    this._ehp_q_sustain_level,
                    this._ehp_q_release_time,
                    this._ehp_q_release_level
                );
            }

            if (0 < (chain_mask & 2)) {
                this._apply_envelope_r(
                    this.env_lowpass.frequency,
                    when,
                    this._elp_f_sustain_start,
                    this._elp_f_sustain_level,
                    this._elp_f_release_time,
                    this._elp_f_release_level
                );
                this._apply_envelope_r(
                    this.env_lowpass.Q,
                    when,
                    this._elp_q_sustain_start,
                    this._elp_q_sustain_level,
                    this._elp_q_release_time,
                    this._elp_q_release_level
                );
            }
        }
    };

    // sustain-l ==release-t==> release-l
    Note.prototype._apply_envelope_r = function (param, when, sustain_start, sl, rt, rl)
    {
        if ((sustain_start === null) || (when <= sustain_start)) {
            param.cancelAndHoldAtTime(when);
        } else {
            param.linearRampToValueAtTime(sl, when);
        }

        param.linearRampToValueAtTime(rl, when + rt);
    }

    Note.prototype.cancel = function (when)
    {
        var chain_mask;

        if (this._is_triggered) {
            this._is_triggered = false;

            chain_mask = this._chain_mask_when_triggered;

            this._apply_envelope_r(
                this._vel_vol.gain,
                when,
                this._amp_sustain_start,
                this._amp_sustain_level,
                0.0,
                0.0
            );

            this._apply_envelope_r(
                this._prefold_vol.gain,
                when,
                this._pfa_sustain_start,
                this._pfa_sustain_level,
                0.0,
                0.0
            );

            if (0 < (chain_mask & 1)) {
                this._apply_envelope_r(
                    this.env_highpass.frequency,
                    when,
                    this._ehp_f_sustain_start,
                    this._ehp_f_sustain_level,
                    0.0,
                    this._ehp_f_release_level
                );
                this._apply_envelope_r(
                    this.env_highpass.Q,
                    when,
                    this._ehp_q_sustain_start,
                    this._ehp_q_sustain_level,
                    0.0,
                    this._ehp_q_release_level
                );
            }

            if (0 < (chain_mask & 2)) {
                this._apply_envelope_r(
                    this.env_lowpass.frequency,
                    when,
                    this._elp_f_sustain_start,
                    this._elp_f_sustain_level,
                    0.0,
                    this._elp_f_release_level
                );
                this._apply_envelope_r(
                    this.env_lowpass.Q,
                    when,
                    this._elp_q_sustain_start,
                    this._elp_q_sustain_level,
                    0.0,
                    this._elp_q_release_level
                );
            }
        }
    };

    Note.prototype.set_waveform = function (new_waveform)
    {
        var osc = this._osc;

        switch (new_waveform) {
            case "softsaw":
                this.set_custom_waveform(soft_saw_pw);
                break;

            case "invsaw":
                if (osc !== null) {
                    osc.type = "sawtooth";
                }

                this._waveform = "sawtooth";
                this._folder.curve = this._fold_curve_inv;
                break;

            case "softinvsaw":
                this.set_custom_waveform(soft_saw_pw);
                this._folder.curve = this._fold_curve_inv;
                break;

            case "softsquare":
                this.set_custom_waveform(soft_sqr_pw);
                break;

            case "softtriangle":
                this.set_custom_waveform(soft_tri_pw);
                break;

            default:
                if (osc !== null) {
                    osc.type = new_waveform;
                }

                this._waveform = new_waveform;
                this._folder.curve = this._fold_curve;
                break;
        }
    };

    Note.prototype.set_custom_waveform = function (periodic_wave)
    {
        var osc = this._osc;

        this._folder.curve = this._fold_curve;
        this._periodic_wave = periodic_wave;

        if (osc !== null) {
            this._osc.setPeriodicWave(periodic_wave);
        }

        this._waveform = null;
    };

    Note.prototype.engage_filter = function (flag)
    {
        var chain_mask = this._chain_mask;

        if (0 < (chain_mask & flag)) {
            return;
        }

        this._rewire(chain_mask | flag);
    };

    Note.prototype.bypass_filter = function (flag)
    {
        var chain_mask = this._chain_mask;

        if (1 > (chain_mask & flag)) {
            return;
        }

        this._rewire(chain_mask & (0xffff & ~flag));
    };

    function ZeroPhaseNote(synth, output, vol_cns, detune_cns, fine_detune_cns, folding_cns)
    {
        var freq_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});

        Note.call(this, synth, output, folding_cns);

        vol_cns.connect(this.osc_vol.gain);

        freq_cns.offset.value = 0.0;

        this._osc.disconnect();
        this._osc = null;

        this._audio_ctx = synth.audio_ctx;
        this._synth = synth;
        this._detune_cns = detune_cns;
        this._fine_detune_cns = fine_detune_cns;
        this._freq_cns = freq_cns;

        this.frequency = freq_cns.offset;
    }

    ZeroPhaseNote.prototype._rewire = Note.prototype._rewire;
    ZeroPhaseNote.prototype._apply_envelope_dahds = Note.prototype._apply_envelope_dahds;
    ZeroPhaseNote.prototype._apply_envelope_r = Note.prototype._apply_envelope_r;
    ZeroPhaseNote.prototype.engage_filter = Note.prototype.engage_filter;
    ZeroPhaseNote.prototype.bypass_filter = Note.prototype.bypass_filter;
    ZeroPhaseNote.prototype.set_waveform = Note.prototype.set_waveform;
    ZeroPhaseNote.prototype.set_custom_waveform = Note.prototype.set_custom_waveform;

    ZeroPhaseNote.prototype.trigger = function (
            now, when, freq, velocity, pan,
            prt_start_freq, prt_time,
            amp_env_params, env_prefold_amp_params, env_highpass_params, env_lowpass_params
    ) {
        var osc = this._osc,
            detune = this._detune_cns,
            fine_detune = this._fine_detune_cns,
            freq_cns = this._freq_cns,
            waveform = this._waveform;

        if (osc !== null) {
            osc.stop(when);
            this._synth.garbage.push(
                [
                    when,
                    osc,
                    freq_cns, osc.frequency,
                    detune, osc.detune,
                    fine_detune, osc.detune
                ]
            );
        }

        this._osc = osc = new OscillatorNode(this._audio_ctx, {"channelCount": 1});

        if (waveform === null) {
            osc.setPeriodicWave(this._periodic_wave);
        } else {
            this._osc.type = waveform;
        }

        osc.frequency.value = 0.0;
        osc.connect(this._prefold_vol);

        freq_cns.connect(osc.frequency);
        detune.connect(osc.detune);
        fine_detune.connect(osc.detune);

        osc.start(when);

        Note.prototype.trigger.call(
            this,
            now, when, freq, velocity, pan,
            prt_start_freq, prt_time,
            amp_env_params, env_prefold_amp_params, env_highpass_params, env_lowpass_params
        );
    };

    ZeroPhaseNote.prototype.start = function (when)
    {
        this._freq_cns.start(when);
    };

    ZeroPhaseNote.prototype.stop = function (when)
    {
        var osc = this._osc;

        Note.prototype.stop.call(this, when);

        if (osc !== null) {
            osc.stop(when + this._amp_release_time);
        }
    };

    ZeroPhaseNote.prototype.cancel = function (when)
    {
        var osc = this._osc;

        Note.prototype.cancel.call(this, when);

        if (osc !== null) {
            this._osc.stop(when);
        }
    };

    function CarrierNote(synth, output, vol_cns, detune_cns, fine_detune_cns, folding_cns)
    {
        var am_in = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            osc_vol;

        ZeroPhaseNote.call(this, synth, output, vol_cns, detune_cns, fine_detune_cns, folding_cns);

        osc_vol = this.osc_vol;
        am_in.gain.value = 1.0;

        osc_vol.disconnect();
        osc_vol.connect(am_in);

        this._am_in = am_in;
        this._chain_in = am_in;

        this._rewire(0);

        this.am_in = am_in.gain;
    }

    CarrierNote.prototype._rewire = ZeroPhaseNote.prototype._rewire;
    CarrierNote.prototype._apply_envelope_dahds = ZeroPhaseNote.prototype._apply_envelope_dahds;
    CarrierNote.prototype.stop = ZeroPhaseNote.prototype.stop;
    CarrierNote.prototype._apply_envelope_r = ZeroPhaseNote.prototype._apply_envelope_r;
    CarrierNote.prototype.cancel = ZeroPhaseNote.prototype.cancel;
    CarrierNote.prototype.set_waveform = ZeroPhaseNote.prototype.set_waveform;
    CarrierNote.prototype.set_custom_waveform = ZeroPhaseNote.prototype.set_custom_waveform;
    CarrierNote.prototype.engage_filter = ZeroPhaseNote.prototype.engage_filter;
    CarrierNote.prototype.bypass_filter = ZeroPhaseNote.prototype.bypass_filter;
    CarrierNote.prototype.start = ZeroPhaseNote.prototype.start;
    CarrierNote.prototype.trigger = ZeroPhaseNote.prototype.trigger;

    function ModulatorNote(
            synth, vol_cns, detune_cns, fine_detune_cns, folding_cns,
            lfo_hp_freq_cns, lfo_hp_q_cns,
            lfo_lp_freq_cns, lfo_lp_q_cns
    ) {
        var fm_freq = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            am_out = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            fm_out = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            lfo_highpass = new LogLinBiquadFilter(synth, "highpass"),
            lfo_lowpass = new LogLinBiquadFilter(synth, "lowpass"),
            pan, vel_vol, env_highpass, env_lowpass;

        lfo_highpass.frequency.value = 0.0;
        lfo_highpass.Q.value = 0.0;
        lfo_lowpass.frequency.value = 0.0;
        lfo_lowpass.Q.value = 0.0;

        lfo_hp_freq_cns.connect(lfo_highpass.frequency);
        lfo_hp_q_cns.connect(lfo_highpass.Q);
        lfo_lp_freq_cns.connect(lfo_lowpass.frequency);
        lfo_lp_q_cns.connect(lfo_lowpass.Q);

        ZeroPhaseNote.call(this, synth, null, vol_cns, detune_cns, fine_detune_cns, folding_cns);

        pan = this.pan;

        this._fm_freq = fm_freq;

        this.fm_out = fm_out;
        this.am_out = am_out;
        this.output = pan;
        this.lfo_highpass = lfo_highpass;
        this.lfo_lowpass = lfo_lowpass;

        am_out.gain.value = 0.0;
        fm_out.gain.value = 0.0;

        this._freq_cns.connect(fm_freq.gain);
        fm_freq.connect(fm_out);

        vel_vol = this._vel_vol;
        env_highpass = this.env_highpass;
        env_lowpass = this.env_lowpass;

        vel_vol.connect(pan);
        vel_vol.connect(am_out);
        vel_vol.connect(fm_freq);

        this._chains = [
            [vel_vol],
            [env_highpass.filter, vel_vol],
            [env_lowpass.filter, vel_vol],
            [env_highpass.filter, env_lowpass.filter, vel_vol],

            [lfo_highpass.filter, vel_vol],
            [env_highpass.filter, lfo_highpass.filter, vel_vol],
            [env_lowpass.filter, lfo_highpass.filter, vel_vol],
            [env_highpass.filter, env_lowpass.filter, lfo_highpass.filter, vel_vol],

            [lfo_lowpass.filter, vel_vol],
            [env_highpass.filter, lfo_lowpass.filter, vel_vol],
            [env_lowpass.filter, lfo_lowpass.filter, vel_vol],
            [env_highpass.filter, env_lowpass.filter, lfo_lowpass.filter, vel_vol],

            [lfo_highpass.filter, lfo_lowpass.filter, vel_vol],
            [env_highpass.filter, lfo_highpass.filter, lfo_lowpass.filter, vel_vol],
            [env_lowpass.filter, lfo_highpass.filter, lfo_lowpass.filter, vel_vol],
            [env_highpass.filter, env_lowpass.filter, lfo_highpass.filter, lfo_lowpass.filter, vel_vol]
        ];
    }

    ModulatorNote.prototype._rewire = ZeroPhaseNote.prototype._rewire;
    ModulatorNote.prototype._apply_envelope_dahds = ZeroPhaseNote.prototype._apply_envelope_dahds;
    ModulatorNote.prototype.stop = ZeroPhaseNote.prototype.stop;
    ModulatorNote.prototype._apply_envelope_r = ZeroPhaseNote.prototype._apply_envelope_r;
    ModulatorNote.prototype.cancel = ZeroPhaseNote.prototype.cancel;
    ModulatorNote.prototype.set_waveform = ZeroPhaseNote.prototype.set_waveform;
    ModulatorNote.prototype.set_custom_waveform = ZeroPhaseNote.prototype.set_custom_waveform;
    ModulatorNote.prototype.engage_filter = ZeroPhaseNote.prototype.engage_filter;
    ModulatorNote.prototype.bypass_filter = ZeroPhaseNote.prototype.bypass_filter;
    ModulatorNote.prototype.start = ZeroPhaseNote.prototype.start;
    ModulatorNote.prototype.trigger = ZeroPhaseNote.prototype.trigger;

    function Param(synth, key, default_value)
    {
        Observable.call(this);

        this.key = key;
        this.default_value = default_value;
        this.value = default_value;
        this.controller = "none";

        synth.register_param(this);
    }

    Param.prototype.notify_observers = Observable.prototype.notify_observers;

    Param.prototype.validate = function (value)
    {
        return value;
    };

    Param.prototype.set_value = function (new_value)
    {
        this.value = new_value;
        this.notify_observers(new_value);
    };

    Param.prototype.disconnect = function ()
    {
        this.controller = "none";
        this.notify_observers(this.value);
    };

    function NumParam(synth, key, min, max, default_value)
    {
        Param.call(this, synth, key, default_value);

        this.min = min;
        this.max = max;
        this.delta = max - min;
    }

    NumParam.prototype.notify_observers = Param.prototype.notify_observers;
    NumParam.prototype.set_value = Param.prototype.set_value;
    NumParam.prototype.disconnect = Param.prototype.disconnect;

    NumParam.prototype.validate = function (value)
    {
        if (typeof(value) !== "number") {
            return null;
        }

        value = Number(value);

        if ((this.min <= value) && (value <= this.max)) {
            return value;
        }

        return null;
    };

    function EnumParam(synth, key, valid_values, default_value)
    {
        Param.call(this, synth, key, default_value);

        this.valid_values = valid_values;
    }

    EnumParam.prototype.notify_observers = Param.prototype.notify_observers;
    EnumParam.prototype.set_value = Param.prototype.set_value;
    EnumParam.prototype.disconnect = Param.prototype.disconnect;

    EnumParam.prototype.validate = function (value)
    {
        value = String(value);

        return this.valid_values.hasOwnProperty(value) ? value : null;
    };

    function OnOffParam(synth, key, default_value)
    {
        EnumParam.call(
            this, synth, key, {"on": "on", "off": "off"}, default_value || "off"
        );
    }

    OnOffParam.prototype.notify_observers = EnumParam.prototype.notify_observers;
    OnOffParam.prototype.set_value = EnumParam.prototype.set_value;
    OnOffParam.prototype.disconnect = EnumParam.prototype.disconnect;
    OnOffParam.prototype.validate = EnumParam.prototype.validate;

    OnOffParam.prototype.toggle = function ()
    {
        if (this.value === "on") {
            this.set_value("off");
        } else {
            this.set_value("on");
        }
    };

    function MIDIControllableParam(synth, key, min, max, default_value)
    {
        NumParam.call(this, synth, key, min, max, default_value);

        this._midi_ctl = null;
        this._midi_conn = null;
    }

    MIDIControllableParam.prototype.notify_observers = NumParam.prototype.notify_observers;
    MIDIControllableParam.prototype.validate = NumParam.prototype.validate;
    MIDIControllableParam.prototype.set_value = NumParam.prototype.set_value;

    MIDIControllableParam.prototype.control_value = function (new_value)
    {
        this.set_value(this.min + this.delta * new_value);
    };

    MIDIControllableParam.prototype.connect_midi_ctl = function (key, midi_ctl)
    {
        this.controller = key;
        this._midi_conn = midi_ctl.control(this);
        this._midi_ctl = midi_ctl;
        this.notify_observers(this.value);
    };

    MIDIControllableParam.prototype.disconnect = function ()
    {
        var midi_ctl = this._midi_ctl;

        NumParam.prototype.disconnect.call(this);

        if (midi_ctl === null) {
            return;
        }

        this._midi_ctl.release(this._midi_conn);
        this._midi_ctl = null;
        this._midi_conn = null;
    };

    function DetuneParam(synth, key, target_param, scale, min, max, default_value)
    {
        MIDIControllableParam.call(this, synth, key, min, max, default_value);

        this._target_param = target_param;
        this._scale = scale;
    }

    DetuneParam.prototype.notify_observers = MIDIControllableParam.prototype.notify_observers;
    DetuneParam.prototype.validate = MIDIControllableParam.prototype.validate;
    DetuneParam.prototype.control_value = MIDIControllableParam.prototype.control_value;
    DetuneParam.prototype.connect_midi_ctl = MIDIControllableParam.prototype.connect_midi_ctl;
    DetuneParam.prototype.disconnect = MIDIControllableParam.prototype.disconnect;

    DetuneParam.prototype.set_value = function (new_value)
    {
        var t = this._target_param;

        MIDIControllableParam.prototype.set_value.call(this, new_value = Math.round(new_value) | 0);

        if (t !== null) {
            this._target_param.value = new_value * this._scale;
        }
    };

    function LFOControllableParam(synth, key, target_param, min, max, default_value)
    {
        var mul = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            add = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            ofs = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1, "offset": 0.0});

        MIDIControllableParam.call(this, synth, key, min, max, default_value);

        add.gain.value = 1.0;
        mul.gain.value = 0.0;
        ofs.offset.value = 0.0;
        ofs.start(0.0);

        target_param.value = 0.0;

        ofs.connect(add);
        mul.connect(add);
        add.connect(target_param);

        this._audio_ctx = synth.audio_ctx;
        this._mul = mul;
        this._ofs = ofs;
        this._add = add;
        this._ctl_out = null;
        this._automated_until = 0.0;
        this._target_param = target_param;

        this.set_value(default_value);
    }

    LFOControllableParam.prototype.notify_observers = MIDIControllableParam.prototype.notify_observers;
    LFOControllableParam.prototype.validate = MIDIControllableParam.prototype.validate;
    LFOControllableParam.prototype.connect_midi_ctl = MIDIControllableParam.prototype.connect_midi_ctl;
    LFOControllableParam.prototype.control_value = MIDIControllableParam.prototype.control_value;

    LFOControllableParam.prototype.set_value = function (new_value)
    {
        this._target_param.value = 0.0;
        this._mul.gain.value = 0.0;
        this.value = new_value;

        this._ofs.offset.linearRampToValueAtTime(
            new_value,
            this._automated_until = Math.max(this._automated_until + 0.01, this._audio_ctx.currentTime + 0.01)
        );

        this.notify_observers(new_value);
    };

    LFOControllableParam.prototype.connect_lfo_ctl = function (key, lfo_ctl)
    {
        var ctl_out = lfo_ctl.output,
            ct;

        if (this._automated_until > (ct = this._audio_ctx.currentTime)) {
            this._ofs.offset.cancelAndHoldAtTime(ct);
            this._automated_until = 0.0;
        }

        this._target_param.value = 0.0;
        this._ofs.offset.setValueAtTime(this.min, ct);
        this._mul.gain.value = this.delta;
        this._ctl_out = ctl_out;

        ctl_out.connect(this._mul);

        this.controller = key;

        this.notify_observers(this.value);
    };

    LFOControllableParam.prototype.disconnect = function ()
    {
        var ctl_out = this._ctl_out;

        MIDIControllableParam.prototype.disconnect.call(this);

        if (ctl_out === null) {
            return;
        }

        this._ctl_out = null;
        ctl_out.disconnect(this._mul);
        this.set_value(this.value);
    };

    function CustomWaveParams(synth, key)
    {
        var params = [],
            param,
            i;

        Observable.call(this);
        Observer.call(this);

        Param.call(this, synth, key, 0);

        for (i = 0; i < 10; ++i) {
            param = new MIDIControllableParam(synth, key + "_i" + String(i), -1.0, 1.0, (i < 3) ? 0.4 : 0.0);
            params.push(param);
            param.observers.push(this);
        }

        this._audio_ctx = synth.audio_ctx;

        this.params = params;
        this.waveform = null;
    }

    CustomWaveParams.prototype.notify_observers = Observable.prototype.notify_observers;
    CustomWaveParams.prototype.set_value = Param.prototype.set_value;
    CustomWaveParams.prototype.disconnect = Param.prototype.disconnect;

    CustomWaveParams.prototype.validate = function (value)
    {
        return 0;
    };

    CustomWaveParams.prototype.update = function (param, new_value)
    {
        this.waveform = null;
        this.notify_observers(null);
    };

    CustomWaveParams.prototype.get_waveform = function ()
    {
        var waveform = this.waveform,
            params, param, real, imag,
            i, l;

        if (waveform !== null) {
            return waveform;
        }

        l = (params = this.params).length + 1;
        real = new Float32Array(l);
        imag = new Float32Array(l);

        real[0] = imag[0] = 0.0;

        for (i = 1; i < l; ++i) {
            real[i] = 0.0;
            imag[i] = params[i - 1].value;
        }

        return this.waveform = new PeriodicWave(
            this._audio_ctx,
            {
                "channelCount": 1,
                "disableNormalization": false,
                "real": real,
                "imag": imag
            }
        );
    };

    function LFOController(synth, key)
    {
        var osc = new OscillatorNode(synth.audio_ctx, {"channelCount": 1}),
            gain = new GainNode(synth.audio_ctx, {"gain": 0.0, "channelCount": 1}),
            curve_0_1 = new Float32Array([0.0, 1.0]),
            curve_1_0 = new Float32Array([1.0, 0.0]),
            ws_0_1, ws_min_max;

        ws_0_1 = new WaveShaperNode(synth.audio_ctx, {"curve": curve_0_1, "channelCount": 1});
        ws_min_max = new WaveShaperNode(synth.audio_ctx, {"curve": curve_0_1, "channelCount": 1});

        Observable.call(this);
        Observer.call(this);

        osc.connect(ws_0_1);
        ws_0_1.connect(gain);
        gain.connect(ws_min_max);

        this._osc = osc;
        this._gain = gain;
        this._wave_shaper_0_1 = ws_0_1;
        this._wave_shaper_min_max = ws_min_max;
        this._curve_0_1 = curve_0_1;
        this._curve_1_0 = curve_1_0;

        this.key = key;

        this.waveform = new EnumParam(synth, key + "_wf", LFO_WAVEFORMS, "sine");
        this.waveform.observers.push(this);

        this.frequency = new LFOControllableParam(synth, key + "_f", osc.frequency, LFO_FREQ_MIN, LFO_FREQ_MAX, LFO_FREQ_DEF);
        this.amt = new LFOControllableParam(synth, key + "_am", gain.gain, 0.0, 1.0, 1.0);
        this.min = new LFOControllerParam(synth, key + "_mi", this, 0.0, 1.0, 0.0);
        this.max = new LFOControllerParam(synth, key + "_ma", this, 0.0, 1.0, 1.0);
        this.distortion = new LFOControllerParam(synth, key + "_ds", this, 0.0, 1.0, 0.0);
        this.rnd = new LFOControllerParam(synth, key + "_rn", this, 0.0, 1.0, 0.0);

        this.output = ws_min_max;
    }

    LFOController.prototype.notify_observers = Observable.prototype.notify_observers;

    LFOController.prototype.update = function (waveform_param, new_waveform)
    {
        if (new_waveform === "invsaw") {
            new_waveform = "sawtooth";
            this._wave_shaper_0_1.curve = this._curve_1_0;
        } else {
            this._wave_shaper_0_1.curve = this._curve_0_1;
        }

        this._osc.type = new_waveform;
        this.notify_observers(new_waveform);
    };

    LFOController.prototype.start = function (when)
    {
        this._osc.start(when);
    }

    LFOController.prototype.update_wave_shaper = function ()
    {
        var min = this.min.value,
            max = this.max.value,
            distortion = this.distortion.value,
            rnd_weight = this.rnd.value,
            curve, delta, exp, i, l, r, v, s1, s2;

        if (rnd_weight < 0.0001) {
            if (distortion > 0.0) {
                r = (l = RANDOMS) - 1;
                curve = new Float32Array(l * 2 - 1);

                for (i = 0; i < r; ++i) {
                    curve[i] = min;
                }

                delta = max - min;

                exp = Math.exp;
                s1 = - (CTL_DST_STEEPNESS_MIN + distortion * CTL_DST_STEEPNESS_SCALE);
                s2 = 1.0 - distortion;

                for (i = 0; i < l; ++i) {
                    v = i / r;
                    v = (
                        distortion / (1.0 + exp(s1 * (2.0 * v - 1.0)))
                        + s2 * v
                    );
                    curve[i + r] = min + delta * v;
                }
            } else {
                curve = new Float32Array([min, min, max]);
            }
        } else {
            r = (l = RANDOMS) - 1;
            curve = new Float32Array(l * 2 - 1);

            for (i = 0; i < r; ++i) {
                curve[i] = min;
            }

            delta = max - min;

            if (distortion > 0.0) {
                exp = Math.exp;
                s1 = - (CTL_DST_STEEPNESS_MIN + distortion * CTL_DST_STEEPNESS_SCALE);
                s2 = 1.0 - distortion;

                for (i = 0; i < l; ++i) {
                    v = i / r;
                    v = (
                        distortion / (1.0 + exp(s1 * (2.0 * v - 1.0)))
                        + s2 * v
                    );
                    curve[i + r] = (
                        min + delta * (
                            // (1.0 - rnd_weight) * v + rnd_weight * random_numbers[i]
                            v + rnd_weight * (random_numbers[i] - v)
                        )
                    );
                }
            } else {
                for (i = 0; i < l; ++i) {
                    v = i / r;
                    curve[i + r] = (
                        min + delta * (
                            // (1.0 - rnd_weight) * v + rnd_weight * random_numbers[i]
                            v + rnd_weight * (random_numbers[i] - v)
                        )
                    );
                }
            }
        }

        this._wave_shaper_min_max.curve = curve;
    };

    function LFOControllerParam(synth, key, lfo_ctl, min, max, default_value)
    {
        MIDIControllableParam.call(this, synth, key, min, max, default_value);

        this._lfo_ctl = lfo_ctl;
    }

    LFOControllerParam.prototype.notify_observers = MIDIControllableParam.prototype.notify_observers;
    LFOControllerParam.prototype.validate = MIDIControllableParam.prototype.validate;
    LFOControllerParam.prototype.connect_midi_ctl = MIDIControllableParam.prototype.connect_midi_ctl;
    LFOControllerParam.prototype.disconnect = MIDIControllableParam.prototype.disconnect;
    LFOControllerParam.prototype.control_value = MIDIControllableParam.prototype.control_value;

    LFOControllerParam.prototype.set_value = function (new_value)
    {
        MIDIControllableParam.prototype.set_value.call(this, new_value);
        this._lfo_ctl.update_wave_shaper();
    };

    function MIDIController(synth, default_value)
    {
        this._params = [];
        this._connections = {};
        this._next_conn = 0;
        this._synth = synth;

        this.value = default_value;
    }

    MIDIController.prototype.control = function (mc_param)
    {
        var conn_id;

        conn_id = "c" + String(++this._next_conn);
        this._connections[conn_id] = mc_param;
        this.update_params();

        mc_param.control_value(this.value);

        return conn_id;
    };

    MIDIController.prototype.update_params = function ()
    {
        var params = [],
            conns = this._connections,
            key;

        for (key in conns) {
            if (conns.hasOwnProperty(key)) {
                params.push(conns[key]);
            }
        }

        this._params = params;
    };

    MIDIController.prototype.release = function (conn_id)
    {
        var conns = this._connections;

        if (conns.hasOwnProperty(conn_id)) {
            delete conns[conn_id];
            this.update_params();
        }
    };

    MIDIController.prototype.set_value = function (new_value)
    {
        var synth = this._synth;

        this.value = new_value;
        this.control_params();
    };

    MIDIController.prototype.control_params = function ()
    {
        var params = this._params,
            value = this.value,
            i, l;

        for (i = 0, l = params.length; i < l; ++i) {
            params[i].control_value(value);
        }
    };

    function VirtualMIDIController(synth, virt_ctl_param)
    {
        MIDIController.call(this, synth, virt_ctl_param.default_value);
        Observer.call(this);

        virt_ctl_param.observers.push(this);
    }

    VirtualMIDIController.prototype.control = MIDIController.prototype.control;
    VirtualMIDIController.prototype.update_params = MIDIController.prototype.update_params;
    VirtualMIDIController.prototype.release = MIDIController.prototype.release;
    VirtualMIDIController.prototype.set_value = MIDIController.prototype.set_value;
    VirtualMIDIController.prototype.control_params = MIDIController.prototype.control_params;

    VirtualMIDIController.prototype.update = function (param, value)
    {
        this.set_value(value);
    };

    function Macro(synth, key)
    {
        var input_1 = new MIDIControllableParam(synth, key + "_in", 0.0, 1.0, 0.0),
            input_2 = new MIDIControllableParam(synth, key + "_in2", 0.0, 1.0, 0.0),
            input_3 = new MIDIControllableParam(synth, key + "_in3", 0.0, 1.0, 0.0),
            inputs = {};

        this.key = key;

        this.input_1 = input_1;
        this.input_2 = input_2;
        this.input_3 = input_3;
        this.amt = new MIDIControllableParam(synth, key + "_am", 0.0, 1.0, 1.0);
        this.min = new MIDIControllableParam(synth, key + "_mi", 0.0, 1.0, 0.0);
        this.max = new MIDIControllableParam(synth, key + "_ma", 0.0, 1.0, 1.0);
        this.distortion = new MIDIControllableParam(synth, key + "_ds", 0.0, 1.0, 0.0);
        this.rnd = new MIDIControllableParam(synth, key + "_rn", 0.0, 1.0, 0.0);

        inputs[input_1.key] = input_1;
        inputs[input_2.key] = input_2;
        inputs[input_3.key] = input_3;

        this._inputs = inputs;
        this._last_input_value = 0.0;

        MIDIController.call(this, synth, 0.0);
        Observer.call(this);

        this.input_1.observers.push(this);
        this.input_2.observers.push(this);
        this.input_3.observers.push(this);
        this.amt.observers.push(this);
        this.min.observers.push(this);
        this.max.observers.push(this);
        this.rnd.observers.push(this);
    }

    Macro.prototype.control = MIDIController.prototype.control;
    Macro.prototype.update_params = MIDIController.prototype.update_params;
    Macro.prototype.release = MIDIController.prototype.release;
    Macro.prototype.set_value = MIDIController.prototype.set_value;
    Macro.prototype.control_params = MIDIController.prototype.control_params;

    Macro.prototype.update = function (param, new_value)
    {
        var min = this.min.value,
            distortion = this.distortion.value,
            rnd_weight = this.rnd.value,
            in_value, rnd_value;

        if (this._inputs.hasOwnProperty(param.key) && param.controller !== "none") {
            this._last_input_value = in_value = param.value;
        } else {
            in_value = this._last_input_value;
        }

        if (distortion > 0.0) {
            in_value = (
                distortion / (
                    1.0
                    + Math.exp(
                        - (CTL_DST_STEEPNESS_MIN + distortion * CTL_DST_STEEPNESS_SCALE)
                        * (2.0 * in_value - 1.0)
                    )
                )
                + (1.0 - distortion) * in_value
            );
        }

        if (rnd_weight < 0.0001) {
            this.set_value(min + in_value * this.amt.value * (this.max.value - min));
        } else {
            rnd_value = random_numbers[Math.floor(in_value * (RANDOMS - 1)) | 0];

            this.set_value(
                min + this.amt.value * (this.max.value - min) * (
                    // (1.0 - rnd_weight) * in_value + rnd_weight * rnd_value
                    in_value + rnd_weight * (rnd_value - in_value)
                )
            );
        }
    };

    function UIWidget(class_names)
    {
        var div = document.createElement("div");

        Observer.call(this);

        div.setAttribute("class", class_names || "");

        this.dom_node = div;
    }

    UIWidget.prototype.update = Observer.prototype.update;

    function UIWidgetGroup(class_names)
    {
        UIWidget.call(this, "group " + (class_names || ""))

        this._widgets = [];
    }

    UIWidgetGroup.prototype.update = UIWidget.prototype.update;

    UIWidgetGroup.prototype.add = function (widget)
    {
        this._widgets.push(widget);
        this.dom_node.appendChild(widget.dom_node);
    };

    function NamedUIWidgetGroup(name, class_names, id_attr)
    {
        var div1 = document.createElement("div"),
            span = document.createElement("span"),
            div2 = document.createElement("div");

        UIWidgetGroup.call(this, class_names);

        if (id_attr) {
            this.dom_node.setAttribute("id", id_attr);
        }

        span.innerText = name;

        div1.setAttribute("class", "name");
        div1.appendChild(span);

        div2.setAttribute("class", "description");
        div2.innerText = "";

        this.dom_node.appendChild(div1);
        this.dom_node.appendChild(div2);

        this._name = div1;
        this._description = div2;
    }

    NamedUIWidgetGroup.prototype.update = UIWidgetGroup.prototype.update;
    NamedUIWidgetGroup.prototype.add = UIWidgetGroup.prototype.add;

    NamedUIWidgetGroup.prototype.set_description = function (description)
    {
        this._description.innerText = description;
    };

    function ClosableNamedUIWidgetGroup(name, class_names, id_attr)
    {
        class_names = (class_names || "") + " closable";

        this._open_class_names = class_names;
        this._closed_class_names = class_names + " closed";
        this._is_closed = true;

        NamedUIWidgetGroup.call(this, name, this._closed_class_names, id_attr);

        this._name.onclick = bind(this, this.toggle);
    }

    ClosableNamedUIWidgetGroup.prototype.update = NamedUIWidgetGroup.prototype.update;
    ClosableNamedUIWidgetGroup.prototype.add = NamedUIWidgetGroup.prototype.add;
    ClosableNamedUIWidgetGroup.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    ClosableNamedUIWidgetGroup.prototype.toggle = function (evt)
    {
        var is_closed = !this._is_closed,
            class_names;

        this._is_closed = is_closed;
        class_names = is_closed ? this._closed_class_names : this._open_class_names;

        this.dom_node.setAttribute("class", "group " + class_names);

        return true;
    };

    function SynthUI(synth)
    {
        var midi_module = new VoiceUI("MIDI Module", "color-2", "midi-", synth.midi_voice, synth),
            comp_module = new VoiceUI("QWERTY Module", "color-1", "comp-", synth.comp_voice, synth),
            virtual_modules = new UIWidgetGroup("color-7 horizontal"),
            inputs = new UIWidgetGroup("color-7 vertical"),
            voice_modules = new UIWidgetGroup("color-7 horizontal"),
            virt_ctls = new VirtualControlsUI(synth),
            sequencer = new SequencerUI(synth),
            theremin = new ThereminUI(synth.theremin, synth),
            ctls = new NamedUIWidgetGroup("Controllers", "color-7", "controllers"),
            lfos = new ClosableNamedUIWidgetGroup("Low Frequency Oscillators", "color-7", "lfos"),
            macros = new ClosableNamedUIWidgetGroup("Macros", "color-7", "macros"),
            i, l, si, k;

        UIWidgetGroup.call(this, "color-0 horizontal");

        lfos.toggle();
        macros.toggle();

        synth.observers.push(this);
        synth.comp_keyboard_target.observers.push(this);
        synth.sequencer.target.observers.push(this);

        for (i = 0; i < LFOS; ++i) {
            si = String(i + 1);
            k = "lfo" + si;
            lfos.add(new LFOUI("LFO " + si, synth.controllers[k], synth));
        }

        for (i = 0; i < MACROS; ++i) {
            si = String(i + 1);
            k = "mcs" + String(si);
            macros.add(
                new MacroUI("Macro " + si, synth.controllers[k], synth)
            );
        }

        ctls.add(lfos);
        ctls.add(macros);

        inputs.add(virt_ctls);
        inputs.add(sequencer);

        virtual_modules.add(inputs);
        virtual_modules.add(theremin);
        this.add(virtual_modules);

        voice_modules.add(comp_module);
        voice_modules.add(midi_module);
        this.add(voice_modules);
        this.add(ctls);

        this._synth = synth;
        this._midi_module = midi_module;
        this._comp_module = comp_module;
        this._sequencer = sequencer;

        this.virt_ctls = virt_ctls;
        this.theremin = theremin;
    }

    SynthUI.prototype.add = UIWidgetGroup.prototype.add;

    SynthUI.prototype.update = function (observable, arg)
    {
        var midi_desc = [],
            comp_desc = [],
            seq_desc = [],
            synth = this._synth,
            midi_inputs, i, l;

        if (synth.sequencer.target.value === "comp") {
            comp_desc.push("Sequencer");
        } else {
            midi_desc.push("Sequencer");
        }

        if (synth.comp_keyboard_target.value === "seq") {
            seq_desc.push("Virtual Keyboard");
        } else {
            comp_desc.push("Virtual Keyboard");
        }

        midi_inputs = this._synth.midi_inputs;

        for (i = 0, l = midi_inputs.length; i < l; ++i) {
            midi_desc.push(String(midi_inputs[i].name));
        }

        if (midi_desc.length < 1) {
            midi_desc.push("-");
        } else {
            midi_desc.sort();
        }

        if (comp_desc.length < 1) {
            comp_desc.push("-");
        } else {
            comp_desc.sort();
        }

        if (seq_desc.length < 1) {
            seq_desc.push("-");
        }

        this._midi_module.set_description("Inputs: " + midi_desc.join(", "));
        this._comp_module.set_description("Inputs: " + comp_desc.join(", "));
        this._sequencer.set_description("Inputs: " + seq_desc.join(", "));
    };

    SynthUI.prototype.handle_document_mouse_up = function (evt)
    {
        this.virt_ctls.handle_document_mouse_up(evt);
        this.theremin.handle_document_mouse_up(evt);

        return true;
    };

    function VoiceUI(name, class_names, id_prefix, voice, synth)
    {
        var settings = new UIWidgetGroup(),
            osc1 = new OscillatorUI("Oscillator 1 (modulator)", "color-4", id_prefix + "osc-1", voice.osc_1, synth),
            osc2 = new OscillatorUI("Oscillator 2 (carrier)", "color-3", id_prefix + "osc-2", voice.osc_2, synth),
            effects = new ClosableNamedUIWidgetGroup("Effects", "effects color-0", id_prefix + "fx");

        NamedUIWidgetGroup.call(this, name, "module vertical " + class_names, id_prefix + "module");

        settings.add(new FaderUI("VOL", "Volume", "%", 1000, 10, ALL_CONTROLS, voice.volume, synth));
        settings.add(new FaderUI("AM", "Amplitude modulation volume", "%", 1000, 10, ALL_CONTROLS, voice.am_volume, synth));
        settings.add(new FaderUI("FM", "Frequency modulation volume", "%", 100, 100, ALL_CONTROLS, voice.fm_volume, synth));
        settings.add(new SelectUI("1+2", "Relation of Oscillator 1 and Oscillator 2", "modulation", voice.modulation, synth));

        effects.add(new DistortionUI("Overdrive", "vertical color-8", voice.effects.overdrive, synth));
        effects.add(new DistortionUI("Distortion", "vertical color-9", voice.effects.distortion, synth));
        effects.add(new ShelfFilterUI("Low shelf", "vertical color-4", voice.effects.low_shelf, synth));
        effects.add(new ShelfFilterUI("High shelf", "vertical color-3", voice.effects.high_shelf, synth));
        effects.add(new EchoUI(synth, voice.effects.echo));
        effects.add(new ReverbUI(synth, voice.effects.reverb));

        this.add(settings);
        this.add(osc1);
        this.add(osc2);
        this.add(effects);
    }

    VoiceUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    VoiceUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    VoiceUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function OscillatorUI(name, class_names, id_attr, complex_osc, synth)
    {
        var params = new UIWidgetGroup("vertical"),
            amp_env = new NamedUIWidgetGroup("Amplitude envelope", "vertical"),
            prefold_amp_env = new PrefoldAmpEnvUI(complex_osc, synth),
            custom_waveform = new CustomWaveParamsUI("", complex_osc.custom_waveform, synth),
            filters = new ClosableNamedUIWidgetGroup("Filters", "filters horizontal"),
            env_highpass = new EnvelopeHighpassUI(complex_osc, synth),
            env_lowpass = new EnvelopeLowpassUI(complex_osc, synth),
            lfo_highpass = new LFOCompatibleHighpassUI("", complex_osc.lfo_highpass_params, synth),
            lfo_lowpass = new LFOCompatibleLowpassUI("", complex_osc.lfo_lowpass_params, synth),
            wav = new SelectUI("WAV", "Waveform", "waveform-selector", complex_osc.waveform, synth);

        ClosableNamedUIWidgetGroup.call(this, name, "horizontal oscillator " + class_names, id_attr);

        params.add(new FaderUI("VOL", "Volume", "%", 1000 * FOLD_THRESHOLD, 10, ALL_CONTROLS, complex_osc.volume, synth));
        params.add(new FaderUI("VS", "Velocity sensitivity", "%", 100, 1, MIDI_CONTROLS, complex_osc.velocity_sensitivity, synth));
        params.add(new FaderUI("VOS", "Velocity oversensitivity", "%", 100, 1, MIDI_CONTROLS, complex_osc.vel_ovsens, synth));
        params.add(new FaderUI("PAN", "Panning", "%", 100, 1, ALL_CONTROLS, complex_osc.pan, synth));
        params.add(new FaderUI("WID", "Width", "%", 100, 1, MIDI_CONTROLS, complex_osc.width, synth));
        params.add(new FaderUI("FLD", "Folding", "%", 1000 / FOLD_MAX, 10, ALL_CONTROLS, complex_osc.folding, synth));
        params.add(new FaderUI("PRT", "Portamento time", "s", 100, 100, MIDI_CONTROLS, complex_osc.prt_time, synth));
        params.add(new FaderUI("PRD", "Portamento depth (cents; 0 = start from latest note)", "c", 1, 1, MIDI_CONTROLS, complex_osc.prt_depth, synth));
        params.add(new FaderUI("DTN", "Detune (semitones)", "st", 1, 1, MIDI_CONTROLS, complex_osc.detune, synth));
        params.add(new FaderUI("FIN", "Fine detune (cents)", "c", 10, 10, ALL_CONTROLS, complex_osc.fine_detune, synth));

        amp_env.add(new FaderUI("DEL", "Delay time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[0], synth));
        amp_env.add(new FaderUI("ATK", "Attack time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[1], synth));
        amp_env.add(new FaderUI("PK", "Peak level", "%", 1000, 10, MIDI_CONTROLS, complex_osc.amp_env_params[2], synth));
        amp_env.add(new FaderUI("HLD", "Hold time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[3], synth));
        amp_env.add(new FaderUI("DEC", "Decay time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[4], synth));
        amp_env.add(new FaderUI("SUS", "Sustain level", "%", 1000, 10, MIDI_CONTROLS, complex_osc.amp_env_params[5], synth));
        amp_env.add(new FaderUI("REL", "Release time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[6], synth));

        filters.add(env_highpass);
        filters.add(env_lowpass);
        filters.add(lfo_highpass);
        filters.add(lfo_lowpass);

        this.add(wav);
        this.add(params);
        this.add(amp_env);
        this.add(prefold_amp_env);
        this.add(custom_waveform)
        this.add(filters);

        this.toggle();
    }

    OscillatorUI.prototype.update = ClosableNamedUIWidgetGroup.prototype.update;
    OscillatorUI.prototype.add = ClosableNamedUIWidgetGroup.prototype.add;
    OscillatorUI.prototype.set_description = ClosableNamedUIWidgetGroup.prototype.set_description;
    OscillatorUI.prototype.toggle = ClosableNamedUIWidgetGroup.prototype.toggle;

    function CustomWaveParamsUI(class_names, custom_waveform, synth)
    {
        var params = custom_waveform.params,
            group_1 = new UIWidgetGroup("vertical"),
            group_2 = new UIWidgetGroup("vertical"),
            i, l, n, o, f;

        ClosableNamedUIWidgetGroup.call(this, "Custom Waveform", "custom-waveform horizontal " + (class_names || ""));

        for (i = 0, l = params.length; i < l; ++i) {
            n = String(i + 1);
            o = (i === 0) ? "st" : (i === 1) ? "nd" : (i === 2) ? "rd" : "th";
            f = new FaderUI(n, n + o + " harmonic", "%", 100, 1, MIDI_CONTROLS, params[i], synth);

            ((i < 5) ? group_1 : group_2).add(f);
        }

        this.add(group_1);
        this.add(group_2);
    }

    CustomWaveParamsUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    CustomWaveParamsUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    CustomWaveParamsUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;
    CustomWaveParamsUI.prototype.toggle = ClosableNamedUIWidgetGroup.prototype.toggle;

    function EnvelopeBiquadFilterUI(name, onoff_param, log_freq_param, params, synth)
    {
        var onoff = new OnOffSwitch(onoff_param),
            log_freq = new OnOffSwitch(log_freq_param, "log", "lin"),
            freq = new UIWidgetGroup("vertical"),
            q = new UIWidgetGroup("vertical");

        NamedUIWidgetGroup.call(this, name, "vertical");

        this._name.appendChild(onoff.dom_node);
        this._name.appendChild(log_freq.dom_node);
        this._onoff = onoff;

        freq.add(new LogLinFreqFaderUI("IF", "Initial frequency", MIDI_CONTROLS, params[0], synth, log_freq_param));
        freq.add(new FaderUI("DEL", "Delay", "s", 1000, 1000, MIDI_CONTROLS, params[1], synth));
        freq.add(new FaderUI("ATK", "Attack", "s", 1000, 1000, MIDI_CONTROLS, params[2], synth));
        freq.add(new LogLinFreqFaderUI("PF", "Peak frequency", MIDI_CONTROLS, params[3], synth, log_freq_param));
        freq.add(new FaderUI("HLD", "Hold", "s", 1000, 1000, MIDI_CONTROLS, params[4], synth));
        freq.add(new FaderUI("DEC", "Decay", "s", 1000, 1000, MIDI_CONTROLS, params[5], synth));
        freq.add(new LogLinFreqFaderUI("SF", "Sustain frequency", MIDI_CONTROLS, params[6], synth, log_freq_param));
        freq.add(new FaderUI("REL", "Release", "s", 1000, 1000, MIDI_CONTROLS, params[7], synth));
        freq.add(new LogLinFreqFaderUI("RF", "Release frequency", MIDI_CONTROLS, params[8], synth, log_freq_param));

        q.add(new FaderUI("IQ", "Initial Q factor", "", 100, 100, MIDI_CONTROLS, params[9], synth));
        q.add(new FaderUI("DEL", "Delay", "s", 1000, 1000, MIDI_CONTROLS, params[10], synth));
        q.add(new FaderUI("ATK", "Attack", "s", 1000, 1000, MIDI_CONTROLS, params[11], synth));
        q.add(new FaderUI("PQ", "Peak Q factor", "", 100, 100, MIDI_CONTROLS, params[12], synth));
        q.add(new FaderUI("HLD", "Hold", "s", 1000, 1000, MIDI_CONTROLS, params[13], synth));
        q.add(new FaderUI("DEC", "Decay", "s", 1000, 1000, MIDI_CONTROLS, params[14], synth));
        q.add(new FaderUI("SQ", "Sustain Q factor", "", 100, 100, MIDI_CONTROLS, params[15], synth));
        q.add(new FaderUI("REL", "Release", "s", 1000, 1000, MIDI_CONTROLS, params[16], synth));
        q.add(new FaderUI("RQ", "Release Q factor", "", 100, 100, MIDI_CONTROLS, params[17], synth));

        this.add(freq);
        this.add(q);
    }

    EnvelopeBiquadFilterUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    EnvelopeBiquadFilterUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    EnvelopeBiquadFilterUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function EnvelopeHighpassUI(complex_osc, synth)
    {
        EnvelopeBiquadFilterUI.call(
            this,
            "Highpass (envelope)",
            complex_osc.env_highpass_onoff,
            complex_osc.env_highpass_log_freq,
            complex_osc.env_highpass_params,
            synth
        );
    }

    EnvelopeHighpassUI.prototype.update = EnvelopeBiquadFilterUI.prototype.update;
    EnvelopeHighpassUI.prototype.add = EnvelopeBiquadFilterUI.prototype.add;
    EnvelopeHighpassUI.prototype.set_description = EnvelopeBiquadFilterUI.prototype.set_description;

    function EnvelopeLowpassUI(complex_osc, synth)
    {
        EnvelopeBiquadFilterUI.call(
            this,
            "Lowpass (envelope)",
            complex_osc.env_lowpass_onoff,
            complex_osc.env_lowpass_log_freq,
            complex_osc.env_lowpass_params,
            synth
        );
    }

    EnvelopeLowpassUI.prototype.update = EnvelopeBiquadFilterUI.prototype.update;
    EnvelopeLowpassUI.prototype.add = EnvelopeBiquadFilterUI.prototype.add;
    EnvelopeLowpassUI.prototype.set_description = EnvelopeBiquadFilterUI.prototype.set_description;

    function LFOCompatibleBiquadFilterUI(name, class_names, lfo_compatible_filter_params, synth)
    {
        var onoff = new OnOffSwitch(lfo_compatible_filter_params[0]),
            log_freq = new OnOffSwitch(lfo_compatible_filter_params[1], "log", "lin");

        NamedUIWidgetGroup.call(this, name, "vertical " + (class_names || ""));

        this._name.appendChild(onoff.dom_node);
        this._name.appendChild(log_freq.dom_node);
        this._onoff = onoff;

        this.add(
            new LogLinFreqFaderUI(
                "FRQ", "Frequency", ALL_CONTROLS, lfo_compatible_filter_params[2], synth, lfo_compatible_filter_params[1]
            )
        );
        this.add(new FaderUI("Q", "Q factor", "", 100, 100, ALL_CONTROLS, lfo_compatible_filter_params[3], synth));
    }

    LFOCompatibleBiquadFilterUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    LFOCompatibleBiquadFilterUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    LFOCompatibleBiquadFilterUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function LFOCompatibleHighpassUI(class_names, lfo_compatible_filter_params, synth)
    {
        LFOCompatibleBiquadFilterUI.call(this, "Highpass (LFO)", class_names, lfo_compatible_filter_params, synth);
    }

    LFOCompatibleHighpassUI.prototype.update = LFOCompatibleBiquadFilterUI.prototype.update;
    LFOCompatibleHighpassUI.prototype.add = LFOCompatibleBiquadFilterUI.prototype.add;
    LFOCompatibleHighpassUI.prototype.set_description = LFOCompatibleBiquadFilterUI.prototype.set_description;

    function LFOCompatibleLowpassUI(class_names, lfo_compatible_filter_params, synth)
    {
        LFOCompatibleBiquadFilterUI.call(this, "Lowpass (LFO)", class_names, lfo_compatible_filter_params, synth);
    }

    LFOCompatibleLowpassUI.prototype.update = LFOCompatibleBiquadFilterUI.prototype.update;
    LFOCompatibleLowpassUI.prototype.add = LFOCompatibleBiquadFilterUI.prototype.add;
    LFOCompatibleLowpassUI.prototype.set_description = LFOCompatibleBiquadFilterUI.prototype.set_description;

    function PrefoldAmpEnvUI(complex_osc, synth)
    {
        var params = complex_osc.env_prefold_amp_params;

        ClosableNamedUIWidgetGroup.call(this, "Pre-fold amplitude envelope", "horizontal");

        this.add(new FaderUI("DEL", "Delay", "s", 1000, 1000, MIDI_CONTROLS, params[1], synth));
        this.add(new FaderUI("IA", "Initial amplitude", "%", 200, 2, MIDI_CONTROLS, params[0], synth));
        this.add(new FaderUI("ATK", "Attack", "s", 1000, 1000, MIDI_CONTROLS, params[2], synth));
        this.add(new FaderUI("PA", "Peak amplitude", "%", 200, 2, MIDI_CONTROLS, params[3], synth));
        this.add(new FaderUI("HLD", "Hold", "s", 1000, 1000, MIDI_CONTROLS, params[4], synth));
        this.add(new FaderUI("SA", "Sustain amplitude", "%", 200, 2, MIDI_CONTROLS, params[6], synth));
        this.add(new FaderUI("DEC", "Decay", "s", 1000, 1000, MIDI_CONTROLS, params[5], synth));
        this.add(new FaderUI("RA", "Release amplitude", "%", 200, 2, MIDI_CONTROLS, params[8], synth));
        this.add(new FaderUI("REL", "Release", "s", 1000, 1000, MIDI_CONTROLS, params[7], synth));
    }

    PrefoldAmpEnvUI.prototype.update = ClosableNamedUIWidgetGroup.prototype.update;
    PrefoldAmpEnvUI.prototype.add = ClosableNamedUIWidgetGroup.prototype.add;
    PrefoldAmpEnvUI.prototype.set_description = ClosableNamedUIWidgetGroup.prototype.set_description;
    PrefoldAmpEnvUI.prototype.toggle = ClosableNamedUIWidgetGroup.prototype.toggle;

    function ShelfFilterUI(name, class_names, shelf_filter, synth)
    {
        var onoff = new OnOffSwitch(shelf_filter.onoff);

        NamedUIWidgetGroup.call(this, name, "vertical " + (class_names || ""));

        this._name.appendChild(onoff.dom_node);
        this._onoff = onoff;

        this.add(new FaderUI("FRQ", "Frequency", "Hz", 1, 1, ALL_CONTROLS, shelf_filter.freq, synth));
        this.add(new FaderUI("G", "Gain", "", 2, 2, ALL_CONTROLS, shelf_filter.gain, synth));
    }

    ShelfFilterUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    ShelfFilterUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    ShelfFilterUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function SelectUI(label, title, class_names, param, synth)
    {
        var select = document.createElement("select"),
            label1;

        UIWidget.call(this, "param " + (class_names || ""));
        Observer.call(this);

        this._select = select;
        this._param = param;

        param.observers.push(this);

        populate_select(select, param.valid_values);
        change_selection(select, param.value);
        select.setAttribute("id", param.key);
        select.setAttribute("name", param.key);
        select.setAttribute("title", title);
        select.onchange = bind(this, this.handle_select_change);

        if (label) {
            label1 = document.createElement("label");
            label1.innerText = label;
            label1.setAttribute("for", param.key);
            label1.setAttribute("title", title);
            this.dom_node.appendChild(label1);
        }

        this.dom_node.appendChild(select);
    }

    SelectUI.prototype.handle_select_change = function (e)
    {
        this._param.set_value(this._select.value);

        return true;
    };

    SelectUI.prototype.update = function (param, new_value)
    {
        change_selection(this._select, new_value);
    };

    function MacroUI(name, macro, synth)
    {
        var input_1 = new FaderUI("IN1", "Input 1", "%", 10000, 100, MIDI_CONTROLS, macro.input_1, synth),
            input_2 = new FaderUI("IN2", "Input 2", "%", 10000, 100, MIDI_CONTROLS, macro.input_2, synth),
            input_3 = new FaderUI("IN3", "Input 3", "%", 10000, 100, MIDI_CONTROLS, macro.input_3, synth),
            amt = new FaderUI("AMT", "Amount", "%", 10000, 100, MIDI_CONTROLS, macro.amt, synth),
            min = new FaderUI("MIN", "Minimum value", "%", 10000, 100, MIDI_CONTROLS, macro.min, synth),
            max = new FaderUI("MAX", "Maximum value", "%", 10000, 100, MIDI_CONTROLS, macro.max, synth),
            distortion = new FaderUI("DST", "Distortion", "%", 500, 5, MIDI_CONTROLS, macro.distortion, synth),
            rnd = new FaderUI("RND", "Randomness", "%", 10000, 100, MIDI_CONTROLS, macro.rnd, synth);

        NamedUIWidgetGroup.call(this, name, "horizontal macro color-6");

        this.dom_node.setAttribute("title", "Macro");

        this.add(input_1);
        this.add(input_2);
        this.add(input_3);
        this.add(amt);
        this.add(min);
        this.add(max);
        this.add(distortion);
        this.add(rnd);
    }

    MacroUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    MacroUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    MacroUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function LFOUI(name, lfo_ctl, synth)
    {
        var wav = new SelectUI("WAV", "Waveform", "waveform-selector", lfo_ctl.waveform, synth),
            freq = new FaderUI("FRQ", "Frequency", "Hz", 100, 100, ALL_CONTROLS, lfo_ctl.frequency, synth),
            amt = new FaderUI("AMT", "Amount", "%", 5000, 50, ALL_CONTROLS, lfo_ctl.amt, synth),
            min = new FaderUI("MIN", "Minimum value", "%", 5000, 50, MIDI_CONTROLS, lfo_ctl.min, synth),
            max = new FaderUI("MAX", "Maximum value", "%", 5000, 50, MIDI_CONTROLS, lfo_ctl.max, synth),
            distortion = new FaderUI("DST", "Distortion", "%", 500, 5, MIDI_CONTROLS, lfo_ctl.distortion, synth),
            rnd = new FaderUI("RND", "Randomness", "%", 5000, 50, MIDI_CONTROLS, lfo_ctl.rnd, synth);

        NamedUIWidgetGroup.call(this, name, "horizontal lfo color-8");

        this.dom_node.setAttribute("title", "Low-frequency oscillator");

        this.add(wav);
        this.add(freq);
        this.add(amt);
        this.add(min);
        this.add(max);
        this.add(distortion);
        this.add(rnd);
    }

    LFOUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    LFOUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    LFOUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function DistortionUI(name, class_names, distortion, synth)
    {
        var onoff = new OnOffSwitch(distortion.onoff),
            amt = new FaderUI("G", "Gain", "%", 1000, 10, ALL_CONTROLS, distortion.gain, synth);

        NamedUIWidgetGroup.call(this, name, class_names);

        this._name.appendChild(onoff.dom_node);
        this._onoff = onoff;

        this.add(amt);
    }

    DistortionUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    DistortionUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    DistortionUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function EchoUI(synth, echo)
    {
        var onoff = new OnOffSwitch(echo.onoff),
            delay = new FaderUI("D", "Delay time", "s", 1000, 1000, ALL_CONTROLS, echo.delay, synth),
            feedback = new FaderUI("FB", "Feedback", "%", 1000, 10, ALL_CONTROLS, echo.feedback, synth),
            damping_freq = new FaderUI("DF", "Damping frequency", "Hz", 1, 1, ALL_CONTROLS, echo.damping_freq, synth),
            damping_gain = new FaderUI("DG", "Damping gain", "dB", 10, 10, ALL_CONTROLS, echo.damping_gain, synth),
            width = new FaderUI("W", "Stereo width", "%", 1000, 10, ALL_CONTROLS, echo.width, synth),
            highpass = new FaderUI("HP", "Highpass", "Hz", 1, 1, ALL_CONTROLS, echo.highpass_freq, synth),
            dry = new FaderUI("DRY", "Dry volume", "%", 1000, 10, ALL_CONTROLS, echo.dry, synth),
            wet = new FaderUI("WET", "Wet volume", "%", 1000, 10, ALL_CONTROLS, echo.wet, synth);

        NamedUIWidgetGroup.call(this, "Echo", "vertical color-2");

        this._name.appendChild(onoff.dom_node);
        this._onoff = onoff;

        this.add(delay);
        this.add(feedback);
        this.add(damping_freq);
        this.add(damping_gain);
        this.add(width);
        this.add(highpass);
        this.add(wet);
        this.add(dry);
    }

    EchoUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    EchoUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    EchoUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function ReverbUI(synth, reverb)
    {
        var onoff = new OnOffSwitch(reverb.onoff),
            room_size = new FaderUI("RS", "Room size", "%", 1000, 10, ALL_CONTROLS, reverb.room_size, synth),
            damping_freq = new FaderUI("DF", "Damping frequency", "Hz", 1, 1, ALL_CONTROLS, reverb.damping_freq, synth),
            damping_gain = new FaderUI("DG", "Damping gain", "dB", 10, 10, ALL_CONTROLS, reverb.damping_gain, synth),
            width = new FaderUI("W", "Stereo width", "%", 2000, 10, ALL_CONTROLS, reverb.width, synth),
            highpass = new FaderUI("HP", "Highpass", "Hz", 1, 1, ALL_CONTROLS, reverb.highpass_freq, synth),
            dry = new FaderUI("DRY", "Dry volume", "%", 1000, 10, ALL_CONTROLS, reverb.dry, synth),
            wet = new FaderUI("WET", "Wet volume", "%", 1000, 10, ALL_CONTROLS, reverb.wet, synth);

        NamedUIWidgetGroup.call(this, "Reverb", "vertical color-5");

        this._name.appendChild(onoff.dom_node);
        this._onoff = onoff;

        this.add(room_size);
        this.add(damping_freq);
        this.add(damping_gain);
        this.add(width);
        this.add(highpass);
        this.add(wet);
        this.add(dry);
    }

    ReverbUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    ReverbUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    ReverbUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function OnOffSwitch(param, on_text, off_text)
    {
        var input = document.createElement("input"),
            label = document.createElement("label"),
            span = document.createElement("span");

        this.on_text = on_text || "on";
        this.off_text = off_text || "off";

        UIWidget.call(this, "onoff");

        input.setAttribute("id", param.key);
        input.setAttribute("name", param.key);
        input.setAttribute("type", "checkbox");
        input.onchange = bind(this, this.handle_input_change);

        span.innerText = this.off_text;

        label.setAttribute("for", param.key);
        label.appendChild(input);
        label.appendChild(span);

        this.dom_node.appendChild(label);
        this._param = param;
        this._input = input;
        this._label = label;
        this._span = span;

        param.observers.push(this);
        this.update(param, param.value);
    }

    OnOffSwitch.prototype.update = function (param, new_value)
    {
        var value = param.value,
            is_on = value === "on";

        this._input.checked = is_on;
        this._span.innerText = is_on ? this.on_text : this.off_text;
    };

    OnOffSwitch.prototype.handle_input_change = function ()
    {
        var new_state = this._input.checked ? "on" : "off";

        this._param.set_value(new_state);
        this._span.innerText = (new_state === "on") ? this.on_text : this.off_text;

        return true;
    };

    function FaderUI(label, name, unit, scale, display_scale, controls, param, synth)
    {
        var input = document.createElement("input"),
            label1 = document.createElement("label"),
            label2 = document.createElement("label"),
            span1 = document.createElement("span"),
            span2 = document.createElement("span"),
            select = null,
            min, max, value, tooltip;

        min = param.min * scale;
        max = param.max * scale;
        value = param.value * scale;

        tooltip = (
            name
            + " (" + String(min / display_scale) + unit
            + " - " + String(max / display_scale) + unit + ")"
        );

        UIWidget.call(this, "param");

        input.setAttribute("id", param.key);
        input.setAttribute("name", param.key);
        input.setAttribute("class", "fader");
        input.setAttribute("type", "range");
        input.setAttribute("min", min);
        input.setAttribute("max", max);
        input.setAttribute("title", tooltip);
        input.value = value;
        input.onwheel = bind(this, this.handle_wheel);
        input.onchange = bind(this, this.handle_input_change);
        input.oninput = bind(this, this.handle_input_change);

        label1.innerText = label;
        label1.setAttribute("for", param.key);
        label1.setAttribute("title", tooltip);

        span2.innerText = unit;
        label2.setAttribute("for", param.key);
        label2.setAttribute("title", tooltip);
        label2.appendChild(span1);
        label2.appendChild(span2);

        this.dom_node.appendChild(label1);
        this.dom_node.appendChild(input);
        this.dom_node.appendChild(label2);

        if (controls) {
            select = document.createElement("select");
            populate_select(select, controls);
            select.setAttribute("title", "Controller");
            select.onchange = bind(this, this.handle_control_change);
            select.value = param.controller;
            this.dom_node.appendChild(select);
        }

        this._min = min;
        this._max = max;
        this._scale = scale;
        this._display_scale = display_scale;
        this._value = span1;
        this._input = input;
        this._control = select;
        this._param = param;
        this._synth = synth;
        this._is_connected = false;
        this._is_updating_param = false;

        param.observers.push(this);

        this.update_screen();
    }

    FaderUI.prototype.update = function (param, new_value)
    {
        if (this._is_updating_param) {
            return;
        }

        this._input.value = Math.round(this._param.value * this._scale);

        if (this._control !== null) {
            this._control.value = param.controller;
        }

        this.update_screen();
    };

    FaderUI.prototype.handle_wheel = function (e)
    {
        var delta, value;

        if (this._is_connected) {
            return stop_event(e);
        }

        delta = (e.deltaY > 0) ? -1 : 1;

        this._input.value = value = Math.max(
            this._min,
            Math.min(
                Number(this._input.value) + delta,
                this._max
            )
        );

        this.update_param(value);
        this.update_screen();

        return stop_event(e);
    };

    FaderUI.prototype.update_param = function (input_value)
    {
        this._is_updating_param = true;
        this._param.set_value(input_value / this._scale);
        this._is_updating_param = false;
    };

    FaderUI.prototype.handle_input_change = function (e)
    {
        if (this._is_connected) {
            return true;
        }

        this.update_param(this._input.value);
        this.update_screen();

        return true;
    };

    FaderUI.prototype.handle_control_change = function (e)
    {
        var new_ctl = this._control.value;

        this._param.disconnect();

        if (new_ctl === "none") {
            this.update_param(this._input.value);
            this.update_screen();
            return true;
        }

        this._synth.connect(this._param, new_ctl);
        this.update_screen();

        return true;
    };

    FaderUI.prototype.update_screen = function ()
    {
        var ctl = this._param.controller;

        this._value.innerText = String(this._calculate_display_value());

        if (ctl === "none") {
            this._is_connected = false;
            this._input.readonly = false;
            this._input.disabled = false;
            this.dom_node.setAttribute("class", "param");
            return;
        }

        this._is_connected = true;
        this._input.readonly = true;
        this._input.disabled = true;

        if (ctl.substring(0, 3) === "lfo") {
            this.dom_node.setAttribute("class", "param connected-lfo");
        } else {
            this.dom_node.setAttribute("class", "param connected-midi");
        }
    };

    FaderUI.prototype._calculate_display_value = function ()
    {
        return Math.round(this._input.value * 1000 / this._display_scale) / 1000;
    };

    function LogLinFreqFaderUI(label, name, controls, param, synth, log_freq)
    {
        this._log_freq = log_freq;

        FaderUI.call(this, label, name, "Hz", 1000.0, 1000.0, controls, param, synth);

        log_freq.observers.push(this);
    }

    LogLinFreqFaderUI.prototype.update = FaderUI.prototype.update;
    LogLinFreqFaderUI.prototype.handle_wheel = FaderUI.prototype.handle_wheel;
    LogLinFreqFaderUI.prototype.update_param = FaderUI.prototype.update_param;
    LogLinFreqFaderUI.prototype.handle_input_change = FaderUI.prototype.handle_input_change;
    LogLinFreqFaderUI.prototype.handle_control_change = FaderUI.prototype.handle_control_change;
    LogLinFreqFaderUI.prototype.update_screen = FaderUI.prototype.update_screen;

    LogLinFreqFaderUI.prototype._calculate_display_value = function ()
    {
        var value = this._input.value / this._display_scale;

        if (this._log_freq.value == "on") {
            value = ratio_to_log_filter_freq_ratio(value);
        }

        return Math.round(SND_FREQ_MIN + SND_FREQ_DELTA * value);
    };

    function VirtualControlsUI(synth)
    {
        var keyboard = document.createElement("div"),
            virt_ctls = new ClosableNamedUIWidgetGroup("Virtual Controllers"),
            virt_keys = {},
            touch_ctl_1 = new TouchControllerUI("Touchpad 1", synth.touch_1_x_ctl, synth.touch_1_y_ctl),
            touch_ctl_2 = new TouchControllerUI("Touchpad 2", synth.touch_2_x_ctl, synth.touch_2_y_ctl),
            i, l, virt_key, key_desc, dom_node;

        NamedUIWidgetGroup.call(this, "Virtual Inputs", "module color-1", "virt-inputs");

        this.set_description("Octave up/down: [left] and [right], more velocity: [shift]");

        this.add(new SelectUI("Target", "Target", "wide", synth.comp_keyboard_target, synth));

        synth.on_virtual_key_down = bind(this, this.handle_virtual_key_down);
        synth.on_virtual_key_up = bind(this, this.handle_virtual_key_up);

        keyboard.setAttribute("class", "virt-keyboard");

        for (i in QWERTY) {
            if (!QWERTY.hasOwnProperty(i)) {
                continue;
            }

            key_desc = QWERTY[i];
            virt_key = document.createElement("div");
            virt_key.setAttribute("id", "virt-key-" + i);
            virt_key.setAttribute("class", "virt-key inactive " + key_desc[2]);
            virt_key.innerHTML = "[" + key_desc[1].substring(0, 1) + "]<br />[" + key_desc[1].substring(1, 2) + "]";
            virt_key.onmousedown = bind(this, this.handle_virtual_key_mouse_down);
            virt_key.onmouseup = bind(this, this.handle_virtual_key_mouse_up);
            virt_key.onmouseenter = bind(this, this.handle_virtual_key_mouse_enter);
            virt_key.onmouseleave = bind(this, this.handle_virtual_key_mouse_leave);
            virt_key.ontouchstart = bind(this, this.handle_virtual_key_touch_start);
            virt_key.ontouchend = bind(this, this.handle_virtual_key_touch_end);
            virt_key.ontouchcancel = bind(this, this.handle_virtual_key_touch_end);
            keyboard.appendChild(virt_key);

            virt_keys[i] = virt_key;
        }

        this.dom_node.appendChild(keyboard);

        this._virt_keys = virt_keys;
        this._touch_ctl_1 = touch_ctl_1;
        this._touch_ctl_2 = touch_ctl_2;
        this._synth = synth;
        this._mouse_down = false;

        this.add(new FaderUI("DTN", "Detune (semitones)", "st", 1, 1, null, synth.virt_detune, synth));

        virt_ctls.add(new FaderUI("virtual 1", "Virtual controller 1", "%", 1000, 10, null, synth.virt_ctl_params[0], synth));
        virt_ctls.add(new FaderUI("virtual 2", "Virtual controller 2", "%", 1000, 10, null, synth.virt_ctl_params[1], synth));
        virt_ctls.add(new FaderUI("virtual 3", "Virtual controller 3", "%", 1000, 10, null, synth.virt_ctl_params[2], synth));
        virt_ctls.add(new FaderUI("virtual 4", "Virtual controller 4", "%", 1000, 10, null, synth.virt_ctl_params[3], synth));
        virt_ctls.add(new FaderUI("virtual 5", "Virtual controller 5", "%", 1000, 10, null, synth.virt_ctl_params[4], synth));
        virt_ctls.add(touch_ctl_1);
        virt_ctls.add(touch_ctl_2);

        this.add(virt_ctls);
    }

    VirtualControlsUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    VirtualControlsUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    VirtualControlsUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    VirtualControlsUI.prototype.handle_virtual_key_mouse_down = function (evt)
    {
        var evt_target;

        evt = evt || event;
        evt_target = evt.target;

        this._synth.virtual_key_down(
            this._get_key_code_from_dom_node(evt_target),
            this._pos_to_vel(evt_target, evt.clientY)
        );
        this._mouse_down = true;

        return stop_event(evt);
    };

    VirtualControlsUI.prototype._pos_to_vel = function (dom_node, doc_pos_y)
    {
        var rect = dom_node.getClientRects()[0];

        return ((doc_pos_y - rect.top) / rect.height) * 0.6 + 0.4;
    };

    VirtualControlsUI.prototype._get_key_code_from_dom_node = function (dom_node)
    {
        var id_attr;

        id_attr = dom_node.getAttribute("id");

        return id_attr.substring(9, id_attr.length);
    };

    VirtualControlsUI.prototype.handle_virtual_key_mouse_up = function (evt)
    {
        evt = evt || event;

        this._synth.virtual_key_up(this._get_key_code_from_dom_node(evt.target));
        this._mouse_down = false;

        return stop_event(evt);
    };

    VirtualControlsUI.prototype.handle_document_mouse_up = function (evt)
    {
        this._mouse_down = false;

        this._touch_ctl_1.handle_document_mouse_up(evt);
        this._touch_ctl_2.handle_document_mouse_up(evt);

        return true;
    };

    VirtualControlsUI.prototype.handle_virtual_key_mouse_enter = function (evt)
    {
        var evt_target;

        evt = evt || event;
        evt_target = evt.target;

        if (this._mouse_down) {
            this._synth.virtual_key_down(
                this._get_key_code_from_dom_node(evt_target),
                this._pos_to_vel(evt_target, evt.clientY)
            );
        }

        return true;
    };

    VirtualControlsUI.prototype.handle_virtual_key_mouse_leave = function (evt)
    {
        evt = evt || event;

        this._synth.virtual_key_up(this._get_key_code_from_dom_node(evt.target));

        return true;
    };

    VirtualControlsUI.prototype.handle_virtual_key_down = function (key_code)
    {
        var key_desc = QWERTY[key_code];

        this._virt_keys[key_code].setAttribute("class", "virt-key active " + key_desc[2]);

        return true;
    };

    VirtualControlsUI.prototype.handle_virtual_key_up = function (key_code)
    {
        var key_desc = QWERTY[key_code];

        this._virt_keys[key_code].setAttribute("class", "virt-key inactive " + key_desc[2]);

        return true;
    };

    VirtualControlsUI.prototype.handle_virtual_key_touch_start = function (evt)
    {
        var ct, t, i, l;

        evt = evt || event;
        ct = evt.changedTouches;

        for (i = 0, l = ct.length; i < l; ++i) {
            t = ct[i];

            this._synth.virtual_key_down(
                this._get_key_code_from_dom_node(t.target),
                this._pos_to_vel(t.target, t.clientY)
            );
        }

        return stop_event(evt);
    };

    VirtualControlsUI.prototype.handle_virtual_key_touch_end = function (evt)
    {
        var ct, i, l;

        evt = evt || event;
        ct = evt.changedTouches;

        for (i = 0, l = ct.length; i < l; ++i) {
            this._synth.virtual_key_up(this._get_key_code_from_dom_node(ct[i].target));
        }

        return stop_event(evt);
    };

    function SequencerUI(synth)
    {
        var sequencer = synth.sequencer,
            onoff = new OnOffSwitch(synth.sequencer.onoff),
            bank_uis = {},
            bank, bank_ui, span,
            scale_ui, scheduled_roots_ui, beats_ui,
            beats_table, beats_row, beats_cell, beats_section, step_ui,
            i, j, k, n, c;

        NamedUIWidgetGroup.call(this, "Sequencer [space]", "module color-7", "sequencer"),

        this._name.appendChild(onoff.dom_node);
        this._onoff = onoff;

        for (i in sequencer.banks) {
            if (!sequencer.banks.hasOwnProperty(i)) {
                continue;
            }

            bank = sequencer.banks[i];
            n = String(Number(i.substr(1, 1)) + 1);
            c = String(Number(i.substr(1, 1)) + 3);
            bank_ui = new NamedUIWidgetGroup("Bank " + n + " [" + n + "]", "seq-bank color-" + c);

            scale_ui = new NamedUIWidgetGroup("Scale", "seq-selects color-" + c);

            for (j = 0; j < 12; ++j) {
                scale_ui.add(new SelectUI("", "Scale note " + String(j + 1), "seq-scale", bank.scale[j], synth));
            }

            scheduled_roots_ui = new NamedUIWidgetGroup("Roots", "seq-selects color-" + c);

            for (j = 0; j < 12; ++j) {
                scheduled_roots_ui.add(new SelectUI("", "Root note " + String(j + 1), "seq-scale", bank.scheduled_roots[j], synth));
            }

            beats_ui = new UIWidgetGroup("seq-selects color-" + c);

            beats_table = document.createElement("table");
            beats_table.setAttribute("class", "seq-beats");
            beats_section = document.createElement("thead");
            beats_row = document.createElement("tr");

            beats_cell = document.createElement("th");
            beats_cell.innerText = "Beats";
            beats_row.appendChild(beats_cell);

            for (j = 0; j < SEQ_BEATS; ++j) {
                beats_cell = document.createElement("th");
                beats_cell.innerText = String(j + 1);
                beats_row.appendChild(beats_cell);
            }

            beats_section.appendChild(beats_row);
            beats_table.appendChild(beats_section);

            beats_section = document.createElement("tbody");

            for (k = 0; k < SEQ_VOICES; ++k) {
                beats_row = document.createElement("tr");

                if (k < 1) {
                    beats_cell = document.createElement("th");
                    beats_cell.setAttribute("rowspan", "4");
                    beats_cell.innerText = "Steps";
                    beats_row.appendChild(beats_cell);
                }

                for (j = 0; j < SEQ_BEATS; ++j) {
                    step_ui = new SelectUI(
                        "", "Step (scale degree)", "seq-step", bank.beats[j][k], synth
                    );
                    this._widgets.push(step_ui);
                    beats_cell = document.createElement("td");
                    beats_cell.appendChild(step_ui.dom_node);
                    beats_row.appendChild(beats_cell);
                }

                beats_section.appendChild(beats_row);
            }

            beats_row = document.createElement("tr");

            beats_cell = document.createElement("th");
            beats_cell.innerText = "Vel";
            beats_row.appendChild(beats_cell);

            for (j = 0; j < SEQ_BEATS; ++j) {
                step_ui = new SelectUI("", "Velocity", "seq-step", bank.velocities[j], synth);
                this._widgets.push(step_ui);
                beats_cell = document.createElement("td");
                beats_cell.appendChild(step_ui.dom_node);
                beats_row.appendChild(beats_cell);
            }

            beats_section.appendChild(beats_row);
            beats_table.appendChild(beats_section);

            beats_ui.dom_node.appendChild(beats_table);

            bank_ui.add(new FaderUI("BPM", "Tempo", "", 1, 1, MIDI_CONTROLS, bank.tempo, synth));
            bank_ui.add(new FaderUI("ARP", "Arpeggio", "/256th", 1, 1, MIDI_CONTROLS, bank.arpeggio, synth));
            bank_ui.add(new FaderUI("GAP", "Gap between beats", "/256th", 1, 1, MIDI_CONTROLS, bank.gap, synth));
            bank_ui.add(new FaderUI("DTN", "Detune (semitones)", "st", 1, 1, MIDI_CONTROLS, bank.detune, synth));
            bank_ui.add(scale_ui);
            bank_ui.add(beats_ui);
            bank_ui.add(scheduled_roots_ui);

            bank_uis[i] = bank_ui;
            this.add(bank_ui);
        }

        this._bank_uis = bank_uis;

        this.add(new SelectUI("Active bank", "Active bank", "wide", sequencer.active_bank, synth));
        this.add(new SelectUI("Target", "Target", "wide", sequencer.target, synth));

        this.update(sequencer.active_bank, sequencer.active_bank.value);

        sequencer.active_bank.observers.push(this);
    }

    SequencerUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    SequencerUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    SequencerUI.prototype.update = function (obj, new_value)
    {
        var bank_uis = this._bank_uis,
            i;

        for (i in bank_uis) {
            if (bank_uis.hasOwnProperty(i)) {
                if (i === new_value) {
                    show(bank_uis[i].dom_node);
                } else {
                    hide(bank_uis[i].dom_node);
                }
            }
        }
    };

    function TouchControllerUI(name, touch_x_ctl, touch_y_ctl)
    {
        var touch_area = document.createElement("div");

        NamedUIWidgetGroup.call(this, name, "touchpad", "");

        touch_area.setAttribute("class", "touchpad-touch");
        touch_area.onmousedown = bind(this, this.handle_touch_ctl_mouse_down);
        touch_area.onmouseup = bind(this, this.handle_touch_ctl_mouse_up);
        touch_area.onmousemove = bind(this, this.handle_touch_ctl_mouse_move);
        touch_area.onmouseenter = bind(this, this.handle_touch_ctl_mouse_enter);
        touch_area.onmouseleave = bind(this, this.handle_touch_ctl_mouse_leave);
        touch_area.ontouchstart = bind(this, this.handle_touch_ctl_touch_start);
        touch_area.ontouchmove = bind(this, this.handle_touch_ctl_touch_move);
        touch_area.ontouchend = bind(this, this.handle_touch_ctl_touch_end);
        touch_area.ontouchcancel = bind(this, this.handle_touch_ctl_touch_end);

        this._touch_area = touch_area;
        this._touch_x_ctl = touch_x_ctl;
        this._touch_y_ctl = touch_y_ctl;
        this._ongoing_touch = null;
        this._mouse_down = false;

        this.dom_node.appendChild(touch_area);
    }

    TouchControllerUI.prototype._handle_event = function (evt)
    {
        var c = get_evt_relative_pos(this._touch_area, evt);

        this._touch_x_ctl.set_value(c[0]);
        this._touch_y_ctl.set_value(c[1]);

        return true;
    };

    TouchControllerUI.prototype.handle_touch_ctl_mouse_move = function (evt)
    {
        if (this._mouse_down) {
            this._handle_event(evt || event);
        }

        return true;
    };

    TouchControllerUI.prototype.handle_touch_ctl_mouse_down = function (evt)
    {
        if (this._mouse_down) {
            return;
        }

        this._handle_event(evt || event);
        this._mouse_down = true;

        return stop_event(evt);
    };

    TouchControllerUI.prototype.handle_touch_ctl_mouse_up = function (evt)
    {
        if (this._mouse_down) {
            this._handle_event(evt || event);
            this._mouse_down = false;
        }

        return stop_event(evt);
    };

    TouchControllerUI.prototype.handle_document_mouse_up = function (evt)
    {
        this._mouse_down = false;

        return true;
    };

    TouchControllerUI.prototype.handle_touch_ctl_mouse_enter = function (evt)
    {
        if (this._mouse_down) {
            this._handle_event(evt || event);
        }

        return true;
    };

    TouchControllerUI.prototype.handle_touch_ctl_mouse_leave = function (evt)
    {
        if (this._mouse_down) {
            this._handle_event(evt || event);
        }

        return true;
    };

    TouchControllerUI.prototype.handle_touch_ctl_touch_start = function (evt)
    {
        var ct, t;

        evt = evt || event;
        ct = evt.changedTouches;

        if ((this._ongoing_touch === null) && (0 < ct.length)) {
            t = ct[0];
            this._ongoing_touch = t.identifier;
            this._handle_event(t);
        }

        return stop_event(evt);
    };

    TouchControllerUI.prototype.handle_touch_ctl_touch_move = function (evt)
    {
        var ongoing_touch = this._ongoing_touch,
            ct, i, l, t;

        if (ongoing_touch === null) {
            return stop_event(evt);
        }

        evt = evt || event;
        ct = evt.changedTouches;

        for (i = 0, l = ct.length; i < l; ++i) {
            if ((t = ct[i]).identifier === ongoing_touch) {
                this._handle_event(t);
                break;
            }
        }

        return stop_event(evt);
    };

    TouchControllerUI.prototype.handle_touch_ctl_touch_end = function (evt)
    {
        var ongoing_touch = this._ongoing_touch,
            ct, i, l, t;

        if (ongoing_touch === null) {
            return stop_event(evt);
        }

        evt = evt || event;
        ct = evt.changedTouches;

        for (i = 0, l = ct.length; i < l; ++i) {
            if ((t = ct[i]).identifier === ongoing_touch) {
                this._handle_event(t);
                this._ongoing_touch = null;
                break;
            }
        }

        return stop_event(evt);
    };

    function ThereminUI(theremin, synth)
    {
        var touch_area = document.createElement("div"),
            params = new UIWidgetGroup("horizontal"),
            prefold_amp_env = new PrefoldAmpEnvUI(theremin, synth),
            filters = new ClosableNamedUIWidgetGroup("Filters", "filters horizontal"),
            custom_waveform = new CustomWaveParamsUI("", theremin.custom_waveform, synth),
            env_highpass = new EnvelopeHighpassUI(theremin, synth),
            env_lowpass = new EnvelopeLowpassUI(theremin, synth),
            lfo_highpass = new LFOCompatibleHighpassUI("", theremin.lfo_highpass_params, synth),
            lfo_lowpass = new LFOCompatibleLowpassUI("", theremin.lfo_lowpass_params, synth),
            wav = new SelectUI("WAV", "Waveform", "waveform-selector", theremin.waveform, synth),
            effects = new ClosableNamedUIWidgetGroup("Effects", "effects color-0", synth);

        NamedUIWidgetGroup.call(this, "Theremin", "color-8", "theremin");

        this._theremin = theremin;
        this._touch_area = touch_area;
        this._mouse_down = false;
        this._ongoing_touch = null;

        touch_area.setAttribute("class", "theremin-touch");
        touch_area.onmousedown = bind(this, this.handle_theremin_mouse_down);
        touch_area.onmouseup = bind(this, this.handle_theremin_mouse_up);
        touch_area.onmousemove = bind(this, this.handle_theremin_mouse_move);
        touch_area.onmouseenter = bind(this, this.handle_theremin_mouse_enter);
        touch_area.onmouseleave = bind(this, this.handle_theremin_mouse_leave);
        touch_area.ontouchstart = bind(this, this.handle_theremin_touch_start);
        touch_area.ontouchmove = bind(this, this.handle_theremin_touch_move);
        touch_area.ontouchend = bind(this, this.handle_theremin_touch_end);
        touch_area.ontouchcancel = bind(this, this.handle_theremin_touch_end);

        params.add(new FaderUI("VOL", "Volume", "%", 1000 * FOLD_THRESHOLD, 10, ALL_CONTROLS, theremin.volume, synth));
        params.add(new FaderUI("PAN", "Panning", "%", 100, 1, ALL_CONTROLS, theremin.pan, synth));
        params.add(new FaderUI("WID", "Width", "%", 100, 1, MIDI_CONTROLS, theremin.width, synth));
        params.add(new FaderUI("PX", "Pixelate", "", 1, 1, MIDI_CONTROLS, theremin.resolution, synth));
        params.add(new FaderUI("MIN", "Minimum frequencey", "Hz", 1, 1, MIDI_CONTROLS, theremin.min_freq, synth));
        params.add(new FaderUI("MAX", "Maximum frequencey", "Hz", 1, 1, MIDI_CONTROLS, theremin.max_freq, synth));
        params.add(new FaderUI("ATK", "Attack time", "s", 1000, 1000, MIDI_CONTROLS, theremin.amp_env_params[1], synth));
        params.add(new FaderUI("REL", "Release time", "s", 1000, 1000, MIDI_CONTROLS, theremin.amp_env_params[6], synth));
        params.add(new FaderUI("FLD", "Folding", "%", 1000 / FOLD_MAX, 10, ALL_CONTROLS, theremin.folding, synth));
        params.add(new FaderUI("FIN", "Fine detune (cents)", "c", 10, 10, ALL_CONTROLS, theremin.fine_detune, synth));

        filters.add(env_highpass);
        filters.add(env_lowpass);
        filters.add(lfo_highpass);
        filters.add(lfo_lowpass);

        effects.add(new DistortionUI("Overdrive", "vertical color-8", theremin.effects.overdrive, synth));
        effects.add(new DistortionUI("Distortion", "vertical color-9", theremin.effects.distortion, synth));
        effects.add(new ShelfFilterUI("Low Shelf", "vertical color-4", theremin.effects.low_shelf, synth));
        effects.add(new ShelfFilterUI("High Shelf", "vertical color-3", theremin.effects.high_shelf, synth));
        effects.add(new EchoUI(synth, theremin.effects.echo));
        effects.add(new ReverbUI(synth, theremin.effects.reverb));

        this.add(wav);

        this.dom_node.appendChild(touch_area);

        this.add(params);
        this.add(prefold_amp_env);
        this.add(custom_waveform);
        this.add(filters);
        this.add(effects);

        effects.toggle();
    }

    ThereminUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    ThereminUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    ThereminUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    ThereminUI.prototype.handle_theremin_mouse_down = function (evt)
    {
        var c;

        if (this._mouse_down) {
            return;
        }

        c = get_evt_relative_pos(this._touch_area, evt || event);
        this._theremin.trigger(c[0], c[1]);
        this._mouse_down = true;

        return stop_event(evt);
    };

    ThereminUI.prototype.handle_theremin_mouse_up = function (evt)
    {
        var c;

        if (this._mouse_down) {
            c = get_evt_relative_pos(this._touch_area, evt || event);
            this._theremin.stop(c[0], c[1]);
            this._mouse_down = false;
        }

        return stop_event(evt);
    };

    ThereminUI.prototype.handle_document_mouse_up = function (evt)
    {
        this._mouse_down = false;

        return true;
    };

    ThereminUI.prototype.handle_theremin_mouse_move = function (evt)
    {
        var c;

        if (this._mouse_down) {
            c = get_evt_relative_pos(this._touch_area, evt || event);
            this._theremin.move(c[0], c[1]);
        }

        return true;
    };

    ThereminUI.prototype.handle_theremin_mouse_enter = function (evt)
    {
        var c;

        if (this._mouse_down) {
            c = get_evt_relative_pos(this._touch_area, evt || event);
            this._theremin.move(c[0], c[1]);
        }

        return true;
    };

    ThereminUI.prototype.handle_theremin_mouse_leave = function (evt)
    {
        var c;

        if (this._mouse_down) {
            c = get_evt_relative_pos(this._touch_area, evt || event);
            this._theremin.stop(c[0], c[1]);
            this._mouse_down = false;
        }

        return true;
    };

    ThereminUI.prototype.handle_theremin_touch_start = function (evt)
    {
        var ct, c, i, l;

        evt = evt || event;
        ct = evt.changedTouches;

        if ((this._ongoing_touch === null) && (0 < ct.length)) {
            this._ongoing_touch = ct[0].identifier;
            c = get_evt_relative_pos(this._touch_area, ct[0]);
            this._theremin.trigger(c[0], c[1]);
        }

        return stop_event(evt);
    };

    ThereminUI.prototype.handle_theremin_touch_move = function (evt)
    {
        var ongoing_touch = this._ongoing_touch,
            ct, i, l, t, c;

        if (ongoing_touch === null) {
            return stop_event(evt);
        }

        evt = evt || event;
        ct = evt.changedTouches;

        for (i = 0, l = ct.length; i < l; ++i) {
            if ((t = ct[i]).identifier === ongoing_touch) {
                c = get_evt_relative_pos(this._touch_area, t);
                this._theremin.move(c[0], c[1]);
                break;
            }
        }

        return stop_event(evt);
    };

    ThereminUI.prototype.handle_theremin_touch_end = function (evt)
    {
        var ongoing_touch = this._ongoing_touch,
            ct, i, l, t, c;

        if (ongoing_touch === null) {
            return stop_event(evt);
        }

        evt = evt || event;
        ct = evt.changedTouches;

        for (i = 0, l = ct.length; i < l; ++i) {
            if ((t = ct[i]).identifier === ongoing_touch) {
                c = get_evt_relative_pos(this._touch_area, t);
                this._theremin.stop(c[0], c[1]);
                this._ongoing_touch = null;
                break;
            }
        }

        return stop_event(evt);
    };

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
    };

    function merge(obj_1, obj_2)
    {
        var result = {},
            k;

        for (k in obj_1) {
            if (obj_1.hasOwnProperty(k)) {
                result[k] = obj_1[k];
            }
        }

        for (k in obj_2) {
            if (obj_2.hasOwnProperty(k)) {
                result[k] = obj_2[k];
            }
        }

        return result;
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

    function get_evt_relative_pos(dom_node, evt)
    {
        var rect = dom_node.getClientRects()[0];

        return [
            Math.max(0.0, Math.min(1.0, (evt.clientX - rect.left) / rect.width)),
            Math.max(0.0, Math.min(1.0, (evt.clientY - rect.top) / rect.height))
        ];
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

    function init_random()
    {
        var seed = 0x1705;

        rng_x = seed;
        rng_c = (((~seed) >> 3) ^ 0x3cf5) & 0xffff;
    }

    function gen_random()
    {
        // https://en.wikipedia.org/wiki/Multiply-with-carry_pseudorandom_number_generator
        rng_x = 32718 * rng_x + rng_c;
        rng_c = rng_x >> 16;
        rng_x = rng_x & 0xffff;

        return rng_x / 0x10000;
    }

    window.onload = function ()
    {
        main();
    };

    preset_names = {
        "p3": "Blank",
        "p8": "Add + AM + FM Organ - Nasty Growl",
        "p2": "Analog Brass - Analog Pluck",
        "p1": "Analog Pluck - Analog Brass",
        "p4": "Bright Jazz Organ - Jazz Organ",
        "p6": "Canon In D",
        "p10": "Fat Saw - Saw Pluck",
        "p12": "Harpsichord - Violin",
        "p5": "Jazz Organ - Bright Jazz Organ",
        "p7": "Nasty Growl - Add + AM + FM Organ",
        "p9": "Saw Pluck - Fat Saw",
        "p11": "Violin - Harpsichord"
    };
    presets = {
        "p1": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [5000, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.4, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["on", "none"],
            "cmp_ech_w": [0.6, "none"],
            "cmp_ech_wet": [0.3, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [12, "none"],
            "cmp_o1_ea": [0.005, "none"],
            "cmp_o1_ed": [1.9378787401574802, "mcs24"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.06, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [0, "none"],
            "cmp_o1_ehlg": ["off", "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [0, "none"],
            "cmp_o1_ehqat": [0.02, "none"],
            "cmp_o1_ehqdlt": [0, "none"],
            "cmp_o1_ehqdt": [0.6, "none"],
            "cmp_o1_ehqht": [0.3, "none"],
            "cmp_o1_ehqi": [1, "none"],
            "cmp_o1_ehqp": [1, "none"],
            "cmp_o1_ehqr": [1, "none"],
            "cmp_o1_ehqrt": [0.1, "none"],
            "cmp_o1_ehqs": [1, "none"],
            "cmp_o1_ehrf": [0, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [0, "none"],
            "cmp_o1_elat": [0.05, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [1.163127244094488, "mcs21"],
            "cmp_o1_elht": [0.11, "none"],
            "cmp_o1_elif": [0.540629036538972, "mcs18"],
            "cmp_o1_ellg": ["on", "none"],
            "cmp_o1_elo": ["on", "none"],
            "cmp_o1_elpf": [0.8322073785720605, "mcs19"],
            "cmp_o1_elqat": [0.02, "none"],
            "cmp_o1_elqdlt": [0, "none"],
            "cmp_o1_elqdt": [0.6, "none"],
            "cmp_o1_elqht": [0.3, "none"],
            "cmp_o1_elqi": [1, "none"],
            "cmp_o1_elqp": [1, "none"],
            "cmp_o1_elqr": [1, "none"],
            "cmp_o1_elqrt": [0.1, "none"],
            "cmp_o1_elqs": [1, "none"],
            "cmp_o1_elrf": [0.540629036538972, "mcs18"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [0.5663133681323542, "mcs20"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.1, "none"],
            "cmp_o1_es": [0, "none"],
            "cmp_o1_fd": [0, "lfo3"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_lg": ["off", "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [0, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_lg": ["on", "none"],
            "cmp_o1_l_st": ["on", "none"],
            "cmp_o1_lf": [0.85, "mcs22"],
            "cmp_o1_lq": [0.99, "none"],
            "cmp_o1_pfat": [0.02, "none"],
            "cmp_o1_pfdlt": [0, "none"],
            "cmp_o1_pfdt": [0.6, "none"],
            "cmp_o1_pfht": [0.3, "none"],
            "cmp_o1_pfia": [1, "none"],
            "cmp_o1_pfpa": [1, "none"],
            "cmp_o1_pfra": [1, "none"],
            "cmp_o1_pfrt": [0.1, "none"],
            "cmp_o1_pfsa": [1, "none"],
            "cmp_o1_pn": [0.02, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.3, "none"],
            "cmp_o1_wf": ["softsaw", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [0, "none"],
            "cmp_o2_ea": [0.005, "none"],
            "cmp_o2_ed": [1.9378787401574802, "mcs24"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.06, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [0, "none"],
            "cmp_o2_ehlg": ["off", "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [0, "none"],
            "cmp_o2_ehqat": [0.02, "none"],
            "cmp_o2_ehqdlt": [0, "none"],
            "cmp_o2_ehqdt": [0.6, "none"],
            "cmp_o2_ehqht": [0.3, "none"],
            "cmp_o2_ehqi": [1, "none"],
            "cmp_o2_ehqp": [1, "none"],
            "cmp_o2_ehqr": [1, "none"],
            "cmp_o2_ehqrt": [0.1, "none"],
            "cmp_o2_ehqs": [1, "none"],
            "cmp_o2_ehrf": [0, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [0, "none"],
            "cmp_o2_elat": [0.053, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [1.163127244094488, "mcs21"],
            "cmp_o2_elht": [0.1, "none"],
            "cmp_o2_elif": [0.540629036538972, "mcs18"],
            "cmp_o2_ellg": ["on", "none"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [0.8322073785720605, "mcs19"],
            "cmp_o2_elqat": [0.02, "none"],
            "cmp_o2_elqdlt": [0, "none"],
            "cmp_o2_elqdt": [0.6, "none"],
            "cmp_o2_elqht": [0.3, "none"],
            "cmp_o2_elqi": [1, "none"],
            "cmp_o2_elqp": [1, "none"],
            "cmp_o2_elqr": [1, "none"],
            "cmp_o2_elqrt": [0.1, "none"],
            "cmp_o2_elqs": [1, "none"],
            "cmp_o2_elrf": [0.5, "fx1"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [0.5663133681323542, "mcs20"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.1, "none"],
            "cmp_o2_es": [0, "none"],
            "cmp_o2_fd": [0, "lfo4"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [0, "none"],
            "cmp_o2_hlg": ["off", "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["on", "none"],
            "cmp_o2_lf": [0.85, "mcs22"],
            "cmp_o2_llg": ["on", "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pfat": [0.02, "none"],
            "cmp_o2_pfdlt": [0, "none"],
            "cmp_o2_pfdt": [0.6, "none"],
            "cmp_o2_pfht": [0.3, "none"],
            "cmp_o2_pfia": [1, "none"],
            "cmp_o2_pfpa": [1, "none"],
            "cmp_o2_pfra": [1, "none"],
            "cmp_o2_pfrt": [0.1, "none"],
            "cmp_o2_pfsa": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [4, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.3, "none"],
            "cmp_o2_wf": ["softsquare", "none"],
            "cmp_od_gn": [0.375, "mcs23"],
            "cmp_od_st": ["on", "none"],
            "cmp_rev_df": [3438, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.9, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.95, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.36, "none"],
            "cmp_rev_wet": [0.08, "none"],
            "cmp_vl": [0.5, "none"],
            "lfo1_am": [1, "none"],
            "lfo1_ds": [0.03, "none"],
            "lfo1_f": [0.03, "none"],
            "lfo1_ma": [0.505030214246475, "mcs2"],
            "lfo1_mi": [0.495030214246475, "mcs1"],
            "lfo1_rn": [0.012, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [1, "none"],
            "lfo2_ds": [0.06, "none"],
            "lfo2_f": [0.02, "none"],
            "lfo2_ma": [0.5055301837270341, "mcs4"],
            "lfo2_mi": [0.4945301837270341, "mcs3"],
            "lfo2_rn": [0.011, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_ds": [0.03, "none"],
            "lfo3_f": [0.03, "none"],
            "lfo3_ma": [0.505, "mcs14"],
            "lfo3_mi": [0.495, "mcs13"],
            "lfo3_rn": [0.012, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [1, "none"],
            "lfo4_ds": [0.06, "none"],
            "lfo4_f": [0.02, "none"],
            "lfo4_ma": [0.5055, "mcs16"],
            "lfo4_mi": [0.4945, "mcs15"],
            "lfo4_rn": [0.011, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_ds": [0, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_ds": [0, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_ds": [0, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_ds": [0, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_ds": [0, "none"],
            "mcs10_in": [0.5433070866141733, "mod"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0.7, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_ds": [0, "none"],
            "mcs11_in": [0.5433070866141733, "mod"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [0.55, "none"],
            "mcs11_mi": [0.2, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_ds": [0, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_ds": [0, "none"],
            "mcs13_in": [0.5, "vrt2"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [0.99, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_ds": [0, "none"],
            "mcs14_in": [0.5, "vrt2"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0.01, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_ds": [0, "none"],
            "mcs15_in": [0.5, "vrt2"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [0.989, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_ds": [0, "none"],
            "mcs16_in": [0.5, "vrt2"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0.011, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_ds": [0, "none"],
            "mcs17_in": [0.8764044943820225, "vrtvel"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0.3, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [0.9134831460674158, "mcs17"],
            "mcs18_ds": [0, "none"],
            "mcs18_in": [0.47244094488188976, "vrtnote"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [0.66, "none"],
            "mcs18_mi": [0.45, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [0.9134831460674158, "mcs17"],
            "mcs19_ds": [0, "none"],
            "mcs19_in": [0.47244094488188976, "vrtnote"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [0.98, "none"],
            "mcs19_mi": [0.72, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_ds": [0, "none"],
            "mcs1_in": [0.5000305194408838, "pitch"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [0.99, "none"],
            "mcs1_mi": [0, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [0.9134831460674158, "mcs17"],
            "mcs20_ds": [0, "none"],
            "mcs20_in": [0.47244094488188976, "vrtnote"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [0.68, "none"],
            "mcs20_mi": [0.48, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_ds": [0, "none"],
            "mcs21_in": [0.47244094488188976, "vrtnote"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [0.03, "none"],
            "mcs21_mi": [0.12, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_ds": [0, "none"],
            "mcs22_in": [0.5, "vrt3"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0.7, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_ds": [0, "none"],
            "mcs23_in": [0.5, "vrt3"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [0.55, "none"],
            "mcs23_mi": [0.2, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_ds": [0, "none"],
            "mcs24_in": [0.47244094488188976, "vrtnote"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [0.05, "none"],
            "mcs24_mi": [0.2, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_ds": [0, "none"],
            "mcs2_in": [0.5000305194408838, "pitch"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [1, "none"],
            "mcs2_mi": [0.01, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_ds": [0, "none"],
            "mcs3_in": [0.5000305194408838, "pitch"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [0.989, "none"],
            "mcs3_mi": [0, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_ds": [0, "none"],
            "mcs4_in": [0.5000305194408838, "pitch"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [1, "none"],
            "mcs4_mi": [0.011, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_ds": [0, "none"],
            "mcs5_in": [0.84251968503937, "vel"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [1, "none"],
            "mcs5_mi": [0.3, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [0.889763779527559, "mcs5"],
            "mcs6_ds": [0, "none"],
            "mcs6_in": [0.47244094488188976, "note"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [0.72, "none"],
            "mcs6_mi": [0.45, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [0.889763779527559, "mcs5"],
            "mcs7_ds": [0, "none"],
            "mcs7_in": [0.47244094488188976, "note"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [0.99, "none"],
            "mcs7_mi": [0.75, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [0.889763779527559, "mcs5"],
            "mcs8_ds": [0, "none"],
            "mcs8_in": [0.47244094488188976, "note"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [0.72, "none"],
            "mcs8_mi": [0.5, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_ds": [0, "none"],
            "mcs9_in": [0.47244094488188976, "note"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [0.05, "none"],
            "mcs9_mi": [0.2, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [5000, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.4, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["on", "none"],
            "midi_ech_w": [0.6, "none"],
            "midi_ech_wet": [0.3, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.05, "none"],
            "midi_o1_ed": [1.9378787401574802, "mcs9"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.3, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [0, "none"],
            "midi_o1_ehlg": ["off", "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [0, "none"],
            "midi_o1_ehqat": [0.02, "none"],
            "midi_o1_ehqdlt": [0, "none"],
            "midi_o1_ehqdt": [0.6, "none"],
            "midi_o1_ehqht": [0.3, "none"],
            "midi_o1_ehqi": [1, "none"],
            "midi_o1_ehqp": [1, "none"],
            "midi_o1_ehqr": [1, "none"],
            "midi_o1_ehqrt": [0.1, "none"],
            "midi_o1_ehqs": [1, "none"],
            "midi_o1_ehrf": [0, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [0, "none"],
            "midi_o1_elat": [0.38, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [1.9378787401574802, "mcs9"],
            "midi_o1_elht": [0.11, "none"],
            "midi_o1_elif": [0.563497426994854, "mcs6"],
            "midi_o1_ellg": ["on", "none"],
            "midi_o1_elo": ["on", "none"],
            "midi_o1_elpf": [0.8508866017732035, "mcs7"],
            "midi_o1_elqat": [0.02, "none"],
            "midi_o1_elqdlt": [0, "none"],
            "midi_o1_elqdt": [0.6, "none"],
            "midi_o1_elqht": [0.3, "none"],
            "midi_o1_elqi": [1, "none"],
            "midi_o1_elqp": [1, "none"],
            "midi_o1_elqr": [1, "none"],
            "midi_o1_elqrt": [0.1, "none"],
            "midi_o1_elqs": [1, "none"],
            "midi_o1_elrf": [0.563497426994854, "mcs6"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [0.59247938495877, "mcs8"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.1, "none"],
            "midi_o1_es": [0.7, "none"],
            "midi_o1_fd": [0, "lfo1"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_lg": ["off", "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [0, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_lg": ["on", "none"],
            "midi_o1_l_st": ["on", "none"],
            "midi_o1_lf": [0.8629921259842519, "mcs10"],
            "midi_o1_lq": [1.02, "none"],
            "midi_o1_pfat": [0.02, "none"],
            "midi_o1_pfdlt": [0, "none"],
            "midi_o1_pfdt": [0.6, "none"],
            "midi_o1_pfht": [0.3, "none"],
            "midi_o1_pfia": [1, "none"],
            "midi_o1_pfpa": [1, "none"],
            "midi_o1_pfra": [1, "none"],
            "midi_o1_pfrt": [0.1, "none"],
            "midi_o1_pfsa": [1, "none"],
            "midi_o1_pn": [-0.2, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.3, "none"],
            "midi_o1_wf": ["softsaw", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [0, "none"],
            "midi_o2_ea": [0.05, "none"],
            "midi_o2_ed": [1.9378787401574802, "mcs9"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.295, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [0, "none"],
            "midi_o2_ehlg": ["off", "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [0, "none"],
            "midi_o2_ehqat": [0.02, "none"],
            "midi_o2_ehqdlt": [0, "none"],
            "midi_o2_ehqdt": [0.6, "none"],
            "midi_o2_ehqht": [0.3, "none"],
            "midi_o2_ehqi": [1, "none"],
            "midi_o2_ehqp": [1, "none"],
            "midi_o2_ehqr": [1, "none"],
            "midi_o2_ehqrt": [0.1, "none"],
            "midi_o2_ehqs": [1, "none"],
            "midi_o2_ehrf": [0, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [0, "none"],
            "midi_o2_elat": [0.37, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [1.9378787401574802, "mcs9"],
            "midi_o2_elht": [0.1, "none"],
            "midi_o2_elif": [0.563497426994854, "mcs6"],
            "midi_o2_ellg": ["on", "none"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [0.8508866017732035, "mcs7"],
            "midi_o2_elqat": [0.02, "none"],
            "midi_o2_elqdlt": [0, "none"],
            "midi_o2_elqdt": [0.6, "none"],
            "midi_o2_elqht": [0.3, "none"],
            "midi_o2_elqi": [1, "none"],
            "midi_o2_elqp": [1, "none"],
            "midi_o2_elqr": [1, "none"],
            "midi_o2_elqrt": [0.1, "none"],
            "midi_o2_elqs": [1, "none"],
            "midi_o2_elrf": [0.563497426994854, "mcs6"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [0.59247938495877, "mcs8"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0.7, "none"],
            "midi_o2_fd": [0, "lfo2"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [0, "none"],
            "midi_o2_hlg": ["off", "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["on", "none"],
            "midi_o2_lf": [0.8629921259842519, "mcs10"],
            "midi_o2_llg": ["on", "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pfat": [0.02, "none"],
            "midi_o2_pfdlt": [0, "none"],
            "midi_o2_pfdt": [0.6, "none"],
            "midi_o2_pfht": [0.3, "none"],
            "midi_o2_pfia": [1, "none"],
            "midi_o2_pfpa": [1, "none"],
            "midi_o2_pfra": [1, "none"],
            "midi_o2_pfrt": [0.1, "none"],
            "midi_o2_pfsa": [1, "none"],
            "midi_o2_pn": [0.2, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [4, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.3, "none"],
            "midi_o2_wf": ["softsaw", "none"],
            "midi_od_gn": [0.39015748031496067, "mcs11"],
            "midi_od_st": ["on", "none"],
            "midi_rev_df": [3438, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.9, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.95, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.36, "none"],
            "midi_rev_wet": [0.08, "none"],
            "midi_vl": [0.5, "none"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.417, "none"],
            "th_ech_dry": [0.6, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.72, "none"],
            "th_ech_st": ["on", "none"],
            "th_ech_w": [0.7, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.001, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [0, "none"],
            "th_ehlg": ["off", "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [0, "none"],
            "th_ehqat": [0.02, "none"],
            "th_ehqdlt": [0, "none"],
            "th_ehqdt": [0.6, "none"],
            "th_ehqht": [0.3, "none"],
            "th_ehqi": [1, "none"],
            "th_ehqp": [1, "none"],
            "th_ehqr": [1, "none"],
            "th_ehqrt": [0.1, "none"],
            "th_ehqs": [1, "none"],
            "th_ehrf": [0, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [0, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [1, "none"],
            "th_ellg": ["off", "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [1, "none"],
            "th_elqat": [0.02, "none"],
            "th_elqdlt": [0, "none"],
            "th_elqdt": [0.6, "none"],
            "th_elqht": [0.3, "none"],
            "th_elqi": [1, "none"],
            "th_elqp": [1, "none"],
            "th_elqr": [1, "none"],
            "th_elqrt": [0.1, "none"],
            "th_elqs": [1, "none"],
            "th_elrf": [1, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [1, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.307, "none"],
            "th_es": [1, "none"],
            "th_fd": [0, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [0, "none"],
            "th_hlg": ["off", "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["on", "none"],
            "th_lf": [0.168, "none"],
            "th_llg": ["off", "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [3185, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["on", "none"],
            "th_pfat": [0.02, "none"],
            "th_pfdlt": [0, "none"],
            "th_pfdt": [0.6, "none"],
            "th_pfht": [0.3, "none"],
            "th_pfia": [1, "none"],
            "th_pfpa": [1, "none"],
            "th_pfra": [1, "none"],
            "th_pfrt": [0.1, "none"],
            "th_pfsa": [1, "none"],
            "th_pn": [0, "none"],
            "th_res": [32, "none"],
            "th_rev_df": [5717, "none"],
            "th_rev_dg": [-10.9, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.98, "none"],
            "th_rev_st": ["on", "none"],
            "th_rev_w": [-0.4, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["softsaw", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "version": "4",
            "vrt_dt": [0, "none"]
        },
        "p10": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [6000, "none"],
            "cmp_ech_dg": [-9, "none"],
            "cmp_ech_dly": [0.6, "none"],
            "cmp_ech_dry": [0.8, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["off", "none"],
            "cmp_ech_w": [0.5, "none"],
            "cmp_ech_wet": [0.2, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.12, "none"],
            "cmp_o1_ed": [0.6, "none"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.3, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [1.5, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [2, "none"],
            "cmp_o1_elht": [0.3, "none"],
            "cmp_o1_elif": [1500, "none"],
            "cmp_o1_elo": ["on", "none"],
            "cmp_o1_elpf": [7030, "none"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [2023, "none"],
            "cmp_o1_elrt": [0.205, "none"],
            "cmp_o1_elsf": [3024, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.205, "none"],
            "cmp_o1_es": [0.75, "none"],
            "cmp_o1_fd": [0, "lfo1"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0.6, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0.02, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["sawtooth", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [0, "none"],
            "cmp_o2_ea": [0.12, "none"],
            "cmp_o2_ed": [0.6, "none"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.3, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [1.5, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [2, "none"],
            "cmp_o2_elht": [0.3, "none"],
            "cmp_o2_elif": [1500, "none"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [7030, "none"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [2023, "none"],
            "cmp_o2_elrt": [0.205, "none"],
            "cmp_o2_elsf": [3024, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.205, "none"],
            "cmp_o2_es": [0.75, "none"],
            "cmp_o2_fd": [0, "lfo2"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [22050, "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [-0.6, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0.02, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [4, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["sawtooth", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-9, "none"],
            "cmp_rev_dry": [0.84, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.93, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.16, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.0775, "mcs3"],
            "lfo1_f": [4.2086, "mcs4"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.501, "mcs1"],
            "lfo1_rn": [0.02, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.0775, "mcs3"],
            "lfo2_f": [4.2086, "mcs4"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0.499, "mcs2"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_f": [2, "none"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0, "none"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [1, "none"],
            "lfo4_f": [2, "none"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0, "none"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_in": [0, "none"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.5, "vrt2"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [1, "none"],
            "mcs1_mi": [0.002, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "vrt2"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [0.998, "none"],
            "mcs2_mi": [0, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.25, "vrt3"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [0.28, "none"],
            "mcs3_mi": [0.01, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.5, "vrtnote"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [0.2467, "none"],
            "mcs4_mi": [0.0333, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.5, "note"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [0.16, "none"],
            "mcs5_mi": [0.06, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0, "none"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [1, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [6000, "none"],
            "midi_ech_dg": [-9, "none"],
            "midi_ech_dly": [0.3, "none"],
            "midi_ech_dry": [0.8, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["on", "none"],
            "midi_ech_w": [0.375, "none"],
            "midi_ech_wet": [0.2, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [-12, "none"],
            "midi_o1_ea": [0.003, "none"],
            "midi_o1_ed": [1.024, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.05, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [0.02, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [0.6, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [22050, "none"],
            "midi_o1_elo": ["off", "none"],
            "midi_o1_elpf": [22050, "none"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [22050, "none"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [22050, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.273, "none"],
            "midi_o1_es": [0.3, "none"],
            "midi_o1_fd": [0, "pitch"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["sine", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [0, "none"],
            "midi_o2_ea": [0.001, "none"],
            "midi_o2_ed": [1.024, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.05, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.02, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [0.6, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [22050, "none"],
            "midi_o2_elo": ["off", "none"],
            "midi_o2_elpf": [22050, "none"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [22050, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [22050, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.273, "none"],
            "midi_o2_es": [0.3, "none"],
            "midi_o2_fd": [0, "pitch"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["on", "none"],
            "midi_o2_lf": [2443.3, "mcs5"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [4, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["sawtooth", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.7, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.8, "none"],
            "midi_rev_st": ["off", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.3, "none"],
            "midi_vl": [0.5, "volume"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.417, "none"],
            "th_ech_dry": [0.6, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.72, "none"],
            "th_ech_st": ["on", "none"],
            "th_ech_w": [0.7, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.6, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0.3, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [20, "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [20, "none"],
            "th_ehq": [1, "none"],
            "th_ehrf": [20, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [20, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [22050, "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [22050, "none"],
            "th_elq": [1, "none"],
            "th_elrf": [22050, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [22050, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.307, "none"],
            "th_es": [0.7, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["on", "none"],
            "th_lf": [4401, "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pn": [0, "none"],
            "th_res": [1, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.9, "none"],
            "th_rev_st": ["off", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sawtooth", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p11": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [6000, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.4, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["off", "none"],
            "cmp_ech_w": [0.5, "none"],
            "cmp_ech_wet": [0.5, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [12, "none"],
            "cmp_o1_ea": [0.15, "none"],
            "cmp_o1_ed": [0.4, "none"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.2, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [0.02, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [0.6, "none"],
            "cmp_o1_elht": [0.3, "none"],
            "cmp_o1_elif": [2148, "none"],
            "cmp_o1_elo": ["on", "none"],
            "cmp_o1_elpf": [2795.78, "mcs7"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [1147, "none"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [1633.6975000000002, "mcs4"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.1, "none"],
            "cmp_o1_es": [0.7000000000000001, "mcs8"],
            "cmp_o1_fd": [0, "lfo1"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1.01, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [-15, "none"],
            "cmp_o1_prt": [0.1, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["sawtooth", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [31, "none"],
            "cmp_o2_ea": [0.1, "none"],
            "cmp_o2_ed": [0.6, "none"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.3, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.02, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [0.6, "none"],
            "cmp_o2_elht": [0.3, "none"],
            "cmp_o2_elif": [2148, "none"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [2795.78, "mcs7"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [1898, "none"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [1633.6975000000002, "mcs4"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.1, "none"],
            "cmp_o2_es": [0.5, "mcs9"],
            "cmp_o2_fd": [0, "lfo1"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [22050, "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [-22, "none"],
            "cmp_o2_prt": [0.06, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [1.36, "none"],
            "cmp_o2_vs": [0.63, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["sawtooth", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.84, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.86, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.16, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.1075, "mcs10"],
            "lfo1_f": [5.133791499999999, "mcs11"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.5, "vrt2"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [1, "none"],
            "lfo2_f": [2, "none"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0, "none"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_f": [2, "none"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0, "none"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [1, "none"],
            "lfo4_f": [2, "none"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0, "none"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_in": [0.5, "vrt3"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [0.18, "none"],
            "mcs10_mi": [0.035, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0.5, "vrtnote"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [0.3167, "none"],
            "mcs11_mi": [0.025, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.5, "note"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [0.005, "none"],
            "mcs1_mi": [0.28, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "note"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [0.0045, "none"],
            "mcs2_mi": [0.27, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.5, "note"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [0.4, "none"],
            "mcs3_mi": [0.08, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.5, "vrtnote"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [0.1395, "mcs6"],
            "mcs4_mi": [0.007, "mcs5"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.5, "vrtnote"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [0.011, "none"],
            "mcs5_mi": [0.003, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0.5, "vrtnote"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [0.235, "none"],
            "mcs6_mi": [0.044, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0.5, "vrtnote"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [0.242, "none"],
            "mcs7_mi": [0.01, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0.6, "vel"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [0.8, "none"],
            "mcs8_mi": [0.55, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0.6, "vel"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [0.6, "none"],
            "mcs9_mi": [0.35, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [4400, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.3, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.7, "none"],
            "midi_ech_st": ["on", "none"],
            "midi_ech_w": [-0.5, "none"],
            "midi_ech_wet": [0.16, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.001, "none"],
            "midi_o1_ed": [2.1383575, "mcs1"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [0.006, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [2.1383575, "mcs1"],
            "midi_o1_elht": [0.2, "none"],
            "midi_o1_elif": [7405, "none"],
            "midi_o1_elo": ["on", "none"],
            "midi_o1_elpf": [5307.2, "mcs3"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [2400, "none"],
            "midi_o1_elrt": [0.16, "none"],
            "midi_o1_elsf": [4401, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.16, "none"],
            "midi_o1_es": [0, "none"],
            "midi_o1_fd": [-2.5, "none"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [2.4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["square", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [12, "none"],
            "midi_o2_ea": [0.001, "none"],
            "midi_o2_ed": [2.0596127500000003, "mcs2"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.006, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [2.0596127500000003, "mcs2"],
            "midi_o2_elht": [0.2, "none"],
            "midi_o2_elif": [7405, "none"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [5307.2, "mcs3"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [2400, "none"],
            "midi_o2_elrt": [0.15, "none"],
            "midi_o2_elsf": [4401, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.15, "none"],
            "midi_o2_es": [0, "none"],
            "midi_o2_fd": [2.5, "none"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [22050, "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [3.2, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["sawtooth", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.84, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.86, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.16, "none"],
            "midi_vl": [0.5, "volume"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.4, "none"],
            "th_ech_dry": [0.9, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.5, "none"],
            "th_ech_st": ["off", "none"],
            "th_ech_w": [0.5, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.6, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0.3, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [20, "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [20, "none"],
            "th_ehq": [1, "none"],
            "th_ehrf": [20, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [20, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [22050, "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [22050, "none"],
            "th_elq": [1, "none"],
            "th_elrf": [22050, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [22050, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.1, "none"],
            "th_es": [0.7, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pn": [0, "none"],
            "th_res": [1, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.8, "none"],
            "th_rev_st": ["off", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sine", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [12, "none"]
        },
        "p12": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [4400, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.3, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.7, "none"],
            "cmp_ech_st": ["on", "none"],
            "cmp_ech_w": [-0.5, "none"],
            "cmp_ech_wet": [0.16, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.001, "none"],
            "cmp_o1_ed": [2.1383575, "mcs1"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [0.006, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [2.1383575, "mcs1"],
            "cmp_o1_elht": [0.2, "none"],
            "cmp_o1_elif": [7405, "none"],
            "cmp_o1_elo": ["on", "none"],
            "cmp_o1_elpf": [5307.2, "mcs3"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [2400, "none"],
            "cmp_o1_elrt": [0.16, "none"],
            "cmp_o1_elsf": [4401, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.16, "none"],
            "cmp_o1_es": [0, "none"],
            "cmp_o1_fd": [-2.5, "none"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [2.4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["square", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [12, "none"],
            "cmp_o2_ea": [0.001, "none"],
            "cmp_o2_ed": [2.0596127500000003, "mcs2"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.006, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [2.0596127500000003, "mcs2"],
            "cmp_o2_elht": [0.2, "none"],
            "cmp_o2_elif": [7405, "none"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [5307.2, "mcs3"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [2400, "none"],
            "cmp_o2_elrt": [0.15, "none"],
            "cmp_o2_elsf": [4401, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.15, "none"],
            "cmp_o2_es": [0, "none"],
            "cmp_o2_fd": [2.5, "none"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [22050, "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [3.2, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["sawtooth", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.84, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.86, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.16, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.1075, "mcs10"],
            "lfo1_f": [5.133791499999999, "mcs11"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.5, "pitch"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [1, "none"],
            "lfo2_f": [2, "none"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0, "none"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_f": [2, "none"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0, "none"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [1, "none"],
            "lfo4_f": [2, "none"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0, "none"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_in": [0.5, "mod"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [0.18, "none"],
            "mcs10_mi": [0.035, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0.5, "note"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [0.3167, "none"],
            "mcs11_mi": [0.025, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.5, "vrtnote"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [0.005, "none"],
            "mcs1_mi": [0.28, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "vrtnote"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [0.0045, "none"],
            "mcs2_mi": [0.27, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.5, "vrtnote"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [0.4, "none"],
            "mcs3_mi": [0.08, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.5, "note"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [0.1395, "mcs6"],
            "mcs4_mi": [0.007, "mcs5"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.5, "note"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [0.011, "none"],
            "mcs5_mi": [0.003, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0.5, "note"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [0.235, "none"],
            "mcs6_mi": [0.044, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0.5, "note"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [0.242, "none"],
            "mcs7_mi": [0.01, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0.6, "vrtvel"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [0.8, "none"],
            "mcs8_mi": [0.55, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0.6, "vrtvel"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [0.6, "none"],
            "mcs9_mi": [0.35, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [6000, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.4, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["off", "none"],
            "midi_ech_w": [0.5, "none"],
            "midi_ech_wet": [0.5, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [12, "none"],
            "midi_o1_ea": [0.15, "none"],
            "midi_o1_ed": [0.4, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.2, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [0.02, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [0.6, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [2148, "none"],
            "midi_o1_elo": ["on", "none"],
            "midi_o1_elpf": [2795.78, "mcs7"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [1147, "none"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [1633.6975000000002, "mcs4"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.1, "none"],
            "midi_o1_es": [0.7000000000000001, "mcs8"],
            "midi_o1_fd": [0, "lfo1"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1.01, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [-15, "none"],
            "midi_o1_prt": [0.1, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["sawtooth", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [31, "none"],
            "midi_o2_ea": [0.1, "none"],
            "midi_o2_ed": [0.6, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.3, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.02, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [0.6, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [2148, "none"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [2795.78, "mcs7"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [1898, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [1633.6975000000002, "mcs4"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0.5, "mcs9"],
            "midi_o2_fd": [0, "lfo1"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [22050, "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [-22, "none"],
            "midi_o2_prt": [0.06, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [1.36, "none"],
            "midi_o2_vs": [0.63, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["sawtooth", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.84, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.86, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.16, "none"],
            "midi_vl": [0.5, "volume"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.4, "none"],
            "th_ech_dry": [0.9, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.5, "none"],
            "th_ech_st": ["off", "none"],
            "th_ech_w": [0.5, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.6, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0.3, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [20, "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [20, "none"],
            "th_ehq": [1, "none"],
            "th_ehrf": [20, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [20, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [22050, "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [22050, "none"],
            "th_elq": [1, "none"],
            "th_elrf": [22050, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [22050, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.1, "none"],
            "th_es": [0.7, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pn": [0, "none"],
            "th_res": [1, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.8, "none"],
            "th_rev_st": ["off", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sine", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [12, "none"]
        },
        "p2": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [5000, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.4, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["on", "none"],
            "cmp_ech_w": [0.6, "none"],
            "cmp_ech_wet": [0.3, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.05, "none"],
            "cmp_o1_ed": [1.9378787401574802, "mcs9"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.3, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [0, "none"],
            "cmp_o1_ehlg": ["off", "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [0, "none"],
            "cmp_o1_ehqat": [0.02, "none"],
            "cmp_o1_ehqdlt": [0, "none"],
            "cmp_o1_ehqdt": [0.6, "none"],
            "cmp_o1_ehqht": [0.3, "none"],
            "cmp_o1_ehqi": [1, "none"],
            "cmp_o1_ehqp": [1, "none"],
            "cmp_o1_ehqr": [1, "none"],
            "cmp_o1_ehqrt": [0.1, "none"],
            "cmp_o1_ehqs": [1, "none"],
            "cmp_o1_ehrf": [0, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [0, "none"],
            "cmp_o1_elat": [0.38, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [1.9378787401574802, "mcs9"],
            "cmp_o1_elht": [0.11, "none"],
            "cmp_o1_elif": [0.563497426994854, "mcs6"],
            "cmp_o1_ellg": ["on", "none"],
            "cmp_o1_elo": ["on", "none"],
            "cmp_o1_elpf": [0.8508866017732035, "mcs7"],
            "cmp_o1_elqat": [0.02, "none"],
            "cmp_o1_elqdlt": [0, "none"],
            "cmp_o1_elqdt": [0.6, "none"],
            "cmp_o1_elqht": [0.3, "none"],
            "cmp_o1_elqi": [1, "none"],
            "cmp_o1_elqp": [1, "none"],
            "cmp_o1_elqr": [1, "none"],
            "cmp_o1_elqrt": [0.1, "none"],
            "cmp_o1_elqs": [1, "none"],
            "cmp_o1_elrf": [0.563497426994854, "mcs6"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [0.59247938495877, "mcs8"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.1, "none"],
            "cmp_o1_es": [0.7, "none"],
            "cmp_o1_fd": [0, "lfo1"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_lg": ["off", "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [0, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_lg": ["on", "none"],
            "cmp_o1_l_st": ["on", "none"],
            "cmp_o1_lf": [0.8629921259842519, "mcs10"],
            "cmp_o1_lq": [1.02, "none"],
            "cmp_o1_pfat": [0.02, "none"],
            "cmp_o1_pfdlt": [0, "none"],
            "cmp_o1_pfdt": [0.6, "none"],
            "cmp_o1_pfht": [0.3, "none"],
            "cmp_o1_pfia": [1, "none"],
            "cmp_o1_pfpa": [1, "none"],
            "cmp_o1_pfra": [1, "none"],
            "cmp_o1_pfrt": [0.1, "none"],
            "cmp_o1_pfsa": [1, "none"],
            "cmp_o1_pn": [-0.2, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.3, "none"],
            "cmp_o1_wf": ["softsaw", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [0, "none"],
            "cmp_o2_ea": [0.05, "none"],
            "cmp_o2_ed": [1.9378787401574802, "mcs9"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.295, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [0, "none"],
            "cmp_o2_ehlg": ["off", "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [0, "none"],
            "cmp_o2_ehqat": [0.02, "none"],
            "cmp_o2_ehqdlt": [0, "none"],
            "cmp_o2_ehqdt": [0.6, "none"],
            "cmp_o2_ehqht": [0.3, "none"],
            "cmp_o2_ehqi": [1, "none"],
            "cmp_o2_ehqp": [1, "none"],
            "cmp_o2_ehqr": [1, "none"],
            "cmp_o2_ehqrt": [0.1, "none"],
            "cmp_o2_ehqs": [1, "none"],
            "cmp_o2_ehrf": [0, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [0, "none"],
            "cmp_o2_elat": [0.37, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [1.9378787401574802, "mcs9"],
            "cmp_o2_elht": [0.1, "none"],
            "cmp_o2_elif": [0.563497426994854, "mcs6"],
            "cmp_o2_ellg": ["on", "none"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [0.8508866017732035, "mcs7"],
            "cmp_o2_elqat": [0.02, "none"],
            "cmp_o2_elqdlt": [0, "none"],
            "cmp_o2_elqdt": [0.6, "none"],
            "cmp_o2_elqht": [0.3, "none"],
            "cmp_o2_elqi": [1, "none"],
            "cmp_o2_elqp": [1, "none"],
            "cmp_o2_elqr": [1, "none"],
            "cmp_o2_elqrt": [0.1, "none"],
            "cmp_o2_elqs": [1, "none"],
            "cmp_o2_elrf": [0.563497426994854, "mcs6"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [0.59247938495877, "mcs8"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.1, "none"],
            "cmp_o2_es": [0.7, "none"],
            "cmp_o2_fd": [0, "lfo2"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [0, "none"],
            "cmp_o2_hlg": ["off", "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["on", "none"],
            "cmp_o2_lf": [0.8629921259842519, "mcs10"],
            "cmp_o2_llg": ["on", "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pfat": [0.02, "none"],
            "cmp_o2_pfdlt": [0, "none"],
            "cmp_o2_pfdt": [0.6, "none"],
            "cmp_o2_pfht": [0.3, "none"],
            "cmp_o2_pfia": [1, "none"],
            "cmp_o2_pfpa": [1, "none"],
            "cmp_o2_pfra": [1, "none"],
            "cmp_o2_pfrt": [0.1, "none"],
            "cmp_o2_pfsa": [1, "none"],
            "cmp_o2_pn": [0.2, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [4, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.3, "none"],
            "cmp_o2_wf": ["softsaw", "none"],
            "cmp_od_gn": [0.39015748031496067, "mcs11"],
            "cmp_od_st": ["on", "none"],
            "cmp_rev_df": [3438, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.9, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.95, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.36, "none"],
            "cmp_rev_wet": [0.08, "none"],
            "cmp_vl": [0.5, "none"],
            "lfo1_am": [1, "none"],
            "lfo1_ds": [0.03, "none"],
            "lfo1_f": [0.03, "none"],
            "lfo1_ma": [0.505030214246475, "mcs2"],
            "lfo1_mi": [0.495030214246475, "mcs1"],
            "lfo1_rn": [0.012, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [1, "none"],
            "lfo2_ds": [0.06, "none"],
            "lfo2_f": [0.02, "none"],
            "lfo2_ma": [0.5055301837270341, "mcs4"],
            "lfo2_mi": [0.4945301837270341, "mcs3"],
            "lfo2_rn": [0.011, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_ds": [0.03, "none"],
            "lfo3_f": [0.03, "none"],
            "lfo3_ma": [0.505, "mcs14"],
            "lfo3_mi": [0.495, "mcs13"],
            "lfo3_rn": [0.012, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [1, "none"],
            "lfo4_ds": [0.06, "none"],
            "lfo4_f": [0.02, "none"],
            "lfo4_ma": [0.5055, "mcs16"],
            "lfo4_mi": [0.4945, "mcs15"],
            "lfo4_rn": [0.011, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_ds": [0, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_ds": [0, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_ds": [0, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_ds": [0, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_ds": [0, "none"],
            "mcs10_in": [0.5433070866141733, "vrt3"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0.7, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_ds": [0, "none"],
            "mcs11_in": [0.5433070866141733, "vrt3"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [0.55, "none"],
            "mcs11_mi": [0.2, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_ds": [0, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_ds": [0, "none"],
            "mcs13_in": [0.5, "pitch"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [0.99, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_ds": [0, "none"],
            "mcs14_in": [0.5, "pitch"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0.01, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_ds": [0, "none"],
            "mcs15_in": [0.5, "pitch"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [0.989, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_ds": [0, "none"],
            "mcs16_in": [0.5, "pitch"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0.011, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_ds": [0, "none"],
            "mcs17_in": [0.8764044943820225, "vel"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0.3, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [0.9134831460674158, "mcs17"],
            "mcs18_ds": [0, "none"],
            "mcs18_in": [0.47244094488188976, "note"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [0.66, "none"],
            "mcs18_mi": [0.45, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [0.9134831460674158, "mcs17"],
            "mcs19_ds": [0, "none"],
            "mcs19_in": [0.47244094488188976, "note"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [0.98, "none"],
            "mcs19_mi": [0.72, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_ds": [0, "none"],
            "mcs1_in": [0.5000305194408838, "vrt2"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [0.99, "none"],
            "mcs1_mi": [0, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [0.9134831460674158, "mcs17"],
            "mcs20_ds": [0, "none"],
            "mcs20_in": [0.47244094488188976, "note"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [0.68, "none"],
            "mcs20_mi": [0.48, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_ds": [0, "none"],
            "mcs21_in": [0.47244094488188976, "note"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [0.03, "none"],
            "mcs21_mi": [0.12, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_ds": [0, "none"],
            "mcs22_in": [0.5, "mod"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0.7, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_ds": [0, "none"],
            "mcs23_in": [0.5, "mod"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [0.55, "none"],
            "mcs23_mi": [0.2, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_ds": [0, "none"],
            "mcs24_in": [0.47244094488188976, "note"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [0.05, "none"],
            "mcs24_mi": [0.2, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_ds": [0, "none"],
            "mcs2_in": [0.5000305194408838, "vrt2"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [1, "none"],
            "mcs2_mi": [0.01, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_ds": [0, "none"],
            "mcs3_in": [0.5000305194408838, "vrt2"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [0.989, "none"],
            "mcs3_mi": [0, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_ds": [0, "none"],
            "mcs4_in": [0.5000305194408838, "vrt2"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [1, "none"],
            "mcs4_mi": [0.011, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_ds": [0, "none"],
            "mcs5_in": [0.84251968503937, "vrtvel"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [1, "none"],
            "mcs5_mi": [0.3, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [0.889763779527559, "mcs5"],
            "mcs6_ds": [0, "none"],
            "mcs6_in": [0.47244094488188976, "vrtnote"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [0.72, "none"],
            "mcs6_mi": [0.45, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [0.889763779527559, "mcs5"],
            "mcs7_ds": [0, "none"],
            "mcs7_in": [0.47244094488188976, "vrtnote"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [0.99, "none"],
            "mcs7_mi": [0.75, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [0.889763779527559, "mcs5"],
            "mcs8_ds": [0, "none"],
            "mcs8_in": [0.47244094488188976, "vrtnote"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [0.72, "none"],
            "mcs8_mi": [0.5, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_ds": [0, "none"],
            "mcs9_in": [0.47244094488188976, "vrtnote"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [0.05, "none"],
            "mcs9_mi": [0.2, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [5000, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.4, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["on", "none"],
            "midi_ech_w": [0.6, "none"],
            "midi_ech_wet": [0.3, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [12, "none"],
            "midi_o1_ea": [0.005, "none"],
            "midi_o1_ed": [1.9378787401574802, "mcs24"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.06, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [0, "none"],
            "midi_o1_ehlg": ["off", "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [0, "none"],
            "midi_o1_ehqat": [0.02, "none"],
            "midi_o1_ehqdlt": [0, "none"],
            "midi_o1_ehqdt": [0.6, "none"],
            "midi_o1_ehqht": [0.3, "none"],
            "midi_o1_ehqi": [1, "none"],
            "midi_o1_ehqp": [1, "none"],
            "midi_o1_ehqr": [1, "none"],
            "midi_o1_ehqrt": [0.1, "none"],
            "midi_o1_ehqs": [1, "none"],
            "midi_o1_ehrf": [0, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [0, "none"],
            "midi_o1_elat": [0.05, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [1.163127244094488, "mcs21"],
            "midi_o1_elht": [0.11, "none"],
            "midi_o1_elif": [0.540629036538972, "mcs18"],
            "midi_o1_ellg": ["on", "none"],
            "midi_o1_elo": ["on", "none"],
            "midi_o1_elpf": [0.8322073785720605, "mcs19"],
            "midi_o1_elqat": [0.02, "none"],
            "midi_o1_elqdlt": [0, "none"],
            "midi_o1_elqdt": [0.6, "none"],
            "midi_o1_elqht": [0.3, "none"],
            "midi_o1_elqi": [1, "none"],
            "midi_o1_elqp": [1, "none"],
            "midi_o1_elqr": [1, "none"],
            "midi_o1_elqrt": [0.1, "none"],
            "midi_o1_elqs": [1, "none"],
            "midi_o1_elrf": [0.540629036538972, "mcs18"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [0.5663133681323542, "mcs20"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.1, "none"],
            "midi_o1_es": [0, "none"],
            "midi_o1_fd": [0, "lfo3"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_lg": ["off", "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [0, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_lg": ["on", "none"],
            "midi_o1_l_st": ["on", "none"],
            "midi_o1_lf": [0.85, "mcs22"],
            "midi_o1_lq": [0.99, "none"],
            "midi_o1_pfat": [0.02, "none"],
            "midi_o1_pfdlt": [0, "none"],
            "midi_o1_pfdt": [0.6, "none"],
            "midi_o1_pfht": [0.3, "none"],
            "midi_o1_pfia": [1, "none"],
            "midi_o1_pfpa": [1, "none"],
            "midi_o1_pfra": [1, "none"],
            "midi_o1_pfrt": [0.1, "none"],
            "midi_o1_pfsa": [1, "none"],
            "midi_o1_pn": [0.02, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.3, "none"],
            "midi_o1_wf": ["softsaw", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [0, "none"],
            "midi_o2_ea": [0.005, "none"],
            "midi_o2_ed": [1.9378787401574802, "mcs24"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.06, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [0, "none"],
            "midi_o2_ehlg": ["off", "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [0, "none"],
            "midi_o2_ehqat": [0.02, "none"],
            "midi_o2_ehqdlt": [0, "none"],
            "midi_o2_ehqdt": [0.6, "none"],
            "midi_o2_ehqht": [0.3, "none"],
            "midi_o2_ehqi": [1, "none"],
            "midi_o2_ehqp": [1, "none"],
            "midi_o2_ehqr": [1, "none"],
            "midi_o2_ehqrt": [0.1, "none"],
            "midi_o2_ehqs": [1, "none"],
            "midi_o2_ehrf": [0, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [0, "none"],
            "midi_o2_elat": [0.053, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [1.163127244094488, "mcs21"],
            "midi_o2_elht": [0.1, "none"],
            "midi_o2_elif": [0.540629036538972, "mcs18"],
            "midi_o2_ellg": ["on", "none"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [0.8322073785720605, "mcs19"],
            "midi_o2_elqat": [0.02, "none"],
            "midi_o2_elqdlt": [0, "none"],
            "midi_o2_elqdt": [0.6, "none"],
            "midi_o2_elqht": [0.3, "none"],
            "midi_o2_elqi": [1, "none"],
            "midi_o2_elqp": [1, "none"],
            "midi_o2_elqr": [1, "none"],
            "midi_o2_elqrt": [0.1, "none"],
            "midi_o2_elqs": [1, "none"],
            "midi_o2_elrf": [0.5, "fx1"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [0.5663133681323542, "mcs20"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0, "none"],
            "midi_o2_fd": [0, "lfo4"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [0, "none"],
            "midi_o2_hlg": ["off", "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["on", "none"],
            "midi_o2_lf": [0.85, "mcs22"],
            "midi_o2_llg": ["on", "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pfat": [0.02, "none"],
            "midi_o2_pfdlt": [0, "none"],
            "midi_o2_pfdt": [0.6, "none"],
            "midi_o2_pfht": [0.3, "none"],
            "midi_o2_pfia": [1, "none"],
            "midi_o2_pfpa": [1, "none"],
            "midi_o2_pfra": [1, "none"],
            "midi_o2_pfrt": [0.1, "none"],
            "midi_o2_pfsa": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [4, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.3, "none"],
            "midi_o2_wf": ["softsquare", "none"],
            "midi_od_gn": [0.375, "mcs23"],
            "midi_od_st": ["on", "none"],
            "midi_rev_df": [3438, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.9, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.95, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.36, "none"],
            "midi_rev_wet": [0.08, "none"],
            "midi_vl": [0.5, "none"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.417, "none"],
            "th_ech_dry": [0.6, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.72, "none"],
            "th_ech_st": ["on", "none"],
            "th_ech_w": [0.7, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.001, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [0, "none"],
            "th_ehlg": ["off", "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [0, "none"],
            "th_ehqat": [0.02, "none"],
            "th_ehqdlt": [0, "none"],
            "th_ehqdt": [0.6, "none"],
            "th_ehqht": [0.3, "none"],
            "th_ehqi": [1, "none"],
            "th_ehqp": [1, "none"],
            "th_ehqr": [1, "none"],
            "th_ehqrt": [0.1, "none"],
            "th_ehqs": [1, "none"],
            "th_ehrf": [0, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [0, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [1, "none"],
            "th_ellg": ["off", "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [1, "none"],
            "th_elqat": [0.02, "none"],
            "th_elqdlt": [0, "none"],
            "th_elqdt": [0.6, "none"],
            "th_elqht": [0.3, "none"],
            "th_elqi": [1, "none"],
            "th_elqp": [1, "none"],
            "th_elqr": [1, "none"],
            "th_elqrt": [0.1, "none"],
            "th_elqs": [1, "none"],
            "th_elrf": [1, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [1, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.307, "none"],
            "th_es": [1, "none"],
            "th_fd": [0, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [0, "none"],
            "th_hlg": ["off", "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["on", "none"],
            "th_lf": [0.168, "none"],
            "th_llg": ["off", "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [3185, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["on", "none"],
            "th_pfat": [0.02, "none"],
            "th_pfdlt": [0, "none"],
            "th_pfdt": [0.6, "none"],
            "th_pfht": [0.3, "none"],
            "th_pfia": [1, "none"],
            "th_pfpa": [1, "none"],
            "th_pfra": [1, "none"],
            "th_pfrt": [0.1, "none"],
            "th_pfsa": [1, "none"],
            "th_pn": [0, "none"],
            "th_res": [32, "none"],
            "th_rev_df": [5717, "none"],
            "th_rev_dg": [-10.9, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.98, "none"],
            "th_rev_st": ["on", "none"],
            "th_rev_w": [-0.4, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["softsaw", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "version": "4",
            "vrt_dt": [0, "none"]
        },
        "p3": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [6000, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.4, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["off", "none"],
            "cmp_ech_w": [0.5, "none"],
            "cmp_ech_wet": [0.5, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.02, "none"],
            "cmp_o1_ed": [0.6, "none"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.3, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [0, "none"],
            "cmp_o1_ehlg": ["on", "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [0, "none"],
            "cmp_o1_ehqat": [0.02, "none"],
            "cmp_o1_ehqdlt": [0, "none"],
            "cmp_o1_ehqdt": [0.6, "none"],
            "cmp_o1_ehqht": [0.3, "none"],
            "cmp_o1_ehqi": [1, "none"],
            "cmp_o1_ehqp": [1, "none"],
            "cmp_o1_ehqr": [1, "none"],
            "cmp_o1_ehqrt": [0.1, "none"],
            "cmp_o1_ehqs": [1, "none"],
            "cmp_o1_ehrf": [0, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [0, "none"],
            "cmp_o1_elat": [0.02, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [0.6, "none"],
            "cmp_o1_elht": [0.3, "none"],
            "cmp_o1_elif": [0, "none"],
            "cmp_o1_ellg": ["on", "none"],
            "cmp_o1_elo": ["off", "none"],
            "cmp_o1_elpf": [0, "none"],
            "cmp_o1_elqat": [0.02, "none"],
            "cmp_o1_elqdlt": [0, "none"],
            "cmp_o1_elqdt": [0.6, "none"],
            "cmp_o1_elqht": [0.3, "none"],
            "cmp_o1_elqi": [1, "none"],
            "cmp_o1_elqp": [1, "none"],
            "cmp_o1_elqr": [1, "none"],
            "cmp_o1_elqrt": [0.1, "none"],
            "cmp_o1_elqs": [1, "none"],
            "cmp_o1_elrf": [0, "none"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [0, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.1, "none"],
            "cmp_o1_es": [0.7, "none"],
            "cmp_o1_fd": [0, "none"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_lg": ["on", "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [0, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_lg": ["on", "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [0, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pfat": [0.02, "none"],
            "cmp_o1_pfdlt": [0, "none"],
            "cmp_o1_pfdt": [0.6, "none"],
            "cmp_o1_pfht": [0.3, "none"],
            "cmp_o1_pfia": [1, "none"],
            "cmp_o1_pfpa": [1, "none"],
            "cmp_o1_pfra": [1, "none"],
            "cmp_o1_pfrt": [0.1, "none"],
            "cmp_o1_pfsa": [1, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["sawtooth", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [0, "none"],
            "cmp_o2_ea": [0.02, "none"],
            "cmp_o2_ed": [0.6, "none"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.3, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [0, "none"],
            "cmp_o2_ehlg": ["on", "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [0, "none"],
            "cmp_o2_ehqat": [0.02, "none"],
            "cmp_o2_ehqdlt": [0, "none"],
            "cmp_o2_ehqdt": [0.6, "none"],
            "cmp_o2_ehqht": [0.3, "none"],
            "cmp_o2_ehqi": [1, "none"],
            "cmp_o2_ehqp": [1, "none"],
            "cmp_o2_ehqr": [1, "none"],
            "cmp_o2_ehqrt": [0.1, "none"],
            "cmp_o2_ehqs": [1, "none"],
            "cmp_o2_ehrf": [0, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [0, "none"],
            "cmp_o2_elat": [0.02, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [0.6, "none"],
            "cmp_o2_elht": [0.3, "none"],
            "cmp_o2_elif": [0, "none"],
            "cmp_o2_ellg": ["on", "none"],
            "cmp_o2_elo": ["off", "none"],
            "cmp_o2_elpf": [0, "none"],
            "cmp_o2_elqat": [0.02, "none"],
            "cmp_o2_elqdlt": [0, "none"],
            "cmp_o2_elqdt": [0.6, "none"],
            "cmp_o2_elqht": [0.3, "none"],
            "cmp_o2_elqi": [1, "none"],
            "cmp_o2_elqp": [1, "none"],
            "cmp_o2_elqr": [1, "none"],
            "cmp_o2_elqrt": [0.1, "none"],
            "cmp_o2_elqs": [1, "none"],
            "cmp_o2_elrf": [0, "none"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [0, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.1, "none"],
            "cmp_o2_es": [0.7, "none"],
            "cmp_o2_fd": [0, "none"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [0, "none"],
            "cmp_o2_hlg": ["on", "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [0, "none"],
            "cmp_o2_llg": ["on", "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pfat": [0.02, "none"],
            "cmp_o2_pfdlt": [0, "none"],
            "cmp_o2_pfdt": [0.6, "none"],
            "cmp_o2_pfht": [0.3, "none"],
            "cmp_o2_pfia": [1, "none"],
            "cmp_o2_pfpa": [1, "none"],
            "cmp_o2_pfra": [1, "none"],
            "cmp_o2_pfrt": [0.1, "none"],
            "cmp_o2_pfsa": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [4, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["square", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.7, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.8, "none"],
            "cmp_rev_st": ["off", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.3, "none"],
            "cmp_vl": [0.5, "none"],
            "lfo1_am": [1, "none"],
            "lfo1_ds": [0, "none"],
            "lfo1_f": [2, "none"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0, "none"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [1, "none"],
            "lfo2_ds": [0, "none"],
            "lfo2_f": [2, "none"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0, "none"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_ds": [0, "none"],
            "lfo3_f": [2, "none"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0, "none"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [1, "none"],
            "lfo4_ds": [0, "none"],
            "lfo4_f": [2, "none"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0, "none"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_ds": [0, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_ds": [0, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_ds": [0, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_ds": [0, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_ds": [0, "none"],
            "mcs10_in": [0, "none"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_ds": [0, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_ds": [0, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_ds": [0, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_ds": [0, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_ds": [0, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_ds": [0, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_ds": [0, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_ds": [0, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_ds": [0, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_ds": [0, "none"],
            "mcs1_in": [0, "none"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [1, "none"],
            "mcs1_mi": [0, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_ds": [0, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_ds": [0, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_ds": [0, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_ds": [0, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_ds": [0, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_ds": [0, "none"],
            "mcs2_in": [0, "none"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [1, "none"],
            "mcs2_mi": [0, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_ds": [0, "none"],
            "mcs3_in": [0, "none"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [1, "none"],
            "mcs3_mi": [0, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_ds": [0, "none"],
            "mcs4_in": [0, "none"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [1, "none"],
            "mcs4_mi": [0, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_ds": [0, "none"],
            "mcs5_in": [0, "none"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [1, "none"],
            "mcs5_mi": [0, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_ds": [0, "none"],
            "mcs6_in": [0, "none"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [1, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_ds": [0, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_ds": [0, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_ds": [0, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [6000, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.4, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["off", "none"],
            "midi_ech_w": [0.5, "none"],
            "midi_ech_wet": [0.5, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.02, "none"],
            "midi_o1_ed": [0.6, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.3, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [0, "none"],
            "midi_o1_ehlg": ["on", "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [0, "none"],
            "midi_o1_ehqat": [0.02, "none"],
            "midi_o1_ehqdlt": [0, "none"],
            "midi_o1_ehqdt": [0.6, "none"],
            "midi_o1_ehqht": [0.3, "none"],
            "midi_o1_ehqi": [1, "none"],
            "midi_o1_ehqp": [1, "none"],
            "midi_o1_ehqr": [1, "none"],
            "midi_o1_ehqrt": [0.1, "none"],
            "midi_o1_ehqs": [1, "none"],
            "midi_o1_ehrf": [0, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [0, "none"],
            "midi_o1_elat": [0.02, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [0.6, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [0, "none"],
            "midi_o1_ellg": ["on", "none"],
            "midi_o1_elo": ["off", "none"],
            "midi_o1_elpf": [0, "none"],
            "midi_o1_elqat": [0.02, "none"],
            "midi_o1_elqdlt": [0, "none"],
            "midi_o1_elqdt": [0.6, "none"],
            "midi_o1_elqht": [0.3, "none"],
            "midi_o1_elqi": [1, "none"],
            "midi_o1_elqp": [1, "none"],
            "midi_o1_elqr": [1, "none"],
            "midi_o1_elqrt": [0.1, "none"],
            "midi_o1_elqs": [1, "none"],
            "midi_o1_elrf": [0, "none"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [0, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.1, "none"],
            "midi_o1_es": [0.7, "none"],
            "midi_o1_fd": [0, "none"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_lg": ["on", "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [0, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_lg": ["on", "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [0, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pfat": [0.02, "none"],
            "midi_o1_pfdlt": [0, "none"],
            "midi_o1_pfdt": [0.6, "none"],
            "midi_o1_pfht": [0.3, "none"],
            "midi_o1_pfia": [1, "none"],
            "midi_o1_pfpa": [1, "none"],
            "midi_o1_pfra": [1, "none"],
            "midi_o1_pfrt": [0.1, "none"],
            "midi_o1_pfsa": [1, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["sawtooth", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [0, "none"],
            "midi_o2_ea": [0.02, "none"],
            "midi_o2_ed": [0.6, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.3, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [0, "none"],
            "midi_o2_ehlg": ["on", "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [0, "none"],
            "midi_o2_ehqat": [0.02, "none"],
            "midi_o2_ehqdlt": [0, "none"],
            "midi_o2_ehqdt": [0.6, "none"],
            "midi_o2_ehqht": [0.3, "none"],
            "midi_o2_ehqi": [1, "none"],
            "midi_o2_ehqp": [1, "none"],
            "midi_o2_ehqr": [1, "none"],
            "midi_o2_ehqrt": [0.1, "none"],
            "midi_o2_ehqs": [1, "none"],
            "midi_o2_ehrf": [0, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [0, "none"],
            "midi_o2_elat": [0.02, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [0.6, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [0, "none"],
            "midi_o2_ellg": ["on", "none"],
            "midi_o2_elo": ["off", "none"],
            "midi_o2_elpf": [0, "none"],
            "midi_o2_elqat": [0.02, "none"],
            "midi_o2_elqdlt": [0, "none"],
            "midi_o2_elqdt": [0.6, "none"],
            "midi_o2_elqht": [0.3, "none"],
            "midi_o2_elqi": [1, "none"],
            "midi_o2_elqp": [1, "none"],
            "midi_o2_elqr": [1, "none"],
            "midi_o2_elqrt": [0.1, "none"],
            "midi_o2_elqs": [1, "none"],
            "midi_o2_elrf": [0, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [0, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0.7, "none"],
            "midi_o2_fd": [0, "none"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [0, "none"],
            "midi_o2_hlg": ["on", "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [0, "none"],
            "midi_o2_llg": ["on", "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pfat": [0.02, "none"],
            "midi_o2_pfdlt": [0, "none"],
            "midi_o2_pfdt": [0.6, "none"],
            "midi_o2_pfht": [0.3, "none"],
            "midi_o2_pfia": [1, "none"],
            "midi_o2_pfpa": [1, "none"],
            "midi_o2_pfra": [1, "none"],
            "midi_o2_pfrt": [0.1, "none"],
            "midi_o2_pfsa": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [4, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["square", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.7, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.8, "none"],
            "midi_rev_st": ["off", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.3, "none"],
            "midi_vl": [0.5, "none"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.4, "none"],
            "th_ech_dry": [0.9, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.5, "none"],
            "th_ech_st": ["off", "none"],
            "th_ech_w": [0.5, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.001, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [0, "none"],
            "th_ehlg": ["on", "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [0, "none"],
            "th_ehqat": [0.02, "none"],
            "th_ehqdlt": [0, "none"],
            "th_ehqdt": [0.6, "none"],
            "th_ehqht": [0.3, "none"],
            "th_ehqi": [1, "none"],
            "th_ehqp": [1, "none"],
            "th_ehqr": [1, "none"],
            "th_ehqrt": [0.1, "none"],
            "th_ehqs": [1, "none"],
            "th_ehrf": [0, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [0, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [0, "none"],
            "th_ellg": ["on", "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [0, "none"],
            "th_elqat": [0.02, "none"],
            "th_elqdlt": [0, "none"],
            "th_elqdt": [0.6, "none"],
            "th_elqht": [0.3, "none"],
            "th_elqi": [1, "none"],
            "th_elqp": [1, "none"],
            "th_elqr": [1, "none"],
            "th_elqrt": [0.1, "none"],
            "th_elqs": [1, "none"],
            "th_elrf": [0, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [0, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.1, "none"],
            "th_es": [1, "none"],
            "th_fd": [0, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [0, "none"],
            "th_hlg": ["on", "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [0, "none"],
            "th_llg": ["on", "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pfat": [0.02, "none"],
            "th_pfdlt": [0, "none"],
            "th_pfdt": [0.6, "none"],
            "th_pfht": [0.3, "none"],
            "th_pfia": [1, "none"],
            "th_pfpa": [1, "none"],
            "th_pfra": [1, "none"],
            "th_pfrt": [0.1, "none"],
            "th_pfsa": [1, "none"],
            "th_pn": [0, "none"],
            "th_res": [1, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.8, "none"],
            "th_rev_st": ["off", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sine", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "version": "4",
            "vrt_dt": [0, "none"]
        },
        "p4": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [4400, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.4, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [98, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["on", "none"],
            "cmp_ech_w": [-0.5, "none"],
            "cmp_ech_wet": [0.12, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.25, "none"],
            "cmp_o1_cwf_i1": [0.25, "none"],
            "cmp_o1_cwf_i2": [0.25, "none"],
            "cmp_o1_cwf_i3": [0.25, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0.22, "none"],
            "cmp_o1_cwf_i7": [0.25, "none"],
            "cmp_o1_cwf_i8": [0.25, "none"],
            "cmp_o1_cwf_i9": [0.19, "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.002, "none"],
            "cmp_o1_ed": [0.6, "none"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.3, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [0.02, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [0.6, "none"],
            "cmp_o1_elht": [0.3, "none"],
            "cmp_o1_elif": [22050, "none"],
            "cmp_o1_elo": ["off", "none"],
            "cmp_o1_elpf": [22050, "none"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [22050, "none"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [22050, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.1, "none"],
            "cmp_o1_es": [0.8, "none"],
            "cmp_o1_fd": [0, "lfo3"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0.5, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["custom", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.25, "none"],
            "cmp_o2_cwf_i1": [0.25, "none"],
            "cmp_o2_cwf_i2": [0.25, "none"],
            "cmp_o2_cwf_i3": [0.25, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0.22, "none"],
            "cmp_o2_cwf_i7": [0.25, "none"],
            "cmp_o2_cwf_i8": [0.25, "none"],
            "cmp_o2_cwf_i9": [0.19, "none"],
            "cmp_o2_dt": [0, "none"],
            "cmp_o2_ea": [0.02, "none"],
            "cmp_o2_ed": [0.6, "none"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.3, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.02, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [0.6, "none"],
            "cmp_o2_elht": [0.3, "none"],
            "cmp_o2_elif": [22050, "none"],
            "cmp_o2_elo": ["off", "none"],
            "cmp_o2_elpf": [22050, "none"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [22050, "none"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [22050, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.1, "none"],
            "cmp_o2_es": [0.7, "none"],
            "cmp_o2_fd": [0, "lfo4"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [22050, "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [-0.5, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [4, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["custom", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.7, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.8, "none"],
            "cmp_rev_st": ["off", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.3, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.08625000000000001, "mcs1"],
            "lfo1_f": [5.5, "none"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.4975, "mcs2"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.08625000000000001, "mcs1"],
            "lfo2_f": [5.5, "none"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0.5025, "mcs3"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [0.057, "mcs4"],
            "lfo3_f": [5.5, "none"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0.5025, "mcs5"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [0.057, "mcs4"],
            "lfo4_f": [5.5, "none"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0.4975, "mcs6"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_in": [0, "none"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.25, "mod"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [0.33, "none"],
            "mcs1_mi": [0.005, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "pitch"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [0.995, "none"],
            "mcs2_mi": [0, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.5, "pitch"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [1, "none"],
            "mcs3_mi": [0.005, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.16, "vrt3"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [0.33, "none"],
            "mcs4_mi": [0.005, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.5, "vrt2"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [1, "none"],
            "mcs5_mi": [0.005, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0.5, "vrt2"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [0.995, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [4400, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.4, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["on", "none"],
            "midi_ech_w": [-0.5, "none"],
            "midi_ech_wet": [0.12, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.35, "none"],
            "midi_o1_cwf_i1": [0.35, "none"],
            "midi_o1_cwf_i2": [0.35, "none"],
            "midi_o1_cwf_i3": [0.31, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.002, "none"],
            "midi_o1_ed": [0.6, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.3, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [0.02, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [0.6, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [22050, "none"],
            "midi_o1_elo": ["off", "none"],
            "midi_o1_elpf": [22050, "none"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [22050, "none"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [22050, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.1, "none"],
            "midi_o1_es": [0.8, "none"],
            "midi_o1_fd": [0, "lfo1"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0.5, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["custom", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.35, "none"],
            "midi_o2_cwf_i1": [0.35, "none"],
            "midi_o2_cwf_i2": [0.35, "none"],
            "midi_o2_cwf_i3": [0.31, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [0, "none"],
            "midi_o2_ea": [0.02, "none"],
            "midi_o2_ed": [0.6, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.3, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.02, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [0.6, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [22050, "none"],
            "midi_o2_elo": ["off", "none"],
            "midi_o2_elpf": [22050, "none"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [22050, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [22050, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0.7, "none"],
            "midi_o2_fd": [0, "lfo2"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [22050, "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [-0.5, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [4, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["custom", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.7, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.8, "none"],
            "midi_rev_st": ["off", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.3, "none"],
            "midi_vl": [0.5, "volume"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0.2, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.4, "none"],
            "th_ech_dry": [0.9, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.5, "none"],
            "th_ech_st": ["off", "none"],
            "th_ech_w": [0.5, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.6, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0.3, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [20, "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [20, "none"],
            "th_ehq": [1, "none"],
            "th_ehrf": [20, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [20, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [22050, "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [22050, "none"],
            "th_elq": [1, "none"],
            "th_elrf": [22050, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [22050, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.1, "none"],
            "th_es": [0.7, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pn": [0, "none"],
            "th_res": [1, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.8, "none"],
            "th_rev_st": ["off", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["custom", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.16, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p5": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [4400, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.4, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["on", "none"],
            "cmp_ech_w": [-0.5, "none"],
            "cmp_ech_wet": [0.12, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.35, "none"],
            "cmp_o1_cwf_i1": [0.35, "none"],
            "cmp_o1_cwf_i2": [0.35, "none"],
            "cmp_o1_cwf_i3": [0.31, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.002, "none"],
            "cmp_o1_ed": [0.6, "none"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.3, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [0.02, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [0.6, "none"],
            "cmp_o1_elht": [0.3, "none"],
            "cmp_o1_elif": [22050, "none"],
            "cmp_o1_elo": ["off", "none"],
            "cmp_o1_elpf": [22050, "none"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [22050, "none"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [22050, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.1, "none"],
            "cmp_o1_es": [0.8, "none"],
            "cmp_o1_fd": [0, "lfo1"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0.5, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["custom", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.35, "none"],
            "cmp_o2_cwf_i1": [0.35, "none"],
            "cmp_o2_cwf_i2": [0.35, "none"],
            "cmp_o2_cwf_i3": [0.31, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [0, "none"],
            "cmp_o2_ea": [0.02, "none"],
            "cmp_o2_ed": [0.6, "none"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.3, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.02, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [0.6, "none"],
            "cmp_o2_elht": [0.3, "none"],
            "cmp_o2_elif": [22050, "none"],
            "cmp_o2_elo": ["off", "none"],
            "cmp_o2_elpf": [22050, "none"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [22050, "none"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [22050, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.1, "none"],
            "cmp_o2_es": [0.7, "none"],
            "cmp_o2_fd": [0, "lfo2"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [22050, "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [-0.5, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [4, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["custom", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.7, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.8, "none"],
            "cmp_rev_st": ["off", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.3, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.08625000000000001, "mcs1"],
            "lfo1_f": [5.5, "none"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.4975, "mcs2"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.08625000000000001, "mcs1"],
            "lfo2_f": [5.5, "none"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0.5025, "mcs3"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [0.057, "mcs4"],
            "lfo3_f": [5.5, "none"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0.5025, "mcs5"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [0.057, "mcs4"],
            "lfo4_f": [5.5, "none"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0.4975, "mcs6"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_in": [0, "none"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.25, "vrt3"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [0.33, "none"],
            "mcs1_mi": [0.005, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "vrt2"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [0.995, "none"],
            "mcs2_mi": [0, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.5, "vrt2"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [1, "none"],
            "mcs3_mi": [0.005, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.16, "mod"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [0.33, "none"],
            "mcs4_mi": [0.005, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.5, "pitch"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [1, "none"],
            "mcs5_mi": [0.005, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0.5, "pitch"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [0.995, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [4400, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.4, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [98, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["on", "none"],
            "midi_ech_w": [-0.5, "none"],
            "midi_ech_wet": [0.12, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.25, "none"],
            "midi_o1_cwf_i1": [0.25, "none"],
            "midi_o1_cwf_i2": [0.25, "none"],
            "midi_o1_cwf_i3": [0.25, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0.22, "none"],
            "midi_o1_cwf_i7": [0.25, "none"],
            "midi_o1_cwf_i8": [0.25, "none"],
            "midi_o1_cwf_i9": [0.19, "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.002, "none"],
            "midi_o1_ed": [0.6, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.3, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [0.02, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [0.6, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [22050, "none"],
            "midi_o1_elo": ["off", "none"],
            "midi_o1_elpf": [22050, "none"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [22050, "none"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [22050, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.1, "none"],
            "midi_o1_es": [0.8, "none"],
            "midi_o1_fd": [0, "lfo3"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0.5, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["custom", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.25, "none"],
            "midi_o2_cwf_i1": [0.25, "none"],
            "midi_o2_cwf_i2": [0.25, "none"],
            "midi_o2_cwf_i3": [0.25, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0.22, "none"],
            "midi_o2_cwf_i7": [0.25, "none"],
            "midi_o2_cwf_i8": [0.25, "none"],
            "midi_o2_cwf_i9": [0.19, "none"],
            "midi_o2_dt": [0, "none"],
            "midi_o2_ea": [0.02, "none"],
            "midi_o2_ed": [0.6, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.3, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.02, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [0.6, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [22050, "none"],
            "midi_o2_elo": ["off", "none"],
            "midi_o2_elpf": [22050, "none"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [22050, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [22050, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0.7, "none"],
            "midi_o2_fd": [0, "lfo4"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [22050, "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [-0.5, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [4, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["custom", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.7, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.8, "none"],
            "midi_rev_st": ["off", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.3, "none"],
            "midi_vl": [0.5, "volume"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0.2, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.4, "none"],
            "th_ech_dry": [0.9, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.5, "none"],
            "th_ech_st": ["off", "none"],
            "th_ech_w": [0.5, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.6, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0.3, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [20, "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [20, "none"],
            "th_ehq": [1, "none"],
            "th_ehrf": [20, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [20, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [22050, "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [22050, "none"],
            "th_elq": [1, "none"],
            "th_elrf": [22050, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [22050, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.1, "none"],
            "th_es": [0.7, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pn": [0, "none"],
            "th_res": [1, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.8, "none"],
            "th_rev_st": ["off", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["custom", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.16, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p6": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [4400, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.3, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.7, "none"],
            "cmp_ech_st": ["on", "none"],
            "cmp_ech_w": [-0.5, "none"],
            "cmp_ech_wet": [0.16, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.001, "none"],
            "cmp_o1_ed": [2.1383575, "mcs1"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [0.006, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [2.1383575, "mcs1"],
            "cmp_o1_elht": [0.2, "none"],
            "cmp_o1_elif": [7405, "none"],
            "cmp_o1_elo": ["on", "none"],
            "cmp_o1_elpf": [5307.2, "mcs3"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [2400, "none"],
            "cmp_o1_elrt": [0.16, "none"],
            "cmp_o1_elsf": [4401, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.16, "none"],
            "cmp_o1_es": [0, "none"],
            "cmp_o1_fd": [-2.5, "none"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [2.4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["square", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [12, "none"],
            "cmp_o2_ea": [0.001, "none"],
            "cmp_o2_ed": [2.0596127500000003, "mcs2"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.006, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [2.0596127500000003, "mcs2"],
            "cmp_o2_elht": [0.2, "none"],
            "cmp_o2_elif": [7405, "none"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [5307.2, "mcs3"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [2400, "none"],
            "cmp_o2_elrt": [0.15, "none"],
            "cmp_o2_elsf": [4401, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.15, "none"],
            "cmp_o2_es": [0, "none"],
            "cmp_o2_fd": [2.5, "none"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [22050, "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [3.2, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["sawtooth", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.84, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.86, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.16, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.07125000000000001, "mcs10"],
            "lfo1_f": [5.133791499999999, "mcs11"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.5, "pitch"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [1, "none"],
            "lfo2_f": [2, "none"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0, "none"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_f": [2, "none"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0, "none"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [1, "none"],
            "lfo4_f": [2, "none"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0, "none"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_in": [0.25, "mod"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [0.18, "none"],
            "mcs10_mi": [0.035, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0.5, "note"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [0.3167, "none"],
            "mcs11_mi": [0.025, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.5, "vrtnote"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [0.005, "none"],
            "mcs1_mi": [0.28, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "vrtnote"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [0.0045, "none"],
            "mcs2_mi": [0.27, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.5, "vrtnote"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [0.4, "none"],
            "mcs3_mi": [0.08, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.5, "note"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [0.1395, "mcs6"],
            "mcs4_mi": [0.007, "mcs5"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.5, "note"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [0.011, "none"],
            "mcs5_mi": [0.003, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0.5, "note"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [0.235, "none"],
            "mcs6_mi": [0.044, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0.5, "note"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [0.242, "none"],
            "mcs7_mi": [0.01, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0.6, "vel"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [0.8, "none"],
            "mcs8_mi": [0.55, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0.6, "vel"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [0.6, "none"],
            "mcs9_mi": [0.35, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [6000, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.4, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["off", "none"],
            "midi_ech_w": [0.5, "none"],
            "midi_ech_wet": [0.5, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [12, "none"],
            "midi_o1_ea": [0.15, "none"],
            "midi_o1_ed": [0.4, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.2, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [0.02, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [0.6, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [2148, "none"],
            "midi_o1_elo": ["on", "none"],
            "midi_o1_elpf": [2795.78, "mcs7"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [1147, "none"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [1633.6975000000002, "mcs4"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.1, "none"],
            "midi_o1_es": [0.7000000000000001, "mcs8"],
            "midi_o1_fd": [0, "lfo1"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1.01, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [-15, "none"],
            "midi_o1_prt": [0.1, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["sawtooth", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [31, "none"],
            "midi_o2_ea": [0.1, "none"],
            "midi_o2_ed": [0.6, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.3, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.02, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [0.6, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [2148, "none"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [2795.78, "mcs7"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [1898, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [1633.6975000000002, "mcs4"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0.5, "mcs9"],
            "midi_o2_fd": [0, "lfo1"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [22050, "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [-22, "none"],
            "midi_o2_prt": [0.06, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [1.36, "none"],
            "midi_o2_vs": [0.63, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["sawtooth", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.84, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.86, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.16, "none"],
            "midi_vl": [0.5, "volume"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [64, "none"],
            "sq_b0_b0_0": ["s7", "none"],
            "sq_b0_b0_1": ["s11", "none"],
            "sq_b0_b0_2": ["s14", "none"],
            "sq_b0_b0_3": ["s16", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["s4", "none"],
            "sq_b0_b1_1": ["s8", "none"],
            "sq_b0_b1_2": ["s11", "none"],
            "sq_b0_b1_3": ["s13", "none"],
            "sq_b0_b2_0": ["s5", "none"],
            "sq_b0_b2_1": ["s9", "none"],
            "sq_b0_b2_2": ["s12", "none"],
            "sq_b0_b2_3": ["s14", "none"],
            "sq_b0_b3_0": ["s2", "none"],
            "sq_b0_b3_1": ["s6", "none"],
            "sq_b0_b3_2": ["s9", "none"],
            "sq_b0_b3_3": ["s11", "none"],
            "sq_b0_b4_0": ["s3", "none"],
            "sq_b0_b4_1": ["s7", "none"],
            "sq_b0_b4_2": ["s10", "none"],
            "sq_b0_b4_3": ["s12", "none"],
            "sq_b0_b5_0": ["s0", "none"],
            "sq_b0_b5_1": ["s4", "none"],
            "sq_b0_b5_2": ["s7", "none"],
            "sq_b0_b5_3": ["s9", "none"],
            "sq_b0_b6_0": ["s3", "none"],
            "sq_b0_b6_1": ["s7", "none"],
            "sq_b0_b6_2": ["s10", "none"],
            "sq_b0_b6_3": ["s12", "none"],
            "sq_b0_b7_0": ["s4", "none"],
            "sq_b0_b7_1": ["s8", "none"],
            "sq_b0_b7_2": ["s11", "none"],
            "sq_b0_b7_3": ["s13", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [50, "none"],
            "sq_b0_dt": [-12, "none"],
            "sq_b0_gap": [192, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n2", "none"],
            "sq_b0_scl1": ["nx", "none"],
            "sq_b0_scl10": ["nx", "none"],
            "sq_b0_scl11": ["s1", "none"],
            "sq_b0_scl2": ["n4", "none"],
            "sq_b0_scl3": ["nx", "none"],
            "sq_b0_scl4": ["s6", "none"],
            "sq_b0_scl5": ["n7", "none"],
            "sq_b0_scl6": ["nx", "none"],
            "sq_b0_scl7": ["n9", "none"],
            "sq_b0_scl8": ["nx", "none"],
            "sq_b0_scl9": ["n11", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v10", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v10", "none"],
            "sq_b0_v3": ["v10", "none"],
            "sq_b0_v4": ["v11", "none"],
            "sq_b0_v5": ["v10", "none"],
            "sq_b0_v6": ["v10", "none"],
            "sq_b0_v7": ["v10", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.4, "none"],
            "th_ech_dry": [0.9, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.5, "none"],
            "th_ech_st": ["off", "none"],
            "th_ech_w": [0.5, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.6, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0.3, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [20, "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [20, "none"],
            "th_ehq": [1, "none"],
            "th_ehrf": [20, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [20, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [22050, "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [22050, "none"],
            "th_elq": [1, "none"],
            "th_elrf": [22050, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [22050, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.1, "none"],
            "th_es": [0.7, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pn": [0, "none"],
            "th_res": [1, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.8, "none"],
            "th_rev_st": ["off", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sine", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p7": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [2, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [6000, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.4, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["off", "none"],
            "cmp_ech_w": [0.5, "none"],
            "cmp_ech_wet": [0.5, "none"],
            "cmp_fvl": [24, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m6", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [-12, "none"],
            "cmp_o1_ea": [0.264, "mcs6"],
            "cmp_o1_ed": [0.6, "none"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.3, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [0.307, "none"],
            "cmp_o1_eldlt": [0.06, "none"],
            "cmp_o1_eldt": [1.62, "none"],
            "cmp_o1_elht": [0.3, "none"],
            "cmp_o1_elif": [2148, "none"],
            "cmp_o1_elo": ["on", "none"],
            "cmp_o1_elpf": [8907, "none"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [2148, "none"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [3400, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.1, "none"],
            "cmp_o1_es": [0.6, "none"],
            "cmp_o1_fd": [-5.5, "lfo4"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [8, "none"],
            "cmp_o1_vs": [0.2, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["sawtooth", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [0, "none"],
            "cmp_o2_ea": [0.01, "none"],
            "cmp_o2_ed": [0.6, "none"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.3, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.511, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [0.9, "none"],
            "cmp_o2_elht": [0.3, "none"],
            "cmp_o2_elif": [1647, "none"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [8907, "none"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [3400, "none"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [4902, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.1, "none"],
            "cmp_o2_es": [0.7, "none"],
            "cmp_o2_fd": [0, "lfo5"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["on", "none"],
            "cmp_o2_lf": [4401, "lfo3"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [4, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["square", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.92, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.93, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.08, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.04375, "mcs5"],
            "lfo1_f": [4.757416999999999, "mcs2"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.5025, "mcs3"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.04375, "mcs5"],
            "lfo2_f": [4.757416999999999, "mcs2"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0.4975, "mcs4"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_f": [1.4840084999999998, "mcs7"],
            "lfo3_ma": [0.36, "none"],
            "lfo3_mi": [0.32, "none"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [0.0825, "mcs9"],
            "lfo4_f": [4.757416999999999, "mcs8"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0.5025, "mcs10"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [0.0825, "mcs9"],
            "lfo5_f": [4.757416999999999, "mcs8"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0.4975, "mcs11"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_in": [0.5, "vrt2"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0.005, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0.5, "vrt2"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [0.995, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.5, "note"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [0.005, "none"],
            "mcs1_mi": [0.23, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "note"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [0.2833, "none"],
            "mcs2_mi": [0.0333, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.5, "pitch"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [1, "none"],
            "mcs3_mi": [0.005, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.5, "pitch"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [0.995, "none"],
            "mcs4_mi": [0, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.25, "mod"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [0.16, "none"],
            "mcs5_mi": [0.005, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0.5, "vrtnote"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [0.015, "none"],
            "mcs6_mi": [0.073, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0.5, "vrtnote"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [0.095, "none"],
            "mcs7_mi": [0.0033, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0.5, "vrtnote"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [0.2833, "none"],
            "mcs8_mi": [0.0333, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0.5, "vrt3"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [0.16, "none"],
            "mcs9_mi": [0.005, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [1.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [6000, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.4, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["off", "none"],
            "midi_ech_w": [0.5, "none"],
            "midi_ech_wet": [0.5, "none"],
            "midi_fvl": [9, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m7", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [19, "none"],
            "midi_o1_ea": [0.016, "none"],
            "midi_o1_ed": [1.7633825, "mcs1"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.3, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [0.02, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [0.6, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [22050, "none"],
            "midi_o1_elo": ["off", "none"],
            "midi_o1_elpf": [22050, "none"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [22050, "none"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [22050, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.1, "none"],
            "midi_o1_es": [0.5, "none"],
            "midi_o1_fd": [0, "lfo1"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [2.88, "none"],
            "midi_o1_vs": [0.3, "none"],
            "midi_o1_wd": [0.3, "none"],
            "midi_o1_wf": ["sine", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [0, "none"],
            "midi_o2_ea": [0.002, "none"],
            "midi_o2_ed": [0.6, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.059, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.02, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [0.6, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [22050, "none"],
            "midi_o2_elo": ["off", "none"],
            "midi_o2_elpf": [22050, "none"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [22050, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [22050, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0.7, "none"],
            "midi_o2_fd": [0, "lfo2"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [22050, "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [4, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.3, "none"],
            "midi_o2_wf": ["sine", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.92, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.93, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.08, "none"],
            "midi_vl": [0.5, "volume"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.4, "none"],
            "th_ech_dry": [0.9, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.5, "none"],
            "th_ech_st": ["off", "none"],
            "th_ech_w": [0.5, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.6, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0.3, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [20, "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [20, "none"],
            "th_ehq": [1, "none"],
            "th_ehrf": [20, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [20, "none"],
            "th_elat": [0.511, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [1.109, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [4401, "none"],
            "th_elo": ["on", "none"],
            "th_elpf": [8156, "none"],
            "th_elq": [1, "none"],
            "th_elrf": [3400, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [5402, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.1, "none"],
            "th_es": [0.7, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pn": [0, "none"],
            "th_res": [16, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.9, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.93, "none"],
            "th_rev_st": ["on", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.1, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["square", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p8": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [1.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [6000, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.4, "none"],
            "cmp_ech_dry": [0.9, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["off", "none"],
            "cmp_ech_w": [0.5, "none"],
            "cmp_ech_wet": [0.5, "none"],
            "cmp_fvl": [9, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m7", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [19, "none"],
            "cmp_o1_ea": [0.016, "none"],
            "cmp_o1_ed": [1.7633825, "mcs1"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.3, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [0.02, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [0.6, "none"],
            "cmp_o1_elht": [0.3, "none"],
            "cmp_o1_elif": [22050, "none"],
            "cmp_o1_elo": ["off", "none"],
            "cmp_o1_elpf": [22050, "none"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [22050, "none"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [22050, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.1, "none"],
            "cmp_o1_es": [0.5, "none"],
            "cmp_o1_fd": [0, "lfo1"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [2.88, "none"],
            "cmp_o1_vs": [0.3, "none"],
            "cmp_o1_wd": [0.3, "none"],
            "cmp_o1_wf": ["sine", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [0, "none"],
            "cmp_o2_ea": [0.002, "none"],
            "cmp_o2_ed": [0.6, "none"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.059, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.02, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [0.6, "none"],
            "cmp_o2_elht": [0.3, "none"],
            "cmp_o2_elif": [22050, "none"],
            "cmp_o2_elo": ["off", "none"],
            "cmp_o2_elpf": [22050, "none"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [22050, "none"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [22050, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.1, "none"],
            "cmp_o2_es": [0.7, "none"],
            "cmp_o2_fd": [0, "lfo2"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [22050, "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [4, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.3, "none"],
            "cmp_o2_wf": ["sine", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.92, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.93, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.08, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.04375, "mcs5"],
            "lfo1_f": [4.757416999999999, "mcs2"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.5025, "mcs3"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.04375, "mcs5"],
            "lfo2_f": [4.757416999999999, "mcs2"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0.4975, "mcs4"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_f": [1.4840084999999998, "mcs7"],
            "lfo3_ma": [0.36, "none"],
            "lfo3_mi": [0.32, "none"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [0.0825, "mcs9"],
            "lfo4_f": [4.757416999999999, "mcs8"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0.5025, "mcs10"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [0.0825, "mcs9"],
            "lfo5_f": [4.757416999999999, "mcs8"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0.4975, "mcs11"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_in": [0.5, "pitch"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0.005, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0.5, "pitch"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [0.995, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.5, "vrtnote"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [0.005, "none"],
            "mcs1_mi": [0.23, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "vrtnote"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [0.2833, "none"],
            "mcs2_mi": [0.0333, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.5, "vrt2"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [1, "none"],
            "mcs3_mi": [0.005, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.5, "vrt2"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [0.995, "none"],
            "mcs4_mi": [0, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.25, "vrt3"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [0.16, "none"],
            "mcs5_mi": [0.005, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0.5, "note"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [0.015, "none"],
            "mcs6_mi": [0.073, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0.5, "note"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [0.095, "none"],
            "mcs7_mi": [0.0033, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0.5, "note"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [0.2833, "none"],
            "mcs8_mi": [0.0333, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0.5, "mod"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [0.16, "none"],
            "mcs9_mi": [0.005, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [2, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [6000, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.4, "none"],
            "midi_ech_dry": [0.9, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["off", "none"],
            "midi_ech_w": [0.5, "none"],
            "midi_ech_wet": [0.5, "none"],
            "midi_fvl": [24, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m6", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [-12, "none"],
            "midi_o1_ea": [0.264, "mcs6"],
            "midi_o1_ed": [0.6, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.3, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [0.307, "none"],
            "midi_o1_eldlt": [0.06, "none"],
            "midi_o1_eldt": [1.62, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [2148, "none"],
            "midi_o1_elo": ["on", "none"],
            "midi_o1_elpf": [8907, "none"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [2148, "none"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [3400, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.1, "none"],
            "midi_o1_es": [0.6, "none"],
            "midi_o1_fd": [-5.5, "lfo4"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [8, "none"],
            "midi_o1_vs": [0.2, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["sawtooth", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [0, "none"],
            "midi_o2_ea": [0.01, "none"],
            "midi_o2_ed": [0.6, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.3, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.511, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [0.9, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [1647, "none"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [8907, "none"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [3400, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [4902, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0.7, "none"],
            "midi_o2_fd": [0, "lfo5"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["on", "none"],
            "midi_o2_lf": [4401, "lfo3"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [4, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["square", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.92, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.93, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.08, "none"],
            "midi_vl": [0.5, "volume"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.4, "none"],
            "th_ech_dry": [0.9, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.5, "none"],
            "th_ech_st": ["off", "none"],
            "th_ech_w": [0.5, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.6, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0.3, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [20, "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [20, "none"],
            "th_ehq": [1, "none"],
            "th_ehrf": [20, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [20, "none"],
            "th_elat": [0.511, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [1.109, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [4401, "none"],
            "th_elo": ["on", "none"],
            "th_elpf": [8156, "none"],
            "th_elq": [1, "none"],
            "th_elrf": [3400, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [5402, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.1, "none"],
            "th_es": [0.7, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pn": [0, "none"],
            "th_res": [16, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.9, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.93, "none"],
            "th_rev_st": ["on", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.1, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["square", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p9": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_dst_gn": [0.3, "none"],
            "cmp_dst_st": ["off", "none"],
            "cmp_ech_df": [6000, "none"],
            "cmp_ech_dg": [-9, "none"],
            "cmp_ech_dly": [0.3, "none"],
            "cmp_ech_dry": [0.8, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.5, "none"],
            "cmp_ech_st": ["on", "none"],
            "cmp_ech_w": [0.375, "none"],
            "cmp_ech_wet": [0.2, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_hs_st": ["off", "none"],
            "cmp_hsf": [5000, "none"],
            "cmp_hsg": [0, "none"],
            "cmp_ls_st": ["off", "none"],
            "cmp_lsf": [250, "none"],
            "cmp_lsg": [0, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_cwf": [0, "none"],
            "cmp_o1_cwf_i0": [0.4, "none"],
            "cmp_o1_cwf_i1": [0.4, "none"],
            "cmp_o1_cwf_i2": [0.4, "none"],
            "cmp_o1_cwf_i3": [0, "none"],
            "cmp_o1_cwf_i4": [0, "none"],
            "cmp_o1_cwf_i5": [0, "none"],
            "cmp_o1_cwf_i6": [0, "none"],
            "cmp_o1_cwf_i7": [0, "none"],
            "cmp_o1_cwf_i8": [0, "none"],
            "cmp_o1_cwf_i9": [0, "none"],
            "cmp_o1_dt": [-12, "none"],
            "cmp_o1_ea": [0.003, "none"],
            "cmp_o1_ed": [1.024, "none"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.05, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.6, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [0.02, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [0.6, "none"],
            "cmp_o1_elht": [0.3, "none"],
            "cmp_o1_elif": [22050, "none"],
            "cmp_o1_elo": ["off", "none"],
            "cmp_o1_elpf": [22050, "none"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [22050, "none"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [22050, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.273, "none"],
            "cmp_o1_es": [0.3, "none"],
            "cmp_o1_fd": [0, "vrt2"],
            "cmp_o1_fl": [0, "none"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["sine", "none"],
            "cmp_o2_cwf": [0, "none"],
            "cmp_o2_cwf_i0": [0.4, "none"],
            "cmp_o2_cwf_i1": [0.4, "none"],
            "cmp_o2_cwf_i2": [0.4, "none"],
            "cmp_o2_cwf_i3": [0, "none"],
            "cmp_o2_cwf_i4": [0, "none"],
            "cmp_o2_cwf_i5": [0, "none"],
            "cmp_o2_cwf_i6": [0, "none"],
            "cmp_o2_cwf_i7": [0, "none"],
            "cmp_o2_cwf_i8": [0, "none"],
            "cmp_o2_cwf_i9": [0, "none"],
            "cmp_o2_dt": [0, "none"],
            "cmp_o2_ea": [0.001, "none"],
            "cmp_o2_ed": [1.024, "none"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.05, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.6, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.02, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [0.6, "none"],
            "cmp_o2_elht": [0.3, "none"],
            "cmp_o2_elif": [22050, "none"],
            "cmp_o2_elo": ["off", "none"],
            "cmp_o2_elpf": [22050, "none"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [22050, "none"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [22050, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.273, "none"],
            "cmp_o2_es": [0.3, "none"],
            "cmp_o2_fd": [0, "vrt2"],
            "cmp_o2_fl": [0, "none"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["on", "none"],
            "cmp_o2_lf": [2443.3, "mcs5"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [4, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["sawtooth", "none"],
            "cmp_od_gn": [0.3, "none"],
            "cmp_od_st": ["off", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.7, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.8, "none"],
            "cmp_rev_st": ["off", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.3, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.0775, "mcs3"],
            "lfo1_f": [4.2086, "mcs4"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.501, "mcs1"],
            "lfo1_rn": [0.02, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.0775, "mcs3"],
            "lfo2_f": [4.2086, "mcs4"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0.499, "mcs2"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [1, "none"],
            "lfo3_f": [2, "none"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0, "none"],
            "lfo3_rn": [0, "none"],
            "lfo3_wf": ["sine", "none"],
            "lfo4_am": [1, "none"],
            "lfo4_f": [2, "none"],
            "lfo4_ma": [1, "none"],
            "lfo4_mi": [0, "none"],
            "lfo4_rn": [0, "none"],
            "lfo4_wf": ["sine", "none"],
            "lfo5_am": [1, "none"],
            "lfo5_f": [2, "none"],
            "lfo5_ma": [1, "none"],
            "lfo5_mi": [0, "none"],
            "lfo5_rn": [0, "none"],
            "lfo5_wf": ["sine", "none"],
            "lfo6_am": [1, "none"],
            "lfo6_f": [2, "none"],
            "lfo6_ma": [1, "none"],
            "lfo6_mi": [0, "none"],
            "lfo6_rn": [0, "none"],
            "lfo6_wf": ["sine", "none"],
            "lfo7_am": [1, "none"],
            "lfo7_f": [2, "none"],
            "lfo7_ma": [1, "none"],
            "lfo7_mi": [0, "none"],
            "lfo7_rn": [0, "none"],
            "lfo7_wf": ["sine", "none"],
            "lfo8_am": [1, "none"],
            "lfo8_f": [2, "none"],
            "lfo8_ma": [1, "none"],
            "lfo8_mi": [0, "none"],
            "lfo8_rn": [0, "none"],
            "lfo8_wf": ["sine", "none"],
            "mcs10_am": [1, "none"],
            "mcs10_in": [0, "none"],
            "mcs10_in2": [0, "none"],
            "mcs10_in3": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_in2": [0, "none"],
            "mcs11_in3": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_in2": [0, "none"],
            "mcs12_in3": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_in2": [0, "none"],
            "mcs13_in3": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_in2": [0, "none"],
            "mcs14_in3": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_in2": [0, "none"],
            "mcs15_in3": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_in2": [0, "none"],
            "mcs16_in3": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs17_am": [1, "none"],
            "mcs17_in": [0, "none"],
            "mcs17_in2": [0, "none"],
            "mcs17_in3": [0, "none"],
            "mcs17_ma": [1, "none"],
            "mcs17_mi": [0, "none"],
            "mcs17_rn": [0, "none"],
            "mcs18_am": [1, "none"],
            "mcs18_in": [0, "none"],
            "mcs18_in2": [0, "none"],
            "mcs18_in3": [0, "none"],
            "mcs18_ma": [1, "none"],
            "mcs18_mi": [0, "none"],
            "mcs18_rn": [0, "none"],
            "mcs19_am": [1, "none"],
            "mcs19_in": [0, "none"],
            "mcs19_in2": [0, "none"],
            "mcs19_in3": [0, "none"],
            "mcs19_ma": [1, "none"],
            "mcs19_mi": [0, "none"],
            "mcs19_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.5, "pitch"],
            "mcs1_in2": [0, "none"],
            "mcs1_in3": [0, "none"],
            "mcs1_ma": [1, "none"],
            "mcs1_mi": [0.002, "none"],
            "mcs1_rn": [0, "none"],
            "mcs20_am": [1, "none"],
            "mcs20_in": [0, "none"],
            "mcs20_in2": [0, "none"],
            "mcs20_in3": [0, "none"],
            "mcs20_ma": [1, "none"],
            "mcs20_mi": [0, "none"],
            "mcs20_rn": [0, "none"],
            "mcs21_am": [1, "none"],
            "mcs21_in": [0, "none"],
            "mcs21_in2": [0, "none"],
            "mcs21_in3": [0, "none"],
            "mcs21_ma": [1, "none"],
            "mcs21_mi": [0, "none"],
            "mcs21_rn": [0, "none"],
            "mcs22_am": [1, "none"],
            "mcs22_in": [0, "none"],
            "mcs22_in2": [0, "none"],
            "mcs22_in3": [0, "none"],
            "mcs22_ma": [1, "none"],
            "mcs22_mi": [0, "none"],
            "mcs22_rn": [0, "none"],
            "mcs23_am": [1, "none"],
            "mcs23_in": [0, "none"],
            "mcs23_in2": [0, "none"],
            "mcs23_in3": [0, "none"],
            "mcs23_ma": [1, "none"],
            "mcs23_mi": [0, "none"],
            "mcs23_rn": [0, "none"],
            "mcs24_am": [1, "none"],
            "mcs24_in": [0, "none"],
            "mcs24_in2": [0, "none"],
            "mcs24_in3": [0, "none"],
            "mcs24_ma": [1, "none"],
            "mcs24_mi": [0, "none"],
            "mcs24_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "pitch"],
            "mcs2_in2": [0, "none"],
            "mcs2_in3": [0, "none"],
            "mcs2_ma": [0.998, "none"],
            "mcs2_mi": [0, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.25, "mod"],
            "mcs3_in2": [0, "none"],
            "mcs3_in3": [0, "none"],
            "mcs3_ma": [0.28, "none"],
            "mcs3_mi": [0.01, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.5, "note"],
            "mcs4_in2": [0, "none"],
            "mcs4_in3": [0, "none"],
            "mcs4_ma": [0.2467, "none"],
            "mcs4_mi": [0.0333, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.5, "vrtnote"],
            "mcs5_in2": [0, "none"],
            "mcs5_in3": [0, "none"],
            "mcs5_ma": [0.16, "none"],
            "mcs5_mi": [0.06, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0, "none"],
            "mcs6_in2": [0, "none"],
            "mcs6_in3": [0, "none"],
            "mcs6_ma": [1, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_in2": [0, "none"],
            "mcs7_in3": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_in2": [0, "none"],
            "mcs8_in3": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_in2": [0, "none"],
            "mcs9_in3": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_dst_gn": [0.3, "none"],
            "midi_dst_st": ["off", "none"],
            "midi_ech_df": [6000, "none"],
            "midi_ech_dg": [-9, "none"],
            "midi_ech_dly": [0.6, "none"],
            "midi_ech_dry": [0.8, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.5, "none"],
            "midi_ech_st": ["off", "none"],
            "midi_ech_w": [0.5, "none"],
            "midi_ech_wet": [0.2, "none"],
            "midi_fvl": [5, "none"],
            "midi_hs_st": ["off", "none"],
            "midi_hsf": [5000, "none"],
            "midi_hsg": [0, "none"],
            "midi_ls_st": ["off", "none"],
            "midi_lsf": [250, "none"],
            "midi_lsg": [0, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_cwf": [0, "none"],
            "midi_o1_cwf_i0": [0.4, "none"],
            "midi_o1_cwf_i1": [0.4, "none"],
            "midi_o1_cwf_i2": [0.4, "none"],
            "midi_o1_cwf_i3": [0, "none"],
            "midi_o1_cwf_i4": [0, "none"],
            "midi_o1_cwf_i5": [0, "none"],
            "midi_o1_cwf_i6": [0, "none"],
            "midi_o1_cwf_i7": [0, "none"],
            "midi_o1_cwf_i8": [0, "none"],
            "midi_o1_cwf_i9": [0, "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.12, "none"],
            "midi_o1_ed": [0.6, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.3, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.6, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [1.5, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [2, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [1500, "none"],
            "midi_o1_elo": ["on", "none"],
            "midi_o1_elpf": [7030, "none"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [2023, "none"],
            "midi_o1_elrt": [0.205, "none"],
            "midi_o1_elsf": [3024, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.205, "none"],
            "midi_o1_es": [0.75, "none"],
            "midi_o1_fd": [0, "lfo1"],
            "midi_o1_fl": [0, "none"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0.6, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0.02, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["sawtooth", "none"],
            "midi_o2_cwf": [0, "none"],
            "midi_o2_cwf_i0": [0.4, "none"],
            "midi_o2_cwf_i1": [0.4, "none"],
            "midi_o2_cwf_i2": [0.4, "none"],
            "midi_o2_cwf_i3": [0, "none"],
            "midi_o2_cwf_i4": [0, "none"],
            "midi_o2_cwf_i5": [0, "none"],
            "midi_o2_cwf_i6": [0, "none"],
            "midi_o2_cwf_i7": [0, "none"],
            "midi_o2_cwf_i8": [0, "none"],
            "midi_o2_cwf_i9": [0, "none"],
            "midi_o2_dt": [0, "none"],
            "midi_o2_ea": [0.12, "none"],
            "midi_o2_ed": [0.6, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.3, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.6, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [1.5, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [2, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [1500, "none"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [7030, "none"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [2023, "none"],
            "midi_o2_elrt": [0.205, "none"],
            "midi_o2_elsf": [3024, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.205, "none"],
            "midi_o2_es": [0.75, "none"],
            "midi_o2_fd": [0, "lfo2"],
            "midi_o2_fl": [0, "none"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [22050, "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [-0.6, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0.02, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [4, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["sawtooth", "none"],
            "midi_od_gn": [0.3, "none"],
            "midi_od_st": ["off", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-9, "none"],
            "midi_rev_dry": [0.84, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.93, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.16, "none"],
            "midi_vl": [0.5, "volume"],
            "sq_ab": ["b0", "none"],
            "sq_b0_arp": [0, "none"],
            "sq_b0_b0_0": ["sx", "none"],
            "sq_b0_b0_1": ["sx", "none"],
            "sq_b0_b0_2": ["sx", "none"],
            "sq_b0_b0_3": ["sx", "none"],
            "sq_b0_b10_0": ["sx", "none"],
            "sq_b0_b10_1": ["sx", "none"],
            "sq_b0_b10_2": ["sx", "none"],
            "sq_b0_b10_3": ["sx", "none"],
            "sq_b0_b11_0": ["sx", "none"],
            "sq_b0_b11_1": ["sx", "none"],
            "sq_b0_b11_2": ["sx", "none"],
            "sq_b0_b11_3": ["sx", "none"],
            "sq_b0_b1_0": ["sx", "none"],
            "sq_b0_b1_1": ["sx", "none"],
            "sq_b0_b1_2": ["sx", "none"],
            "sq_b0_b1_3": ["sx", "none"],
            "sq_b0_b2_0": ["sx", "none"],
            "sq_b0_b2_1": ["sx", "none"],
            "sq_b0_b2_2": ["sx", "none"],
            "sq_b0_b2_3": ["sx", "none"],
            "sq_b0_b3_0": ["sx", "none"],
            "sq_b0_b3_1": ["sx", "none"],
            "sq_b0_b3_2": ["sx", "none"],
            "sq_b0_b3_3": ["sx", "none"],
            "sq_b0_b4_0": ["sx", "none"],
            "sq_b0_b4_1": ["sx", "none"],
            "sq_b0_b4_2": ["sx", "none"],
            "sq_b0_b4_3": ["sx", "none"],
            "sq_b0_b5_0": ["sx", "none"],
            "sq_b0_b5_1": ["sx", "none"],
            "sq_b0_b5_2": ["sx", "none"],
            "sq_b0_b5_3": ["sx", "none"],
            "sq_b0_b6_0": ["sx", "none"],
            "sq_b0_b6_1": ["sx", "none"],
            "sq_b0_b6_2": ["sx", "none"],
            "sq_b0_b6_3": ["sx", "none"],
            "sq_b0_b7_0": ["sx", "none"],
            "sq_b0_b7_1": ["sx", "none"],
            "sq_b0_b7_2": ["sx", "none"],
            "sq_b0_b7_3": ["sx", "none"],
            "sq_b0_b8_0": ["sx", "none"],
            "sq_b0_b8_1": ["sx", "none"],
            "sq_b0_b8_2": ["sx", "none"],
            "sq_b0_b8_3": ["sx", "none"],
            "sq_b0_b9_0": ["sx", "none"],
            "sq_b0_b9_1": ["sx", "none"],
            "sq_b0_b9_2": ["sx", "none"],
            "sq_b0_b9_3": ["sx", "none"],
            "sq_b0_bpm": [144, "none"],
            "sq_b0_dt": [0, "none"],
            "sq_b0_gap": [8, "none"],
            "sq_b0_r0": ["rx", "none"],
            "sq_b0_r1": ["rx", "none"],
            "sq_b0_r10": ["rx", "none"],
            "sq_b0_r11": ["rx", "none"],
            "sq_b0_r2": ["rx", "none"],
            "sq_b0_r3": ["rx", "none"],
            "sq_b0_r4": ["rx", "none"],
            "sq_b0_r5": ["rx", "none"],
            "sq_b0_r6": ["rx", "none"],
            "sq_b0_r7": ["rx", "none"],
            "sq_b0_r8": ["rx", "none"],
            "sq_b0_r9": ["rx", "none"],
            "sq_b0_scl0": ["n0", "none"],
            "sq_b0_scl1": ["s1", "none"],
            "sq_b0_scl10": ["s10", "none"],
            "sq_b0_scl11": ["n11", "none"],
            "sq_b0_scl2": ["n2", "none"],
            "sq_b0_scl3": ["s3", "none"],
            "sq_b0_scl4": ["n4", "none"],
            "sq_b0_scl5": ["n5", "none"],
            "sq_b0_scl6": ["s6", "none"],
            "sq_b0_scl7": ["n7", "none"],
            "sq_b0_scl8": ["s8", "none"],
            "sq_b0_scl9": ["n9", "none"],
            "sq_b0_v0": ["v12", "none"],
            "sq_b0_v1": ["v12", "none"],
            "sq_b0_v10": ["v12", "none"],
            "sq_b0_v11": ["v12", "none"],
            "sq_b0_v2": ["v12", "none"],
            "sq_b0_v3": ["v12", "none"],
            "sq_b0_v4": ["v12", "none"],
            "sq_b0_v5": ["v12", "none"],
            "sq_b0_v6": ["v12", "none"],
            "sq_b0_v7": ["v12", "none"],
            "sq_b0_v8": ["v12", "none"],
            "sq_b0_v9": ["v12", "none"],
            "sq_b1_arp": [0, "none"],
            "sq_b1_b0_0": ["sx", "none"],
            "sq_b1_b0_1": ["sx", "none"],
            "sq_b1_b0_2": ["sx", "none"],
            "sq_b1_b0_3": ["sx", "none"],
            "sq_b1_b10_0": ["sx", "none"],
            "sq_b1_b10_1": ["sx", "none"],
            "sq_b1_b10_2": ["sx", "none"],
            "sq_b1_b10_3": ["sx", "none"],
            "sq_b1_b11_0": ["sx", "none"],
            "sq_b1_b11_1": ["sx", "none"],
            "sq_b1_b11_2": ["sx", "none"],
            "sq_b1_b11_3": ["sx", "none"],
            "sq_b1_b1_0": ["sx", "none"],
            "sq_b1_b1_1": ["sx", "none"],
            "sq_b1_b1_2": ["sx", "none"],
            "sq_b1_b1_3": ["sx", "none"],
            "sq_b1_b2_0": ["sx", "none"],
            "sq_b1_b2_1": ["sx", "none"],
            "sq_b1_b2_2": ["sx", "none"],
            "sq_b1_b2_3": ["sx", "none"],
            "sq_b1_b3_0": ["sx", "none"],
            "sq_b1_b3_1": ["sx", "none"],
            "sq_b1_b3_2": ["sx", "none"],
            "sq_b1_b3_3": ["sx", "none"],
            "sq_b1_b4_0": ["sx", "none"],
            "sq_b1_b4_1": ["sx", "none"],
            "sq_b1_b4_2": ["sx", "none"],
            "sq_b1_b4_3": ["sx", "none"],
            "sq_b1_b5_0": ["sx", "none"],
            "sq_b1_b5_1": ["sx", "none"],
            "sq_b1_b5_2": ["sx", "none"],
            "sq_b1_b5_3": ["sx", "none"],
            "sq_b1_b6_0": ["sx", "none"],
            "sq_b1_b6_1": ["sx", "none"],
            "sq_b1_b6_2": ["sx", "none"],
            "sq_b1_b6_3": ["sx", "none"],
            "sq_b1_b7_0": ["sx", "none"],
            "sq_b1_b7_1": ["sx", "none"],
            "sq_b1_b7_2": ["sx", "none"],
            "sq_b1_b7_3": ["sx", "none"],
            "sq_b1_b8_0": ["sx", "none"],
            "sq_b1_b8_1": ["sx", "none"],
            "sq_b1_b8_2": ["sx", "none"],
            "sq_b1_b8_3": ["sx", "none"],
            "sq_b1_b9_0": ["sx", "none"],
            "sq_b1_b9_1": ["sx", "none"],
            "sq_b1_b9_2": ["sx", "none"],
            "sq_b1_b9_3": ["sx", "none"],
            "sq_b1_bpm": [144, "none"],
            "sq_b1_dt": [0, "none"],
            "sq_b1_gap": [8, "none"],
            "sq_b1_r0": ["rx", "none"],
            "sq_b1_r1": ["rx", "none"],
            "sq_b1_r10": ["rx", "none"],
            "sq_b1_r11": ["rx", "none"],
            "sq_b1_r2": ["rx", "none"],
            "sq_b1_r3": ["rx", "none"],
            "sq_b1_r4": ["rx", "none"],
            "sq_b1_r5": ["rx", "none"],
            "sq_b1_r6": ["rx", "none"],
            "sq_b1_r7": ["rx", "none"],
            "sq_b1_r8": ["rx", "none"],
            "sq_b1_r9": ["rx", "none"],
            "sq_b1_scl0": ["n0", "none"],
            "sq_b1_scl1": ["s1", "none"],
            "sq_b1_scl10": ["s10", "none"],
            "sq_b1_scl11": ["n11", "none"],
            "sq_b1_scl2": ["n2", "none"],
            "sq_b1_scl3": ["s3", "none"],
            "sq_b1_scl4": ["n4", "none"],
            "sq_b1_scl5": ["n5", "none"],
            "sq_b1_scl6": ["s6", "none"],
            "sq_b1_scl7": ["n7", "none"],
            "sq_b1_scl8": ["s8", "none"],
            "sq_b1_scl9": ["n9", "none"],
            "sq_b1_v0": ["v12", "none"],
            "sq_b1_v1": ["v12", "none"],
            "sq_b1_v10": ["v12", "none"],
            "sq_b1_v11": ["v12", "none"],
            "sq_b1_v2": ["v12", "none"],
            "sq_b1_v3": ["v12", "none"],
            "sq_b1_v4": ["v12", "none"],
            "sq_b1_v5": ["v12", "none"],
            "sq_b1_v6": ["v12", "none"],
            "sq_b1_v7": ["v12", "none"],
            "sq_b1_v8": ["v12", "none"],
            "sq_b1_v9": ["v12", "none"],
            "sq_b2_arp": [0, "none"],
            "sq_b2_b0_0": ["sx", "none"],
            "sq_b2_b0_1": ["sx", "none"],
            "sq_b2_b0_2": ["sx", "none"],
            "sq_b2_b0_3": ["sx", "none"],
            "sq_b2_b10_0": ["sx", "none"],
            "sq_b2_b10_1": ["sx", "none"],
            "sq_b2_b10_2": ["sx", "none"],
            "sq_b2_b10_3": ["sx", "none"],
            "sq_b2_b11_0": ["sx", "none"],
            "sq_b2_b11_1": ["sx", "none"],
            "sq_b2_b11_2": ["sx", "none"],
            "sq_b2_b11_3": ["sx", "none"],
            "sq_b2_b1_0": ["sx", "none"],
            "sq_b2_b1_1": ["sx", "none"],
            "sq_b2_b1_2": ["sx", "none"],
            "sq_b2_b1_3": ["sx", "none"],
            "sq_b2_b2_0": ["sx", "none"],
            "sq_b2_b2_1": ["sx", "none"],
            "sq_b2_b2_2": ["sx", "none"],
            "sq_b2_b2_3": ["sx", "none"],
            "sq_b2_b3_0": ["sx", "none"],
            "sq_b2_b3_1": ["sx", "none"],
            "sq_b2_b3_2": ["sx", "none"],
            "sq_b2_b3_3": ["sx", "none"],
            "sq_b2_b4_0": ["sx", "none"],
            "sq_b2_b4_1": ["sx", "none"],
            "sq_b2_b4_2": ["sx", "none"],
            "sq_b2_b4_3": ["sx", "none"],
            "sq_b2_b5_0": ["sx", "none"],
            "sq_b2_b5_1": ["sx", "none"],
            "sq_b2_b5_2": ["sx", "none"],
            "sq_b2_b5_3": ["sx", "none"],
            "sq_b2_b6_0": ["sx", "none"],
            "sq_b2_b6_1": ["sx", "none"],
            "sq_b2_b6_2": ["sx", "none"],
            "sq_b2_b6_3": ["sx", "none"],
            "sq_b2_b7_0": ["sx", "none"],
            "sq_b2_b7_1": ["sx", "none"],
            "sq_b2_b7_2": ["sx", "none"],
            "sq_b2_b7_3": ["sx", "none"],
            "sq_b2_b8_0": ["sx", "none"],
            "sq_b2_b8_1": ["sx", "none"],
            "sq_b2_b8_2": ["sx", "none"],
            "sq_b2_b8_3": ["sx", "none"],
            "sq_b2_b9_0": ["sx", "none"],
            "sq_b2_b9_1": ["sx", "none"],
            "sq_b2_b9_2": ["sx", "none"],
            "sq_b2_b9_3": ["sx", "none"],
            "sq_b2_bpm": [144, "none"],
            "sq_b2_dt": [0, "none"],
            "sq_b2_gap": [8, "none"],
            "sq_b2_r0": ["rx", "none"],
            "sq_b2_r1": ["rx", "none"],
            "sq_b2_r10": ["rx", "none"],
            "sq_b2_r11": ["rx", "none"],
            "sq_b2_r2": ["rx", "none"],
            "sq_b2_r3": ["rx", "none"],
            "sq_b2_r4": ["rx", "none"],
            "sq_b2_r5": ["rx", "none"],
            "sq_b2_r6": ["rx", "none"],
            "sq_b2_r7": ["rx", "none"],
            "sq_b2_r8": ["rx", "none"],
            "sq_b2_r9": ["rx", "none"],
            "sq_b2_scl0": ["n0", "none"],
            "sq_b2_scl1": ["s1", "none"],
            "sq_b2_scl10": ["s10", "none"],
            "sq_b2_scl11": ["n11", "none"],
            "sq_b2_scl2": ["n2", "none"],
            "sq_b2_scl3": ["s3", "none"],
            "sq_b2_scl4": ["n4", "none"],
            "sq_b2_scl5": ["n5", "none"],
            "sq_b2_scl6": ["s6", "none"],
            "sq_b2_scl7": ["n7", "none"],
            "sq_b2_scl8": ["s8", "none"],
            "sq_b2_scl9": ["n9", "none"],
            "sq_b2_v0": ["v12", "none"],
            "sq_b2_v1": ["v12", "none"],
            "sq_b2_v10": ["v12", "none"],
            "sq_b2_v11": ["v12", "none"],
            "sq_b2_v2": ["v12", "none"],
            "sq_b2_v3": ["v12", "none"],
            "sq_b2_v4": ["v12", "none"],
            "sq_b2_v5": ["v12", "none"],
            "sq_b2_v6": ["v12", "none"],
            "sq_b2_v7": ["v12", "none"],
            "sq_b2_v8": ["v12", "none"],
            "sq_b2_v9": ["v12", "none"],
            "sq_b3_arp": [0, "none"],
            "sq_b3_b0_0": ["sx", "none"],
            "sq_b3_b0_1": ["sx", "none"],
            "sq_b3_b0_2": ["sx", "none"],
            "sq_b3_b0_3": ["sx", "none"],
            "sq_b3_b10_0": ["sx", "none"],
            "sq_b3_b10_1": ["sx", "none"],
            "sq_b3_b10_2": ["sx", "none"],
            "sq_b3_b10_3": ["sx", "none"],
            "sq_b3_b11_0": ["sx", "none"],
            "sq_b3_b11_1": ["sx", "none"],
            "sq_b3_b11_2": ["sx", "none"],
            "sq_b3_b11_3": ["sx", "none"],
            "sq_b3_b1_0": ["sx", "none"],
            "sq_b3_b1_1": ["sx", "none"],
            "sq_b3_b1_2": ["sx", "none"],
            "sq_b3_b1_3": ["sx", "none"],
            "sq_b3_b2_0": ["sx", "none"],
            "sq_b3_b2_1": ["sx", "none"],
            "sq_b3_b2_2": ["sx", "none"],
            "sq_b3_b2_3": ["sx", "none"],
            "sq_b3_b3_0": ["sx", "none"],
            "sq_b3_b3_1": ["sx", "none"],
            "sq_b3_b3_2": ["sx", "none"],
            "sq_b3_b3_3": ["sx", "none"],
            "sq_b3_b4_0": ["sx", "none"],
            "sq_b3_b4_1": ["sx", "none"],
            "sq_b3_b4_2": ["sx", "none"],
            "sq_b3_b4_3": ["sx", "none"],
            "sq_b3_b5_0": ["sx", "none"],
            "sq_b3_b5_1": ["sx", "none"],
            "sq_b3_b5_2": ["sx", "none"],
            "sq_b3_b5_3": ["sx", "none"],
            "sq_b3_b6_0": ["sx", "none"],
            "sq_b3_b6_1": ["sx", "none"],
            "sq_b3_b6_2": ["sx", "none"],
            "sq_b3_b6_3": ["sx", "none"],
            "sq_b3_b7_0": ["sx", "none"],
            "sq_b3_b7_1": ["sx", "none"],
            "sq_b3_b7_2": ["sx", "none"],
            "sq_b3_b7_3": ["sx", "none"],
            "sq_b3_b8_0": ["sx", "none"],
            "sq_b3_b8_1": ["sx", "none"],
            "sq_b3_b8_2": ["sx", "none"],
            "sq_b3_b8_3": ["sx", "none"],
            "sq_b3_b9_0": ["sx", "none"],
            "sq_b3_b9_1": ["sx", "none"],
            "sq_b3_b9_2": ["sx", "none"],
            "sq_b3_b9_3": ["sx", "none"],
            "sq_b3_bpm": [144, "none"],
            "sq_b3_dt": [0, "none"],
            "sq_b3_gap": [8, "none"],
            "sq_b3_r0": ["rx", "none"],
            "sq_b3_r1": ["rx", "none"],
            "sq_b3_r10": ["rx", "none"],
            "sq_b3_r11": ["rx", "none"],
            "sq_b3_r2": ["rx", "none"],
            "sq_b3_r3": ["rx", "none"],
            "sq_b3_r4": ["rx", "none"],
            "sq_b3_r5": ["rx", "none"],
            "sq_b3_r6": ["rx", "none"],
            "sq_b3_r7": ["rx", "none"],
            "sq_b3_r8": ["rx", "none"],
            "sq_b3_r9": ["rx", "none"],
            "sq_b3_scl0": ["n0", "none"],
            "sq_b3_scl1": ["s1", "none"],
            "sq_b3_scl10": ["s10", "none"],
            "sq_b3_scl11": ["n11", "none"],
            "sq_b3_scl2": ["n2", "none"],
            "sq_b3_scl3": ["s3", "none"],
            "sq_b3_scl4": ["n4", "none"],
            "sq_b3_scl5": ["n5", "none"],
            "sq_b3_scl6": ["s6", "none"],
            "sq_b3_scl7": ["n7", "none"],
            "sq_b3_scl8": ["s8", "none"],
            "sq_b3_scl9": ["n9", "none"],
            "sq_b3_v0": ["v12", "none"],
            "sq_b3_v1": ["v12", "none"],
            "sq_b3_v10": ["v12", "none"],
            "sq_b3_v11": ["v12", "none"],
            "sq_b3_v2": ["v12", "none"],
            "sq_b3_v3": ["v12", "none"],
            "sq_b3_v4": ["v12", "none"],
            "sq_b3_v5": ["v12", "none"],
            "sq_b3_v6": ["v12", "none"],
            "sq_b3_v7": ["v12", "none"],
            "sq_b3_v8": ["v12", "none"],
            "sq_b3_v9": ["v12", "none"],
            "sq_b4_arp": [0, "none"],
            "sq_b4_b0_0": ["sx", "none"],
            "sq_b4_b0_1": ["sx", "none"],
            "sq_b4_b0_2": ["sx", "none"],
            "sq_b4_b0_3": ["sx", "none"],
            "sq_b4_b10_0": ["sx", "none"],
            "sq_b4_b10_1": ["sx", "none"],
            "sq_b4_b10_2": ["sx", "none"],
            "sq_b4_b10_3": ["sx", "none"],
            "sq_b4_b11_0": ["sx", "none"],
            "sq_b4_b11_1": ["sx", "none"],
            "sq_b4_b11_2": ["sx", "none"],
            "sq_b4_b11_3": ["sx", "none"],
            "sq_b4_b1_0": ["sx", "none"],
            "sq_b4_b1_1": ["sx", "none"],
            "sq_b4_b1_2": ["sx", "none"],
            "sq_b4_b1_3": ["sx", "none"],
            "sq_b4_b2_0": ["sx", "none"],
            "sq_b4_b2_1": ["sx", "none"],
            "sq_b4_b2_2": ["sx", "none"],
            "sq_b4_b2_3": ["sx", "none"],
            "sq_b4_b3_0": ["sx", "none"],
            "sq_b4_b3_1": ["sx", "none"],
            "sq_b4_b3_2": ["sx", "none"],
            "sq_b4_b3_3": ["sx", "none"],
            "sq_b4_b4_0": ["sx", "none"],
            "sq_b4_b4_1": ["sx", "none"],
            "sq_b4_b4_2": ["sx", "none"],
            "sq_b4_b4_3": ["sx", "none"],
            "sq_b4_b5_0": ["sx", "none"],
            "sq_b4_b5_1": ["sx", "none"],
            "sq_b4_b5_2": ["sx", "none"],
            "sq_b4_b5_3": ["sx", "none"],
            "sq_b4_b6_0": ["sx", "none"],
            "sq_b4_b6_1": ["sx", "none"],
            "sq_b4_b6_2": ["sx", "none"],
            "sq_b4_b6_3": ["sx", "none"],
            "sq_b4_b7_0": ["sx", "none"],
            "sq_b4_b7_1": ["sx", "none"],
            "sq_b4_b7_2": ["sx", "none"],
            "sq_b4_b7_3": ["sx", "none"],
            "sq_b4_b8_0": ["sx", "none"],
            "sq_b4_b8_1": ["sx", "none"],
            "sq_b4_b8_2": ["sx", "none"],
            "sq_b4_b8_3": ["sx", "none"],
            "sq_b4_b9_0": ["sx", "none"],
            "sq_b4_b9_1": ["sx", "none"],
            "sq_b4_b9_2": ["sx", "none"],
            "sq_b4_b9_3": ["sx", "none"],
            "sq_b4_bpm": [144, "none"],
            "sq_b4_dt": [0, "none"],
            "sq_b4_gap": [8, "none"],
            "sq_b4_r0": ["rx", "none"],
            "sq_b4_r1": ["rx", "none"],
            "sq_b4_r10": ["rx", "none"],
            "sq_b4_r11": ["rx", "none"],
            "sq_b4_r2": ["rx", "none"],
            "sq_b4_r3": ["rx", "none"],
            "sq_b4_r4": ["rx", "none"],
            "sq_b4_r5": ["rx", "none"],
            "sq_b4_r6": ["rx", "none"],
            "sq_b4_r7": ["rx", "none"],
            "sq_b4_r8": ["rx", "none"],
            "sq_b4_r9": ["rx", "none"],
            "sq_b4_scl0": ["n0", "none"],
            "sq_b4_scl1": ["s1", "none"],
            "sq_b4_scl10": ["s10", "none"],
            "sq_b4_scl11": ["n11", "none"],
            "sq_b4_scl2": ["n2", "none"],
            "sq_b4_scl3": ["s3", "none"],
            "sq_b4_scl4": ["n4", "none"],
            "sq_b4_scl5": ["n5", "none"],
            "sq_b4_scl6": ["s6", "none"],
            "sq_b4_scl7": ["n7", "none"],
            "sq_b4_scl8": ["s8", "none"],
            "sq_b4_scl9": ["n9", "none"],
            "sq_b4_v0": ["v12", "none"],
            "sq_b4_v1": ["v12", "none"],
            "sq_b4_v10": ["v12", "none"],
            "sq_b4_v11": ["v12", "none"],
            "sq_b4_v2": ["v12", "none"],
            "sq_b4_v3": ["v12", "none"],
            "sq_b4_v4": ["v12", "none"],
            "sq_b4_v5": ["v12", "none"],
            "sq_b4_v6": ["v12", "none"],
            "sq_b4_v7": ["v12", "none"],
            "sq_b4_v8": ["v12", "none"],
            "sq_b4_v9": ["v12", "none"],
            "sq_st": ["off", "none"],
            "sq_trg": ["comp", "none"],
            "th_cwf": [0, "none"],
            "th_cwf_i0": [0.4, "none"],
            "th_cwf_i1": [0.4, "none"],
            "th_cwf_i2": [0.4, "none"],
            "th_cwf_i3": [0, "none"],
            "th_cwf_i4": [0, "none"],
            "th_cwf_i5": [0, "none"],
            "th_cwf_i6": [0, "none"],
            "th_cwf_i7": [0, "none"],
            "th_cwf_i8": [0, "none"],
            "th_cwf_i9": [0, "none"],
            "th_dst_gn": [0.3, "none"],
            "th_dst_st": ["off", "none"],
            "th_ea": [0.02, "none"],
            "th_ech_df": [6000, "none"],
            "th_ech_dg": [-6, "none"],
            "th_ech_dly": [0.417, "none"],
            "th_ech_dry": [0.6, "none"],
            "th_ech_hpf": [100, "none"],
            "th_ech_rsz": [0.72, "none"],
            "th_ech_st": ["on", "none"],
            "th_ech_w": [0.7, "none"],
            "th_ech_wet": [0.5, "none"],
            "th_ed": [0.6, "none"],
            "th_edl": [0, "none"],
            "th_eh": [0.3, "none"],
            "th_ehat": [0.02, "none"],
            "th_ehdlt": [0, "none"],
            "th_ehdt": [0.6, "none"],
            "th_ehht": [0.3, "none"],
            "th_ehif": [20, "none"],
            "th_eho": ["off", "none"],
            "th_ehpf": [20, "none"],
            "th_ehq": [1, "none"],
            "th_ehrf": [20, "none"],
            "th_ehrt": [0.1, "none"],
            "th_ehsf": [20, "none"],
            "th_elat": [0.02, "none"],
            "th_eldlt": [0, "none"],
            "th_eldt": [0.6, "none"],
            "th_elht": [0.3, "none"],
            "th_elif": [22050, "none"],
            "th_elo": ["off", "none"],
            "th_elpf": [22050, "none"],
            "th_elq": [1, "none"],
            "th_elrf": [22050, "none"],
            "th_elrt": [0.1, "none"],
            "th_elsf": [22050, "none"],
            "th_ep": [1, "none"],
            "th_er": [0.307, "none"],
            "th_es": [0.7, "none"],
            "th_fl": [0, "none"],
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_hs_st": ["off", "none"],
            "th_hsf": [5000, "none"],
            "th_hsg": [0, "none"],
            "th_l_st": ["on", "none"],
            "th_lf": [4401, "none"],
            "th_lq": [1, "none"],
            "th_ls_st": ["off", "none"],
            "th_lsf": [250, "none"],
            "th_lsg": [0, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
            "th_od_gn": [0.3, "none"],
            "th_od_st": ["off", "none"],
            "th_pn": [0, "none"],
            "th_res": [1, "none"],
            "th_rev_df": [6000, "none"],
            "th_rev_dg": [-6, "none"],
            "th_rev_dry": [0.7, "none"],
            "th_rev_hpf": [100, "none"],
            "th_rev_rsz": [0.9, "none"],
            "th_rev_st": ["off", "none"],
            "th_rev_w": [-0.25, "none"],
            "th_rev_wet": [0.3, "none"],
            "th_vl": [4, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sawtooth", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        }
    };

}())
