using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpenseController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Expenses()
        {
            return Ok(await _context.Expenses.AsNoTracking().ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateExpenses(Expense expense)
        {
            if (expense is null)
            {
                return BadRequest();
            }

            await _context.Expenses.AddAsync(expense);
            await _context.SaveChangesAsync();

            return Ok(expense);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if (expense is null)
            {
                return NotFound();
            }
            return Ok(expense);
        }

        

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(int id, Expense expense)
        {
            var Dbexpense = await _context.Expenses.FindAsync(id);
            if (Dbexpense is null)
            {
                return NotFound();
            }
            Dbexpense.Description = expense.Description;
            Dbexpense.Amount = expense.Amount;
            Dbexpense.Category = expense.Category;
            await _context.SaveChangesAsync();
            return Ok(expense);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            var expense = await _context.Expenses.FindAsync(id);
            if(expense is null)
            {
                return NotFound();
            }
            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return Ok(expense);
        }
    }
}