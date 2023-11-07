import * as bcrypt from "bcrypt";

export const hash = async (password: string):Promise<string> => {
    const saltOrRounds = 10;
    return await bcrypt.hash(password,saltOrRounds); 
} 

export const isEqual = async (planeText: string, plainTextPassword: string): Promise<boolean> => {
    const isMath = await bcrypt.compare(planeText, plainTextPassword);
    return isMath; 
}
