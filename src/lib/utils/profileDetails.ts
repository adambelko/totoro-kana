export const getFullName = (data: any): string => {
	let fullName = data.user_metadata.full_name

	if (!fullName || fullName.trim() === "") {
		fullName = data.user_metadata.name
	}

	return fullName
}
