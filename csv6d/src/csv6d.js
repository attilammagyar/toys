(function () {

"use strict";

var DIM = 6,
    HISTOGRAM_BINS = 25,
    PI2 = Math.PI * 2.0,
    one_feature,
    data,
    points,
    camera,
    value_transforms,
    file_picker_input,
    file_picker_header_input,
    file_picker_form,
    main_form,
    main_settings,
    coef_inputs,
    feature_selectors,
    transform_selectors,
    histograms,
    canvas,
    canvas_ctx,
    is_rotating,
    is_panning,
    display_axis,
    pos_rot,
    pos_pan,
    redraw_timeout,
    axis,
    origin;


function main()
{
    var labels = ["X", "Y", "Z", "Size", "Saturation", "Hue"],
        dom_id,
        div,
        i, l;

    if (DIM !== labels.length) {
        throw "Dimensionality mismatch: " + String(DIM) + " != " + String(labels.length);
    }

    value_transforms = {
        "1": value_transform_const,
        "x": value_transform_id,
        "x^2": value_transform_sqr,
        "x^3": value_transform_cube,
        "sqrt(x)": value_transform_sqrt,
        "log(x+1)": value_transform_log1p,
        "exp(x)": value_transform_exp,
        "1/x": value_transform_inv,
        "1/x^2": value_transform_inv_sqr,
        "1/x^3": value_transform_inv_cube,
        "1/sqrt(x)": value_transform_inv_sqrt,
        "1/log(x+1)": value_transform_inv_log1p,
        "1/exp(x)": value_transform_inv_exp,

        "STD(x)": value_transform_id,
        "STD(x)^2": value_transform_sqr,
        "STD(x)^3": value_transform_cube,
        "sqrt(STD(x))": value_transform_sqrt,
        "log(STD(x)+1)": value_transform_log1p,
        "exp(STD(x))": value_transform_exp,
        "1/STD(x)": value_transform_inv,
        "1/STD(x)^2": value_transform_inv_sqr,
        "1/STD(x)^3": value_transform_inv_cube,
        "1/sqrt(STD(x))": value_transform_inv_sqrt,
        "1/log(STD(x)+1)": value_transform_inv_log1p,
        "1/exp(STD(x))": value_transform_inv_exp,

        "random()": value_transform_random
    };

    camera = new Camera();
    points = [];
    is_rotating = false;
    is_panning = false;
    display_axis = false;
    redraw_timeout = null;

    axis = [
        [new Point([1.0, 0.0, 0.0], 0, [1, 0, 0], 1), new Point([-1.0, 0.0, 0.0], 0, [1, 0, 0], 1)],
        [new Point([0.0, 1.0, 0.0], 0, [0, 0, 1], 1), new Point([0.0, -1.0, 0.0], 0, [0, 0, 1], 1)],
        [new Point([0.0, 0.0, 1.0], 0, [0, 1, 0], 1), new Point([0.0, 0.0, -1.0], 0, [0, 1, 0], 1)]
    ];

    origin = new Point([0.0, 0.0, 0.0], 700.0, [1, 1, 1], 1);

    file_picker_input = $("file-picker");
    file_picker_header_input = $("file-picker-header");
    file_picker_form = $("file-picker-form");
    file_picker_form.onsubmit = handle_file_picker_form_submit;

    main_form = $("main-form");
    main_form.onsubmit = stop_event;

    canvas = $("main-canvas");
    canvas_ctx = canvas.getContext("2d");

    canvas.onwheel = handle_canvas_wheel;
    canvas.onmousedown = handle_canvas_mousedown;
    canvas.onmouseup = handle_canvas_mouseup;
    canvas.onmousemove = handle_canvas_mousemove;
    canvas.onmouseleave = handle_canvas_mouseleave;
    canvas.oncontextmenu = handle_canvas_contextmenu;

    document.getElementsByTagName("body")[0].onresize = handle_resize;

    main_settings = $("main-settings");
    coef_inputs = [[], [], []];
    feature_selectors = [[], [], []];
    transform_selectors = [[], [], []];
    histograms = [];

    for (i = 0, l = DIM; i < l; ++i) {
        div = document.createElement("div");
        dom_id = "ftr-" + String(i);
        add_histogram(div, histograms);
        add_feature_selector(
            div,
            dom_id + "-1",
            labels[i] + ": ",
            i,
            coef_inputs[0],
            feature_selectors[0],
            transform_selectors[0]
        );
        add_feature_selector(
            div,
            dom_id + "-2",
            "×",
            i,
            coef_inputs[1],
            feature_selectors[1],
            transform_selectors[1]
        );
        add_feature_selector(
            div,
            dom_id + "-3",
            "+",
            i,
            coef_inputs[2],
            feature_selectors[2],
            transform_selectors[2]
        );
        main_settings.appendChild(div);

    }
}


function add_feature_selector(
        dom_node,
        dom_id,
        label_text,
        feature_index,
        coef_inputs,
        feature_selectors,
        transform_selectors
) {
    var div,
        label,
        coef_input,
        feature_selector,
        transform_selector,
        option,
        evt_handler,
        j;

    div = document.createElement("div");

    label = document.createElement("label");
    label.setAttribute("for", dom_id);
    label.innerText = label_text;

    coef_input = document.createElement("input");
    coef_input.setAttribute("type", "number");
    coef_input.setAttribute("step", "any");
    coef_input.value = "1.0";

    feature_selector = document.createElement("select");
    feature_selector.setAttribute("id", dom_id);

    transform_selector = document.createElement("select");

    for (j in value_transforms) {
        if (!value_transforms.hasOwnProperty(j)) {
            continue;
        }

        option = document.createElement("option");
        option.setAttribute("value", j);
        option.innerText = j;

        transform_selector.appendChild(option);
    }

    evt_handler = function (evt)
    {
        data.computed_features[feature_index] = null;
        update_screen();

        return true;
    };

    coef_input.onchange = evt_handler;
    feature_selector.onchange = evt_handler;
    transform_selector.onchange = evt_handler;

    div.appendChild(label);
    div.appendChild(feature_selector);
    div.appendChild(coef_input);
    div.appendChild(transform_selector);

    dom_node.appendChild(div);

    coef_inputs.push(coef_input);
    feature_selectors.push(feature_selector);
    transform_selectors.push(transform_selector);
}


function add_histogram(dom_node, histograms)
{
    var svg = create_svg_element("svg"),
        g = create_svg_element("g"),
        bar_width = Math.floor(100.0 / HISTOGRAM_BINS),
        rects, rect, i;

    svg.setAttribute("viewBox", "0 0 100 100");
    g = create_svg_element("g");
    svg.appendChild(g);
    rects = [];

    for (i = 0; i < HISTOGRAM_BINS; ++i) {
        rect = create_svg_element("rect");
        rect.setAttribute("x", String(i * bar_width));
        rect.setAttribute("y", "50");
        rect.setAttribute("width", String(bar_width));
        rect.setAttribute("height", "50");
        g.appendChild(rect);
        rects.push(rect);
    }

    dom_node.appendChild(svg);
    histograms.push(rects);
}


function update_screen()
{
    var ftr_idxs = [[], [], []],
        transforms = [[], [], []],
        coefs = [[], [], []],
        hist, bar, height, i, j;

    for (i = 0; i < DIM; ++i) {
        ftr_idxs[0].push(Number(feature_selectors[0][i].value));
        ftr_idxs[1].push(Number(feature_selectors[1][i].value));
        ftr_idxs[2].push(Number(feature_selectors[2][i].value));
        transforms[0].push(transform_selectors[0][i].value);
        transforms[1].push(transform_selectors[1][i].value);
        transforms[2].push(transform_selectors[2][i].value);
        coefs[0].push(Number(coef_inputs[0][i].value));
        coefs[1].push(Number(coef_inputs[1][i].value));
        coefs[2].push(Number(coef_inputs[2][i].value));
    }

    data.update_computed_features(ftr_idxs, coefs, transforms);
    points = data.compute_points();
    redraw();

    for (i = 0; i < DIM; ++i) {
        hist = data.computed_features[i].histogram();

        for (j = 0; j < HISTOGRAM_BINS; ++j) {
            height = Math.floor(100 * hist[j]);
            bar = histograms[i][j];
            bar.setAttribute("height", String(height));
            bar.setAttribute("y", String(100 - height));
        }
    }
}


function handle_canvas_contextmenu(evt)
{
    return stop_event(evt || event);
}


function handle_resize(evt)
{
    schedule_redraw();

    return stop_event(evt || event);
}


function handle_canvas_wheel(evt)
{
    evt = evt || event;

    camera.adjust_zoom(evt.deltaY);
    schedule_redraw();

    return stop_event(evt);
}


function handle_canvas_mousedown(evt)
{
    evt = evt || event;

    if (evt.button === 0) {
        is_panning = true;
        pos_pan = [evt.clientX, evt.clientY];
    } else if (evt.button === 2) {
        is_rotating = true;
        pos_rot = [evt.clientX, evt.clientY];
    }

    return stop_event(evt);
}


function handle_canvas_mouseup(evt)
{
    evt = evt || event;

    if (evt.button === 0) {
        is_panning = false;
    } else if (evt.button === 2) {
        is_rotating = false;
    }

    return stop_event(evt);
}


function handle_canvas_mousemove(evt)
{
    var dx, dy;

    evt = evt || event;

    if (!(is_rotating || is_panning)) {
        if (!display_axis) {
            display_axis = true;
            schedule_redraw();
        }

        return true;
    }

    if (is_rotating) {
        dx = (evt.clientX - pos_rot[0]) / (canvas.width + 1);
        dy = (evt.clientY - pos_rot[1]) / (canvas.height + 1);
        camera.rotate(dy, dx);
        pos_rot = [evt.clientX, evt.clientY];
    }

    if (is_panning) {
        dx = (evt.clientX - pos_pan[0]) / (canvas.width + 1);
        dy = (evt.clientY - pos_pan[1]) / (canvas.height + 1);
        camera.pan(-dx, dy);
        pos_pan = [evt.clientX, evt.clientY];
    }

    schedule_redraw();

    return true;
}


function handle_canvas_mouseleave(evt)
{
    is_panning = false;
    is_rotating = false;
    display_axis = false;
    schedule_redraw();

    return true;
}


function Camera()
{
    this.pos = [0.0, 0.0, -10.0];
    this.angles = [0.35, -0.60, 0.0];
    this.zoom = 3.0;
    this.rotation = null;

    this.update();
}

Camera.prototype.pan = function (dx, dy)
{
    var z = Math.max(Math.abs(this.pos[2]), 0.05) * 0.5;

    this.pos[0] += dx * z;
    this.pos[1] += dy * z;
    this.update();
};

Camera.prototype.rotate = function (dx, dy)
{
    var z = Math.max(Math.abs(this.pos[2]), 1.0) * 0.5;

    this.angles[0] += dx * z;
    this.angles[1] += dy * z;
    this.update();
};

Camera.prototype.adjust_zoom = function (delta)
{
    this.pos[2] -= delta * 0.001;
    this.update();
};

Camera.prototype.update = function ()
{
    this.rotation = this.compute_rotation_mtx(this.angles);
};

Camera.prototype.compute_rotation_mtx = function (angles)
{
    var a = angles[0],
        b = angles[1],
        c = angles[2],
        sa = Math.sin(a),
        sb = Math.sin(b),
        sc = Math.sin(c),
        ca = Math.cos(a),
        cb = Math.cos(b),
        cc = Math.cos(c);

    return [
        [               cb * cc,                 cb * sc,      - sb], /* column 1 */
        [sa * sb * cc - ca * sc,  sa * sb * sc + ca * cc,   sa * cb], /* column 2 */
        [ca * sb * cc + sa * sc,  ca * sb * sc - sa * cc,   ca * cb], /* column 3 */
    ]
};

Camera.prototype.project = function (point)
{
    var projection = point.projection,
        cam = this.pos,
        dz, scale;

    this.mul3d(this.rotation, point.pos, projection),

    dz = (projection[2] - cam[2]);

    if (dz < 0.01) {
        return false;
    }

    scale = this.zoom / dz;

    projection[0] = (projection[0] - cam[0]) * scale;
    projection[1] = (projection[1] - cam[1]) * scale;
    projection[3] = point.size * scale;

    return true;
};

Camera.prototype.mul3d = function(mtx, vec, result)
{
    result[0] = mtx[0][0] * vec[0] + mtx[0][1] * vec[1] + mtx[0][2] * vec[2];
    result[1] = mtx[1][0] * vec[0] + mtx[1][1] * vec[1] + mtx[1][2] * vec[2];
    result[2] = mtx[2][0] * vec[0] + mtx[2][1] * vec[1] + mtx[2][2] * vec[2];
}


function schedule_redraw()
{
    if (redraw_timeout !== null) {
        clearTimeout(redraw_timeout);
    }

    redraw_timeout = setTimeout(redraw, 0.05);
}


function redraw()
{
    var rect = canvas.getClientRects()[0],
        width = canvas.width = rect.width,
        height = canvas.height = rect.height,
        width_half = 0.5 * width,
        height_half = 0.5 * height,
        scale = 0.5 * Math.min(width, height),
        imgs = [],
        projection,
        point,
        i, l, a, s, s_half;

    canvas_ctx.clearRect(0, 0, width, height);

    for (i = 0, l = points.length; i < l; ++i) {
        point = points[i];

        if (camera.project(point)) {
            projection = point.projection;

            s = scale * projection[3];
            s_half = 0.5 * s;

            projection[0] = width_half + scale * projection[0] - s_half;
            projection[1] = height_half- scale * projection[1] - s_half;
            projection[3] = s;
            projection[4] = point.get_z_color(projection[2]);

            imgs.push(projection);
        }
    }

    imgs.sort(function (a, b) { return b[2] - a[2]; });

    for (i = 0, l = imgs.length; i < l; ++i) {
        projection = imgs[i];
        s = projection[3];
        canvas_ctx.fillStyle = projection[4];
        canvas_ctx.fillRect(projection[0], projection[1], s, s);
    }

    if (display_axis) {
        canvas_ctx.strokeWidth = 1;

        for (i = 0, l = axis.length; i < l; ++i) {
            a = axis[i];

            if (camera.project(a[0]) && camera.project(a[1])) {
                projection = a[0].projection;
                projection[0] = width_half + scale * projection[0];
                projection[1] = height_half - scale * projection[1];

                canvas_ctx.beginPath();
                canvas_ctx.arc(projection[0], projection[1], 3, 0, PI2)
                canvas_ctx.fillStyle = a[0].color;
                canvas_ctx.fill();

                canvas_ctx.beginPath();
                canvas_ctx.moveTo(projection[0], projection[1]);

                projection = a[1].projection;
                projection[0] = width_half + scale * projection[0];
                projection[1] = height_half - scale * projection[1];

                canvas_ctx.lineTo(projection[0], projection[1]);
                canvas_ctx.strokeStyle = a[0].color;
                canvas_ctx.stroke();
            }
        }

        if (camera.project(origin)) {
            projection = origin.projection;
            canvas_ctx.beginPath();
            canvas_ctx.arc(
                width_half + scale * projection[0],
                height_half - scale * projection[1],
                projection[3],
                0,
                PI2
            )
            canvas_ctx.strokeStyle = origin.color;
            canvas_ctx.stroke();
        }
    }
}


function handle_file_picker_form_submit(evt)
{
    var d;

    if (file_picker_input.files.length < 1) {
        return stop_event(evt);
    }

    d = file_picker_input.files[0];

    d.text()
        .then(load_data_csv)
        .catch((e) => { console.log("Error reading file"); console.log(e); });

    return stop_event(evt);
}


function load_data_csv(text)
{
    var csv_parser = new CSVParser(text),
        header = null,
        rows = [],
        row,
        feature,
        feature_selector_1,
        feature_selector_2,
        feature_selector_3,
        feature_name,
        nan_info,
        nan_ratio,
        option,
        skipped,
        usable,
        i, l, j, ll;

    one_feature = new Feature("1");

    if (file_picker_header_input.checked) {
        header = csv_parser.parse_next_row();
    }

    if (header === null) {
        header = [];
    }

    while ((row = csv_parser.parse_next_row()) !== null) {
        rows.push(row);
        one_feature.add_row(1.0);
    }

    one_feature.finalize_stats();
    one_feature.standardize();

    data = new Data(header, rows);

    for (j = 0, ll = feature_selectors[0].length; j < ll; ++j) {
        feature_selector_1 = feature_selectors[0][j];
        feature_selector_2 = feature_selectors[1][j];
        feature_selector_3 = feature_selectors[2][j];
        skipped = 0;
        usable = false;

        for (i = 0, l = data.features.length; i < l; ++i) {
            feature = data.features[i];
            feature_name = feature.name;

            nan_info = "";

            if (feature.rows.length > 0 && feature.nans > 0) {
                nan_ratio = feature.nans / feature.rows.length;
                nan_info = (
                    " ("
                    + String(Math.round(10000 * nan_ratio) / 100)
                    + "% NaN)"
                );
            }

            option = document.createElement("option");
            option.setAttribute("value", String(i));
            option.innerText = feature_name + nan_info;
            feature_selector_1.appendChild(option);

            option = document.createElement("option");
            option.setAttribute("value", String(i));
            option.innerText = feature_name + nan_info;
            feature_selector_2.appendChild(option);

            option = document.createElement("option");
            option.setAttribute("value", String(i));
            option.innerText = feature_name + nan_info;
            feature_selector_3.appendChild(option);

            feature_name = feature_name.toLowerCase();

            if (feature_name === "id" || feature_name === "date") {
                ++skipped;
            } else if (i === j + skipped) {
                feature_selector_1.value = String(i);
                feature_selector_2.value = String(i);
                feature_selector_3.value = String(i);
                usable = true;
            }
        }

        transform_selectors[0][j].value = usable ? "x" : "1";
        transform_selectors[1][j].value = "1";
        transform_selectors[2][j].value = "1";
    }

    hide("file-picker-screen");
    show("main-screen");

    update_screen();
}


function value_transform_const(x)
{
    return 1.0;
}


function value_transform_id(x)
{
    return x;
}


function value_transform_sqr(x)
{
    return x * x;
}


function value_transform_cube(x)
{
    return x * x * x;
}


function value_transform_sqrt(x)
{
    return Math.sign(x) * Math.sqrt(Math.abs(x));
}


function value_transform_log1p(x)
{
    /* Extension of log(x + 1) to x <= -1. */

    return Math.sign(x) * Math.log1p(Math.abs(x));
}


function value_transform_exp(x)
{
    return Math.exp(x);
}


function value_transform_inv(x)
{
    /* Smooth approximation of 1/x. */

    return 60.0 * Math.tanh(1000.0 * x) / Math.sqrt(100.0 * x * x + 1.0) / 10.0;
}


function value_transform_inv_sqr(x)
{
    return value_transform_inv(x * x);
}


function value_transform_inv_cube(x)
{
    return value_transform_inv(x * x * x);
}


function value_transform_inv_sqrt(x)
{
    return value_transform_inv(value_transform_sqrt(x));
}


function value_transform_inv_log1p(x)
{
    return value_transform_inv(value_transform_log1p(x));
}


function value_transform_inv_exp(x)
{
    return value_transform_inv(Math.exp(x));
}


function value_transform_random(x)
{
    return Math.random();
}


function Data(feature_names, rows)
{
    var features = [],
        features_length = 0,
        rows_length = rows.length,
        row, row_length, cell, feature, i, j;

    for (i = 0; i < rows_length; ++i) {
        row = rows[i];
        row_length = row.length;

        if (features_length < row_length) {
            for (j = features_length; j < row_length; ++j) {
                features.push(
                    new Feature(
                        this.get_array_item(feature_names, j)
                        || ("Feature-" + String(j + 1))
                    )
                );
                ++features_length;
            }
        }

        for (j = 0; j < row_length; ++j) {
            feature = features[j];

            if (!feature.is_categorical && !this.is_numeric(row[j])) {
                feature.make_categorical();
            }
        }
    }

    for (j = 0; j < features_length; ++j) {
        feature = features[j];

        for (i = 0; i < rows_length; ++i) {
            cell = this.get_array_item(rows[i], j) || "";

            if (!feature.is_categorical && !this.is_strictly_numeric(cell)) {
                cell = "nan";
            }

            feature.add_row(cell);
        }
    }

    for (j = 0; j < features_length; ++j) {
        features[j].finalize_stats();
    }

    this.features = features;
    this.num_of_rows = rows_length;
    this.computed_features = Array(DIM);

    for (j = 0; j < DIM; ++j) {
        this.computed_features[j] = null;
    }
}

Data.prototype.get_array_item = function (arr, idx)
{
    return (idx < arr.length) ? arr[idx] : null;
};

Data.prototype.is_numeric = function (value)
{
    return this.is_strictly_numeric(value) || this.is_na(value);
};

Data.prototype.is_na = function (value)
{
    value = value.toLowerCase();

    return value === "" || value === "nan" || value === "na" || value === "n/a";
};

Data.prototype.is_strictly_numeric = function (value)
{
    return !Number.isNaN(Number(value));
};

Data.prototype.update_computed_features = function (ftr_idxs, coefs, transforms)
{
    var i;

    for (i = 0; i < DIM; ++i) {
        if (this.computed_features[i] === null) {
            this.computed_features[i] = this.compute_feature_combination(
                ftr_idxs, coefs, transforms, i
            );
        }
    }
};

Data.prototype.compute_feature_combination = function (
        ftr_idxs,
        coefs,
        transforms,
        idx
) {
    var combined = new Feature(""),
        rows = [
            this.compute_feature_rows(
                data.features[ftr_idxs[0][idx]], coefs[0][idx], transforms[0][idx]
            ),
            this.compute_feature_rows(
                data.features[ftr_idxs[1][idx]], coefs[1][idx], transforms[1][idx]
            ),
            this.compute_feature_rows(
                data.features[ftr_idxs[2][idx]], coefs[2][idx], transforms[2][idx]
            )
        ],
        i, l;

    for (i = 0, l = rows[0].length; i < l; ++i) {
        combined.add_row(rows[0][i] * rows[1][i] + rows[2][i]);
    }

    combined.finalize_stats();
    combined.standardize();

    return combined;
};

Data.prototype.compute_feature_rows = function (feature, coef, transform)
{
    var rows, computed_feature, transform_fn, i, l;

    if (transform === "1") {
        return one_feature.rows;
    }

    if (transform === "x" && feature.nans < 1) {
        return feature.rows;
    }

    if (transform === "STD(x)" && feature.nans < 1) {
        feature.standardize();

        return feature.std_rows;
    }

    transform_fn = value_transforms[transform];

    if (transform.indexOf("STD(x)") > -1) {
        feature.standardize();
        rows = feature.std_rows;
    } else {
        rows = feature.rows;
    }

    l = rows.length;
    computed_feature = new Feature("");

    for (i = 0; i < l; ++i) {
        computed_feature.add_row(coef * transform_fn(rows[i]));
    }

    computed_feature.finalize_stats();
    computed_feature.impute();

    return computed_feature.rows;
};

Data.prototype.compute_points = function ()
{
    var points = Array(this.num_of_rows),
        computed_features = this.computed_features,
        i, l;

    for (i = 0, l = this.num_of_rows; i < l; ++i) {
        points[i] = new Point(
            [
                computed_features[0].std_rows[i],
                computed_features[1].std_rows[i],
                computed_features[2].std_rows[i]
            ],
            computed_features[3].normalize_std(i, 0.0, 1.0),
            this.hsv_to_rgb(
                computed_features[5].normalize_std(i, 0.0, 0.833),
                computed_features[4].normalize_std(i, 0.3, 1.0),
                1.0,
            ),
            0.8
        );
    }

    return points;
};

Data.prototype.hsv_to_rgb = function (h, s, v)
{
    var r, g, b,
        i, f, p, q, t;

    i = Math.floor(6.0 * h);
    f = 6.0 * h - i;
    p = v * (1.0 - s);
    q = v * (1.0 - f * s);
    t = v * (1.0 - (1.0 - f) * s);

    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }

    return [r, g, b];
};


function Point(pos, size, rgb, alpha)
{
    var red, green, blue, z_colors, i;

    this.pos = pos;
    this.projection = [0.0, 0.0, 0.0, 0.0, 0.0];
    this.size = 0.01 + size * 0.03;

    red = String(Math.round(183.0 * rgb[0] + 72));
    green = String(Math.round(183.0 * rgb[1] + 72));
    blue = String(Math.round(183.0 * rgb[2] + 72));

    this.color = (
        "rgba("
        + [red, green, blue, String(Math.round(alpha * 1000) / 1000)].join(",")
        + ")"
    );

    z_colors = Array(21);

    for (i = 0; i < 21; ++i) {
        z_colors[i] = (
            "rgba("
            + [red, green, blue, String(Math.round(alpha * 1000) / 1000)].join(",")
            + ")"
        );
        alpha *= 0.97;
    }

    this.z_colors = z_colors;
}

Point.prototype.get_z_color = function (z)
{
    return this.z_colors[Math.round((Math.max(-2.0, Math.min(2.0, z)) + 2.0) * 5.0)];
};


function Feature(name)
{
    this.name = name;
    this.is_categorical = false;
    this.rows = [];
    this.std_rows = null;
    this.unique_values = {};
    this.unique_values_count = 0;
    this.nans = 0;
    this.stats = {
        "min": Infinity,
        "max": -Infinity,
        "range": 0.0,
        "mean": 0.0,
        "std": 0.0
    };
    this.std_stats = null;
    this.hist = null;

    this.add_row = this.add_row_numerical;
}

Feature.prototype.make_categorical = function ()
{
    this.is_categorical = true;
    this.add_row = this.add_row_categorical;
};

Feature.prototype.add_row_categorical = function (value)
{
    var key = "k" + value.toLowerCase();

    if (this.unique_values.hasOwnProperty(key)) {
        this.rows.push(value = this.unique_values[key]);
    } else {
        this.rows.push(value = this.unique_values[key] = this.unique_values_count++);
    }

    this.add_to_stats(value);
};

Feature.prototype.add_to_stats = function (value)
{
    var stats = this.stats;

    stats.mean += value;
    stats.min = Math.min(stats.min, value);
    stats.max = Math.max(stats.max, value);
};

Feature.prototype.add_row_numerical = function (value)
{
    var value_num = Number(value);

    if (Number.isFinite(value_num)) {
        this.rows.push(value_num);
        this.add_to_stats(value_num);
    } else {
        ++this.nans;
        this.rows.push(NaN);
    }
};

Feature.prototype.finalize_stats = function ()
{
    var rows_length = this.rows.length,
        stats = this.stats,
        count = rows_length - this.nans,
        mean, variance, rows, i, x;

    if (!Number.isFinite(stats.min)) {
        stats.min = 0.0;
    }

    if (!Number.isFinite(stats.max)) {
        stats.max = 1.0;
    }

    stats.range = stats.max - stats.min;

    if (count < 2) {
        return;
    }

    stats.mean /= count;
    mean = stats.mean;
    variance = 0.0;
    rows = this.rows;

    for (i = 0; i < rows_length; ++i) {
        x = rows[i];

        if (Number.isFinite(x)) {
            x = x - mean;
            variance += x * x;
        }
    }

    variance = variance / count;
    stats.std = Math.sqrt(variance);
};

Feature.prototype.standardize = function ()
{
    var rows, std_rows, stats, mean, std, min, max, range, i, l;

    std_rows = this.std_rows;

    if (std_rows === null) {
        stats = this.stats;
        std = stats.std;
        rows = this.rows;
        l = rows.length;
        std_rows = Array(l);

        if (std < 1e-6) {
            for (i = 0; i < l; ++i) {
                std_rows[i] = 0.0;
            }

            min = 0.0;
            max = 0.0;
            range = 0.0;
        } else {
            mean = stats.mean;

            for (i = 0; i < l; ++i) {
                std_rows[i] = (rows[i] - mean) / std;
            }

            min = (stats.min - mean) / std;
            max = (stats.max - mean) / std;
            range = max - min;
        }

        this.std_rows = std_rows;
        this.std_stats = {
            "min": min,
            "max": max,
            "range": range,
            "mean": 0.0,
            "std": 1.0
        };
    }

    return std_rows;
};

Feature.prototype.normalize_std = function (idx, new_min, new_max)
{
    var stats = this.std_stats;

    if (stats.range < 1e-6) {
        return new_max;
    }

    return ((this.std_rows[idx] - stats.min) / stats.range) * (new_max - new_min) + new_min;
};

Feature.prototype.impute = function ()
{
    var rows = this.rows,
        std_rows = this.std_rows,
        mean = this.stats.mean,
        i, l, x;

    if (this.nans < 1) {
        return;
    }

    if (std_rows === null) {
        for (i = 0, l = rows.length; i < l; ++i) {
            x = rows[i];

            if (!Number.isFinite(x)) {
                rows[i] = mean;
            }
        }
    } else {
        for (i = 0, l = rows.length; i < l; ++i) {
            x = rows[i];

            if (!Number.isFinite(x)) {
                rows[i] = mean;
                std_rows[i] = 0.0;
            }
        }
    }
};

Feature.prototype.histogram = function ()
{
    var hist = this.hist,
        rows, rows_length, min, last_bin, range, scale,
        i, x;

    if (hist === null) {
        hist = Array(HISTOGRAM_BINS);
        range = this.std_stats.range;

        for (i = 0; i < HISTOGRAM_BINS; ++i) {
            hist[i] = 0.0;
        }

        if (this.std_rows.length > 0) {
            if (range < 1e-6) {
                i = Math.floor(HISTOGRAM_BINS * 0.5);
                hist[i] = 1.0 - this.nans / this.std_rows.length;
            } else {
                rows = this.std_rows;
                min = this.std_stats.min;
                last_bin = HISTOGRAM_BINS - 1;
                scale = HISTOGRAM_BINS / range;
                rows_length = this.std_rows.length;

                for (i = 0; i < rows_length; ++i) {
                    x = Math.floor(scale * (rows[i] - min));

                    if (Number.isFinite(x)) {
                        x = Math.max(0, Math.min(last_bin, x));
                        hist[x] += 1.0;
                    }
                }

                scale = 1.0;

                for (i = 0; i < HISTOGRAM_BINS; ++i) {
                    if (hist[i] > scale) {
                        scale = hist[i];
                    }
                }

                for (i = 0; i < HISTOGRAM_BINS; ++i) {
                    hist[i] /= scale;
                }
            }
        }

        this.hist = hist;
    }

    return hist;
};


function CSVParser(csv_text)
{
    this.re_simple_cell = /^([^",]*)(,.*)?$/;
    this.re_quoted_cell_begin = /^\s*("(([^"]|"")*))(("(\s*,.*)?)?)$/;
    this.re_quoted_cell_end = /^(([^"]|"")*)("(\s*,.*)?)$/;
    this.re_simple_cell_next = /^"(\s*,)?/;

    this.lines = this.normalize_line_breaks(csv_text).split("\n");
    this.next_line_idx = 0;
}

CSVParser.prototype.normalize_line_breaks = function (text)
{
    return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
};

CSVParser.prototype.parse_next_row = function ()
{
    var lines = this.lines,
        lines_length = lines.length,
        row = [],
        re_simple_cell = this.re_simple_cell,
        re_quoted_cell_begin = this.re_quoted_cell_begin,
        re_quoted_cell_end = this.re_quoted_cell_end,
        re_simple_cell_next = this.re_simple_cell_next,
        next_line_idx = this.next_line_idx,
        line_remaining, cell, match, is_continuing;

    if (next_line_idx >= lines_length) {
        return null;
    }

    line_remaining = lines[next_line_idx];

    while (line_remaining.trim() === "") {
        /* Skip empty (whitespace-only) line */
        ++next_line_idx;

        if (next_line_idx < lines_length) {
            line_remaining = lines[next_line_idx];
        } else {
            this.next_line_idx = next_line_idx;

            return null;
        }
    }

    cell = "";

    while (line_remaining.length > 0) {
        match = line_remaining.match(re_simple_cell);

        if (match !== null) {
            /* Simple cell. */
            cell = match[1];
            line_remaining = line_remaining.substring(cell.length + 1);
            row.push(cell.trim());

            continue;
        }

        match = line_remaining.match(re_quoted_cell_begin);

        if (match === null) {
            throw "Invalid CSV line: " + String(line_remaining);
        }

        /* Quoted cell started. */
        cell = match[2];
        line_remaining = match[4];

        if (line_remaining && line_remaining.substring(0, 1) === '"') {
            /* Quoted cell ended in the same line. */
            line_remaining = line_remaining.replace(re_simple_cell_next, "");
            row.push(cell.replace(/""/g, "\""));

            continue;
        }

        /* Quoted cell contains line break. */
        is_continuing = true;

        while (is_continuing) {
            ++next_line_idx;

            if (next_line_idx >= lines_length) {
                this.next_line_idx = next_line_idx;

                throw "Incomplete CSV cell: " + String(cell);
            }

            line_remaining = lines[next_line_idx];
            match = line_remaining.match(re_quoted_cell_end);

            if (match === null) {
                /* The entire line is continuation. */
                cell += "\n" + line_remaining;
            } else {
                /* Found end of quoted cell. */
                row.push((cell + "\n" + match[1]).replace(/""/g, "\""));
                line_remaining = match[3].replace(re_simple_cell_next, "");
                is_continuing = false;
            }
        }
    }

    ++next_line_idx;
    this.next_line_idx = next_line_idx;

    return row;
};


function $(id)
{
    if (typeof(id) === "string") {
        return document.getElementById(id);
    }

    return id;
}


function create_svg_element(element)
{
    return document.createElementNS("http://www.w3.org/2000/svg", element);
}


function bind(obj, func)
{
    return function () { return func.apply(obj, arguments); };
}


function stop_event(evt)
{
    evt = evt || event;
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();

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


function timestamp()
{
    return new Date().toISOString();
}


function run_tests()
{
    QUnit.module("CSV", function () {
        QUnit.test("parsing", function(assert) {
            var parser = new CSVParser(
                [
                    "Id,Hello,World,Foo,Bar,Baz",
                    "1,1.0,   , \"foo1\",  \"bar\"\"1\"\"-1",
                    "bar1-2",
                    "bar1-\"\"3\"\"",
                    "bar1-4",
                    "bar1-5\",baz1",
                    "2,2.0,world2,foo2,bar2,",
                    "3,3.0,,foo3,\"bar3-1",
                    "bar3-2\",baz3",
                    "4,4.0,,foo4,\"bar4-\"\"1\"\"",
                    "",
                    "bar4-3\",\"\"",
                    "5,5.0,hello5,world5,\" \",bar5,\"baz5-1",
                    "baz5-2\"",
                    "",
                    "",
                    ""
                ].join("\r\n")
            );

            assert.deepEqual(
                parser.parse_next_row(),
                ["Id", "Hello", "World", "Foo", "Bar", "Baz"]
            );
            assert.deepEqual(
                parser.parse_next_row(),
                ["1", "1.0", "", "foo1", "bar\"1\"-1\nbar1-2\nbar1-\"3\"\nbar1-4\nbar1-5", "baz1"]
            );
            assert.deepEqual(
                parser.parse_next_row(),
                ["2", "2.0", "world2", "foo2", "bar2"]
            );
            assert.deepEqual(
                parser.parse_next_row(),
                ["3", "3.0", "", "foo3", "bar3-1\nbar3-2", "baz3"]
            );
            assert.deepEqual(
                parser.parse_next_row(),
                ["4", "4.0", "", "foo4", "bar4-\"1\"\n\nbar4-3", ""]
            );
            assert.deepEqual(
                parser.parse_next_row(),
                ["5", "5.0", "hello5", "world5", " ", "bar5", "baz5-1\nbaz5-2"]
            );
            assert.deepEqual(parser.parse_next_row(), null);
            assert.deepEqual(parser.parse_next_row(), null);
        });
    });

    QUnit.module("Data", function () {
        QUnit.test("stats", function(assert) {
            var data = new Data(
                    ["c1", "c2", "c3", "c4"],
                    [
                        ["1", "1.0", "1.0", "a"],
                        ["2", "-1.0", "1.0", "b"],
                        ["3", "2.0", "1.0", "b"],
                        ["4", "-2.0", "1.0", "a"],
                        ["5", "3.0", "1.0", "b"],
                        ["6", "-3.0", "1.0", "c"],
                        ["7", "n/a", "1.0", "a"]
                    ]
                ),
                stats;

            stats = data.features[0].stats;
            assert.closeTo(stats.mean, 4.0, 0.01);
            assert.closeTo(stats.std, 2.0, 0.01);
            assert.equal(stats.min, 1);
            assert.equal(stats.max, 7);
            assert.equal(stats.range, 6);

            stats = data.features[1].stats;
            assert.closeTo(stats.mean, 0.0, 0.01);
            assert.closeTo(stats.std, 2.16, 0.01);
            assert.equal(stats.min, -3);
            assert.equal(stats.max, 3);
            assert.equal(stats.range, 6);

            stats = data.features[2].stats;
            assert.closeTo(stats.mean, 1.0, 0.01);
            assert.closeTo(stats.std, 0.0, 0.01);
            assert.equal(stats.min, 1);
            assert.equal(stats.max, 1);
            assert.equal(stats.range, 0);

            stats = data.features[3].stats;
            assert.closeTo(stats.mean, 0.71, 0.01);
            assert.closeTo(stats.std, 0.70, 0.01);
            assert.equal(stats.min, 0);
            assert.equal(stats.max, 2);
            assert.equal(stats.range, 2);
        });
    });
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

})();
