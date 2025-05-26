using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.DTOs
{
    public class FoldersAndFilesDto
    {
        public IEnumerable<FolderDto> Folders { get; set; }
        public IEnumerable<FileDto> Files { get; set; }
    }
}
