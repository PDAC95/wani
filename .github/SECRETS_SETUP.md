# GitHub Secrets Configuration Guide

**Project:** Wani
**Last Updated:** 2024-12-20

---

## Overview

This guide explains how to configure GitHub Secrets for the Wani project. GitHub Secrets are encrypted environment variables that allow you to store sensitive information (API keys, tokens, database URLs) securely.

---

## Required Secrets

### 1. Database & Cache

| Secret Name | Description | Example Value | Where to Get |
|------------|-------------|---------------|--------------|
| `DATABASE_URL` | Supabase PostgreSQL connection string | `postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres` | Supabase Dashboard → Settings → Database |
| `SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` | Supabase Dashboard → Settings → API |
| `SUPABASE_KEY` | Supabase anon/public key | `eyJhbGc...` | Supabase Dashboard → Settings → API |
| `SUPABASE_JWT_SECRET` | Supabase JWT secret | `your-jwt-secret` | Supabase Dashboard → Settings → API |
| `REDIS_URL` | Upstash Redis connection URL | `redis://:pass@xxx.upstash.io:6379` | Upstash Dashboard → Database → REST API |

### 2. Authentication

| Secret Name | Description | Example Value | Notes |
|------------|-------------|---------------|-------|
| `JWT_SECRET` | JWT token signing secret | `your-super-secret-key-min-32-chars` | Generate with: `openssl rand -base64 32` |
| `JWT_ALGORITHM` | JWT algorithm | `HS256` | Usually HS256 |

### 3. Deployment Tokens

| Secret Name | Description | Where to Get |
|------------|-------------|--------------|
| `RAILWAY_TOKEN` | Railway API token for backend deployment | Railway Dashboard → Account Settings → Tokens |
| `VERCEL_TOKEN` | Vercel API token for frontend deployment | Vercel Dashboard → Settings → Tokens |

### 4. Stellar Blockchain

| Secret Name | Description | Example Value | Notes |
|------------|-------------|---------------|-------|
| `STELLAR_NETWORK` | Network type | `testnet` or `public` | Use `testnet` for development |
| `STELLAR_HORIZON_URL` | Horizon API URL | `https://horizon-testnet.stellar.org` | Testnet for dev |
| `STELLAR_HOT_WALLET_SECRET` | Hot wallet secret key | `SXXXXX...` | **CRITICAL - Keep secure** |
| `STELLAR_COLD_WALLET_PUBLIC` | Cold wallet public key | `GXXXXX...` | Safe to share |

### 5. External APIs (Optional for MVP)

| Secret Name | Description | Where to Get |
|------------|-------------|--------------|
| `CIRCLE_API_KEY` | Circle API key (USD → USDC) | Circle Dashboard |
| `BITSO_API_KEY` | Bitso API key (USDC → MXN) | Bitso Dashboard |
| `BITSO_API_SECRET` | Bitso API secret | Bitso Dashboard |
| `TWILIO_ACCOUNT_SID` | Twilio account SID (SMS) | Twilio Console |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Twilio Console |
| `SENDGRID_API_KEY` | SendGrid API key (Email) | SendGrid Dashboard |
| `SENTRY_DSN` | Sentry error tracking DSN | Sentry Project Settings |

---

## How to Add Secrets to GitHub

### Step 1: Go to Repository Settings

1. Open your repository: `https://github.com/PDAC95/wani`
2. Click **Settings** (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**

### Step 2: Add Each Secret

For each secret in the tables above:

1. Click **New repository secret**
2. **Name**: Enter the exact secret name (e.g., `DATABASE_URL`)
3. **Value**: Paste the secret value
4. Click **Add secret**

### Step 3: Verify Secrets Added

You should have at minimum these secrets configured:

**Required for CI/CD:**
- ✅ `DATABASE_URL`
- ✅ `REDIS_URL`
- ✅ `JWT_SECRET`
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_KEY`
- ✅ `SUPABASE_JWT_SECRET`

**Required for Deployment:**
- ✅ `RAILWAY_TOKEN`
- ✅ `VERCEL_TOKEN`

**Required for Stellar:**
- ✅ `STELLAR_NETWORK`
- ✅ `STELLAR_HORIZON_URL`
- ✅ `STELLAR_HOT_WALLET_SECRET`
- ✅ `STELLAR_COLD_WALLET_PUBLIC`

---

## How to Generate Secrets

### Generate JWT Secret

```bash
# Generate a secure random 32-byte secret
openssl rand -base64 32
```

### Generate Stellar Wallet (Testnet)

```bash
# Run the Stellar test script
cd backend
python scripts/test_stellar.py
```

This will output:
- Public Key (save to `STELLAR_COLD_WALLET_PUBLIC`)
- Secret Key (save to `STELLAR_HOT_WALLET_SECRET`)

---

## Security Best Practices

### 🔒 DO:

- ✅ Use different secrets for development, staging, and production
- ✅ Rotate secrets regularly (every 90 days minimum)
- ✅ Use strong, randomly generated secrets (min 32 characters)
- ✅ Never commit secrets to Git
- ✅ Use GitHub Secrets for CI/CD pipelines
- ✅ Use Railway/Vercel environment variables for deployments

### 🚫 DON'T:

- ❌ Never share secrets in chat, email, or Slack
- ❌ Never commit `.env` files to Git
- ❌ Never use the same secret across multiple environments
- ❌ Never hardcode secrets in source code
- ❌ Never log secrets in application logs

---

## Using Secrets in GitHub Actions

Secrets are automatically available in GitHub Actions workflows:

```yaml
- name: Deploy to Railway
  env:
    RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
  run: |
    railway deploy
```

---

## Verification Checklist

After adding all secrets, verify:

- [ ] All required secrets added to GitHub
- [ ] Secrets match exact names (case-sensitive)
- [ ] No trailing spaces in secret values
- [ ] Deployment tokens are valid
- [ ] Database URLs are accessible
- [ ] Stellar wallet has testnet funds (for testing)

---

## Getting Credentials

### Supabase

1. Go to: https://supabase.com/dashboard
2. Select your project
3. **Settings** → **Database** → Copy `DATABASE_URL`
4. **Settings** → **API** → Copy `URL`, `anon key`, and `JWT Secret`

### Upstash Redis

1. Go to: https://console.upstash.com
2. Select your database
3. **REST API** tab → Copy `UPSTASH_REDIS_REST_URL`

### Railway

1. Go to: https://railway.app/account/tokens
2. Click **Create Token**
3. Name it "GitHub Actions"
4. Copy the token

### Vercel

1. Go to: https://vercel.com/account/tokens
2. Click **Create Token**
3. Name it "GitHub Actions"
4. Copy the token

---

## Troubleshooting

### "Secret not found" error in GitHub Actions

**Solution:** Verify secret name matches exactly (case-sensitive)

```yaml
# ❌ Wrong
${{ secrets.database_url }}

# ✅ Correct
${{ secrets.DATABASE_URL }}
```

### "Invalid credentials" error

**Solution:**
1. Check secret value has no trailing spaces
2. Regenerate the credential from the service provider
3. Update the secret in GitHub

### Deployment fails with "unauthorized"

**Solution:**
1. Verify `RAILWAY_TOKEN` or `VERCEL_TOKEN` is valid
2. Check token has correct permissions
3. Regenerate token if expired

---

## Next Steps

After configuring secrets:

1. ✅ Test CI/CD pipeline by pushing to `develop` branch
2. ✅ Verify GitHub Actions can access secrets
3. ✅ Test deployment to Railway (backend)
4. ✅ Test deployment to Vercel (frontend)
5. ✅ Monitor Sentry for errors

---

## Contact

If you need help getting credentials:
- **Supabase:** Check project dashboard
- **Railway/Vercel:** Check account settings
- **Stellar:** Run `backend/scripts/test_stellar.py`

---

**⚠️ IMPORTANT:** Never share this document with actual secret values filled in. This is a template only.
