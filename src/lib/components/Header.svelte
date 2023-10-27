<script lang="ts">
    import type { ModalType } from "$lib/models/modal";
	import { getModalActive } from "$lib/context/modal";

    const modal = getModalActive()

    const handleFormOpen = (modelType:ModalType) => {
        $modal.active = true
        $modal.type = modelType
        $modal.data = {
            id: "",
            user_id: 0,
            title: "",
            description: "",
            view_code: "",
            public: false,
            created_at: "" as unknown as Date,
            updated_at: "" as unknown as Date,
        }
    }
</script>

<header class="sticky top-0 right-0 bg-[#292929]">
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
                <button class="text-green-500" on:click={() => handleFormOpen("show-add")}>New</button>
            </li>
        </ul>
    </nav>
</header>
