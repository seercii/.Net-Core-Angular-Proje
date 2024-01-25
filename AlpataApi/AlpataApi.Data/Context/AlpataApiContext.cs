using AlpataApi.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlpataApi.Data.Context
{
    public class AlpataApiContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=SERCAN\\SQLEXPRESS;initial Catalog=AlpataProject;integrated Security=true;TrustServerCertificate=true;");
        }
        public DbSet<Meet> Meets { get; set; }
        public DbSet<Register> Registers { get; set; }
    }
}
