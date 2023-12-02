<script lang="ts">
	import { Marked } from "marked";
	import { markedHighlight } from "marked-highlight";
	import hljs from "highlight.js";
	// import "highlight.js/styles/night-owl.css";
	import "highlight.js/styles/tomorrow-night-blue.css";

	const marked = new Marked(
		markedHighlight({
			langPrefix: "hljs language-",
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : "plaintext";
				return hljs.highlight(code, { language }).value;
			}
		})
	);

	export let content: string;
</script>

<div
	class="h-full w-full max-w-none prose prose-invert prose-pre:p-0 prose-td:text-left prose-th:text-left overflow-scroll rounded-xl"
>
	{@html marked.parse(content)}
</div>
