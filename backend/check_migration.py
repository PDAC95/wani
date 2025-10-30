#!/usr/bin/env python
"""
Check if our specific users table columns exist
"""
import sys
import os
import asyncio
from dotenv import load_dotenv
from sqlalchemy import text

if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
load_dotenv(env_path)

async def check_our_columns():
    try:
        from app.core.database import engine

        async with engine.begin() as conn:
            # Check for our specific columns
            our_columns = [
                'id', 'email', 'password_hash', 'full_name', 'phone',
                'kyc_level', 'role', 'is_verified', 'is_active',
                'created_at', 'updated_at'
            ]

            print("Checking for our columns in users table:")
            print("-" * 60)

            for col in our_columns:
                result = await conn.execute(text(f"""
                    SELECT EXISTS (
                        SELECT 1
                        FROM information_schema.columns
                        WHERE table_schema = 'public'
                        AND table_name = 'users'
                        AND column_name = '{col}'
                    )
                """))
                exists = result.scalar()
                status = "[OK]" if exists else "[MISSING]"
                print(f"{status} {col}")

            # Check if alembic_version table exists
            result = await conn.execute(text("""
                SELECT version_num FROM alembic_version
            """))
            version = result.scalar()
            print(f"\n[INFO] Current migration version: {version}")

        await engine.dispose()
        return True

    except Exception as e:
        print(f"[ERROR] {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    result = asyncio.run(check_our_columns())
    sys.exit(0 if result else 1)
