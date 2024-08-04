export const getInitials = (data: any): string => {
	let fullName = data.user_metadata.full_name

	if (!fullName || fullName.trim() === "") {
		fullName = data.user_metadata.name
	}

	const nameParts = fullName.split(" ")

	return nameParts.map((part: string) => part.charAt(0).toUpperCase()).join("")
}

export const getFullName = (data: any): string => {
	let fullName = data.user_metadata.full_name

	if (!fullName || fullName.trim() === "") {
		fullName = data.user_metadata.name
	}

	return fullName
}
