<script lang="ts">
	import { Marked } from "marked";
	import { markedHighlight } from "marked-highlight";
	import hljs from "highlight.js";
	// import "highlight.js/styles/night-owl.css";
	import "highlight.js/styles/tomorrow-night-blue.css";

	export let content: string;

	let markDownWrapper: HTMLDivElement;

	const marked = new Marked(
		markedHighlight({
			langPrefix: "hljs language-",
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : "plaintext";
				return hljs.highlight(code, { language }).value;
			}
		})
	);

	$: if (content) {
		// set anchors to open in new tab when content changes
		if (markDownWrapper) {
			let anchors = markDownWrapper.getElementsByTagName("a");
			for (let index = 0; index < anchors.length; index++) {
				const anchor = anchors[index];
				anchor.target = "_blank";
			}
		}
	}
</script>

<div
	class="h-full w-full max-w-none prose prose-invert prose-pre:p-0 prose-td:text-left prose-th:text-left prose-a:text-blue-400 overflow-scroll rounded-xl"
	bind:this={markDownWrapper}
>
	{@html marked.parse(content)}
</div>
