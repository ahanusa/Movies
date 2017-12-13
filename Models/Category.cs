using System;
using System.Collections.Generic;

namespace Movies.Models
{
  public class Category
  {
    public long Id { get; set; }
    public string Name { get; set; }
    public ICollection<MovieCategory> MovieCategories { get; set; }
  }
}