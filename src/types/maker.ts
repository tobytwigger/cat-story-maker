export interface TCatInfo {
  name: string|null,
    gender: string|null,
    age: string|null,
    likes: string[],
    personality: string[],
    adoption_information: string[]
}

export interface TResponseCorrections {
    untrue?: string[],
    important?: string[],
    other?: string[]
}

