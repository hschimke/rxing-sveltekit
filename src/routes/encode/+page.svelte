<script lang="ts">
    import { encode_barcode } from "rxing-wasm";
    import BarcodeFormatSelect from "../../lib/BarcodeFormatSelect.svelte";

    let input_text: string;
    let bcr = "";
    let selected: number = 0;
    let width: number = 150;
    let height: number = 150;

    const encode_data = () => {
        if (
            selected == 0 ||
            input_text == undefined ||
            input_text.length == 0
        ) {
            alert("Select barcode fomat");
        } else {
            try {
                let encoded_data = encode_barcode(
                    input_text,
                    width,
                    height,
                    selected - 1
                );
                bcr = encoded_data;
            } catch (e) {
                alert("Could not encode: " + e);
                bcr = "";
            }
        }
    };

    const handle_select = (event: Event) => {
        let target = event.target as HTMLSelectElement;
        selected = target.selectedIndex;
    };
</script>

<h2>encode</h2>
<p>
    Currently only ASCII encoding is supported, support for images and svg
    coming in the future.
</p>
<div id="create_space">
    <div>
        <textarea bind:value={input_text} />
        <BarcodeFormatSelect on:change={handle_select} />
        <label>Width: <input type="number" bind:value={width} /></label>
        <label>Height: <input type="number" bind:value={height} /></label>
        <button on:click={encode_data}>encode</button>
    </div>
    <div id="barcode_output"><pre>{bcr}</pre></div>
</div>

<style>
    textarea {
        width: 500px;
        height: 150px;
        display: block;
        margin-bottom: 0.75em;
    }
    #create_space {
        display: block;
    }
    input {
        width: 5em;
    }
    label {
        padding-left: 1em;
    }
</style>
