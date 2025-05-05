using Microsoft.EntityFrameworkCore;
using Store.Models;
using Store.UseCases.Interfaces.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Store.Infrastracture.Repository
{
    public class StoreRepository<T> : IRepository<T> where T : StoreEntity
    {
        readonly private StoreContext _db;
        public StoreRepository()
        {
            _db = new StoreContext();
        }
        public async Task<List<T>> GetAll()
        {
            return await _db.Set<T>().ToListAsync();
        }
        public async Task<List<T>> GetSome(Expression<Func<T, bool>> match)
        {
            return await _db.Set<T>().Where(match).AsNoTracking().ToListAsync();
        }
        public async Task<T?> GetOne(Expression<Func<T, bool>> match)
        {
            return await _db.Set<T>().FirstOrDefaultAsync(match);
        }
        public async Task<T> Add(T entity)
        {
            _db.Set<T>().Add(entity);
            await _db.SaveChangesAsync();
            return entity;
        }
        public async Task<UpdateStatus> Update(T updatedEntity)
        {
            UpdateStatus operationStatus = UpdateStatus.Failed;
            try
            {
                T? currentEntity = await GetOne(ent => ent.Id == updatedEntity.Id);
                _db.Entry(currentEntity!).OriginalValues["Timer"] = updatedEntity.TimeStamp;
                _db.Entry(currentEntity!).CurrentValues.SetValues(updatedEntity);
                if (await _db.SaveChangesAsync() == 1) // should throw exception if stale;
                    operationStatus = UpdateStatus.Ok;
            }
            catch (DbUpdateConcurrencyException dbx)
            {
                operationStatus = UpdateStatus.Stale;
                Console.WriteLine("Problem in " + MethodBase.GetCurrentMethod()!.Name + dbx.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + MethodBase.GetCurrentMethod()!.Name + ex.Message);
            }
            return operationStatus;
        }
        public async Task<int> Delete(Guid id)
        {
            T? currentEntity = await GetOne(ent => ent.Id == id);
            _db.Set<T>().Remove(currentEntity!);
            return _db.SaveChanges();
        }
    }
}
