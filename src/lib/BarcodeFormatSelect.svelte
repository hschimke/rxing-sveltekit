<script lang="ts">
    import { BarcodeFormat } from "rxing-wasm";
    import { onMount } from "svelte";

    let bc_select: HTMLSelectElement;

    onMount(() => {
        for (const value in Object.keys(BarcodeFormat)) {
            if (BarcodeFormat[value] != undefined) {
                const o_el = new Option();
                o_el.value = value;
                o_el.innerText = BarcodeFormat[value];
                bc_select.options.add(o_el);
            }
        }
    });
</script>

<select bind:this={bc_select} on:change>
    <option>Select Format</option>
</select>
