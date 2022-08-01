const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const videoService = require("../services/video.service");

//get videos by query
const getVideosByQuery = catchAsync(async (req, res) => {
  console.log("inside controller function")
  let result = await videoService.getAllVideos();
  if (req.query.title)
  {    
    const title = req.query.title.toLowerCase();
    result = result.filter((ele) => {      
      return ele.title.toLowerCase().includes(title);
    })    
  }
  if (req.query.genres)
  {    
    const genres = req.query.genres.toLowerCase().split(',');
    let arr = []
    if (!genres.includes("all")) {
      result.forEach((ele) => {
        genres.forEach((item) => {
          if (item == ele.genre.toLowerCase())
            arr.push(ele);
        })
      })
      result = arr;
    }
  }
  if (req.query.sortBy)
  {    
    const sortBy = req.query.sortBy    
    result = result.sort((a, b) => { return b[sortBy] - a[sortBy] })    
  }
  if (req.query.contentRating)
  {    
    let contentRating = req.query.contentRating.toLowerCase()
    if (contentRating == "anyone")
      result = result.filter((ele)=>{return ele.contentRating.toLowerCase()==contentRating})  
    else {
      contentRating=contentRating.slice(0,-1)
      result = result.filter((ele) => {
        return (ele.contentRating.slice(0, -1) == contentRating)
      })
    }
      
  }
  return res.json({ "videos": result });
})

//get video by id
const getVideoById = catchAsync(async (req, res) => {
  const result = await videoService.getVideoById(req.params.videoid)
  res.send(result);
});

//upload a new video
const uploadVideo = catchAsync(async (req, res) => {
  let result = await videoService.uploadVideo(req.body)
    res.status(httpStatus.CREATED).send(result);
});

//increase or decrease, upVote or downVote of a video
const updateVote = catchAsync(async (req, res) => {
  const { vote, change } = req.body;
  await videoService.updateVote(req.params.videoid,vote,change)
  res.status(httpStatus.NO_CONTENT).send();
});

//increase viewCount of a video
const updateViewCount = catchAsync(async (req, res) => {
  await videoService.updateViewCount(req.params.videoid)
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getVideosByQuery,
  getVideoById,
  uploadVideo,
  updateVote,
  updateViewCount
};
