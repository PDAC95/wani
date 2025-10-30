# Resend Email Service Setup Guide

This guide will help you set up the Resend email service for sending transactional emails (verification, password reset, notifications).

## Why Resend?

Resend is a modern email API for developers that offers:
- Simple, developer-friendly API
- Beautiful email templates
- High deliverability rates
- Generous free tier (100 emails/day)
- Easy domain verification
- Better than SendGrid for transactional emails

## Step 1: Create Resend Account

1. Visit [https://resend.com/signup](https://resend.com/signup)
2. Sign up with your email or GitHub account
3. Verify your email address

## Step 2: Get API Key

1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click "Create API Key"
3. Give it a name (e.g., "Wani Backend Development")
4. Copy the API key (starts with `re_`)
5. **Important**: Save it securely - you won't be able to see it again!

## Step 3: Domain Verification (Production)

For production, you need to verify your domain:

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click "Add Domain"
3. Enter your domain (e.g., `wani.app`)
4. Add the DNS records provided by Resend to your domain registrar:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
5. Wait for verification (usually 5-10 minutes)

### For Development/Testing

For testing, you can use Resend's test email:
- **From Email**: `onboarding@resend.dev`
- This works without domain verification
- Limited to 100 emails/day

## Step 4: Configure Backend

Add these variables to `backend/.env`:

```bash
# Resend Email Service
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@wani.app  # Or onboarding@resend.dev for testing
RESEND_FROM_NAME=Wani
FRONTEND_URL=http://localhost:5173  # Your frontend URL for email links
```

## Step 5: Install Package

The package is already in `requirements.txt`, but if needed:

```bash
pip install resend==2.6.0
```

## Step 6: Test Email Service

Create a test script `test_email.py`:

```python
from app.services import email_service

# Test verification email
try:
    result = email_service.send_verification_email(
        to_email="your-email@example.com",
        user_name="Test User",
        verification_token="test123abc"
    )
    print(f"✓ Email sent! ID: {result['email_id']}")
except Exception as e:
    print(f"✗ Error: {e}")
```

Run it:
```bash
python test_email.py
```

## Usage Examples

### Send Verification Email

```python
from app.services import email_service

result = email_service.send_verification_email(
    to_email="user@example.com",
    user_name="John Doe",
    verification_token="abc123xyz456"
)
# Returns: {'success': True, 'email_id': '...', 'to': '...', 'subject': '...'}
```

### Send Password Reset Email

```python
result = email_service.send_password_reset_email(
    to_email="user@example.com",
    user_name="John Doe",
    reset_token="reset123xyz"
)
```

### Check if Service is Configured

```python
if email_service.is_configured():
    print("Email service ready!")
else:
    print("Email service not configured")
```

## Email Templates

The service includes beautiful HTML email templates with:
- Responsive design (mobile-friendly)
- Professional styling
- Clear call-to-action buttons
- Plain text fallback
- Company branding

### Verification Email Features:
- Welcome message
- Prominent "Verify Email" button
- Alternative link for copy-paste
- 24-hour expiration notice
- Professional footer

### Password Reset Email Features:
- Security notice
- "Reset Password" button
- 1-hour expiration notice
- Ignore notice if not requested

## Troubleshooting

### Issue: "Resend package not installed"
**Solution**:
```bash
pip install resend==2.6.0
```

### Issue: "Email service is not configured"
**Solution**: Make sure `RESEND_API_KEY` is set in `.env` file

### Issue: "Domain not verified"
**Solution**:
- For testing: Use `onboarding@resend.dev` as FROM email
- For production: Complete domain verification in Resend dashboard

### Issue: "Failed to send email"
**Solution**: Check:
1. API key is correct
2. FROM email is verified (or using test email)
3. Recipient email is valid
4. Check Resend dashboard for error details

### Issue: Emails going to spam
**Solution**:
1. Complete domain verification (SPF, DKIM, DMARC)
2. Use a professional FROM address (no-reply@yourdomain.com)
3. Avoid spammy content in subject/body
4. Warm up your domain (start with low volume)

## Rate Limits

Resend Free Tier:
- **100 emails/day**
- **3,000 emails/month**

For higher volumes, upgrade to paid plan:
- Pro: $20/month - 50,000 emails
- Scale: $80/month - 200,000 emails
- Enterprise: Custom pricing

## Best Practices

1. **Always use verified domains in production**
2. **Monitor email deliverability in Resend dashboard**
3. **Use descriptive subject lines**
4. **Include plain text versions**
5. **Test emails before deploying**
6. **Handle errors gracefully**
7. **Log email sending for debugging**
8. **Use templates for consistency**

## Security Considerations

1. **Never commit API keys to git**
2. **Use environment variables for configuration**
3. **Rotate API keys periodically**
4. **Use separate keys for dev/staging/prod**
5. **Validate recipient emails before sending**
6. **Rate limit email sending to prevent abuse**
7. **Include unsubscribe links (for marketing emails)**

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend Python SDK](https://github.com/resend/resend-python)
- [Email Best Practices](https://resend.com/docs/knowledge-base/best-practices)
- [Domain Verification Guide](https://resend.com/docs/dashboard/domains/introduction)

## Support

- Resend Dashboard: [https://resend.com](https://resend.com)
- Email: support@resend.com
- Discord: [https://discord.gg/resend](https://discord.gg/resend)

---

**Status**: ✅ Email service configured and ready to use
**Last Updated**: 2025-10-22
