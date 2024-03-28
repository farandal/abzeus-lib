export interface ITrinitarianGroup {
    word: string,
    suj: string[] | string;
    eto: string[] | string;
    obj: string[] | string;
    children?: ITrinitarianGroup[]
    p_idx: number;
    c_idx: number;
}

export default ITrinitarianGroup