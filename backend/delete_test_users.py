"""
Script to delete test users from database (DEVELOPMENT ONLY)
WARNING: This will permanently delete user data!
"""
import asyncio
import sys
from app.core.database import engine
from app.core.config import settings
from sqlalchemy import text

async def delete_test_users():
    # Safety check - only allow in development
    if settings.NODE_ENV != "development":
        print("❌ ERROR: This script can only be run in development environment!")
        print(f"   Current environment: {settings.NODE_ENV}")
        sys.exit(1)

    print("=" * 80)
    print("🗑️  DELETE TEST USERS - DEVELOPMENT ONLY")
    print("=" * 80)
    print("\n⚠️  WARNING: This will permanently delete user data!")
    print("\nOptions:")
    print("1. Delete a specific user by email")
    print("2. Delete ALL test users (emails containing @test.com)")
    print("3. Delete ALL users (DANGEROUS - clears entire users table)")
    print("4. Cancel")

    choice = input("\nEnter your choice (1-4): ").strip()

    async with engine.connect() as conn:
        if choice == "1":
            # Delete specific user
            email = input("Enter email to delete: ").strip()

            # Check if user exists
            result = await conn.execute(
                text('SELECT email, full_name FROM users WHERE email = :email'),
                {"email": email}
            )
            user = result.fetchone()

            if not user:
                print(f"\n❌ User with email '{email}' not found.")
                return

            print(f"\n📧 Found user:")
            print(f"   Email: {user[0]}")
            print(f"   Name: {user[1]}")

            confirm = input("\n⚠️  Are you sure you want to delete this user? (yes/no): ").strip().lower()

            if confirm == "yes":
                await conn.execute(
                    text('DELETE FROM users WHERE email = :email'),
                    {"email": email}
                )
                await conn.commit()
                print(f"\n✅ User '{email}' deleted successfully!")
            else:
                print("\n❌ Deletion cancelled.")

        elif choice == "2":
            # Delete all test users
            result = await conn.execute(
                text("SELECT email FROM users WHERE email LIKE '%@test.com'")
            )
            test_users = result.fetchall()

            if not test_users:
                print("\n❌ No test users found (emails with @test.com)")
                return

            print(f"\n📋 Found {len(test_users)} test users:")
            for user in test_users:
                print(f"   - {user[0]}")

            confirm = input("\n⚠️  Delete all these users? (yes/no): ").strip().lower()

            if confirm == "yes":
                result = await conn.execute(
                    text("DELETE FROM users WHERE email LIKE '%@test.com'")
                )
                await conn.commit()
                print(f"\n✅ Deleted {result.rowcount} test users!")
            else:
                print("\n❌ Deletion cancelled.")

        elif choice == "3":
            # Delete ALL users (DANGEROUS)
            result = await conn.execute(
                text("SELECT COUNT(*) FROM users")
            )
            total = result.scalar()

            print(f"\n⚠️  DANGER ZONE ⚠️")
            print(f"   This will delete ALL {total} users from the database!")
            print(f"   This action CANNOT be undone!")

            confirm1 = input("\n   Type 'DELETE ALL USERS' to confirm: ").strip()

            if confirm1 == "DELETE ALL USERS":
                confirm2 = input("   Are you ABSOLUTELY sure? (yes/no): ").strip().lower()

                if confirm2 == "yes":
                    await conn.execute(text("DELETE FROM users"))
                    await conn.commit()
                    print(f"\n✅ All users deleted!")
                else:
                    print("\n❌ Deletion cancelled.")
            else:
                print("\n❌ Deletion cancelled.")

        else:
            print("\n❌ Operation cancelled.")

if __name__ == "__main__":
    asyncio.run(delete_test_users())
