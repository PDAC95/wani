# API Testing Guide

## POST /api/v1/auth/register - User Registration

Complete guide for testing the user registration endpoint.

### Prerequisites

1. **Database Setup**:
   - PostgreSQL database configured (Supabase)
   - Run migrations: `alembic upgrade head`
   - Users table must exist

2. **Environment Variables**:
   ```bash
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret-key
   RESEND_API_KEY=re_... (optional for emails)
   ```

3. **Start Server**:
   ```bash
   cd backend
   python -m uvicorn app.main:app --reload
   ```

### Endpoint Details

**URL**: `POST http://localhost:8000/api/v1/auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "full_name": "John Doe",
  "phone": "+1234567890"
}
```

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "Registration successful! Please check your email to verify your account.",
  "data": {
    "user": {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "full_name": "John Doe",
      "created_at": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Error Response** (400 Bad Request - Email Exists):
```json
{
  "success": false,
  "error": "EmailAlreadyExists",
  "message": "Email 'user@example.com' is already registered",
  "details": [
    {
      "field": "email",
      "message": "This email address is already registered",
      "code": "email_exists"
    }
  ]
}
```

**Error Response** (422 Validation Error):
```json
{
  "detail": [
    {
      "type": "string_too_short",
      "loc": ["body", "password"],
      "msg": "String should have at least 8 characters",
      "input": "short"
    }
  ]
}
```

### Testing Methods

#### 1. Using Swagger UI (Recommended)

1. Start the server
2. Open http://localhost:8000/api/docs
3. Find "POST /api/v1/auth/register"
4. Click "Try it out"
5. Fill in the request body
6. Click "Execute"
7. View the response

#### 2. Using cURL

**Successful Registration**:
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "full_name": "Test User",
    "phone": "+1234567890"
  }'
```

**Without Phone** (optional field):
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nophone@example.com",
    "password": "SecurePassword123!",
    "full_name": "No Phone User"
  }'
```

#### 3. Using httpie

```bash
http POST localhost:8000/api/v1/auth/register \
  email=test@example.com \
  password=SecurePassword123! \
  full_name="Test User" \
  phone="+1234567890"
```

#### 4. Using Python Requests

```python
import requests

url = "http://localhost:8000/api/v1/auth/register"
data = {
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "full_name": "Test User",
    "phone": "+1234567890"
}

response = requests.post(url, json=data)
print(f"Status: {response.status_code}")
print(f"Response: {response.json()}")
```

#### 5. Using Postman

1. Create new request
2. Method: POST
3. URL: `http://localhost:8000/api/v1/auth/register`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
   ```json
   {
     "email": "test@example.com",
     "password": "SecurePassword123!",
     "full_name": "Test User",
     "phone": "+1234567890"
   }
   ```
6. Send request

### Test Cases

#### ✅ Valid Registration

**Input**:
```json
{
  "email": "newuser@example.com",
  "password": "ValidPass123!",
  "full_name": "New User",
  "phone": "+1234567890"
}
```

**Expected**: 201 Created with user data

---

#### ❌ Duplicate Email

**Input**:
```json
{
  "email": "existing@example.com",
  "password": "Password123!",
  "full_name": "Duplicate User",
  "phone": "+1234567890"
}
```

**Expected**: 400 Bad Request with EmailAlreadyExists error

---

#### ❌ Invalid Email Format

**Input**:
```json
{
  "email": "not-an-email",
  "password": "Password123!",
  "full_name": "Invalid Email",
  "phone": "+1234567890"
}
```

**Expected**: 422 Validation Error

---

#### ❌ Short Password

**Input**:
```json
{
  "email": "test@example.com",
  "password": "short",
  "full_name": "Short Pass",
  "phone": "+1234567890"
}
```

**Expected**: 422 Validation Error (password min 8 chars)

---

#### ❌ Missing Required Fields

**Input**:
```json
{
  "email": "test@example.com"
}
```

**Expected**: 422 Validation Error (missing password, full_name)

---

#### ✅ Registration Without Phone

**Input**:
```json
{
  "email": "nophone@example.com",
  "password": "Password123!",
  "full_name": "No Phone User"
}
```

**Expected**: 201 Created (phone is optional)

### What Happens After Registration

1. **User Created**: User record is created in database with:
   - Unique ID (UUID)
   - Email (unique)
   - Hashed password (bcrypt)
   - Full name
   - Phone (if provided)
   - Default values: `kyc_level=0`, `role=user`, `is_verified=False`, `is_active=True`

2. **Verification Token Generated**: JWT token created with 24-hour expiration

3. **Email Sent** (if Resend configured):
   - Welcome email with verification link
   - Link format: `{FRONTEND_URL}/verify-email?token={jwt_token}`

4. **Response Returned**: User data (excluding password)

### Database Verification

Check if user was created:

```sql
SELECT id, email, full_name, is_verified, created_at
FROM users
WHERE email = 'test@example.com';
```

Check password hash:

```sql
SELECT password_hash FROM users WHERE email = 'test@example.com';
-- Should start with $2b$ (bcrypt)
```

### Logging

Check server logs for:
- Registration attempts
- Email sending status
- Errors and stack traces

```
2025-10-22 10:30:00 | INFO | Registering user: test@example.com
2025-10-22 10:30:00 | INFO | Generated verification token for user: uuid-here
2025-10-22 10:30:00 | INFO | Verification email sent to: test@example.com
```

### Common Issues

#### Issue: 500 Internal Server Error

**Possible Causes**:
- Database not connected
- Users table doesn't exist
- Invalid JWT_SECRET

**Solution**:
```bash
# Check database connection
python -c "from app.core.database import engine; print(engine.connect())"

# Run migrations
alembic upgrade head

# Check environment variables
cat .env | grep DATABASE_URL
cat .env | grep JWT_SECRET
```

---

#### Issue: Email Not Sent

**Possible Causes**:
- RESEND_API_KEY not set
- Resend not installed
- Email service not configured

**Solution**:
```bash
# Install resend
pip install resend==2.6.0

# Add to .env
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

**Note**: User is still registered even if email fails

---

#### Issue: Password Not Hashed

**Possible Causes**:
- passlib/bcrypt not installed

**Solution**:
```bash
pip install passlib[bcrypt]==1.7.4 bcrypt==4.3.0
```

### Security Notes

1. **Password Hashing**: Passwords are hashed with bcrypt (12 rounds) before storage
2. **Email Uniqueness**: Emails are checked for uniqueness before registration
3. **JWT Tokens**: Verification tokens expire after 24 hours
4. **CORS**: Configure `ALLOWED_ORIGINS` in .env for security
5. **Rate Limiting**: Consider adding rate limiting in production

### Next Steps

After successful registration:

1. **Verify Email**: Implement `POST /api/v1/auth/verify-email` endpoint
2. **Login**: Implement `POST /api/v1/auth/login` endpoint
3. **Resend Verification**: Implement `POST /api/v1/auth/resend-verification` endpoint

### Production Checklist

- [ ] Database migrations run
- [ ] Environment variables configured
- [ ] Resend API key and domain verified
- [ ] CORS origins configured
- [ ] Rate limiting enabled
- [ ] Error tracking (Sentry) configured
- [ ] Logs monitoring setup
- [ ] Load testing completed

### Support

For issues or questions:
- Check server logs: `backend/logs/wani_YYYYMMDD.log`
- Review API documentation: `/api/docs`
- Check database migrations: `alembic current`

---

**Status**: ✅ Endpoint implemented and ready for testing
**Last Updated**: 2025-10-22
