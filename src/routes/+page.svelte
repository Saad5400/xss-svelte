<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import Label from "$lib/components/ui/label/label.svelte";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import type {PageData, ActionData} from "./$types";
    import {enhance, applyAction} from "$app/forms";
    import {Card, CardContent, CardFooter} from "$lib/components/ui/card";
    import {invalidateAll} from "$app/navigation";
    import {fade} from "svelte/transition";
    import {onMount} from "svelte";

    let {data}: { data: PageData; form: ActionData } = $props();
    let loading = $state(false);

    // invalidate data each 500ms to get the latest comments
    onMount(() => {
        const interval = setInterval(async () => {
            await invalidateAll();
        }, 1000);
        return () => clearInterval(interval);
    });
</script>

<div class="my-8 min-h-[100vh]">
	<div class="text-xl flex flex-col gap-4 container ">
		<h1>All Comments:</h1>
		{#each data.comments as comment (comment.id)}
			<div transition:fade>
				<Card
					class="border-primary border-b-4 border-r-4 border-t-1 border-l-1"
				>
					<CardContent>
						<!-- NOT SAFE! -->
						{@html comment.content}
					</CardContent>
					<CardFooter class="text-foreground/50 text-sm flex">
            <span class="flex-1">
              Created at: {comment.created_at.toLocaleDateString()}, Id: {comment.id}
            </span>
						<form method="POST" action="?/delete" use:enhance>
							<input name="id" type="hidden" value={comment.id}/>
							<Button type="submit" size="sm" variant="destructive">
								Delete
							</Button>
						</form>
					</CardFooter>
				</Card>
			</div>
		{/each}
	</div>

	<form
		method="POST"
		action="?/create"
		class="flex flex-col gap-2 backdrop-blur p-8 sticky bottom-0"
		use:enhance={({ formElement, formData, action, cancel }) => {
      loading = true;
      return async ({ result }) => {
        loading = false;

        await invalidateAll();
        formElement.reset();

        await applyAction(result);
      };
    }}
	>
		<Textarea
			placeholder="Write your comment here!"
			class="border-primary bg-card text-xl border-b-4 border-r-4 border-t-1 border-l-1 "
			name="content"
			required
		/>
		<Button type="submit" disabled={loading}>Submit!</Button>
	</form>
</div>
