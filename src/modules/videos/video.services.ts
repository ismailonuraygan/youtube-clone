import { Video, VideoModel } from "./video.model";

export function createVideo({ owner }: { owner: string }) {
    return VideoModel.create({ owner })
}

export function findVideo(videoId: Video['videoId']) {
    return VideoModel.find({ videoId });
}