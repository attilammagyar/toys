(function () {

    "use strict";

    var WAVEFORMS = {
            "sawtooth": "sawtooth",
            "sine": "sine",
            "square": "square",
            "triangle": "triangle"
        },
        MIDI_CONTROLS = {
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
            "vrtnote": "virtual note",
            "vrtvel": "virtual velocity",
            "seqnote": "seq. note (imprecise)",
            "seqprog": "seq. progress (imprecise)",
            "seqvel": "seq. velocity (imprecise)",
            "mcs1": "MCS 1",
            "mcs2": "MCS 2",
            "mcs3": "MCS 3",
            "mcs4": "MCS 4",
            "mcs5": "MCS 5",
            "mcs6": "MCS 6",
            "mcs7": "MCS 7",
            "mcs8": "MCS 8",
            "mcs9": "MCS 9",
            "mcs10": "MCS 10",
            "mcs11": "MCS 11",
            "mcs12": "MCS 12",
            "mcs13": "MCS 13",
            "mcs14": "MCS 14",
            "mcs15": "MCS 15",
            "mcs16": "MCS 16"
        },
        ALL_CONTROLS = {
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
            "vrtnote": "virtual note",
            "vrtvel": "virtual velocity",
            "seqnote": "seq. note (imprecise!)",
            "seqprog": "seq. progress (imprecise!)",
            "seqvel": "seq. velocity (imprecise!)",
            "mcs1": "MCS 1",
            "mcs2": "MCS 2",
            "mcs3": "MCS 3",
            "mcs4": "MCS 4",
            "mcs5": "MCS 5",
            "mcs6": "MCS 6",
            "mcs7": "MCS 7",
            "mcs8": "MCS 8",
            "mcs9": "MCS 9",
            "mcs10": "MCS 10",
            "mcs11": "MCS 11",
            "mcs12": "MCS 12",
            "mcs13": "MCS 13",
            "mcs14": "MCS 14",
            "mcs15": "MCS 15",
            "mcs16": "MCS 16",
            "lfo1": "LFO 1",
            "lfo2": "LFO 2",
            "lfo3": "LFO 3",
            "lfo4": "LFO 4",
            "lfo5": "LFO 5",
            "lfo6": "LFO 6",
            "lfo7": "LFO 7",
            "lfo8": "LFO 8"
        },
        SEQ_ON_OFF_KEY = "sq_st",
        SEQ_BEATS = 12,
        SEQ_VOICES = 4,
        SEQ_INTERVAL = 250,
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
        MOD_NAMES = {
            "m1": "add",
            "m2": "AM",
            "m3": "FM",
            "m4": "add + AM",
            "m5": "add + FM",
            "m6": "AM + FM",
            "m7": "add + AM + FM",
        },
        MOD_MASKS = {
            "m1": 1,
            "m2": 2,
            "m3": 4,
            "m4": 3,
            "m5": 5,
            "m6": 6,
            "m7": 7,
        },
        ENV_HP_FLAG = 1,
        ENV_LP_FLAG = 2,
        LFO_HP_FLAG = 4,
        LFO_LP_FLAG = 8,
        LFOS = 8,
        MIDI_SHAPERS = 16,
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
        LFO_FREQ_MAX = 20.0,
        LFO_FREQ_MIN = 0.01,
        LFO_FREQ_DEF = 2.0,
        FILTER_Q_MIN = 0.0,
        FILTER_Q_MAX = 10.0,
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
        RANDOMS = 300,
        random_numbers = [],
        synth_ui = null,
        synth_obj = null,
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
        preset_selector.value = "p2";

        start_button = $("start");
        start_button.onclick = handle_start_click;

        return true;
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

            synth_obj = new Synth(audio_ctx);
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
        AudioParam.prototype._linearRampToValueAtTime = AudioParam.prototype.linearRampToValueAtTime;
        AudioParam.prototype._setValueAtTime = AudioParam.prototype.setValueAtTime;

        AudioParam.prototype._save_evt = function (evt_type, value, end)
        {
            var new_evts = [],
                ct = audio_ctx.currentTime,
                old_evts, i, l, e, l;

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

                if ((last_event === null) || (last_event[0] === "s") || (last_event[3] >= when)) {
                    this._linearRampToValueAtTime(v, when);

                    return;
                }

                s = Math.max(s, last_event[3]);

                if (0 < (d = (last_event[2] - s))) {
                    d = (when - s) / d
                    v = v + d * (last_event[1] - v);
                }

                this._linearRampToValueAtTime(v, when);
            }
        };
    }

    function restore_patch_from_local_storage()
    {
        var saved_patch = localStorage.getItem("js80"),
            error;

        if (!saved_patch) {
            synth_obj.import_patch(presets["p2"]);
            return false;
        }

        try {
            synth_obj.import_patch(JSON.parse(saved_patch));
        } catch (error) {
            localStorage.removeItem("js80");
            show_error("Invalid synth patch JSON: " + String(error));
            synth_obj.import_patch(presets["p2"]);

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

    function Synth(audio_ctx)
    {
        var freqs = [],
            output = new GainNode(audio_ctx, {"gain": 1.0}),
            i, l, ct, ctl;

        Observable.call(this);
        Observer.call(this);

        this.params = [];
        this.audio_ctx = audio_ctx;
        this.virt_detune = new NumParam(this, "vrt_dt", -48, 48, 0);
        this.virt_ctl_params = [
            new NumParam(this, "vcp1", 0.0, 1.0, 0.5),
            new NumParam(this, "vcp2", 0.0, 1.0, 0.5),
            new NumParam(this, "vcp3", 0.0, 1.0, 0.5),
            new NumParam(this, "vcp4", 0.0, 1.0, 0.5),
            new NumParam(this, "vcp5", 0.0, 1.0, 0.5)
        ];
        this.virt_ctls = [
            new VirtualMIDIController(this.virt_ctl_params[0]),
            new VirtualMIDIController(this.virt_ctl_params[1]),
            new VirtualMIDIController(this.virt_ctl_params[2]),
            new VirtualMIDIController(this.virt_ctl_params[3]),
            new VirtualMIDIController(this.virt_ctl_params[4])
        ];

        for (i = 0; i < 228; ++i) {
            freqs[i] = Math.pow(2.0, ((i - 117.0) / 12.0)) * 440.0;
        }

        this._pitch_ctl = new MIDIController(0.5);
        this._note_ctl = new MIDIController(0.5);
        this._velocity_ctl = new MIDIController(0.6);
        this._midi_ctls = [];

        this._virt_note_ctl = new MIDIController(0.5);
        this._virt_vel_ctl = new MIDIController(0.6);
        this._seq_note_ctl = new MIDIController(0.5);
        this._seq_prog_ctl = new MIDIController(0.5);
        this._seq_vel_ctl = new MIDIController(0.6);

        for (i = 0; i < 128; ++i) {
            this._midi_ctls[i] = null;
        }

        this.controllers = {
            "pitch": this._pitch_ctl,
            "mod": this._midi_ctls[1] = new MIDIController(0.25),
            "breath": this._midi_ctls[2] = new MIDIController(0.5),
            "volume": this._midi_ctls[7] = new MIDIController(0.5),
            "pan": this._midi_ctls[10] = new MIDIController(0.5),
            "expr": this._midi_ctls[11] = new MIDIController(0.5),
            "gp1": this._midi_ctls[16] = new MIDIController(0.5),
            "gp2": this._midi_ctls[17] = new MIDIController(0.5),
            "gp3": this._midi_ctls[18] = new MIDIController(0.5),
            "gp4": this._midi_ctls[19] = new MIDIController(0.5),
            "fx1": this._midi_ctls[91] = new MIDIController(0.5),
            "fx2": this._midi_ctls[92] = new MIDIController(0.5),
            "fx3": this._midi_ctls[93] = new MIDIController(0.5),
            "fx4": this._midi_ctls[94] = new MIDIController(0.5),
            "fx5": this._midi_ctls[95] = new MIDIController(0.5),
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
            "seqvel": this._seq_vel_ctl
        };

        ct = audio_ctx.currentTime;

        for (i = 0; i < MIDI_SHAPERS; ++i) {
            ctl = new MIDIControllerShaper(this, "mcs" + String(i + 1));
            this.controllers[ctl.key] = ctl;
        }

        for (i = 0; i < LFOS; ++i) {
            ctl = new LFOController(this, "lfo" + String(i + 1));
            this.controllers[ctl.key] = ctl;
            ctl.start(ct);
        }

        this.midi_voice = new MIDIVoice(this, freqs, output);
        this.midi_voice.start(ct);

        this.comp_voice = new ComputerVoice(this, freqs, output);
        this.comp_voice.start(ct);

        this.sequencer = new Sequencer(
            this,
            this.comp_voice,
            this.midi_voice,
            this._seq_note_ctl,
            this._seq_vel_ctl,
            this._seq_prog_ctl
        );

        this.theremin = new Theremin(this, output);
        this.theremin.start(ct);

        this._comp_keyboard_target = "comp";
        this.comp_keyboard_target = new EnumParam(
            this,
            "ckb_trg",
            {"comp": "Computer module", "seq": "Sequencer root note"},
            "comp"
        );
        this.comp_keyboard_target.observers.push(this);

        this.output = output;
        this.midi_inputs = [];
    }

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
        var result = {},
            params = this.params,
            i, l, param;

        for (i = 0, l = params.length; i < l; ++i) {
            param = params[i];
            result[param.key] = [param.value, param.controller];
        }

        return result;
    };

    Synth.prototype.import_patch = function (exported)
    {
        var params = this.params,
            i, l, param, key, t, v, c, m;

        for (i = 0, l = params.length; i < l; ++i) {
            param = params[i];
            key = param.key;

            if (!exported.hasOwnProperty(key)) {
                console.log("Value for param " + key + " not found");
                continue;
            }

            if (key === SEQ_ON_OFF_KEY) {
                // Sequencer should never start automatically, especially not
                // halfway through importing a patch.
                param.set_value("off");
                continue;
            }

            t = exported[key];

            if (!Array.isArray(t)) {
                console.log("Ignoring " + key + " because it is not an array of 2 elements");
                continue;
            }

            c = t[1];

            if (c !== "none" && (!this.controllers.hasOwnProperty(c))) {
                console.log("Ignoring " + key + " because it refers to an unknown controller");
                continue;
            }

            v = param.validate(t[0]);

            if (v === null) {
                console.log("Ignoring " + key + " because its value is invalid");
                continue;
            }

            param.set_value(v);

            if (c !== "none") {
                this.connect(param, c);
            } else {
                param.disconnect();
            }
        }

        for (i = 0; i < 128; ++i) {
            m = this._midi_ctls[i];

            if (m !== null) {
                m.control_params();
            }
        }

        this._pitch_ctl.control_params();
        this._note_ctl.control_params();
        this._velocity_ctl.control_params();
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
                    this.midi_voice.trigger_note(ct, ct + 0.02, d1, velocity);
                } else {
                    this.midi_voice.stop_note(ct + 0.02, d1);
                }

                break;

            case 128: // note off, d1 = note
                this.midi_voice.stop_note(this.audio_ctx.currentTime + 0.02, d1);
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
            ct = this.audio_ctx.currentTime + 0.02;

            this.comp_voice.trigger_note(
                ct, ct + 0.02, midi_note, velocity
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

        this.comp_voice.stop_note(this.audio_ctx.currentTime + 0.02, midi_note);

        this.on_virtual_key_up(key_code);
    };

    Synth.prototype.on_virtual_key_down = function (key_code)
    {
    };

    Synth.prototype.on_virtual_key_up = function (key_code)
    {
    };

    function Sequencer(synth, comp_voice, midi_voice, note_ctl, vel_ctl, prog_ctl)
    {
        var target = new EnumParam(synth, "sq_trg", {"comp": "Computer module", "midi": "MIDI module"}, "comp"),
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
        this._comp_voice = comp_voice;
        this._midi_voice = midi_voice;
        this._note_ctl = note_ctl;
        this._vel_ctl = vel_ctl;
        this._prog_ctl = prog_ctl;

        this._active_bank = banks["b0"];
        this._active_bank_key = "b0";
        this._next_bank_key = "b0";
        this._target_name = "comp";
        this._target_voice = null;
        this._stop = false;
        this._is_active = false;

        this.target = target;
        this.active_bank = active_bank;
        this.onoff = onoff;

        this.banks = banks;

        for (i = 0; i < SEQ_BEATS; ++i) {
            // steps 1-4, velocity, number of non-rest notes
            beats[i] = [-1, -1, -1, -1, 0.0, 0];
        }

        this._scale = [];
        this._base_note_idx_in_scale = 0;
        this._base_note_offset = 48;
        this._next_bank_notes = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        this._next_bank_scale = [];
        this._next_bank_base_note_idx_in_scale = 0;
        this._next_bank_base_note_offset = 48;
        this._non_empty_beats = 0;
        this._beats = beats;
        this._note_idx = 0;
        this._scheduled_until = 0.0;
        this._beat_idx = 0;

        this.update();
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
                this._target_voice = target_voice = (
                    (target_name === "comp") ? this._comp_voice : this._midi_voice
                );
                target_voice.start_scheduling();
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
                this._reload_next_bank_scale(
                    this._active_bank = this.banks[this._active_bank_key = this._next_bank_key]
                );
            } else {
                this._reload_next_bank_scale(this.banks[this._next_bank_key]);
            }
        }
    };

    Sequencer.prototype._reload_next_bank_scale = function (bank)
    {
        var next_bank_notes = this._next_bank_notes,
            scale = [],
            scale_idx = 0,
            scale_params = bank.scale,
            prev_v = -1,
            offset = 0,
            i, l, v;

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

        this._next_bank_scale = scale;
    };

    Sequencer.prototype.main_loop = function ()
    {
        var note_idx, active_bank, bpm, arpeggio, detune, scale, scale_len,
            beat_len, beat_len_with_gap, scheduled_until, schedule_until, ct,
            beats, beat, beat_idx, beat_idx_p1, next_beat_idx, next_beat,
            non_empty_beats, velocity, target_voice, next_beat_non_rests,
            midi_note, base_note_idx, base_note_offset, next_active_bank_key,
            steps, beat_end, gap_inv, offset, last_note, last_vel, i;

        if (!this._is_active) {
            return;
        }

        last_vel = null;
        last_note = null;
        active_bank = this._active_bank;
        beat_idx = this._beat_idx;
        non_empty_beats = this._non_empty_beats;
        target_voice = this._target_voice;

        if ((beat_idx < 1) || (non_empty_beats < 1)) {
            if (this._stop) {
                target_voice.stop_scheduling();
                this._target_voice = null;
                this._stop = false;
                this._is_active = false;
                this._next_bank_base_note_idx_in_scale = 0;
                this._next_bank_base_note_offset = 48;
                return;
            }

            if ((next_active_bank_key = this._next_bank_key) !== this._active_bank_key) {
                active_bank = this._active_bank = this.banks[
                    this._active_bank_key = next_active_bank_key
                ];
            }

            this._reload(active_bank);

            this._scale = this._next_bank_scale;
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

        scheduled_until = Math.max(
            ct = (this._audio_ctx.currentTime + 0.01),
            this._scheduled_until
        );
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

        gap_inv = 1.0 - Math.round(active_bank.gap.value) / 256.0;
        detune = Math.round(active_bank.detune.value);
        beat_len_with_gap = beat_len * gap_inv;
        arpeggio = beat_len * (Math.round(active_bank.arpeggio.value) / 256.0);

        note_idx = this._note_idx;
        base_note_idx = this._base_note_idx_in_scale;
        base_note_offset = this._base_note_offset;
        beats = this._beats;

        beat = beats[beat_idx];
        next_beat = beats[next_beat_idx = (beat_idx_p1 % non_empty_beats)];
        next_beat_non_rests = next_beat[5];

        while (scheduled_until < schedule_until) {
            velocity = beat[4];
            beat_end = scheduled_until + beat_len_with_gap;

            for (i = 3; i > -1; --i) {
                if ((steps = beat[i]) < 0) {
                    continue;
                }

                steps += base_note_idx;
                midi_note = scale[steps % scale_len] + 12 * (Math.floor(steps / scale_len)) + detune + base_note_offset;

                if ((0 > midi_note) || (127 < midi_note)) {
                    continue;
                }

                offset = (3 - i) * arpeggio;

                target_voice.schedule_note(scheduled_until + offset, note_idx, midi_note, velocity);
                target_voice.schedule_stop(beat_end + offset, note_idx);

                last_note = midi_note;
                last_vel = velocity;

                if (++note_idx > 4) {
                    note_idx = 0;
                }
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

        if (last_note !== null) {
            this._note_ctl.set_value(last_note / 127);
        }

        if (last_vel !== null) {
            this._vel_ctl.set_value(last_vel);
        }
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
        this.detune = new MIDIControllableParam(synth, key + "_dt", -48, 48, 0);
        this.scale = scale;
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
        this.effects = effects;

        this.volume = new LFOControllableParam(synth, key + "_vl", volume.gain, 0.0, 1.0, 0.5);
        this.modulation = new EnumParam(synth, key + "_md", MOD_NAMES, "m1");
        this.am_volume = new LFOControllableParam(synth, key + "_avl", am_vol.offset, 0.0, 1.0, 0.5);
        this.fm_volume = new LFOControllableParam(synth, key + "_fvl", fm_vol.offset, 0.0, 100.0, 5.0);

        this.osc_2 = new MIDINoteBasedOscillator(
            synth, key + "_o2", poliphony, frequencies, effects.input, null, null, null
        );
        this.osc_1 = new MIDINoteBasedOscillator(
            synth, key + "_o1", poliphony, frequencies, effects.input, this.osc_2, am_vol, fm_vol
        );

        this.modulation.observers.push(this);
    }

    Voice.prototype.update = function (modulation, arg)
    {
        this.osc_1.modulate(MOD_MASKS[arg]);
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
            note_pan, note_idx;

        if (active_notes[midi_note] !== null) {
            return;
        }

        if ((note_idx = this._available_notes.shift()) === undefined) {
            return;
        }

        active_notes[midi_note] = note_idx;

        // note_pan = 2.0 * (midi_note / 127.0) - 1.0;
        note_pan = midi_note / 63.5 - 1.0;

        this.osc_1.trigger_note(now, when, note_idx, midi_note, velocity, note_pan);
        this.osc_2.trigger_note(now, when, note_idx, midi_note, velocity, note_pan);
    };

    Voice.prototype.schedule_note = function (when, note_idx, midi_note, velocity)
    {
        var note_pan = midi_note / 63.5 - 1.0;

        this.osc_1.trigger_note(when, when, note_idx, midi_note, velocity, note_pan);
        this.osc_2.trigger_note(when, when, note_idx, midi_note, velocity, note_pan);
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
            i, l, n, ct;

        while ((0 < available_notes.length) && (sn < 5)) {
            scheduled_notes.push(available_notes.shift());
            ++sn;
        }

        ct = this._audio_ctx.currentTime;

        for (i = 0, l = active_notes.length; (i < l) && (sn < 5); ++i) {
            if (active_notes[i] !== null) {
                n = active_notes[i];
                osc_1.cancel_note(ct, n);
                osc_2.cancel_note(ct, n);
                scheduled_notes.push(n);
                active_notes[i] = null;
                ++sn;
            }
        }
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

    function MIDIVoice(synth, frequencies, output)
    {
        Voice.call(this, synth, "midi", 8, frequencies, output);
    }

    MIDIVoice.prototype.update = Voice.prototype.update;
    MIDIVoice.prototype.start = Voice.prototype.start;
    MIDIVoice.prototype.trigger_note = Voice.prototype.trigger_note;
    MIDIVoice.prototype.stop_note = Voice.prototype.stop_note;
    MIDIVoice.prototype.start_scheduling = Voice.prototype.start_scheduling;
    MIDIVoice.prototype.stop_scheduling = Voice.prototype.stop_scheduling;
    MIDIVoice.prototype.schedule_note = Voice.prototype.schedule_note;
    MIDIVoice.prototype.schedule_stop = Voice.prototype.schedule_stop;

    function ComputerVoice(synth, frequencies, output)
    {
        Voice.call(this, synth, "cmp", 6, frequencies, output);
    }

    ComputerVoice.prototype.update = Voice.prototype.update;
    ComputerVoice.prototype.start = Voice.prototype.start;
    ComputerVoice.prototype.trigger_note = Voice.prototype.trigger_note;
    ComputerVoice.prototype.stop_note = Voice.prototype.stop_note;
    ComputerVoice.prototype.start_scheduling = Voice.prototype.start_scheduling;
    ComputerVoice.prototype.stop_scheduling = Voice.prototype.stop_scheduling;
    ComputerVoice.prototype.schedule_note = Voice.prototype.schedule_note;
    ComputerVoice.prototype.schedule_stop = Voice.prototype.schedule_stop;

    function Effects(synth, key, output)
    {
        var reverb, echo;

        reverb = new Reverb(synth, key + "_rev", output);
        echo = new Echo(synth, key + "_ech", reverb.input);

        this.reverb = reverb;
        this.echo = echo;

        this.input = echo.input;
        this.output = reverb.output;
    }

    function Effect(synth, key, input, output, onoff)
    {
        input = input || new GainNode(synth.audio_ctx, {"gain": 1.0}),
        onoff = onoff || new OnOffParam(synth, key + "_st");

        Observer.call(this);

        this._input_connections = [];
        this._output_connections = [];

        onoff.observers.push(this);

        this.onoff = onoff;
        this.input = input;
        this.output = output;
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

    function Reverb(synth, key, output)
    {
        /*
        Based on Freeverb: https://ccrma.stanford.edu/~jos/pasp/Freeverb.html

        Changes: only half of the comb filters and allpass filters are used for
        each channel in order to reduce CPU usage.
        */

        var comb_tunings = [1557.0, 1617.0, 1491.0, 1422.0, 1277.0, 1356.0, 1188.0, 1116.0],
            allpass_freqs = [225.0, 556.0, 441.0, 341.0],
            damping_freq_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            damping_gain_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            feedback_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            width_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1}),
            highpass = new BiquadFilterNode(synth.audio_ctx, {"type": "highpass", "frequency": 100.0}),
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

        Effect.call(this, synth, key, null, output, null);

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

            if (i & 1) {
                filter_left = new BiquadFilterNode(
                    synth.audio_ctx,
                    {"type": "allpass", "Q": 1.0, "frequency": t, "channelCount": 1}
                );

                if (prev_filter_left !== null) {
                    prev_filter_left.connect(filter_left);
                }

                aps_left.push(filter_left);
                prev_filter_left = filter_left;
            } else {
                filter_right = new BiquadFilterNode(
                    synth.audio_ctx,
                    {"type": "allpass", "Q": 1.0, "frequency": t, "channelCount": 1}
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

            if (i & 2) {
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
        this.bypass();

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
                {"type": "highshelf", "gain": 0.0, "frequency": 0.0, "channelCount": 1}
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
            highpass = new BiquadFilterNode(synth.audio_ctx, {"type": "highpass", "Q": 1.0, "frequency": 100.0}),
            highshelf_1 = new BiquadFilterNode(
                synth.audio_ctx,
                {"type": "highshelf", "gain": 0.0, "frequency": 0.0, "channelCount": 1}
            ),
            highshelf_2 = new BiquadFilterNode(
                synth.audio_ctx,
                {"type": "highshelf", "gain": 0.0, "frequency": 0.0, "channelCount": 1}
            ),
            ct = synth.audio_ctx.currentTime;

        Effect.call(this, synth, key, null, output, null);

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
        this.bypass();

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

    function ComplexOscillator(synth, key, output)
    {
        var pan, vol_cns,
            lhp_onoff_key, lfo_highpass_onoff, lfo_highpass_freq, lfo_highpass_q,
            llp_onoff_key, lfo_lowpass_onoff, lfo_lowpass_freq, lfo_lowpass_q,
            waveform_key, ehp_onoff_key, elp_onoff_key,
            env_highpass_onoff, env_lowpass_onoff,
            i;

        Observable.call(this);
        Observer.call(this);

        vol_cns = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});
        vol_cns.offset.value = 0.0;

        pan = new StereoPannerNode(synth.audio_ctx);
        pan.connect(output);

        this._key = key;
        this._vol_cns = vol_cns;
        this._pan = pan;

        this._waveform_key = waveform_key = key + "_wf";
        this.waveform = new EnumParam(synth, waveform_key, WAVEFORMS, "sine");
        this.waveform.observers.push(this);

        this.volume = new LFOControllableParam(synth, key + "_vl", vol_cns.offset, 0.0, 1.0, 0.5);
        this.pan = new LFOControllableParam(synth, key + "_pn", pan.pan, -1.0, 1.0, 0.0);
        this.width = new MIDIControllableParam(synth, key + "_wd", -1.0, 1.0, 0.2);

        this.amp_env_params = [
            new MIDIControllableParam(synth, key + "_edl", ENV_DEL_MIN, ENV_DEL_MAX, ENV_DEL_DEF),
            new MIDIControllableParam(synth, key + "_ea", ENV_ATK_MIN, ENV_ATK_MAX, ENV_ATK_DEF),
            new MIDIControllableParam(synth, key + "_ep", ENV_VOL_MIN, ENV_VOL_MAX, ENV_PEAK_DEF),
            new MIDIControllableParam(synth, key + "_eh", ENV_HLD_MIN, ENV_HLD_MAX, ENV_HLD_DEF),
            new MIDIControllableParam(synth, key + "_ed", ENV_DEC_MIN, ENV_DEC_MAX, ENV_DEC_DEF),
            new MIDIControllableParam(synth, key + "_es", ENV_VOL_MIN, ENV_VOL_MAX, ENV_SUS_DEF),
            new MIDIControllableParam(synth, key + "_er", ENV_REL_MIN, ENV_REL_MAX, ENV_REL_DEF)
        ];

        ehp_onoff_key = key + "_eho";
        this.env_highpass_onoff = env_highpass_onoff = new OnOffParam(synth, ehp_onoff_key);

        this.env_highpass_params = [
            new MIDIControllableParam(synth, key + "_ehif", SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MIN),
            new MIDIControllableParam(synth, key + "_ehdlt", ENV_DEL_MIN, ENV_DEL_MAX, ENV_DEL_DEF),
            new MIDIControllableParam(synth, key + "_ehat", ENV_ATK_MIN, ENV_ATK_MAX, ENV_ATK_DEF),
            new MIDIControllableParam(synth, key + "_ehpf", SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MIN),
            new MIDIControllableParam(synth, key + "_ehht", ENV_HLD_MIN, ENV_HLD_MAX, ENV_HLD_DEF),
            new MIDIControllableParam(synth, key + "_ehdt", ENV_DEC_MIN, ENV_DEC_MAX, ENV_DEC_DEF),
            new MIDIControllableParam(synth, key + "_ehsf", SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MIN),
            new MIDIControllableParam(synth, key + "_ehrt", ENV_REL_MIN, ENV_REL_MAX, ENV_REL_DEF),
            new MIDIControllableParam(synth, key + "_ehrf", SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MIN),
            new MIDIControllableParam(synth, key + "_ehq", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF)
        ];

        elp_onoff_key = key + "_elo";
        this.env_lowpass_onoff = env_lowpass_onoff = new OnOffParam(synth, elp_onoff_key);

        this.env_lowpass_params = [
            new MIDIControllableParam(synth, key + "_elif", SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MAX),
            new MIDIControllableParam(synth, key + "_eldlt", ENV_DEL_MIN, ENV_DEL_MAX, ENV_DEL_DEF),
            new MIDIControllableParam(synth, key + "_elat", ENV_ATK_MIN, ENV_ATK_MAX, ENV_ATK_DEF),
            new MIDIControllableParam(synth, key + "_elpf", SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MAX),
            new MIDIControllableParam(synth, key + "_elht", ENV_HLD_MIN, ENV_HLD_MAX, ENV_HLD_DEF),
            new MIDIControllableParam(synth, key + "_eldt", ENV_DEC_MIN, ENV_DEC_MAX, ENV_DEC_DEF),
            new MIDIControllableParam(synth, key + "_elsf", SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MAX),
            new MIDIControllableParam(synth, key + "_elrt", ENV_REL_MIN, ENV_REL_MAX, ENV_REL_DEF),
            new MIDIControllableParam(synth, key + "_elrf", SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MAX),
            new MIDIControllableParam(synth, key + "_elq", FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF)
        ];

        lfo_highpass_freq = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});
        lfo_highpass_q = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});

        lfo_lowpass_freq = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});
        lfo_lowpass_q = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});

        this._lfo_hp_freq_cns = lfo_highpass_freq;
        this._lfo_hp_q_cns = lfo_highpass_q;

        this._lfo_lp_freq_cns = lfo_lowpass_freq;
        this._lfo_lp_q_cns = lfo_lowpass_q;

        lhp_onoff_key = key + "_h_st";
        this.lfo_highpass_params = [
            lfo_highpass_onoff = new OnOffParam(synth, lhp_onoff_key),
            new LFOControllableParam(synth, key + "_hf", lfo_highpass_freq.offset, SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MIN),
            new LFOControllableParam(synth, key + "_hq", lfo_highpass_q.offset, FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF),
        ];

        llp_onoff_key = key + "_l_st";
        this.lfo_lowpass_params = [
            lfo_lowpass_onoff = new OnOffParam(synth, llp_onoff_key),
            new LFOControllableParam(synth, key + "_lf", lfo_lowpass_freq.offset, SND_FREQ_MIN, SND_FREQ_MAX, SND_FREQ_MAX),
            new LFOControllableParam(synth, key + "_lq", lfo_lowpass_q.offset, FILTER_Q_MIN, FILTER_Q_MAX, FILTER_Q_DEF)
        ];

        this._filter_flags = {};
        this._filter_flags[ehp_onoff_key] = ENV_HP_FLAG;
        this._filter_flags[elp_onoff_key] = ENV_LP_FLAG;
        this._filter_flags[lhp_onoff_key] = LFO_HP_FLAG;
        this._filter_flags[llp_onoff_key] = LFO_LP_FLAG;

        env_highpass_onoff.observers.push(this);
        env_lowpass_onoff.observers.push(this);
        lfo_highpass_onoff.observers.push(this);
        lfo_lowpass_onoff.observers.push(this);
    }

    ComplexOscillator.prototype.notify_observers = Observable.prototype.notify_observers;
    ComplexOscillator.prototype.update = Observer.prototype.update;

    ComplexOscillator.prototype.start = function (when)
    {
        this._vol_cns.start(when);
        this._lfo_hp_freq_cns.start(when);
        this._lfo_hp_q_cns.start(when);
        this._lfo_lp_freq_cns.start(when);
        this._lfo_lp_q_cns.start(when);
    };

    function MIDINoteBasedOscillator(synth, key, poliphony, frequencies, output, carrier_osc, am_vol_cns, fm_vol_cns)
    {
        var notes = [],
            fine_detune,
            i, note;

        if (carrier_osc && carrier_osc._notes.length !== poliphony) {
            throw (
                "MIDINoteBasedOscillator error: carrier must have the same poliphony as modulator: "
                + String(carrier_osc._notes.length) + " != " + String(poliphony)
            );
        }

        ComplexOscillator.call(this, synth, key, output);

        fine_detune = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});
        fine_detune.offset.value = 0;

        for (i = 0; i < poliphony; ++i) {
            notes.push(
                note = new Note(
                    synth.audio_ctx,
                    this._vol_cns,
                    fine_detune,
                    this._lfo_hp_freq_cns,
                    this._lfo_hp_q_cns,
                    this.lfo_highpass_params,
                    this._lfo_lp_freq_cns,
                    this._lfo_lp_q_cns,
                    this.lfo_lowpass_params
                )
            );
            note.output.connect(this._pan);

            if (am_vol_cns !== null) {
                am_vol_cns.connect(note.am_out.gain);
            }

            if (fm_vol_cns !== null) {
                fm_vol_cns.connect(note.fm_out.gain);
            }
        }

        this._notes = notes;
        this._frequencies = frequencies;
        this._last_freq = null;
        this._mod_mask = 1;
        this._carrier_osc = carrier_osc;

        this._fine_detune = fine_detune;

        this.velocity_sensitivity = new MIDIControllableParam(synth, key + "_v", 0.0, 1.0, 1.0);
        this.vel_ovsens = new MIDIControllableParam(synth, key + "_vs", 0.0, 1.0, 0.0);
        this.prt_time = new MIDIControllableParam(synth, key + "_prt", PRT_TIME_MIN, PRT_TIME_MAX, PRT_TIME_DEF);
        this.prt_depth = new MIDIControllableParam(synth, key + "_prd", -2400.0, 2400.0, 0.0);
        this.detune = new NumParam(synth, key + "_dt", -48, 48, 0);
        this.fine_detune = new LFOControllableParam(synth, key + "_fd", fine_detune.offset, -400.0, 400.0, 0.0);
    }

    MIDINoteBasedOscillator.prototype.notify_observers = Observable.prototype.notify_observers;

    MIDINoteBasedOscillator.prototype.update = function (param, new_value)
    {
        var notes = this._notes,
            flags = this._filter_flags,
            key = param.key,
            i, l, flag;

        if (key === this._waveform_key) {
            for (i = 0, l = notes.length; i < l; ++i) {
                notes[i].set_waveform(new_value);
            }

            this.notify_observers(new_value);
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

    MIDINoteBasedOscillator.prototype.start = function (when)
    {
        var notes = this._notes,
            i, l;

        ComplexOscillator.prototype.start.call(this, when);
        this._fine_detune.start(when);

        for (i = 0, l = notes.length; i < l; ++i) {
            notes[i].start(when);
        }
    };

    /**
     * 1 = add
     * 2 = amplitude modulation
     * 4 = frequency modulation
     */
    MIDINoteBasedOscillator.prototype.modulate = function (mask)
    {
        var mod_notes = this._notes,
            old_mask = this._mod_mask,
            need_add, need_am, need_fm,
            had_add, had_am, had_fm,
            carr_notes, mod_note, carr_note,
            i, l;

        if (this._carrier_osc === null) {
            throw "No carrier set for this MIDINoteBasedOscillator: " + this._key;
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

    MIDINoteBasedOscillator.prototype.trigger_note = function (now, when, note_idx, midi_note, velocity, note_pan)
    {
        var vs = this.velocity_sensitivity.value,
            prt_depth, prt_start_freq, vos, freq, v;

        midi_note += this.detune.value + 48;

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
            this.env_highpass_params,
            this.env_lowpass_params
        );

        this._last_freq = freq;
    };

    MIDINoteBasedOscillator.prototype.stop_note = function (when, note_idx)
    {
        this._notes[note_idx].stop(when, this.amp_env_params, this.env_highpass_params, this.env_lowpass_params);
    };

    MIDINoteBasedOscillator.prototype.cancel_note = function (when, note_idx)
    {
        this._notes[note_idx].cancel(when, this.amp_env_params, this.env_highpass_params, this.env_lowpass_params);
    };

    function Theremin(synth, output)
    {
        var effects = new Effects(synth, "th", output),
            vol = new GainNode(synth.audio_ctx, {"gain": 1.0}),
            note;

        ComplexOscillator.call(this, synth, "th", effects.input);

        note = new Note(
            synth.audio_ctx,
            this._vol_cns,
            null,
            this._lfo_hp_freq_cns,
            this._lfo_hp_q_cns,
            this.lfo_highpass_params,
            this._lfo_lp_freq_cns,
            this._lfo_lp_q_cns,
            this.lfo_lowpass_params
        );

        note.output.connect(vol);
        vol.connect(this._pan);

        this._audio_ctx = synth.audio_ctx;
        this._note = note;
        this._note_vol = vol;

        this.effects = effects;
        this.min_freq = new MIDIControllableParam(synth, "th_min", SND_FREQ_MIN, SND_FREQ_MAX, 110);
        this.max_freq = new MIDIControllableParam(synth, "th_max", SND_FREQ_MIN, SND_FREQ_MAX, 7040);
        this.resolution = new MIDIControllableParam(synth, "th_res", 1, 189, 1);
    }

    Theremin.prototype.notify_observers = ComplexOscillator.prototype.notify_observers;

    Theremin.prototype.update = function (param, new_value)
    {
        var key = param.key,
            flags = this._filter_flags,
            flag;

        if (key === this._waveform_key) {
            this._note.set_waveform(new_value);
            this.notify_observers(new_value);
        } else if (flags.hasOwnProperty(key)) {
            flag = flags[key];

            if (new_value === "on") {
                this._note.engage_filter(flag);
            } else {
                this._note.bypass_filter(flag);
            }
        }
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
            freq, when;

        when = now + 0.05;

        g.cancelAndHoldAtTime(now);

        if (res > 1) {
            res = 630.0 / res,
            x = Math.round(x * res) / res;
        }

        freq = this.min_freq.value + this.max_freq.value * x;

        this._note.trigger(
            now,
            when,
            freq,
            1.0,
            this.width.value * (2.0 * x - 1.0),
            freq,
            0,
            this.amp_env_params,
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
        this._note.stop(
            this._audio_ctx.currentTime + 0.01,
            this.amp_env_params,
            this.env_highpass_params,
            this.env_lowpass_params
        );
    };

    function Note(
            audio_ctx,
            vol_cns,
            fine_detune,
            lfo_hp_freq_cns, lfo_hp_q_cns, lfo_hp_params,
            lfo_lp_freq_cns, lfo_lp_q_cns, lfo_lp_params
    ) {
        var freq_cns = new ConstantSourceNode(audio_ctx, {"channelCount": 1}),
            osc = new OscillatorNode(audio_ctx, {"channelCount": 1}),
            vel_vol = new GainNode(audio_ctx, {"channelCount": 1}),
            vol = new GainNode(audio_ctx, {"channelCount": 1}),
            am_in = new GainNode(audio_ctx, {"channelCount": 1}),
            am_out = new GainNode(audio_ctx, {"channelCount": 1}),
            fm_freq = new GainNode(audio_ctx, {"channelCount": 1}),
            fm_out = new GainNode(audio_ctx, {"channelCount": 1}),
            pan = new StereoPannerNode(audio_ctx, {"channelCount": 2}),
            env_highpass = new BiquadFilterNode(
                audio_ctx,
                {
                    "type": "highpass",
                    "Q": FILTER_Q_DEF,
                    "frequency": SND_FREQ_MIN,
                    "channelCount": 1
                }
            ),
            env_lowpass = new BiquadFilterNode(
                audio_ctx,
                {
                    "type": "lowpass",
                    "Q": FILTER_Q_DEF,
                    "frequency": SND_FREQ_MAX,
                    "channelCount": 1
                }
            ),
            lfo_highpass = new BiquadFilterNode(
                audio_ctx,
                {
                    "type": "highpass",
                    "Q": 0.0,
                    "frequency": 0.0,
                    "channelCount": 1
                }
            ),
            lfo_lowpass = new BiquadFilterNode(
                audio_ctx,
                {
                    "type": "lowpass",
                    "Q": 0.0,
                    "frequency": 0.0,
                    "channelCount": 1
                }
            );

        vol.gain.value = 0.0;
        vel_vol.gain.value = 0.0;
        am_in.gain.value = 1.0;
        am_out.gain.value = 0.0;
        fm_out.gain.value = 0.0;
        freq_cns.offset.value = 0.0;
        osc.frequency.value = 0.0;

        if (fine_detune !== null) {
            fine_detune.connect(osc.detune);
        }

        osc.connect(am_in);

        vol_cns.connect(vol.gain);

        vel_vol.connect(vol);
        vol.connect(pan);
        vol.connect(am_out);
        vol.connect(fm_freq);

        freq_cns.connect(osc.frequency);
        freq_cns.connect(fm_freq.gain);
        fm_freq.connect(fm_out);

        lfo_highpass.frequency.value = 0.0;
        lfo_highpass.Q.value = 0.0;
        lfo_lowpass.frequency.value = 0.0;
        lfo_lowpass.Q.value = 0.0;

        lfo_hp_freq_cns.connect(lfo_highpass.frequency);
        lfo_hp_q_cns.connect(lfo_highpass.Q);
        lfo_lp_freq_cns.connect(lfo_lowpass.frequency);
        lfo_lp_q_cns.connect(lfo_lowpass.Q);

        this._chains = [
            [am_in, vel_vol],
            [am_in, env_highpass, vel_vol],
            [am_in, env_lowpass, vel_vol],
            [am_in, env_highpass, env_lowpass, vel_vol],

            [am_in, lfo_highpass, vel_vol],
            [am_in, env_highpass, lfo_highpass, vel_vol],
            [am_in, env_lowpass, lfo_highpass, vel_vol],
            [am_in, env_highpass, env_lowpass, lfo_highpass, vel_vol],

            [am_in, lfo_lowpass, vel_vol],
            [am_in, env_highpass, lfo_lowpass, vel_vol],
            [am_in, env_lowpass, lfo_lowpass, vel_vol],
            [am_in, env_highpass, env_lowpass, lfo_lowpass, vel_vol],

            [am_in, lfo_highpass, lfo_lowpass, vel_vol],
            [am_in, env_highpass, lfo_highpass, lfo_lowpass, vel_vol],
            [am_in, env_lowpass, lfo_highpass, lfo_lowpass, vel_vol],
            [am_in, env_highpass, env_lowpass, lfo_highpass, lfo_lowpass, vel_vol]
        ];
        this._chain = 0;

        this._rewire(0);

        this._osc = osc;
        this._vol = vol;
        this._vel_vol = vel_vol;
        this._env_highpass = env_highpass;
        this._env_lowpass = env_lowpass;
        this._lfo_highpass = lfo_highpass;
        this._lfo_lowpass = lfo_lowpass;
        this._am_in = am_in;
        this._freq_cns = freq_cns;
        this._fm_freq = fm_freq;

        this._amp_sustain_start = null;
        this._amp_sustain_level = null;
        this._ehp_sustain_start = null;
        this._elp_sustain_start = null;

        this.am_in = am_in.gain;
        this.frequency = freq_cns.offset;
        this.pan = pan;
        this.fm_out = fm_out;
        this.am_out = am_out;
        this.output = pan;
    }

    Note.prototype._rewire = function (new_chain_idx)
    {
        var chains = this._chains,
            old_chain, new_chain, i, l, e;

        old_chain = chains[this._chain];
        new_chain = chains[new_chain_idx];

        for (i = 0, l = old_chain.length - 1; i < l; ++i) {
            old_chain[i].disconnect();
        }

        for (i = 0, l = new_chain.length - 1; i < l; ++i) {
            new_chain[i].connect(new_chain[i + 1]);
        }

        this._chain = new_chain_idx;
    };

    Note.prototype.start = function (when)
    {
        this._osc.start(when);
        this._freq_cns.start(when);
    };

    Note.prototype.trigger = function (
            now, when, freq, velocity, pan,
            prt_start_freq, prt_time,
            amp_env_params, env_highpass_params, env_lowpass_params
    ) {
        var g = this._vel_vol.gain,
            hq = this._env_highpass.Q,
            lq = this._env_lowpass.Q,
            f = this.frequency,
            p = this.pan.pan,
            chain = this._chain;

        f.cancelAndHoldAtTime(when);

        if (prt_start_freq === null || prt_time < 0.001) {
            f.setValueAtTime(freq, when);
        } else {
            f.setValueAtTime(prt_start_freq, when);
            f.linearRampToValueAtTime(freq, when + prt_time);
        }

        hq.cancelAndHoldAtTime(when);
        hq.setValueAtTime(env_highpass_params[9].value, when);

        lq.cancelAndHoldAtTime(when);
        lq.setValueAtTime(env_lowpass_params[9].value, when);

        p.cancelAndHoldAtTime(when);
        p.setValueAtTime(pan, when);

        this._amp_sustain_start = this._apply_envelope_dahds(
            g,
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

        if (0 < (chain & 1)) {
            this._ehp_sustain_start = this._apply_envelope_dahds(
                this._env_highpass.frequency,
                now,
                when,
                env_highpass_params[0].value,
                env_highpass_params[1].value,
                env_highpass_params[2].value,
                env_highpass_params[3].value,
                env_highpass_params[4].value,
                env_highpass_params[5].value,
                env_highpass_params[6].value
            );
        }

        if (0 < (chain & 2)) {
            this._elp_sustain_start = this._apply_envelope_dahds(
                this._env_lowpass.frequency,
                now,
                when,
                env_lowpass_params[0].value,
                env_lowpass_params[1].value,
                env_lowpass_params[2].value,
                env_lowpass_params[3].value,
                env_lowpass_params[4].value,
                env_lowpass_params[5].value,
                env_lowpass_params[6].value
            );
        }
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

    Note.prototype.stop = function (when, amp_env_params, env_highpass_params, env_lowpass_params)
    {
        var chain = this._chain;

        this._apply_envelope_r(
            this._vel_vol.gain,
            when,
            this._amp_sustain_start,
            this._amp_sustain_level,
            amp_env_params[6].value,
            0.0
        );

        if (0 < (chain & 1)) {
            this._apply_envelope_r(
                this._env_highpass.frequency,
                when,
                this._ehp_sustain_start,
                env_highpass_params[6].value,
                env_highpass_params[7].value,
                env_highpass_params[8].value
            );
        }

        if (0 < (chain & 2)) {
            this._apply_envelope_r(
                this._env_lowpass.frequency,
                when,
                this._elp_sustain_start,
                env_lowpass_params[6].value,
                env_lowpass_params[7].value,
                env_lowpass_params[8].value
            );
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

    Note.prototype.cancel = function (when, amp_env_params, env_highpass_params, env_lowpass_params)
    {
        var chain = this._chain;

        this._apply_envelope_r(
            this._vel_vol.gain,
            when,
            this._amp_sustain_start,
            this._amp_sustain_level,
            0.0,
            0.0
        );

        if (0 < (chain & 1)) {
            this._apply_envelope_r(
                this._env_highpass.frequency,
                when,
                this._ehp_sustain_start,
                env_highpass_params[6].value,
                0.0,
                env_highpass_params[8].value
            );
        }

        if (0 < (chain & 2)) {
            this._apply_envelope_r(
                this._env_lowpass.frequency,
                when,
                this._elp_sustain_start,
                env_lowpass_params[6].value,
                0.0,
                env_lowpass_params[8].value
            );
        }
    };

    Note.prototype.set_waveform = function (new_waveform)
    {
        this._osc.type = new_waveform;
    }

    Note.prototype.engage_filter = function (flag)
    {
        var chain = this._chain;

        if (0 < (chain & flag)) {
            return;
        }

        this._rewire(chain | flag);
    };

    Note.prototype.bypass_filter = function (flag)
    {
        var chain = this._chain;

        if (1 > (chain & flag)) {
            return;
        }

        this._rewire(chain & (0xffff & ~flag));
    };

    function Param(synth, key, default_value)
    {
        Observable.call(this);

        this.key = key;
        this.default_value = default_value;
        this.value = default_value;
        this.controller = "none";

        synth.params.push(this);
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

    function OnOffParam(synth, key)
    {
        EnumParam.call(this, synth, key, {"on": "on", "off": "off"}, "off");
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

    function LFOControllableParam(synth, key, target_param, min, max, default_value)
    {
        var mul = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            add = new GainNode(synth.audio_ctx, {"channelCount": 1}),
            ofs = new ConstantSourceNode(synth.audio_ctx, {"channelCount": 1});

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
        this._automated_until = 0;
        this._target_param = target_param;

        this.set_value(default_value);
    }

    LFOControllableParam.prototype.notify_observers = MIDIControllableParam.prototype.notify_observers;
    LFOControllableParam.prototype.validate = MIDIControllableParam.prototype.validate;
    LFOControllableParam.prototype.connect_midi_ctl = MIDIControllableParam.prototype.connect_midi_ctl;
    LFOControllableParam.prototype.control_value = MIDIControllableParam.prototype.control_value;

    LFOControllableParam.prototype.set_value = function (new_value)
    {
        this._target_param.value = 0;
        this._mul.gain.value = 0;
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
            this._automated_until = 0;
        }

        this._target_param.value = 0;
        this._ofs.offset.value = this.min;
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
        this._mul.gain.value = 0.0;
    };

    function LFOController(synth, key)
    {
        var osc = new OscillatorNode(synth.audio_ctx, {"channelCount": 1}),
            ws = new WaveShaperNode(synth.audio_ctx, {"curve": new Float32Array([0.0, 1.0]), "channelCount": 1});

        Observable.call(this);
        Observer.call(this);

        osc.connect(ws);

        this._osc = osc;
        this._wave_shaper = ws;

        this.key = key;

        this.waveform = new EnumParam(synth, key + "_wf", WAVEFORMS, "sine");
        this.waveform.observers.push(this);

        this.frequency = new LFOControllableParam(synth, key + "_f", osc.frequency, LFO_FREQ_MIN, LFO_FREQ_MAX, LFO_FREQ_DEF);
        this.amt = new LFOControllerParam(synth, key + "_am", this, 0.0, 1.0, 1.0);
        this.min = new LFOControllerParam(synth, key + "_mi", this, 0.0, 1.0, 0.0);
        this.max = new LFOControllerParam(synth, key + "_ma", this, 0.0, 1.0, 1.0);
        this.rnd = new LFOControllerParam(synth, key + "_rn", this, 0.0, 1.0, 0.0);
        this.output = ws;
    }

    LFOController.prototype.notify_observers = Observable.prototype.notify_observers;

    LFOController.prototype.update = function (waveform_param, new_waveform)
    {
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
            curve = [],
            rnd_weight = this.rnd.value,
            amt = this.amt.value,
            l = RANDOMS,
            r = RANDOMS - 1,
            delta, inv_rnd_weight, i;

        delta = this.max.value - min;

        if (rnd_weight < 0.0001) {
            this._wave_shaper.curve = new Float32Array([min, min + delta * amt]);
        } else {
            inv_rnd_weight = 1.0 - rnd_weight;

            for (i = 0, l = RANDOMS; i < l; ++i) {
                curve.push(
                    min + delta * amt * (
                        rnd_weight * random_numbers[i]
                        + inv_rnd_weight * (i / r)
                    )
                );
            }

            this._wave_shaper.curve = new Float32Array(curve);
        }
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

    function MIDIController(default_value)
    {
        this._params = [];
        this._connections = {};
        this._next_conn = 0;
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

    function VirtualMIDIController(virt_ctl_param)
    {
        MIDIController.call(this, virt_ctl_param.default_value);
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

    function MIDIControllerShaper(synth, key)
    {
        this.key = key;

        this.input = new MIDIControllableParam(synth, key + "_in", 0.0, 1.0, 0.0);
        this.amt = new MIDIControllableParam(synth, key + "_am", 0.0, 1.0, 1.0);
        this.min = new MIDIControllableParam(synth, key + "_mi", 0.0, 1.0, 0.0);
        this.max = new MIDIControllableParam(synth, key + "_ma", 0.0, 1.0, 1.0);
        this.rnd = new MIDIControllableParam(synth, key + "_rn", 0.0, 1.0, 0.0);

        MIDIController.call(this, 0);
        Observer.call(this);

        this.input.observers.push(this);
        this.amt.observers.push(this);
        this.min.observers.push(this);
        this.max.observers.push(this);
        this.rnd.observers.push(this);
    }

    MIDIControllerShaper.prototype.control = MIDIController.prototype.control;
    MIDIControllerShaper.prototype.update_params = MIDIController.prototype.update_params;
    MIDIControllerShaper.prototype.release = MIDIController.prototype.release;
    MIDIControllerShaper.prototype.set_value = MIDIController.prototype.set_value;
    MIDIControllerShaper.prototype.control_params = MIDIController.prototype.control_params;

    MIDIControllerShaper.prototype.update = function (input, new_value)
    {
        var min = this.min.value,
            rnd_weight = this.rnd.value,
            in_value, rnd_value;

        if (rnd_weight < 0.0001) {
            this.set_value(min + this.input.value * this.amt.value * (this.max.value - min));
        } else {
            rnd_value = random_numbers[Math.floor((in_value = this.input.value) * (RANDOMS - 1)) | 0];

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

    function NamedUIWidgetGroup(name, class_names)
    {
        var div1 = document.createElement("div"),
            span = document.createElement("span"),
            div2 = document.createElement("div");

        UIWidgetGroup.call(this, class_names);

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

    function SynthUI(synth)
    {
        var midi_module = new MIDIModuleUI(synth.midi_voice, synth),
            comp_module = new ComputerModuleUI(synth.comp_voice, synth),
            virtual_modules = new UIWidgetGroup("color-7 horizontal"),
            inputs = new UIWidgetGroup("color-7 vertical"),
            voice_modules = new UIWidgetGroup("color-7 horizontal"),
            virt_ctls = new VirtualControlsUI(synth),
            sequencer = new SequencerUI(synth),
            theremin = new ThereminUI(synth.theremin, synth),
            ctls = new NamedUIWidgetGroup("Controllers", "controllers color-7"),
            lfos = new UIWidgetGroup("color-7"),
            midi_ctl_shapers = new UIWidgetGroup("color-7"),
            i, l, si, k;

        UIWidgetGroup.call(this, "color-0 horizontal");

        synth.observers.push(this);

        for (i = 0; i < LFOS; ++i) {
            si = String(i + 1);
            k = "lfo" + si;
            lfos.add(new LFOUI("LFO " + si, synth.controllers[k], synth));
        }

        for (i = 0; i < MIDI_SHAPERS; ++i) {
            si = String(i + 1);
            k = "mcs" + String(si);
            midi_ctl_shapers.add(
                new MIDIControllerShaperUI("MCS " + si, synth.controllers[k], synth)
            );
        }

        ctls.add(lfos);
        ctls.add(midi_ctl_shapers);

        inputs.add(virt_ctls);
        inputs.add(sequencer);

        virtual_modules.add(inputs);
        virtual_modules.add(theremin);
        this.add(virtual_modules);

        voice_modules.add(comp_module);
        voice_modules.add(midi_module);
        this.add(voice_modules);
        this.add(ctls);

        this._midi_module = midi_module;

        this.virt_ctls = virt_ctls;
        this.theremin = theremin;
    }

    SynthUI.prototype.add = UIWidgetGroup.prototype.add;

    SynthUI.prototype.update = function (observable, arg)
    {
        var d = [],
            inputs = observable.midi_inputs,
            i, l, input;

        for (i = 0, l = inputs.length; i < l; ++i) {
            input = inputs[i];
            d.push(String(input.name));
        }

        this._midi_module.set_description("Inputs: " + d.join(", "));
    };

    SynthUI.prototype.handle_document_mouse_up = function (evt)
    {
        this.virt_ctls.handle_document_mouse_up(evt);
        this.theremin.handle_document_mouse_up(evt);

        return true;
    };

    function VoiceUI(name, class_names, voice, synth)
    {
        var settings = new UIWidgetGroup(),
            osc1 = new OscillatorUI("Oscillator 1 (modulator)", "color-4", voice.osc_1, synth),
            osc2 = new OscillatorUI("Oscillator 2 (carrier)", "color-3", voice.osc_2, synth),
            effects = new NamedUIWidgetGroup("Effects", "effects color-0", synth);

        NamedUIWidgetGroup.call(this, name, "module vertical " + class_names);

        settings.add(new FaderUI("VOL", "Volume", "%", 1000, 10, ALL_CONTROLS, voice.volume, synth));
        settings.add(new FaderUI("AM", "Amplitude modulation volume", "%", 1000, 10, ALL_CONTROLS, voice.am_volume, synth));
        settings.add(new FaderUI("FM", "Frequency modulation volume", "%", 100, 100, ALL_CONTROLS, voice.fm_volume, synth));
        settings.add(new SelectUI("1+2", "Modulate Oscillator 2 with Oscillator 1", "modulation", voice.modulation, synth));

        effects.add(new EchoUI(synth, voice.effects.echo));
        effects.add(new ReverbUI(synth, voice.effects.reverb));

        this.settings = settings;
        this.osc1 = osc1;
        this.osc2 = osc2;
        this.effects = effects;
    }

    VoiceUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    VoiceUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    VoiceUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function MIDIModuleUI(voice, synth)
    {
        VoiceUI.call(this, "MIDI module", "color-2 midi-module", voice, synth);

        this.add(this.settings);
        this.add(this.osc1);
        this.add(this.osc2);
        this.add(this.effects);
    }

    MIDIModuleUI.prototype.update = VoiceUI.prototype.update;
    MIDIModuleUI.prototype.add = VoiceUI.prototype.add;
    MIDIModuleUI.prototype.set_description = VoiceUI.prototype.set_description;

    function ComputerModuleUI(voice, synth)
    {
        VoiceUI.call(this, "Computer module", "color-1", voice, synth);

        this.add(this.settings);
        this.add(this.osc1);
        this.add(this.osc2);
        this.add(this.effects);
    }

    ComputerModuleUI.prototype.update = VoiceUI.prototype.update;
    ComputerModuleUI.prototype.add = VoiceUI.prototype.add;
    ComputerModuleUI.prototype.set_description = VoiceUI.prototype.set_description;

    function OscillatorUI(name, class_names, complex_osc, synth)
    {
        var params = new UIWidgetGroup("vertical"),
            amp_env = new NamedUIWidgetGroup("Amplitude envelope", "vertical"),
            env_highpass = new EnvelopeHighpassUI(complex_osc, synth),
            env_lowpass = new EnvelopeLowpassUI(complex_osc, synth),
            lfo_highpass = new LFOCompatibleHighpassUI("", complex_osc.lfo_highpass_params, synth),
            lfo_lowpass = new LFOCompatibleLowpassUI("", complex_osc.lfo_lowpass_params, synth),
            wav = new SelectUI("WAV", "Waveform", "waveform-selector", complex_osc.waveform, synth);

        NamedUIWidgetGroup.call(this, name, "horizontal oscillator " + class_names);

        params.add(new FaderUI("VOL", "Volume", "%", 1000, 10, ALL_CONTROLS, complex_osc.volume, synth));
        params.add(new FaderUI("VS", "Velocity sensitivity", "%", 100, 1, MIDI_CONTROLS, complex_osc.velocity_sensitivity, synth));
        params.add(new FaderUI("VOS", "Velocity oversensitivity", "%", 100, 1, MIDI_CONTROLS, complex_osc.vel_ovsens, synth));
        params.add(new FaderUI("PAN", "Panning", "%", 100, 1, ALL_CONTROLS, complex_osc.pan, synth));
        params.add(new FaderUI("WID", "Width", "%", 100, 1, MIDI_CONTROLS, complex_osc.width, synth));
        params.add(new FaderUI("PRT", "Portamento time", "s", 100, 100, MIDI_CONTROLS, complex_osc.prt_time, synth));
        params.add(new FaderUI("PRD", "Portamento depth (cents; 0 = start from latest note)", "c", 1, 1, MIDI_CONTROLS, complex_osc.prt_depth, synth));
        params.add(new FaderUI("DTN", "Detune (semitones)", "st", 1, 1, null, complex_osc.detune, synth));
        params.add(new FaderUI("FIN", "Fine detune (cents)", "c", 10, 10, ALL_CONTROLS, complex_osc.fine_detune, synth));

        amp_env.add(new FaderUI("DEL", "Delay time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[0], synth));
        amp_env.add(new FaderUI("ATK", "Attack time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[1], synth));
        amp_env.add(new FaderUI("PK", "Peak level", "%", 1000, 10, MIDI_CONTROLS, complex_osc.amp_env_params[2], synth));
        amp_env.add(new FaderUI("HLD", "Hold time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[3], synth));
        amp_env.add(new FaderUI("DEC", "Decay time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[4], synth));
        amp_env.add(new FaderUI("SUS", "Sustain level", "%", 1000, 10, MIDI_CONTROLS, complex_osc.amp_env_params[5], synth));
        amp_env.add(new FaderUI("REL", "Release time", "s", 1000, 1000, MIDI_CONTROLS, complex_osc.amp_env_params[6], synth));

        this.add(wav);
        this.add(params);
        this.add(amp_env);
        this.add(env_highpass);
        this.add(env_lowpass);
        this.add(lfo_highpass);
        this.add(lfo_lowpass);
    }

    OscillatorUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    OscillatorUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    OscillatorUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function EnvelopeBiquadFilterUI(name, onoff_param, params, synth)
    {
        var onoff = new OnOffSwitch(onoff_param);

        NamedUIWidgetGroup.call(this, name, "vertical");

        this._name.appendChild(onoff.dom_node);
        this._onoff = onoff;

        this.add(new FaderUI("IF", "Initial frequency", "Hz", 1, 1, MIDI_CONTROLS, params[0], synth));
        this.add(new FaderUI("DEL", "Delay", "s", 1000, 1000, MIDI_CONTROLS, params[1], synth));
        this.add(new FaderUI("ATK", "Attack", "s", 1000, 1000, MIDI_CONTROLS, params[2], synth));
        this.add(new FaderUI("PF", "Peak frequency", "Hz", 1, 1, MIDI_CONTROLS, params[3], synth));
        this.add(new FaderUI("HLD", "Hold", "s", 1000, 1000, MIDI_CONTROLS, params[4], synth));
        this.add(new FaderUI("DEC", "Decay", "s", 1000, 1000, MIDI_CONTROLS, params[5], synth));
        this.add(new FaderUI("SF", "Sustain frequency", "Hz", 1, 1, MIDI_CONTROLS, params[6], synth));
        this.add(new FaderUI("REL", "Release", "s", 1000, 1000, MIDI_CONTROLS, params[7], synth));
        this.add(new FaderUI("RF", "Release frequency", "Hz", 1, 1, MIDI_CONTROLS, params[8], synth));
        this.add(new FaderUI("Q", "Q factor", "", 100, 100, MIDI_CONTROLS, params[9], synth));
    }

    EnvelopeBiquadFilterUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    EnvelopeBiquadFilterUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    EnvelopeBiquadFilterUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function EnvelopeHighpassUI(complex_osc, synth)
    {
        EnvelopeBiquadFilterUI.call(this, "Highpass (envelope)", complex_osc.env_highpass_onoff, complex_osc.env_highpass_params, synth);
    }

    EnvelopeHighpassUI.prototype.update = EnvelopeBiquadFilterUI.prototype.update;
    EnvelopeHighpassUI.prototype.add = EnvelopeBiquadFilterUI.prototype.add;
    EnvelopeHighpassUI.prototype.set_description = EnvelopeBiquadFilterUI.prototype.set_description;

    function EnvelopeLowpassUI(complex_osc, synth)
    {
        EnvelopeBiquadFilterUI.call(this, "Lowpass (envelope)", complex_osc.env_lowpass_onoff, complex_osc.env_lowpass_params, synth);
    }

    EnvelopeLowpassUI.prototype.update = EnvelopeBiquadFilterUI.prototype.update;
    EnvelopeLowpassUI.prototype.add = EnvelopeBiquadFilterUI.prototype.add;
    EnvelopeLowpassUI.prototype.set_description = EnvelopeBiquadFilterUI.prototype.set_description;

    function LFOCompatibleBiquadFilterUI(name, class_names, lfo_compatible_filter_params, synth)
    {
        var onoff = new OnOffSwitch(lfo_compatible_filter_params[0]);

        NamedUIWidgetGroup.call(this, name, "vertical " + (class_names || ""));

        this._name.appendChild(onoff.dom_node);
        this._onoff = onoff;

        this.add(new FaderUI("FRQ", "Frequency", "Hz", 1, 1, ALL_CONTROLS, lfo_compatible_filter_params[1], synth));
        this.add(new FaderUI("Q", "Q factor", "", 100, 100, ALL_CONTROLS, lfo_compatible_filter_params[2], synth));
    }

    LFOCompatibleBiquadFilterUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    LFOCompatibleBiquadFilterUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    LFOCompatibleBiquadFilterUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function LFOCompatibleHighpassUI(class_names, lfo_compatible_filter_params, synth)
    {
        LFOCompatibleBiquadFilterUI.call(this, "Highpass (LFO compatible)", class_names, lfo_compatible_filter_params, synth);
    }

    LFOCompatibleHighpassUI.prototype.update = LFOCompatibleBiquadFilterUI.prototype.update;
    LFOCompatibleHighpassUI.prototype.add = LFOCompatibleBiquadFilterUI.prototype.add;
    LFOCompatibleHighpassUI.prototype.set_description = LFOCompatibleBiquadFilterUI.prototype.set_description;

    function LFOCompatibleLowpassUI(class_names, lfo_compatible_filter_params, synth)
    {
        LFOCompatibleBiquadFilterUI.call(this, "Lowpass (LFO compatible)", class_names, lfo_compatible_filter_params, synth);
    }

    LFOCompatibleLowpassUI.prototype.update = LFOCompatibleBiquadFilterUI.prototype.update;
    LFOCompatibleLowpassUI.prototype.add = LFOCompatibleBiquadFilterUI.prototype.add;
    LFOCompatibleLowpassUI.prototype.set_description = LFOCompatibleBiquadFilterUI.prototype.set_description;

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

    function MIDIControllerShaperUI(name, midi_ctl_shaper_ctl, synth)
    {
        var input = new FaderUI("IN", "Input", "%", 10000, 100, MIDI_CONTROLS, midi_ctl_shaper_ctl.input, synth),
            amt = new FaderUI("AMT", "Amount", "%", 10000, 100, MIDI_CONTROLS, midi_ctl_shaper_ctl.amt, synth),
            min = new FaderUI("MIN", "Minimum value", "%", 10000, 100, MIDI_CONTROLS, midi_ctl_shaper_ctl.min, synth),
            max = new FaderUI("MAX", "Maximum value", "%", 10000, 100, MIDI_CONTROLS, midi_ctl_shaper_ctl.max, synth),
            rnd = new FaderUI("RND", "Randomness", "%", 10000, 100, MIDI_CONTROLS, midi_ctl_shaper_ctl.rnd, synth);

        NamedUIWidgetGroup.call(this, name, "horizontal color-6");

        this.dom_node.setAttribute("title", "MIDI Controller Shaper");

        this.add(input);
        this.add(amt);
        this.add(min);
        this.add(max);
        this.add(rnd);
    }

    MIDIControllerShaperUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    MIDIControllerShaperUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    MIDIControllerShaperUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

    function LFOUI(name, lfo_ctl, synth)
    {
        var wav = new SelectUI("WAV", "Waveform", "waveform-selector", lfo_ctl.waveform, synth),
            freq = new FaderUI("FRQ", "Frequency", "Hz", 100, 100, ALL_CONTROLS, lfo_ctl.frequency, synth),
            amt = new FaderUI("AMT", "Amount", "%", 5000, 50, MIDI_CONTROLS, lfo_ctl.amt, synth),
            min = new FaderUI("MIN", "Minimum value", "%", 5000, 50, MIDI_CONTROLS, lfo_ctl.min, synth),
            max = new FaderUI("MAX", "Maximum value", "%", 5000, 50, MIDI_CONTROLS, lfo_ctl.max, synth),
            rnd = new FaderUI("RND", "Randomness", "%", 5000, 50, MIDI_CONTROLS, lfo_ctl.rnd, synth);

        NamedUIWidgetGroup.call(this, name, "horizontal lfo color-8");

        this.dom_node.setAttribute("title", "Low-frequency oscillator");

        this.add(wav);
        this.add(freq);
        this.add(amt);
        this.add(min);
        this.add(max);
        this.add(rnd);
    }

    LFOUI.prototype.update = NamedUIWidgetGroup.prototype.update;
    LFOUI.prototype.add = NamedUIWidgetGroup.prototype.add;
    LFOUI.prototype.set_description = NamedUIWidgetGroup.prototype.set_description;

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

    function OnOffSwitch(param)
    {
        var input = document.createElement("input"),
            label = document.createElement("label"),
            span = document.createElement("span");

        UIWidget.call(this, "onoff");

        input.setAttribute("id", param.key);
        input.setAttribute("name", param.key);
        input.setAttribute("type", "checkbox");
        input.onchange = bind(this, this.handle_input_change);

        span.innerText = "off";

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
        var value = param.value;

        this._input.checked = value === "on";
        this._span.innerText = value;
    };

    OnOffSwitch.prototype.handle_input_change = function ()
    {
        var new_state = this._input.checked ? "on" : "off";

        this._param.set_value(new_state);
        this._span.innerText = new_state;

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

        this._input.value = Math.round(new_value * this._scale);

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

        this._value.innerText = String(
            Math.round(this._input.value * 1000 / this._display_scale) / 1000
        );

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

    function VirtualControlsUI(synth)
    {
        var keyboard = document.createElement("div"),
            virt_ctls = new NamedUIWidgetGroup("Virtual controllers"),
            virt_keys = {},
            i, l, virt_key, key_desc, dom_node;

        NamedUIWidgetGroup.call(this, "Virtual inputs", "module virt-controls color-1");

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
        this._synth = synth;
        this._mouse_down = false;

        this.add(new FaderUI("DTN", "Detune (semitones)", "st", 1, 1, null, synth.virt_detune, synth));

        virt_ctls.add(new FaderUI("virtual 1", "Virtual controller 1", "%", 1000, 10, null, synth.virt_ctl_params[0], synth));
        virt_ctls.add(new FaderUI("virtual 2", "Virtual controller 2", "%", 1000, 10, null, synth.virt_ctl_params[1], synth));
        virt_ctls.add(new FaderUI("virtual 3", "Virtual controller 3", "%", 1000, 10, null, synth.virt_ctl_params[2], synth));
        virt_ctls.add(new FaderUI("virtual 4", "Virtual controller 4", "%", 1000, 10, null, synth.virt_ctl_params[3], synth));
        virt_ctls.add(new FaderUI("virtual 5", "Virtual controller 5", "%", 1000, 10, null, synth.virt_ctl_params[4], synth));
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
            scale_ui, beats_ui,
            beats_table, beats_row, beats_cell, beats_section, step_ui,
            i, j, k, n, c;

        NamedUIWidgetGroup.call(this, "Sequencer [space]", "module sequencer color-7"),

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

            scale_ui = new NamedUIWidgetGroup("Scale", "seq-scale-container color-" + c);

            for (j = 0; j < 12; ++j) {
                scale_ui.add(new SelectUI("", "Scale note " + String(j + 1), "seq-scale", bank.scale[j], synth));
            }

            beats_ui = new UIWidgetGroup("seq-scale-container color-" + c);

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

    function ThereminUI(theremin, synth)
    {
        var touch_area = document.createElement("div"),
            params = new UIWidgetGroup("horizontal"),
            env_highpass = new EnvelopeHighpassUI(theremin, synth),
            env_lowpass = new EnvelopeLowpassUI(theremin, synth),
            lfo_highpass = new LFOCompatibleHighpassUI("", theremin.lfo_highpass_params, synth),
            lfo_lowpass = new LFOCompatibleLowpassUI("", theremin.lfo_lowpass_params, synth),
            wav = new SelectUI("WAV", "Waveform", "waveform-selector", theremin.waveform, synth),
            effects = new NamedUIWidgetGroup("Effects", "effects color-0", synth);

        NamedUIWidgetGroup.call(this, "Theremin", "module color-8");

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

        params.add(new FaderUI("VOL", "Volume", "%", 1000, 10, ALL_CONTROLS, theremin.volume, synth));
        params.add(new FaderUI("PAN", "Panning", "%", 100, 1, ALL_CONTROLS, theremin.pan, synth));
        params.add(new FaderUI("WID", "Width", "%", 100, 1, MIDI_CONTROLS, theremin.width, synth));
        params.add(new FaderUI("RES", "Resolution", "", 1, 1, MIDI_CONTROLS, theremin.resolution, synth));
        params.add(new FaderUI("MIN", "Minimum frequencey", "Hz", 1, 1, MIDI_CONTROLS, theremin.min_freq, synth));
        params.add(new FaderUI("MAX", "Maximum frequencey", "Hz", 1, 1, MIDI_CONTROLS, theremin.max_freq, synth));
        params.add(new FaderUI("ATK", "Attack time", "s", 1000, 1000, MIDI_CONTROLS, theremin.amp_env_params[1], synth));
        params.add(new FaderUI("REL", "Release time", "s", 1000, 1000, MIDI_CONTROLS, theremin.amp_env_params[6], synth));

        effects.add(new EchoUI(synth, theremin.effects.echo));
        effects.add(new ReverbUI(synth, theremin.effects.reverb));

        this.add(wav);

        this.dom_node.appendChild(touch_area);

        this.add(params);
        this.add(env_highpass);
        this.add(env_lowpass);
        this.add(lfo_highpass);
        this.add(lfo_lowpass);
        this.add(effects);
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

        c = this._get_relative_pos(evt || event);
        this._theremin.trigger(c[0], c[1]);
        this._mouse_down = true;

        return stop_event(evt);
    };

    ThereminUI.prototype._get_relative_pos = function (evt)
    {
        var rect = this._touch_area.getClientRects()[0];

        return [
            Math.max(0.0, Math.min(1.0, (evt.clientX - rect.left) / rect.width)),
            Math.max(0.0, Math.min(1.0, (evt.clientY - rect.top) / rect.height))
        ];
    };

    ThereminUI.prototype.handle_theremin_mouse_up = function (evt)
    {
        var c;

        if (this._mouse_down) {
            c = this._get_relative_pos(evt || event);
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
            c = this._get_relative_pos(evt || event);
            this._theremin.move(c[0], c[1]);
        }

        return true;
    };

    ThereminUI.prototype.handle_theremin_mouse_enter = function (evt)
    {
        var c;

        if (this._mouse_down) {
            c = this._get_relative_pos(evt || event);
            this._theremin.move(c[0], c[1]);
        }

        return true;
    };

    ThereminUI.prototype.handle_theremin_mouse_leave = function (evt)
    {
        var c;

        if (this._mouse_down) {
            c = this._get_relative_pos(evt || event);
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

        if (0 < ct.length) {
            this._ongoing_touch = ct[0].identifier;
            c = this._get_relative_pos(ct[0]);
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
                c = this._get_relative_pos(t);
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
                c = this._get_relative_pos(t);
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
        "p1": "Blank",
        "p2": "Saw Pluck - Fat Saw",
        "p3": "Fat Saw - Saw Pluck",
        "p4": "Soft Piano - Organ",
        "p5": "Organ - Soft Piano",
        "p6": "Xylophone - Twinkle Harmonica",
        "p7": "Twinkle Harmonica - Xylophone"
    };
    presets = {
        "p1": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
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
            "cmp_md": ["m1", "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.02, "none"],
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
            "cmp_o1_es": [0.7, "none"],
            "cmp_o1_fd": [0, "none"],
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
            "cmp_o1_vl": [0.5, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["sawtooth", "none"],
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
            "cmp_o2_fd": [0, "none"],
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
            "cmp_o2_vl": [0.5, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["square", "none"],
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
            "lfo1_f": [2, "none"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0, "none"],
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
            "mcs10_in": [0, "none"],
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0, "none"],
            "mcs1_ma": [1, "none"],
            "mcs1_mi": [0, "none"],
            "mcs1_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0, "none"],
            "mcs2_ma": [1, "none"],
            "mcs2_mi": [0, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0, "none"],
            "mcs3_ma": [1, "none"],
            "mcs3_mi": [0, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0, "none"],
            "mcs4_ma": [1, "none"],
            "mcs4_mi": [0, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0, "none"],
            "mcs5_ma": [1, "none"],
            "mcs5_mi": [0, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0, "none"],
            "mcs6_ma": [1, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
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
            "midi_md": ["m1", "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.02, "none"],
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
            "midi_o1_es": [0.7, "none"],
            "midi_o1_fd": [0, "none"],
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
            "midi_o1_vl": [0.5, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["sawtooth", "none"],
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
            "midi_o2_fd": [0, "none"],
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
            "midi_o2_vl": [0.5, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["square", "none"],
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
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
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
            "th_vl": [0.5, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sine", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p2": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
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
            "cmp_md": ["m1", "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.001, "none"],
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
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["on", "none"],
            "cmp_o1_lf": [2382.587401574803, "mcs5"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [0.5, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["sawtooth", "none"],
            "cmp_o2_dt": [-12, "none"],
            "cmp_o2_ea": [0.003, "none"],
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
            "cmp_o2_vl": [0.5, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["sine", "none"],
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
            "lfo1_f": [4.031610236220471, "mcs4"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.501, "mcs1"],
            "lfo1_rn": [0.02, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.0775, "mcs3"],
            "lfo2_f": [4.031610236220471, "mcs4"],
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
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.5, "pitch"],
            "mcs1_ma": [1, "none"],
            "mcs1_mi": [0.002, "none"],
            "mcs1_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "pitch"],
            "mcs2_ma": [0.998, "none"],
            "mcs2_mi": [0, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.25, "mod"],
            "mcs3_ma": [0.28, "none"],
            "mcs3_mi": [0.01, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.47244094488188976, "note"],
            "mcs4_ma": [0.37, "none"],
            "mcs4_mi": [0.05, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.47244094488188976, "vrtnote"],
            "mcs5_ma": [0.16, "none"],
            "mcs5_mi": [0.06, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0, "none"],
            "mcs6_ma": [1, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
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
            "midi_md": ["m1", "none"],
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
            "midi_o1_vl": [0.5, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["sawtooth", "none"],
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
            "midi_o2_vl": [0.5, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["sawtooth", "none"],
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
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_l_st": ["on", "none"],
            "th_lf": [4401, "none"],
            "th_lq": [1, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
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
            "th_vl": [0.5, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sawtooth", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p3": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
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
            "cmp_md": ["m1", "none"],
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
            "cmp_o1_vl": [0.5, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.2, "none"],
            "cmp_o1_wf": ["sawtooth", "none"],
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
            "cmp_o2_vl": [0.5, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.2, "none"],
            "cmp_o2_wf": ["sawtooth", "none"],
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
            "lfo1_f": [4.031610236220471, "mcs4"],
            "lfo1_ma": [1, "none"],
            "lfo1_mi": [0.501, "mcs1"],
            "lfo1_rn": [0.02, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.0775, "mcs3"],
            "lfo2_f": [4.031610236220471, "mcs4"],
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
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.5, "vrt2"],
            "mcs1_ma": [1, "none"],
            "mcs1_mi": [0.002, "none"],
            "mcs1_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.5, "vrt2"],
            "mcs2_ma": [0.998, "none"],
            "mcs2_mi": [0, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.25, "vrt3"],
            "mcs3_ma": [0.28, "none"],
            "mcs3_mi": [0.01, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.47244094488188976, "vrtnote"],
            "mcs4_ma": [0.37, "none"],
            "mcs4_mi": [0.05, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.47244094488188976, "note"],
            "mcs5_ma": [0.16, "none"],
            "mcs5_mi": [0.06, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0, "none"],
            "mcs6_ma": [1, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
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
            "midi_md": ["m1", "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.001, "none"],
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
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["on", "none"],
            "midi_o1_lf": [2382.587401574803, "mcs5"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [0.5, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.2, "none"],
            "midi_o1_wf": ["sawtooth", "none"],
            "midi_o2_dt": [-12, "none"],
            "midi_o2_ea": [0.003, "none"],
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
            "midi_o2_vl": [0.5, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.2, "none"],
            "midi_o2_wf": ["sine", "none"],
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
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_l_st": ["on", "none"],
            "th_lf": [4401, "none"],
            "th_lq": [1, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
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
            "th_vl": [0.5, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sawtooth", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p4": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
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
            "cmp_md": ["m1", "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.002, "none"],
            "cmp_o1_ed": [3.9160933070866144, "mcs1"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.1, "none"],
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
            "cmp_o1_es": [0.1, "none"],
            "cmp_o1_fd": [0, "vrt2"],
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
            "cmp_o1_vl": [0.7, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.3, "none"],
            "cmp_o1_wf": ["sine", "none"],
            "cmp_o2_dt": [19, "none"],
            "cmp_o2_ea": [0.001, "none"],
            "cmp_o2_ed": [2.9913518110236224, "mcs2"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.1, "none"],
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
            "cmp_o2_elat": [1.023, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [3.239, "none"],
            "cmp_o2_elht": [0, "none"],
            "cmp_o2_elif": [6686.243307086615, "mcs3"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [5250.303622047244, "mcs4"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [1522, "none"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [1772, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.1, "none"],
            "cmp_o2_es": [0.05, "none"],
            "cmp_o2_fd": [0, "vrt2"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [4276, "none"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [0.3, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.3, "none"],
            "cmp_o2_wf": ["sine", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-6, "none"],
            "cmp_rev_dry": [0.6, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.8, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.18, "none"],
            "cmp_rev_wet": [0.1, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.09, "mcs6"],
            "lfo1_f": [5.470260629921259, "mcs5"],
            "lfo1_ma": [0.16, "none"],
            "lfo1_mi": [0.045, "none"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.09, "mcs6"],
            "lfo2_f": [5.470260629921259, "mcs5"],
            "lfo2_ma": [0.45, "none"],
            "lfo2_mi": [0.12, "none"],
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
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.47244094488188976, "vrtnote"],
            "mcs1_ma": [0.05, "none"],
            "mcs1_mi": [0.45, "none"],
            "mcs1_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.47244094488188976, "vrtnote"],
            "mcs2_ma": [0.02, "none"],
            "mcs2_mi": [0.36, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.47244094488188976, "vrtnote"],
            "mcs3_ma": [0.54, "none"],
            "mcs3_mi": [0.09, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.47244094488188976, "vrtnote"],
            "mcs4_ma": [0.44, "none"],
            "mcs4_mi": [0.056, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.47244094488188976, "note"],
            "mcs5_ma": [0.5, "none"],
            "mcs5_mi": [0.07, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0.25, "mod"],
            "mcs6_ma": [0.33, "none"],
            "mcs6_mi": [0.01, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
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
            "midi_md": ["m1", "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.035, "none"],
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
            "midi_o1_es": [0.7, "none"],
            "midi_o1_fd": [0, "pitch"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["on", "none"],
            "midi_o1_lf": [3024, "lfo1"],
            "midi_o1_lq": [1, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [0.4, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.32, "none"],
            "midi_o1_wf": ["square", "none"],
            "midi_o2_dt": [19, "none"],
            "midi_o2_ea": [0.035, "none"],
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
            "midi_o2_fd": [0, "pitch"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["on", "none"],
            "midi_o2_lf": [22050, "lfo2"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [0.3, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.32, "none"],
            "midi_o2_wf": ["square", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-9, "none"],
            "midi_rev_dry": [0.7, "none"],
            "midi_rev_hpf": [60, "none"],
            "midi_rev_rsz": [0.9, "none"],
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
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
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
            "th_vl": [0.5, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sine", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p5": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
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
            "cmp_md": ["m1", "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.035, "none"],
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
            "cmp_o1_es": [0.7, "none"],
            "cmp_o1_fd": [0, "vrt2"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["on", "none"],
            "cmp_o1_lf": [3024, "lfo1"],
            "cmp_o1_lq": [1, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [0.4, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.32, "none"],
            "cmp_o1_wf": ["square", "none"],
            "cmp_o2_dt": [19, "none"],
            "cmp_o2_ea": [0.035, "none"],
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
            "cmp_o2_fd": [0, "vrt2"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["on", "none"],
            "cmp_o2_lf": [22050, "lfo2"],
            "cmp_o2_lq": [1, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [0.3, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [0.32, "none"],
            "cmp_o2_wf": ["square", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-9, "none"],
            "cmp_rev_dry": [0.7, "none"],
            "cmp_rev_hpf": [60, "none"],
            "cmp_rev_rsz": [0.9, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.16, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [0.09, "mcs6"],
            "lfo1_f": [5.470260629921259, "mcs5"],
            "lfo1_ma": [0.16, "none"],
            "lfo1_mi": [0.045, "none"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.09, "mcs6"],
            "lfo2_f": [5.470260629921259, "mcs5"],
            "lfo2_ma": [0.45, "none"],
            "lfo2_mi": [0.12, "none"],
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
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0.47244094488188976, "note"],
            "mcs1_ma": [0.05, "none"],
            "mcs1_mi": [0.45, "none"],
            "mcs1_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.47244094488188976, "note"],
            "mcs2_ma": [0.02, "none"],
            "mcs2_mi": [0.36, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.47244094488188976, "note"],
            "mcs3_ma": [0.54, "none"],
            "mcs3_mi": [0.09, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.47244094488188976, "note"],
            "mcs4_ma": [0.44, "none"],
            "mcs4_mi": [0.056, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.47244094488188976, "vrtnote"],
            "mcs5_ma": [0.5, "none"],
            "mcs5_mi": [0.07, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0.25, "vrt3"],
            "mcs6_ma": [0.33, "none"],
            "mcs6_mi": [0.01, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
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
            "midi_md": ["m1", "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.002, "none"],
            "midi_o1_ed": [3.9160933070866144, "mcs1"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.1, "none"],
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
            "midi_o1_es": [0.1, "none"],
            "midi_o1_fd": [0, "pitch"],
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
            "midi_o1_vl": [0.7, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.3, "none"],
            "midi_o1_wf": ["sine", "none"],
            "midi_o2_dt": [19, "none"],
            "midi_o2_ea": [0.001, "none"],
            "midi_o2_ed": [2.9913518110236224, "mcs2"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.1, "none"],
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
            "midi_o2_elat": [1.023, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [3.239, "none"],
            "midi_o2_elht": [0, "none"],
            "midi_o2_elif": [6686.243307086615, "mcs3"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [5250.303622047244, "mcs4"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [1522, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [1772, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.1, "none"],
            "midi_o2_es": [0.05, "none"],
            "midi_o2_fd": [0, "pitch"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [4276, "none"],
            "midi_o2_lq": [1, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [0.3, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [0.3, "none"],
            "midi_o2_wf": ["sine", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-6, "none"],
            "midi_rev_dry": [0.6, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.8, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.18, "none"],
            "midi_rev_wet": [0.1, "none"],
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
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
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
            "th_vl": [0.5, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sine", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        },
        "p6": {
            "ckb_trg": ["comp", "none"],
            "cmp_avl": [0.5, "none"],
            "cmp_ech_df": [6000, "none"],
            "cmp_ech_dg": [-6, "none"],
            "cmp_ech_dly": [0.416, "none"],
            "cmp_ech_dry": [0.8, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.75, "none"],
            "cmp_ech_st": ["on", "none"],
            "cmp_ech_w": [0.5, "none"],
            "cmp_ech_wet": [0.2, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_dt": [0, "none"],
            "cmp_o1_ea": [0.001, "none"],
            "cmp_o1_ed": [2.455, "none"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.136, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.3, "none"],
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
            "cmp_o1_eldt": [0.3, "none"],
            "cmp_o1_elht": [0.3, "none"],
            "cmp_o1_elif": [22050, "none"],
            "cmp_o1_elo": ["off", "none"],
            "cmp_o1_elpf": [22050, "none"],
            "cmp_o1_elq": [1, "none"],
            "cmp_o1_elrf": [22050, "none"],
            "cmp_o1_elrt": [0.1, "none"],
            "cmp_o1_elsf": [22050, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.341, "none"],
            "cmp_o1_es": [0.1, "none"],
            "cmp_o1_fd": [0, "vrt2"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["off", "none"],
            "cmp_o1_lf": [22050, "none"],
            "cmp_o1_lq": [0.74, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0.01, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [0.6, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [1, "none"],
            "cmp_o1_wf": ["sine", "none"],
            "cmp_o2_dt": [19, "none"],
            "cmp_o2_ea": [0.001, "none"],
            "cmp_o2_ed": [1.637, "none"],
            "cmp_o2_edl": [0, "none"],
            "cmp_o2_eh": [0.25, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.3, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.205, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [1.228, "none"],
            "cmp_o2_elht": [0.136, "none"],
            "cmp_o2_elif": [1272, "none"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [4025, "none"],
            "cmp_o2_elq": [1, "none"],
            "cmp_o2_elrf": [1272, "none"],
            "cmp_o2_elrt": [0.341, "none"],
            "cmp_o2_elsf": [2523, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.341, "none"],
            "cmp_o2_es": [0.1, "none"],
            "cmp_o2_fd": [0, "vrt2"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["off", "none"],
            "cmp_o2_lf": [22050, "none"],
            "cmp_o2_lq": [0.75, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0.01, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [0.3, "none"],
            "cmp_o2_vs": [0, "none"],
            "cmp_o2_wd": [1, "none"],
            "cmp_o2_wf": ["triangle", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-9, "none"],
            "cmp_rev_dry": [0.9, "none"],
            "cmp_rev_hpf": [100, "none"],
            "cmp_rev_rsz": [0.8, "none"],
            "cmp_rev_st": ["off", "none"],
            "cmp_rev_w": [-0.25, "none"],
            "cmp_rev_wet": [0.1, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [1, "none"],
            "lfo1_f": [0.32, "none"],
            "lfo1_ma": [0.17866141732283464, "mcs2"],
            "lfo1_mi": [0.06, "none"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.10700000000000001, "mcs3"],
            "lfo2_f": [4.464464566929133, "mcs4"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0.5, "pitch"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [0.10700000000000001, "mcs3"],
            "lfo3_f": [4.464464566929133, "mcs4"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0.5, "pitch"],
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
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0, "none"],
            "mcs1_ma": [1, "none"],
            "mcs1_mi": [0, "none"],
            "mcs1_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.47244094488188976, "note"],
            "mcs2_ma": [0.3, "none"],
            "mcs2_mi": [0.07, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.25, "mod"],
            "mcs3_ma": [0.32, "none"],
            "mcs3_mi": [0.036, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.47244094488188976, "note"],
            "mcs4_ma": [0.36, "none"],
            "mcs4_mi": [0.1, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.47244094488188976, "note"],
            "mcs5_ma": [0.0227, "none"],
            "mcs5_mi": [0.25, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0, "none"],
            "mcs6_ma": [1, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_ech_df": [6000, "none"],
            "midi_ech_dg": [-9, "none"],
            "midi_ech_dly": [0.208, "none"],
            "midi_ech_dry": [0.8, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.8, "none"],
            "midi_ech_st": ["on", "none"],
            "midi_ech_w": [0.5, "none"],
            "midi_ech_wet": [0.2, "none"],
            "midi_fvl": [5, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_dt": [12, "none"],
            "midi_o1_ea": [0.18, "none"],
            "midi_o1_ed": [2.045, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.545, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.3, "none"],
            "midi_o1_ehht": [0.3, "none"],
            "midi_o1_ehif": [20, "none"],
            "midi_o1_eho": ["off", "none"],
            "midi_o1_ehpf": [20, "none"],
            "midi_o1_ehq": [1, "none"],
            "midi_o1_ehrf": [20, "none"],
            "midi_o1_ehrt": [0.1, "none"],
            "midi_o1_ehsf": [20, "none"],
            "midi_o1_elat": [1.295, "none"],
            "midi_o1_eldlt": [0, "none"],
            "midi_o1_eldt": [1.774, "none"],
            "midi_o1_elht": [0.136, "none"],
            "midi_o1_elif": [1021, "none"],
            "midi_o1_elo": ["on", "none"],
            "midi_o1_elpf": [8031, "none"],
            "midi_o1_elq": [0.45, "none"],
            "midi_o1_elrf": [1021, "none"],
            "midi_o1_elrt": [0.341, "none"],
            "midi_o1_elsf": [4025, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.545, "none"],
            "midi_o1_es": [0.5, "none"],
            "midi_o1_fd": [0, "lfo2"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["on", "none"],
            "midi_o1_lf": [3955.911023622047, "mcs2"],
            "midi_o1_lq": [0.8, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0.05, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [0.5, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [0.35, "none"],
            "midi_o1_wf": ["square", "none"],
            "midi_o2_dt": [31, "none"],
            "midi_o2_ea": [0.001, "none"],
            "midi_o2_ed": [2.1400699842519684, "mcs5"],
            "midi_o2_edl": [0.001, "none"],
            "midi_o2_eh": [0.273, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.3, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.545, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [1.637, "none"],
            "midi_o2_elht": [0.3, "none"],
            "midi_o2_elif": [1522, "none"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [6028, "none"],
            "midi_o2_elq": [0.45, "none"],
            "midi_o2_elrf": [1522, "none"],
            "midi_o2_elrt": [0.1, "none"],
            "midi_o2_elsf": [2523, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.613, "none"],
            "midi_o2_es": [0.1, "none"],
            "midi_o2_fd": [0, "lfo3"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["on", "none"],
            "midi_o2_lf": [3955.911023622047, "mcs2"],
            "midi_o2_lq": [0.8, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [0.5, "none"],
            "midi_o2_vs": [0.6, "none"],
            "midi_o2_wd": [0.35, "none"],
            "midi_o2_wf": ["sine", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-7.5, "none"],
            "midi_rev_dry": [0.9, "none"],
            "midi_rev_hpf": [110, "none"],
            "midi_rev_rsz": [0.93, "none"],
            "midi_rev_st": ["on", "none"],
            "midi_rev_w": [-0.375, "none"],
            "midi_rev_wet": [0.1, "none"],
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
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
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
            "th_vl": [0.5, "none"],
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
            "cmp_avl": [0.5, "none"],
            "cmp_ech_df": [6000, "none"],
            "cmp_ech_dg": [-9, "none"],
            "cmp_ech_dly": [0.208, "none"],
            "cmp_ech_dry": [0.8, "none"],
            "cmp_ech_hpf": [100, "none"],
            "cmp_ech_rsz": [0.8, "none"],
            "cmp_ech_st": ["on", "none"],
            "cmp_ech_w": [0.5, "none"],
            "cmp_ech_wet": [0.2, "none"],
            "cmp_fvl": [5, "none"],
            "cmp_md": ["m1", "none"],
            "cmp_o1_dt": [12, "none"],
            "cmp_o1_ea": [0.18, "none"],
            "cmp_o1_ed": [2.045, "none"],
            "cmp_o1_edl": [0, "none"],
            "cmp_o1_eh": [0.545, "none"],
            "cmp_o1_ehat": [0.02, "none"],
            "cmp_o1_ehdlt": [0, "none"],
            "cmp_o1_ehdt": [0.3, "none"],
            "cmp_o1_ehht": [0.3, "none"],
            "cmp_o1_ehif": [20, "none"],
            "cmp_o1_eho": ["off", "none"],
            "cmp_o1_ehpf": [20, "none"],
            "cmp_o1_ehq": [1, "none"],
            "cmp_o1_ehrf": [20, "none"],
            "cmp_o1_ehrt": [0.1, "none"],
            "cmp_o1_ehsf": [20, "none"],
            "cmp_o1_elat": [1.295, "none"],
            "cmp_o1_eldlt": [0, "none"],
            "cmp_o1_eldt": [1.774, "none"],
            "cmp_o1_elht": [0.136, "none"],
            "cmp_o1_elif": [1021, "none"],
            "cmp_o1_elo": ["on", "none"],
            "cmp_o1_elpf": [8031, "none"],
            "cmp_o1_elq": [0.45, "none"],
            "cmp_o1_elrf": [1021, "none"],
            "cmp_o1_elrt": [0.341, "none"],
            "cmp_o1_elsf": [4025, "none"],
            "cmp_o1_ep": [1, "none"],
            "cmp_o1_er": [0.545, "none"],
            "cmp_o1_es": [0.5, "none"],
            "cmp_o1_fd": [0, "lfo2"],
            "cmp_o1_h_st": ["off", "none"],
            "cmp_o1_hf": [20, "none"],
            "cmp_o1_hq": [1, "none"],
            "cmp_o1_l_st": ["on", "none"],
            "cmp_o1_lf": [3955.911023622047, "mcs2"],
            "cmp_o1_lq": [0.8, "none"],
            "cmp_o1_pn": [0, "none"],
            "cmp_o1_prd": [0, "none"],
            "cmp_o1_prt": [0.05, "none"],
            "cmp_o1_v": [1, "none"],
            "cmp_o1_vl": [0.5, "none"],
            "cmp_o1_vs": [0, "none"],
            "cmp_o1_wd": [0.35, "none"],
            "cmp_o1_wf": ["square", "none"],
            "cmp_o2_dt": [31, "none"],
            "cmp_o2_ea": [0.001, "none"],
            "cmp_o2_ed": [2.1400699842519684, "mcs5"],
            "cmp_o2_edl": [0.001, "none"],
            "cmp_o2_eh": [0.273, "none"],
            "cmp_o2_ehat": [0.02, "none"],
            "cmp_o2_ehdlt": [0, "none"],
            "cmp_o2_ehdt": [0.3, "none"],
            "cmp_o2_ehht": [0.3, "none"],
            "cmp_o2_ehif": [20, "none"],
            "cmp_o2_eho": ["off", "none"],
            "cmp_o2_ehpf": [20, "none"],
            "cmp_o2_ehq": [1, "none"],
            "cmp_o2_ehrf": [20, "none"],
            "cmp_o2_ehrt": [0.1, "none"],
            "cmp_o2_ehsf": [20, "none"],
            "cmp_o2_elat": [0.545, "none"],
            "cmp_o2_eldlt": [0, "none"],
            "cmp_o2_eldt": [1.637, "none"],
            "cmp_o2_elht": [0.3, "none"],
            "cmp_o2_elif": [1522, "none"],
            "cmp_o2_elo": ["on", "none"],
            "cmp_o2_elpf": [6028, "none"],
            "cmp_o2_elq": [0.45, "none"],
            "cmp_o2_elrf": [1522, "none"],
            "cmp_o2_elrt": [0.1, "none"],
            "cmp_o2_elsf": [2523, "none"],
            "cmp_o2_ep": [1, "none"],
            "cmp_o2_er": [0.613, "none"],
            "cmp_o2_es": [0.1, "none"],
            "cmp_o2_fd": [0, "lfo3"],
            "cmp_o2_h_st": ["off", "none"],
            "cmp_o2_hf": [20, "none"],
            "cmp_o2_hq": [1, "none"],
            "cmp_o2_l_st": ["on", "none"],
            "cmp_o2_lf": [3955.911023622047, "mcs2"],
            "cmp_o2_lq": [0.8, "none"],
            "cmp_o2_pn": [0, "none"],
            "cmp_o2_prd": [0, "none"],
            "cmp_o2_prt": [0, "none"],
            "cmp_o2_v": [1, "none"],
            "cmp_o2_vl": [0.5, "none"],
            "cmp_o2_vs": [0.6, "none"],
            "cmp_o2_wd": [0.35, "none"],
            "cmp_o2_wf": ["sine", "none"],
            "cmp_rev_df": [6000, "none"],
            "cmp_rev_dg": [-7.5, "none"],
            "cmp_rev_dry": [0.9, "none"],
            "cmp_rev_hpf": [110, "none"],
            "cmp_rev_rsz": [0.93, "none"],
            "cmp_rev_st": ["on", "none"],
            "cmp_rev_w": [-0.375, "none"],
            "cmp_rev_wet": [0.1, "none"],
            "cmp_vl": [0.5, "vrt1"],
            "lfo1_am": [1, "none"],
            "lfo1_f": [0.32, "none"],
            "lfo1_ma": [0.17866141732283464, "mcs2"],
            "lfo1_mi": [0.06, "none"],
            "lfo1_rn": [0, "none"],
            "lfo1_wf": ["sine", "none"],
            "lfo2_am": [0.10700000000000001, "mcs3"],
            "lfo2_f": [4.464464566929133, "mcs4"],
            "lfo2_ma": [1, "none"],
            "lfo2_mi": [0.5, "vrt2"],
            "lfo2_rn": [0, "none"],
            "lfo2_wf": ["sine", "none"],
            "lfo3_am": [0.10700000000000001, "mcs3"],
            "lfo3_f": [4.464464566929133, "mcs4"],
            "lfo3_ma": [1, "none"],
            "lfo3_mi": [0.5, "vrt2"],
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
            "mcs10_ma": [1, "none"],
            "mcs10_mi": [0, "none"],
            "mcs10_rn": [0, "none"],
            "mcs11_am": [1, "none"],
            "mcs11_in": [0, "none"],
            "mcs11_ma": [1, "none"],
            "mcs11_mi": [0, "none"],
            "mcs11_rn": [0, "none"],
            "mcs12_am": [1, "none"],
            "mcs12_in": [0, "none"],
            "mcs12_ma": [1, "none"],
            "mcs12_mi": [0, "none"],
            "mcs12_rn": [0, "none"],
            "mcs13_am": [1, "none"],
            "mcs13_in": [0, "none"],
            "mcs13_ma": [1, "none"],
            "mcs13_mi": [0, "none"],
            "mcs13_rn": [0, "none"],
            "mcs14_am": [1, "none"],
            "mcs14_in": [0, "none"],
            "mcs14_ma": [1, "none"],
            "mcs14_mi": [0, "none"],
            "mcs14_rn": [0, "none"],
            "mcs15_am": [1, "none"],
            "mcs15_in": [0, "none"],
            "mcs15_ma": [1, "none"],
            "mcs15_mi": [0, "none"],
            "mcs15_rn": [0, "none"],
            "mcs16_am": [1, "none"],
            "mcs16_in": [0, "none"],
            "mcs16_ma": [1, "none"],
            "mcs16_mi": [0, "none"],
            "mcs16_rn": [0, "none"],
            "mcs1_am": [1, "none"],
            "mcs1_in": [0, "none"],
            "mcs1_ma": [1, "none"],
            "mcs1_mi": [0, "none"],
            "mcs1_rn": [0, "none"],
            "mcs2_am": [1, "none"],
            "mcs2_in": [0.47244094488188976, "vrtnote"],
            "mcs2_ma": [0.3, "none"],
            "mcs2_mi": [0.07, "none"],
            "mcs2_rn": [0, "none"],
            "mcs3_am": [1, "none"],
            "mcs3_in": [0.25, "vrt3"],
            "mcs3_ma": [0.32, "none"],
            "mcs3_mi": [0.036, "none"],
            "mcs3_rn": [0, "none"],
            "mcs4_am": [1, "none"],
            "mcs4_in": [0.47244094488188976, "vrtnote"],
            "mcs4_ma": [0.36, "none"],
            "mcs4_mi": [0.1, "none"],
            "mcs4_rn": [0, "none"],
            "mcs5_am": [1, "none"],
            "mcs5_in": [0.47244094488188976, "vrtnote"],
            "mcs5_ma": [0.0227, "none"],
            "mcs5_mi": [0.25, "none"],
            "mcs5_rn": [0, "none"],
            "mcs6_am": [1, "none"],
            "mcs6_in": [0, "none"],
            "mcs6_ma": [1, "none"],
            "mcs6_mi": [0, "none"],
            "mcs6_rn": [0, "none"],
            "mcs7_am": [1, "none"],
            "mcs7_in": [0, "none"],
            "mcs7_ma": [1, "none"],
            "mcs7_mi": [0, "none"],
            "mcs7_rn": [0, "none"],
            "mcs8_am": [1, "none"],
            "mcs8_in": [0, "none"],
            "mcs8_ma": [1, "none"],
            "mcs8_mi": [0, "none"],
            "mcs8_rn": [0, "none"],
            "mcs9_am": [1, "none"],
            "mcs9_in": [0, "none"],
            "mcs9_ma": [1, "none"],
            "mcs9_mi": [0, "none"],
            "mcs9_rn": [0, "none"],
            "midi_avl": [0.5, "none"],
            "midi_ech_df": [6000, "none"],
            "midi_ech_dg": [-6, "none"],
            "midi_ech_dly": [0.416, "none"],
            "midi_ech_dry": [0.8, "none"],
            "midi_ech_hpf": [100, "none"],
            "midi_ech_rsz": [0.75, "none"],
            "midi_ech_st": ["on", "none"],
            "midi_ech_w": [0.5, "none"],
            "midi_ech_wet": [0.2, "none"],
            "midi_fvl": [5, "none"],
            "midi_md": ["m1", "none"],
            "midi_o1_dt": [0, "none"],
            "midi_o1_ea": [0.001, "none"],
            "midi_o1_ed": [2.455, "none"],
            "midi_o1_edl": [0, "none"],
            "midi_o1_eh": [0.136, "none"],
            "midi_o1_ehat": [0.02, "none"],
            "midi_o1_ehdlt": [0, "none"],
            "midi_o1_ehdt": [0.3, "none"],
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
            "midi_o1_eldt": [0.3, "none"],
            "midi_o1_elht": [0.3, "none"],
            "midi_o1_elif": [22050, "none"],
            "midi_o1_elo": ["off", "none"],
            "midi_o1_elpf": [22050, "none"],
            "midi_o1_elq": [1, "none"],
            "midi_o1_elrf": [22050, "none"],
            "midi_o1_elrt": [0.1, "none"],
            "midi_o1_elsf": [22050, "none"],
            "midi_o1_ep": [1, "none"],
            "midi_o1_er": [0.341, "none"],
            "midi_o1_es": [0.1, "none"],
            "midi_o1_fd": [0, "pitch"],
            "midi_o1_h_st": ["off", "none"],
            "midi_o1_hf": [20, "none"],
            "midi_o1_hq": [1, "none"],
            "midi_o1_l_st": ["off", "none"],
            "midi_o1_lf": [22050, "none"],
            "midi_o1_lq": [0.74, "none"],
            "midi_o1_pn": [0, "none"],
            "midi_o1_prd": [0, "none"],
            "midi_o1_prt": [0.01, "none"],
            "midi_o1_v": [1, "none"],
            "midi_o1_vl": [0.6, "none"],
            "midi_o1_vs": [0, "none"],
            "midi_o1_wd": [1, "none"],
            "midi_o1_wf": ["sine", "none"],
            "midi_o2_dt": [19, "none"],
            "midi_o2_ea": [0.001, "none"],
            "midi_o2_ed": [1.637, "none"],
            "midi_o2_edl": [0, "none"],
            "midi_o2_eh": [0.25, "none"],
            "midi_o2_ehat": [0.02, "none"],
            "midi_o2_ehdlt": [0, "none"],
            "midi_o2_ehdt": [0.3, "none"],
            "midi_o2_ehht": [0.3, "none"],
            "midi_o2_ehif": [20, "none"],
            "midi_o2_eho": ["off", "none"],
            "midi_o2_ehpf": [20, "none"],
            "midi_o2_ehq": [1, "none"],
            "midi_o2_ehrf": [20, "none"],
            "midi_o2_ehrt": [0.1, "none"],
            "midi_o2_ehsf": [20, "none"],
            "midi_o2_elat": [0.205, "none"],
            "midi_o2_eldlt": [0, "none"],
            "midi_o2_eldt": [1.228, "none"],
            "midi_o2_elht": [0.136, "none"],
            "midi_o2_elif": [1272, "none"],
            "midi_o2_elo": ["on", "none"],
            "midi_o2_elpf": [4025, "none"],
            "midi_o2_elq": [1, "none"],
            "midi_o2_elrf": [1272, "none"],
            "midi_o2_elrt": [0.341, "none"],
            "midi_o2_elsf": [2523, "none"],
            "midi_o2_ep": [1, "none"],
            "midi_o2_er": [0.341, "none"],
            "midi_o2_es": [0.1, "none"],
            "midi_o2_fd": [0, "pitch"],
            "midi_o2_h_st": ["off", "none"],
            "midi_o2_hf": [20, "none"],
            "midi_o2_hq": [1, "none"],
            "midi_o2_l_st": ["off", "none"],
            "midi_o2_lf": [22050, "none"],
            "midi_o2_lq": [0.75, "none"],
            "midi_o2_pn": [0, "none"],
            "midi_o2_prd": [0, "none"],
            "midi_o2_prt": [0.01, "none"],
            "midi_o2_v": [1, "none"],
            "midi_o2_vl": [0.3, "none"],
            "midi_o2_vs": [0, "none"],
            "midi_o2_wd": [1, "none"],
            "midi_o2_wf": ["triangle", "none"],
            "midi_rev_df": [6000, "none"],
            "midi_rev_dg": [-9, "none"],
            "midi_rev_dry": [0.9, "none"],
            "midi_rev_hpf": [100, "none"],
            "midi_rev_rsz": [0.8, "none"],
            "midi_rev_st": ["off", "none"],
            "midi_rev_w": [-0.25, "none"],
            "midi_rev_wet": [0.1, "none"],
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
            "th_h_st": ["off", "none"],
            "th_hf": [20, "none"],
            "th_hq": [1, "none"],
            "th_l_st": ["off", "none"],
            "th_lf": [22050, "none"],
            "th_lq": [1, "none"],
            "th_max": [7040, "none"],
            "th_min": [110, "none"],
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
            "th_vl": [0.5, "none"],
            "th_wd": [0.2, "none"],
            "th_wf": ["sine", "none"],
            "vcp1": [0.5, "none"],
            "vcp2": [0.5, "none"],
            "vcp3": [0.5, "none"],
            "vcp4": [0.5, "none"],
            "vcp5": [0.5, "none"],
            "vrt_dt": [0, "none"]
        }
    };

}())