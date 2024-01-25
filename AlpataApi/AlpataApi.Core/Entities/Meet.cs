using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlpataApi.Core.Entities
{
    public class Meet
    {
        [Key]
        public int Id { get; set; }
        public string MeetName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string Description { get; set; }
        public string FileUpload { get; set; }
    }
}
