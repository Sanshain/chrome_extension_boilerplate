
// declare const chrome: any

// declare global{
//     const chrome: any
// }

type Info = Record<'amount' | 'location', string>
declare type HideInfo = { selector: string, hiden: boolean };

type QueriesInfo = {
    selector: HideInfo,
    selectors: {selectors: HideInfo[]},
} 


declare type Queryes = Info | HideInfo | {selectors: HideInfo[]}

declare type Responses<T> = // { done: boolean } &
    T extends keyof QueriesInfo
        ? QueriesInfo[T] 
        : T extends object
            ? Partial<T>
            : T extends string
                ? Record<T, string>
                : never
