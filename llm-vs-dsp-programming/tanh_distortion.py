import math
import struct
import sys
import time
import warnings
import wave

import numpy as np

from scipy import signal
from scipy.signal import butter, lfilter, resample_poly

_SCIPY_AVAILABLE = True


SAMPLE_RATE = 44100
NUM_CHANNELS = 2
SAMPLE_WIDTH = 2
SAMPLE_NORM = 32767.0


def main():
    input_filename = "sound.wav"
    experiments = (
        ("chatgpt4o-adaa", "OpenAI ChatGPT 4o ADAA (AI)", 100, distort_chatgpt4o_adaa),
        ("chatgpt4o-c1p1", "OpenAI ChatGPT 4o Conversation 1 Prompt 1 (AI)", 100, distort_chatgpt4o_c1p1),
        ("chatgpt4o-c1p2", "OpenAI ChatGPT 4o Conversation 1 Prompt 2 (AI)", 100, distort_chatgpt4o_c1p2),
        ("chatgpt4o-c1p4", "OpenAI ChatGPT 4o Conversation 1 Prompt 4 (AI)", 100, distort_chatgpt4o_c1p4),
        ("chatgpt4o-c1p5", "OpenAI ChatGPT 4o Conversation 1 Prompt 5 (AI)", 10, distort_chatgpt4o_c1p5),
        ("chatgpt4o-c1p7", "OpenAI ChatGPT 4o Conversation 1 Prompt 7 (AI)", 100, distort_chatgpt4o_c1p7),
        ("chatgpt4o-c2p1", "OpenAI ChatGPT 4o Conversation 2 Prompt 1 (AI)", 100, distort_chatgpt4o_c2p1),
        ("chatgpt4o-unspectechnique", "OpenAI ChatGPT 4o Unspecified Technique (AI)", 100, distort_chatgpt4o_unspectechnique),
        ("chatgpt4o-noupspl", "OpenAI ChatGPT 4o No Upsampling (AI)", 100, distort_chatgpt4o_noupspl),
        ("gemini2_5pro-adaa", "Google Gemini 2.5 Pro ADAA (AI)", 100, distort_gemini2_5pro_adaa),
        ("gemini2_5pro-unspectechnique", "Google Gemini 2.5 Pro Unspecified Technique (AI)", 100, distort_gemini2_5pro_unspectechnique),
        ("gemini2_5pro-noupspl", "Google Gemini 2.5 Pro No Upsampling (AI)", 100, distort_gemini2_5pro_noupspl),
        ("manual-adaa", "Manual ADAA Implementation (human)", 100, distort_manual_adaa),
        ("manual-adaa-improved", "Improved Manual ADAA Implementation (human + ideas from AI)", 100, distort_manual_adaa_improved),
        ("r1-adaa", "DeepSeek R1 ADAA (AI)", 100, distort_r1_adaa),
        ("r1-unspectechnique", "DeepSeek R1 Unspecified Technique (AI)", 100, distort_r1_unspectechnique),
        ("r1-noupspl", "DeepSeek R1 No Upsampling (AI)", 100, distort_r1_noupspl),
    )
    input_samples = read_wav(input_filename)
    results = []

    for experiment_name, experiment_title, repeats, distortion_func in experiments:
        print(f"Running {experiment_name}...", file=sys.stderr)
        duration = run_test(input_samples.copy(), experiment_name, repeats, distortion_func)
        results.append((experiment_name, experiment_title, duration / repeats))

    print(
        """\
<table>
  <thead>
    <tr>
      <th>Experiment</th>
      <th>Average computation time</th>
      <th>Aliasing</th>
    </tr>
  </thead>
  <tbody>\
"""
    )

    for experiment_name, experiment_title, avg_duration in sorted(results, key=lambda r: r[2]):
        print(
            f"""\
    <tr>
      <td><a href="#result-{experiment_name}">{experiment_title}</a></td>
      <td>{avg_duration:.6f} s</td>
      <td></td>
    </tr>\
"""
        )

    print("""\
  </tbody>
</table>\
"""
    )


def run_test(input_samples, experiment_name, repeats, distortion_func):
    begin = time.time()

    for i in range(repeats):
        distorted_samples = distortion_func(
            input_samples,
            gain_db=14.0,
            sample_rate=SAMPLE_RATE,
            channels=NUM_CHANNELS,
        )

    end = time.time()

    assert distorted_samples.shape == input_samples.shape, f"Shape mismatch: {experiment_name=}, {input_samples.shape=}, {distorted_samples.shape=}"

    distorted_samples /= np.max(np.abs(distorted_samples))
    output_filename = f"sound-{experiment_name}.wav"
    write_wav(output_filename, np.clip(distorted_samples, -1.0, 1.0))

    return end - begin


def read_wav(filename):
    with wave.open(filename, "rb") as wf:
        num_channels = wf.getnchannels()
        sample_width = wf.getsampwidth()
        sample_rate = wf.getframerate()
        num_frames = wf.getnframes()

        assert sample_width == SAMPLE_WIDTH, "Only 16-bit WAV files are supported."
        assert num_channels == NUM_CHANNELS, "Only stereo WAV files are supported."
        assert sample_rate == SAMPLE_RATE, "Only 44.1 kHz sample rate is supported."

        raw_data = wf.readframes(num_frames)
        data = np.frombuffer(raw_data, dtype=np.int16)
        stereo_data = data.reshape(-1, NUM_CHANNELS)

        return stereo_data.astype(np.float32) / SAMPLE_NORM


def write_wav(filename, buffer):
    with wave.open(filename, "wb") as wf:
        wf.setnchannels(NUM_CHANNELS)
        wf.setsampwidth(SAMPLE_WIDTH)
        wf.setframerate(SAMPLE_RATE)
        wf.writeframes((buffer * SAMPLE_NORM).astype(np.int16).tobytes())


def db_to_linear(db):
    return 10.0 ** (db / 20.0)


def distort_chatgpt4o_adaa(samples, gain_db, sample_rate, channels):
    # Apply gain (convert dB to linear)
    gain = 10 ** (gain_db / 20.0)
    x = gain * samples

    # Shifted input for ADAA (previous sample)
    x_prev = np.roll(x, 1, axis=0)
    x_prev[0, :] = 0.0  # set the first sample to zero for continuity

    # Compute ADAA using the first-order antiderivative of tanh: ln(cosh(x))
    delta = x - x_prev
    small_threshold = 1e-6

    # Avoid division by zero using Taylor approx when delta is very small
    use_taylor = np.abs(delta) < small_threshold
    avg_nl = np.where(
        use_taylor,
        np.tanh(0.5 * (x + x_prev)),  # tanh(midpoint) approximation
        (np.log(np.cosh(x)) - np.log(np.cosh(x_prev))) / delta
    )

    # Output is the nonlinear processed signal
    distorted = avg_nl.astype(np.float32)
    return distorted


def distort_chatgpt4o_c1p1(samples, gain_db, sample_rate, channels):
    # MODIFICATION: the original expected int16 samples and linear gain
    # # Normalize to [-1, 1]
    # norm_samples = samples / 32768.0
    norm_samples = samples
    gain = db_to_linear(gain_db)

    # Apply gain
    amplified = gain * norm_samples

    # Apply hard clipping to simulate distortion
    clipped = np.clip(amplified, -1.0, 1.0)

    # Add odd harmonics using a cubic nonlinearity
    distorted = clipped - (1/3.0) * clipped**3

    # MODIFICATION: the original returned int16 samples
    # # Rescale to 16-bit PCM
    # output = np.int16(distorted * 32767)
    # return output
    return distorted


def distort_chatgpt4o_c1p2(samples, gain_db, sample_rate, channels):
    # MODIFICATION: the original expected int16 samples and linear gain
    # # Normalize to [-1, 1]
    # norm_samples = samples / 32768.0
    norm_samples = samples
    gain = db_to_linear(gain_db)

    # Apply gain before distortion
    driven = gain * norm_samples

    # Apply tanh for soft clipping
    distorted = np.tanh(driven)

    # MODIFICATION: the original returned int16 samples
    # # Optional: renormalize to original range
    # output = distorted * 32767
    # return output.astype(np.int16)
    return np.clip(distorted, -1.0, 1.0)


def distort_chatgpt4o_c1p4(samples, gain_db, sample_rate, channels):
    def lowpass_filter(signal, cutoff_ratio=0.5):
        # Simple 5-tap FIR lowpass filter
        kernel = np.array([0.1, 0.25, 0.3, 0.25, 0.1])
        filtered = np.convolve(signal, kernel, mode='same')
        return filtered

    # MODIFICATION: the original expected int16 samples and linear gain
    # # Normalize to [-1, 1]
    # norm = samples / 32768.0
    norm = samples
    gain = db_to_linear(gain_db)

    # Upsample 2x (insert interpolated values between samples)
    up_len = norm.shape[0] * 2
    upsampled = np.zeros((up_len, 2), dtype=np.float32)

    # Copy original samples to even indices
    upsampled[::2] = norm

    # Linear interpolation for odd indices (except last)
    interp = (norm[:-1] + norm[1:]) / 2.0
    upsampled[1:-1:2] = interp

    # Edge case: copy last sample for the final odd index
    upsampled[-1] = norm[-1]

    # Apply gain and tanh distortion
    driven = gain * upsampled
    distorted = np.tanh(driven)

    # Low-pass filter
    filtered_L = lowpass_filter(distorted[:, 0])
    filtered_R = lowpass_filter(distorted[:, 1])
    filtered = np.stack([filtered_L, filtered_R], axis=1)

    # Downsample
    downsampled = filtered[::2]

    # MODIFICATION: the original returned clipped int16 samples
    # # Rescale to 16-bit PCM range
    # output = np.clip(downsampled * 32767, -32768, 32767)
    # return output.astype(np.int16)
    return np.clip(downsampled, -1.0, 1.0)


def distort_chatgpt4o_c1p5(samples, gain_db, sample_rate, channels):
    def simple_lowpass(signal, alpha=0.5):
        """One-pole low-pass filter per channel (real-time friendly)"""
        filtered = np.zeros_like(signal)
        filtered[0] = signal[0]
        for i in range(1, len(signal)):
            filtered[i] = alpha * signal[i] + (1 - alpha) * filtered[i - 1]
        return filtered

    # MODIFICATION: the original expected int16 samples and linear gain
    # # Normalize to [-1, 1]
    # norm = samples / 32768.0
    norm = samples
    gain = db_to_linear(gain_db)

    # Pre-filter to limit bandwidth (reduce aliasing)
    prefiltered_L = simple_lowpass(norm[:, 0], alpha=0.2)
    prefiltered_R = simple_lowpass(norm[:, 1], alpha=0.2)
    prefiltered = np.stack([prefiltered_L, prefiltered_R], axis=1)

    # Apply gain and tanh distortion
    driven = gain * prefiltered
    distorted = np.tanh(driven)

    # Optional: post-filter to tame high end fizz (light smoothing)
    postfiltered_L = simple_lowpass(distorted[:, 0], alpha=0.1)
    postfiltered_R = simple_lowpass(distorted[:, 1], alpha=0.1)
    postfiltered = np.stack([postfiltered_L, postfiltered_R], axis=1)

    # MODIFICATION: the original returned clipped int16 samples
    # # Scale back to 16-bit PCM
    # output = np.clip(postfiltered * 32767, -32768, 32767)
    # return output.astype(np.int16)
    return np.clip(postfiltered, -1.0, 1.0)


def distort_chatgpt4o_c1p7(samples, gain_db, sample_rate, channels):
    def lowpass_filter(signal, cutoff_ratio=0.5):
        # Simple 5-tap FIR low-pass filter
        kernel = np.array([0.1, 0.25, 0.3, 0.25, 0.1])
        return np.convolve(signal, kernel, mode='same')

    # MODIFICATION: the original expected int16 samples and linear gain
    # # Normalize to [-1, 1]
    # norm = samples / 32768.0
    norm = samples
    gain = db_to_linear(gain_db)

    # Pre-filter each channel to reduce aliasing
    filtered_L = lowpass_filter(norm[:, 0])
    filtered_R = lowpass_filter(norm[:, 1])
    prefiltered = np.stack([filtered_L, filtered_R], axis=1)

    # Apply gain and tanh distortion
    driven = gain * prefiltered
    distorted = np.tanh(driven)

    # MODIFICATION: the original returned clipped int16 samples
    # # Scale back to 16-bit PCM
    # output = np.clip(distorted * 32767, -32768, 32767)
    # return output.astype(np.int16)
    return np.clip(distorted, -1.0, 1.0)


def distort_chatgpt4o_c2p1(samples, gain_db, sample_rate, channels):
    def apply_pre_filter(samples, cutoff=8000, order=2):
        nyquist = 0.5 * SAMPLE_RATE
        normal_cutoff = cutoff / nyquist
        b, a = butter(order, normal_cutoff, btype='low', analog=False)
        filtered = np.zeros_like(samples, dtype=np.float32)
        for ch in range(NUM_CHANNELS):
            filtered[:, ch] = lfilter(b, a, samples[:, ch])
        return filtered

    # MODIFICATION: the original expected int16 samples and used linear gain
    # # Normalize to [-1, 1]
    # normalized = samples / 32768.0
    normalized = samples
    GAIN = db_to_linear(gain_db)

    # Pre-filter to reduce aliasing
    filtered = apply_pre_filter(normalized)
    # Apply gain and tanh distortion
    distorted = np.tanh(filtered * GAIN)

    # MODIFICATION: the original returned clipped int16 samples
    # # Scale back to int16 range
    # output = np.clip(distorted * 32767.0, -32768, 32767)
    # return output.astype(np.int16)
    return np.clip(distorted, -1.0, 1.0)


def distort_chatgpt4o_unspectechnique(samples, gain_db, sample_rate, channels):
    # Parameters
    oversample_factor = 4  # 4x oversampling for good antialiasing with minimal CPU use

    # Convert dB gain to linear
    gain = 10 ** (gain_db / 20.0)

    # Apply oversampling (per channel)
    oversampled = resample_poly(samples, up=oversample_factor, down=1, axis=0)

    # Apply gain and non-linearity
    processed = np.tanh(oversampled * gain)

    # Downsample back to original rate
    distorted = resample_poly(processed, up=1, down=oversample_factor, axis=0)

    # Ensure the output shape matches input (can be slightly off due to filtering)
    distorted = distorted[:samples.shape[0], :]

    return distorted.astype(np.float32)


def distort_gemini2_5pro_adaa(samples, gain_db, sample_rate, channels):
    """
    Applies gain boosting and tanh non-linearity with 1st order ADAA.

    This function implements Antiderivative Antialiasing (ADAA) of the
    first order to mitigate aliasing introduced by the tanh non-linearity
    when applied to the gain-boosted signal.

    The 1st order ADAA formula for a non-linearity f(x) is approximated by:
      y[n] = (F(x[n]) - F(x[n-1])) / (x[n] - x[n-1])   if x[n] != x[n-1]
      y[n] = f(x[n])                                   if x[n] == x[n-1]
    where F(x) is the antiderivative (integral) of f(x).

    For f(x) = tanh(x), the antiderivative F(x) = log(cosh(x)).

    Args:
        samples (np.ndarray): Input audio samples of shape (N, channels),
                              expected to be float32. N is the number of samples.
        gain_db (float): Gain boost to apply in decibels (dB). Defaults to 14.0.
        sample_rate (float): Sample rate of the audio. Currently unused in
                             this implementation but kept for convention.
                             Defaults to 44100.0.
        channels (int): Number of audio channels in the input samples array.
                        Defaults to 2.

    Returns:
        np.ndarray: Distorted audio samples of the same shape and dtype as input.

    Notes:
        - For very high gain values (e.g., > 60 dB), intermediate calculations
          like cosh(x) might overflow standard float32/float64 types.
          Consider using higher precision or input clipping if needed.
    """
    # Ensure input is float to avoid potential integer issues
    # Although the prompt specifies float32, let's work with float64 for
    # intermediate calculations if input allows, for better precision/range.
    input_dtype = samples.dtype
    # Convert to float64 for intermediate steps if not already, helps with log/cosh
    x = samples.astype(np.float64) if input_dtype == np.float32 else samples.copy()


    # 1. Convert gain from dB to linear scale
    linear_gain = 10.0**(gain_db / 20.0)

    # 2. Apply gain to the input samples
    x = x * linear_gain

    # 3. Prepare current samples x[n] and previous samples x[n-1] for ADAA
    x_n = x
    # Use zeros as the initial state for x[-1] for each channel
    initial_state = np.zeros((1, channels), dtype=x.dtype)
    # Create x[n-1] by prepending the initial state and taking x up to the second to last sample
    x_n_minus_1 = np.vstack((initial_state, x[:-1, :]))

    # Ensure shapes are consistent after vstack/slicing
    assert x_n.shape == x_n_minus_1.shape, "Shape mismatch between x_n and x_n_minus_1"

    # 4. Calculate the difference in input samples: delta_x = x[n] - x[n-1]
    delta_x = x_n - x_n_minus_1

    # 5. Calculate the antiderivative F(x) = log(cosh(x)) for x[n] and x[n-1]
    # Using np.log(np.cosh(x)) directly. Be mindful of potential overflow for large x.
    # A more robust way for large x: F(x) ≈ |x| - log(2), but log(cosh(x)) is standard.
    Fx_n = np.log(np.cosh(x_n))
    Fx_n_minus_1 = np.log(np.cosh(x_n_minus_1))

    # Calculate the difference in the antiderivative: delta_F = F(x[n]) - F(x[n-1])
    delta_F = Fx_n - Fx_n_minus_1

    # 6. Apply the 1st order ADAA formula
    # We need to handle the case where delta_x is zero (x[n] == x[n-1]).
    # In this case, the output y[n] should be the direct application of the
    # non-linearity, f(x[n]) = tanh(x[n]), which is the limit of the ADAA formula.
    # Using np.where handles this efficiently without explicit loops or masks.

    # Suppress runtime warnings for division by zero, as np.where will handle it.
    with np.errstate(divide='ignore', invalid='ignore'):
        distorted = np.where(
            delta_x == 0,
            np.tanh(x_n),      # If delta_x is 0, use the original function value tanh(x[n])
            delta_F / delta_x  # Otherwise, use the ADAA approximation
        )

    # Handle potential NaNs resulting from 0/0 if both delta_F and delta_x are zero
    # (although np.where should select tanh(x_n) in this case).
    # This can also happen if F(x) results in inf (due to cosh overflow) and inf - inf occurs.
    nan_mask = np.isnan(distorted)
    if np.any(nan_mask):
        # print("Warning: NaN detected in ADAA output, replacing with tanh(x_n). Gain might be too high.")
        distorted[nan_mask] = np.tanh(x_n[nan_mask])

    # Convert back to the original data type if we upcasted earlier
    return distorted.astype(input_dtype)


def distort_gemini2_5pro_unspectechnique(samples, gain_db, sample_rate, channels):
    """
    Applies gain boosting and tanh distortion with anti-aliasing via oversampling.

    This function increases the signal amplitude, applies a tanh saturation curve,
    and uses oversampling (if SciPy is available) to mitigate aliasing artifacts
    introduced by the non-linear distortion.

    Args:
        samples (np.ndarray): Input audio signal. Must be a 2D NumPy array of
                              shape (N, channels), where N is the number of samples.
                              Expected dtype is float32 (or float64).
        gain_db (float): The amount of gain boost to apply in decibels (dB)
                         before the non-linearity. Defaults to 14.0.
        sample_rate (float): The sample rate of the audio in Hz.
                             Currently unused in the core logic but kept for
                             potential future use or context. Defaults to 44100.0.
        channels (int): The number of channels in the audio signal. Must match
                        the second dimension of the `samples` array. Defaults to 2.

    Returns:
        np.ndarray: The distorted audio signal, with the same shape and dtype
                    as the input `samples`. Returns an array of zeros if an
                    unexpected error occurs during processing.

    Raises:
        TypeError: If `samples` is not a NumPy array.
        ValueError: If `samples` is not 2D or its second dimension doesn't match `channels`.
    """

    # --- Input Validation ---
    if not isinstance(samples, np.ndarray):
        raise TypeError("Input 'samples' must be a NumPy array.")
    if samples.ndim != 2:
        raise ValueError(f"Input 'samples' must be a 2D array (N, channels), but got shape {samples.shape}.")
    if samples.shape[1] != channels:
        raise ValueError(f"Input 'samples' second dimension ({samples.shape[1]}) "
                         f"does not match 'channels' parameter ({channels}).")
    if samples.size == 0:
         return samples # Return empty array if input is empty

    original_dtype = samples.dtype
    original_length = samples.shape[0]

    # --- Parameters ---
    gain_linear = 10.0**(gain_db / 20.0)

    # Oversampling factor: 4x is a common choice balancing quality and performance.
    # Higher values (e.g., 8x) provide better anti-aliasing at higher CPU cost.
    # Lower values (e.g., 2x) are faster but less effective.
    oversampling_factor = 4

    # --- Processing ---
    try:
        if _SCIPY_AVAILABLE:
            # 1. Upsample the signal
            #    We process along axis=0 (the time dimension).
            #    resample_poly handles the low-pass filtering needed before downsampling implicitly.
            #    It's generally recommended to use float64 for internal filter precision,
            #    but let's try to stick with the input type for performance first.
            #    resample_poly might cast internally anyway.
            samples_upsampled = resample_poly(samples, up=oversampling_factor, down=1, axis=0)

            # 2. Apply gain and non-linear distortion (tanh)
            distorted_upsampled = np.tanh(samples_upsampled * gain_linear)

            # 3. Downsample the signal back to the original rate
            distorted_resampled = resample_poly(distorted_upsampled, up=1, down=oversampling_factor, axis=0)

            # 4. Match original length
            #    Resampling can slightly change the length due to filter transients.
            #    Truncate or pad to ensure the output length is exactly N.
            current_length = distorted_resampled.shape[0]
            if current_length > original_length:
                distorted = distorted_resampled[:original_length, :]
            elif current_length < original_length:
                # Pad with zeros at the end if it's shorter
                pad_width = original_length - current_length
                # Pad format: ((before_axis0, after_axis0), (before_axis1, after_axis1))
                padding = ((0, pad_width), (0, 0))
                distorted = np.pad(distorted_resampled, pad_width=padding, mode='constant', constant_values=0)
            else:
                distorted = distorted_resampled

        else:
            # Fallback: No anti-aliasing if SciPy is not available
            print("Executing distortion without anti-aliasing (SciPy not available).")
            distorted_no_aa = np.tanh(samples * gain_linear)
            distorted = distorted_no_aa # Length and shape remain the same

        # 5. Ensure output dtype matches input dtype
        if distorted.dtype != original_dtype:
            distorted = distorted.astype(original_dtype)

        # Final shape check (paranoid check)
        if distorted.shape != (original_length, channels):
             print(f"Warning: Final shape {distorted.shape} differs from expected {(original_length, channels)}. Reshaping/Padding.")
             # Attempt to fix shape if possible, fallback to zeros
             if distorted.size == original_length * channels:
                 distorted = distorted.reshape(original_length, channels)
             else: # If size mismatch, something went wrong, return zeros
                  distorted = np.zeros((original_length, channels), dtype=original_dtype)


    except Exception as e:
        print(f"An error occurred during distortion processing: {e}")
        # Return a zero array matching the input shape in case of unexpected errors
        distorted = np.zeros_like(samples)
        if distorted.dtype != original_dtype: # Ensure dtype match even for zeros
             distorted = distorted.astype(original_dtype)


    return distorted


def distort_manual_adaa(samples, gain_db, sample_rate, channels):
    def prev_samples(samples, pad):
        return np.concatenate(
            (np.ones((1, samples.shape[1])) * pad, samples[:-1, :])
        )

    def f(x, gain_linear):
        return np.tanh(x * gain_linear)

    def integral_f(x, gain_linear):
        return x + np.log1p(np.exp(-2.0 * gain_linear * x)) / gain_linear

    gain_linear = db_to_linear(gain_db)

    deltas = samples - prev_samples(samples, 0.0)

    deltas_too_small = np.abs(deltas) < 1e-7
    deltas[deltas_too_small] = 1.0

    integral_f_samples = integral_f(samples, gain_linear)
    prev_integral_f_samples = prev_samples(integral_f_samples, integral_f(0.0, gain_linear))

    distorted_samples = (integral_f_samples - prev_integral_f_samples) / deltas
    distorted_samples[deltas_too_small] = f(samples[deltas_too_small], gain_linear)

    return distorted_samples


def distort_manual_adaa_improved(samples, gain_db, sample_rate, channels):
    def prev_samples(samples, pad):
        return np.concatenate(
            (np.ones((1, samples.shape[1])) * pad, samples[:-1, :])
        )

    def f(x):
        return np.tanh(x)

    def integral_f(x):
        return np.log(np.cosh(x))

    samples = samples * db_to_linear(gain_db)

    deltas = samples - prev_samples(samples, 0.0)

    deltas_too_small = np.abs(deltas) < 1e-7
    deltas[deltas_too_small] = 1.0

    integral_f_samples = integral_f(samples)
    prev_integral_f_samples = prev_samples(integral_f_samples, integral_f(0.0))

    distorted_samples = (integral_f_samples - prev_integral_f_samples) / deltas
    distorted_samples[deltas_too_small] = f(samples[deltas_too_small])

    return distorted_samples


def distort_r1_adaa(samples, gain_db, sample_rate, channels):
    # Convert gain from dB to linear scale
    gain_linear = 10.0 ** (gain_db / 20.0)

    # Apply gain to the input samples
    gained_samples = samples * gain_linear

    # Compute tanh with 1st order ADAA
    # Anti-derivative of tanh is log(cosh(x))
    # We need to handle the ADAA computation for each channel separately

    distorted = np.zeros_like(gained_samples)

    for c in range(channels):
        x = gained_samples[:, c]

        # Compute current and previous samples
        x_prev = np.roll(x, 1)
        x_prev[0] = 0  # Handle first sample

        # ADAA condition: when x == x_prev, we use direct tanh to avoid division by zero
        mask = np.abs(x - x_prev) < 1e-6
        not_mask = ~mask

        # Compute ADAA tanh where x != x_prev
        tanh_x = np.tanh(x)
        tanh_x_prev = np.tanh(x_prev)

        # Anti-derivative of tanh is log(cosh(x))
        ad1_x = np.log(np.cosh(x))
        ad1_x_prev = np.log(np.cosh(x_prev))

        # ADAA tanh
        adaa_tanh = np.zeros_like(x)
        adaa_tanh[not_mask] = (ad1_x[not_mask] - ad1_x_prev[not_mask]) / (x[not_mask] - x_prev[not_mask])
        adaa_tanh[mask] = tanh_x[mask]  # fallback to direct tanh when x ≈ x_prev

        distorted[:, c] = adaa_tanh

    return distorted


def distort_r1_unspectechnique(samples, gain_db, sample_rate, channels):
    """
    Apply gain boosting and tanh non-linearity to an audio signal with anti-aliasing.

    Args:
        samples: Input audio array (N x channels) in float32 (-1.0 to 1.0)
        gain_db: Gain to apply in decibels before distortion
        sample_rate: Sampling rate of the audio
        channels: Number of audio channels

    Returns:
        Distorted audio with anti-aliasing
    """
    # Convert gain from dB to linear scale
    gain_linear = 10 ** (gain_db / 20.0)

    # Apply gain
    gained = samples * gain_linear

    # Anti-aliasing processing
    # We'll upsample, apply non-linearity, then downsample
    up_factor = 2  # Upsampling factor (2x is often sufficient for audio)
    down_factor = 1

    distorted = np.zeros_like(gained)

    for channel in range(channels):
        channel_data = gained[:, channel]

        # Upsample with anti-aliasing filter
        upsampled = resample_poly(channel_data, up_factor, down_factor, 
                                 window=('kaiser', 5.0))

        # Apply non-linearity (tanh) to the upsampled signal
        distorted_upsampled = np.tanh(upsampled)

        # Downsample with anti-aliasing filter
        downsampled = resample_poly(distorted_upsampled, down_factor, up_factor, 
                                   window=('kaiser', 5.0))

        # Ensure we don't have length mismatches due to polyphase rounding
        if len(downsampled) > len(channel_data):
            downsampled = downsampled[:len(channel_data)]
        elif len(downsampled) < len(channel_data):
            downsampled = np.pad(downsampled, (0, len(channel_data) - len(downsampled)), 
                                mode='constant')

        distorted[:, channel] = downsampled

    # Clip any remaining values outside [-1, 1] (shouldn't happen due to tanh)
    return np.clip(distorted, -1.0, 1.0)


def distort_chatgpt4o_noupspl(samples, gain_db, sample_rate, channels):
    # Convert gain from dB to linear
    gain = 10 ** (gain_db / 20.0)
    
    # Apply gain
    boosted = gain * samples

    # Bandlimited approximation of tanh using a smooth sigmoid-like curve
    # This approximation is faster and produces fewer aliasing artifacts than np.tanh
    def fast_tanh(x):
        return x / (1.0 + np.abs(x) + 0.0001)  # Small epsilon to avoid division issues

    # Apply the bandlimited non-linearity
    distorted = fast_tanh(boosted)

    return distorted.astype(np.float32)


def distort_r1_noupspl(samples, gain_db, sample_rate, channels):
    """
    Apply gain boosting and tanh distortion to audio samples with anti-aliasing.
    
    Parameters:
        samples (np.ndarray): Input audio samples (N x channels)
        gain_db (float): Gain to apply in decibels before distortion
        sample_rate (float): Sampling rate in Hz
        channels (int): Number of audio channels
    
    Returns:
        np.ndarray: Distorted audio samples
    """
    # Convert gain from dB to linear scale
    gain_linear = 10 ** (gain_db / 20.0)
    
    # Apply gain to input signal
    gained = samples * gain_linear
    
    # Design anti-aliasing filter (lowpass before non-linearity)
    # Cutoff frequency is 0.45 * Nyquist (empirically determined good balance)
    cutoff = 0.45 * (sample_rate / 2)
    nyquist = sample_rate / 2
    normal_cutoff = cutoff / nyquist
    
    # Use 4th order Butterworth filter (good balance between steepness and CPU)
    b, a = signal.butter(4, normal_cutoff, btype='low', analog=False)
    
    # Apply filter to each channel
    filtered = np.zeros_like(gained)
    for ch in range(channels):
        # Use filtfilt for zero-phase filtering (avoids phase distortion)
        filtered[:, ch] = signal.filtfilt(b, a, gained[:, ch])
    
    # Apply tanh non-linearity (soft clipping)
    distorted = np.tanh(filtered)
    
    # Normalize to prevent clipping (optional, could be parameterized)
    max_sample = np.max(np.abs(distorted))
    if max_sample > 0.9:  # Only normalize if we're close to clipping
        distorted = distorted * (0.9 / max_sample)
    
    return distorted


def distort_gemini2_5pro_noupspl(samples, gain_db, sample_rate, channels):
    """
    Applies gain boosting and tanh distortion with anti-aliasing filtering.

    This implementation uses a low-pass filter after the tanh non-linearity
    to mitigate aliasing generated by the distortion process, without resorting
    to oversampling. This is a common and CPU-friendly approach for real-time
    processing when perfect anti-aliasing (like ADAA or oversampling) is
    not feasible or desired.

    Args:
        samples (np.ndarray): Input audio samples, expected shape (N, channels).
                                Should be float32, usually in range [-1.0, 1.0].
        gain_db (float): Gain boost in decibels. Defaults to 14.0.
        sample_rate (float): Audio sample rate in Hz. Defaults to 44100.0.
        channels (int): Number of audio channels. Must match samples.shape[1].
                        Defaults to 2.

    Returns:
        np.ndarray: Distorted audio samples (float32, shape (N, channels)).

    Raises:
        ValueError: If samples.shape[1] does not match the channels parameter.
    """
    if samples.ndim != 2 or samples.shape[1] != channels:
        raise ValueError(
            f"Input samples shape {samples.shape} is inconsistent with channels={channels}. "
            f"Expected shape (N, {channels})."
        )
    # Ensure input is float32 for processing consistency
    if samples.dtype != np.float32:
        warnings.warn(f"Input samples dtype is {samples.dtype}, converting to float32.")
        samples = samples.astype(np.float32)

    # 1. Convert gain from dB to linear scale
    gain_lin = 10**(gain_db / 20.0)

    # 2. Apply gain
    # Ensure we work with a copy if samples might be modified elsewhere
    boosted_samples = samples * gain_lin

    # 3. Apply tanh non-linearity
    # This step introduces harmonics, potentially above the Nyquist frequency
    distorted_naive = np.tanh(boosted_samples)

    # 4. Anti-aliasing filter (Low-pass filtering *after* non-linearity)
    # Design a low-pass filter to remove frequencies above Nyquist
    # that were generated by the tanh function.
    nyquist = sample_rate / 2.0

    # Set cutoff frequency slightly below Nyquist to attenuate aliasing products.
    # A value like 0.9 * nyquist is a common starting point. Reducing it further
    # increases aliasing reduction but might also remove desired high-frequency
    # content from the distortion. A higher value preserves more highs but
    # reduces aliasing less.
    # Ensure cutoff is strictly less than Nyquist for filter design.
    cutoff_hz = min(nyquist * 0.9, nyquist - 1e-6) # Safety margin

    # Normalize cutoff frequency (0 to 1.0, where 1.0 is Nyquist)
    normalized_cutoff = cutoff_hz / nyquist

    # Use a Butterworth filter - provides a good balance between rolloff steepness
    # and phase response. An order of 4 is a reasonable compromise between
    # effectiveness and CPU cost for real-time processing. Higher orders provide
    # steeper rolloff but cost more CPU and can have stability issues if not
    # implemented carefully (hence using SOS).
    filter_order = 4
    sos = signal.butter(filter_order, normalized_cutoff, btype='low', analog=False, output='sos')

    # Apply the filter to each channel independently using Second-Order Sections (SOS)
    # `sosfilt` is generally more numerically stable than `lfilter` (using b, a coeffs)
    # especially for higher filter orders or lower cutoff frequencies.
    # axis=0 assumes samples are along the first dimension (N samples, C channels)
    distorted_filtered = signal.sosfilt(sos, distorted_naive, axis=0)

    # Ensure output dtype is float32, consistent with input expectation
    return distorted_filtered.astype(np.float32)


if __name__ == "__main__":
    main()
