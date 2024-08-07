export const formatTimestamp = (timestamp: string | undefined) => {
	if (!timestamp) return
	const now = new Date()
	const time = new Date(timestamp)
	const diffInSeconds = (now.getTime() - time.getTime()) / 1000

	if (diffInSeconds < 60) {
		return `${Math.floor(diffInSeconds)} seconds ago`
	} else if (diffInSeconds < 60 * 60) {
		const minutesAgo = Math.floor(diffInSeconds / 60)
		return `${minutesAgo} minutes ago`
	} else if (diffInSeconds < 24 * 60 * 60) {
		const hoursAgo = Math.floor(diffInSeconds / 3600)
		return `${hoursAgo} hours ago`
	} else {
		return time.toLocaleDateString()
	}
}
