<script lang="ts">
    import ShowForm from '$lib/components/ShowForm.svelte';
    import ModalContainer from '$lib/components/ModalContainer.svelte';

    let isModalActive = false
    let mode: "add" | "edit" | "delete" = "add"
    let show = {
        id: "",
        user_id: 0,
        title: "",
        description: "",
        view_code: "",
        public: false,
        created_at: "" as unknown as Date,
        updated_at: "" as unknown as Date,
    }

    const handleModalOpen = (modelMode:"add" | "edit" | "delete") => { 
        isModalActive = true
        mode = modelMode
    }
</script>

<header>
    <nav>
        <ul class="p-2 flex gap-2 justify-end">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/profile">Profile</a>
            </li>
            <li>
                <a href="/shows">Shows</a>
            </li>
            <li>
                <button class="text-green-500" on:click={() => handleModalOpen("add")}>New</button>
            </li>
        </ul>
    </nav>
</header>
<ModalContainer bind:modal={isModalActive}>
    <ShowForm mode={mode} show={show} bind:modal={isModalActive}/>
</ModalContainer>
