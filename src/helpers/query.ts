import { compose, reduce, map, split } from 'ramda';

export const getQueryEntries = (): { [key: string]: string } =>
    compose(
        reduce((acc, pair) => ({ ...acc, [pair[0]]: pair[1] }), {}),
        map<string, string[]>(split('=')),
        split('&'),
    )(location.search.substr(1))
