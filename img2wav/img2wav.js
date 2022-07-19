(function () {

    "use strict";

    var abs = Math.abs,
        max = Math.max,
        min = Math.min,
        sin = Math.sin,
        log = Math.log,
        floor = Math.floor,
        ceil = Math.ceil,
        round = Math.round,
        PI = Math.PI,

        TITLE = "Image to WAV",

        signed_24_bit_max = 8388607.0,
        channels = 2,
        wav_bytes_per_sample = 3,

        is_ready_to_generate = false,
        is_generating = false,

        batch_size = 100,

        image_input, image_display,
        sample_rate_input, length_input, invert_input, random_phase_input, contrast_input,
        lowest_freq_input, highest_freq_input,
        scale_type_input,
        generate_button, stop_button, download_button,
        listen, audio_cursor, image_cursor, problems_box,

        megabyte = 1024 * 1024,
        sample_rate = 22050.0,
        length = 2.0,
        lowest_freq = 55.0,
        highest_freq = 6000.0,
        invert, random_phase, contrast,
        pixel_to_amplitudes,
        scale_amplitudes,
        scale_type,

        img, img_col_1, img_col_2, img_col_1_x,
        img_canvas_ctx,
        name,
        width = 0,
        height = 0,

        samples, // [left_0, right_0, left_1, right_1, ...]
        n_sample_pairs,
        freq, // [2 * PI * f_1, 2 * PI_f_2, ...]
        amps,
        phase,
        normalizer,
        sample_index,

        progressbar_1, progressbar_2, waveform, waveform_ctx, progress_text,
        peaks, peak_length, peak_index, peak, peak_samples, highest_peak, peaks_drawn,
        avgs,
        waveform_width = 640,
        waveform_height = 480,

        x, y,

        wav_bytes, wav_bytes_pos;

    function format_number(n)
    {
        return String(round(n * 100) / 100);
    }

    function image_to_sound()
    {
        is_generating = true;
        ready(false);
        clear_waveform();
        initialize();
    }

    function clear_waveform()
    {
        waveform_ctx.clearRect(0, 0, waveform_width, waveform_height);
        audio_cursor.style.left = 0;
        image_cursor.style.left = 0;
    }

    function initialize()
    {
        var d, f, y, r;

        batch_size = max(10, floor(300000 / height));

        download_button.href = "#generating";
        download_button.download = null;
        download_button.setAttribute("class", "disabled");
        listen.src = null;

        n_sample_pairs = ceil(sample_rate * length),
        samples = new Float64Array(2 * n_sample_pairs),
        normalizer = 0.0;

        freq = new Float64Array(height);

        if (scale_type === "log") {
            d = log(highest_freq / lowest_freq) / log(2.0);

            for (y = 0; y < height; ++y) {
                f = lowest_freq * Math.pow(2.0, (d * (1.0 - y / height)));
                freq[y] = 2.0 * PI * f;
            }
        } else {
            d = highest_freq - lowest_freq;

            for (y = 0; y < height; ++y) {
                f = lowest_freq + d * (1.0 - y / height);
                freq[y] = 2.0 * PI * f;
            }
        }

        phase = new Float64Array(height);

        if (random_phase) {
            r = 1511;

            for (y = 0; y < height; ++y) {
                r = (r * r + r + y * 241 + 421) % 5003
                phase[y] = r / 797.0;
            }
        } else {
            for (y = 0; y < height; ++y) {
                phase[y] = 0.0;
            }
        }

        img_col_1_x = 0;
        img_col_1 = img_canvas_ctx.getImageData(0, 0, 1, height).data;
        img_col_2 = img_canvas_ctx.getImageData(1, 0, 1, height).data;

        peak_length = Math.floor(n_sample_pairs / waveform_width);
        peaks = new Float64Array(waveform_width);
        avgs = new Float64Array(waveform_width);
        peak = 0.0;
        highest_peak = 0.0;
        peak_index = 0;
        peak_samples = 0;
        peaks_drawn = 0;

        pixel_to_amplitudes = invert
            ? pixel_to_amplitudes_inverted
            : pixel_to_amplitudes_normal;

        scale_amplitudes = contrast
            ? scale_sqr
            : scale_normal;

        amps = [0, 0];
        sample_index = 0;

        progress(generate_samples, 0);
    }

    function progress(callback, task)
    {
        var progress, progress_percent, progress_width, i, norm, progress_display;

        progress = sample_index / n_sample_pairs;
        progress_percent = 100.0 * progress;
        progress_width = 90.0 * progress;
        progress_display = format_number(progress_percent) + "%";

        if (!is_generating) {
            return;
        }

        if (task === 0) {
            progress_text.innerText = "Generating samples: " + progress_display;
            progressbar_1.style.width = String(progress_width) + "vw";
            progressbar_2.style.width = "90vw";
            progressbar_2.style.left = "0";
            audio_cursor.style.left = String(progress_width) + "vw";
            image_cursor.style.left = String(progress_percent) + "%";
            document.title = "(" + progress_display + " samples) " + TITLE;
        } else {
            progress_text.innerText = "Building WAV file: " + format_number(progress_percent) + "%";
            progressbar_2.style.width = String(90.0 - progress_width) + "vw";
            progressbar_2.style.left = String(progress_width) + "vw";
            document.title = "(" + progress_display + " WAV) " + TITLE;
        }

        norm = highest_peak > 0.0 ? highest_peak : 1.0;

        if (peaks_drawn < peak_index) {
            waveform_ctx.clearRect(peaks_drawn, 0, peak_index - peaks_drawn, waveform_height);

            for (i = peaks_drawn; i < peak_index; ++i) {
                draw_wave(i, peaks[i] / norm, "#88e");
                draw_wave(i, avgs[i] / norm, "#22b");
            }

            peaks_drawn = peak_index;
        }

        setTimeout(callback, 10);
    }

    function draw_wave(x, height, color)
    {
        var t;

        height = max(3, round(waveform_height * height));
        t = round((waveform_height - height) / 2);

        waveform_ctx.strokeStyle = color;
        waveform_ctx.beginPath();
        waveform_ctx.moveTo(x, t);
        waveform_ctx.lineTo(x, t + height)
        waveform_ctx.closePath();
        waveform_ctx.stroke();
    }

    function generate_samples()
    {
        var l, t, ix, a, sl, sr, sn, n, asl, asr, asm, p;

        if (!is_generating) {
            return;
        }

        if (sample_index >= n_sample_pairs) {
            if (normalizer <= 0.0) {
                normalizer = 1.0;
            }

            open_wav_file();
            return;
        }

        l = min(n_sample_pairs, sample_index + batch_size);

        for (; sample_index < l; ++sample_index, ++peak_samples) {
            t = sample_index / sample_rate;
            a = sample_index / n_sample_pairs;
            x = a * width;
            ix = floor(x) ^ 0;

            if (ix !== img_col_1_x) {
                img_col_1 = img_col_2;
                img_col_1_x = ix;

                if (ix < width) {
                    img_col_2 = img_canvas_ctx.getImageData(ix, 0, 1, height).data;
                } else {
                    img_col_2 = null;
                }
            }

            sl = sr = 0.0;

            for (y = 0; y < height; ++y) {
                pixel_to_amplitudes();
                scale_amplitudes();

                if ((amps[0] + amps[1]) > 0) {
                    sn = sin(freq[y] * t + phase[y]);

                    sl += amps[0] * sn;
                    sr += amps[1] * sn;
                }
            }

            n = 2 * sample_index;

            samples[n] = sl;
            samples[n + 1] = sr;

            asl = abs(sl);
            asr = abs(sr);
            asm = asl + asr;

            normalizer = max(normalizer, asl, asr);
            peak = max(peak, asm);

            avgs[peak_index] += asm;

            if (peak_samples >= peak_length) {
                if (peak > highest_peak) {
                    peaks_drawn = 0;
                    highest_peak = peak;
                }

                avgs[peak_index] /= max(1, peak_length);
                peaks[peak_index++] = peak;
                peak = 0.0;
                peak_samples = 0;
            }
        }

        progress(generate_samples, 0);
    }

    function scale_normal()
    {
    }

    function scale_sqr()
    {
        amps[0] = amps[0] * amps[0];
        amps[1] = amps[1] * amps[1];
    }

    function pixel_to_amplitudes_inverted()
    {
        pixel_to_amplitudes_normal();
        amps[0] = 1.0 - amps[0];
        amps[1] = 1.0 - amps[1];
    }

    function pixel_to_amplitudes_normal()
    {
        var red_i = y * 4,
            green_i = red_i + 1,
            blue_i = red_i + 2,
            red_1 = img_col_1[red_i],
            green_1 = img_col_1[green_i],
            blue_1 = img_col_1[blue_i],
            left_1 = red_1 + blue_1,
            right_1 = green_1 + blue_1,
            a = x - img_col_1_x,
            oma = 1.0 - a,
            red_2, green_2, blue_2, left_2, right_2;

        if (img_col_2) {
            red_2 = img_col_2[red_i];
            green_2 = img_col_2[green_i];
            blue_2 = img_col_2[blue_i];
            left_2 = red_2 + blue_2;
            right_2 = green_2 + blue_2;

            amps[0] = (left_1 * oma + left_2 * a) / 510.0;
            amps[1] = (right_1 * oma + right_2 * a) / 510.0;
        } else {
            amps[0] = (left_1 * oma) / 510.0;
            amps[1] = (right_1 * oma) / 510.0;
        }
    }

    function open_wav_file()
    {
        var data_size = channels * n_sample_pairs * wav_bytes_per_sample,

            riff_id = 0x46464952, // "RIFF"
            riff_size = 36 + data_size,
            wave = 0x45564157, // "WAVE"

            format_id = 0x20746d66, // "fmt "
            format_size = 16,
            format_tag = 1, // no compression
            bits_per_sample = wav_bytes_per_sample * 8,
            bytes_per_sec = channels * sample_rate * wav_bytes_per_sample,
            block_align = channels * wav_bytes_per_sample,

            data_id = 0x61746164, // "data"

            headers = [
                // RIFF chunk
                [4, riff_id],
                [4, riff_size],
                [4, wave],

                // Format sub-chunk
                [4, format_id],
                [4, format_size],
                [2, format_tag],
                [2, channels],
                [4, sample_rate],
                [4, bytes_per_sec],
                [2, block_align],
                [2, bits_per_sample],

                // Data sub-chunk
                [4, data_id],
                [4, data_size]
            ],
            header, i, l;

        if (!is_generating) {
            return;
        }

        wav_bytes = new Uint8Array(riff_size + 8);
        wav_bytes_pos = 0;

        for (i = 0, l = headers.length; i < l; ++i) {
            header = headers[i];

            if (header[0] == 4) {
                write_wav_buffer_32(header[1]);
            } else {
                write_wav_buffer_16(header[1]);
            }
        }

        sample_index = 0;
        progress(write_wav_samples, 1);
    }

    function write_wav_buffer_32(v)
    {
        write_wav_buffer_8(v);
        write_wav_buffer_8(v >> 8);
        write_wav_buffer_8(v >> 16);
        write_wav_buffer_8(v >> 24);
    }

    function write_wav_buffer_24(v)
    {
        write_wav_buffer_8(v);
        write_wav_buffer_8(v >> 8);
        write_wav_buffer_8(v >> 16);
    }

    function write_wav_buffer_16(v)
    {
        write_wav_buffer_8(v);
        write_wav_buffer_8(v >> 8);
    }

    function write_wav_buffer_8(v)
    {
        wav_bytes[wav_bytes_pos++] = v & 0xff;
    }

    function write_wav_samples()
    {
        var l, i;

        if (!is_generating) {
            return;
        }

        if (sample_index >= n_sample_pairs) {
            close();

            return;
        }

        l = min(n_sample_pairs, sample_index + 2500);

        for (; sample_index < l; ++sample_index) {
            i = 2 * sample_index;
            write_wav_buffer_24(
                floor(
                    (samples[i] * signed_24_bit_max) / normalizer
                )
            );
            write_wav_buffer_24(
                floor(
                    (samples[i + 1] * signed_24_bit_max) / normalizer
                )
            );
        }

        progress(write_wav_samples, 1);
    }

    function close()
    {
        var url;

        samples = null;
        freq = null;
        phase = null;
        peaks = null;
        img_col_1 = null;
        img_col_2 = null;
        peaks = null;
        avgs = null;

        stop_button.disabled = true;

        if (is_generating) {
            url = typed_array_to_url(wav_bytes, "audio/wav");

            download_button.href = url;
            download_button.download = name + ".wav";
            download_button.setAttribute("class", "");
            listen.src = url;
        } else {
            clear_waveform();
        }

        wav_bytes = null;

        is_generating = false;
        ready(true);
        progress_text.innerText = "";
        document.title = "(done)" + TITLE;
    }

    function typed_array_to_url(arr, mime_type)
    {
        return URL.createObjectURL(new Blob([arr.buffer], {type: mime_type}))
    }

    function $(i)
    {
        return document.getElementById(i);
    }

    function ready(is_ready)
    {
        is_ready_to_generate = is_ready;

        generate_button.disabled = !is_ready;
    }

    function load_image()
    {
        var img_file;

        ready(false);

        if (image_input.files.length < 1) {
            return;
        }

        img = new Image();
        img_file = image_input.files[0];

        name = img_file.name
            ? String(img_file.name).replace(/(\.[^.]*)?$/, "")
            : "audio";

        if (!name) {
            name = "audio";
        }

        img.onload = function ()
        {
            var canvas = document.createElement("canvas");

            width = img.width;
            height = img.height;

            img_canvas_ctx = canvas.getContext("2d");
            img_canvas_ctx.canvas.width = width;
            img_canvas_ctx.canvas.height = height;
            img_canvas_ctx.drawImage(img, 0, 0);

            image_display.innerHTML = "";
            image_display.appendChild(img);

            ready(true);
            find_problems();
        };

        img.onerror = function ()
        {
            show_problems(['<span class="fatal">Unable to load the selected image.</span>']);
        };

        img.src = URL.createObjectURL(img_file);
    }

    function load_settings()
    {
        sample_rate = Number(sample_rate_input.value);
        length = Number(length_input.value);
        invert = invert_input.checked;
        random_phase = random_phase_input.checked;
        contrast = contrast_input.checked;
        lowest_freq = Number(lowest_freq_input.value);
        highest_freq = Number(highest_freq_input.value);
        scale_type = scale_type_input.value;
    }

    function find_problems()
    {
        var problems = [],
            ram,
            samples;

        load_settings();
        ready(true);

        if (length < 0.1) {
            problems.push(
                '<span class="fatal">Length must be numeric and more than 0.1 seconds.</span>'
            );
            ready(false);
        }

        if (lowest_freq < 1) {
            problems.push(
                '<span class="fatal">The lowest frequency must be numeric and more than 1 Hz.</span>'
            );
            ready(false);
        }

        if (highest_freq < 1) {
            problems.push(
                '<span class="fatal">The highest frequency must be numeric and more than 1 Hz.</span>'
            );
            ready(false);
        }

        if (lowest_freq > highest_freq) {
            problems.push(
                '<span class="fatal">The lowest frequency must be less than the highest.</span>'
            );
            ready(false);
        }

        if (width < 3 || height < 3) {
            problems.push(
                '<span class="fatal">The selected image is too small.</span>'
            );
            ready(false);
        }

        if (height > 1600) {
            problems.push(
                "Generating sounds from high vertical resolution images might be slow."
            );
        }

        if (width < 30 || height < 30) {
            problems.push(
                "Generating sounds from small resolution images"
                + " might not yield very interesting spectrograms."
            );
        }

        if (sample_rate > 48000) {
            problems.push(
                "Generating sounds with high sample rates might take very"
                + " long and use lots of RAM, with diminishing returns."
            );
        }

        samples = channels * sample_rate * length;

        if (samples * height > 200000000) {
            problems.push(
                "Generating a sound with this sample rate and length,"
                + " with this vertical image resolution might take long."
            );
        }

        ram = (
            2 * 8 * waveform_width
            + 2 * 8 * height
            + 8 * samples
            + wav_bytes_per_sample * samples
            + 4 * width * height
        ) / megabyte;

        if (ram > 20) {
            problems.push(
                "Generating a sound with this sample rate and length will use approximately "
                + format_number(ram) + " MB of RAM."
            );
        }

        if (highest_freq >= (sample_rate / 2.0)) {
            problems.push(
                "Sample rate should be at least twice the highest frequency in"
                + " order to avoid quality degradation, distortions, aliasing, etc."
            );
        }

        if (highest_freq > 20000) {
            problems.push(
                "Most people can't hear frequencies over 20 kHz, and nost just"
                + " because most audio gear can't reproduce them."
            );
        }

        if (lowest_freq < 20) {
            problems.push(
                "Most people can't hear frequencies below 20 Hz, and nost just"
                + " because most audio gear can't reproduce them."
            );
        }

        show_problems(problems);
    }

    function show_problems(problems)
    {
        if (problems.length > 0) {
            problems_box.innerHTML = "<ul><li>" + problems.join("</li><li>") + "</li></ul>";
        } else {
            problems_box.innerHTML = "";
        }
    }

    window.onload = function ()
    {
        image_input = $("image");
        image_display = $("image-display");
        generate_button = $("generate");
        stop_button = $("stop");
        image_cursor = $("image-cursor");
        audio_cursor = $("audio-cursor");
        listen = $("listen");
        download_button = $("download");
        progressbar_1 = $("progressbar-1");
        progressbar_2 = $("progressbar-2");
        progress_text = $("progress-text");
        waveform = $("waveform");
        problems_box = $("problems");

        sample_rate_input = $("sample-rate");
        length_input = $("length");
        invert_input = $("invert");
        random_phase_input = $("random-phase");
        contrast_input = $("contrast");
        lowest_freq_input = $("lowest");
        highest_freq_input = $("highest");
        scale_type_input = $("scale-type");

        image_input.onchange = load_image;
        sample_rate_input.onchange = find_problems;
        length_input.onchange = find_problems;
        invert_input.onchange = find_problems;
        random_phase_input.onchange = find_problems;
        scale_type_input.onchange = find_problems;
        lowest_freq_input.onchange = find_problems;
        highest_freq_input.onchange = find_problems;

        listen.ontimeupdate = function ()
        {
            var p = listen.currentTime / length;

            audio_cursor.style.left = String(90 * p) + "vw";
            image_cursor.style.left = String(100 * p) + "%";
        };

        waveform_ctx = waveform.getContext("2d");
        waveform_ctx.canvas.width = waveform_width;
        waveform_ctx.canvas.height = waveform_height;
        waveform_ctx.lineWidth = 1;

        $("form").onsubmit = function () { return false; };
        generate_button.onclick = function ()
        {
            if (is_generating) {
                return;
            }

            window.location.href = "#image-display";

            load_settings();
            find_problems();

            if (is_ready_to_generate) {
                stop_button.disabled = false;
                image_to_sound();
            }
        };

        stop_button.onclick = function ()
        {
            var msg;

            if (!is_generating) {
                return;
            }

            msg = "Are you sure you want to stop? Click OK to stop and throw away what has been generated so far.";

            if (window.confirm(msg)) {
                is_generating = false;
                close();
            }
        };

        load_image();
    };
})();
