using System;
using System.Collections.Generic;

namespace Movies.Models {
  public class Movie
  {
    public long Id { get; set; }
    public string ImageUrl { get; set; }
    public string Title { get; set; }
    public HashSet<Category> Categories { get; set; }
  }
}