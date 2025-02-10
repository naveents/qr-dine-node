import { nanoid } from "nanoid";
import slugify from "slugify";

export const createSlug = (str: string) => {
    return  slugify(str, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: true
    });

}

export const createNanoId = async(length: number = 15) => {
    return  nanoid(length);
}