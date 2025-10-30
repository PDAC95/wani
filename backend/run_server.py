"""
Wani API Server Launcher
Custom launcher to properly configure asyncio event loop on Windows for psycopg3
"""

import sys
import asyncio

# CRITICAL: Set Windows event loop policy BEFORE any other imports
# This is required for psycopg3 to work on Windows
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Now import uvicorn
import uvicorn

if __name__ == "__main__":
    # Run the FastAPI application with uvicorn
    # Note: loop="asyncio" ensures the correct event loop is used
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=9000,
        reload=True,
        reload_dirs=["app"],
        log_level="info",
        loop="asyncio"
    )
