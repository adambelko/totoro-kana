interface KanaGroup {
	category: string
	groupName: string
	romaji: string
	japanese: string
	characters: { [key: string]: string[] }
}

interface KanaData {
	[kanaGroup: string]: {
		[characterGroup: string]: {
			[character: string]: string[]
		}
	}
}

export function formatKanaGroups(data: KanaData): KanaGroup[] {
	return Object.entries(data).flatMap(([category, groups]) => {
		return Object.entries(groups).map(([groupName, groupData]) => {
			const romajiCharacters = Object.values(groupData).map((characters) => characters[0])
			const romaji = romajiCharacters.join(" · ")
			const japanese = Object.keys(groupData).join(" · ")

			return { category, groupName, romaji, japanese, characters: groupData }
		})
	})
}
