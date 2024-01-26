using AlpataApi.Core.Entities;
using AlpataApi.Core.Models;
using AlpataApi.Data.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace AlpataApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetController : ControllerBase
    {
        private readonly AlpataApiContext _context;

        public MeetController(AlpataApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Meet>> GetMeets()
        {
          var meet=   await _context.Meets.ToListAsync();
            return Ok(meet);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Meet>> Getmeet(int id)
        {
            var meet = await _context.Meets.FindAsync(id);

            if (meet == null)
            {
                return NotFound();
            }

            return meet;
        }

        [HttpPost]
        public async Task<ActionResult<Meet>> Createmeet([FromForm] MeetModel meetModel)
        {
            if (meetModel.UploadFile != null)
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "documentation");
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(meetModel.UploadFile.FileName);
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await meetModel.UploadFile.CopyToAsync(fileStream);
                }

                meetModel.FileUpload = uniqueFileName;
            }


            var meet = new Meet
            {
               MeetName= meetModel.MeetName,
               Description= meetModel.Description,
               StartDate=meetModel.StartDate,
               FinishDate= meetModel.FinishDate,
               FileUpload=meetModel.FileUpload
            };
            _context.Meets.Add(meet);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Toplantı başarıyla eklendi." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeet(int id, [FromForm] MeetModel meetModel)
        {
            var meet = await _context.Meets.FindAsync(id);

            if (meetModel.UploadFile != null)
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "documentation");
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(meetModel.UploadFile.FileName);
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await meetModel.UploadFile.CopyToAsync(fileStream);
                }

                meet.FileUpload = uniqueFileName; // Corrected line
            }

            if (meet == null)
            {
                return NotFound();
            }

            meet.MeetName = meetModel.MeetName;
            meet.Description = meetModel.Description;
            meet.StartDate = meetModel.StartDate;
            meet.FinishDate = meetModel.FinishDate;

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Toplantı başarıyla güncellendi." });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeet(int id)
        {
            var meet = await _context.Meets.FindAsync(id);

            if (meet == null)
            {
                return NotFound();
            }

            _context.Meets.Remove(meet);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Toplantı başarıyla silindi." });
        }

    }
}