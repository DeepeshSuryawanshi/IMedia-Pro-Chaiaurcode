import { IVideo } from "@/models/Video";

type FeactOptions = {
    method ? : "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    headers ?: Record<string , string>;
}
export type videoFormData = Omit<IVideo,"_id">

class ApiClient {
    private async fetch<T>(
        endpoint:string,
        options: FeactOptions = {}
    ):Promise<T>
    {   
        const {method = "GET", body ,headers = {} } = options;
        const defaultHeaders = {
            "content-type":"application/json",
            ...headers
        };
        const response = await fetch(`/api${endpoint}`,{
            headers:defaultHeaders,
            method,
            body:body? JSON.stringify(body) : undefined ,
        })
        if(!response.ok) {
            throw new Error(await response.text());
        }
        return response.json();
    }
    async getVideos(){
        return this.fetch<IVideo[]>("/videos")
    }
    async getAVideo(id:string){
        return this.fetch<IVideo>(`/videos/${id}`)
    }
    async createVideo(videoData:videoFormData){
        return this.fetch("/videos",{
            method:"POST",
            body:videoData,

        })
    }
}

export const apiClient = new ApiClient();