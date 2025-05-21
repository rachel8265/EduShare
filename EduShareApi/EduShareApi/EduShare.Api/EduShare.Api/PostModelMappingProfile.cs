using AutoMapper;
using EduShare.Api.PostModels;
using EduShare.Api.UpdateModal;
using EduShare.Core.DTOs;

namespace EduShare.Api
{
    public class PostModelMappingProfile: Profile
    {
        public PostModelMappingProfile()
        {
            CreateMap<FilePostModel, FileDto>();
            CreateMap<RatingPostModel, RatingDto>();
            CreateMap<RecommendationPostModel, RecommendationDto>();
            CreateMap<TopicPostModel, TopicDto>();
            CreateMap<UserPostModel, UserDto>();
            CreateMap<LoginModel, UserDto>();
            CreateMap<FolderPostModel, FolderDto>();


            CreateMap<FileUpdateModel, FileDto>();
            CreateMap<FolderUpdateModal, FolderDto>();

        }
    }
}
