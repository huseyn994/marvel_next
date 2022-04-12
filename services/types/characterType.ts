export interface CharacterDataContainer {
    offset : number
    limit: number
    total: number
    count: number
    results: Character[]
    urls: Url[]
}
export interface Character {
    id: number
    name: string
    description: string
    modified: Date
    resourceURI: string
    urls: {
        type: string
        url: string
    }[]
    thumbnail: {
        path: string
        extension: string
    }
}

export interface Url {
    type: string;
    url: string
}