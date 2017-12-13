using System;

namespace Movies.Models
{
    public class MovieCategory
    {
        public long Id { get; set; }
        public long MovieId { get; set; }
        public long CategoryId { get; set; }
        public Movie Movie { get; set; }
        public Category Category { get; set; }
    }
}