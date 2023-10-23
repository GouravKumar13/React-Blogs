/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
import config from "../config/envConfig";
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service {
    client = new Client()
    dataBases;
    storage; //bucket

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.dataBases = new Databases(this.client)
        this.storage = new Storage(this.client)

    }

    // create post
    async createPost ({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.dataBases.createDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,

                }
            )
        } catch (error) {
            throw error
        }
    }

    // Upload Post
    async updatePost (slug, { title, content, featuredImage, status }) {
        try {
            await this.dataBases.updateDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                })

        } catch (error) {
            throw error;

        }
    }

    // Delete Post
    async deletePost (slug) {
        try {
            await this.dataBases.deleteDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,

            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }
    // get post with id
    async getPost (slug) {
        try {
            return await this.dataBases.getDocument(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                slug,

            )

        } catch (error) {
            throw error
            return false

        }
    }


    // Active posts
    async getAllPosts (queries = [Query.equal("status", "active")]) {
        try {
            return await this.dataBases.listDocuments(
                config.appWriteDatabaseId,
                config.appWriteCollectionId,
                queries, //the above array can be given here
            )
        } catch (error) {
            throw error
            return false
        }
    }

    //file upload
    async uploadFile (file) {
        try {
            return await this.storage.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file

            )
        } catch (error) {
            throw error
            return false
        }
    }

    //delete file

    async deleteFile (fileId) {
        try {
            await this.storage.deleteFile(
                config.appWriteBucketId,
                fileId

            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    //File Preview gives fast response so no need to use async
    async getFilePreview (fileId) {

        return this.storage.getFilePreview(
            config.appWriteBucketId,
            fileId

        )
    }

}


const appwriteBlogService = new Service()
export default appwriteBlogService