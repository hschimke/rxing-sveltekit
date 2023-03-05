<script lang="ts">
    import {
        BarcodeResult,
        convert_js_image_to_luma,
        DecodeHintDictionary,
        DecodeHintTypes,
        decode_barcode_with_hints,
    } from "rxing-wasm";
    import DecodeHints from "../../lib/DecodeHints.svelte";
    import BarcodeResultDisplay from "../../lib/BarcodeResultDisplay.svelte";

    let files: FileList;
    let canvas: HTMLCanvasElement;
    let hints: DecodeHintDictionary;
    let barcode_result: BarcodeResult | undefined;
    let show_brd: boolean = false;

    const show_image = () => {
        if (hints == undefined) {
            hints = new DecodeHintDictionary();
        }

        const context = canvas.getContext("2d");
        const imageData = context?.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        ).data;
        const luma_data = convert_js_image_to_luma(
            new Uint8Array(imageData == undefined ? [] : imageData)
        );
        // const hints = new DecodeHintDictionary();
        // hints.set_hint(DecodeHintTypes.TryHarder, "true");
        try {
            const result = decode_barcode_with_hints(
                luma_data,
                canvas.width,
                canvas.height,
                hints
            );
            barcode_result = result;
        } catch (e) {
            barcode_result = undefined;
        }
        show_brd = true;
    };

    const handle_file = () => {
        const img = new Image();
        img.src = URL.createObjectURL(files[0]);
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            canvas
                .getContext("2d")
                ?.drawImage(img, 0, 0, img.width, img.height);
            show_brd = false;
        };
    };

    const handle_hint_update = (
        event: CustomEvent<{ name: string; value: string }>
    ) => {
        if (hints == undefined) {
            hints = new DecodeHintDictionary();
        }
        if (event.detail.value == "" || event.detail.value == "false") {
            hints.remove_hint(DecodeHintTypes[event.detail.name]);
        } else {
            hints.set_hint(
                DecodeHintTypes[event.detail.name],
                event.detail.value
            );
        }
    };
</script>

<h2>Decode</h2>
<div id="hints_and_image">
    <div>
        <DecodeHints on:hintUpdate={handle_hint_update} />
        <input
            type="file"
            bind:files
            accept="image/*"
            on:change={handle_file}
        />
        <button on:click={show_image}>Show</button>
    </div>

    <canvas bind:this={canvas} />
    <BarcodeResultDisplay result={barcode_result} show={show_brd} />
</div>

<style>
    #hints_and_image {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
</style>
