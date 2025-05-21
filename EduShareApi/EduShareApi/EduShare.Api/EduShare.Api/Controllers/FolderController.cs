using AutoMapper;
using EduShare.Api.PostModels;
using EduShare.Api.UpdateModal;
using EduShare.Core.DTOs;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EduShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FolderController : ControllerBase
    {
        private readonly IFolderService _folderService;
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;

        public FolderController(IFolderService folderService, IMapper mapper, IFileService fileService)
        {

            _folderService = folderService;
            _mapper = mapper;
            _fileService = fileService;
        }

        // GET: api/Folder
        [HttpGet]
        public async Task<ActionResult<List<FolderDto>>> Get()
        {
            var folders = await _folderService.GetAllFoldersAsync();
            return folders.ToList();
        }

        // GET api/Folder/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FolderDto>> GetById(int id)
        {
            if (id < 0) return BadRequest();
            FolderDto result = await _folderService.GetFolderByIdAsync(id);
            if (result == null)
                return NotFound();
            return result;
        }

        // POST api/Folder
        [HttpPost]
        public async Task<ActionResult<FolderDto>> Post([FromBody] FolderPostModel folder)
        {
            FolderDto folderDTO = _mapper.Map<FolderDto>(folder);
            FolderDto result = await _folderService.CreateFolderAsync(folderDTO);
            return result == null ? BadRequest() : result;
        }

        // PUT api/Folder/5
        [HttpPut("{id}")]
        public async Task<ActionResult<FolderDto>> Put(int id, [FromBody] FolderPostModel folder)
        {
            FolderDto folderDTO = _mapper.Map<FolderDto>(folder);
            var updateResult = await _folderService.UpdateFolderAsync(id, folderDTO);
            if (updateResult==null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<FolderDto>> Patch(int id, [FromBody] FolderUpdateModal updateModel)
        {
            var folderDto = _mapper.Map<FolderDto>(updateModel);
            var result = await _folderService.UpdateFolderAsync(id, folderDto);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // DELETE api/Folder/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            var deleteResult = await _folderService.DeleteFolderAsync(id);
            if (!deleteResult)
            {
                return NotFound($"No file found with id: {id}");
            }
            return NoContent();
        }
        

        [HttpGet("{folderId}/contents")]
        public async Task<ActionResult<FoldersAndFilesDto>> GetFoldersAndFiles(int folderId)
        {

            var foldersAndFiles = await _folderService.GetSubfoldersAndFilesByFolderIdAsync(folderId);
            //var files = await _fileService.GetAllFilesAsync();
            //var folders=await _folderService.GetAllFoldersAsync();

            //var result = new FoldersAndFilesDto
            //{
            //    Folders = _mapper.Map<IEnumerable<FolderDto>>(folders),
            //    Files = _mapper.Map<IEnumerable<FileDto>>(files)
            //};

            //return Ok(result);
            return Ok(foldersAndFiles);
        }

        [HttpGet("users/{userId}/root-folders")]
        [Authorize]
        public async Task<ActionResult<FoldersAndFilesDto>> GetRootFoldersByUserId(int userId)
        {
            var foldersAndFiles = await _folderService.GetRootFoldersByUserIdAsync(userId);
            return Ok(foldersAndFiles);
        }

        //[HttpPut("{folderId}/rename")]
        //public async Task<ActionResult<FolderDto>> Rename(int folderId, [FromBody] string newName)
        //{
        //    if (string.IsNullOrWhiteSpace(newName))
        //    {
        //        return BadRequest("שם הקובץ לא יכול להיות ריק.");
        //    }

        //    var result = await _folderService.RenameFolderAsync(folderId, newName);
        //    return result!=null ? Ok(result) : NotFound();
        //}

        // DELETE api/Folder/5/recursive
        [HttpDelete("{id}/recursive")]
        public async Task<ActionResult<bool>> DeleteRecursively(int id)
        {
            var deleteResult = await _folderService.DeleteFolderRecursivelyAsync(id);
            if (!deleteResult)
            {
                return NotFound();
            }
            return true;
        }

    }
}