export const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export const getFirstCharacter = (character: string) => {
    return character.split(",")[0].trim()
}

export const getKanaOrder = (data: Kana[]): string[] => {
    return Array.from(new Set(data.map((kana) => kana.groupName)))
}

export const getUserCompletedGroups = (data: any) => {
    return data.map((item: any) => item.completedGroup)
}

export const getUserKanaLearnedCount = (userCompletedGroups: any, writing: any) => {
    return userCompletedGroups.reduce((count: number, groupName: string) => {
        return count + writing.filter((item: any) => item.groupName === groupName).length
    }, 0)
}

export const getGroupsToReview = (writingProgressData: WritingProgress[]): WritingProgress[] => {
    const today = new Date()
    return writingProgressData.filter((progress) => {
        const completionDate = new Date(progress.completionDate)
        const daysSinceCompletion = Math.floor((today.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24))
        return daysSinceCompletion >= progress.reviewInterval
    })
}