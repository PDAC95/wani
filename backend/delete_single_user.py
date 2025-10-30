"""Delete a single user by email"""
import asyncio
import sys
from app.core.database import engine
from sqlalchemy import text

async def delete_user(email: str):
    async with engine.connect() as conn:
        # Check if user exists
        result = await conn.execute(
            text('SELECT email, full_name FROM users WHERE email = :email'),
            {"email": email}
        )
        user = result.fetchone()

        if not user:
            print(f"[ERROR] User with email '{email}' not found.")
            return

        print(f"Found user:")
        print(f"   Email: {user[0]}")
        print(f"   Name: {user[1]}")

        # Delete user
        await conn.execute(
            text('DELETE FROM users WHERE email = :email'),
            {"email": email}
        )
        await conn.commit()
        print(f"\n[SUCCESS] User '{email}' deleted successfully!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python delete_single_user.py <email>")
        sys.exit(1)

    email = sys.argv[1]
    asyncio.run(delete_user(email))
