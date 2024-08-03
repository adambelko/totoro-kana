const send = async (method: string, path: string, data?: any): Promise<any> => {
	const response = await fetch(path, {
		method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	})

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}`)
	}

	return await response.json()
}

export const get = (path: string): Promise<any> => {
	return send("GET", path)
}

export const post = (path: string, data: any): Promise<any> => {
	return send("POST", path, data)
}

export const put = (path: string, data: any): Promise<any> => {
	return send("PUT", path, data)
}

export const del = (path: string): Promise<any> => {
	return send("DELETE", path)
}
