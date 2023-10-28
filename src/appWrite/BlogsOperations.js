/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
import config from "../config/envConfig";
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service {
    client = new Client()
    dataBases;
    bucket

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId)

        this.dataBases = new Databases(this.client)
        this.bucket = new Storage(this.client)

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
    async updatePost (slug, { title, content, featuredImage, status, }) {
        try {
            return await this.dataBases.updateDocument(
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
            console.log("Appwrite service :: deletePost :: error", error);
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
            console.log("Appwrite serive :: getPost :: error", error);
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
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    //file upload
    async uploadFile (file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketId,
                ID.unique(),
                file

            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    //delete file

    async deleteFile (fileId) {
        try {
            await this.bucket.deleteFile(
                config.appWriteBucketId,
                fileId

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    //File Preview gives fast response so no need to use async
    async getFilePreview (fileId) {
        return this.bucket.getFilePreview(
            config.appWriteBucketId,
            fileId

        )
    }

}


const appwriteBlogService = new Service()
export default appwriteBlogService