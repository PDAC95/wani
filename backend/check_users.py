"""Script to check users in database"""
import asyncio
from app.core.database import engine
from sqlalchemy import text

async def check_users():
    async with engine.connect() as conn:
        result = await conn.execute(
            text('SELECT email, full_name, created_at, is_verified, is_active FROM users ORDER BY created_at DESC LIMIT 20')
        )
        rows = result.fetchall()

        print('=' * 80)
        print('USUARIOS EN LA BASE DE DATOS:')
        print('=' * 80)

        if not rows:
            print("No hay usuarios registrados en la base de datos.")
        else:
            for i, row in enumerate(rows, 1):
                print(f"\n{i}. Email: {row[0]}")
                print(f"   Nombre: {row[1]}")
                print(f"   Creado: {row[2]}")
                print(f"   Verificado: {row[3]}")
                print(f"   Activo: {row[4]}")

        print('\n' + '=' * 80)
        print(f'Total: {len(rows)} usuarios')
        print('=' * 80)

if __name__ == "__main__":
    asyncio.run(check_users())
