interface KanaData {
	[kanaGroup: string]: {
		[characterGroup: string]: string[]
	}
}

export function formatData(data: KanaData) {
	return Object.entries(data).flatMap(([category, groups]) => {
		return Object.entries(groups).flatMap(([groupName, groupData]) => {
			const romajiCharacters = Object.values(groupData).flatMap((pronunciation) => pronunciation)
			const romaji = romajiCharacters.join(" · ")
			const japanese = Object.keys(groupData).join(" · ")
			return { category, groupName, romaji, japanese }
		})
	})
}
