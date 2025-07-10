export interface MyValues {
    id : number ;
    name: string;
    description: string
    tolerance: number
}

export interface AddMyValue extends Partial<MyValues>{
    newValueId : string;
}