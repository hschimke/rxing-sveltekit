<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const hints: {
        name: string;
        type: "string" | "bool" | "list" | "unsupported";
    }[] = [
        { name: "Other", type: "string" },
        { name: "PureBarcode", type: "bool" },
        { name: "PossibleFormats", type: "list" },
        { name: "TryHarder", type: "bool" },
        { name: "CharacterSet", type: "string" },
        { name: "AllowedLengths", type: "list" },
        { name: "AssumeCode39CheckDigit", type: "bool" },
        { name: "AssumeGs1", type: "bool" },
        { name: "ReturnCodabarStartEnd", type: "bool" },
        { name: "NeedResultPointCallback", type: "unsupported" },
        { name: "AllowedEanExtensions", type: "bool" },
        { name: "AlsoInverted", type: "bool" },
    ];

    const dispatch = createEventDispatcher();

    const do_update = (e: Event) => {
        let target = e.target as HTMLInputElement;
        switch (target?.type) {
            case "text": {
                dispatch("hintUpdate", {
                    name: target?.name,
                    value: target?.value,
                });
                // alert( e.target?.name + " " + e.target?.value )
                break;
            }
            case "checkbox": {
                dispatch("hintUpdate", {
                    name: target?.name,
                    value: target?.checked.toString(),
                });
                // alert( e.target?.name + " " + e.target?.checked )
                break;
            }
        }
    };
</script>

<ul>
    {#each hints as hint}
        <li>
            <label for={"ID_" + hint.name}>
                <span>{hint.name}</span>
            </label>
            {#if hint.type == "string"}
                <input
                    name={hint.name}
                    id={"ID_" + hint.name}
                    type="text"
                    on:change={do_update}
                />
            {:else if hint.type == "bool"}
                <input
                    name={hint.name}
                    id={"ID_" + hint.name}
                    type="checkbox"
                    on:change={do_update}
                />
            {:else if hint.type == "list"}
                <input
                    name={hint.name}
                    id={"ID_" + hint.name}
                    type="text"
                    on:change={do_update}
                />
            {:else if hint.type == "unsupported"}
                <span class="unsupported">unsupported</span>
            {/if}
        </li>
    {/each}
</ul>

<style>
    li {
        width: 25em;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
    }
    li label span {
        display: inline-block;
    }
    li label input {
        display: ineline-block;
    }

    span.unsupported {
        font-family: "Courier New", Courier, monospace;
        color: gray;
    }
</style>
