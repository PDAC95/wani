# Railway Deployment Guide - Wani Backend

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository connected
- Supabase project configured
- Upstash Redis configured

## Step 1: Create Railway Project

1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select the `wani` repository
4. Railway will automatically detect the configuration files

## Step 2: Configure Environment Variables

Add the following environment variables in Railway dashboard:

### Server Configuration
```
NODE_ENV=staging
DEBUG=False
PORT=8000
API_VERSION=v1
```

### Database (Supabase)
```
DATABASE_URL=<your-supabase-connection-string>
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-anon-key>
SUPABASE_JWT_SECRET=<your-supabase-jwt-secret>
```

### Redis (Upstash)
```
REDIS_URL=<your-upstash-redis-url>
```

### Authentication
```
JWT_SECRET=<generate-secure-random-string>
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=1440
REFRESH_TOKEN_EXPIRE_DAYS=30
```

### Stellar Blockchain
```
STELLAR_NETWORK=testnet
STELLAR_HOT_WALLET_SECRET=<your-encrypted-secret-key>
STELLAR_COLD_WALLET_PUBLIC=<your-cold-wallet-public-key>
STELLAR_USDC_ISSUER=GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5
```

### Circle API (Optional)
```
CIRCLE_API_KEY=<your-circle-api-key>
CIRCLE_ACCOUNT_ID=<your-circle-account-id>
CIRCLE_API_BASE_URL=https://api-sandbox.circle.com
```

### Monitoring (Optional)
```
SENTRY_DSN=<your-sentry-dsn>
```

### CORS Configuration
```
ALLOWED_ORIGINS=https://wani-web.vercel.app,https://wani-staging.vercel.app
```

## Step 3: Deploy

1. Railway will automatically deploy on push to `main` branch
2. Monitor deployment logs in Railway dashboard
3. Wait for deployment to complete (2-5 minutes)

## Step 4: Verify Deployment

### Check Health Endpoint
```bash
curl https://your-railway-app.railway.app/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "database": "healthy",
    "cache": "healthy",
    "timestamp": "2024-12-23T10:00:00Z"
  },
  "message": "Server is running"
}
```

### Check API Docs
Visit: `https://your-railway-app.railway.app/api/docs`

## Step 5: Run Database Migrations

### Option A: Railway CLI
```bash
railway run alembic upgrade head
```

### Option B: One-time Job in Railway Dashboard
1. Go to your Railway project
2. Click "New" → "Empty Service"
3. Add same environment variables
4. Set start command: `cd backend && alembic upgrade head`
5. Run once and delete

## Troubleshooting

### Deployment Fails
- Check Railway logs for errors
- Verify all environment variables are set
- Ensure DATABASE_URL and REDIS_URL are correct

### Database Connection Fails
- Verify Supabase connection string format
- Check Supabase project is not paused
- Ensure connection pooling is enabled

### Health Check Fails
- Check if port $PORT is used correctly
- Verify healthcheckPath is `/health`
- Increase healthcheckTimeout if needed

## Post-Deployment Checklist

- [ ] Health endpoint responds with 200 OK
- [ ] API docs accessible at `/api/docs`
- [ ] Database migrations applied successfully
- [ ] Redis connection working
- [ ] CORS configured for frontend domains
- [ ] Environment variables secure (no leaks in logs)
- [ ] Monitoring/logging configured

## Rollback Strategy

If deployment fails:
1. Go to Railway dashboard → Deployments
2. Find last working deployment
3. Click "Redeploy"
4. Or revert Git commit and push

## Cost Estimation

Railway pricing (as of 2024):
- **Starter Plan**: $5/month (500 hours)
- **Developer Plan**: $20/month (unlimited hours)
- **Estimated usage**: ~730 hours/month (24/7)

**Recommendation**: Start with Developer Plan for staging environment.

## Next Steps

After successful deployment:
1. Update frontend environment variables with Railway URL
2. Test API endpoints from frontend
3. Configure custom domain (optional)
4. Set up production environment (separate Railway project)
