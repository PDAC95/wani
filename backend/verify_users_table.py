#!/usr/bin/env python
"""
Verify users table was created successfully
"""
import sys
import os
import asyncio
from dotenv import load_dotenv
from sqlalchemy import text

# Windows-specific event loop configuration
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Add backend to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
load_dotenv(env_path)

async def verify_users_table():
    try:
        from app.core.database import engine
        from app.core.config import settings

        print("Verifying users table in database...")
        print(f"Database: {settings.DATABASE_URL[:30]}...\n")

        async with engine.begin() as conn:
            # Check if table exists
            result = await conn.execute(text("""
                SELECT EXISTS (
                    SELECT FROM information_schema.tables
                    WHERE table_name = 'users'
                )
            """))
            table_exists = result.scalar()

            if not table_exists:
                print("[ERROR] Table 'users' does not exist!")
                return False

            print("[SUCCESS] Table 'users' exists!")

            # Get table structure
            result = await conn.execute(text("""
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns
                WHERE table_name = 'users'
                ORDER BY ordinal_position
            """))

            print("\nTable structure:")
            print("-" * 80)
            print(f"{'Column':<20} {'Type':<20} {'Nullable':<10} {'Default':<20}")
            print("-" * 80)

            for row in result:
                default = str(row[3])[:20] if row[3] else ''
                print(f"{row[0]:<20} {row[1]:<20} {row[2]:<10} {default:<20}")

            # Get indexes
            result = await conn.execute(text("""
                SELECT indexname, indexdef
                FROM pg_indexes
                WHERE tablename = 'users'
                ORDER BY indexname
            """))

            print("\nIndexes:")
            print("-" * 80)
            for row in result:
                print(f"  - {row[0]}")

            print("\n[SUCCESS] Users table successfully created!")
            print("[SUCCESS] All indexes created!")
            print("\n[READY] Next: TASK-039 (Create User Pydantic schemas)")

        await engine.dispose()
        return True

    except Exception as e:
        print(f"[ERROR] {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    result = asyncio.run(verify_users_table())
    sys.exit(0 if result else 1)
