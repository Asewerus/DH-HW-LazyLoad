import { IData } from './types'

export const loadData = (id?: number): Promise<IData> => {
        const url: string = id
                ? `http://164.90.161.80:3000/api/content?dirId=${id}`
                : 'http://164.90.161.80:3000/api/content';

        return fetch(url).then((response) => response.json());

};