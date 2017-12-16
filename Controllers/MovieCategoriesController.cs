using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Movies.Data;
using Movies.Models;

namespace movies.Controllers
{
    [Route("api/[controller]")]
    public class MovieCategoriesController : Controller
    {
        private readonly ApplicationDbContext _context;
        private static List<MovieCategory> Categories = new List<MovieCategory>();
        public MovieCategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<MovieCategory>> GetAll()
        {
            return await _context.MovieCategories.ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MovieCategory category)
        {
            _context.Add(category);
            await _context.SaveChangesAsync();
            return Created("", category);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var category = await _context.MovieCategories.SingleOrDefaultAsync(m => m.Id == id);
            _context.MovieCategories.Remove(category);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
