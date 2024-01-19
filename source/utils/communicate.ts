//@ts-check

import { IntersectUnion } from "types-spring";

/**
 * @-typedef {{['amount'|'location']: string} | {selector: string, hide: boolean}} Keys
 */


declare type QueryKeys = keyof IntersectUnion<Queryes> | HideInfo;

/**
 * @param {Queryes} key
 * @param {(response: Record<Queryes, string>) => void} clb
 */
export function query<Key extends QueryKeys>(key: Key, clb: (response: Responses<Key>) => void) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (/** @type {{ id: any; }[]} */ tabs) {
        if (typeof key == 'string') {
            chrome.tabs.sendMessage(tabs[0].id, { wanted: key }, clb);            
        }
        else {
            chrome.tabs.sendMessage(tabs[0].id, key, clb);
        }
    })
}