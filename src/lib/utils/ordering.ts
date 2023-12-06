import type { Show } from "$lib/models/shows";

/// Defaults to true if something unexpected happens
export function ascendingString(str: String | undefined): boolean {
	if (str != undefined) {
		if (str === "asc") {
			return true;
		} else if (str === "desc") {
			return false;
		}
	}
	return true;
}

export function alphabeticString(str: String | undefined): boolean | undefined {
	if (str != undefined) {
		if (str === "alph") {
			return true;
		} else if (str === "updated") {
			return false;
		}
	}
}

export function AlphabeticFilter(shows: Show[], ascending: boolean) {
	shows.sort((a, b) => {
		const valueA = a.title.toLowerCase();
		const valueB = b.title.toLowerCase();

		if (ascending) {
			if (valueA < valueB) return -1;
			if (valueA > valueB) return 1;
		} else {
			if (valueA > valueB) return -1;
			if (valueA < valueB) return 1;
		}

		return 0;
	});
}

export function UpdatedFilter(shows: Show[], ascending: boolean) {
	shows.sort((a, b) => {
		const valueA = new Date(a.updated_at).getTime();
		const valueB = new Date(b.updated_at).getTime();

		if (ascending) {
			if (valueA < valueB) return -1;
			if (valueA > valueB) return 1;
		} else {
			if (valueA > valueB) return -1;
			if (valueA < valueB) return 1;
		}

		return 0;
	});
}
