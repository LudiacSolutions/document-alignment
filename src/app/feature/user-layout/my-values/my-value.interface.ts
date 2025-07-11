export interface MyValues {
    id : string ;
    name: string;
    description: string;
    complianceTolerance: number
}

export interface AddMyValue extends Partial<MyValues>{
    newValueId : string;
}