<script lang="ts">
    import type { BarcodeResult } from "rxing-wasm";
    import { BarcodeFormat } from "rxing-wasm";

    export let result: BarcodeResult | undefined;
    export let show: boolean = false;
</script>

{#if show}
    {#if result !== undefined}
        <ul>
            <li>
                <span class="name">Format:</span><span class="data"
                    >{BarcodeFormat[result?.format()]}</span
                >
            </li>
            <li>
                <span class="name">Text:</span><span class="data"
                    >{result?.text()}</span
                >
            </li>
            <li>
                <span class="name">Bits:</span><span class="data"
                    >{result?.num_bits()}</span
                >
            </li>
            <li>
                <span class="name">Raw Bytes:</span><span class="data"
                    >{result?.raw_bytes()}</span
                >
            </li>
        </ul>
    {:else}
        NOT FOUND #{/if}
{/if}

<style>
    ul {
        list-style: none;
    }
    li {
        display: grid;
        grid-template-columns: 7em 1fr;
        padding-bottom: 0.5em;
    }
    li span {
        display: inline-block;
    }

    span.name {
        font-family: "Courier New", Courier, monospace;
        font-weight: bold;
    }
</style>
