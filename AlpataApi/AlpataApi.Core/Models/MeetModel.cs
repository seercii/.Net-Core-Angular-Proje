using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlpataApi.Core.Models
{
    public class MeetModel
    {
        public string MeetName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string Description { get; set; }
        public string? FileUpload { get; set; }
        public IFormFile? UploadFile { get; set; }
    }
}
