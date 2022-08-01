const { Video } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");


const getAllVideos = async () => {
    try {
        const result = await Video.find({})
        return result;
    } catch (error) {
        throw error
    }
}
//sdefghj
const getVideoById = async (id) => {
  const result = await Video.findById(id);
  if (result) return result;
  else
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
};

const uploadVideo = async (video) => {
    const result = await Video.create(video);
    return result;
};

const updateVote = async (id, vote, change) => {
    const result = await Video.findById(id);
    vote = vote+'s'
  if (result) {
    if (change == "increase")
      result.votes[vote]++;
    if (change == "decrease")
      result.votes[vote]--;
    if (result.votes[vote] < 0)
      result.votes[vote]=0
    result.save();
  } else
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
};

const updateViewCount = async (id) => {
  const result = await Video.findById(id);
  if (result) {
    result.viewCount++;
    result.save();
  } else
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
};
 
module.exports = {
 getAllVideos,
 getVideoById,
 uploadVideo,
 updateVote,
 updateViewCount 
}
