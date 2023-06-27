import UserData from "../model/UserData";
import AuthService from "./AuthService";

export default class AuthServiceJwt implements AuthService {
    constructor(private url: string){}
    async login(loginData: { email: string; password: string; }): Promise<UserData | null> {
        //TODO
        return null;
    }
    async logout(): Promise<void> {
        //TODO
    }
    
}