using Microsoft.EntityFrameworkCore;

namespace project.api.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions options) : base(options) {
            
        }

       public DbSet<Employee> Employee {get;set;}
    }
}