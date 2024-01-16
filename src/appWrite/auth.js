/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
import config from "../config/envConfig";
import { Client, Account, ID, } from "appwrite"




// this is a more suitable for larger applications or parts of applications where you need to manage complex state, handle multiple instances, and ensure modularity and maintainability.The appwrite approach code snippet(procedural approach) is suitable for smaller scripts or tasks where simplicity and immediacy of execution are more important than extensive organization and reusability.

export class AuthService {
    client = new Client()
    account


    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);

        this.account = new Account(this.client);



    }


    async createAccount ({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name,);
            if (userAccount) {
                //call another method
                return this.login({ email, password })
            } else {
                return userAccount
            }
        }
        catch (error) {
            console.error("Error creating account:", error);
            throw error
        }
    }

    async login ({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser () {
        try {
            return await this.account.get()
        } catch (error) {
            throw error

        }

    }

    async logout () {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

    async emailVerification () {
        try {
            const emailRes = await this.account.createVerification("http://localhost:5173");
            if (emailRes) {
                emailRes.then((res) => console.log(res))
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }



    async updateVerification (userId, secret) {
        try {
            const updatedRes = await this.account.updateVerification(userId, secret);
            if (updatedRes) {
                updatedRes.then((res) => console.log(res))
                return true
            }
        } catch (error) {
            console.log(error)
            return false
        }

    }









}
const authService = new AuthService

export default authService