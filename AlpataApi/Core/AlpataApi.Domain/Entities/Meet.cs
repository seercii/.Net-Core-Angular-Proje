using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlpataApi.Domain.Entities
{
    public class Meet
    {
        public int MeetId { get; set; }
        public string MeetName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string Description { get; set; }
        public string FileUpload { get; set; }
    }
}
