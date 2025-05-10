using AutoMapper;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using File = EduShare.Core.Entities.File;

namespace EduShare.Core
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<File, FileDto>().ReverseMap();
            CreateMap<Topic, TopicDto>().ReverseMap();
            CreateMap<Rating, RatingDto>().ReverseMap();
            CreateMap<Recommendation, RecommendationDto>().ReverseMap();
            CreateMap<Folder, FolderDto>().ReverseMap();
        }
    }
}
